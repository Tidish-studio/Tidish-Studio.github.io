---
name: release-spells
description: Promote a staged spell resource from testFiles to live on /spells — file move, manifest update, doc updates, verification. Stops before commit/push/deploy.
disable-model-invocation: true
---

Promote one or more entries from `testFiles` (in `src/lib/files.ts`) to `files`, so they go live on
`/spells`. This is the second half of publishing a spell resource — the first half, staging a brand
new file into `testFiles` in the first place, is a different workflow and out of scope here.

## Steps

1. **Identify the entries.** Confirm with the maintainer which `testFiles` entries are being
   promoted, if not already stated. The 2014 set never appears here — it is frozen, has no test
   counterpart, and must never be folded into or replace another set.

2. **Clear the app-version gate.** Any 2024-ruleset resource requires a recent app version to
   import correctly — this is the single guardrail that matters most in this whole flow. Ask the
   maintainer to confirm explicitly which app version is out and that it supports the file being
   promoted. Never infer this from a newer file existing on disk, and never swap the live 2024 file
   on assumption. Partnered-spell resources carry no such gate.

3. **Surface known content questions.** Grep `.scratch/site-cleanup/issues/` and the target
   `testFiles` entry's history for any unresolved question about the file's content (a known gap
   against another candidate, a dropped source, anything flagged but not settled). If one exists,
   put it to the maintainer before promoting — don't silently pick the newest or most complete file.
   Spell JSON itself is always taken as the maintainer authored it: never author, edit, merge, or
   reconcile spell content.

4. **Move the file.** Copy `public/downloads/test/<name>-test.json` to
   `public/downloads/<name>.json` (drop the `-test` suffix), then delete the test copy. If a live
   file already exists at that path, this overwrites it — that's the point of a promotion.

5. **Update the manifest.** In `src/lib/files.ts`, move the entry from `testFiles` to `files`:
   drop "not yet released" / "candidate" language from its `description`, update `url` to the new
   path, and set `lastUpdated` to today — it tracks the site action (promotion), not when the
   maintainer authored the content. Remove the entry from `testFiles` entirely; don't leave an
   empty placeholder.

6. **Update docs.**
   - If a term in `CONTEXT.md` describes this resource's status (e.g. "published as a test
     resource, not yet live"), update it inline.
   - Only write an ADR under `docs/adr/` if this promotion resolves a previously-documented gate or
     blocker (an open `.scratch/site-cleanup/issues/` ticket, a "never swap without confirming X"
     note). A routine promotion with nothing blocking it doesn't need one.
   - If an issue ticket is resolved by this promotion, close it per this repo's issue-tracker
     convention (`Status: resolved` plus a `## Comments` entry).

7. **Verify.** Follow CLAUDE.md's "Local verification" section: build, lint, `npm run preview`, and
   fetch every promoted download URL to confirm it parses as a JSON array with the expected spell
   count.

8. **Stop.** Report what changed and hand back. Never commit, push, or deploy as part of this
   skill — each is a separate, explicit ask in that session, per CLAUDE.md.
