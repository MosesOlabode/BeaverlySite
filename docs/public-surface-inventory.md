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

## Technical SEO — completed 2026-09-01

The current non-Support V3 estate now uses the deployed `www.beaverlyai.com` host consistently for canonical/OG/schema URLs. The sitemap includes Company, refreshed V3/legal/editorial modification dates, and preserves older Support dates until that dedicated pass is complete.

`robots.txt` remains intentionally simple and points to the canonical sitemap.

## Miscellaneous public surfaces — completed 2026-09-01

- `/404.html` — rebuilt in the V3 shell, marked `noindex,follow`, and linked back to Home and Chilla without a third-party icon dependency.
- `/.well-known/security.txt` — retained and completed with Contact, Expires, Preferred-Languages, Canonical, and Policy fields.
- `/sitemap.xml`, `/robots.txt`, and `CNAME` — verified as part of the SEO/miscellaneous pass.

No additional non-Support HTML redirect aliases were found in the current public estate. The known HTML refresh aliases are confined to Support and remain untouched until the Support pass.

## Final non-Support QA — completed 2026-09-01

A code-level responsive and interaction audit was completed across the V3 marketing, editorial, policy/legal, pricing, compatibility, and miscellaneous surfaces. Support was intentionally excluded.

- Shared V3 touch behavior now suppresses browser-default tap highlighting across links, buttons, form controls, summaries, and button-like controls. Taps use the site's own subdued active response instead of a blue browser flash.
- Visited links inherit the surrounding V3 color instead of falling back to browser-default visited colors.
- Keyboard focus uses a visible monochrome V3 focus ring; the legal index no longer suppresses that focus indicator.
- Desktop hover treatments are constrained to hover-capable fine pointers so touch devices do not retain sticky hover states.
- Reduced-motion behavior was checked across the homepage, Chilla conversation demo, M-II, Notes, legal/policy, and miscellaneous shells. The shared V3 rule now also prevents infinite animations from rapidly repeating when reduced motion is requested.
- Mobile and tablet breakpoints were reviewed for the shared header/footer, homepage, Chilla, M-II, Notes, legal/policy, Pricing, Compatibility, and 404 layouts. The homepage action row now wraps safely on narrow widths.
- The shared mobile navigation now synchronizes its visual state with `aria-expanded`, `aria-hidden`, `aria-controls`, and an Open/Close accessible label.
- Pricing billing-period controls now expose `aria-pressed`; tier CTA analytics were restored with tier terminology, and billing-period changes are tracked separately.
- Shared CTA, scroll-depth, and 30-second engagement analytics remain delegated/active after the V3 shell is injected.
- Non-Support internal destinations referenced by the V3 header/footer and current V3 pages were checked against the repository. Support links remain present but their content is outside this pass.
- No stale `--v3-*` design-token references remain in the current repository search; V3 pages use the shared light/dark token system.

This was a source-level/code-level QA pass. A future real-device/browser visual check can still catch rendering differences that static repository inspection cannot.

## Legacy asset/style candidates

The repository still contains pre-V3 CSS such as `style.css`, `navbar.css`, `blog.css`, `cards.css`, older page-specific styles, and older image assets. Some may now be orphaned, while others are still used by Support.

Do not mass-delete them. After Support is rebuilt, run a reference-based dead-asset/dead-CSS sweep and remove only files with no live consumer or required redirect/history role.

## Remaining site sequence

1. Support truth and visual migration.
2. Reference-based legacy CSS/asset cleanup after Support no longer depends on them.
3. One post-Support whole-site browser/device sweep to catch rendering or link regressions introduced by the Support migration.