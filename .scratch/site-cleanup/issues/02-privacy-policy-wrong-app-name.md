# Privacy Policy page uses wrong app name

Status: resolved

## Description

The `/privacy-policy` page reads "Tidish-Studio built the Spellbook 5e app as a Free app." The
app's actual name is **DnD Spells 5e** (see `CONTEXT.md`) — "Spellbook 5e" is a stale earlier
working name. Since this page exists specifically for Google Play's privacy-policy URL
verification, the mismatch has store-compliance weight, not just cosmetic.

## Where

Privacy policy content/copy (route `/privacy-policy`, see `src/App.tsx` routing and whichever
component/data file holds the policy text).

## Suggested fix

Replace "Spellbook 5e" with "DnD Spells 5e" throughout the privacy policy copy. Grep the whole repo
for other stale "Spellbook" references while in there (e.g. check for any other user-facing copy,
not just this page).

## Comments

Fixed 2026-08-05. Both occurrences of "Spellbook 5e" in `src/pages/privacy.tsx` replaced with
"DnD Spells 5e". Grepped `src/`, `index.html` and `README.md` for other stale references; none
remain. Verified in the production build that the rendered page contains "DnD Spells 5e" and no
"Spellbook 5e".
