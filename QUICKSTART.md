# QUICKSTART — The Kernel Trail

Get the game running in under 5 minutes.

---

## Prerequisites

| Tool | Minimum Version | Check |
|------|----------------|-------|
| Node.js | 18.0.0 | `node -v` |
| npm | 9.0.0 | `npm -v` |

Node 18+ is required for Vite 5 and native ESM. If you need to manage multiple Node versions, [nvm](https://github.com/nvm-sh/nvm) is recommended.

---

## 1. Install dependencies

```bash
cd kernel-trail
npm install
```

This installs React, Vite, Zustand, Tailwind CSS, and all dev tools (~180 MB in `node_modules`).

---

## 2. Start the development server

```bash
npm run dev
```

Open your browser to **http://localhost:5173**

The dev server supports hot module replacement — edits to any `.jsx`, `.js`, or `.css` file reload instantly without losing game state (as long as you haven't changed the store).

---

## 3. Play the game

1. Enter your **callsign** on the intro screen (or leave blank for "ANON")
2. Press **[ BOOT TERMINAL ]** or hit `Enter`
3. Read the scenario, type your Linux command, press `Enter`
4. Use **[ SHOW HINT ]** if stuck — it resets your no-hint streak
5. Use **[ SKIP ]** to skip a question — costs integrity equal to `difficulty × 5%`
6. When a **History Warp** appears, answer the IT history question for a big bonus

---

## 4. Build for production

```bash
npm run build
```

Output goes to `dist/`. The build is fully static — no server required. Deploy to any static host (Netlify, Vercel, GitHub Pages, Nginx).

```bash
npm run preview    # serve the production build locally on port 4173
```

---

## 5. Lint

```bash
npm run lint
```

Uses ESLint with React, React Hooks, and React Refresh plugins.

---

## Common Issues

**Port 5173 already in use**
Change it in `vite.config.js`:
```js
server: { port: 3000 }
```

**`node_modules` missing / corrupted**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Fonts not loading**
The Google Fonts CDN link in `index.html` requires internet access. Offline: download Share Tech Mono and VT323, place them in `public/fonts/`, and update `src/styles/index.css` with `@font-face` declarations.

**Questions not advancing**
Make sure you're pressing `Enter` or clicking `[ EXECUTE ]` — not just typing in the input box. The input is a regular `<input>` element, not a form.

---

## Environment Notes

The project has no `.env` file or environment variables. Everything is hardcoded for a zero-config local setup. For a deployed version behind authentication or with a backend leaderboard, you would add a `.env.local` with your API endpoints.
