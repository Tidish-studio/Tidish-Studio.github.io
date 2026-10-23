---
name: import-spells
description: Bring a new spell file from the maintainer's spell folder into this site, either straight live or staged on /spells-test. Use when the maintainer says they added new spells to a folder or points at a spell file outside the repo to move in.
---

The maintainer builds spell files outside this repo and drops each build into a dated folder,
usually `D:\Work\Projects\Spellbook spells\<YYYY-MM-DD>\spells-data.json`. A path the maintainer
names wins over that default. This skill gets one such file into `public/downloads/`. Spell JSON is
always taken exactly as the maintainer authored it.

## Steps

1. **Locate the file.** Open the folder the maintainer named and list it. One JSON file is the
   normal case; with several, ask which ones are meant. The loose files at the root of
   `Spellbook spells\` are an older per-source archive and are out of scope unless named.

2. **Identify the set.** From the repo root, run
   `node .claude/skills/import-spells/diff-spells.mjs "<path to new file>"`. It compares the new
   file against every live and test file by name and source (the spell identity in `CONTEXT.md`)
   and sorts the best match first. That match tells you which set this is a new version of: 2014,
   2024 or Partnered. Done when you can state the new count, the set it replaces, and every added
   and removed spell grouped by source. A best match on 2014 is a red flag, because that set is
   frozen: raise it rather than proceed.

3. **Ask the maintainer, in one message**, after laying out the step 2 findings:
   - Straight live, or staged on `/spells-test` first? Recommend staging when the file carries
     sources the app may not know yet; going straight live is the maintainer's call.
   - For a live 2024 file: which app version is out, and does it support this file? This is the
     live resource set gate in `CONTEXT.md`. A newer file existing is never evidence of it.
   - Are the removals intended? Name them by source.

4. **Copy the file in.** Copy, never move: the dated folder is the maintainer's archive. Confirm the
   copy with `cmp` against the source.
   - **Live:** overwrite `public/downloads/<live name>.json` for that set. In `src/lib/files.ts`,
     set that entry's `lastUpdated` to today.
   - **Staged:** write `public/downloads/test/<live name>-test.json`, and add a `testFiles` entry
     whose `description` marks it as a not yet released candidate, `lastUpdated` today. Promotion
     later is `/release-spells`.

5. **Record it.**
   - A live 2024 replacement clears the version gate: write the next ADR under `docs/adr/`
     recording the app version and the added and removed spells by source, removals marked
     intended. `docs/adr/0003-*.md` is the model.
   - Update the expected counts in `CLAUDE.md` under "Local verification" so they match what is
     now in `public/downloads/`.

6. **Verify** per `CLAUDE.md` "Local verification": build, lint, all four routes under
   `npm run preview`, and every download URL fetched and counted against the new expected counts.

7. **Hand back.** Report what changed, where the source still sits, and that nothing is committed
   or deployed. Commit and deploy are each a separate, explicit ask.
