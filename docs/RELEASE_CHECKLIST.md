# Senthan Portfolio — release quality checklist

## Scope

The review branch is `portfolio/final-audit-2026-11-12` in `Senthan-X/Senthan-portfolio`. Production uses [senthan.work](https://senthan.work/).

## Automated validation

From the repository root, run `node --test tests/portfolio.test.cjs` and `node scripts/audit-portfolio.mjs`.

The Portfolio integrity and Portfolio quality checks workflows run both suites on pull requests to `main`. The suites cover translation keys, catalog counts, embedded WebP headers, inline JavaScript syntax, keyboard targets, external link markup and metadata.

## Browser and link audit on 12 November 2026

- [x] Ran Chromium checks across 320, 390, 768, 801, 1024 and 1440 pixel widths. Exercised all eight languages, including Arabic RTL, at each width.
- [x] Verified that all ten sector filters show the matching collection and that All restores the full catalog.
- [x] Decoded all 20 desktop and mobile preview images. Tested preview navigation, arrow keys in both directions, Escape, focus return and the capture controls on a short phone viewport.
- [x] Tested mobile navigation, outside-tap dismissal, skip-link focus and Back-to-Top focus. Checked the mobile menu and collection links with JavaScript disabled.
- [x] Tested system theme changes, manual preferences, blocked storage and reduced motion.
- [x] Ran axe on the English light homepage and the Arabic dark preview. Both scans passed.
- [x] Fetched the ten collection gateways and all 93 current demo URLs. Each returned HTTP 200 and HTML.

## Production checks

- [x] The apex homepage returned HTTP 200 over HTTPS. Its HTML matched `main` at `5701fee` before this release. The HTTP URL redirected to HTTPS.
- [x] The canonical domain served `robots.txt`, `sitemap.xml` and the social preview WebP. A missing route returned HTTP 404.
- [ ] After merging, compare the live HTML with the reviewed commit and smoke-test the homepage and collection preview.

The `www.senthan.work` hostname returned NXDOMAIN during the audit. The initial browser review used the branch source served locally. The Workers Builds check on the pull request records the hosted preview result.
