# Chilla V3 public language contract

Updated: 2026-09-12

This document is the public-language contract for indexable Beaverly-owned surfaces. It exists to keep the website, Support, editorial content, metadata, structured data, and third-party profile copy from drifting across Chilla generations.

It is not product-architecture authority. Product behavior must still be verified against the current Chilla/M-II implementation and governing product docs before publishing claims.

## Canonical core

Primary sentence:

> Chilla works towards your goals in the financial markets and reports back.

Boundary sentence when material:

> Chilla works within the boundaries you approve.

Experience opener:

> I’m Chilla. Tell me what you’re working towards.

Brand line:

> You Chill. Chilla Works.

Category / descriptor:

> Your financial worker.

## Product model

Public copy should describe the experience from the user's point of view:

1. The user tells Chilla what they are working towards.
2. Chilla prepares the work that needs the user's review.
3. The user can inspect or change material choices before live work.
4. The user authorizes the work that should run.
5. Chilla works through supported connected providers/accounts within the boundaries the user approved.
6. Chilla reports back; Flow remains available when the user wants the underlying activity record.
7. Chilla returns to the user when a material decision or sensitive step belongs to them.

Do not turn this sequence into a public blueprint. Marketing and editorial copy should normally compress it to the fewest words needed to explain the user experience.

## Authority and safety language

Preferred:
- goal
- plan
- task
- style
- market
- comfort
- activity / action
- provider
- connected account
- authorization / approve
- boundaries
- Flow
- Work Capacity / capacity
- non-custodial
- works towards
- reports back

Use with technical precision only:
- instruction — acceptable for low-level provider/execution semantics where an actual instruction is being submitted; do not use as Chilla’s product category or user experience model.
- strategy — acceptable only when referring to an external concept or a clearly named technical artifact; prefer `style` for Chilla-facing product language.
- trade — acceptable when discussing a provider’s actual trade/execution record; prefer `activity` or `action` in general Chilla UX language.
- risk — necessary in legal, safety and financial-risk contexts; do not rename legally meaningful concepts merely for tone.

## Retired current-product framing

Do not describe current Chilla as:
- instruction-driven automation
- a personal wealth co-pilot
- an AI co-pilot
- a trading bot
- a signal service
- a copy-trading product
- a system where the primary user journey is connect account → choose behaviors/styles → configure comfort → activate
- a product where users are expected to assemble the workflow manually before Chilla can understand the goal

Historical/editorial context may mention an older product generation if the page makes the historical nature explicit.

## Claims discipline

Do not claim or imply:
- guaranteed returns or profitability;
- loss prevention;
- that AI makes markets predictable;
- that Chilla can silently expand authority beyond the approved scope;
- that funds are held by Beaverly;
- that a model response itself creates financial authorization;
- provider behavior Beaverly does not control;
- unreleased capability as generally available.

Use `non-custodial` accurately: funds remain with the user’s external provider/account; Beaverly provides software automation rather than custody.

## Public disclosure gate

Public authority does not require publishing Beaverly's implementation.

Every public statement about M-II, security, guardrails, computer assistance, execution, agent behavior, recovery or infrastructure must pass this test before publication:

> Is this ordinary capability/outcome information a user needs, or would it help another model, competitor or attacker reconstruct Beaverly's unique orchestration, control flow, trust boundaries, internal steps or attack surface?

If the second answer is plausible, cut the implementation detail and state only the user-facing capability, boundary or outcome.

Safe public material normally includes:
- what Chilla can help with;
- what Chilla will not do;
- what remains under the user's control;
- where user funds remain;
- whether sensitive information is observed or stored;
- broad reliability or usage results that do not expose mechanisms;
- broad incident impact and resolution status;
- ordinary industry concepts that do not reveal Beaverly-specific implementation.

Do not publish merely for credibility:
- internal orchestration or execution sequences;
- unique guardrail logic or authority primitives;
- internal state machines, routing, queues, worker roles or service topology;
- exact failover, retry, reconciliation, fencing, idempotency or recovery mechanics;
- hidden trust expansion/delegation rules;
- precise validation order or internal decision trees;
- internal model/context projections or privileged data boundaries;
- security controls at a level useful for reconnaissance;
- code-level incident root causes, exploit paths or regression mechanics;
- stack details that materially narrow how to reproduce or attack Beaverly.

If a diagram, list or article makes the implementation easier to reproduce than the product itself makes it to understand, it is too detailed for a public surface.

### Incident communication

Public incident communication should normally cover:
- what users experienced;
- the broad affected capability;
- whether it is resolved or mitigated;
- any user action required;
- a high-level lesson where useful.

Do not publish internal invariants, exact failure chains, remediation sequence, test seams or security-sensitive root-cause mechanics simply to prove engineering competence.

## Browser and provider assistance

Public language may say that Chilla can help users through supported provider setup and navigation when that capability is available.

The safe user-facing boundary is:
- Chilla can help navigate supported provider pages and ordinary setup steps;
- sensitive or consequential steps stay with the user;
- passwords, OTP/MFA, identity/KYC information, legal declarations, OAuth approval and money-moving confirmations are user-owned steps;
- when the user takes over a sensitive step, Chilla does not observe the credential-entry activity;
- Chilla does not store plaintext broker passwords;
- provider sessions retained under product policy are protected with encryption at rest and in transit and kept isolated;
- Chilla may help the user reach a deposit, withdrawal, transfer or settings area, but navigation help is not permission to carry out the consequential financial action.

Do not market this as unrestricted `use my computer` capability, arbitrary website automation or autonomous financial administration.

Do not publicly describe the browser/runtime implementation, takeover mechanism, session representation, trust admission, allowed-origin logic, model loop, transport, worker topology or security enforcement mechanics.

Do not use `end-to-end encrypted` for provider sessions unless the implementation and security review explicitly establish end-to-end encryption semantics. `Encrypted at rest and in transit` is the current approved public description.

## AI/search discovery rule

A page may target a question whose wording differs from Beaverly’s category language. Answer the user’s real question first, then explain where Chilla fits. Do not force `financial worker` into every heading or create near-duplicate pages for keyword variants.

Examples:
- `Can AI trade through my existing broker account?`
- `How can I participate in financial markets without trading manually?`
- `What is non-custodial trading automation?`

The answer can introduce Chilla naturally after establishing the category/problem truth.

## Comparisons

Comparison pages must state where the alternative can be a better fit. Chilla does not need to “win” every row.

Examples:
- copy trading may fit someone who explicitly wants to mirror another trader;
- a fixed bot may fit someone who wants deterministic rules they wrote themselves;
- manual trading may fit someone who wants direct discretionary control over every action.

Then explain Chilla’s distinct model: goal-led work, bounded authorization, provider-connected execution, non-custody, and reporting back.

## First-party evidence

First-party evidence should make Beaverly more credible without turning Beaverly into its own reverse-engineering manual.

Good public evidence includes:
- aggregate usage or adoption figures with a defined period and denominator;
- broad reliability or availability figures when the measurement is defensible;
- aggregate counts or rates that demonstrate product behavior without exposing control logic;
- privacy-safe user behavior patterns;
- product demonstrations showing the user experience;
- outcome-level incident summaries;
- original research that cannot be used to infer protected implementation details.

Separate operational reliability evidence, product-usage evidence and market-performance evidence. Never use isolated profitable outcomes as evidence of reliability or product quality.

Do not publish detailed internal event distributions, error taxonomies, recovery mechanics, execution timing breakdowns or architecture traces merely because the data exists. Aggregate metrics must have a defined period, denominator, source of truth and privacy-safe aggregation method, then pass the public disclosure gate above.

## Surface precedence

When public surfaces conflict, fix the conflict rather than choosing whichever wording is newest.

For public copy work, review at minimum:
1. current product architecture / product-direction docs;
2. this public-language contract;
3. canonical marketing pages;
4. Support;
5. editorial pages;
6. metadata/schema/sitemap;
7. third-party profiles.

Legal/policy pages remain governed by legal accuracy and may use terminology that is more formal than marketing copy.
