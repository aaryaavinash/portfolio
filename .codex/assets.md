# Expanded live assets — 2026-10-28

Added `public/images/zyrix.svg` as illustrative project cover art. The personal ticket reuses `public/images/portfolio.svg`. The GitHub activity feed provides data, not imagery. User-provided personal photos and actual project screenshots may replace the illustrative assets later. No Last.fm image is fetched because no Last.fm account exists.

# Live asset map — 2026-10-28

Hero and focus portrait: Aarya's public GitHub profile image at `https://avatars.githubusercontent.com/u/133252493?v=4`. Project covers: local `public/images/esports.svg` and `public/images/portfolio.svg`, both illustrative artwork rather than screenshots. Aarya may supply replacement portraits and project screenshots later. No fictional Marcus media is referenced by the live HTML or TypeScript.

Historical replacement plan follows.

# Assets and later replacement plan

Base bucket: `https://api.getlayers.ai/storage/v1/object/public/public/assets/marcus-vane-6799bd1fb6`

All current src/poster values use full URLs. Keep these reference images until the user supplies replacements.

| Role | Bucket suffix | Source location | Fit and replacement requirements |
|---|---|---|---|
| Hero fallback | /hero/portrait.webp | index.html video poster | Centered standing portrait, bottom anchored; transparent cutout preferred; avoid baked lettering |
| Hero loop | /hero/hero.mp4 | index.html video/source | Muted loop; same framing as poster; face stable in upper center; blend base into near-black |
| Helix Robotics | /ventures/venture-01.webp | index.html first venture | 16:11 crop, robotics/warehouse subject |
| Northwind Energy | /ventures/venture-02.webp | index.html second venture | 16:11 crop, energy/infrastructure |
| Cadence Health | /ventures/venture-03.webp | index.html third venture | 16:11 crop, medicine/health |
| Vane Capital | /ventures/venture-04.webp | index.html fourth venture | 16:11 crop, investing/architecture |
| Elena Cardoso | /voices/voice-01.webp | index.html + src/voices.ts | 4:5 portrait, alt/name/byline update together |
| David Okonkwo | /voices/voice-02.webp | src/voices.ts | 4:5 portrait |
| Priya Nandakumar | /voices/voice-03.webp | src/voices.ts | 4:5 portrait |

## Next-pass instructions

1. Confirm which verified Aarya projects occupy the venture slots; rewrite names, descriptions, category/year/outcome and links as one change.
2. Obtain approved portrait/video; test both poster and playing video against the giant red name. If there is no video, use the approved still rather than manufacturing biography footage.
3. Use consistent crops in the paired venture rows. No baked UI typography in image assets unless it is intentional project content.
4. Replace testimonials only with approved quotations and attribution; otherwise decide a more suitable section with the user.
5. Update descriptive alt text and fallback labels, and test missing images.
6. Review the name split and typography with AARYA / AVINASH; the character count changes widths, so do not merely replace strings and assume the hero still fits.

## Fonts

Anton + Onest are loaded by Google Fonts. Aarya Tall is a local original font prototype in public/fonts with source and license. Its specimen is independent of reference page imagery. External assets were not downloaded or rehosted during this task, and their availability has not been verified in a browser.
