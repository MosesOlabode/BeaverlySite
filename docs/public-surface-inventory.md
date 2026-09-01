# Beaverly public surface inventory

Updated: 2026-09-01

This file is an implementation inventory, not product-direction authority. The Chilla 3.0 master plan continues to define which BeaverlySite pages are directional source-of-truth pages.

## V3 directional marketing surfaces

These are already rebuilt and should remain visually/product-language coherent:

- `/` — Homepage
- `/chilla.html` — Chilla
- `/m-ii.html` — M-II
- `/company.html` — Company
- `/security.html` — Security
- `/pricing.html` — Pricing
- `/supported-accounts.html` — Compatibility

## V3 policy/legal surfaces

Rebuilt on 2026-09-01 against current product architecture and the existing legal posture:

- `/terms.html`
- `/privacy.html`
- `/refund.html`
- `/risk-disclosure.html`
- `/usage-and-guardrails.html`

These pages are legal/policy surfaces. They do not become product-direction authority merely because their wording is current.

## V3 editorial surfaces

Rebuilt on 2026-09-01. Existing URLs were preserved rather than creating new SEO routes:

- `/blog/`
- `/blog/how-chilla-works/`
- `/blog/is-ai-trading-safe/`
- `/blog/why-i-built-beaverly/`
- `/blog/the-plug-and-chill-life/`

The old blog presentation, AI-co-pilot framing, fake/unsupported testimonial-style material, connection-first onboarding narrative, and generic trading-bot language were removed from these public articles.

## Support surfaces — dedicated truth pass still required

Current support estate includes the main hub and articles covering:

- getting started
- Chilla basics
- Flow
- Work Capacity
- styles and markets
- tasks and comfort
- connected accounts
- deposits / withdrawals
- tiers, billing and usage
- troubleshooting
- account/security
- enterprise
- contact/escalation

Known legacy redirect aliases such as `support/environments.html` and `support/behaviors-playgrounds.html` should remain redirects/canonical aliases until an SEO pass verifies whether they still receive external traffic.

Support currently still depends on the older shared stylesheet/header system. Do not delete legacy shared CSS or header/footer infrastructure until the support migration proves those files have no remaining public consumers.

## Miscellaneous public surface still pending

- `/404.html` — visibly pre-V3 and should be rebuilt in the V3 shell.
- `/sitemap.xml` — requires refreshed `lastmod` values, Company inclusion, and a final route audit.
- `/robots.txt` — currently simple and valid in shape; verify alongside sitemap/SEO pass.
- `.well-known/` — preserve and inspect only as part of a targeted platform/verification audit.

## Legacy asset/style candidates

The repository still contains pre-V3 CSS such as `style.css`, `navbar.css`, `blog.css`, `cards.css`, older page-specific styles, and older image assets. Some may now be orphaned, while others are still used by Support.

Do not mass-delete them. After Support is rebuilt, run a reference-based dead-asset/dead-CSS sweep and remove only files with no live consumer or required redirect/history role.

## Remaining site sequence

1. Support truth and visual migration.
2. Technical SEO: sitemap, canonicals, metadata, structured data, internal links, stale route checks.
3. 404 and miscellaneous public surfaces.
4. Reference-based legacy CSS/asset cleanup after Support no longer depends on them.
5. Final responsive, light/dark, reduced-motion, interaction, analytics, and broken-link QA.
