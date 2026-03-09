import { useGameStore } from '../../stores/gameStore';
import { Scanlines } from '../Scanlines';

export function DeathScreen() {
  const playerName = useGameStore((s) => s.playerName);
  const miles = useGameStore((s) => s.miles);
  const qIdx = useGameStore((s) => s.qIdx);
  const totalCorrect = useGameStore((s) => s.totalCorrect);
  const totalWrong = useGameStore((s) => s.totalWrong);
  const warpCorrect = useGameStore((s) => s.warpCorrect);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <div style={{
      minHeight: '100vh', background: '#0d0000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Share Tech Mono", monospace',
      color: '#dc322f', textAlign: 'center', padding: '2rem',
    }}>
      <Scanlines />

      <div style={{
        fontFamily: '"VT323", monospace',
        fontSize: 'clamp(3rem, 10vw, 6rem)',
        animation: 'glow 1s ease-in-out infinite alternate',
        marginBottom: '0.5rem',
      }}>
        KERNEL PANIC
      </div>

      <div style={{ color: '#586e75', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
        [ SYSTEM INTEGRITY: 0% ] // FATAL ERROR: DATA CORRUPTION
      </div>

      <div style={{ color: '#586e75', fontSize: '0.7rem', marginBottom: '2rem' }}>
        {'>'} Core dump written to /dev/null
      </div>

      <div style={{ color: '#839496', marginBottom: '0.5rem' }}>
        Scavenger <span style={{ color: '#fdf6e3' }}>{playerName}</span>{' '}
        reached mile <span style={{ color: '#b58900' }}>{miles}</span> of 400
      </div>

      <div style={{ color: '#586e75', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
        {qIdx} questions · {totalCorrect} correct · {totalWrong} wrong · {warpCorrect} warps survived
      </div>

      {/* Epitaph */}
      <div style={{
        color: '#586e75', fontSize: '0.72rem',
        border: '1px solid #3a0000', padding: '1rem',
        margin: '1.5rem 0', maxWidth: '400px',
        background: 'rgba(220,50,47,0.05)',
      }}>
        "They died as they lived — with insufficient privileges."<br />
        <span style={{ color: '#3a0000' }}>— /var/log/epitaph.txt</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => startGame(playerName)}
          style={{
            background: 'transparent', border: '2px solid #dc322f', color: '#dc322f',
            fontFamily: 'monospace', padding: '0.75rem 2rem',
            cursor: 'pointer', fontSize: '0.9rem',
          }}
        >
          [ REBOOT TERMINAL ]
        </button>
        <button
          onClick={resetGame}
          style={{
            background: 'transparent', border: '1px solid #586e75', color: '#586e75',
            fontFamily: 'monospace', padding: '0.75rem 2rem',
            cursor: 'pointer', fontSize: '0.9rem',
          }}
        >
          [ MAIN MENU ]
        </button>
      </div>
    </div>
  );
}
