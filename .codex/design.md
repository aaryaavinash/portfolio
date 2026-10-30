# Browser identity and listening card — 2026-10-28

The AA favicon uses the page's near-black field, ivory first initial, and accent-red second initial. The share card repeats the two-line name composition and restrained grid. The Music scene keeps the vinyl form but presents real track metadata and recent history as editorial information; simulated transport and seek controls are hidden.

# Music and social direction — 2026-10-28

The gaming card becomes a larger game pass: custom AA emblem on the front, grouped game loadout on the back. Music pairs a larger record player with a ruled recent-listening panel. Social cards adopt the visual language of their respective platforms: bright Instagram profile, dark GitHub stats, and purple Discord profile, inside the site’s larger black editorial composition.

# Full-size personal panels — 2026-10-28

The Beyond The Build interactions now occupy three successive full-width, min-height `100svh` scenes: Play, Music, Connect. Each scene has its own text and interactive stage in a two-column desktop layout and a stacked mobile layout. The earlier 3/2/1 card grid description below is superseded.

# Expanded design note — 2026-10-28

Hero roles are Developer / Founder / Creator / Student. Story and Current Focus cover development, Zyrix Dev, graphics/video, forex/crypto, and gaming. Selected Projects has Aequarch Esports and Zyrix Dev. The Beyond The Build section introduces three interactions in the existing dark/vermilion visual language: a 3D gaming card, a record-player preview, and a perforated contact ticket. The GitHub terrain belongs beneath the snapshot figures. All three personal interactions fit into 3/2/1 columns across wide/tablet/phone widths.

Earlier design contract below is historical.

# Current design direction — Aarya Avinash

Retain the cinematic near-black/vermilion composition, Anton/Onest typography, oversized AARYA / AVINASH wordmark, and restrained section rules. The hero now uses Aarya's public GitHub photo with a bottom fade instead of the fictional video. Two linked project cards use clearly illustrative SVG covers. The former Voices section is an interactive Current Focus section with three first-person working notes and Aarya's profile photo. Continuous responsive sizing in `src/style.css` supersedes the historical adaptive-grid specification below.

Historical reference contract follows.

# Design contract — Marcus Vane reference / Aarya foundation

## Direction

A cinematic, dark founder portfolio. The oversized name is the primary graphic device; the moving portrait is layered in front. Supporting sections are restrained: open spacing, thin rules, large type, no floating cards or shadows. The supplied reference wins over generic design recommendations.

```
MV + NAME                         STORY  VENTURES  IMPACT  VOICES  CONTACT
FOUNDER                                        conviction paragraph
INVESTOR
OPERATOR                portrait / video
CONTRARIAN          M A R C U S behind portrait
                       V A N E behind portrait
scroll cue                      base gradient
──────────────── infinite principles ─────────────────
Story / heading / prose             four numbered principles
Selected ventures                  04 / Companies
large image + company                    large image + company (+6rem)
large image + company                    large image + company (+6rem)
four huge impact figures separated by rules
three voice selectors            quote + portrait
oversized contact question / email
signature                         social links                 copyright
```

## Tokens

| Token | Value | Role |
|---|---|---|
| background | #08080a | Canvas and preloader |
| foreground | #f3f1ea | Headings, readable copy |
| surface | #111114 | Image bed |
| surface-2 | #17171b | Missing-image gradient |
| muted | #807f78 | Supporting copy and labels |
| line | rgba(243,241,234,0.1) | Section/card rules |
| line-strong | rgba(243,241,234,0.22) | Badge outline |
| accent | #ff3b1d | Hero name, indicators, hover, percentages |
| accent-2 | #ff6a3d | Reserved original secondary accent |
| gutter | 2.5rem / 16px at ≤640px | Page edge |
| section | 9rem | Vertical section rhythm |

Selection: red background and near-black text. Display family: Anton 400. Body family: Onest 400/500/600. All heading tracking −.01em. Full scale in `typography.md`.

## Adaptive grid

Root font-size: 16px by default; at ≤1920px .833333vw; ≤1440px 1.111111vw; ≤1024px 1.5625vw; ≤640px 4.444444vw. Keep queries in that order. Above 1920px:

`size = 16 - (16 * (((1920 - innerWidth) / 1920) * 100 * .6666)) / 100`.

Only set inline font-size when size >16px, otherwise remove the inline property. These discontinuities are explicit reference behavior, not an accidental fluid clamp. Tailwind layout breakpoints remain sm=640, md=768, lg=1024.

## Composition details

- Header fixed at top, z=50; top nav padding 1.5rem × gutter. Badge 2.5rem square circle. Desktop links gap 2.5rem. Hide desktop links below 768px.
- Hero min-height 100svh, clip overflow. Text top row padding-top 7rem / 8rem at sm. Roles 1.75rem / 3.25rem. Description max-width 26rem, right aligned at sm.
- Name z=10, bottom 0, translated down 6%, line-height .78, uppercase red. 13rem phone / 28rem at sm. Each line centered.
- Portrait z=20, bottom-centered, 86vh high, 80vw / 48vw / 36vw. Object-position center bottom. Bare filter treatment, no veil or vignette. Gradient z=20, bottom 26vh tall. Roles/description/cue z=30.
- Marquee 2rem vertical padding, 1px borders, 3.25rem type, separators .625rem with 2rem margins.
- Story 6/6 columns at lg, 3rem mobile row gap. Heading max-width 16ch, prose 46ch. Principles [auto,1fr], gap 1.5rem, padding 2rem, borders.
- Ventures header max-width 14ch, grid margin-top 4rem, gutter horizontal gap, 4rem vertical gap. Right cards offset 6rem at md. Images 16:11, radius .125rem. Company text 1.75rem, descriptions max-width 42ch.
- Impact margin-top 4rem, top border. Figures 7.5rem. Cells 2.5rem vertical / 3rem at lg. Alternating 2-column and 4-column dividers with 2rem left padding.
- Voices grid 5/7 columns at lg. Selector rows 1.75rem vertical, border-top; last border-bottom. Active rule 2.5rem. Portrait 4:5, 16rem wide at sm. Quote 1.75rem/1.3, max-width 30ch.
- Contact heading max-width 18ch, 5rem / 7.5rem. Paragraph max-width 44ch. Email margin-top 3rem. Footer margin-top 9rem, padding 3rem, 6/3/3 columns at lg.

## Deliberate responsive safeguards

At <640px, the hero has min-height max(100svh,48rem), portrait 100vw ×70svh, description .8125rem at 22ch, name capped at 35vw, contact title 3.75rem, email 1.45rem, stats 6.5rem. Venture metadata wraps below narrow descriptions. At 1024–1200px the voice portrait stacks above the quote. These are documented adaptations to avoid overflow and collisions from the reference root-grid jumps. All other values retain the specification.

## Accessibility and failure states

Visible focus rings, skip link, semantic headings, real buttons/links, descriptive images, hidden repeated marquee, inert mobile panel and background, focus trap and restoration, keyboard quote selection. No required interaction exists only on hover. Content is visible without JS; the intro only becomes active after initialization. Text entrance spans preserve accessible full phrases. Reduced motion stops auto animation/video. Remote image errors reveal branded text placeholders.

## Critique to repeat when preview is available

Check face/name overlap at 1440×900 and 1920×1080; name baseline must melt into the page. Check 360×800/390×844 for reading order and clipping. Check 768, 1024, and 1440 boundaries immediately above/below. Verify 200% browser zoom. Compare line wrapping only after Google Fonts load. Do not call this pixel-matched without those observations.

# Twenty-world project gallery — 2026-10-30

The Projects chapter keeps the original two-card list as a no-JavaScript fallback. Once the gallery loads, 20 real repo screenshots appear as large editorial frames in a horizontal filmstrip. The black stage, WebGL orbital field, accent-red progress, dimmed neighboring frames, and compact captions preserve the portfolio's Anton/Onest direction. Screenshots are served from each public repository's `docs/media` file; no invented project art is used. Live project and source links are separate.

# Portfolio-wide scene and loader — 2026-10-30

The Alche reference informed the chapter rhythm, technical line work, and scroll-linked atmosphere. The portfolio uses its own interlocking AA line mark in the loader, header, and footer, plus one fixed procedural WebGL field behind the page. This field is visible around transparent sections and pauses while the gallery's separate scene is present. Desktop chapters gain a discreet right-side rail with active-section feedback. The original portrait, real projects, black/vermilion palette, and accessible content remain the identity anchors.
