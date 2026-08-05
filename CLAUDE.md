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
- `npm run deploy` — `predeploy` runs a build, then publishes `dist/` to GitHub Pages via `gh-pages`

There is no test suite in this project.

## Architecture

Single-page app, client-routed with **Wouter** (`src/App.tsx`), mounted with
`base={import.meta.env.BASE_URL}` so routing works whether served from `/` or a subpath. Routes:
`/` (home/marketing), `/spells` (resources/downloads), `/privacy-policy`.

- `src/components/ui/` — shadcn/ui primitives (Radix-based). Path alias `@/*` → `src/*`
  (`tsconfig.app.json`, mirrored in `vite.config.ts`).
- `src/lib/files.ts` — hardcoded metadata (name/description/date) for the two downloadable spell
  data files shown on `/spells`.
- `src/files/` — the actual spell JSON payloads served for download. **This directory is
  git-ignored** (`.gitignore: /src/files`) — it exists locally but isn't in version control, so
  `git clone` alone won't reproduce it. `FileGrid` (`src/components/file-grid.tsx`) imports the
  JSON directly and wires each import positionally to `files[0]`/`files[1]` from `lib/files.ts` —
  if you add/reorder entries in `lib/files.ts`, update the imports/indices in `file-grid.tsx` to
  match.
- `src/lib/queryClient.ts` and the `@tanstack/react-query` / `drizzle-kit` dependencies are unused
  leftovers from the Replit full-stack template this project was bootstrapped from — there is no
  backend or database in this app. Don't assume either is wired up.
- Downloads are client-side only: `FileCard` (`src/components/file-card.tsx`) builds a `Blob` from
  the JSON content and triggers an `<a download>` click; the progress bar is a simulated timer, not
  a real transfer.

### GitHub Pages deployment specifics (see `.cursor/rules/*.mdc` for the source of these)

- Served from `/` (root), not a subpath — don't hardcode a non-root Vite `base`.
- `scripts/copy-spa-fallback.mjs` runs after every build and copies `dist/index.html` to:
  - `dist/404.html` — GitHub Pages' way of supporting client-side deep links.
  - `dist/privacy-policy/index.html` — so direct HTTP requests to `/privacy-policy/` return a real
    200 (needed for Google Play privacy-policy URL verification), not just a client redirect.
- Windows/PowerShell: avoid `&&` in suggested command chains (use `;` or separate commands).

## Agent skills

### Issue tracker

Local markdown under `.scratch/<feature-slug>/` — no GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical roles used as-is. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
