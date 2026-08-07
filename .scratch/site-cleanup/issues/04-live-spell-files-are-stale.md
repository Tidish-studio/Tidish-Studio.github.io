# Live spell downloads are stale, pending app version check

Status: needs-info

## Description

`/spells` serves spell data from Feb 25 2025 while newer files sit on disk wired to nothing. The
maintainer prepared updates twice and neither shipped, because the file-to-label wiring lives in
code (`file-grid.tsx` imports by path and matches `lib/files.ts` positionally) rather than being
data-driven.

## Current state

Served now:

| Label on site | File | Spells | Dated |
| --- | --- | --- | --- |
| All The Spells | `src/files/older/spells-all-new.json` | 527 | 2025-02-25 |
| All The Spells 2024 | `src/files/older/spells-all-2024.json` | 897 | 2025-02-25 |

On disk, unused:

| File | Spells | Dated |
| --- | --- | --- |
| `src/files/All-2024-2025-02-28.json` | 939 | 2025-02-28 |
| `src/files/Partnered-other-2025-02-28.json` | 42 | 2025-02-28 |
| `src/files/spells-all.json` | 938 | 2025-12-08 |

`lib/files.ts` also carries a commented-out metadata block matching the two 2025-02-28 files. That
was the Feb 2025 update that never shipped.

## Blocker

**Do not change which files are live yet.** Which set can go live depends on the version of the
DnD Spells 5e app currently in the wild: an older app cannot consume the 2024 set. The maintainer
needs to confirm the shipped app version first. See "Live resource set" in `CONTEXT.md`.

## Next step

1. Maintainer confirms the current app version and which spell format it accepts.
2. Then decide the live set. Per `CONTEXT.md`, the shape is three slots: frozen 2014 spells,
   updating 2024 spells, updating Partnered spells. Today only the first two slots are filled and
   the 2024 slot holds a stale file.

## Note

The `public/spells/` migration (moving JSON out of the bundle) should preserve the **current** two
downloads exactly as they are. That migration is a restructure, not a content change.

## Comments

**2026-08-07** — Still `needs-info`, but step 1 of "Next step" now has a mechanism instead of
depending on a swap-and-hope. Added `/spells-test`, an unlinked page rendering `testFiles` from
`src/lib/files.ts` out of `public/downloads/test/`. Two files staged there, both byte-identical
copies of the maintainer's archive:

| Card | Test file | From | Spells |
| --- | --- | --- | --- |
| All The Spells 2024 | `test/dnd-spells-5e-2024-test.json` | `src/files/spells-all.json` | 938 |
| Partnered Spells | `test/dnd-spells-5e-partnered-test.json` | `src/files/Partnered-other-2025-02-28.json` | 42 |

Deployed 2026-08-07. This changes nothing about what `/spells` serves — the live pair is untouched,
and the blocker above still stands until the import is actually tried.

### Content survey done while staging

Comparing by `name|source` (a spell name alone is not an identity — `PHB` is the 2014 printing and
`XPHB` the 2024 one, so most names appear twice):

- **Live 2024 (897) is a strict subset of the staged 938.** The 41 additions are six whole sources:
  `FRHoF` 19, `EGW` 15, `LLK` 3, `TDCSR` 2, `AitFR-AVT` 1, `EFA` 1. Live 2024 carries no
  partnered/third-party content at all.
- **Live 2014 (527) carries 21 partnered spells** (`EGW`/`LLK`/`TDCSR`/`AitFR-AVT`), and its other
  506 entries all appear in live 2024. The frozen set is not partnered-free.
- **The two 2024 archive candidates diverge in both directions.** `All-2024-2025-02-28.json` (939)
  holds 21 `DoDk`/`GHLoE` spells that `spells-all.json` (938) lacks; `spells-all.json` holds 20
  `FRHoF`/`EFA` spells the older one lacks. The newer file both added and **dropped** content.
- **Consequence:** no single file on the test page has full coverage. `DoDk`/`GHLoE` exist only in
  the partnered download, `FRHoF`/`EFA` only in the 2024 download. Importing both is currently the
  only route to everything.

Whether dropping `DoDk`/`GHLoE` from `spells-all.json` was deliberate is unresolved and is a
question for the maintainer. Per `CONTEXT.md` the files were staged exactly as authored — no
merging, deduplication or reconciliation was performed.
