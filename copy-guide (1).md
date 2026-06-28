# Chilla Copy Style Guide V2.1
**Plain-language product hierarchy, user-facing copy rules, and engineering naming contract**

---

## The product in plain language

### Beaverly

**Beaverly builds technology that lets normal people trade the financial markets without becoming traders.**

Trade forex, indices, metals, and synthetic markets without turning charts, analysis, entries, and exits into another full-time job.

Connect your trading account. Choose your style and boundaries Chilla must stay within. It runs and reports back in simple English.

**You Chill. Chilla Works.**

### Chilla

**Chilla lets you trade forex, indices, metals, and synthetic markets without becoming a trader.**

Connect your trading account. Choose your style and boundaries. Chilla runs your task within those boundaries and reports back in simple English through Flow.

Your funds stay in your own trading account. You can review, edit, pause, or stop your task anytime.

### M-II

**M-II is the AI brain behind Chilla.**

It turns your Chilla choices into a task it can run, checks the boundaries you set before anything happens, keeps your connected account secure, and tracks what happens along the way.

It is what lets Chilla run multiple styles and tasks reliably, keep them separate, and explain activity clearly through Flow.

M-II does not choose for you. It makes sure Chilla follows what you chose.

---

## Core rule

Start with what a normal person gets to do. Explain the machinery only after they understand the product.

Do not lead public or user-facing copy with internal descriptions such as:

- instruction-driven automation infrastructure
- automation infrastructure
- orchestration
- operating system
- infrastructure layer
- instruction lifecycle
- account-scoped operation
- validation pipeline
- machine instructions

Those phrases may be accurate internally. They are not the product explanation.

---

## Exact product language

Use these as the source of truth for public product copy, onboarding, landing pages, metadata, and short explanations.

### Beaverly

- Beaverly builds technology that lets normal people trade the financial markets without becoming traders.
- Trade forex, indices, metals, and synthetic markets without turning charts, analysis, entries, and exits into another full-time job.
- Connect your trading account. Choose your style and boundaries Chilla must stay within. It runs and reports back in simple English.

### Chilla

- Chilla lets you trade forex, indices, metals, and synthetic markets without becoming a trader.
- Connect your trading account. Choose your style and boundaries.
- Chilla runs your task within those boundaries and reports back in simple English through Flow.
- Your funds stay in your own trading account.
- You can review, edit, pause, or stop your task anytime.

### M-II

- M-II is the AI brain behind Chilla.
- M-II does not choose for you. It makes sure Chilla follows what you chose.
- M-II lets Chilla run multiple styles and tasks reliably, keep them separate, and explain activity clearly through Flow.

---

## Non-negotiable wording rules

### 1. Chilla **lets**. It does not merely “help.”

Use:

- Chilla lets you trade markets without becoming a trader.
- Chilla lets you run a task within the boundaries you set.

Do not weaken the product into:

- Chilla helps you trade.
- Chilla helps you participate.
- Chilla assists with trading.

### 2. Users choose their **style and boundaries**.

Use:

- Choose your style and boundaries.
- See available ways Chilla can run and pick one.
- Set the boundaries Chilla must stay within.

Do not say:

- Choose how you want Chilla to run.
- Tell Chilla how to trade.
- Design how Chilla should act.

The app presents available styles. The user is not expected to invent a trading method or know trading mechanics.

### 3. Market selection must not feel like a test.

Users can choose freely from compatible markets. Do not write copy that makes them feel they are expected to know the “right” market.

Use:

- All these markets match your style but choice is yours.
- These markets match your chosen style. The choice is yours.

Avoid:

- Pick the right market.
- Choose the best market.
- Select the market Chilla should trade.
- Which market do you want to trade?

### 4. Keep the person in control without making the setup feel burdensome.

Use:

- Your funds stay in your own trading account.
- You can review, edit, pause, or stop your task anytime.
- Chilla runs your task within the boundaries you chose.

Avoid legalistic or mechanical first-pass language such as:

- account-scoped operation
- explicit instruction scope
- lifecycle management
- pre-action validation gate
- concurrent task orchestration

---

## Terms users should see

| Avoid in user-facing copy | Use instead |
|---|---|
| Strategy | Style / your chosen style |
| Risk / risk setting | Comfort / comfort level |
| Broker | Trading account provider; use provider only where clear |
| Connected account provider | Never use |
| Automation environment | Trading account or connected account, depending on context |
| Symbol / playground | Market |
| Execute / execution | Run, automate, or activity, depending on context |
| Trade / position | Activity where the product UI already uses activity; use trade only where legal clarity requires it |
| Stop-loss | Safety boundary |
| Decision report | Flow |
| Mandate | Task |
| Instruction | Task in user-facing product copy; instruction may remain in legal, consent, API, and internal contexts |
| Past performance | Activity history |

Use **trading account** before connection. Use **connected account** after the account has been connected to Chilla or when referring to the account a task uses.

---

## Engineering naming contract — do not refactor code from copy wording

This guide has two separate jobs:

1. Make user-facing copy clear and plain.
2. Preserve stable internal names so engineering, data, APIs, logs, and architecture do not drift.

**User-facing wording is a translation layer. It is not a rename instruction for code.**

Do not rename existing functions, classes, routes, schemas, tables, fields, event names, analytics keys, Redis keys, log fields, or architecture concepts merely because the UI now uses a friendlier term.

When adding new engineering code, first inspect the local module and architecture documentation. Reuse the established technical name for that concept. Do not invent a friendlier UI name as a new internal identifier.

### Product language vs engineering language

| User-facing copy | Product/domain progression | Preserve in engineering and code |
|---|---|---|
| Style | strategy → behavior → user-facing style | Keep established `strategy` and `behavior` identifiers where they already exist. Do not mass-rename code to `style`. |
| Task | strategy/behavior choice becomes a user task | Keep canonical mandate and instruction naming in runtime/domain code: `mandate_*`, mandate services, mandate records, and instruction fields where already established. Do not create generic product-domain `task_*` names. |
| Trading account / connected account | broker → environment → provider, depending on the layer | Keep established `broker`, `environment`, and `provider` identifiers in code according to their existing meaning. Do not replace them globally with `trading_account_provider`. |
| Market | symbol / playground becomes user-facing market | Keep `symbol`, `playground`, and market identifiers where each existing module uses them. Do not rename a symbol field to `market` without an architecture-backed migration. |
| Comfort | user-facing translation of risk controls | Keep existing risk/risk-limit/risk-sizing identifiers in code, schemas, and calculations unless a separate engineering change explicitly migrates them. |
| Activity | user-facing translation of trade/position/execution concepts | Keep trade, position, execution, and reconciliation identifiers in their established technical contexts. |
| Safety boundary | user-facing translation of stop-loss/protective exit concepts | Keep established technical stop-loss, SL, protective, or exit identifiers where they already exist. |
| Flow | user-facing reporting experience | Keep existing event, execution-trail, and Flow data identifiers unless an architecture change explicitly says otherwise. |

### `task` is reserved language in engineering contexts

In UI copy, **task** means what a user has set Chilla to run.

In Python and async code, `task` also commonly means an `asyncio.Task` or background task. That ambiguity is dangerous.

Therefore:

- Do **not** rename mandate functions, services, models, routes, or fields to generic names such as `task_edit`, `task_service`, `task_state`, or `create_task` for the Chilla product domain.
- Do **not** use `task` as a substitute for `mandate` in new runtime code, unless the code is genuinely handling an asyncio/background task and the meaning is unambiguous.
- Keep `mandate` for the canonical user-configured runtime object in code.
- Keep `instruction` where the existing legal, consent, versioning, API, audit, or domain model uses it.
- Keep `behavior` or `strategy` where existing analysis, selection, decision, or configuration code already uses those names.

Examples:

```python
# Good: preserves the established product-domain name.
async def update_mandate(...):
    ...

# Good: this is genuinely an asyncio task.
background_task = asyncio.create_task(...)

# Bad: UI wording leaking into the product-domain API.
async def task_edit(...):
    ...
```

### No blind copy-driven renames

Never perform a search-and-replace that changes technical identifiers because a copy guide changed a display term.

A proposed internal rename requires its own engineering issue, architecture review, migration plan, compatibility analysis, and tests. A content, SEO, UI-copy, or documentation task does not authorize it.

---

## Product framing

### What Chilla is

- A product that lets normal people trade markets without becoming traders.
- A way to connect a trading account, choose a style and boundaries, and let Chilla run a task within them.
- A transparent experience where Flow reports what happened in simple English.

### What Chilla is not

- A broker or custodian.
- A financial adviser or recommendation engine.
- A product that chooses styles, markets, or boundaries for users.
- A promise of returns or a guaranteed-outcome product.

### What M-II is

- The AI brain behind Chilla.
- The system that makes sure Chilla follows the user’s choices reliably.

Do not introduce M-II to ordinary users as “infrastructure.” Use technical implementation language only where the audience specifically needs it, such as engineering or architecture documentation.

---

## Tone

Write like a clear, capable person explaining a useful product to someone with a normal life.

- Calm and confident.
- Simple without talking down.
- Short sentences where possible.
- Concrete language over abstract nouns.
- Human wording over machine wording.

Do not use big grammar just because an allowed term exists. Use the clearest natural sentence.

Good:

- Chilla ran your task within the boundaries you set.
- Your style matched this market, so it was available to add.
- Flow shows what Chilla did and why.

Bad:

- The system operationalised your instruction lifecycle.
- Your account-scoped automation configuration was validated.
- M-II orchestrated concurrent instruction execution.

---

## Compliance guardrails

Never:

- imply guaranteed returns, profit, safety, or risk-free trading
- imply that Beaverly recommends a style, market, or allocation
- imply that Chilla holds deposits or user funds
- say AI picks for the user
- say a style is best, optimal, high-probability, proven, or guaranteed

Avoid:

- Best performing
- Maximise profits
- Guaranteed
- Risk-free
- AI picks for you
- We recommend
- Optimal
- Alpha
- Edge
- Outperform
- Proven

Use language such as:

- your chosen style
- your boundaries
- your connected account
- within your comfort level
- Flow shows what happened
- you can edit, pause, or stop anytime

---

## Final copy and engineering check

Before shipping user-facing copy, ask:

1. Does the first sentence say what a normal person gets to do?
2. Does it say Chilla **lets** people trade without becoming traders where relevant, rather than merely saying it helps?
3. Does it say **style and boundaries**, not ask people to invent how Chilla should run?
4. Does market copy make clear that available markets match the chosen style and the choice remains theirs?
5. Does the wording avoid machinery, architecture, infrastructure, orchestration, and internal system language?
6. Does it avoid advice, recommendation, custody, and outcome promises?
7. Could a normal person understand it without knowing trading jargon?
8. Did this change preserve all existing technical identifiers and avoid introducing UI wording into domain code?

If not, rewrite it before shipping.