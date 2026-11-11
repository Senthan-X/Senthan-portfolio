# Senthan Portfolio — release quality checklist

## Scope

Source: Senthan-X/Senthan-portfolio
Review branch: portfolio/final-audit-2026-11-12
Target production domain: https://senthan.work/
Do not merge or claim production readiness until required live checks are complete.

## Automated validation

From the repository root, run: node scripts/audit-portfolio.mjs

The workflow in .github/workflows/portfolio-quality.yml runs the same tests on portfolio-branch pushes and pull requests to main. The tests cover eight translation dictionaries, markup translation keys, sector translations, collection counts and links, embedded WebP headers, inline JavaScript syntax, hash targets, external-link security, metadata and SEO support files.

These are static tests: they do not verify GitHub Pages / Cloudflare DNS, remote collection routes, responsive rendering or live checkout.

## Browser acceptance (desktop and mobile)

- [ ] Homepage loads at the production domain over HTTPS, without redirect loops or certificate errors.
- [ ] Exactly ten collection cards render and every card opens the matching collection gateway.
- [ ] Each gateway loads and links to working individual demos; spot-check desktop and mobile viewports.
- [ ] Hero full-background image, contrast, focal crop, practice imagery, screenshots and footer display correctly.
- [ ] Every filter updates cards and the result count; choosing All restores ten.
- [ ] Preview dialog opens from every card, cycles previous/next, switches desktop/mobile, closes with Escape and restores focus.
- [ ] ArrowLeft / ArrowRight navigate the preview, including mirrored direction for Arabic RTL.
- [ ] Mobile menu stays beneath the header and closes after a link or outside tap.
- [ ] Check EN, ES, FR, DE, PT, AR, ZH and SW in all visible sections, controls, counters, cards and alternative text.
- [ ] Arabic is RTL; all languages remain readable at 320px, 390px, 768px and desktop widths.
- [ ] Light/dark follows OS preference until manually overridden; manual choice survives reload.
- [ ] Keyboard navigation, focus indicators, skip link, Back-to-Top Button and reduced-motion behavior work.
- [ ] Browser console is free from uncaught errors; network has no failed critical assets.
- [ ] Run Lighthouse and check image loading, layout stability and social metadata.

## Cloudflare / domain readiness

- [ ] Identify current hosting architecture (Cloudflare Pages/Workers or GitHub Pages behind Cloudflare) before changing DNS or adding CNAME.
- [ ] Verify DNS, SSL mode, production branch, build output and deployment success.
- [ ] Confirm /robots.txt, /sitemap.xml and /assets/tech-studio-hero-v4.webp return HTTP 200 on the production domain.
- [ ] Confirm preferred hostname, HTTPS redirects and cached HTML invalidation.
- [ ] Keep checkout, purchase and seller routes inactive until the marketplace and payment integration are ready and tested.
- [ ] Obtain green automated CI plus manual sign-off before merging; smoke-test the production domain after deployment.

## Scope and limitation of this audit (2026-11-12)

All ten referenced GitHub source repositories were confirmed to exist and be public.
The live externally hosted pages and senthan.work could not be fetched through the available web inspection endpoint. Live browser testing, DNS checks and Cloudflare configuration verification remain outstanding. No claim is made that the production domain is currently functional.
