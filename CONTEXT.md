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
should never generate, infer, or edit spell JSON content themselves.

**Privacy Policy page** (`/privacy-policy`): The app's Google Play–required privacy policy, hosted
here so Play Store's URL verification has a real page to check. Its accuracy carries store-compliance
weight, not just marketing polish.

**`public/app-ads.txt`**: Declares this app's authorized ad sellers (Google AdMob) per the
app-ads.txt standard, required for AdMob to serve ads without policy warnings. Vite copies it from
`public/` into the build output automatically — don't move or rename it without also updating
wherever AdMob/Play Console is told to look for it.
