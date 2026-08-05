# Default theme is hardcoded to light, ignoring OS preference

Status: needs-info

## Description

`src/App.tsx` mounts `<ThemeProvider defaultTheme="light" storageKey="app-theme">`. A first-time
visitor whose OS is in dark mode gets a white site, because `defaultTheme` wins until they touch the
toggle and a value is written to `localStorage`.

Meanwhile `src/index.css` carries a full `@media (prefers-color-scheme: dark)` block, inherited from
the old `theme.json` which was configured with `"appearance": "system"`. So the dark palette is
authored and shipped, and the app declines to use it by default.

This is pre-existing, not a regression from the Aug 2026 cleanup. Verified identical behaviour in
the pre-cleanup build.

## The decision

Change `defaultTheme` to `"system"` so a dark-mode visitor gets dark on first load, or leave it as
`"light"` deliberately. One word either way. The manual toggle keeps working regardless, and
`localStorage` still overrides once set.

## Why this is open

Raised with the maintainer during the cleanup session and not answered before the session moved on.
Left here so it does not get lost. Note that this may be what was behind the maintainer's
"the theme looks very white now" observation, which was investigated separately and shown *not* to
be a change introduced by the cleanup.
