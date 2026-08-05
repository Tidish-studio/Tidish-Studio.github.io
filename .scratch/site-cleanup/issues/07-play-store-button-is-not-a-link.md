# Google Play button is a div, not a link

Status: ready-for-human

## Description

The Google Play button on the home page is the site's primary conversion element, and it is not a
hyperlink. `react-mobile-app-button` renders a `<div>` with a JavaScript click handler rather than
an `<a href>`.

Verified against the production build on 2026-08-05: `document.querySelectorAll('a[href*="play.google.com"]').length`
is **0**. The only anchors on the page are the three nav links.

## Impact

- **Search engines see no link to the Play listing at all.** For a site whose stated purpose is
  driving installs, the outbound link that matters most does not exist in the markup.
- Middle-click, ctrl-click, "open in new tab" and "copy link address" all do nothing.
- Assistive technology announces a generic element instead of a link.

## Where

`src/pages/home.tsx`, the `<GooglePlayButton url={APKUrl} ... />` usage.

## Suggested fix

Replace `react-mobile-app-button` with a plain anchor wrapping the official Google Play badge:

```tsx
<a href={APKUrl} target="_blank" rel="noopener">
  <img src="/google-play-badge.png" alt="Get it on Google Play" />
</a>
```

This also removes the `react-mobile-app-button` dependency.

## Blocked on

Needs the official Google Play badge image, which Google requires be used unmodified from their
brand guidelines. No asset exists in `public/` yet, same blocker as issue 06.

## Why this was not fixed during the cleanup pass

It changes the appearance of the hero section and needs an image asset. The maintainer was explicit
that the site should not change how it looks, so this is left as a deliberate decision for them.
