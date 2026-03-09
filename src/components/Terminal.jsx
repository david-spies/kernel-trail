// ============================================================
// TERMINAL — Main question/answer interface
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { LINUX_QUESTIONS } from '../data/questions';

export function Terminal() {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const qIdx = useGameStore((s) => s.qIdx);
  const feedback = useGameStore((s) => s.feedback);
  const showHint = useGameStore((s) => s.showHint);
  const overclock = useGameStore((s) => s.overclock);
  const playerName = useGameStore((s) => s.playerName);
  const gameLog = useGameStore((s) => s.gameLog);

  const submitAnswer = useGameStore((s) => s.submitAnswer);
  const skipQuestion = useGameStore((s) => s.skipQuestion);
  const toggleHint = useGameStore((s) => s.toggleHint);

  const currentQ = LINUX_QUESTIONS[Math.min(qIdx, LINUX_QUESTIONS.length - 1)];
  const accentColor = overclock ? '#fdf6e3' : '#859900';

  // Focus input after feedback clears
  useEffect(() => {
    if (feedback === null) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [feedback, qIdx]);

  // Clear input when question changes
  useEffect(() => {
    setInput('');
  }, [qIdx]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    if (!input.trim() || feedback !== null) return;
    submitAnswer(input);
    setInput('');
  };

  const diffLabel = ['', 'NOVICE', 'EASY', 'MEDIUM', 'HARD', 'EXPERT'][currentQ?.difficulty || 1];

  return (
    <div style={{
      border: `1px solid ${overclock ? '#fdf6e3' : '#073642'}`,
      background: '#050a0e',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'border-color 0.4s',
      animation: overclock ? 'overclock 1s ease-in-out infinite' : 'none',
    }}>
      {/* Titlebar */}
      <div style={{
        background: '#073642',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${overclock ? '#fdf6e3' : '#073642'}`,
        transition: 'border-color 0.4s',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {['#dc322f', '#b58900', '#859900'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ color: '#586e75', fontSize: '0.68rem' }}>
          kernel-trail@neo-portland ~ ch{currentQ?.chapter || 1}
        </div>
        <div style={{ color: overclock ? '#fdf6e3' : '#586e75', fontSize: '0.68rem', transition: 'color 0.3s' }}>
          {overclock ? '⚡ OVERCLOCK' : `[${diffLabel}]`}
        </div>
      </div>

      {/* Question area */}
      <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>

        {/* Question header */}
        <div style={{ animation: 'fadeIn 0.4s ease' }}>
          <div style={{ color: '#586e75', fontSize: '0.68rem', marginBottom: '0.5rem' }}>
            {'>'} SCENARIO [{currentQ?.cmd?.toUpperCase()}] // question {qIdx + 1} of 400
          </div>
          <div style={{
            color: overclock ? '#fdf6e3' : '#839496',
            fontSize: '0.98rem',
            lineHeight: 1.8,
            background: '#073642',
            padding: '1rem',
            borderLeft: `3px solid ${overclock ? '#fdf6e3' : '#268bd2'}`,
            transition: 'all 0.3s',
            userSelect: 'text',
            WebkitUserSelect: 'text',
          }}>
            {currentQ?.scenario}
          </div>
        </div>

        {/* Hint */}
        {showHint && (
          <div style={{
            color: '#b58900',
            fontSize: '0.8rem',
            background: 'rgba(181,137,0,0.08)',
            padding: '0.75rem 1rem',
            border: '1px solid rgba(181,137,0,0.25)',
            animation: 'fadeIn 0.3s ease',
          }}>
            {'>'} HINT: <span style={{ color: '#fdf6e3' }}>{currentQ?.hint}</span>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div style={{
            textAlign: 'center',
            fontSize: '0.95rem',
            padding: '0.5rem',
            color: feedback === 'correct' ? '#859900' : '#dc322f',
            textShadow: feedback === 'correct' ? '0 0 12px #859900' : '0 0 12px #dc322f',
            animation: 'fadeIn 0.2s ease',
          }}>
            {feedback === 'correct'
              ? `✓ COMMAND ACCEPTED // +1 MILE ${overclock ? '// OVERCLOCK +3% INTEGRITY' : ''}`
              : `✗ SYSTEM ERROR: INVALID SYNTAX // -${currentQ?.difficulty * 5}% INTEGRITY`}
          </div>
        )}

        {/* Show correct answer on wrong */}
        {feedback === 'wrong' && (
          <div style={{ color: '#586e75', fontSize: '0.75rem', textAlign: 'center' }}>
            Expected:{' '}
            <span style={{ color: '#fdf6e3', userSelect: 'text', WebkitUserSelect: 'text' }}>
              {currentQ?.answer}
            </span>
          </div>
        )}

        {/* Input area — pinned to bottom */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ color: '#586e75', fontSize: '0.68rem', marginBottom: '0.4rem' }}>
            {'>'} {playerName || 'scavenger'}@kernel-trail:~$
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: accentColor, fontSize: '1rem', transition: 'color 0.3s' }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={feedback !== null}
              placeholder="// type your command and press Enter..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${accentColor}`,
                color: accentColor,
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '1rem',
                outline: 'none',
                padding: '0.5rem 0',
                caretColor: accentColor,
                transition: 'border-color 0.3s, color 0.3s',
              }}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSubmit}
              style={{
                background: 'transparent',
                border: `1px solid ${accentColor}`,
                color: accentColor,
                fontFamily: 'monospace',
                padding: '0.4rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s',
              }}
            >
              [ EXECUTE ]
            </button>
            <button
              onClick={toggleHint}
              style={{
                background: 'transparent',
                border: '1px solid #b58900',
                color: '#b58900',
                fontFamily: 'monospace',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              {showHint ? '[ HIDE HINT ]' : '[ SHOW HINT ]'}
            </button>
            <button
              onClick={skipQuestion}
              style={{
                background: 'transparent',
                border: '1px solid #586e75',
                color: '#586e75',
                fontFamily: 'monospace',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              [ SKIP (-{currentQ?.difficulty * 5}%) ]
            </button>
          </div>
        </div>
      </div>

      {/* Terminal log footer */}
      <div style={{
        borderTop: '1px solid #073642',
        padding: '0.4rem 1rem',
        maxHeight: '72px',
        overflow: 'hidden',
        background: '#020508',
      }}>
        {gameLog.length === 0 ? (
          <div style={{ color: '#073642', fontSize: '0.62rem' }}>// awaiting input...</div>
        ) : (
          gameLog.slice(-3).map((line, i) => (
            <div key={i} style={{
              color: line.startsWith('[+]') ? '#859900' : line.startsWith('[⚡]') ? '#b58900' : '#dc322f',
              fontSize: '0.62rem',
              lineHeight: 1.6,
            }}>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
