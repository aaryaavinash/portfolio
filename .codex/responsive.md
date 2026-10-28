# Spotify history and icons — 2026-10-28

Music scene remains content-height safe when five recent tracks render. The recent list uses a flexible title column, wraps long song names, and keeps the date/status on the right. Favicon SVG includes a PNG fallback; a 180px touch icon serves mobile home-screen bookmarks. The 1200×630 share image fits social previews.

# Enlarged card and social grid — 2026-10-28

Gaming card grows to a 470px desktop cap and 88vw/390px mobile cap. Music player grows to 34rem and recent-listening rows follow it in the right-hand stage. Social cards use three columns at ≥1200px, two at 768–1199px, and one below 768px.

# Responsive contract — 2026-10-28

This update supersedes the original discontinuous viewport-driven rem scale. User requested better viewing across all screen sizes. Root font-size now follows the browser default (100%); headings, gutters, and section spacing use continuous clamps.

## Layout ranges

- Below640px: one-column cards/stats/voices; fixed readable body scale; compact two-column hero introduction; portrait below/behind it; custom name fitted after fonts load. Safe-area-aware header and menu. 44px navigation targets.
- 640–767px: two-column stats, quote/portrait pairing where space allows, compact mobile navigation. Venture cards remain one column.
- 768–1023px: two-column staggered venture cards; full hero introduction row. Mobile menu avoids crowded desktop navigation.
- 1024–1279px: desktop nav, four stats, 12-column story/voices/footer. Voice image stacks above quotation in the narrower right panel.
- At1280px: quote and portrait share the featured panel.
- At1536px: venture outcome metadata returns to the right of the blurb.
- Above1920px: centered content grows side gutters instead of stretching text measures indefinitely.
- Short landscape screens (height≤500px) have a scrollable menu and taller hero to avoid collisions.
- Below360px: large headings may break long words; no minimum page width is imposed.

The hero name measures its rendered width after fonts load and on width changes, so AARYA / AVINASH fits inside the viewport without relying on guessed character widths. Word wrapping and ScrollTrigger positions refresh together after layout settles. Height-only mobile browser-toolbar changes do not rebuild heading spans.

## Motion/performance

Touch remains native; smoothWheel uses Lenis. Hover distortion only for fine-pointer hover devices >768px. Reduced motion remains supported. Lazy image decoding preserves aspect-ratio space; hero preload is metadata. Hero video and marquee stop offscreen/hidden. Liquid filters are detached at rest to avoid repeated expensive SVG rendering.

## Verification limits

Build, module-level behavior tests, and HTTP preview can run. No browser surface is connected, so viewport screenshots, device gestures, 200% zoom, Safari behavior, and GPU frame timings remain unverified. Do not claim universal-device certification. Target review widths: 320,360,390,640,768,1024,1280,1440,1920,2560 and short landscape 844×390.

## Personal hero adjustment — 2026-10-28

At widths ≤767px the red name moves above the temporary GitHub portrait and the scroll cue moves above the image edge. This keeps both readable despite the square, non-cutout profile photo. Desktop retains the portrait-in-front layering.

## Beyond The Build — 2026-10-28

The three interaction panels use 3 columns from 1280px, 2 columns from 768px (ticket spans both), and 1 column below 768px. The 460px TearTicket scales to its parent width. GitHub activity uses a text/data grid on wide screens and stacks below 768px.

## Three full-size scenes — 2026-10-28

The old 3/2/1 interaction grid is superseded. Each panel spans viewport width and uses `min-height:100svh`. Its two columns collapse into one below 768px; content may grow taller than the viewport when needed.
