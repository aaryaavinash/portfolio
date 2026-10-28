# Browser identity and Spotify listening — 2026-10-28

Updated the tab title, description, Open Graph/Twitter cards, AA favicon, touch icon, manifest, and share image. With no Spotify Premium, direct development Web API access is unavailable. The intended no-credential path is Aarya connecting Spotify to Last.fm. A Cloudflare Pages Function `/api/music` merges latest-song and recent-track public feeds; the Music scene polls it, shows up to five past songs, and falls back to one latest track in static preview. The supplied NowPlaying component uses display-only mode to avoid false playback controls. User still needs to connect Spotify in Last.fm settings; the account currently has zero public scrobbles.

# Latest live-data update — 2026-10-28

Last.fm username is `aaryaavinash`. The Music scene now fetches the latest public scrobble from the open-source Last.fm Last Played widget; it shows a clear empty state because the account currently reports no public tracks. Its full-history list awaits official Last.fm API access. GitHub counts remain live; Instagram and Discord cards await account authorization / numeric Discord ID and opt-in. TypeScript is pinned to 6.0.3 after the 7.0.2 native checker crashed in this environment. Production build and focused checks pass.

# Music and social pass — 2026-10-28

The gaming card is larger and redesigned as a game pass. Music has a recent-listening layout but no fabricated songs. A new social section includes Instagram-, GitHub-, and Discord-inspired cards. GitHub counts load from the official public API; Instagram and Discord remain truthful profile cards until authorized live connections are available. Older notes below are historical.

# Expanded personal direction — 2026-10-28

The live page now includes user-supplied identity: student, developer, founder of Zyrix Dev, video editor, graphic designer, forex/crypto trader, and gamer. Confirmed links are Instagram `aaryaavinash_`, Discord handle `aaryaavinash`, Guns.lol, GitHub, Zyrix Dev site/org, and `hello@aaya.cyou`. Threads and Last.fm are not yet created. GitHub contributions are live via a public feed; the music component is a labeled preview. CardFlip, NowPlaying, ActivityTerrain, and TearTicket are integrated as lazy React islands. Older notes below are historical.

# Current personalized direction — 2026-10-28

The live page now represents Aarya Avinash. GitHub: `aaryaavinash`; public contact: `hello@aaya.cyou`. The reference layout and motion remain, while fictional Marcus biography, companies, exits, testimonials, image assets, and social destinations have been removed from the live page. Historical implementation notes below are preserved for provenance. Current source and README take precedence.

# Aarya Avinash portfolio — working brief

Read in order: [prompt.md](prompt.md) → [prd.md](prd.md) → [design.md](design.md) → [typography.md](typography.md) → [animation.md](animation.md). Implementation map: [architecture.md](architecture.md). Media handoff: [assets.md](assets.md). Checks and unresolved evidence: [verification.md](verification.md).

## Current direction

A faithful Marcus Vane reference implementation is the foundation for Aarya Avinash's future GitHub portfolio. The current page intentionally retains Marcus's supplied words, portraits, ventures, claims, email, and links. These are fictional reference content, **not facts about Aarya**. Personalization happens in the next content pass with verified material.

The user's latest instruction replaces the earlier single-file/no-npm constraint with **Vite + TypeScript + Tailwind CSS**. Keep the look and motion; change the implementation architecture. There is no React, backend, CMS, editor panel, auth, or deployment in this scope.

## Before the next edit

1. Read these docs and inspect the relevant source.
2. Preserve removed/replaced code as disabled comments, with the marker `ORIGINAL (preserved, not deleted — disabled by comment)`. The complete initial implementation is already preserved in `archive/initial-index.html.txt`.
3. Make changes only within the requested scope. Do not replace reference assets or invent achievements for Aarya.
4. Run `npm run build`; inspect mobile and desktop when a browser is available.
5. Update session memory once per finished task. The canonical Obsidian vault is `/home/kevin/Projects/Project Vault/`; use `.codex/second-brain/` only as a pending handoff if the vault is not writable.

## References

- https://www.getlayers.ai/layer/marcus-vane — inspected 2026-10-28; page identifies the cinematic founder/name composition.
- The user's detailed supplied specification — authority for copy, exact values, assets, and timeline.
- https://tailwindcss.com/docs/installation/using-vite — official integration, checked 2026-10-28.
- https://vite.dev/guide/ — official build setup, checked 2026-10-28.

A live browser was unavailable in this environment. Do not describe the result as visually pixel-verified.

## Name update — 2026-10-28

The visible personal name is now Aarya Avinash, with the AA monogram. All other reference claims, portraits, project names, testimonial substance, and email remain placeholders pending the next content pass.

## Motion/responsive update — 2026-10-28

Current runtime uses GSAP + ScrollTrigger + Lenis. See the latest append in animation.md and the new responsive.md. Earlier no-GSAP and adaptive-grid instructions are historical and superseded by the user's latest direction. An additional user-supplied component is pending its pasted source.

## React Bits integration — 2026-10-28

AnimatedContent and Counter are the supplied React Bits TypeScript/Tailwind components, mounted as a single lazy React island in the impact section. Earlier “no React” architecture notes are historical. Their original source is preserved as disabled comments in `archive/react-bits-upstream/`. Current source is in `src/components/`; `src/impact.tsx` applies the components. License notice: `public/licenses/react-bits.txt`.
