# Emit a real `index.html` per route instead of relying on the SPA 404 fallback

GitHub Pages has no server-side rewrite, so a client-routed SPA normally handles deep links by
serving `404.html` for unknown paths. That renders correctly for a human but returns **HTTP 404** on
the status line. Google Play's review process fetched the privacy policy URL, saw the 404, and
rejected the submission on the grounds that the privacy policy was inaccessible. We therefore have
`scripts/copy-spa-fallback.mjs` write a real `dist/<route>/index.html` for each client route at
build time, so every route returns a genuine 200.

## Consequences

- **Do not delete or "simplify" `scripts/copy-spa-fallback.mjs`.** It looks like redundant cruft
  next to the `404.html` copy. It is not. Removing it makes `/privacy-policy` return 404 again and
  puts the app's store listing at risk.
- Adding a client route to `src/App.tsx` means adding it to the route list in that script too.
  A route that is missed still works for humans via the `404.html` fallback, but returns 404 to
  crawlers and automated checkers, and will be silently invisible to search.
- `dist/404.html` is still generated as the catch-all for genuinely unknown paths. Both mechanisms
  coexist deliberately.

## Considered options

- **Hash routing (`/#/privacy-policy`)** — would return 200 for every route with no build step, but
  produces URLs that look broken in a store listing and hurt the marketing site's SEO.
- **`sessionStorage` redirect trick** (save path in `404.html`, bounce to `/`, restore) — was
  actually implemented here at one point, in `public/404.html` plus a read-back in `src/main.tsx`.
  It still returns 404 on the initial request, so it would not have satisfied Play review. It was
  superseded by this approach and the leftovers are dead code.
- **A full static-site generator / prerender step** — solves the problem properly but is
  disproportionate for three static pages.
