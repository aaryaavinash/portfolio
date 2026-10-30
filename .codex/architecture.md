# Social integration — 2026-10-28

## Current music/data path — 2026-10-28

Cloudflare Pages maps `functions/api/music.ts` to `/api/music`. The function fetches the public latest-song JSON widget and xiffy Last.fm RSS in parallel, validates them through `src/music-data.ts`, and returns a short-cache JSON snapshot. `src/personal.tsx` polls that same-origin endpoint every two minutes while visible; in plain Vite preview, it falls back to the CORS-enabled latest-song widget. `tools/check-music.mjs` tests parser, valid/empty/unsafe data, and success/failure responses. No account secret is bundled. `wrangler.jsonc` configures Pages output.

<!-- ORIGINAL (preserved, not deleted — disabled by comment): `src/social.tsx` mounts lazily near `#social`. It fetches the public GitHub user endpoint and validates counts through `src/social-data.ts`; Instagram and Discord are static pending official account access and numeric Discord ID/opt-in. `tools/check-social.mjs` covers the parser. The Music recent-listening list is currently an honest placeholder because no Last.fm account exists. -->
<!-- ORIGINAL (preserved, not deleted — disabled by comment): `src/social.tsx` mounts lazily near `#social`. It fetches the public GitHub user endpoint and validates counts through `src/social-data.ts`; Instagram and Discord are static pending official account access and numeric Discord ID/opt-in. `tools/check-social.mjs` covers the parser. The Music scene fetches the latest public scrobble for `aaryaavinash` through the Last.fm Last Played widget, validates it in `src/lastfm-data.ts`, and shows an empty state when no tracks exist. `tools/check-lastfm.mjs` covers valid, empty, and unsafe data. -->
`src/social.tsx` mounts lazily near `#social`. It fetches the public GitHub user endpoint and validates counts through `src/social-data.ts`; Instagram remains static, while Discord embeds the public `dsc-readme.tsuni.dev` SVG for user ID `1217420097317109821` and falls back to the static card if it fails. `tools/check-social.mjs` covers the GitHub parser. The Music scene fetches the latest public scrobble for `aaryaavinash` through the Last.fm Last Played widget, validates it in `src/lastfm-data.ts`, and shows an empty state when no tracks exist. `tools/check-lastfm.mjs` covers valid, empty, and unsafe data.

# Added modules — 2026-10-28

`src/personal.tsx` is lazily imported near `#personal` and mounts CardFlip, NowPlaying, and TearTicket. `src/impact.tsx` mounts ActivityTerrain after fetching/validating public daily GitHub counts with `src/contributions.ts`; static snapshot figures remain readable until the island loads. Source components live in `src/components/`, with local wrappers/utilities replacing their original shadcn aliases. Vite filters only irrelevant `use client` bundle warnings; all other warnings remain.

# Architecture

## Stack

<!-- ORIGINAL (preserved, not deleted — disabled by comment): Vite 8.3.1; TypeScript 7.0.2 (strict); Tailwind CSS + Vite plugin 4.3.3; Lenis 1.3.26. Versions match available installed packages and are pinned. The original brief's Lenis CDN 1.3.19 is superseded by the npm build architecture; the same smoothWheel/manual-RAF behavior is retained. -->
Vite 8.3.5; TypeScript 6.0.3 (strict); Tailwind CSS + Vite plugin 4.3.3; Lenis 1.3.26. TypeScript 7's native checker crashed during validation here; the JS-based TypeScript 6 compiler passes. The original brief's Lenis CDN 1.3.19 is superseded by the npm build architecture; the same smoothWheel/manual-RAF behavior is retained.

## Files and responsibilities

```
portfolio/
  index.html                  semantic content, original copy, original image URLs
  src/
    main.ts                   grid, loader, Lenis, menu, headings, observers
    liquid.ts                 reusable SVG-filter spring + image fallback
    voices.ts                 three quotes, selection and word reveals
    style.css                 Tailwind import/theme + refinements/accessibility
    reference.css             original reference CSS in the components cascade layer
  public/
    type-specimen.html        standalone custom-font specimen
    fonts/aarya-tall.ttf       original generated display prototype
    fonts/FONT-LICENSE.txt     font license and provenance
  tools/build-font.py          standard-library font source/generator/self-check
  vite.config.ts              Tailwind plugin, relative static base
  tsconfig.json               strict DOM/ES2022, noEmit, unused checks
  package.json / package-lock.json
  .codex/                    project intent and preservation archive
```

## Data flow

The page ships meaningful HTML first. TypeScript enhances existing elements. CSS outside `.motion` shows final states; the loader is activated by `.js`. The runtime initializes Lenis, creates per-letter spans, sequences the intro, wires menu behavior, measures heading line wraps after fonts load, and registers one-shot viewport reveals. Liquid and voice modules bind to data attributes.

Content is deliberately hardcoded in the markup; only the three testimonial records live in their behavior module. There is no user-facing configuration object. Asset replacement points are documented in `assets.md`.

## Cascade

Tailwind provides utilities and tokens. Original CSS is imported into `layer(components)`, which allows Tailwind utilities to define layout. `style.css` holds explicit refinements after the imports. Preserve the root-font breakpoint ordering and final ≤640px fixed-gutter override; the initial implementation accidentally let the later :root block undo the phone gutter.

## Build/run

`npm install` (or `npm ci` with lockfile) → `npm run dev`. `npm run build` runs TypeScript followed by Vite; `npm run preview` serves the output. No server credentials, env vars, or API keys. The static distribution still relies on external Google Fonts and reference media.

In this restricted session, registry DNS failed and an offline install had missing metadata. Dependencies were copied from an existing local installation, with versions and registry integrity metadata retained from its lockfile. No runtime source imports paths outside this project. A normal networked `npm ci` remains to be verified on a clean machine.

## Preservation

The full prior index.html is stored inside a disabled HTML comment in `.codex/archive/initial-index.html.txt`. This preserves all original HTML/CSS/JS, including the bugs fixed by the migration, without executing or shipping it in the application. Future code replacements follow the same explicit comment rule.

## External constraints

There was no connected browser surface for screenshot/UI review. The canonical Obsidian vault is readable but outside writable roots. Pending memory notes are kept in `.codex/second-brain/` for later synchronization, not presented as already saved to the vault.

## Current update — 2026-10-28

Added GSAP3.15.0 with ScrollTrigger per user request. main.ts owns one Lenis/GSAP ticker, intro/menu timelines and one-shot section triggers. liquid.ts and voices.ts now return cleanup functions and use GSAP tweens. Responsive behavior is documented in responsive.md; the old JS adaptive-root scaling is preserved in the before-gsap archive and replaced by stable browser-default root sizing and CSS clamps.

Tailwind source scanning is restricted to index.html and src; disabled archives/docs no longer generate unused utilities. npm install completed normally after permissions were expanded. Dev preview now starts on http://127.0.0.1:5173/.

## React Bits impact island — 2026-10-28

The static impact figures remain in `index.html` as meaningful fallback content. `main.ts` observes `#impact-stats` with a 600px prefetch margin and dynamically imports `src/impact.tsx` only when nearby. A React root replaces the fallback with the supplied AnimatedContent and Counter components. Its one wrapper controls the four stat entries; the page's existing ScrollTrigger block selector no longer targets those entries. HMR unmounts the island. The Counter engine runs RAF only while a digit changes. `public/licenses/react-bits.txt` includes upstream licensing; `.codex/archive/react-bits-upstream/` preserves the unmodified supplied component source as disabled comments.
