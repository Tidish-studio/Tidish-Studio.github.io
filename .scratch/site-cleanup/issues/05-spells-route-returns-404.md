# `/spells` returns HTTP 404, and the dead SPA redirect code should go

Status: resolved

## Description

Two related problems in the GitHub Pages fallback plumbing.

**1. `/spells` returns a 404 status.** `scripts/copy-spa-fallback.mjs` hardcodes a single route,
emitting `dist/privacy-policy/index.html` and nothing else. `/spells` has no stub, so GitHub Pages
falls back to `dist/404.html`. The page renders fine for a human but the status line is 404, so
crawlers and link checkers treat the download page as broken and it will not be indexed.

This is the same class of bug that got the app's Play Store submission rejected for an inaccessible
privacy policy. See `docs/adr/0001-static-route-stubs-for-github-pages.md`.

**2. Dead SPA redirect code.** `public/404.html` implements the `sessionStorage` redirect trick and
`src/main.tsx` has the matching read-back at the top. Neither runs: `postbuild` overwrites
`dist/404.html` with a copy of `index.html`, so the redirect file never reaches production. It reads
as live code and is the first place anyone would look when debugging a routing problem.

## Verified against production

Probed `https://tidish-studio.github.io/` on 2026-08-05:

```
/                 -> 200
/privacy-policy   -> 301 -> /privacy-policy/ -> 200
/spells           -> 404
/spells/          -> 404
/app-ads.txt      -> 200
/nonexistent-xyz  -> 404
```

Wouter matches the trailing slash correctly, so `/privacy-policy/` renders the right page. No bug
there.

## Suggested fix

1. Rewrite `scripts/copy-spa-fallback.mjs` to iterate a route list (`/spells`, `/privacy-policy`)
   and emit `dist/<route>/index.html` for each, rather than hardcoding one. Keep the `dist/404.html`
   copy as the catch-all.
2. Delete `public/404.html`.
3. Delete the `sessionStorage.redirect` block at the top of `src/main.tsx`.
4. Verify after deploy that `/spells` returns 200.

## Note

Route list currently confirmed as `/`, `/spells`, `/privacy-policy`. `/` needs no stub since
`dist/index.html` already serves it.

## Comments

Fixed 2026-08-05. `scripts/copy-spa-fallback.mjs` now iterates a route list and emits a stub for
each; the build logs confirm both `dist/spells/index.html` and `dist/privacy-policy/index.html` are
created. `public/404.html` and the `sessionStorage.redirect` block in `src/main.tsx` are deleted.

Not yet confirmed in production: `/spells` returning 200 can only be verified after the maintainer
deploys. Re-probe then.

Confirmed in production 2026-08-05 after deploy:

```
/                 -> 200
/spells           -> 301 -> /spells/ -> 200   (was 404)
/privacy-policy   -> 301 -> /privacy-policy/ -> 200
/app-ads.txt      -> 200
/downloads/dnd-spells-5e-2014.json -> 200 (527 spells)
/downloads/dnd-spells-5e-2024.json -> 200 (897 spells)
/nope-xyz         -> 404  (correctly still a 404)
```

Closed.
