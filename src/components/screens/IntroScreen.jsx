import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Scanlines } from '../Scanlines';
import { MatrixRain } from '../MatrixRain';

export function IntroScreen() {
  const [nameInput, setNameInput] = useState('');
  const startGame = useGameStore((s) => s.startGame);

  const handleStart = () => {
    startGame(nameInput.trim() || 'ANON');
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#020508',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Share Tech Mono", monospace',
      position: 'relative', overflow: 'hidden',
    }}>
      <Scanlines />
      <MatrixRain />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '680px', padding: '2rem', animation: 'fadeIn 1s ease' }}>

        {/* Tagline */}
        <div style={{ color: '#586e75', fontSize: '0.7rem', letterSpacing: '0.4em', marginBottom: '0.5rem' }}>
          YEAR 2099 · CLOUD COLLAPSED · LAST SERVER: NEO-PORTLAND
        </div>

        {/* Title */}
        <div style={{
          fontSize: 'clamp(2.5rem, 9vw, 5.5rem)',
          color: '#859900',
          fontFamily: '"VT323", monospace',
          lineHeight: 1,
          animation: 'glow 2s ease-in-out infinite alternate',
          marginBottom: '0.4rem',
        }}>
          THE KERNEL TRAIL
        </div>

        <div style={{ color: '#268bd2', fontSize: '0.85rem', marginBottom: '2rem', letterSpacing: '0.15em' }}>
          // A DATA SCAVENGER'S JOURNEY ACROSS THE DEAD NETWORK
        </div>

        {/* Mission brief */}
        <div style={{
          background: '#073642', border: '1px solid #586e75',
          padding: '1.5rem', marginBottom: '2rem',
          textAlign: 'left', fontSize: '0.85rem',
          color: '#839496', lineHeight: 1.8,
        }}>
          <div style={{ color: '#859900', marginBottom: '0.5rem' }}>{'>'} MISSION BRIEF:</div>
          The Cloud has collapsed. You are a{' '}
          <span style={{ color: '#fdf6e3' }}>Data Scavenger</span> tasked with migrating
          humanity's last archive across the{' '}
          <span style={{ color: '#fdf6e3' }}>Great Dead Network</span> to the surviving
          server farm in <span style={{ color: '#268bd2' }}>Neo-Portland</span>.<br /><br />
          Your weapon: a <span style={{ color: '#859900' }}>Linux Terminal</span>.
          Your survival: your knowledge.<br />
          <span style={{ color: '#b58900' }}>400 Linux challenges</span> and{' '}
          <span style={{ color: '#b58900' }}>100 History Warp anomalies</span>{' '}
          stand between you and salvation.
          <br /><br />
          <span style={{ color: '#dc322f' }}>⚠ Wrong answers damage System Integrity. Reach 0% and die.</span>
        </div>

        {/* Name input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#586e75', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            {'>'} IDENTIFY SCAVENGER:
          </div>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="// enter callsign..."
            maxLength={20}
            style={{
              background: 'transparent', border: 'none',
              borderBottom: '2px solid #859900',
              color: '#859900', fontFamily: '"Share Tech Mono", monospace',
              fontSize: '1rem', width: '100%', maxWidth: '300px',
              outline: 'none', padding: '0.5rem 0',
              textAlign: 'center',
            }}
            autoFocus
          />
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          style={{
            background: 'transparent', border: '2px solid #859900',
            color: '#859900', fontFamily: '"Share Tech Mono", monospace',
            fontSize: '1rem', padding: '0.75rem 3rem',
            cursor: 'pointer', letterSpacing: '0.2em',
            animation: 'glow 2s ease-in-out infinite alternate',
            display: 'block', margin: '0 auto',
          }}
        >
          [ BOOT TERMINAL ]
        </button>

        {/* Footer stats */}
        <div style={{ color: '#586e75', fontSize: '0.65rem', marginTop: '1.5rem', lineHeight: 2 }}>
          400 Linux Questions · A–Z Commands · 100 IT History Bonus<br />
          8 Level Tiers · 12 Achievements · Overclock Mode
        </div>
      </div>
    </div>
  );
}
