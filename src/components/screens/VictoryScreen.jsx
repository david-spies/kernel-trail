import { useGameStore } from '../../stores/gameStore';
import { ACHIEVEMENTS } from '../../data/levels';
import { Scanlines } from '../Scanlines';

export function VictoryScreen() {
  const playerName = useGameStore((s) => s.playerName);
  const miles = useGameStore((s) => s.miles);
  const totalCorrect = useGameStore((s) => s.totalCorrect);
  const totalWrong = useGameStore((s) => s.totalWrong);
  const warpCorrect = useGameStore((s) => s.warpCorrect);
  const integrity = useGameStore((s) => s.integrity);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const resetGame = useGameStore((s) => s.resetGame);

  const accuracy = totalCorrect + totalWrong > 0
    ? Math.round((100 * totalCorrect) / (totalCorrect + totalWrong))
    : 0;

  return (
    <div style={{
      minHeight: '100vh', background: '#020508',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Share Tech Mono", monospace',
      textAlign: 'center', padding: '2rem',
    }}>
      <Scanlines />

      <div style={{
        color: '#859900',
        fontFamily: '"VT323", monospace',
        fontSize: 'clamp(2rem, 8vw, 4.5rem)',
        animation: 'glow 2s ease-in-out infinite alternate',
        marginBottom: '0.25rem',
      }}>
        NEO-PORTLAND REACHED
      </div>

      <div style={{ color: '#268bd2', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>
        // ARCHIVE MIGRATION COMPLETE // HUMANITY'S DATA: PRESERVED
      </div>

      <div style={{ fontSize: '4rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px #859900)' }}>
        🏁
      </div>

      <div style={{ color: '#839496', marginBottom: '0.5rem' }}>
        Scavenger <span style={{ color: '#fdf6e3' }}>{playerName}</span> has completed The Kernel Trail
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ color: '#b58900' }}>Miles traveled: {miles}</div>
        <div style={{ color: '#839496', fontSize: '0.8rem' }}>
          {totalCorrect} correct · {totalWrong} wrong · {accuracy}% accuracy · {warpCorrect} warps
        </div>
        <div style={{ color: '#586e75', fontSize: '0.75rem' }}>
          Final integrity: {integrity}% · {unlockedAchievements.length}/{ACHIEVEMENTS.length} achievements
        </div>
      </div>

      {/* Achievement display */}
      {unlockedAchievements.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#586e75', fontSize: '0.65rem', marginBottom: '0.5rem' }}>// EARNED ACHIEVEMENTS</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '400px' }}>
            {unlockedAchievements.map((id) => {
              const a = ACHIEVEMENTS.find((x) => x.id === id);
              return a ? (
                <span
                  key={id}
                  title={a.name + ': ' + a.desc}
                  style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 5px #859900)', cursor: 'help' }}
                >
                  {a.icon}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        style={{
          background: 'transparent', border: '2px solid #859900',
          color: '#859900', fontFamily: '"Share Tech Mono", monospace',
          fontSize: '1rem', padding: '0.75rem 3rem', cursor: 'pointer',
          animation: 'glow 2s ease-in-out infinite alternate',
        }}
      >
        [ NEW JOURNEY ]
      </button>
    </div>
  );
}
