// ============================================================
// LEVEL DEFINITIONS & ACHIEVEMENT REGISTRY
// ============================================================

export const LEVELS = [
  {
    num: 1,
    title: 'Root Initiate',
    icon: '⬡',
    color: '#586e75',
    badge: '[ ⬡ ] ROOT INITIATE',
    minQ: 0,
    maxQ: 50,
    description: 'The terminal boots. You are nobody. Learn to see.',
  },
  {
    num: 2,
    title: 'Bash Nomad',
    icon: '⚡',
    color: '#859900',
    badge: '[ ⚡ ] BASH NOMAD',
    minQ: 51,
    maxQ: 100,
    description: 'Pipes flow. Permissions bend. The shell obeys.',
  },
  {
    num: 3,
    title: 'Sudo Sentinel',
    icon: '🛡',
    color: '#268bd2',
    badge: '[ 🛡 ] SUDO SENTINEL',
    minQ: 101,
    maxQ: 150,
    description: 'Networking stirs. grep reveals what hides.',
  },
  {
    num: 4,
    title: 'Pipe Architect',
    icon: '⊞',
    color: '#2aa198',
    badge: '[ ⊞ ] PIPE ARCHITECT',
    minQ: 151,
    maxQ: 200,
    description: 'Data flows through you. You are the conduit.',
  },
  {
    num: 5,
    title: 'Kernel Nomad',
    icon: '◈',
    color: '#d33682',
    badge: '[ ◈ ] KERNEL NOMAD',
    minQ: 201,
    maxQ: 250,
    description: 'The kernel speaks. Syscalls are your dialect.',
  },
  {
    num: 6,
    title: 'Signal Master',
    icon: '◉',
    color: '#cb4b16',
    badge: '[ ◉ ] SIGNAL MASTER',
    minQ: 251,
    maxQ: 300,
    description: 'Processes rise and fall at your command.',
  },
  {
    num: 7,
    title: 'Daemon Wrangler',
    icon: '⊗',
    color: '#6c71c4',
    badge: '[ ⊗ ] DAEMON WRANGLER',
    minQ: 301,
    maxQ: 350,
    description: 'Services are tamed. The daemon fears you.',
  },
  {
    num: 8,
    title: 'Kernel Architect',
    icon: '🧬',
    color: '#859900',
    badge: '[ 🧬 ] KERNEL ARCHITECT',
    minQ: 351,
    maxQ: 400,
    description: 'You are the system. Neo-Portland awaits.',
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    name: 'First Blood',
    icon: '⚔',
    desc: 'Answer your first question correctly',
    rarity: 'common',
  },
  {
    id: 'vacuum_tube',
    name: 'The Vacuum Tube',
    icon: '⌁',
    desc: 'Survive 2 History Warp events',
    rarity: 'common',
  },
  {
    id: 'silicon_alch',
    name: 'Silicon Alchemist',
    icon: '⚗',
    desc: 'Answer 5 History Warp questions correctly',
    rarity: 'uncommon',
  },
  {
    id: 'analog_ghost',
    name: 'Analog Ghost',
    icon: '◌',
    desc: 'Answer 10 History Warp questions correctly',
    rarity: 'rare',
  },
  {
    id: 'overclocker',
    name: 'Overclocker',
    icon: '⚡',
    desc: 'Get 3 History Warp answers correct in a row',
    rarity: 'uncommon',
  },
  {
    id: 'no_mercy',
    name: 'No Mercy',
    icon: '💀',
    desc: 'Answer 10 consecutive questions without using a hint',
    rarity: 'uncommon',
  },
  {
    id: 'permission_denied',
    name: 'Permission Denied',
    icon: '⊘',
    desc: 'Fail 5 questions in a row (learning the hard way)',
    rarity: 'common',
  },
  {
    id: 'bash_god',
    name: 'Bash God',
    icon: '⊛',
    desc: 'Complete the first 50 questions',
    rarity: 'common',
  },
  {
    id: 'root_access',
    name: 'Root Access',
    icon: '#',
    desc: 'Complete 100 Linux questions',
    rarity: 'uncommon',
  },
  {
    id: 'kernel_panic',
    name: 'Kernel Panic',
    icon: '☠',
    desc: 'Lose all system integrity and face the void',
    rarity: 'common',
  },
  {
    id: 'time_warden',
    name: 'Time Warden',
    icon: '⧖',
    desc: 'Answer a bonus History Warp question in under 10 seconds',
    rarity: 'rare',
  },
  {
    id: 'neo_portland',
    name: 'Neo-Portland',
    icon: '🏁',
    desc: 'Complete all 400 questions — archive delivered',
    rarity: 'legendary',
  },
];

/**
 * Get the level object for a given question index.
 * @param {number} qIdx - Current question index (0-based)
 * @returns {Object} Level definition
 */
export function getLevel(qIdx) {
  for (const level of LEVELS) {
    if (qIdx >= level.minQ && qIdx <= level.maxQ) return level;
  }
  return LEVELS[LEVELS.length - 1];
}
