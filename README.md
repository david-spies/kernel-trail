<img width="1280" height="634" alt="TheKernelTrail" src="https://github.com/user-attachments/assets/667e25eb-dd45-4510-bc31-6e3da3a38561" />

# 🖥️ The Kernel Trail

> *"They died as they lived — with insufficient privileges."*

**The Kernel Trail** is a tech-noir survival game in the spirit of *The Oregon Trail*, built to teach Linux commands (A–Z) and IT history through gameplay. Set in **2099**, the Cloud has collapsed. You are a **Data Scavenger** tasked with migrating humanity's last archive across the **Great Dead Network** to the final surviving server farm in **Neo-Portland**. Your only weapon: a Linux terminal.

![Version](https://img.shields.io/badge/version-2.1-4dff4d?style=flat-square)
![Node](https://img.shields.io/badge/node-18+-5D81FF?style=flat-square)
![React](https://img.shields.io/badge/react-18.3.1-ff751a?style=flat-square)
![Vite](https://img.shields.io/badge/vite-5.3.1-33ccff?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-F0F2F5?style=flat-square)

---

## 🎮 Gameplay

Type the correct Linux command to advance the trail. Wrong answers deal damage to your **System Integrity**. Reach 0% and get a kernel panic. Every 10 miles, a **History Warp** anomaly triggers a bonus IT history question — answer it correctly to activate **Overclock Mode** and skip ahead.

- **400 Linux questions** — commands A–Z, difficulty 1–5
- **100 IT History Warp questions** — 1943 (Colossus) through 2024 (XZ Utils backdoor)
- **8 level tiers** — Root Initiate → Kernel Architect
- **14 achievements** to unlock across the run
- **Overclock Mode** — 60-second power surge that increases healing and changes the terminal aesthetic

---

## 🗺️ Level Tiers

| # | Title              | Questions | Difficulty  | Commands Covered         |
|---|--------------------|-----------|-------------|--------------------------|
| 1 | ⬡ Root Initiate    | 1–50      | Greenhorn   | Basics: ls, cd, cat, cp  |
| 2 | ⚡ Bash Nomad      | 51–100    | Beginner    | Permissions, pipes, ssh  |
| 3 | 🛡 Sudo Sentinel    | 101–150   | Intermediate| Networking, cron, sed    |
| 4 | ⊞ Pipe Architect   | 151–200   | Intermediate | System tools, scripting  |
| 5 | ◈ Kernel Nomad     | 201–250   | Advanced     | Syscalls, iptables, lvm  |
| 6 | ◉ Signal Master    | 251–300   | Advanced     | Perf, namespaces, crypto |
| 7 | ⊗ Daemon Wrangler  | 301–350   | Expert       | Containers, DevOps       |
| 8 | 🧬 Kernel Architect| 351–400   | Expert       | Kernel internals, ZFS    |

---

## ⚡ History Warp System

A **History Warp** anomaly triggers every 10 miles. An amber alert screen appears with an IT history question. Answering correctly rewards:

- *+10 miles* traveled instantly
- *+20% System Integrity* restored
- *+15 Power Cells*
- *ACTIVATE OVERCLOCK MODE* (60 seconds — terminal glows white)
- *5 Linux questions skipped*

Answering wrong costs **−15% Integrity** and triggers a glitch animation. You can also skip with no penalty.

History questions span 1940–2024: Colossus, ENIAC, Unix, Linux's birth, the dotcom boom, Git, Docker, Kubernetes, Shellshock, Log4Shell, XZ Utils backdoor, and more.

---

## 🏆 Achievements

| Icon | Name | Unlock Condition |
|------|------|-----------------|
| ⚔ | First Blood | Answer your first question correctly |
| ⌁ | The Vacuum Tube | Survive 2 History Warp events |
| ⚗ | Silicon Alchemist | Answer 5 Warp questions correctly |
| ◌ | Analog Ghost | Answer 10 Warp questions correctly |
| ⚡ | Overclocker | 3 correct Warp answers in a row |
| ⊛ | No Mercy | 10 correct answers without using a hint |
| ⊘ | Permission Denied | Fail 5 questions in a row |
| # | Bash God | Complete the first 50 questions |
| ★ | Root Access | Complete 100 questions |
| ◑ | Half the Trail | Reach question 200 |
| ▲ | sudo make me | Complete the Sudo Sentinel tier |
| ☠ | Kernel Panic | Die and come back |
| ⧖ | Time Warden | Answer a Warp in under 10 seconds |
| 🏁 | Neo-Portland | Complete all 400 questions |

---

## 🚀 Quick Start

See **QUICKSTART.md** for a step-by-step install and run guide.

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build tool | Vite 5 |
| State | Zustand 4 |
| Styling | Tailwind CSS 3 + inline styles |
| Fonts | VT323, Share Tech Mono (Google Fonts) |
| Icons | lucide-react |
| Language | JavaScript (ESM) |

See **TECHSTACK.md** for rationale and architecture notes.

---

## 📁 Project Structure

```
kernel-trail/
├── src/
│   ├── App.jsx                  ← Root component, screen router
│   ├── main.jsx                 ← React DOM mount
│   ├── styles/index.css         ← Tailwind + global keyframes
│   ├── data/                    ← All question banks and config
│   ├── stores/gameStore.js      ← Zustand state + all game actions
│   ├── hooks/                   ← useOverclock, useKeyboardShortcuts
│   └── components/              ← UI: HUD, Terminal, Sidebar, screens
├── index.html                   ← Root HTML, Google Fonts
├── vite.config.js
├── tailwind.config.js
└── package.json
```

See **DEVELOPMENT.md** for the complete file map and architectural guide.

---

## 🎨 Design Language

- **Palette**: Solarized Green `#859900` · Slate `#073642` · Void Black `#020508` · Amber `#b58900` · Danger Red `#dc322f`
- **Fonts**:   VT323 (display/headings) · Share Tech Mono (terminal body)
- **Effects**: CRT scanline overlay · Katakana matrix rain on intro · Screen shake on wrong answers · Overclock white glow · Red flash on damage
- **Aesthetic**: Tech-noir terminal, Gen Z dark academia, Mr. Robot meets Oregon Trail

---

## 📄 License

MIT — use it, fork it, teach with it.
