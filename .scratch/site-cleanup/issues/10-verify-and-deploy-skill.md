# Consider a verify-and-deploy skill

Status: needs-triage

## Description

The verification sequence used during the Aug 2026 cleanup was invented on the spot and then written
up in the "Local verification" section of `CLAUDE.md`. The open question is whether that doc section
is sufficient, or whether it should be promoted to a skill.

**Decide by feel after the next couple of sessions.** If agents follow the `CLAUDE.md` section
reliably, close this as `wontfix`. If they keep substituting weaker checks (typecheck passes,
therefore done), promote it.

## The case for promoting it

This site's failure modes are invisible to `npm run build` and `npm run lint`, both of which passed
happily while `/spells` returned HTTP 404 to every crawler and the nav emitted protocol-relative
hrefs pointing at a host called `spells`. A skill can enforce a checklist in a way a prose section
cannot.

## The sequence it would encode

1. `npm run build` — 0 errors.
2. `npm run lint` — 0 errors. Two `react-refresh` warnings are expected.
3. `npm run preview`, then in a browser: load `/`, `/spells`, `/privacy-policy`.
4. Fetch both download URLs; assert 200 and that each parses as a JSON array with the expected
   spell count. A dead download link still renders a perfect-looking card.
5. Check the console, filtering out `chrome-extension://` noise.
6. For anything that should look unchanged, render the previous build alongside and compare
   screenshots in both light and dark. Since `dist/` is no longer tracked, this means
   `git worktree` on the older commit, build there, and `npx vite preview --outDir <path> --port <n>`.
7. **Stop. Do not deploy.** Deploy only on an explicit request in that session.
8. If deploying: after `npm run deploy`, poll production with cache-busting query strings until the
   new asset hash appears, then re-probe every route for a 200 and re-check the download URLs.
   GitHub Pages lags, and the browser will cheerfully show the old build.

## Related

- `CLAUDE.md` — "Local verification", the current prose version
- `docs/adr/0001-static-route-stubs-for-github-pages.md` — why route status codes matter here
