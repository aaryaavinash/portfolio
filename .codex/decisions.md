# Decisions

- **2026-10-28 — Stack change:** Latest user request authorizes Vite + strict TypeScript + Tailwind. It supersedes the prior single-HTML/no-npm constraint while preserving the detailed design requirements.
- **2026-10-28 — Static HTML + TypeScript:** No frontend framework is needed for one page, one menu, and three selectable testimonials. Keep the authored content directly readable and editable.
- **2026-10-28 — Identity deferred:** Preserve supplied Marcus Vane copy/images now. Do not claim the fictional company exits or endorsements belong to Aarya.
- **2026-10-28 — Fonts:** Keep Anton/Onest active to preserve reference fidelity. Create original Aarya Tall lettering separately, with source, specimen, and honest limitations, for the next identity review.
- **2026-10-28 — Motion:** CSS for deterministic reveals; a small physical spring for liquid attributes; Lenis for scrolling. No GSAP or React Spring dependency.
- **2026-10-28 — Narrow screen protections:** Documented size/layout exceptions avoid large-type overflow introduced by the reference's breakpoint-root jumps. Revisit after actual browser review.
- **2026-10-28 — Code preservation:** Complete initial HTML retained in a disabled-comment archive; migration does not discard its source.
- **2026-10-28 — Validation limits:** Typecheck/build and font-binary checks can run locally. Browser verification cannot run without an enabled browser. Dependency installation used local copies after restricted network/cache failures; clean online installation remains unverified.

- **2026-10-28 — Name personalization:** User authorized Marcus Vane → Aarya Avinash. Updated title/description, loader, nav (AA), hero text/data attributes and accessible label, testimonial first name, signature, and copyright. Original markup is preserved in archive/before-name-change.html.txt. Media URLs, reference company names, contact email, and other fictional reference content remain pending user-provided replacements.

- **2026-10-28 — GSAP/ScrollTrigger:** Explicit user request supersedes the no-GSAP direction. Keep Lenis, integrate its RAF into the GSAP ticker, and use ScrollTrigger for one-shot reveals.
- **2026-10-28 — Responsive priority:** User requested improved display across screen sizes. Replace breakpoint-root font jumps with continuous CSS sizing, measured name fitting, tablet-aware navigation and stacked featured content where necessary.
- **2026-10-28 — Component pending:** User clarified that an additional component will be pasted separately. Retain existing LiquidImage, but do not invent the missing component or claim it is integrated.

- **2026-10-28 — Supplied React Bits components:** User supplied AnimatedContent and Counter and requested integration. Mount them only in Impact to preserve the existing static page and avoid loading React on the hero path. Keep static figures as the no-JS/chunk-failure fallback and preserve the supplied source in comments.
