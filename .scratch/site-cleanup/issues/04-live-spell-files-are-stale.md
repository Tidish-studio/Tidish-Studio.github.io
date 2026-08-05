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
