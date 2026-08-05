# Write a spell-update skill

Status: ready-for-agent

## Description

Publishing a new spell resource is now mechanically trivial after the Aug 2026 cleanup: drop the
file in `public/downloads/`, update one entry in `src/lib/files.ts`, deploy. A skill is still worth
having, because the mechanical steps are not the risky part. The risk is the domain rules an agent
cannot infer from the code.

## Why a skill and not just a doc

The steps are three lines. The value is the guardrails:

1. **The app-version gate.** The 2024 spell set requires a recent version of the DnD Spells 5e app.
   Swapping the live 2024 file without confirming which app version is in the wild will break
   imports for existing users. An agent that finds a newer file on disk will helpfully wire it up.
   See issue 04, still open for exactly this reason.
2. **The 2014 set is frozen.** It must stay available as its own separate download, must never be
   folded into the 2024 set, and must never be "updated". See `CONTEXT.md`.
3. **Spell JSON is never authored or edited by an agent.** Content comes from the maintainer only.
4. **Spell JSON must never be `import`ed into a component.** That is what produced the 5.4 MB
   bundle the cleanup removed. It goes in `public/downloads/` and is referenced by URL.
5. **`public/downloads/` is git-ignored on purpose.** Do not "fix" this by committing the files.
6. **Never deploy without being explicitly asked**, even though deploy is the last step of the
   workflow.

## Suggested shape

- Confirm with the maintainer which spell kind is being updated (2014 / 2024 / Partnered) and, for
  2024, which app version the file targets.
- Place the file in `public/downloads/` with a stable, descriptive, lowercase filename ending
  `.json`. The filename is what the user sees in their downloads folder.
- Update or add the matching `SpellResource` entry in `src/lib/files.ts`: `name`, `description`,
  `lastUpdated`, `url`.
- Verify per the "Local verification" section of `CLAUDE.md`: build, lint, preview, and fetch the
  download URL to confirm it parses as a JSON array with the expected spell count.
- Stop. Hand back for the maintainer to deploy.

## Related

- `CONTEXT.md` — definitions of the three spell kinds and the "Live resource set" gate
- Issue 04 — the currently stale live files, blocked on the app-version question
