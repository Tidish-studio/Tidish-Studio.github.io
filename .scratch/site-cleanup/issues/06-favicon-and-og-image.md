# Favicon is the Vite logo, and there is no Open Graph image

Status: needs-info

## Description

Two social/branding gaps deferred from the site cleanup pass because they need image assets the
maintainer does not currently have.

**Favicon.** `public/vite.svg` is still the stock Vite logo, and `index.html` does not even link it.
Browser tabs and bookmarks show a generic page icon for a site whose job is promoting a branded app.

**Open Graph image.** No `og:image`, so sharing the site in Discord, Reddit, WhatsApp or anywhere
else that unfurls links produces a bare text preview. For a site whose whole purpose is distribution,
this is a wasted channel. D&D communities share links constantly.

## Blocked on

Image assets from the maintainer:

- Favicon: a PNG or SVG of the app icon, dropped into `public/`. The app's launcher icons exist in
  the parent directory but that folder is explicitly not part of this codebase, so they must be
  copied in deliberately rather than referenced.
- OG image: 1200x630 PNG. An app screenshot or a branded title card works.

## Suggested fix, once assets exist

1. Add the icon to `public/`, link it from `index.html` (`<link rel="icon">`), delete `vite.svg`.
2. Add `og:image`, `og:image:width`, `og:image:height` and `twitter:card` to `index.html`. The
   remaining OG tags (`og:title`, `og:description`, `og:url`, `og:type`) are already being added in
   the metadata pass and do not need the image.
