# Aarya Avinash portfolio

A personal portfolio built with Vite, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis, and lazy React islands. The cinematic layout is inspired by the Marcus Vane reference; the visible content is about Aarya.

```sh
npm ci
npm run dev
```

<!-- ORIGINAL (preserved, not deleted — disabled by comment): `npm run build` typechecks and produces `dist/`. `npm run preview` serves the build. Focused checks: `node tools/check-voices.mjs`, `node tools/check-contributions.mjs`, and `node tools/check-social.mjs`. -->
<!-- ORIGINAL (preserved, not deleted — disabled by comment): `npm run build` typechecks and produces `dist/`. `npm run preview` serves the build. Focused checks: `node tools/check-voices.mjs`, `node tools/check-contributions.mjs`, `node tools/check-social.mjs`, and `node tools/check-lastfm.mjs`. -->
`npm run build` typechecks and produces `dist/`. `npm run preview` serves the static build. Focused checks include `node tools/check-music.mjs`, `node tools/check-lastfm.mjs`, `node tools/check-voices.mjs`, `node tools/check-contributions.mjs`, and `node tools/check-social.mjs`.

The page presents Aarya as a student, developer, founder of [Zyrix Dev](https://dev.zyrix.qzz.io), video editor, graphic designer, forex/crypto trader, and gamer. Featured work links to [Aequarch Esports](https://github.com/aaryaavinash/Aequarch-Esports) and Zyrix Dev. Contact: `hello@aaya.cyou`.

<!-- ORIGINAL (preserved, not deleted — disabled by comment): Play, Music, and Connect have separate full-size scenes. The gaming flip card is a large game pass. Music includes a recent-listening layout, but no Last.fm history is displayed until Aarya provides an account or real songs; the player is a labeled visual preview with no audio. The social section has Instagram, GitHub, and Discord-inspired cards. GitHub public counts load from the official API. Instagram and Discord live metrics need authorized integrations, so those cards show confirmed profile details without invented data. The GitHub activity terrain uses a public contribution feed with a clear fallback. -->
<!-- ORIGINAL (preserved, not deleted — disabled by comment): Play, Music, and Connect have separate full-size scenes. The gaming flip card is a large game pass. Music checks Aarya's public Last.fm profile for its latest scrobble every two minutes while the page is visible; the profile currently has no public tracks, and the player remains a labeled visual preview with no audio. A full recent-track list needs Last.fm API access. The social section has Instagram, GitHub, and Discord-inspired cards. GitHub public counts load from the official API. Instagram and Discord live metrics need authorized integrations, so those cards show confirmed profile details without invented data. The GitHub activity terrain uses a public contribution feed with a clear fallback. -->
Play, Music, and Connect have separate full-size scenes. The gaming flip card is a large game pass. Music shows the latest Last.fm scrobble and up to five previous tracks through `functions/api/music.ts` on Cloudflare Pages. The record card is display only: it does not stream audio or offer fake playback controls. In plain Vite preview it falls back to the latest-track widget, without the history list. The social section has Instagram, GitHub, and Discord-inspired cards. GitHub public counts load from the official API. Instagram and Discord live metrics need authorized integrations, so those cards show confirmed profile details without invented data. The GitHub activity terrain uses a public contribution feed with a clear fallback.

## Spotify listening on Cloudflare Pages

Spotify's development Web API requires the app owner to have Premium, so this site uses [Last.fm's Spotify scrobbling connection](https://www.last.fm/about/trackmymusic). Aarya must sign in to [Last.fm application settings](https://www.last.fm/settings/applications) and connect Spotify. Once songs appear publicly on `aaryaavinash`, the site updates automatically. It currently reports zero public scrobbles.

Set the Cloudflare Pages project root to this `portfolio` directory, build command to `npm run build`, and output directory to `dist`. The root `functions/api/music.ts` is the same-origin `/api/music` endpoint; `wrangler.jsonc` records the build output and compatibility date. For local Pages testing, run `npm run build` then `wrangler pages dev dist`. The endpoint reads the open-source Last.fm Last Played widget for the latest track and the public xiffy RSS feed for history; both are external services, so it returns an honest unavailable state if they fail. No Spotify credential or API key is stored in the frontend.

The browser tab, favicon, touch icon, and share image are in `index.html` and `public/`. Set an absolute `og:image` URL after the final portfolio domain is known so social crawlers can fetch the share image reliably.

Working brief and design notes: [.codex/README.md](.codex/README.md), [.codex/prompt.md](.codex/prompt.md), [.codex/design.md](.codex/design.md), [.codex/animation.md](.codex/animation.md), and [.codex/verification.md](.codex/verification.md). Original source before each major pass is preserved as disabled comments in `.codex/archive/`. Component licenses are in `public/licenses/`.
