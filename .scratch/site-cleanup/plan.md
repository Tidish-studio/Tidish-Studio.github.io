# Site cleanup plan

Agreed with the maintainer on 2026-08-05. Status of each step is marked inline; keep this file
current as implementation proceeds.

## Goal

Make the maintenance workflow "replace the spell file, deploy, done", and strip the Replit template
debris this project was bootstrapped from. **The architecture stays as it is.** Vite + React +
wouter + gh-pages is correct and proportionate for three static pages. This is a cleanup, not a
re-architecture.

## Scope boundaries

- **No content change to the live spell downloads.** The two files currently offered stay exactly as
  they are. Which files go live is blocked on confirming the shipped app version. See issue 04.
- **No git history rewrite.** Spell JSON already in history stays there. Confirmed with maintainer.
- **The site must look identical** when this is done, apart from deliberate metadata additions.
- Favicon and Open Graph image are out of scope; no assets exist yet. See issue 06.

## Steps

### 1. Move spell JSON out of the bundle — done

The core change. Everything else is tidying.

- Create `public/spells/`, move the two currently-served files there, preserving current content:
  - `src/files/older/spells-all-new.json` (527 spells) -> serves "All The Spells"
  - `src/files/older/spells-all-2024.json` (897 spells) -> serves "All The Spells 2024"
- Add a `url` field to each entry in `src/lib/files.ts` pointing at its public path. This kills the
  positional `files[0]`/`files[1]` coupling that made updates a code edit.
- `file-grid.tsx`: drop the JSON imports, map over `files` instead of hardcoding two cards.
- `file-card.tsx`: replace the Blob download machinery with `<a href={file.url} download>`. This
  removes `URL.createObjectURL`, the simulated progress loop and its `setTimeout`s, and the
  `downloading`/`progress` state. Fixes the missing `.json` extension for free.
- Add `/public/spells` to `.gitignore`. Spell files stay out of the source branch, per maintainer.
  Note they still reach GitHub via the `gh-pages` branch; that is unavoidable when GitHub Pages
  serves them and is already true today.
- Leave `src/files/` on disk for now; it holds the unshipped newer files that issue 04 depends on.

Expected result: main JS bundle drops from ~5.4 MB to roughly 300 KB.

### 2. Fix `/spells` returning 404, delete dead SPA code — done

See issue 05 and `docs/adr/0001-static-route-stubs-for-github-pages.md`.

- Rewrite `scripts/copy-spa-fallback.mjs` to iterate a route list (`/spells`, `/privacy-policy`)
  and emit `dist/<route>/index.html` for each. Keep the `dist/404.html` catch-all copy.
- Delete `public/404.html` and the `sessionStorage.redirect` block in `src/main.tsx`. Both are dead:
  `postbuild` overwrites `dist/404.html`, so the redirect file never reaches production.

### 3. Remove dead weight — done

Aggressive removal approved. This does **not** shrink the bundle (Vite already tree-shakes); the
point is to stop 20 unused packages generating security-alert noise and to stop the 46-component
`ui/` folder misleading future work.

- Delete every `src/components/ui/*` file nothing imports. Keep `button`, `card`, `progress`,
  `toast`, `toaster`.
- Delete orphans: `src/components/search-bar.tsx`, `src/lib/queryClient.ts`,
  `src/hooks/use-mobile.tsx`.
- Drop the matching dependencies: the unused Radix packages, plus `recharts`,
  `embla-carousel-react`, `react-day-picker`, `react-hook-form`, `cmdk`, `vaul`, `input-otp`,
  `react-resizable-panels`, `@tanstack/react-query`, `drizzle-kit`, `@types/ws`, `tsx`, `esbuild`.
  Verify each against actual imports before removing.
- Remove `@replit/vite-plugin-shadcn-theme-json` and `theme.json`. **Preserve appearance exactly**
  by lifting the CSS custom properties the plugin currently injects (visible as the
  `<style data-vite-theme>` block in built output) verbatim into `src/index.css`.

### 4. Add page metadata — done

`index.html` currently has no title, no description and no OG tags. Confirmed live: `document.title`
is empty on every page.

- `<title>`: `DnD Spells 5e`. The app is referenced as exactly "DnD Spells 5e" everywhere, with no
  tagline or keyword suffix appended.
- `<meta name="description">`: "Browse and download spell data for DnD Spells 5e, a spell management
  app for Dungeons & Dragons 5th Edition. Free on Google Play."
- `og:title`, `og:description`, `og:url`, `og:type`. No `og:image` yet (issue 06).
- Static, site-wide. No per-route title hook; agreed as not worth the machinery.

### 5. Untrack `dist/` — done

See issue 03. Add `/dist` to `.gitignore`, then `git rm -r --cached dist`. The `gh-pages` branch
already holds what GitHub Pages serves, so tracking build output on `master` only adds noise.

### 6. Fix privacy policy app name — done

See issue 02. Replace "Spellbook 5e" with "DnD Spells 5e" in `src/pages/privacy.tsx`, and grep the
repo for other stale references. This page carries store-compliance weight.

### 7. Fix nested anchors in Nav — done

See issue 01. `App.tsx` wraps an `<a>` inside wouter's `Link`, which renders its own anchor.
Flatten to one anchor per nav item.

### 8. Fix protocol-relative nav hrefs — done

Not in the original plan; found while verifying step 7. `<Router base={import.meta.env.BASE_URL}>`
with `BASE_URL` of `/` made wouter emit `href="//spells"`, which is a protocol-relative URL pointing
at the host `spells`, not a path. Client-side clicks worked because wouter intercepts them, so it
was invisible until the nested anchors were flattened. Fixed by stripping the trailing slash from
the base in `src/App.tsx`.

## Outcome

| Metric | Before | After |
| --- | --- | --- |
| Main JS bundle | 5,372,549 B | 195,690 B |
| CSS bundle | 67.8 kB | 28.8 kB |
| npm packages | 69 direct | 27 direct (133 removed from the tree) |
| Source files (excl. `src/files/`) | 70 | 16 |
| `src/components/ui/` | 46 components | 2 |
| `npm run lint` | 7 errors, 7 warnings | 0 errors, 2 warnings |

The 2 remaining lint warnings are `react-refresh/only-export-components` on `theme-provider.tsx`
(exports `useTheme`) and `button.tsx` (exports `buttonVariants`). Both are standard for shadcn and
harmless.

## Still open

- Issue 04: live spell files are stale, blocked on confirming the app version.
- Issue 06: favicon and OG image, blocked on image assets.
- Issue 07: the Google Play button is a `div`, not a link, so crawlers see no link to the store
  listing. Blocked on the official Play badge asset and on a decision about the hero's appearance.
- A spell-update skill, to be written once this restructure settles. The step it must encode that a
  plain doc would not is the app-version gate from issue 04.

## Verification gate

There is no test suite and none is wanted. The gate for every step is:

1. `npm run build` (includes `tsc -b`) passes
2. `npm run lint` passes
3. Dev server renders all three routes with a clean browser console
4. Both spell downloads actually download a valid `.json`
5. Visual comparison against before-screenshots, specifically the red accent colour after the
   `theme.json` removal in step 3

**Do not deploy.** `npm run deploy` is the maintainer's call and is never run by an agent. All
verification is local. Once the maintainer deploys, `/spells` should be re-probed in production to
confirm it returns 200 rather than 404.
