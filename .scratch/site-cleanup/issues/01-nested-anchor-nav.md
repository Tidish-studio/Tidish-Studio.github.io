# Nested `<a>` inside `<a>` in Nav

Status: resolved

## Description

React logs a `validateDOMNesting` warning on every route: an `<a>` renders as a descendant of
another `<a>` inside the `Nav` component's wouter `Link` usage. Nested anchors are invalid HTML and
can cause unpredictable click/focus behavior.

## Where

`Nav` component (rendered on every route via `App.tsx`) — trace the wouter `Link` usage that wraps
another anchor-producing element.

## Repro

Run `npm run dev`, open any route, check the browser console:

```
Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <a> a
    at a
    at a
    at .../wouter.js:294:18
    at div
    at div
    at nav
    at Nav
```

## Suggested fix

Find the nested anchor structure in the Nav component and flatten it to a single `<a>`/wouter
`Link` per nav item.

## Comments

Fixed 2026-08-05. Nav items in `src/App.tsx` are now a single wouter `Link` carrying the className,
with no inner `<a>`. Verified: `document.querySelector('a a')` is null and the `validateDOMNesting`
warning no longer appears in the console.

Flattening this exposed a second, more serious bug that the nesting had been masking: `<Router
base={import.meta.env.BASE_URL}>` produced protocol-relative hrefs (`//spells`, meaning the host
`spells`). Fixed by stripping the trailing slash from the base. Nav hrefs are now `/`, `/spells`,
`/privacy-policy`.
