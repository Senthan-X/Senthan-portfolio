# Senthan & Co — Portfolio & Collections

An independent full-stack development portfolio and collection directory. The November 2026 production pass preserves ten published collection gateways and 93 current templates with authentic desktop/mobile captures.

[Open the portfolio](https://senthan-x.github.io/Senthan-portfolio/)

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
- Language detection uses navigator.language, with validated saved preferences. Light/dark defaults follow prefers-color-scheme; storage failures are handled defensively.
- Every collection is shown initially. Filters narrow the grid without a Load More gate.
- Collection screenshots are captured from the actual current source and optimized as WebP. The editorial closer-look dialog offers genuine desktop/mobile views, keyboard dismissal, focus return and collection navigation.
- IntersectionObserver reveals with staggered timing, reduced-motion support, working mobile navigation and a Back-to-Top Button.
- Collection links and readable English content remain available when JavaScript is disabled.
- The main portfolio retains its previously approved Kampala location and WhatsApp contact. No email address appears on this page.
- The only geographic origin mark in the main portfolio footer is a subtle `UG`; individual commercial templates remain origin-neutral.
- A mobile preview shows its collection description, and reduced-motion Back-to-Top uses the standards-based `auto` scroll behavior.

Studio imagery supports the portfolio setting; collection previews are authentic screenshots, not generated website mockups. Screenshots show the captured English interface; use each collection's controls for its live language and theme variants.

## Roadmap

Events & Weddings, Photography Studios, Veterinary & Pet Care, and Spa & Wellness remain planned. Construction and Automotive are published collections.

## Deployment

The canonical target is **https://senthan.work/**. The portfolio remains usable through its [GitHub Pages fallback](https://senthan-x.github.io/Senthan-portfolio/) while the custom-domain host is configured. The single `index.html` can be served from any static host or opened offline; image assets under `/assets/` provide social previews.

For **Cloudflare Pages**, connect `Senthan-X/Senthan-portfolio`, choose `main`, use a static deployment with no build command and the repository root as output, and attach `senthan.work` as the custom domain. Confirm DNS, TLS, redirect behaviour, and the deployed commit in Cloudflare; those external settings are not changed by this repository update. If using **GitHub Pages** as the actual host instead, configure its custom domain and Cloudflare DNS together; do not set up two conflicting origins for the same hostname.

`robots.txt` and `sitemap.xml` are prepared for the root domain. The HTML uses domain-consistent canonical, Open Graph, image and structured-data URLs. The website's actual custom-domain availability requires an independent live check.

Run repository checks with `node --test tests/portfolio.test.cjs`. GitHub Actions also runs these checks on pushes and pull requests.

Built by **Senthan & Co**.
