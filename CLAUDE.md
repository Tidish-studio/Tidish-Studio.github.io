# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

This is the "Spellbook" repo (remote: `git@github.com:Tidish-studio/Spellbook.git`, branch
`master`) — a static marketing/download site for the DnD Spells 5e mobile app (see `CONTEXT.md` for
the app's canonical name and this site's full purpose), built with Vite + React + TypeScript,
deployed to GitHub Pages.

**Repo identity note:** the GitHub repo was renamed from `Spellbook` to `Tidish-Studio.github.io`
(the special `<org>.github.io` name, which is why the site publishes at the bare
`https://tidish-studio.github.io/` root instead of a `/Spellbook/` subpath). The local remote URL
above is the old name — GitHub transparently redirects git push/fetch for renamed repos, so it still
works. `master` holds source; a separate `gh-pages` branch (pushed to by `npm run deploy`, see
below) holds the built static output GitHub Pages actually serves — don't confuse the two.

The parent directory (one level up) contains unrelated app-store/design collateral (`Images/`,
`launchericons/`, `app.docx`, `spellbook.db`, etc.) — not part of this codebase, ignore it.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (`tsc -b`) + Vite build, then `postbuild` auto-runs
  `scripts/copy-spa-fallback.mjs` (see below)
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run preview` — preview the production build locally
- `npm run deploy` — `predeploy` runs a build, then publishes `dist/` to GitHub Pages via `gh-pages`.
  **Only run this when the maintainer explicitly asks for a deploy in that session.** Never as a
  follow-on to finishing work, and never to "verify" a change. Verify locally instead
  (`npm run build`, `npm run lint`, dev server or `npm run preview`) and hand back.

There is no test suite in this project, and none is wanted. The verification gate for any change is
`npm run build` + `npm run lint` + rendering the three routes locally with a clean console.

## Local verification

`npm run build` and `npm run lint` passing is necessary but not sufficient. This site's failure
modes are things a typecheck cannot see: a 404 status behind a page that renders fine, a download
link that resolves to HTML, a theme that shifts. Actually load it.

1. `npm run preview` (serves the real build on 4173, not the dev server) and drive it in a browser.
2. Check `/`, `/spells` and `/privacy-policy`, plus **fetch both download URLs and confirm they
   parse as JSON arrays with the expected spell counts**. A download link that 404s still renders a
   perfectly good-looking card.
3. `npm run lint` currently reports 2 `react-refresh/only-export-components` warnings, on
   `theme-provider.tsx` and `button.tsx`. Those are expected. **0 errors is the bar.**

Gotchas that have cost time before:

- **Browser extensions pollute the console.** A "clean console" check will surface a dozen
  MetaMask/`ObjectMultiplex` warnings from `chrome-extension://` origins. Filter by source before
  concluding the app is broken, or that it is fine.
- **`gh` CLI is not installed here.** For anything about the GitHub repo, branches or Pages state,
  use `WebFetch` against the GitHub web UI instead of shelling out.
- **`du -sh node_modules` takes longer than the 2 minute Bash timeout** on this machine. Avoid it.
- **Comparing rendered output against a previous build no longer works via `git show`.** `dist/` was
  untracked in Aug 2026, so built output is no longer in history. To diff appearance against an
  older commit, `git worktree add` that commit, build it there, and serve both with
  `npx vite preview --outDir <path> --port <n>`.
- **After `npm run deploy`, GitHub Pages takes a moment and your browser will happily show the old
  build.** Poll with cache-busting query strings until the new asset hash appears before declaring
  the deploy verified.

## Architecture

Single-page app, client-routed with **Wouter** (`src/App.tsx`). Routes: `/` (home/marketing),
`/spells` (resources/downloads), `/privacy-policy`. Path alias `@/*` → `src/*`
(`tsconfig.app.json`, mirrored in `vite.config.ts`).

The project was bootstrapped from a Replit full-stack template and carried a large amount of unused
scaffolding (46 shadcn components, ~20 unused packages, a dead toast system, a `drizzle`/
`react-query` layer with no backend behind it). That was stripped out in the 2026-08-05 cleanup;
see `.scratch/site-cleanup/plan.md`. Don't reintroduce that shape. Two shadcn primitives remain,
`button` and `card`, and the shadcn CLI is not configured — to add another, copy the file from
ui.shadcn.com and install its Radix package.

- `src/lib/files.ts` — the download manifest. Each `SpellResource` carries name, description,
  `lastUpdated` and a `url` pointing into `public/downloads/`. This is the **only** file to edit when
  publishing a new spell resource; nothing wires files positionally anymore.
- `public/downloads/` — the spell JSON actually served. **Git-ignored** (`.gitignore:
  /public/downloads`), deliberately: the maintainer keeps spell content out of the source branch. It
  still reaches GitHub through the `gh-pages` branch, which is unavoidable when GitHub Pages serves
  it. A fresh clone will build fine but the download links will 404 until the files are restored.
- `src/files/` — the maintainer's archive of every spell file version, also git-ignored. **Not
  served.** Do not confuse it with `public/downloads/`. Which archived file should go live is an
  open question gated on the app version; see `.scratch/site-cleanup/issues/04-*`.
- Downloads are plain `<a href download>` links to static files. No Blob, no fetch, no progress bar.
- Spell JSON must never be `import`ed into a component. It was, once, and it put 5.4 MB of spell data
  into the JS bundle that every homepage visitor downloaded.

### GitHub Pages deployment specifics (see `.cursor/rules/*.mdc` for the source of these)

- Served from `/` (root), not a subpath — don't hardcode a non-root Vite `base`.
- Wouter's `base` must have no trailing slash. `import.meta.env.BASE_URL` is `/`, and passing it
  through unmodified makes wouter emit protocol-relative hrefs like `//spells` (which resolve to the
  *host* `spells`). `src/App.tsx` strips the trailing slash.
- `scripts/copy-spa-fallback.mjs` runs after every build. It copies `dist/index.html` to
  `dist/404.html` as the catch-all, and emits `dist/<route>/index.html` for every route in its
  `routes` list so direct requests return a real 200. **Keep that list in sync with the routes in
  `src/App.tsx`**, and read `docs/adr/0001-static-route-stubs-for-github-pages.md` before touching
  any of it — a 404 on `/privacy-policy` once got the app rejected from Google Play.
- Windows/PowerShell: avoid `&&` in suggested command chains (use `;` or separate commands).

## Agent skills

### Issue tracker

Local markdown under `.scratch/<feature-slug>/` — no GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical roles used as-is. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
