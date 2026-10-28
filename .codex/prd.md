# Spotify music requirement — 2026-10-28

Show the public latest scrobble and up to five previous songs once Aarya connects Spotify to Last.fm. Use Cloudflare Pages Functions to fetch third-party public data server-side; show a clear empty/unavailable state until tracks exist. Do not imply the visual record card plays audio. Keep the title, favicon, mobile icon, and share metadata aligned with the Aarya identity. Direct Spotify Web API is outside scope while Aarya lacks Spotify Premium.

# Last.fm account update — 2026-10-28

The account `aaryaavinash` is now known. Show its latest public scrobble if available, and a clear empty state while the account has zero public tracks. The provided NowPlaying controls are visual only and must be described as such. A multi-track history requires official Last.fm API access or another authorized data source.

# Music and social requirements — 2026-10-28

Enlarge and redesign the CardFlip face, add a recent-listening area to Music, and add an Instagram/GitHub/Discord social section. Use live GitHub public counts. Do not invent Last.fm tracks, Instagram counts, or Discord presence. Keep static no-JS links and clear fallbacks; request needed account/API details for the remaining live integrations.

# Personal panel layout acceptance — 2026-10-28

Play, Music and Connect must be three separate full-width sections, each at least one viewport tall. Preserve responsive stacking on phones, static readable fallback content before React loads, and all existing interactions.

# Expanded acceptance criteria — 2026-10-28

The portfolio must present Aarya's self-described roles and interests accurately; feature Aequarch Esports and Zyrix Dev; provide verified public links and email; use live GitHub daily contribution data with an honest failure fallback; show an interactive gaming card, a clearly labeled music preview until Last.fm exists, and a tear-off contact ticket with an always-available email link. Keep the existing GSAP/Lenis motion and responsive behavior. Do not imply trading returns, client work, audio playback, or live music history. The existing reference-phase requirements below are historical.

# Current product requirements — Aarya portfolio

Present Aarya as a web developer and builder without fabricated biography. Feature the verified original GitHub repository Aequarch Esports and this in-progress portfolio. Show a clearly dated GitHub snapshot (2 public repositories, 1 original, 1 fork, account since 2023) with a link to current GitHub data. Use Aarya's public GitHub photo, local illustrative project artwork, the supplied `hello@aaya.cyou` address, and only verified GitHub/Instagram links. Replace testimonials with an interactive focus selector. Preserve GSAP, ScrollTrigger, Lenis, React Bits AnimatedContent and Counter, responsive layout, and reduced-motion behavior.

The Marcus Vane requirements below describe the earlier reference phase and are superseded for live content.

# Product requirements

## Purpose and audience

Create the visual and technical foundation for Aarya Avinash's portfolio. Future visitors will be collaborators, hiring teams, and people evaluating Aarya's GitHub work. This phase reproduces the Marcus Vane founder reference so typography, layout, motion, and asset placement can be reviewed before personalization.

## Scope and precedence

The latest user request supersedes the original one-file implementation constraint: Vite, TypeScript, and Tailwind are now required. The earlier detailed brief still governs all visual/content behavior. The current reference persona is fictional. No GitHub projects or biographical claims have been verified yet.

### Required sections

| Section | Content | Behavior |
|---|---|---|
| Preloader | Marcus Vane; 0–100% | Counter, fade, upward wipe, scroll lock |
| Navigation | MV badge, name, Story/Ventures/Impact/Voices/Contact | Fixed, desktop underline, mobile overlay |
| Hero | Four roles, conviction paragraph, MARCUS / VANE | Staggered lines/letters, portrait/video, scroll cue |
| Marquee | Build Bold / Scale Relentlessly / Think In Decades / Bet On People / Ship The Future | Doubled seamless 22s track |
| Story | Conviction is a competitive advantage; full story; four principles | Measured line reveals, staggered list |
| Ventures | Helix Robotics, Northwind Energy, Cadence Health, Vane Capital | 16:11 images, liquid hover, staggered 2-column layout |
| Impact | 4 / $3.2B / 120M+ / 2,400 and exact supplied labels | 1/2/4-column grid, stagger, hover color |
| Voices | Elena Cardoso, David Okonkwo, Priya Nandakumar | Synchronized quote/byline/portrait switch; repeated word reveal |
| Contact | Supplied invitation, hello@marcusvane.com, social links, copyright | Email hover, footer rules |

## Acceptance criteria

- `npm run dev` opens the portfolio; `npm run build` typechecks and emits a static `dist/`.
- All reference prose, outcomes, categories, year labels, quotations, and images remain in their supplied roles.
- No global settings object or editing panel is introduced.
- Hero layering and name scale remain recognizable at mobile, tablet, and desktop widths.
- Every section/card becomes visible on first intersection and remains visible thereafter.
- Loader always finishes; native scroll and Lenis are both unlocked at the end.
- Mobile menu is operable by keyboard, closes with Escape/link selection, traps focus, and restores normal scroll.
- Quotes switch without stale timeouts, null selectors, or simultaneous contradictory active states.
- Unique filters isolate hover distortion to the hovered asset. Leaving reverses smoothly.
- Reduced motion makes content immediately readable and stops nonessential continuous motion.
- Remote asset failure has a visible image fallback. Hero keeps its poster if video playback fails.
- `.codex` includes the design system, motion contract, product brief, reusable prompt, architecture, asset map, decisions, and verification notes.
- Original custom display lettering is reviewable in `/type-specimen.html`, with source and license.

## Out of scope now

Personalizing Marcus's claims, replacing media, importing GitHub data, forms/backends, analytics, hosting, domain setup, social-account linking, CMS, and deployment. The email/social destinations remain reference placeholders pending the content pass.

## Next content pass

Confirm Aarya's exact GitHub URL and approved biography. Select real projects and links. Replace portraits and project imagery using `assets.md`. Re-evaluate whether testimonials and numerical impact are supported by evidence; do not invent substitutes. Review Aarya Tall against Anton with the real name and choose the final display treatment.
