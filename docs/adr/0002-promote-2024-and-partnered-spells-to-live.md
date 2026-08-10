# Promote the staged 2024 and Partnered spell sets to live

`CONTEXT.md` and issue `04-live-spell-files-are-stale.md` gated swapping the live 2024 file (and
adding Partnered as a live download) on confirming the app version in the wild, since an app that
predates 2024 support cannot import the newer format. The maintainer confirmed a new app version is
now out, satisfying that gate, so both `dnd-spells-5e-2024-test.json` (938 spells) and
`dnd-spells-5e-partnered-test.json` (42 spells) were promoted to live as-is, and the frozen 2014 set
was left untouched.

## Consequences

- The known content gap between the promoted 938-spell 2024 file and the never-staged
  939-spell archive candidate (`src/files/All-2024-2025-02-28.json`, differs by the `DoDk`/`GHLoE`
  sources) was accepted deliberately, not resolved — the maintainer chose to ship the staged file
  as-is rather than reconcile it.
- Partnered Spells is now a permanent third card on `/spells`, not a 2014/2024 variant.
