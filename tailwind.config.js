/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core tech-noir palette
        'noir-black':    '#020508',
        'terminal-bg':   '#050a0e',
        'deep-slate':    '#073642',
        'slate-blue':    '#272935',
        'solar-green':   '#859900',
        'solar-cyan':    '#2aa198',
        'solar-blue':    '#268bd2',
        'solar-amber':   '#b58900',
        'solar-red':     '#dc322f',
        'solar-magenta': '#d33682',
        'solar-violet':  '#6c71c4',
        'solar-orange':  '#cb4b16',
        'terminal-gray': '#839496',
        'dim-gray':      '#586e75',
        'bright-text':   '#fdf6e3',
        'mid-gray':      '#93a1a1',
        // Semantic aliases
        'integrity-high':  '#859900',
        'integrity-mid':   '#b58900',
        'integrity-low':   '#dc322f',
        'overclock-white': '#fdf6e3',
      },
      fontFamily: {
        mono:    ['"Share Tech Mono"', 'monospace'],
        display: ['"VT323"', 'monospace'],
        body:    ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'glow':       'glow 2s ease-in-out infinite alternate',
        'glow-fast':  'glow 0.5s ease-in-out infinite alternate',
        'blink':      'blink 1s step-end infinite',
        'shake':      'shake 0.5s ease',
        'fadeIn':     'fadeIn 0.4s ease',
        'slideIn':    'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'scanline':   'scanline 8s linear infinite',
        'matrix':     'matrix 2s ease-in-out infinite alternate',
        'overclock':  'overclock 1s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 5px #859900' },
          'to':   { textShadow: '0 0 20px #859900, 0 0 40px #859900' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        shake: {
          '0%,100%':          { transform: 'translateX(0)' },
          '10%,30%,50%,70%,90%': { transform: 'translateX(-6px) rotate(-0.5deg)' },
          '20%,40%,60%,80%':  { transform: 'translateX(6px) rotate(0.5deg)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to':   { opacity: '1', transform: 'translateX(0)' },
        },
        scanline: {
          'from': { top: '-5%' },
          'to':   { top: '105%' },
        },
        matrix: {
          'from': { opacity: '0.8' },
          'to':   { opacity: '0.2' },
        },
        overclock: {
          '0%,100%': { boxShadow: 'inset 0 0 10px rgba(253,246,227,0.1)' },
          '50%':     { boxShadow: 'inset 0 0 30px rgba(253,246,227,0.2)' },
        },
      },
      boxShadow: {
        'terminal': '0 0 20px rgba(133,153,0,0.3)',
        'warp':     '0 0 40px rgba(181,137,0,0.6)',
        'overclock':'0 0 40px rgba(253,246,227,0.4)',
        'danger':   '0 0 20px rgba(220,50,47,0.4)',
      },
    },
  },
  plugins: [],
}
