# Implementation Plan: AEGIS for Teams Page

## Overview

Create `src/aegis-for-teams.html`, a standalone role-based page presenting AEGIS content for DevOps Engineers, Site Reliability Engineers, and Platform Engineers via a client-side tab switcher. Modify `src/index.html` and `src/aegis-sales-page.html` to link to the new page. No build tools, no new assets, no external JS frameworks.

## Tasks

- [x] 1. Create `aegis-for-teams.html` shell with shared design system
  - [x] 1.1 Create the file `src/aegis-for-teams.html` with `<head>` block: charset, viewport, title, meta description, canonical link, CSP and security meta tags, Google Fonts (Inter + JetBrains Mono) — per design.md section 3.1
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.7_
  - [x] 1.2 Copy the complete `:root` token block and all component CSS classes verbatim from `src/aegis-sales-page.html` into the new file's `<style>` block — per design.md sections 2.1 and 2.2
    - Copy every class listed in section 2.2 (reset, `.top-nav`, `.page-section`, `.hero-section`, `.card`, `.badge`, `.flow`, `.table-wrap`, `.site-footer`, responsive `@media` blocks, and all others listed)
    - _Requirements: 1.4, 11.1, 11.2, 11.3, 11.4_
  - [x] 1.3 Append all new CSS classes after the copied block: `.role-tabs`, `.role-tab`, `.role-tab.active`, `.role-tab:focus-visible`, `.role-tab-desc`, `.role-panel`, `.role-panel.active`, `.role-panel.visible`, `.cta-strip`, `.btn-cta-primary`, `.btn-cta-secondary`, `.step-list`, `.step-list-item`, `.step-list-connector`, `.step-list-num`, `.col-before`, `.col-after`, and the `@media(max-width:600px)` mobile overrides — per design.md section 2.3
    - _Requirements: 1.4, 3.5, 3.6, 11.5, 11.6_
  - [x] 1.4 Add `<body>` skeleton with scroll-progress div, top nav bar (logo + nav links), footer (both logos, tagline, company name), and back-to-top button — per design.md sections 3.2, 3.3, and 5
    - Nav links: Home, DevOps, SRE, Platform, Brahmora Home, AEGIS Overview
    - Footer: copy verbatim from `aegis-sales-page.html`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.1, 8.2, 8.3, 8.4_
  - [x] 1.5 Add the JavaScript for scroll progress bar, `scrolled` class on nav, back-to-top visibility and click behaviour, and IntersectionObserver fade-in for `.page-section` elements — per design.md section 6 (all shared logic, excluding tab switcher)
    - _Requirements: 2.4, 2.5, 8.4_

- [x] 2. Add hero section and role tab switcher
  - [x] 2.1 Add the hero section HTML (`id="hero"`) inside `<body>`, before the role panels: AEGIS logo with float animation, `<h1>AEGIS for Teams</h1>`, subheadline, descriptor paragraph, `<div role="tablist">` with 3 tab buttons (`id="tab-devops"`, `id="tab-sre"`, `id="tab-platform"`), and `<p id="roleTabDesc">` — per design.md section 3.4
    - Each button must have `role="tab"`, `data-tab`, `aria-selected`, `aria-controls`, minimum 44px height
    - Follow `<div class="section-gradient-divider"></div>` immediately after the hero closing tag
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 11.5, 11.6, 12.1_
  - [x] 2.2 Add the complete tab switcher JavaScript: `TAB_DESCRIPTIONS` map, `activateTab` function (hides all panels, shows target with double-rAF opacity transition, updates `aria-selected`, updates `aria-hidden`, updates URL via `history.replaceState`, updates descriptor text), `initTabs` IIFE (reads `?role` param, defaults to `devops`), keydown handler (ArrowLeft/ArrowRight moves focus, Enter/Space activates), and click handler — per design.md section 6
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 12.2, 12.3, 12.5, 12.6_
  - [x] 2.3 Add three empty role panel wrapper divs after the hero gradient divider: `#panel-devops` (class `role-panel active`, no `aria-hidden`), `#panel-sre` (class `role-panel`, `aria-hidden="true"`), `#panel-platform` (class `role-panel`, `aria-hidden="true"`), each with `role="tabpanel"` and `aria-labelledby` pointing to its tab button — per design.md section 4
    - _Requirements: 12.4, 12.5, 12.6_

- [x] 3. DevOps Engineer tab panel content
  - [x] 3.1 Add Section A (Introduction) inside `#panel-devops`: `<section id="devops-intro">` with h2, h3, `<hr class="section-divider">`, 8-step `.flow` (KNOW → CORRELATE → DECIDE → GOVERN → PLAN → EXECUTE → VERIFY → EVIDENCE), and blockquote — per design.md section 4.1 Section A
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 3.2 Add Section B (Situation Intelligence) inside `#panel-devops` with divider: `<section id="devops-situations">` with h2, h3, `.two-col` layout — left card showing raw counts (47 alerts, 18 K8s events, 12 infra changes, 9 anomalies with red badges), right column with 3 situation cards (Payment API HIGH, EKS capacity MEDIUM, Security exposure MEDIUM) — per design.md section 4.1 Section B
    - _Requirements: 5.4_
  - [x] 3.3 Add Section C (Capabilities Grid) inside `#panel-devops` with divider: `<section id="devops-capabilities">` with `.card-grid.card-grid-2.card-grid-stretch` containing 4 cards: Change Intelligence (brand gradient), Evidence-backed RCA (emerald), Blast Radius + Governance (amber, with AUTO / APPROVAL REQUIRED / BLOCK badges), Outcome Verification (blue) — per design.md section 4.1 Section C
    - _Requirements: 5.5_
  - [x] 3.4 Add Section D (Capability Table) inside `#panel-devops` with divider: `<section id="devops-table">` with `.table-wrap` table, columns "DevOps question" / "AEGIS capability", all 11 rows from design.md — per design.md section 4.1 Section D
    - _Requirements: 5.6_
  - [x] 3.5 Add Section E (CTA Strip) inside `#panel-devops` with divider: `<section id="devops-cta">` with h2, descriptor paragraph, `.cta-strip` containing "Become a Design Partner" (`index.html#partner`, primary) and "Explore AEGIS for DevOps" (`aegis-sales-page.html#next-steps`, secondary) — per design.md section 4.1 Section E
    - _Requirements: 5.7_

- [x] 4. SRE tab panel content
  - [x] 4.1 Add Section A (Introduction) inside `#panel-sre`: `<section id="sre-intro">` with h2, h3, `<hr class="section-divider">`, 9-step `.flow` (Detect → Correlate → Diagnose → Decide → Govern → Execute → Verify → Evidence → Learn) — per design.md section 4.2 Section A
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 4.2 Add Section B (Challenge Table) inside `#panel-sre` with divider: `<section id="sre-table">` with `.table-wrap` table, columns "SRE Challenge" / "How AEGIS Helps", all 13 rows from design.md (note: requirements specify 14; source material contains 13 — implement 13 as written) — per design.md section 4.2 Section B
    - _Requirements: 6.4_
  - [x] 4.3 Add Section C (Closed SRE Operational Loop) inside `#panel-sre` with divider: `<section id="sre-loop">` with h2, h3, `.card-grid.card-grid-2.card-grid-stretch` containing 10 step cards (Detect, Correlate, Diagnose, Decide, Assess Risk, Govern, Execute, Verify, Escalate Failed Recovery, Learn), each with a numbered `.badge.brand` and descriptive paragraph — per design.md section 4.2 Section C
    - _Requirements: 6.5_
  - [x] 4.4 Add Section D (Progressive Autonomy) inside `#panel-sre` with divider: `<section id="sre-autonomy">` with h2, h3, `.card-grid.card-grid-2.card-grid-stretch` with 4 level cards: Level 1 Understand (brand), Level 2 Recommend (blue), Level 3 Governed Human Execution (amber), Level 4 Governed Conditional Autonomy (emerald) — each with a `.badge` labelling the level — per design.md section 4.2 Section D
    - _Requirements: 6.6_
  - [x] 4.5 Add Section E (CTA Strip) inside `#panel-sre` with divider: `<section id="sre-cta">` with h2, descriptor, `.cta-strip` containing "Become a Design Partner" (`index.html#partner`, primary) and "Learn more about AEGIS" (`aegis-sales-page.html`, secondary) — per design.md section 4.2 Section E
    - _Requirements: 6.7_

- [x] 5. Platform Engineer tab panel content
  - [x] 5.1 Add Section A (Introduction) inside `#panel-platform`: `<section id="platform-intro">` with h2, h3, `<hr class="section-divider">`, 6-step `.flow` (KNOW → DECIDE → GOVERN → EXECUTE → VERIFY → LEARN) — per design.md section 4.3 Section A
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 5.2 Add Section B (Platform Capability Cards) inside `#panel-platform` with divider: `<section id="platform-capabilities">` with `.card-grid.card-grid-3.card-grid-stretch` containing 3 cards: Kubernetes Governed Operations (brand), EKS Infrastructure Scaling (blue), Terraform Drift Detection (emerald, including the Terraform declares / Live AWS contains mini-comparison grid and CONFIGURATION DRIFT badge) — per design.md section 4.3 Section B
    - _Requirements: 7.4_
  - [x] 5.3 Add Section C (Security Exposure Remediation Flow) inside `#panel-platform` with divider: `<section id="platform-security">` with h2, h3, and 11-step vertical flow using `.flow-step` and `.flow-arrow-down` elements: Detect Exposure (red) → Understand Affected Resources → Propose Revoke Ingress (brand) → Assess Risk → Calculate Blast Radius → Evaluate Policy → Require Appropriate Approval (amber) → Execute SG Rule Revocation (blue) → Verify → Maintain Rollback Capability → Capture Evidence (emerald) — per design.md section 4.3 Section C
    - _Requirements: 7.5_
  - [x] 5.4 Add Section D (Trusted Boundary) inside `#panel-platform` with divider: `<section id="platform-trusted">` with h2, h3, `.step-list` containing 7 numbered items (Operation Implemented, Technical Safety Validated, Risk Semantics, Blast-Radius Evaluation, Policy & Authority, Rollback Semantics, Verification) connected by `.step-list-connector` arrows, followed by the final highlighted emerald item (Trusted Governed Execution) — per design.md section 4.3 Section D
    - _Requirements: 7.6_
  - [x] 5.5 Add Section E (Outcome Transformation Table) inside `#panel-platform` with divider: `<section id="platform-outcomes">` with h2, h3, `.table-wrap` table, columns "Without AEGIS" / "With AEGIS", all 12 rows from design.md using `.col-before` / `.col-after` column colouring — per design.md section 4.3 Section E
    - _Requirements: 7.7_
  - [x] 5.6 Add Section F (CTA Strip) inside `#panel-platform` with divider: `<section id="platform-cta">` with h2, descriptor, `.cta-strip` containing "Become a Design Partner" (`index.html#partner`, primary) and "Learn more about AEGIS" (`aegis-sales-page.html`, secondary) — per design.md section 4.3 Section F
    - _Requirements: 7.8_

- [x] 6. Wire up links in `index.html` and `aegis-sales-page.html`
  - [x] 6.1 In `src/index.html`, locate the `.nav-menu` block, find `<a href="platform-architecture.html" class="nav-link">Architecture</a>`, and insert `<a href="aegis-for-teams.html" class="nav-link">AEGIS for Teams</a>` immediately after it, before the `.nav-cta` button — per design.md section 7.1
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 6.2 In `src/aegis-sales-page.html`, locate the Platform Engineering audience card in the `#audience` section and wrap the card `<div>` in `<a href="aegis-for-teams.html?role=platform" style="text-decoration:none;color:inherit;display:block;cursor:pointer">` — per design.md section 7.2
    - _Requirements: 10.1, 10.5, 10.6_
  - [x] 6.3 Wrap the DevOps audience card in `<a href="aegis-for-teams.html?role=devops" style="text-decoration:none;color:inherit;display:block;cursor:pointer">` — per design.md section 7.2
    - _Requirements: 10.2, 10.5, 10.6_
  - [x] 6.4 Wrap the Site Reliability Engineering audience card in `<a href="aegis-for-teams.html?role=sre" style="text-decoration:none;color:inherit;display:block;cursor:pointer">` — per design.md section 7.2
    - _Requirements: 10.3, 10.5, 10.6_
  - [x] 6.5 Wrap the Cloud Operations audience card in `<a href="aegis-for-teams.html" style="text-decoration:none;color:inherit;display:block;cursor:pointer">` — per design.md section 7.2
    - _Requirements: 10.4, 10.5, 10.6_

- [x] 7. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.
  - Verify: tab switcher toggles panels correctly; URL updates on tab change; `?role=sre` on load activates SRE tab; keyboard nav works; all 3 lifecycle flows have correct step counts (8/9/6); all tables have correct row counts (11/13/12); sales page cards link to correct role URLs; index.html nav contains "AEGIS for Teams" link.

## Notes

- Tasks 3, 4, and 5 can be executed in parallel — they each add content to a different role panel and do not touch the same DOM regions
- Task 6 is independent of Tasks 3–5 — it can run in parallel with them once Task 2 is complete
- The double `requestAnimationFrame` in `activateTab` is intentional — do not collapse it into a single rAF or the opacity transition will not fire
- All table cell text, flow step labels, and card descriptions must match design.md exactly — do not paraphrase source material
- The SRE challenge table has 13 rows (not 14 as stated in requirements) — implement 13 rows as specified in design.md
- CSS class copy order matters: all existing classes first, then new tab/panel classes appended after

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "4.1", "4.2", "4.3", "4.4", "4.5", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "6.1", "6.2", "6.3", "6.4", "6.5"] }
  ]
}
```
