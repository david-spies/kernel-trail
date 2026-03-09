# DEVELOPMENT.md — The Kernel Trail

Architecture reference, file map, data schemas, and contributor guide.

---

## 📂 Complete File Map

```
kernel-trail/
│
├── index.html                        ← Root HTML entry point
│                                       Loads Google Fonts (VT323 + Share Tech Mono)
│                                       Mounts <div id="root"> for React
│
├── package.json                      ← Dependencies and npm scripts
├── vite.config.js                    ← Vite: port 5173, React plugin, dist/ output
├── tailwind.config.js                ← Theme: custom color palette, fonts, keyframes
├── postcss.config.js                 ← PostCSS: Tailwind + Autoprefixer
├── .eslintrc.cjs                     ← ESLint: React, hooks, refresh rules
├── .gitignore                        ← Ignores node_modules, dist, .env
│
├── public/
│   └── favicon.svg                   ← Terminal cursor icon ($_ in green on black)
│
├── src/
│   │
│   ├── main.jsx                      ← React.createRoot, mounts <App /> into #root
│   ├── App.jsx                       ← Screen router (intro/game/death/victory)
│   │                                   Activates useOverclock() globally
│   │                                   Renders <GameScreen> when screen === 'game'
│   │
│   ├── styles/
│   │   └── index.css                 ← @tailwind directives (base, components, utilities)
│   │                                   Global resets, scrollbar styles
│   │                                   @keyframes: glow, blink, fadeIn, shake,
│   │                                     overclock, matrix, warp-pulse
│   │                                   Utility classes: .scanlines, .glow-green,
│   │                                     .terminal-border, .cursor, .selectable
│   │                                   Responsive breakpoints (sidebar hide < 768px)
│   │
│   ├── data/
│   │   ├── questions.js              ← LINUX_QUESTIONS[]: 400 entries
│   │   │                               Schema: { id, cmd, scenario, answer,
│   │   │                                         hint, difficulty, chapter }
│   │   │                               Chapters 1–70, difficulty 1–5
│   │   │                               Covers commands A–Z (alias → zypper)
│   │   │
│   │   ├── bonusQuestions.js         ← BONUS_QUESTIONS[]: 100 entries
│   │   │                               Schema: { id, era, scenario, answer, hint }
│   │   │                               Spans 1943 (Colossus) → 2024 (XZ Utils)
│   │   │
│   │   ├── gameConfig.js             ← LEVELS[], ACHIEVEMENTS[], DIFFICULTY_LABELS,
│   │   │                               GAME_CONSTANTS (tunable game parameters)
│   │   │
│   │   ├── achievements.js           ← ACHIEVEMENTS[] with full descriptions
│   │   └── levels.js                 ← LEVELS[] + getLevel(qIdx) helper
│   │
│   ├── stores/
│   │   └── gameStore.js              ← Zustand store — ALL game state + actions
│   │                                   Exports: useGameStore, checkAnswer, normalizeAnswer
│   │                                   Actions: startGame, resetGame, submitAnswer,
│   │                                     submitWarpAnswer, skipQuestion, toggleHint,
│   │                                     tickOverclock, _checkWarpTrigger,
│   │                                     _unlockAchievement, _checkAchievements
│   │
│   ├── hooks/
│   │   ├── useOverclock.js           ← setInterval(tickOverclock, 1000) while overclock===true
│   │   ├── useGameState.js           ← Derived state selectors (currentQuestion, etc.)
│   │   ├── useGameStore.js           ← Re-export of Zustand store hook
│   │   └── useKeyboardShortcuts.js   ← Generic keydown listener hook
│   │
│   └── components/
│       │
│       ├── Scanlines.jsx             ← Fixed CRT scanline overlay, pointer-events: none,
│       │                               z-index: 9999, repeating-linear-gradient
│       │
│       ├── ProgressBar.jsx           ← ASCII bar: [||||||||||----------] N%
│       │                               Props: value, max, color, label
│       │
│       ├── AchievementToast.jsx      ← Slide-in notification, auto-dismisses after 4.2s
│       │                               Reads toastAchievement from store
│       │
│       ├── MatrixRain.jsx            ← Katakana rain columns, intro screen only
│       │                               25 columns, randomized animation delays
│       │
│       ├── WarpScreen.jsx            ← History Warp modal (fixed overlay, amber theme)
│       │                               Shows warpQuestion, handles submitWarpAnswer / skipWarp
│       │                               Displays result feedback before dismissing
│       │
│       ├── HUD.jsx                   ← Top bar (3-column grid):
│       │                               Left: playerName + level badge
│       │                               Center: trail progress bar + Q index + miles
│       │                               Right: integrity bar + power cells + streak
│       │                               Overclock timer shown center when active
│       │
│       ├── Sidebar.jsx               ← Left panel (3 stacked sections):
│       │                               1. Level tree (8 levels, active/done/locked states)
│       │                               2. Achievement grid (greyed until unlocked)
│       │                               3. Stats (correct, wrong, warps, accuracy %)
│       │
│       ├── Terminal.jsx              ← Main game area:
│       │                               Titlebar with traffic lights + chapter + difficulty
│       │                               Scenario text (left-border colored by level)
│       │                               Hint panel (toggleable, amber)
│       │                               Feedback line (correct/wrong with damage)
│       │                               Correct answer reveal on wrong
│       │                               Input field + [ EXECUTE ] [ HINT ] [ SKIP ] buttons
│       │                               Terminal log footer (last 3 events)
│       │
│       ├── IntroScreen.jsx           ← Title screen:
│       │                               Matrix rain background
│       │                               VT323 title with glow animation
│       │                               Mission brief panel
│       │                               Callsign <input> → startGame(name)
│       │
│       ├── DeathScreen.jsx           ← Kernel Panic screen (dark red bg):
│       │                               VT323 "KERNEL PANIC" with red glow
│       │                               Run stats summary + epitaph
│       │                               [ REBOOT TERMINAL ] [ MAIN MENU ]
│       │
│       └── VictoryScreen.jsx         ← Neo-Portland reached:
│                                       Green glow title
│                                       Final stats (miles, accuracy, warps, integrity)
│                                       Earned achievement icons
│                                       [ NEW JOURNEY ]
│
├── README.md                         ← Player-facing overview and gameplay guide
├── DEVELOPMENT.md                    ← This file
├── QUICKSTART.md                     ← Install, run, build instructions
├── TECHSTACK.md                      ← Technology choices with rationale
└── requirements.txt                  ← Node/npm version requirements
```

---

## 🏗️ Architecture

### State Management

All game state lives in a single **Zustand store** (`src/stores/gameStore.js`). Components subscribe to slices via selectors — no props are passed for game state.

```js
// Reading state (reactive)
const integrity = useGameStore((s) => s.integrity);

// Calling actions
const submitAnswer = useGameStore((s) => s.submitAnswer);

// Non-reactive snapshot inside actions
const state = get();
```

The store is flat — no nested objects in state. Derived values (current level, accuracy percentage) are computed in components or selector hooks.

### State Shape

```js
{
  // Navigation
  screen: 'intro' | 'game' | 'death' | 'victory',
  playerName: string,

  // Progress
  qIdx: number,         // 0–399, current Linux question
  bonusIdx: number,     // 0–99, current warp question
  miles: number,        // total miles traveled

  // Resources
  integrity: number,    // 0–100, reaches 0 = death
  powerCells: number,   // 0–100, secondary resource

  // Stats
  totalCorrect, totalWrong, streak, failStreak,
  nohintStreak, hintsUsed, warpCount, warpCorrect, warpStreak,

  // Achievements
  unlockedAchievements: string[],  // array of achievement IDs

  // Warp
  showWarp: boolean,
  warpQuestion: object | null,
  questionStartTime: number,       // Date.now() for Warden timer

  // Visual state
  feedback: null | 'correct' | 'wrong',
  showHint: boolean,
  overclock: boolean,
  overclockTimer: number,          // seconds remaining
  isGlitching: boolean,
  toastAchievement: object | null,

  // Log
  gameLog: string[],               // last 30 terminal events
}
```

### Answer Matching

`checkAnswer()` in the store uses a two-step algorithm:

1. **Exact match** — normalize (trim, lowercase, collapse whitespace, strip quotes and backslashes), then compare
2. **Keyword match** — for commands with ≥2 significant words, accept if ≥60% of words (length >2) match

This gracefully handles:
- `sudo` prepended to commands that don't require it
- Trailing whitespace or quote style differences
- Minor flag order variations in multi-flag commands

If neither passes, the answer is wrong and the correct answer is shown in the Terminal.

### Data Flow (correct answer)

```
User presses Enter
     │
Terminal.jsx → submitAnswer(input)
     │
gameStore.submitAnswer()
  ├─ checkAnswer(input, currentQ.answer)  → true
  ├─ integrity += overclock ? 3 : 1
  ├─ powerCells += 2
  ├─ miles += 1
  ├─ streak += 1, failStreak = 0
  ├─ feedback = 'correct'  (triggers CSS feedback flash)
  ├─ _checkAchievements()
  └─ setTimeout(700ms)
       ├─ qIdx += 1
       ├─ feedback = null
       └─ _checkWarpTrigger(miles)
               └─ if miles % 10 === 0 → setTimeout(600ms) → showWarp = true
```

### History Warp Flow

```
_checkWarpTrigger(miles)
  └─ miles % 10 === 0 && bonusIdx < 100 && !showWarp
        └─ showWarp = true, warpQuestion = BONUS_QUESTIONS[bonusIdx]
               │
          WarpScreen renders as fixed z-index overlay
               │
       User answers → submitWarpAnswer(input)
         ├─ Correct:
         │    miles += 10, integrity += 20, powerCells += 15
         │    overclock = true, overclockTimer = 60
         │    qIdx += 5 (skip questions)
         │    _checkAchievements()
         └─ Wrong:
              integrity -= 15, isGlitching = true
```

### Overclock Timer

`useOverclock()` in `src/hooks/useOverclock.js` calls `setInterval(tickOverclock, 1000)` whenever `overclock === true`. Each tick decrements `overclockTimer`. When it hits 0, `overclock` is set to `false`. The interval is cleared on cleanup via `useEffect` return.

---

## 📋 Data Schemas

### Linux Question

```js
{
  id: "L001",             // "L" + zero-padded 3-digit number
  cmd: "alias",           // primary command being tested
  scenario: "...",        // narrative question (1–2 sentences, lore-flavored)
  answer: "alias ll='ls -la'",  // canonical correct answer
  hint: "alias name='command'", // shown when user clicks [SHOW HINT]
  difficulty: 1,          // 1=Greenhorn, 2=Beginner, 3=Intermediate, 4=Advanced, 5=Expert
  chapter: 1,             // narrative chapter 1–70 (maps loosely to level tiers)
}
```

Damage on wrong answer: `difficulty × 5` (or `× 3` during Overclock).

### Bonus / Warp Question

```js
{
  id: "H001",             // "H" + zero-padded 3-digit number
  era: "1943",            // year string shown in the Warp modal header
  scenario: "...",        // history question (1–2 sentences)
  answer: "Colossus",     // canonical correct answer
  hint: "Named after a mythical giant structure",
}
```

### Level Definition (gameConfig.js)

```js
{
  min: 0,                 // first qIdx in this tier
  max: 49,                // last qIdx in this tier
  num: 1,                 // tier number (1–8)
  title: "Root Initiate",
  icon: "⬡",
  color: "#586e75",       // accent color for this level
  badge: "[ ⬡ ] ROOT INITIATE",  // displayed in HUD
}
```

### GAME_CONSTANTS (gameConfig.js)

All tunable values in one place:

```js
TOTAL_QUESTIONS:        400
TOTAL_BONUS:            100
WARP_INTERVAL:          10      // miles between warps
WARP_SKIP_QUESTIONS:    5       // questions skipped on correct warp
OVERCLOCK_DURATION:     60      // seconds
OVERCLOCK_HEAL:         20      // integrity gained on correct warp
WARP_DAMAGE:            15      // integrity lost on wrong warp
DAMAGE_PER_WRONG:       5       // base, multiplied by difficulty
HEAL_PER_CORRECT:       1       // per correct (3 during overclock)
ANSWER_SIMILARITY_THRESHOLD: 0.6
```

---

## ➕ Adding Content

### Add a Linux question

Append to `src/data/questions.js` → `LINUX_QUESTIONS`:

```js
{
  id: "L401",
  cmd: "newcmd",
  scenario: "Your scenario text here. Keep it lore-flavored (Neo-Portland, data salvage, etc.).",
  answer: "newcmd --flag argument",
  hint: "newcmd --flag <arg>",
  difficulty: 3,
  chapter: 71,
}
```

No registration required — the array is read directly by the store.

### Add a bonus question

Append to `src/data/bonusQuestions.js` → `BONUS_QUESTIONS`:

```js
{
  id: "H101",
  era: "2025",
  scenario: "Your IT history question.",
  answer: "The Answer",
  hint: "Short hint",
}
```

### Add an achievement

1. Add the definition to `src/data/achievements.js` and `src/data/gameConfig.js`
2. Add unlock logic in `gameStore.js → _checkAchievements()`

---

## ⚙️ Configuration Reference

| File | What to change |
|------|---------------|
| `vite.config.js` | Dev server port, build output directory |
| `tailwind.config.js` | Color palette, font families, animation keyframes |
| `src/styles/index.css` | Global CSS, @keyframes, responsive breakpoints |
| `src/data/gameConfig.js` | All numeric game constants (damage, healing, warp frequency) |
| `index.html` | Google Fonts CDN link, page title, meta description |

---

## 🔮 Planned Features

- **The Vim Trap** — random event that locks the terminal in a mock vi buffer; player must type `:q!` to escape
- **localStorage save** — persist run state across browser sessions
- **Leaderboard backend** — Fastify + SQLite API, score submission on death/victory
- **Sound effects** — keyclick, correct chime, glitch noise, overclock hum
- **Mobile layout** — responsive sidebar that collapses to a drawer on small screens
