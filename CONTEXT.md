# DnD Spells 5e — Marketing Site

This repo is the marketing, spell-download, and Play Store compliance site for the "DnD Spells 5e"
mobile app (Google Play), published by Tidish-Studio. Its purposes: drive app installs, let users
download spell-data JSON files to import into the app, host the app's required Privacy Policy, and
serve the app's `app-ads.txt` for AdMob ad-inventory verification. The only recurring content
maintenance is publishing new/updated spell resources as the app's spell library changes.

## Language

**DnD Spells 5e**: The canonical name of the mobile app this site promotes and the product this
site exists to sell.
_Avoid_: Spellbook 5e, Spellbook — an earlier working name still present in the repo/package name
and in some stale UI copy (e.g. the Privacy Policy page), not the current app name.

**Spell resource**: A downloadable JSON file of spell data that a user imports into the DnD Spells
5e app. Content is authored and provided directly by the maintainer — agents should never generate,
infer, or edit spell JSON content themselves. Every resource is either **live** (offered on
`/spells`) or a **test resource** (offered on `/spells-test`); see both terms below. There are three
kinds of content, and they are not interchangeable:

**2014 spells**: The pre-2024 ruleset spell set. **Frozen** — this content is set in stone and will
never be updated. It must always remain available as its own separate download; do not fold it into
the 2024 set or retire it.

**2024 spells**: The current ruleset spell set, including 2024 content. Updated on an ongoing basis
as the maintainer revises it. Requires a recent version of the app to import correctly — **app
compatibility is the reason it is a separate download**, not a content split. It is not a
"2024-only" file; it re-includes most of the 2014 material alongside the new printings.

**Partnered spells**: Spells from partnered and third-party sources (e.g. crossover and
setting-specific titles), distinct from the official 2014/2024 sets. Also updated on an ongoing
basis. Live on `/spells` as of 2026-08-10.

"Not interchangeable" means one set cannot stand in for another, **not** that the sets are disjoint.
In practice they overlap across every pair: the 2014 download carries partnered spells of its own,
and most of its contents also appear in the 2024 download. A spell is identified by name **and**
source — the same spell name legitimately appears twice, once for its 2014 printing and once for
its 2024 one, so a name colliding across sets is normal and not duplication. Never assume a spell
belongs to exactly one download, and never treat overlap as a bug to fix. Which sources land in
which file is the maintainer's editorial call.

Each set is delivered as the maintainer authored it. Spell files are **never merged, deduplicated,
reconciled or otherwise combined** — not by agents, and not to make the sets line up with this
glossary. If two sets ought to share content, the maintainer supplies files that already do.

**Live resource set**: Which spell files the `/spells` page actually offers. Changing this is
gated on knowing which app version is in the wild, because an app that predates 2024 support cannot
consume the 2024 set. Never swap the live files on assumption — confirm the app version first.

**Test resource**: A spell resource that has been published for the maintainer to import into the
app and verify, but that has not been promoted into the live set. It is real maintainer-authored
content, identical in kind to a live resource — "test" describes its status, not its quality, and
never means fabricated or placeholder spell data. Test resources exist so the app-version question
gating the live set can be answered by trying a file rather than by guessing. The axis is
**test ↔ live**; do not introduce "release", "preview" or "staging" as synonyms for either side.
_Avoid_: treating a test resource as private. It is published and reachable by anyone with the
URL, merely unlinked.

**Privacy Policy page** (`/privacy-policy`): The app's Google Play–required privacy policy, hosted
here so Play Store's URL verification has a real page to check. Its accuracy carries store-compliance
weight, not just marketing polish.

**`public/app-ads.txt`**: Declares this app's authorized ad sellers (Google AdMob) per the
app-ads.txt standard, required for AdMob to serve ads without policy warnings. Vite copies it from
`public/` into the build output automatically — don't move or rename it without also updating
wherever AdMob/Play Console is told to look for it.
