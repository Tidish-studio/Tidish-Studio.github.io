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

**Spell resource**: A downloadable JSON file of spell data, listed on `/spells`, that a user imports
into the DnD Spells 5e app. Content is authored and provided directly by the maintainer — agents
should never generate, infer, or edit spell JSON content themselves. There are three kinds, and
they are not interchangeable:

**2014 spells**: The pre-2024 ruleset spell set. **Frozen** — this content is set in stone and will
never be updated. It must always remain available as its own separate download; do not fold it into
the 2024 set or retire it.

**2024 spells**: The current ruleset spell set, including 2024 content. Updated on an ongoing basis
as the maintainer revises it. Requires a recent version of the app to import correctly, which is why
it is kept separate from the 2014 set.

**Partnered spells**: Spells from partnered and third-party sources (e.g. crossover and
setting-specific titles), distinct from the official 2014/2024 sets. Also updated on an ongoing
basis. Drafted but not yet published on the site.

**Live resource set**: Which spell files the `/spells` page actually offers. Changing this is
gated on knowing which app version is in the wild, because an app that predates 2024 support cannot
consume the 2024 set. Never swap the live files on assumption — confirm the app version first.

**Privacy Policy page** (`/privacy-policy`): The app's Google Play–required privacy policy, hosted
here so Play Store's URL verification has a real page to check. Its accuracy carries store-compliance
weight, not just marketing polish.

**`public/app-ads.txt`**: Declares this app's authorized ad sellers (Google AdMob) per the
app-ads.txt standard, required for AdMob to serve ads without policy warnings. Vite copies it from
`public/` into the build output automatically — don't move or rename it without also updating
wherever AdMob/Play Console is told to look for it.
