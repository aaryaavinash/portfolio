# Listening-card motion note — 2026-10-28

The NowPlaying disc artwork remains present, but display-only mode hides the simulated progress and transport controls. A real `nowPlaying` flag changes the label to “Now listening”; the card does not spin or claim audio playback without a stream. Polling changes the song text and the recent list without interrupting page scroll.

# Last.fm motion note — 2026-10-28

Latest scrobble text changes without a fake play animation. NowPlaying remains paused because Last.fm scrobble metadata is not an audio stream. The public widget is checked every two minutes only while the page is visible.

# Social/musical motion note — 2026-10-28

CardFlip physics are unchanged; the larger face uses a new game-pass graphic. The NowPlaying component remains a paused visual preview until music data is available. New social cards use only simple hover color feedback; no false live activity animation is shown.

# Added interaction motion — 2026-10-28

CardFlip uses the supplied drag/release spring and supports click, touch, and keyboard. ActivityTerrain uses its canvas spring only when visible; it receives real public GitHub daily counts. NowPlaying is paused initially and clearly labeled as a visual preview without audio. TearTicket uses the supplied paper bridge/tilt simulation, with reduced-motion behavior and an always-visible mailto link. The personal React island loads near its viewport section; ActivityTerrain loads with the Impact island. Earlier motion details below remain historical reference.

# Personalization motion note — 2026-10-28

The intro, hero letters, ScrollTrigger section entrances, marquee, Lenis, liquid filters, and React Bits impact animation remain. The hero media is now a still GitHub profile photo, so video playback/pause orchestration is removed. The former quote word reveal now animates Aarya's three focus statements on selection. Reduced motion remains supported. Historical timing specification follows.

# Animation contract

Runtime: Lenis + CSS transitions + requestAnimationFrame + IntersectionObserver. No React Spring runtime, GSAP, or spring-text-engine. The simple reveal timings reproduce the supplied equivalents; liquid distortion integrates the original spring's tension/friction.

## Intro timeline (milliseconds from module initialization)

| Start | End | Action |
|---:|---:|---|
| 0 | 2000 | Rounded counter 0→100; native and Lenis scroll locked |
| 2000 | 2300 | Both labels fade to opacity 0 |
| 2300 | 2500 | Hold |
| 2500 | 3150 | Loader translateY 0→−100%; bezier(.22,1,.36,1) |
| 2500 | per letter | MARCUS begins; each letter +52ms, duration 900ms |
| 2740 | per letter | VANE begins; each letter +52ms, duration 900ms |
| 2700 | per line | Roles begin; +80ms/line, 760ms each |
| 2900 | 3420 | Description opacity 0→1, y16→0 |
| 3150 | — | Loader aria-hidden, scroll unlocked, page interactive |
| 3400 | 3900 | Scroll cue fade |

The 2500ms hero baseline intentionally overlaps the last 650ms of the loader wipe. Do not instead wait until 3150ms and add another 2500ms.

## Springs translated to CSS

| Original spring | Target | Equivalent |
|---|---|---|
| 90 / 20 | Loader wipe | 650ms cubic-bezier(.22,1,.36,1) |
| 210 / 28 | Menu opacity | 450ms ease-out |
| 260 / 30 | Menu link trail | 420ms ease-out; y48→0 |
| 180 / 26 | Description / story body | 520ms cubic-bezier(.16,1,.3,1) |
| 170 / 26 | Principles / stats | 560ms cubic-bezier(.16,1,.3,1) |
| 150 / 26 | Venture cards | 620ms cubic-bezier(.16,1,.3,1), y60→0 |
| 140 / 24 | Voice portrait | 640ms cubic-bezier(.16,1,.3,1), scale1.06→1 |
| 220 / 22 | Figure / email hover | 340ms ease-out |
| 220 / 26 | Image veil | 380ms ease-out |
| 140 / 13 | Liquid distortion | Integrated spring with two substeps; damped overshoot |

## Text

- Name letters: y100%→0, opacity0→1, 900ms easeOutExpo = bezier(.16,1,.3,1), stagger52ms; second line +240ms.
- Roles: y110%→0, opacity0→1, 760ms easeOutExpo, stagger80ms.
- Headings: actual measured lines, clipped outer spans, y110%→0, opacity0→1, 900ms easeOutExpo, stagger90ms.
- Quotes: words y18px→0, opacity0→1, 520ms easeOutQuart = bezier(.165,.84,.44,1), stagger22ms. First playback on viewport entry; replay on actual voice changes only. Render revision guards prevent stale animation callbacks from affecting new content.

## Scroll reveals

IntersectionObserver threshold0/rootMargin0, add in-view once and unobserve. Principles +90ms per index; stats +110ms; right-column ventures +120ms. Observe individual cards/cells; applying in-view only to descendants is insufficient. Never reverse on scroll out. Do not hide content permanently when JS is unavailable.

## Continuous motion

Marquee has exactly two identical sets, second aria-hidden. Flex max-content track moves x0→−50% in 22s, linear, infinite. Each set ends with the same red dot spacing. Hero video autoplay/muted/loop/playsinline, supplied portrait poster.

## Liquid images

Every figure owns a unique SVG filter. feTurbulence fractalNoise, baseFrequency .009, numOctaves2. feDisplacementMap SourceGraphic/noise, scale1 at rest. Hover: frequency .022, scale28 for ventures,30 hero,22 voices. Write filter attributes directly per frame. Tension140/friction13, dt capped at 1/30s and two physics substeps/frame. Smooth return to rest, stop RAF when settled.

Full treatment: dark color-blend veil .88→0 in380ms, red120° glow sweep opacity0→1, persistent radial bottom vignette. Hero bare treatment has no overlays. Pointer hover only on fine-pointer hover devices above768px. Reset immediately when reduced-motion or hover capability changes. Images that fail retain a branded label.

## Interactive behavior

Nav underline: width0→100%, 1px red, bottom−.25rem. Burger bars .125rem high, translate±.5rem and rotate±45°; middle opacity0. Menu first link delay120ms, next +60ms each. Active voice rule width0→2.5rem. Email color→accent and x0→14px over340ms. Social leading rule0→1.5rem.

## Reduced motion and lifecycle

When prefers-reduced-motion is active: skip loader, show text at final state, native/Lenis wheel smoothing disabled, marquee stopped, video paused, SVG distortion disabled. Preference changes during the intro cancel queued timers and release scroll. Mobile-menu open state still keeps the background locked. Ignore autoplay rejection and retain the poster. HMR disposes the main RAF and Lenis instance.

## GSAP + ScrollTrigger update — 2026-10-28 (current implementation)

User explicitly requested GSAP, ScrollTrigger and Lenis. This supersedes the earlier CSS-only orchestration/IntersectionObserver reveal approach.

- GSAP3.15.0 + ScrollTrigger; Lenis1.3.26. One GSAP ticker drives Lenis with seconds→milliseconds conversion. Lenis scroll events call ScrollTrigger.update. Lag smoothing disabled as recommended in the Lenis integration docs.
- Intro is one cancellable timeline, retaining the 2s count, 300ms label fade, 200ms hold, 650ms wipe, and original hero entry offsets/staggers. Counter text writes only when the rounded integer changes.
- Sections use one-shot ScrollTriggers starting at `top bottom`. Transform/opacity tweens use `expo.out`; quote reveals use `power3.out`; wipe uses `power3.out`. These native GSAP eases replace the previous CSS curves. No per-scroll layout measurement or scrubbed paragraph animations.
- Menu uses one reversible timeline, with faster close playback; rapid toggles retarget the current progress. Focus/inert/Escape behavior is retained.
- Quotes kill the previous word tween before replacing spans. Same-voice events do not restart. Reduced-motion changes immediately finish word reveals. Module cleanup removes its trigger/listeners/tween.
- LiquidImage is retained. SVG attribute changes run through a GSAP tween with elastic.out(1,0.5) entry and power3.out return, 520ms each. Filters detach at rest, on disabled hover/reduced motion, and offscreen. No independent liquid RAF loops remain.
- CSS owns inexpensive hover colors and the marquee. GSAP-owned elements explicitly disable their old CSS transitions to prevent compounded easing. Original sources are preserved in `.codex/archive/before-gsap/`.
- Video and marquee pause offscreen and in hidden tabs. Per-image hover tweens are killed/reset offscreen. Images below the hero use lazy loading and async decode; video preload is metadata.
- HMR cleanup aborts listeners, kills page timelines/triggers, disposes modules, removes the shared ticker callback, and destroys Lenis.

Official references: https://github.com/darkroomengineering/lenis#gsap-scrolltrigger and https://gsap.com/docs/v3/GSAP/gsap.ticker/.

The Lenis ticker callback is detached in hidden tabs and under reduced motion; it reconnects when appropriate. A reduced-motion change stops existing inertia before releasing the usual menu/loader-aware scroll lock.

## React Bits impact animation — 2026-10-28

AnimatedContent wraps the four impact stats: 40px vertical travel, 1.1s power3.out, 0.08s child stagger, 0.1 threshold, once. Counter uses its original digit spring/intro, inherits the responsive stat size, and disables motion blur to keep four large figures light. Values are 4, $3.2B, 120M+, and 2,400. AnimatedContent now re-evaluates a GSAP media context when reduced-motion preference changes; Counter already checks that preference during its frames. Other sections retain their existing ScrollTriggers.

# Projects horizontal motion — 2026-10-30

At 1024px and above, GSAP ScrollTrigger pins the Projects stage and scrubs the track from first to last frame against vertical scroll distance. The active frame scales and gains opacity, while the progress rail and 01–20 counter follow the scroll. One low-resolution WebGL canvas supplies a subtle moving backdrop while visible. It pauses when hidden or reduced motion is requested; WebGL failure leaves the CSS background. Below 1024px or with reduced motion, the track becomes native horizontal scroll with snap points and no pin.
