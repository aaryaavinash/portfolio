# Typography

## Reference typography

Anton is the active display face, single weight 400. Its narrow footprint permits a large cap height without making the name too wide. The dense strokes and vertical silhouette make the hero feel monumental. Onest provides a legible, quieter contrast; do not use Anton for paragraph copy or Onest for the giant signature.

Google Fonts request: `https://fonts.googleapis.com/css2?family=Anton&family=Onest:wght@400;500;600&display=swap` with preconnects to fonts.googleapis.com and fonts.gstatic.com.

| Role | Size | Line-height | Usage |
|---|---|---|---|
| hero | 28rem | .78 | Desktop name |
| mega | 13rem | .86 (hero override .78) | Phone name baseline |
| display | 7.5rem | .9 (counter/stat override 1) | Preloader, figures, large contact |
| h1 | 5rem | .95 | Main section headings |
| h2 | 3.25rem | 1 | Mobile section heads, marquee, signature |
| h3 | 1.75rem | 1.15 | Principles, company/voice names |
| lead | 1.375rem | 1.45 | Story/contact paragraphs |
| body | 1.0625rem | 1.6 | Descriptions and links |
| eyebrow | .8125rem | 1.2 | Labels and navigation |

Headings: uppercase, −.01em tracking, 400 display weight. Names and principle titles: Onest 600, −.01em. Labels: Onest 500, .18em–.22em, uppercase. Stats labels .14em. Quotes Onest 500, 1.3 line-height. Numeric counter and indices use tabular numerals. Do not synthesize a bold Anton weight.

Headings split into actual rendered lines after `document.fonts.ready`; resize recomputes the lines after 150ms. Word/line wrappers preserve full accessible text, so assistive technology does not read isolated letters.

## Aarya Tall — custom lettering prototype

- File: `public/fonts/aarya-tall.ttf` (local TrueType, 45 glyphs including .notdef).
- Source: `tools/build-font.py`; regenerate with `python3 tools/build-font.py`.
- Specimen: `/type-specimen.html`.
- License: `public/fonts/FONT-LICENSE.txt` (MIT).
- Original geometric outlines, created for this project. No Anton/Onest outlines were copied or renamed.
- 1000 units/em; 900-unit cap construction; 132-unit strokes; usual 480-unit advance. Narrow I and wider M/W. Angular bowls and deep, open counters.
- A–Z, 0–9, space, `- . / + & ' !`. Lowercase codepoints map to the uppercase outlines.
- One weight only. No kerning, hinting, accents, currency, or multilingual coverage yet. This is a wordmark/display prototype, not a finished body font or a polished replacement for Anton.

Keep Anton active for the reference fidelity pass. Review the AARYA / AVINASH specimen with the actual replacement portrait before choosing it for the hero. To apply later, change `--font-display` in the shared tokens after the decision is recorded. Retain Onest for body copy. Do not claim the specimen has been visually reviewed in a browser; only the binary and font metadata have been checked here.
