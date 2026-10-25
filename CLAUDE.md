# CLAUDE.md

Guidance for Claude Code working in this folder.

## What this is

The Wealth Summit 2026 talk, "Many paths, one front door" - a 21-stop zooming
canvas, 15 minutes, delivered 2026-10-25 in Newark CA.

## Layout

- `source.html` - the talk deck. The single source of record; edit this, never
  `dist/talk-jk3q.html`. Kept off the site root so visitors don't land on the talk
- `p2.html` - the second presentation: 13 company and products cards, presented by hand
  or looped with `?loop`. Builds to `dist/index.html`, the page the site root serves
- `qr-p2s.svg`, `qr-p2e.svg`, `qr-p2l.svg` - p2's codes for `go.domaloans.com/ws26p2s`
  (first card), `ws26p2e` (last card) and `ws26p2l` (loop)
- `build-dist.js` - `node build-dist.js` rewrites `p2.html` to `dist/index.html` and
  `source.html` to `dist/talk-jk3q.html`, swapping the Google Fonts link for local
  `@font-face`. Exits non-zero if a remote reference survives or a local one is missing
  from `dist/`
- `dist/` - the deploy bundle and the offline fallback. 264KB, zero network calls.
  **Tracked, and not reproducible from a fresh clone** - `build-dist.js` reads its fonts,
  QR codes and logos from the working directory, and those sources no longer exist, so
  `dist/` holds the only copy. Never delete it, never add it to `.gitignore`
- `speech.md` - the rehearsal script. 21 stops with timings, spoken text, stage direction,
  a cut list and Q&A prep
- `gen-qr.js` - `node gen-qr.js <url> > out.svg`. Level H, 33x33, Doma house knocked out
  of the center
- `build-pptx.js` + `png/` - builds `../many-paths-one-front-door.pptx`, the flat fallback
- `.firebase/` - deploy cache, ignored

## Deploy

```
firebase deploy --only hosting:ws2026
```

Project `ws2026-001`, target `ws2026`, site `ws2026-dli`, live at
`https://ws2026.domaloans.com`, the talk at `/talk-jk3q.html`. Re-run `node build-dist.js`
first if `source.html` or `p2.html` changed.

## Source control

Plain `git` here, not Sapling. Never push, never commit without being asked, never amend.

Commit messages: a one-liner, an optional single paragraph, then per-file bullets.
**State the change, never why it was made.** No JIRA id. No `Co-Authored-By` trailer.
Get the message approved before committing.

```
Add .gitignore

* .gitignore: ignored .DS_Store, .firebase/ and node_modules; kept dist/ tracked
```

## Writing

Hyphens, never em dashes. en-US spelling. Numbered lists use `1.` for every item.
