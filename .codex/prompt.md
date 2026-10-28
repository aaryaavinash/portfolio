# Current prompt — expanded Aarya portfolio

Maintain the cinematic Aarya Avinash portfolio using Vite, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis, and lazy React islands. Show Aarya's self-described identities: student, developer, founder of Zyrix Dev, video editor, graphic designer, forex/crypto trader, and gamer. Feature Aequarch Esports and Zyrix Dev with truthful public links. Use live GitHub contribution history in ActivityTerrain, a flip card listing Minecraft, CODM, BGMI, Free Fire, GTA V, CS2, and chess, a NowPlaying visual preview (no Last.fm account or audio yet), and a TearTicket email invitation with a permanent fallback link. Link Instagram, GitHub, Zyrix Dev, Guns.lol; show Discord handle as text because no user ID URL was supplied. Do not link Threads or claim Last.fm integration before those accounts exist. Preserve replaced source as disabled comments. Keep accessibility, reduced motion, mobile responsiveness, and error fallbacks.

Earlier prompts below are historical.

# Current implementation prompt — Aarya Avinash

Build and maintain Aarya Avinash's cinematic developer portfolio in `portfolio/` using Vite, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Lenis, and the supplied React Bits AnimatedContent and Counter components. The Marcus Vane page is visual/motion inspiration only. Public factual content comes from `https://github.com/aaryaavinash` and the original `Aequarch-Esports` repository; the user supplied `hello@aaya.cyou`. Do not attribute fictional exits, investments, statistics, or testimonials to Aarya. Keep the AARYA / AVINASH hero composition, responsive layout, accessible navigation, reduced-motion support, linked projects, dated GitHub snapshot, interactive focus notes, and contact footer. Replace illustrative art with user-approved images when available. Preserve prior source in disabled comments before further changes.

The earlier reference-phase prompt follows as history, not current instruction.

# Implementation prompt — current source of intent

Build a cinematic founder portfolio as a Vite + TypeScript + Tailwind CSS application inside `portfolio/`. Use the supplied Marcus Vane reference as the design baseline for a later Aarya Avinash GitHub portfolio. Preserve every supplied piece of reference copy and every asset in its original role until the user supplies replacements. Do not reinterpret the imaginary companies, exits, figures, or testimonials as Aarya's biography.

## Visual direction

Near-black canvas (#08080a), warm paper text (#f3f1ea), muted warm gray (#807f78), and signature vermilion (#ff3b1d). Anton's tall, heavy condensed uppercase display is the defining type treatment. Onest carries body text and navigation. The hero is a giant two-line MARCUS / VANE wordmark behind a centered animated portrait. Keep the portrait/wordmark/base-gradient layer ordering. No card shadows, pill buttons, invented gradients, background decoration, or new UI controls.

## Page sequence

Preloader → fixed navigation → hero → infinite principles marquee → story + four principles → four staggered venture cards → four impact figures → interactive voices → contact/footer.

The preloader counts from 0 to 100 over 2 seconds, fades labels for 300ms, waits 200ms, and wipes upward in 650ms. Hero letters begin at 2500ms, overlapping the wipe as specified. Roles begin at 2700ms, description at 2900ms, scroll cue at 3400ms. Lower sections reveal once on first intersection. Full numeric motion contract: `animation.md`.

## Architecture

Use static semantic HTML, Tailwind v4 through its Vite plugin, strict TypeScript, Lenis installed from npm, CSS transitions, requestAnimationFrame springs, and IntersectionObserver. No React/Next, routing, CMS, schema/config system, GSAP dependency, or controls. Keep the small runtime split by responsibility: page orchestration, liquid images, and testimonial selection.

CSS tokens preserve the reference's rem grid: 1920/1440/1024/360 reference widths, 2.5rem desktop gutter, fixed 16px phone gutter, 9rem section spacing. Above 1920px use the exact damped root-font formula. Font sizes are specified in `typography.md`. A few narrow-screen safeguards may prevent clipping; document every intentional deviation.

## Typography work

Retain Anton + Onest on the reference page. Create an **original, local font prototype** for Aarya's later wordmark, with a source generator, honest coverage and limitations, specimen page, and license. Do not rename a downloaded typeface and call it original. Do not silently replace the reference face before the later identity pass.

## Motion and interaction

Use a unique SVG displacement filter per image. Animate feDisplacementMap.scale and feTurbulence.baseFrequency imperatively. Bare hero: video + filter only. Venture/voice images: surface, grayscale color veil, red glow sweep, vignette, and graceful missing-image placeholder. Disable hover distortion on touch and widths ≤768px. Reduced motion skips the intro and entrances, stops the marquee and hero video, and disables liquid distortion.

Mobile menu: opacity reveal, 48px link trail, X transformation, actual scroll lock, hidden inert panel, Escape support, focus containment, and focus return. Anchor links close the menu and use Lenis. Testimonial hover, keyboard focus, or click switches quote, byline, active state, and portrait together; words reveal anew. Same-item events must not restart the quote.

## Completion

Produce `.codex` documentation, a runnable locked dependency setup, buildable source, original code preservation, working animations/interactions, and a custom-font specimen. Record verified checks separately from unperformed browser comparisons. Keep the reference assets for now; the next task will replace images and personalize content.

## Latest override — 2026-10-28

Use GSAP + ScrollTrigger + Lenis, explicitly requested by the user. Use the current responsive.md layout rules instead of the original discontinuous root-font grid. Personal identity is Aarya Avinash / AA. Keep existing LiquidImage; a separate component will arrive as pasted code and must be integrated only after it is supplied.
