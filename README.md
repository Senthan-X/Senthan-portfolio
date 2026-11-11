# Senthan & Co — Portfolio & Collections

An independent full-stack development portfolio and collection directory. The November 2026 production pass preserves ten published collection gateways and 93 current templates with authentic desktop/mobile captures.

[Open the portfolio](https://senthan.work/)

| Collection | Current templates | Gateway |
|---|---:|---|
| Boutique & Fashion | 12 | [Open collection](https://senthan-x.github.io/boutique-and-fashion-templates/) |
| Real Estate | 11 | [Open collection](https://senthan-x.github.io/real-estate-templates/) |
| Afya Atlas — Medical & Wellness | 11 | [Open collection](https://senthan-x.github.io/medicare-and-wellness/) |
| Fitness & Performance | 11 | [Open collection](https://senthan-x.github.io/senthan-fitness-templates/) |
| Restaurant & Dining | 12 | [Open collection](https://senthan-x.github.io/senthan-dining-templates/) |
| Construction & Property | 12 | [Open collection](https://senthan-x.github.io/construction-and-contraction/) |
| Barbershop & Hair | 7 | [Open collection](https://senthan-x.github.io/barbershop-templates/) |
| Auto Repair & Detailing | 8 | [Open collection](https://senthan-x.github.io/auto-repair-and-detailing/) |
| Café | 5 | [Open collection](https://senthan-x.github.io/Cafe/) |
| Law Firm | 4 | [Open collection](https://senthan-x.github.io/senthan-law-templates/) |
| **Total** | **93** | **10 gateways** |

Counts include the current releases listed by each gateway. Healthcare archives, two legacy hair themes, and superseded dining files are excluded. The main portfolio links collection gateways; individual demos are organized inside their collections.

## Page workflow

- One self-contained index.html, with inline CSS/JavaScript and Base64 WebP imagery. No fonts, scripts, styles or in-page media load from external services.
- EN, ES, FR, DE, PT, AR, ZH and SW. All visible page copy, collection summaries, controls, accessible labels, counters and dates follow the selected language. Arabic uses RTL.
- The language picker shows each language by its own name. Language detection uses `navigator.language` until a visitor chooses a language. The theme follows `prefers-color-scheme` until a visitor chooses light or dark. Both controls work when storage is unavailable.
- Every collection is shown initially. Filters narrow the grid without a Load More gate.
- Collection screenshots are captured from the current gateways and optimized as WebP. The closer-look dialog keeps the desktop and mobile controls in its header and supports keyboard dismissal, focus return and collection navigation.
- The mobile menu, skip link and Back-to-Top Button manage keyboard focus. Scroll reveals respect reduced-motion preferences.
- With JavaScript disabled, the navigation, collection links and English portfolio remain usable.
- The main portfolio retains its previously approved Kampala location and WhatsApp contact. No email address appears on this page.
- The only geographic origin mark in the main portfolio footer is a subtle `UG`; individual commercial templates remain origin-neutral.

Studio imagery supports the portfolio setting; collection previews are authentic screenshots, not generated website mockups. Screenshots show the captured English interface; use each collection's controls for its live language and theme variants.

## Roadmap

Events & Weddings, Photography Studios, Veterinary & Pet Care, and Spa & Wellness remain planned. Construction and Automotive are published collections.

## Deployment

Production serves **https://senthan.work/**. The [GitHub Pages fallback](https://senthan-x.github.io/Senthan-portfolio/) is also available. Serve the repository root on a static host or open `index.html` offline. The `/assets/` directory includes the image used in social previews.

For **Cloudflare Pages**, connect `Senthan-X/Senthan-portfolio`, choose `main`, use a static deployment with no build command and the repository root as output, and attach `senthan.work` as the custom domain. Confirm DNS, TLS, redirect behaviour, and the deployed commit in Cloudflare; those external settings are not changed by this repository update. If using **GitHub Pages** as the actual host instead, configure its custom domain and Cloudflare DNS together; do not set up two conflicting origins for the same hostname.

`robots.txt` and `sitemap.xml` are prepared for the root domain. The HTML uses domain-consistent canonical, Open Graph, image and structured-data URLs. The website's actual custom-domain availability requires an independent live check.

Run `node --test tests/portfolio.test.cjs` and `node scripts/audit-portfolio.mjs` to check the catalog, translations, accessibility markup, deployment files and inline scripts. GitHub Actions runs both checks on pull requests targeting `main`. See the [release checklist](docs/RELEASE_CHECKLIST.md) for the browser and live link results.

Built by **Senthan & Co**.
