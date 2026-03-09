// ============================================================
// SIDEBAR — Level progress, achievements, stats
// ============================================================

import { useGameStore } from '../stores/gameStore';
import { LEVELS, ACHIEVEMENTS, getLevel } from '../data/levels';

export function Sidebar() {
  const qIdx = useGameStore((s) => s.qIdx);
  const totalCorrect = useGameStore((s) => s.totalCorrect);
  const totalWrong = useGameStore((s) => s.totalWrong);
  const warpCorrect = useGameStore((s) => s.warpCorrect);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);

  const currentLevel = getLevel(qIdx);
  const accuracy = totalCorrect + totalWrong > 0
    ? Math.round((100 * totalCorrect) / (totalCorrect + totalWrong))
    : 0;

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

      {/* Level progress */}
      <div style={{ border: '1px solid #073642', padding: '0.75rem', background: '#050a0e' }}>
        <div style={{ color: '#586e75', fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
          // LEVEL STATUS
        </div>
        {LEVELS.map((l) => {
          const done = qIdx > l.maxQ;
          const active = currentLevel.num === l.num;
          return (
            <div
              key={l.num}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.2rem 0',
                opacity: qIdx >= l.minQ ? 1 : 0.25,
                color: active ? l.color : done ? '#586e75' : '#073642',
                fontSize: '0.68rem',
                transition: 'color 0.3s',
              }}
            >
              <span style={{ width: '10px', textAlign: 'center' }}>
                {done ? '✓' : active ? '▶' : '○'}
              </span>
              <span>{l.icon}</span>
              <span style={{ fontSize: '0.62rem' }}>{l.title}</span>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div style={{ border: '1px solid #073642', padding: '0.75rem', background: '#050a0e', flex: 1, overflowY: 'auto' }}>
        <div style={{ color: '#586e75', fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
          // ACHIEVEMENTS
        </div>
        {ACHIEVEMENTS.map((a) => {
          const unlocked = unlockedAchievements.includes(a.id);
          return (
            <div
              key={a.id}
              title={a.desc}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.25rem 0',
                opacity: unlocked ? 1 : 0.2,
                color: unlocked ? '#859900' : '#586e75',
                fontSize: '0.68rem',
                transition: 'opacity 0.4s',
                filter: unlocked ? 'none' : 'grayscale(100%)',
              }}
            >
              <span style={{ fontSize: '0.95rem', minWidth: '18px' }}>{a.icon}</span>
              <span style={{ fontSize: '0.62rem', lineHeight: 1.3 }}>{a.name}</span>
            </div>
          );
        })}
      </div>

      {/* Stats panel */}
      <div style={{ border: '1px solid #073642', padding: '0.75rem', background: '#050a0e', fontSize: '0.68rem' }}>
        <div style={{ color: '#586e75', fontSize: '0.65rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
          // STATS
        </div>
        <div style={{ color: '#859900', marginBottom: '0.2rem' }}>✓ {totalCorrect} correct</div>
        <div style={{ color: '#dc322f', marginBottom: '0.2rem' }}>✗ {totalWrong} wrong</div>
        <div style={{ color: '#b58900', marginBottom: '0.2rem' }}>⚡ {warpCorrect} warps</div>
        <div style={{ color: '#839496' }}>{accuracy}% accuracy</div>
      </div>
    </aside>
  );
}
