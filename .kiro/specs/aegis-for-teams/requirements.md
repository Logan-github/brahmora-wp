# Requirements Document

## Introduction

The AEGIS for Teams page (`src/aegis-for-teams.html`) is a new standalone HTML page for the Brahmora Technologies website. It presents AEGIS product content segmented by engineering role — DevOps Engineer, Site Reliability Engineer, and Platform Engineer — using a client-side tab switcher. Content is drawn from the role-specific narratives in `plan/req-page.md`. The page is linked from the main site navigation (`index.html`) and from the audience role cards in the AEGIS sales page (`aegis-sales-page.html`). No build tools or new libraries are introduced; the page shares the same CSS design system and visual language as `aegis-sales-page.html`.

## Glossary

- **Page**: The new file `src/aegis-for-teams.html`.
- **Tab Switcher**: The three-button interface (DevOps Engineer, Site Reliability Engineer, Platform Engineer) that controls which role panel is visible.
- **Role Panel**: The full content block for a single engineering role; only one is visible at a time.
- **Active Tab**: The tab button whose associated role panel is currently visible.
- **Query Param**: The URL query parameter `?role=<value>` used to encode and restore tab state.
- **Design System**: The CSS custom properties (`:root` tokens) and component classes shared across `aegis-sales-page.html` and the rest of the site (`--bg`, `--brand`, `.card`, `.badge`, `.flow`, `.top-nav`, `.page-section`, etc.).
- **CTA Strip**: A call-to-action block at the bottom of each role panel prompting the visitor to get in touch or become a design partner.
- **Lifecycle Flow**: A horizontal sequence of labelled steps representing the AEGIS operational loop for a given role, rendered using `.flow` / `.flow-step` / `.flow-arrow` component classes.
- **index.html**: The main Brahmora homepage at `src/index.html`.
- **Sales Page**: `src/aegis-sales-page.html`, the primary visual reference for this new page.

---

## Requirements

### Requirement 1: New Page File

**User Story:** As a visitor to the Brahmora website, I want a dedicated page that explains AEGIS by engineering role, so that I can quickly find the content most relevant to my job function.

#### Acceptance Criteria

1. THE Page SHALL be created at the path `src/aegis-for-teams.html` within the workspace.
2. THE Page SHALL be a self-contained HTML5 document with no external JavaScript framework dependencies and no build-tool requirements.
3. THE Page SHALL import Google Fonts (Inter and JetBrains Mono) and no other external stylesheets, consistent with the existing pages.
4. THE Page SHALL define all styles in a `<style>` block in the `<head>`, reusing the same `:root` CSS custom property tokens defined in `aegis-sales-page.html` (e.g., `--bg`, `--brand`, `--brand-light`, `--card`, `--text`, `--text-dim`, `--text-muted`, `--border`, `--border-light`, `--emerald`, `--amber`, `--red`, `--blue`, `--violet`, `--pink`, `--nav-height`).
5. THE Page SHALL include a `<meta name="description">` tag with a relevant description of the AEGIS for Teams content.
6. THE Page SHALL include a `<link rel="canonical">` tag pointing to the expected production URL for this page.
7. THE Page SHALL include the same security-relevant `<meta>` tags present in `aegis-sales-page.html` (X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, Permissions-Policy, referrer).

---

### Requirement 2: Top Navigation Bar

**User Story:** As a visitor, I want a consistent top navigation bar on the AEGIS for Teams page, so that I can orient myself within the Brahmora site and navigate to other sections.

#### Acceptance Criteria

1. THE Page SHALL render a fixed top navigation bar with the same structure and styles as `aegis-sales-page.html` (class `top-nav`, height controlled by `--nav-height`, glass-blur background, bottom border).
2. THE top navigation bar SHALL display the AEGIS logo (`aegis-logo.svg`) and the text "AEGIS" as a link back to the top of the page.
3. THE top navigation bar SHALL include anchor links to the major in-page sections: the hero/tab-switcher area and each of the three role panels.
4. THE Page SHALL render a scroll-progress bar (element with id `scrollProgress`) below the fixed navigation bar that fills from left to right as the user scrolls, matching the implementation in `aegis-sales-page.html`.
5. WHEN the user scrolls more than 20 pixels from the top, THE navigation bar SHALL add the class `scrolled` to itself to display a drop shadow, consistent with `aegis-sales-page.html`.

---

### Requirement 3: Hero Section and Tab Selector

**User Story:** As a visitor, I want a clear hero section that introduces the AEGIS for Teams concept and lets me choose my engineering role, so that I can immediately navigate to the content most relevant to me.

#### Acceptance Criteria

1. THE Page SHALL render a hero section (`id="hero"`) with a full-viewport-height layout, centred content, an animated background gradient, and glow effects matching the hero section of `aegis-sales-page.html`.
2. THE hero section SHALL display the AEGIS logo image (`aegis-logo.svg`) with a drop-shadow filter and float animation.
3. THE hero section SHALL display a primary heading (e.g., "AEGIS for Teams") and a subheading that describes the role-based content offering.
4. THE hero section SHALL render a tab selector containing exactly three tab buttons labelled "DevOps Engineer", "Site Reliability Engineer", and "Platform Engineer".
5. THE tab buttons SHALL be rendered as a visually grouped control (e.g., a pill-style button row) that is distinct from standard navigation links.
6. THE active tab button SHALL be visually distinguished from inactive tab buttons using a filled background and colour derived from the Design System tokens (e.g., `--brand`, `--brand-light`).
7. THE hero section SHALL display a brief descriptor sentence below the tab selector that updates to reflect the selected role.

---

### Requirement 4: Tab Switcher Behaviour

**User Story:** As a visitor, I want clicking a role tab to immediately show that role's content, and the page URL to update so I can share or bookmark the specific role view.

#### Acceptance Criteria

1. WHEN a visitor clicks a tab button, THE Tab Switcher SHALL hide all role panels and show only the panel associated with the clicked tab.
2. WHEN a tab is activated, THE Tab Switcher SHALL update the `aria-selected` attribute of all tab buttons — setting it to `"true"` on the active button and `"false"` on all others.
3. WHEN a tab is activated, THE Tab Switcher SHALL update the browser URL using `history.replaceState` to set the query parameter `?role=<value>` where `<value>` is `devops`, `sre`, or `platform` respectively, without triggering a full page reload.
4. WHEN the page loads, THE Tab Switcher SHALL read the `?role` query parameter from the URL and activate the matching tab; IF no `?role` parameter is present or the value is not recognised, THE Tab Switcher SHALL default to activating the "DevOps Engineer" tab.
5. THE role panel visibility transition SHALL use CSS opacity and a brief duration (200–350 ms) so the switch is smooth rather than an instant hard-cut.
6. THE Tab Switcher SHALL support keyboard navigation: WHEN a tab button has focus and the user presses the left or right arrow key, THE Tab Switcher SHALL move focus to the adjacent tab button; WHEN the user presses Enter or Space on a focused tab button, THE Tab Switcher SHALL activate that tab.
7. WHEN a role panel is hidden, THE Page SHALL set its CSS `display` to `none` (or equivalent) so it does not occupy layout space or receive focus.
8. WHEN a role panel is shown, THE Page SHALL set its CSS `display` to `block` and apply the visible opacity state.

---

### Requirement 5: DevOps Engineer Role Panel

**User Story:** As a DevOps engineer visiting the page, I want a content panel tailored to my role that explains how AEGIS maps onto my operational workflow, so that I can evaluate its relevance to my day-to-day work.

#### Acceptance Criteria

1. THE DevOps Engineer panel SHALL be identified by `id="panel-devops"` and the ARIA attribute `role="tabpanel"`.
2. THE DevOps Engineer panel SHALL open with an introductory headline and a paragraph that summarises the DevOps operational problem AEGIS solves (sourced from the "AEGIS for DevOps Engineers" section of `plan/req-page.md`).
3. THE DevOps Engineer panel SHALL render a Lifecycle Flow component displaying the eight stages: KNOW → CORRELATE → DECIDE → GOVERN → PLAN → EXECUTE → VERIFY → EVIDENCE, using `.flow`, `.flow-step`, and `.flow-arrow` classes.
4. THE DevOps Engineer panel SHALL render a "From noise to situations" comparison block that contrasts raw alert counts (e.g., "47 alerts, 18 Kubernetes events") with the AEGIS situation-oriented view (e.g., "3 situations require attention"), with example situation cards (HIGH: Payment API degradation, MEDIUM: EKS worker capacity risk, MEDIUM: Production security exposure).
5. THE DevOps Engineer panel SHALL render a grid of at least four capability highlight cards covering: Change Intelligence (ranked correlated changes), Evidence-backed RCA (causal chain), Blast Radius + Governance (AUTO / APPROVAL REQUIRED / BLOCK decision), and Outcome Verification (before/after metrics), using `.card` component classes.
6. THE DevOps Engineer panel SHALL render a capability table with two columns ("DevOps question" and "AEGIS capability") containing all eleven rows from the `plan/req-page.md` capability table for the DevOps section (from "What needs my attention?" through "Can we prove what happened?").
7. THE DevOps Engineer panel SHALL end with a CTA Strip containing a primary action button ("Become a Design Partner" linking to `index.html#partner`) and a secondary action button ("Explore AEGIS for DevOps" linking to `index.html#aegis`).

---

### Requirement 6: Site Reliability Engineer Role Panel

**User Story:** As an SRE visiting the page, I want a content panel tailored to my role that explains how AEGIS fits into the SRE operational loop and governance model, so that I can assess whether it addresses the specific challenges my team faces.

#### Acceptance Criteria

1. THE SRE panel SHALL be identified by `id="panel-sre"` and the ARIA attribute `role="tabpanel"`.
2. THE SRE panel SHALL open with an introductory headline and a paragraph that summarises the SRE operational problem AEGIS solves (sourced from the "AEGIS for Site Reliability Engineering" section of `plan/req-page.md`).
3. THE SRE panel SHALL render a Lifecycle Flow component displaying the nine stages: Detect → Correlate → Diagnose → Decide → Govern → Execute → Verify → Evidence → Learn, using `.flow`, `.flow-step`, and `.flow-arrow` classes.
4. THE SRE panel SHALL render the SRE challenge-to-capability table sourced from `plan/req-page.md`, containing all fourteen rows (from "Too many operational signals" through "Operational learning"), with two columns ("SRE Challenge" and "How AEGIS Helps").
5. THE SRE panel SHALL render a "Closed SRE Operational Loop" section that presents the ten numbered steps (Detect, Correlate, Diagnose, Decide, Assess Risk, Govern, Execute, Verify, Escalate Failed Recovery, Learn) each with a brief description, using card or list components consistent with the Design System.
6. THE SRE panel SHALL render a "Progressive Autonomy" section presenting the four levels (Level 1 — Understand, Level 2 — Recommend, Level 3 — Governed Human Execution, Level 4 — Governed Conditional Autonomy) as a visual progression, using `.badge` components to label each level.
7. THE SRE panel SHALL end with a CTA Strip containing a primary action button ("Become a Design Partner" linking to `index.html#partner`) and a secondary action button ("Learn more about AEGIS" linking to `aegis-sales-page.html`).

---

### Requirement 7: Platform Engineer Role Panel

**User Story:** As a platform engineer visiting the page, I want a content panel tailored to my role that explains how AEGIS governs infrastructure operations and scale decisions, so that I can determine whether it fits into our platform automation strategy.

#### Acceptance Criteria

1. THE Platform Engineer panel SHALL be identified by `id="panel-platform"` and the ARIA attribute `role="tabpanel"`.
2. THE Platform Engineer panel SHALL open with an introductory headline and a paragraph that summarises the Platform Engineering operational problem AEGIS solves (sourced from the "AEGIS for Platform Engineers" section of `plan/req-page.md`).
3. THE Platform Engineer panel SHALL render a Lifecycle Flow component displaying the six stages: KNOW → DECIDE → GOVERN → EXECUTE → VERIFY → LEARN, using `.flow`, `.flow-step`, and `.flow-arrow` classes.
4. THE Platform Engineer panel SHALL render three capability highlight cards covering: Kubernetes Governed Operations (10-step example with Scale a Kubernetes Workload), EKS Infrastructure Scaling (node-group scaling with technical safety controls), and Terraform Drift Detection (desired vs. live configuration comparison), using `.card` component classes.
5. THE Platform Engineer panel SHALL render a security exposure remediation flow showing the governed lifecycle for a public security group exposure: Detect Exposure → Understand Affected Resources → Propose Revoke Ingress → Assess Risk → Calculate Blast Radius → Evaluate Policy → Require Appropriate Approval → Execute SG Rule Revocation → Verify → Maintain Rollback Capability → Capture Evidence, using `.flow` or a vertical step list component.
6. THE Platform Engineer panel SHALL render a "Trusted Boundary" section listing the five graduation steps for a platform operation to reach governed execution: Operation Implemented → Technical Safety Validated → Risk Semantics → Blast-Radius Evaluation → Policy & Authority → Rollback Semantics → Verification → Trusted Governed Execution.
7. THE Platform Engineer panel SHALL render an outcome transformation table with two columns ("Without AEGIS" and "With AEGIS") containing at least ten transformation rows sourced from the "The Platform Engineer Outcome" section of `plan/req-page.md` (e.g., "Alerts → Situations", "Terraform → Desired State + Drift", etc.).
8. THE Platform Engineer panel SHALL end with a CTA Strip containing a primary action button ("Become a Design Partner" linking to `index.html#partner`) and a secondary action button ("Learn more about AEGIS" linking to `aegis-sales-page.html`).

---

### Requirement 8: Footer

**User Story:** As a visitor who has scrolled to the bottom of the page, I want a footer consistent with the rest of the Brahmora site, so that I can find legal information and brand attribution.

#### Acceptance Criteria

1. THE Page SHALL render a footer section matching the footer of `aegis-sales-page.html` in structure and styling.
2. THE footer SHALL display the AEGIS logo (`aegis-logo.svg`) and the Universal Intelligence logo (`universal-intelligence-logo.svg`).
3. THE footer SHALL display the brand tagline ("Move fast. Break nothing. Prove it."), the company name ("Brahmora Technologies"), and the product descriptor ("AEGIS — The Operational Decision & Governance Layer for Cloud Platforms").
4. THE Page SHALL render a back-to-top button (element with `id="backToTop"`) that becomes visible once the user has scrolled past 50% of the viewport height and scrolls back to the top when clicked, matching the implementation in `aegis-sales-page.html`.

---

### Requirement 9: Navigation Link in index.html

**User Story:** As a visitor on the Brahmora homepage, I want a navigation link to the AEGIS for Teams page, so that I can discover the role-specific content without having to know the URL directly.

#### Acceptance Criteria

1. THE `index.html` file SHALL be modified to add a new navigation link labelled "AEGIS for Teams" in the `.nav-menu` element.
2. THE new navigation link SHALL use the `nav-link` class, consistent with other links in the same menu.
3. THE new navigation link SHALL have its `href` attribute set to `aegis-for-teams.html`.
4. THE new navigation link SHALL be placed adjacent to existing product-related links (e.g., after the "Architecture" link and before the "Become Design Partner" CTA button), preserving the existing link ordering.

---

### Requirement 10: Audience Role Cards in aegis-sales-page.html

**User Story:** As a visitor reading the AEGIS sales page, I want the audience role cards to be clickable links to the relevant role panel on the AEGIS for Teams page, so that I can go directly to the content for my role without an extra navigation step.

#### Acceptance Criteria

1. THE `aegis-sales-page.html` file SHALL be modified so that the "Platform Engineering" audience role card navigates to `aegis-for-teams.html?role=platform` when clicked.
2. THE `aegis-sales-page.html` file SHALL be modified so that the "DevOps" audience role card navigates to `aegis-for-teams.html?role=devops` when clicked.
3. THE `aegis-sales-page.html` file SHALL be modified so that the "Site Reliability Engineering" audience role card navigates to `aegis-for-teams.html?role=sre` when clicked.
4. THE `aegis-sales-page.html` file SHALL be modified so that the "Cloud Operations" audience role card navigates to `aegis-for-teams.html` (default, no role param) when clicked.
5. WHEN a role card is made into a link, THE card SHALL retain its existing visual appearance with no change to layout, colour, or hover effects beyond the addition of a cursor pointer.
6. THE link wrapping each role card SHALL use an `<a>` element so that middle-click (open in new tab) and right-click behaviour work as expected in all browsers.

---

### Requirement 11: Responsive Layout

**User Story:** As a visitor on a mobile or tablet device, I want the AEGIS for Teams page to be readable and fully functional, so that I can consume the content on any screen size.

#### Acceptance Criteria

1. THE Page SHALL apply a two-column grid breakpoint at 900px, collapsing multi-column card grids to fewer columns consistent with `aegis-sales-page.html` media query behaviour.
2. THE Page SHALL apply a single-column breakpoint at 600px for all card grids, consistent with `aegis-sales-page.html`.
3. THE Lifecycle Flow components SHALL collapse from a horizontal row to a vertical column at 600px, with flow arrows rotated 90 degrees, consistent with the `.flow` component behaviour in `aegis-sales-page.html`.
4. THE top navigation bar link list (`top-nav-links`) SHALL be hidden on screens narrower than 600px, consistent with `aegis-sales-page.html`.
5. THE tab selector buttons SHALL remain fully accessible and tappable on mobile screen widths, with adequate tap target size (minimum 44px height).
6. THE hero section heading font size SHALL use `clamp()` or equivalent fluid sizing to remain readable at all viewport widths without overflow.

---

### Requirement 12: Accessibility

**User Story:** As a visitor using a keyboard or assistive technology, I want the tab switcher and page content to be fully navigable, so that I can access all content regardless of how I interact with the browser.

#### Acceptance Criteria

1. THE tab selector container SHALL have `role="tablist"` applied to the wrapping element.
2. EACH tab button SHALL have `role="tab"` and an `aria-controls` attribute pointing to the `id` of the role panel it controls.
3. EACH tab button SHALL have an `aria-selected` attribute that is `"true"` when the tab is active and `"false"` when it is not.
4. EACH role panel SHALL have `role="tabpanel"` and an `aria-labelledby` attribute pointing to the `id` of its controlling tab button.
5. WHEN a role panel is hidden, THE Page SHALL set `aria-hidden="true"` on that panel element so screen readers skip its content.
6. WHEN a role panel is shown, THE Page SHALL remove or set `aria-hidden="false"` on that panel element.
7. THE scroll-progress bar and back-to-top button SHALL have appropriate `aria-label` or `aria-hidden` attributes so they do not create noise for screen reader users.
8. ALL images that convey meaning (logos) SHALL have descriptive `alt` text; decorative images SHALL have `alt=""`.
9. THE colour contrast of all text against its background SHALL meet WCAG 2.1 AA minimum contrast ratios, consistent with the existing Design System palette.
