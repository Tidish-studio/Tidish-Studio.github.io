# `dist/` build output is tracked in git on master

Status: ready-for-agent

## Description

`.gitignore` ignores `/build` but never `/dist`, so the Vite build output is committed to source
control on `master`. This is redundant: the separate `gh-pages` branch (pushed to by `npm run
deploy`) already holds the built static output that GitHub Pages actually serves — see the "Repo
identity note" in `CLAUDE.md`. Tracking `dist/` on `master` just adds stale build-artifact diffs to
every commit that touches it.

## Where

Confirmed via `git ls-files dist`:

```
dist/404.html
dist/app-ads.txt
dist/assets/index-BbIqxBcB.css
dist/assets/index-l7fBzE9p.js
dist/index.html
dist/privacy-policy/index.html
dist/robots.txt
dist/vite.svg
```

## Suggested fix

Add `/dist` to `.gitignore` and `git rm -r --cached dist` to untrack it (keep the files on disk).
Confirm nothing else in the repo/workflow depends on `dist/` being committed on `master` before
removing it.
