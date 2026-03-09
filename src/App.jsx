// ============================================================
// APP — Root component, screen router, global effects
// ============================================================

import { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import { useOverclock } from './hooks/useOverclock';
import { LINUX_QUESTIONS } from './data/questions';

// Screens
import { IntroScreen } from './components/screens/IntroScreen';
import { DeathScreen } from './components/screens/DeathScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';

// Game UI
import { Scanlines } from './components/Scanlines';
import { AchievementToast } from './components/AchievementToast';
import { WarpScreen } from './components/WarpScreen';
import { HUD } from './components/HUD';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';

function GameScreen() {
  const overclock = useGameStore((s) => s.overclock);
  const isGlitching = useGameStore((s) => s.isGlitching);
  const qIdx = useGameStore((s) => s.qIdx);
  const bonusIdx = useGameStore((s) => s.bonusIdx);
  const miles = useGameStore((s) => s.miles);

  const currentQ = LINUX_QUESTIONS[Math.min(qIdx, LINUX_QUESTIONS.length - 1)];

  return (
    <div style={{
      minHeight: '100vh',
      background: overclock
        ? 'radial-gradient(ellipse at center, #002b36 0%, #000c10 100%)'
        : '#020508',
      fontFamily: '"Share Tech Mono", monospace',
      color: '#859900',
      position: 'relative',
      animation: isGlitching ? 'shake 0.5s ease' : 'none',
    }}>
      <Scanlines />

      {/* Overclock glow */}
      {overclock && (
        <div aria-hidden="true" style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
          boxShadow: 'inset 0 0 80px rgba(253,246,227,0.12)',
          animation: 'overclock 1s ease-in-out infinite',
        }} />
      )}

      {/* Glitch red flash */}
      {isGlitching && (
        <div aria-hidden="true" style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5,
          background: 'rgba(220,50,47,0.12)',
        }} />
      )}

      <AchievementToast />
      <WarpScreen />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '1rem', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
      }}>
        <HUD />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '190px 1fr',
          gap: '1rem',
          flex: 1,
        }}>
          <Sidebar />
          <Terminal />
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #073642', marginTop: '0.75rem', paddingTop: '0.4rem',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.62rem', color: '#586e75',
        }}>
          <span>Ch.{currentQ?.chapter || 1}/70 · cmd: {currentQ?.cmd}</span>
          <span style={{ color: '#073642' }}>{Array(20).fill('─').join('')}</span>
          <span>Warp {bonusIdx}/100 · Next at mile {Math.ceil((miles + 1) / 10) * 10}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const screen = useGameStore((s) => s.screen);
  useOverclock();

  useEffect(() => {
    const prevent = (e) => {
      if (e.key === 'Enter' && e.target.tagName === 'BUTTON') e.preventDefault();
    };
    window.addEventListener('keydown', prevent);
    return () => window.removeEventListener('keydown', prevent);
  }, []);

  if (screen === 'intro') return <IntroScreen />;
  if (screen === 'death') return <DeathScreen />;
  if (screen === 'victory') return <VictoryScreen />;
  return <GameScreen />;
}
