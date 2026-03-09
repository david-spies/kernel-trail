// ============================================================
// GAME STATE STORE — Zustand
// Central state management for The Kernel Trail
// ============================================================

import { create } from 'zustand';
import { LINUX_QUESTIONS } from '../data/questions';
import { BONUS_QUESTIONS } from '../data/bonusQuestions';
import { ACHIEVEMENTS, getLevel } from '../data/levels';

// ── Answer matching utility ──────────────────────────────────
export function normalizeAnswer(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/['"]/g, '')
    .replace(/\\/g, '');
}

export function checkAnswer(input, correct) {
  const inp = normalizeAnswer(input);
  const cor = normalizeAnswer(correct);

  // Exact match
  if (inp === cor) return true;

  // Partial keyword match for long commands (≥60% of significant words)
  const corWords = cor.split(' ').filter((w) => w.length > 2);
  const inpWords = inp.split(' ');
  if (corWords.length >= 2) {
    const matches = corWords.filter((w) => inpWords.includes(w));
    if (
      matches.length >= Math.min(corWords.length, 3) &&
      matches.length / corWords.length >= 0.6
    ) {
      return true;
    }
  }

  return false;
}

// ── Initial state factory ─────────────────────────────────────
function initialState() {
  return {
    // Screens: 'intro' | 'game' | 'death' | 'victory'
    screen: 'intro',
    playerName: '',

    // Progress
    qIdx: 0,           // current Linux question index (0–399)
    bonusIdx: 0,       // current bonus question index (0–99)
    miles: 0,          // total miles traveled

    // Resources
    integrity: 100,    // system integrity (health), 0–100
    powerCells: 50,    // secondary resource, 0–100

    // Stats
    totalCorrect: 0,
    totalWrong: 0,
    streak: 0,
    failStreak: 0,
    nohintStreak: 0,
    hintsUsed: 0,
    warpCount: 0,      // total warp questions seen
    warpCorrect: 0,    // total warp questions answered correctly
    warpStreak: 0,     // consecutive correct warp answers

    // Achievements
    unlockedAchievements: [], // array of achievement IDs

    // Warp
    showWarp: false,
    warpQuestion: null,
    questionStartTime: Date.now(),

    // Visual states
    feedback: null,    // null | 'correct' | 'wrong'
    showHint: false,
    overclock: false,
    overclockTimer: 0,
    isGlitching: false,
    toastAchievement: null,

    // Game log (terminal history)
    gameLog: [],
  };
}

// ── Store ─────────────────────────────────────────────────────
export const useGameStore = create((set, get) => ({
  ...initialState(),

  // ── Navigation ──────────────────────────────────────────────
  setScreen: (screen) => set({ screen }),

  setPlayerName: (playerName) => set({ playerName }),

  startGame: (playerName) =>
    set({ ...initialState(), playerName, screen: 'game', questionStartTime: Date.now() }),

  resetGame: () => set({ ...initialState(), screen: 'intro' }),

  // ── Answer handling ──────────────────────────────────────────
  submitAnswer: (input) => {
    const state = get();
    if (state.feedback !== null) return; // debounce

    const currentQ = LINUX_QUESTIONS[Math.min(state.qIdx, LINUX_QUESTIONS.length - 1)];
    const correct = checkAnswer(input, currentQ.answer);

    if (correct) {
      const newCorrect = state.totalCorrect + 1;
      const newNohint = state.showHint ? 0 : state.nohintStreak + 1;
      const newMiles = state.miles + 1;

      const updates = {
        feedback: 'correct',
        totalCorrect: newCorrect,
        miles: newMiles,
        streak: state.streak + 1,
        failStreak: 0,
        nohintStreak: newNohint,
        showHint: false,
        powerCells: Math.min(100, state.powerCells + 2),
        integrity: Math.min(100, state.integrity + (state.overclock ? 3 : 1)),
        gameLog: [...state.gameLog.slice(-30), `[+] ${currentQ.cmd.toUpperCase()}: ACCEPTED`],
      };

      set(updates);
      get()._checkAchievements({ newCorrect, newNohint, warpStreak: state.warpStreak, failStreak: 0 });

      // Advance question after delay
      setTimeout(() => {
        const s = get();
        const nextIdx = s.qIdx + 1;
        if (nextIdx >= LINUX_QUESTIONS.length) {
          set({ feedback: null, screen: 'victory' });
        } else {
          set({ feedback: null, qIdx: nextIdx, questionStartTime: Date.now() });
          // Check for warp trigger
          get()._checkWarpTrigger(s.miles + 1);
        }
      }, 700);
    } else {
      const damage = currentQ.difficulty * (state.overclock ? 3 : 5);
      const newIntegrity = Math.max(0, state.integrity - damage);
      const newFail = state.failStreak + 1;

      set({
        feedback: 'wrong',
        totalWrong: state.totalWrong + 1,
        streak: 0,
        failStreak: newFail,
        nohintStreak: 0,
        integrity: newIntegrity,
        powerCells: Math.max(0, state.powerCells - 3),
        isGlitching: true,
        gameLog: [...state.gameLog.slice(-30), `[✗] ${currentQ.cmd.toUpperCase()}: INVALID SYNTAX`],
      });

      get()._checkAchievements({ failStreak: newFail });

      setTimeout(() => set({ feedback: null, isGlitching: false }), 1000);

      if (newIntegrity <= 0) {
        setTimeout(() => set({ screen: 'death' }), 1200);
      }
    }
  },

  skipQuestion: () => {
    const state = get();
    if (state.feedback !== null) return;

    const currentQ = LINUX_QUESTIONS[Math.min(state.qIdx, LINUX_QUESTIONS.length - 1)];
    const damage = currentQ.difficulty * 5;

    set({
      feedback: 'wrong',
      totalWrong: state.totalWrong + 1,
      integrity: Math.max(0, state.integrity - damage),
      isGlitching: true,
      gameLog: [...state.gameLog.slice(-30), `[→] ${currentQ.cmd.toUpperCase()}: SKIPPED`],
    });

    setTimeout(() => {
      const s = get();
      const nextIdx = s.qIdx + 1;
      set({
        feedback: null,
        isGlitching: false,
        qIdx: nextIdx >= LINUX_QUESTIONS.length ? LINUX_QUESTIONS.length - 1 : nextIdx,
      });
      if (s.integrity - damage <= 0) set({ screen: 'death' });
    }, 800);
  },

  // ── Hint ────────────────────────────────────────────────────
  toggleHint: () => {
    const state = get();
    const showing = !state.showHint;
    set({ showHint: showing, nohintStreak: showing ? 0 : state.nohintStreak, hintsUsed: showing ? state.hintsUsed + 1 : state.hintsUsed });
  },

  // ── History Warp ────────────────────────────────────────────
  _checkWarpTrigger: (miles) => {
    const state = get();
    if (miles > 0 && miles % 10 === 0 && state.bonusIdx < BONUS_QUESTIONS.length && !state.showWarp) {
      setTimeout(() => {
        set({
          showWarp: true,
          warpQuestion: BONUS_QUESTIONS[state.bonusIdx],
          questionStartTime: Date.now(),
        });
      }, 600);
    }
  },

  submitWarpAnswer: (input) => {
    const state = get();
    const elapsed = (Date.now() - state.questionStartTime) / 1000;
    const correct = checkAnswer(input, state.warpQuestion.answer);

    const newBonusIdx = state.bonusIdx + 1;

    if (correct) {
      const newWarpCorrect = state.warpCorrect + 1;
      const newWarpStreak = state.warpStreak + 1;

      set({
        showWarp: false,
        warpQuestion: null,
        bonusIdx: newBonusIdx,
        warpCount: state.warpCount + 1,
        warpCorrect: newWarpCorrect,
        warpStreak: newWarpStreak,
        miles: state.miles + 10,
        integrity: Math.min(100, state.integrity + 20),
        powerCells: Math.min(100, state.powerCells + 15),
        overclock: true,
        overclockTimer: 60,
        qIdx: Math.min(state.qIdx + 5, LINUX_QUESTIONS.length - 1),
        gameLog: [...state.gameLog.slice(-30), `[⚡] HISTORY WARP: OVERCLOCK GRANTED`],
      });

      if (elapsed < 10) get()._unlockAchievement('time_warden');
      get()._checkAchievements({ newWarpCorrect, newWarpStreak });
    } else {
      set({
        showWarp: false,
        warpQuestion: null,
        bonusIdx: newBonusIdx,
        warpCount: state.warpCount + 1,
        warpStreak: 0,
        integrity: Math.max(0, state.integrity - 15),
        isGlitching: true,
        gameLog: [...state.gameLog.slice(-30), `[✗] HISTORY WARP: TEMPORAL DESYNC`],
      });
      setTimeout(() => set({ isGlitching: false }), 1000);
    }
  },

  skipWarp: () => {
    const state = get();
    set({
      showWarp: false,
      warpQuestion: null,
      bonusIdx: state.bonusIdx + 1,
      warpStreak: 0,
    });
  },

  // ── Overclock timer tick (called by component) ───────────────
  tickOverclock: () => {
    const state = get();
    if (!state.overclock) return;
    const newTimer = state.overclockTimer - 1;
    if (newTimer <= 0) {
      set({ overclock: false, overclockTimer: 0 });
    } else {
      set({ overclockTimer: newTimer });
    }
  },

  // ── Toast dismiss ────────────────────────────────────────────
  dismissToast: () => set({ toastAchievement: null }),

  // ── Internal: Achievement checking ──────────────────────────
  _unlockAchievement: (id) => {
    const state = get();
    if (state.unlockedAchievements.includes(id)) return;
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;
    set({
      unlockedAchievements: [...state.unlockedAchievements, id],
      toastAchievement: ach,
    });
  },

  _checkAchievements: ({ newCorrect, newNohint, failStreak, newWarpCorrect, newWarpStreak } = {}) => {
    const unlock = get()._unlockAchievement;
    const state = get();

    if (newCorrect === 1) unlock('first_blood');
    if (newCorrect === 50) unlock('bash_god');
    if (newCorrect === 100) unlock('root_access');
    if (newWarpCorrect === 2) unlock('vacuum_tube');
    if (newWarpCorrect === 5) unlock('silicon_alch');
    if (newWarpCorrect === 10) unlock('analog_ghost');
    if (newWarpStreak >= 3) unlock('overclocker');
    if (newNohint >= 10) unlock('no_mercy');
    if (failStreak >= 5) unlock('permission_denied');
  },
}));
