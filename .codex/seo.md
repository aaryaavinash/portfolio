# SEO pass — 2026-10-29

Scope: the single-page portfolio at `https://aarya.cyou/`. Applied the
on-page, technical, schema, and sitemap checks from
[AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
(`seo-page`, `seo-technical`, `seo-schema`, and `seo-sitemap`).

## Findings and changes

| Finding | Change |
| --- | --- |
| `/robots.txt` and `/sitemap.xml` returned the SPA homepage instead of crawl files | Added real files in `public/`; sitemap lists the canonical homepage only |
| No structured data | Added factual WebSite and Person JSON-LD with confirmed profile URLs |
| Title and description were broad | Named Zyrix Dev and selected work while keeping one descriptive title and a 154-character description |
| The public font specimen could be indexed as a separate page | Added `noindex` to that specimen |
| Canonical and social image URL | Already use `https://aarya.cyou/` and an absolute share-image URL |

The homepage has one H1 and server-rendered copy for the main sections.
No review, rating, FAQ, or invented business claims are marked up.

## Verification

Build output must contain `robots.txt` and `sitemap.xml` as files;
validate the XML and JSON-LD; confirm live URLs return their intended content
types after the Pages deployment. Search ranking and indexing require
Search Console data and time; this pass does not claim either.
