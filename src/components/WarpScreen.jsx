// ============================================================
// WARP SCREEN — History Warp bonus question modal
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { useGameStore, checkAnswer } from '../stores/gameStore';

export function WarpScreen() {
  const showWarp = useGameStore((s) => s.showWarp);
  const warpQuestion = useGameStore((s) => s.warpQuestion);
  const submitWarpAnswer = useGameStore((s) => s.submitWarpAnswer);
  const skipWarp = useGameStore((s) => s.skipWarp);

  const [input, setInput] = useState('');
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const inputRef = useRef(null);

  useEffect(() => {
    if (showWarp) {
      setInput('');
      setResult(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showWarp]);

  if (!showWarp || !warpQuestion) return null;

  const handleSubmit = () => {
    if (!input.trim() || result !== null) return;
    const correct = checkAnswer(input, warpQuestion.answer);
    setResult(correct ? 'correct' : 'wrong');
    setTimeout(() => submitWarpAnswer(input), 1400);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.96)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'monospace',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{
        border: '2px solid #b58900',
        padding: '2rem',
        maxWidth: '680px', width: '90%',
        boxShadow: '0 0 40px rgba(181,137,0,0.6)',
        background: '#050a0e',
        animation: result === null ? 'warp-pulse 1.5s ease-in-out infinite' : 'none',
      }}>
        {/* Header */}
        <div style={{ color: '#b58900', textAlign: 'center', fontSize: '0.7rem', letterSpacing: '0.35em', marginBottom: '0.4rem' }}>
          ⚠ HISTORY WARP DETECTED ⚠
        </div>
        <div style={{ color: '#b58900', textAlign: 'center', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
          {Array(42).fill('─').join('')}
        </div>
        <div style={{ color: '#586e75', textAlign: 'center', fontSize: '0.7rem', marginBottom: '1.25rem' }}>
          ERA: {warpQuestion.era} · RELIC ANOMALY DETECTED · ANSWER TO UNLOCK OVERCLOCK
        </div>

        {/* Question */}
        <div style={{
          color: '#fdf6e3', fontSize: '0.95rem', lineHeight: 1.8,
          marginBottom: '1.5rem', textAlign: 'center',
          background: 'rgba(181,137,0,0.05)', padding: '1rem',
          border: '1px solid rgba(181,137,0,0.2)',
        }}>
          {warpQuestion.scenario}
        </div>

        {/* Hint */}
        <div style={{ color: '#586e75', fontSize: '0.72rem', marginBottom: '0.75rem', textAlign: 'center' }}>
          HINT: <span style={{ color: '#839496' }}>{warpQuestion.hint}</span>
        </div>

        {/* Input */}
        <div style={{ color: '#586e75', fontSize: '0.7rem', marginBottom: '0.4rem' }}>
          {'>'} enter historical data key:
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={result !== null}
          style={{
            background: 'transparent', border: 'none',
            borderBottom: '2px solid #b58900',
            color: '#b58900', fontFamily: 'monospace', fontSize: '1rem',
            width: '100%', outline: 'none', padding: '0.5rem 0',
            marginBottom: '1rem',
          }}
          placeholder="// type your answer..."
          autoComplete="off"
          spellCheck="false"
        />

        {/* Result feedback */}
        {result && (
          <div style={{
            color: result === 'correct' ? '#859900' : '#dc322f',
            textAlign: 'center', fontSize: '1rem', marginBottom: '1rem',
            textShadow: result === 'correct' ? '0 0 10px #859900' : '0 0 10px #dc322f',
          }}>
            {result === 'correct'
              ? '✓ OVERCLOCK GRANTED — TIMELINE STABILIZED — +10 MILES +20% INTEGRITY'
              : `✗ TEMPORAL DESYNC — CORRECT: ${warpQuestion.answer}`}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={handleSubmit}
            disabled={result !== null}
            style={{
              background: 'transparent', border: '1px solid #b58900', color: '#b58900',
              fontFamily: 'monospace', padding: '0.5rem 2rem',
              cursor: result !== null ? 'default' : 'pointer', fontSize: '0.85rem',
              opacity: result !== null ? 0.5 : 1,
            }}
          >
            [ SUBMIT ]
          </button>
          <button
            onClick={skipWarp}
            disabled={result !== null}
            style={{
              background: 'transparent', border: '1px solid #586e75', color: '#586e75',
              fontFamily: 'monospace', padding: '0.5rem 1.5rem',
              cursor: result !== null ? 'default' : 'pointer', fontSize: '0.85rem',
              opacity: result !== null ? 0.5 : 1,
            }}
          >
            [ SKIP WARP ]
          </button>
        </div>

        {/* Reward preview */}
        <div style={{ color: '#586e75', textAlign: 'center', fontSize: '0.65rem', marginTop: '1rem' }}>
          Correct: +10 miles · +20% integrity · +15 power cells · OVERCLOCK 60s · Skip 5 questions
        </div>
      </div>
    </div>
  );
}
