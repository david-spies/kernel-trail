// ============================================================
// HUD — Top status bar: player, level, progress, resources
// ============================================================

import { useGameStore } from '../stores/gameStore';
import { getLevel } from '../data/levels';
import { ProgressBar } from './ProgressBar';
import { LINUX_QUESTIONS } from '../data/questions';

export function HUD() {
  const playerName = useGameStore((s) => s.playerName);
  const qIdx = useGameStore((s) => s.qIdx);
  const miles = useGameStore((s) => s.miles);
  const integrity = useGameStore((s) => s.integrity);
  const powerCells = useGameStore((s) => s.powerCells);
  const streak = useGameStore((s) => s.streak);
  const overclock = useGameStore((s) => s.overclock);
  const overclockTimer = useGameStore((s) => s.overclockTimer);

  const levelInfo = getLevel(qIdx);
  const integrityColor = integrity > 60 ? '#859900' : integrity > 30 ? '#b58900' : '#dc322f';

  return (
    <header style={{
      borderBottom: '1px solid #073642',
      paddingBottom: '0.75rem',
      marginBottom: '1rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0.5rem',
      alignItems: 'center',
    }}>
      {/* Left: Player + Level */}
      <div>
        <div style={{ color: '#586e75', fontSize: '0.62rem', letterSpacing: '0.1em' }}>SCAVENGER</div>
        <div style={{ color: '#fdf6e3', fontSize: '0.85rem' }}>{playerName || 'ANON'}</div>
        <div style={{
          color: overclock ? '#fdf6e3' : levelInfo.color,
          fontSize: '0.72rem',
          textShadow: overclock ? '0 0 8px #fdf6e3' : 'none',
          transition: 'all 0.3s',
        }}>
          {levelInfo.badge}
        </div>
      </div>

      {/* Center: Trail progress */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#586e75', fontSize: '0.62rem', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>
          TRAIL PROGRESS
        </div>
        <ProgressBar value={qIdx} max={LINUX_QUESTIONS.length} color="#268bd2" />
        <div style={{ color: '#586e75', fontSize: '0.62rem', marginTop: '0.3rem' }}>
          Q{qIdx + 1}/{LINUX_QUESTIONS.length} · Mile {miles}
          {overclock && (
            <span style={{
              color: '#fdf6e3', marginLeft: '0.75rem',
              animation: 'blink 0.6s step-end infinite',
            }}>
              ⚡ OVERCLOCK {overclockTimer}s
            </span>
          )}
        </div>
      </div>

      {/* Right: Integrity + Power + Streak */}
      <div style={{ textAlign: 'right' }}>
        <div style={{ marginBottom: '0.2rem' }}>
          <span style={{ color: '#586e75', fontSize: '0.62rem' }}>INTEGRITY </span>
          <span style={{ color: integrityColor, fontSize: '0.82rem', fontWeight: 'bold' }}>{integrity}%</span>
        </div>
        <ProgressBar value={integrity} max={100} color={integrityColor} />
        <div style={{ marginTop: '0.25rem', fontSize: '0.68rem' }}>
          <span style={{ color: '#586e75' }}>PWR </span>
          <span style={{ color: '#b58900' }}>{powerCells}%</span>
          <span style={{ color: '#073642', margin: '0 0.4rem' }}>·</span>
          <span style={{ color: '#586e75' }}>STREAK </span>
          <span style={{ color: streak >= 5 ? '#859900' : '#839496' }}>{streak}</span>
        </div>
      </div>
    </header>
  );
}
