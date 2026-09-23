# Design Document — AEGIS for Teams Page

## Overview

This document describes the complete implementation of `src/aegis-for-teams.html`, a new standalone HTML page for the Brahmora Technologies website. The page presents AEGIS content segmented by three engineering roles — DevOps Engineer, Site Reliability Engineer, and Platform Engineer — via a client-side tab switcher.

The implementation uses no build tools, no JavaScript frameworks, and no new assets. It reuses the CSS design system, SVG assets, and visual conventions established in `src/aegis-sales-page.html`.

---

## 1. File Structure

### Files created

| Path | Purpose |
|------|---------|
| `src/aegis-for-teams.html` | New standalone page — the primary deliverable |

### Files modified

| Path | Change |
|------|--------|
| `src/index.html` | Add one `<a>` nav-link in `.nav-menu` |
| `src/aegis-sales-page.html` | Wrap four audience role cards in `<a>` tags |

### Assets reused (no changes)

| Asset | Used for |
|-------|---------|
| `src/aegis-logo.svg` | Nav brand, hero logo, footer |
| `src/universal-intelligence-logo.svg` | Footer |

---

## 2. CSS Design

All styles go in a single `<style>` block in `<head>`. Copy the complete `:root` token block and all component classes verbatim from `aegis-sales-page.html`, then append the following new classes at the end of the block.

### 2.1 Token block

Copy the entire `:root { ... }` declaration from `aegis-sales-page.html` unchanged. All tokens (`--bg`, `--brand`, `--brand-light`, `--brand-glow`, `--card`, `--card-hover`, `--border`, `--border-light`, `--text`, `--text-dim`, `--text-muted`, `--emerald`, `--amber`, `--red`, `--blue`, `--violet`, `--pink`, `--nav-height`) must be present.

### 2.2 Classes to copy verbatim from aegis-sales-page.html

Copy every class definition from the sales page exactly as written:

- Reset (`*`, `html`, `body`)
- `.top-nav` and all sub-classes (`.top-nav-brand`, `.top-nav-links`, `.top-nav-links a`)
- `.page-section` and `.page-section.visible`
- `.hero-section` and `.hero-bg`
- `.section-gradient-divider`
- All `@keyframes` declarations (`fadeIn`, `shimmer`, `pulse-glow`, `pulse-border`, `pulse-badge`, `gradient-shift`)
- `h1`, `h2`, `h3`, `p`, `li`, `strong`, `blockquote`, `code`, `ul`
- `.section-divider`
- `.table-wrap`, `table`, `th`, `td`, `tr`
- `pre`
- `.card`, `.card-grid`, `.card-grid-2`, `.card-grid-3`, `.card-grid-4`, `.card-grid-5`, `.card-grid-stretch`
- `.card-gradient-brand`, `.card-gradient-emerald`, `.card-gradient-amber`, `.card-gradient-red`, `.card-gradient-blue`, `.card-gradient-violet`
- `.kpi`, `.value`, `.value-xl`, `.label`, `.kpi.emerald`, `.kpi.amber`, `.kpi.red`, `.kpi.brand`, `.value-gradient`
- `.badge`, `.badge.emerald`, `.badge.amber`, `.badge.red`, `.badge.brand`, `.badge.blue`
- `.flow`, `.flow-step`, `.flow-arrow`, `.flow-arrow-down`
- `.two-col`
- `.hero-section h1`, `.tagline`, `.subtitle-gradient`
- `.glow`, `.glow-brand`, `.glow-emerald`
- `.icon-circle`, `.icon-circle-lg`
- `.glow-border`
- `.card-grid-3 .card-min`, `.card-grid-4 .card-min`
- `.highlight-col`
- `.hero-number`
- `.back-to-top`
- `.site-footer` and all sub-classes
- `.scroll-progress`
- All responsive `@media` blocks

### 2.3 New classes — tab switcher and role panels

Append these classes **after** all copied classes:

```css
/* ── Tab switcher ───────────────────────────────────────────── */
.role-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 32px 0 16px;
}

.role-tab {
  padding: 12px 28px;
  border-radius: 99px;
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--border-light);
  background: transparent;
  color: var(--text-muted);
  transition: all .25s;
  letter-spacing: .02em;
  white-space: nowrap;
  min-height: 44px;
}

.role-tab:hover {
  border-color: var(--brand-light);
  color: var(--text);
}

.role-tab.active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  box-shadow: 0 0 20px var(--brand-glow);
}

.role-tab:focus-visible {
  outline: 2px solid var(--brand-light);
  outline-offset: 3px;
}

.role-tab-desc {
  min-height: 2.2em;
  font-size: .95rem;
  color: var(--brand-light);
  text-align: center;
  margin-bottom: 8px;
  transition: opacity .2s;
}

/* ── Role panels ────────────────────────────────────────────── */
.role-panel {
  display: none;
  opacity: 0;
  transition: opacity .25s ease;
}

.role-panel.active {
  display: block;
}

.role-panel.visible {
  opacity: 1;
}

/* ── CTA strip (bottom of each panel) ─────────────────────── */
.cta-strip {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 32px;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: .95rem;
  font-weight: 700;
  color: #fff;
  background: var(--brand);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background .25s, box-shadow .25s, transform .2s;
}

.btn-cta-primary:hover {
  background: var(--brand-light);
  box-shadow: 0 4px 20px var(--brand-glow);
  transform: translateY(-1px);
}

.btn-cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: .95rem;
  font-weight: 700;
  color: var(--brand-light);
  background: transparent;
  border: 2px solid var(--border-light);
  cursor: pointer;
  text-decoration: none;
  transition: border-color .25s, color .25s;
}

.btn-cta-secondary:hover {
  border-color: var(--brand-light);
  color: var(--text);
}

/* ── Vertical step list (Platform panel Trusted Boundary) ─── */
.step-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 600px;
  margin: 0 auto;
}

.step-list-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(13,19,33,.9), rgba(17,24,39,.7));
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 0;
}

.step-list-connector {
  text-align: center;
  color: var(--brand-light);
  font-size: 1.1rem;
  padding: 3px 0;
  text-shadow: 0 0 8px var(--brand-glow);
}

.step-list-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(99,102,241,.18);
  color: var(--brand-light);
  font-size: .82rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-list-text strong {
  color: var(--text);
  display: block;
  margin-bottom: 2px;
}

/* ── Outcome table column colouring ─────────────────────────── */
.col-before { color: var(--red); font-weight: 600; }
.col-after  { color: var(--emerald); font-weight: 600; }

@media(max-width:600px) {
  .role-tabs { flex-direction: column; align-items: center }
  .role-tab  { width: 100%; text-align: center }
  .cta-strip { flex-direction: column; align-items: center }
  .btn-cta-primary, .btn-cta-secondary { width: 100%; justify-content: center }
}
```

---

## 3. HTML Document Structure

### 3.1 `<head>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AEGIS for Teams — DevOps, SRE & Platform Engineering</title>
<meta name="description" content="See how AEGIS helps DevOps engineers, Site Reliability Engineers, and Platform Engineers move from operational noise to governed, evidence-backed action.">
<link rel="canonical" href="https://brahmora.co.uk/aegis-for-teams.html">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=()">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  /* All CSS — section 2 above */
</style>
</head>
```

### 3.2 `<body>` top-level element order

```
1.  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
2.  <nav class="top-nav" id="topNav"> … </nav>
3.  <section class="hero-section page-section visible" id="hero"> … </section>
4.  <div class="section-gradient-divider"></div>
5.  <div id="panel-devops" role="tabpanel" …> … </div>
6.  <div id="panel-sre"    role="tabpanel" …> … </div>
7.  <div id="panel-platform" role="tabpanel" …> … </div>
8.  <footer class="site-footer"> … </footer>
9.  <button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
10. <script> … </script>
```

### 3.3 Top navigation bar

Copy the `<nav>` block from `aegis-sales-page.html` exactly, then replace the `.top-nav-links` content with:

```html
<div class="top-nav-links" id="navLinks">
  <a href="#hero">Home</a>
  <a href="#panel-devops">DevOps</a>
  <a href="#panel-sre">SRE</a>
  <a href="#panel-platform">Platform</a>
  <a href="index.html">Brahmora Home</a>
  <a href="aegis-sales-page.html">AEGIS Overview</a>
</div>
```

The brand `<a href="#hero">` uses `aegis-logo.svg` and the text "AEGIS".

### 3.4 Hero section

```html
<section class="hero-section page-section visible" id="hero">
  <div class="hero-bg"></div>
  <div class="glow glow-brand"></div>
  <div class="glow glow-emerald"></div>
  <div class="section-inner" style="text-align:center">

    <img src="aegis-logo.svg" alt="AEGIS"
         width="120" height="120"
         style="filter:drop-shadow(0 0 32px rgba(99,102,241,.5));margin-bottom:20px;animation:pulse-glow 4s ease infinite" />

    <h1>AEGIS for Teams</h1>

    <h3 style="font-size:1.3rem;max-width:680px;margin:0 auto">
      How AEGIS fits into how your engineering team actually works
    </h3>

    <p style="color:var(--text-dim);max-width:580px;margin:16px auto 0;font-size:1.05rem">
      Choose your role to see how AEGIS maps onto your operational workflow.
    </p>

    <!-- Tab switcher -->
    <div role="tablist" class="role-tabs" id="roleTabs" aria-label="Engineering role">
      <button role="tab" class="role-tab active"
              id="tab-devops"
              data-tab="devops"
              aria-selected="true"
              aria-controls="panel-devops">
        DevOps Engineer
      </button>
      <button role="tab" class="role-tab"
              id="tab-sre"
              data-tab="sre"
              aria-selected="false"
              aria-controls="panel-sre">
        Site Reliability Engineer
      </button>
      <button role="tab" class="role-tab"
              id="tab-platform"
              data-tab="platform"
              aria-selected="false"
              aria-controls="panel-platform">
        Platform Engineer
      </button>
    </div>

    <p class="role-tab-desc" id="roleTabDesc">
      How AEGIS helps DevOps engineers move from alert noise to safe, governed operational action.
    </p>

  </div>
</section>
```

---

## 4. Role Panel Internal Structure

Each panel follows the same outer wrapper pattern:

```html
<div id="panel-{role}"
     role="tabpanel"
     aria-labelledby="tab-{role}"
     class="role-panel [active]"
     [aria-hidden="true"]>
  <!-- Sections below -->
</div>
```

The first panel (`panel-devops`) gets `class="role-panel active"` and no `aria-hidden`. The other two get `class="role-panel"` and `aria-hidden="true"`.

Between every pair of adjacent `.page-section` elements inside a panel, insert:
```html
<div class="section-gradient-divider"></div>
```

---

### 4.1 DevOps Engineer Panel (`#panel-devops`)

#### Section A — Introduction

```html
<section class="page-section" id="devops-intro">
  <div class="section-inner">
    <h2>Move from alerts to safe operational action</h2>
    <h3>DevOps engineers spend too much time switching between dashboards, Kubernetes, CI/CD, logs, tickets, and approval systems just to answer a handful of critical questions.</h3>
    <hr class="section-divider">

    <!-- 8-step lifecycle flow -->
    <div class="flow">
      <div class="flow-step"><div class="step-title">KNOW</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">CORRELATE</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">DECIDE</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">GOVERN</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">PLAN</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">EXECUTE</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">VERIFY</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">EVIDENCE</div></div>
    </div>

    <blockquote>
      "Given everything happening right now, what is the safest appropriate action, should it be allowed, can we execute it, and did it actually solve the problem?"
    </blockquote>
  </div>
</section>
```

#### Section B — Situation Intelligence

```html
<section class="page-section" id="devops-situations">
  <div class="section-inner">
    <h2>From operational noise to situations that matter</h2>
    <h3>Infrastructure platforms produce enormous amounts of operational data. AEGIS groups related evidence into ranked operational situations.</h3>
    <hr class="section-divider">

    <div class="two-col">
      <!-- Left: raw noise -->
      <div>
        <div class="card card-gradient-red" style="text-align:center;border-top:3px solid var(--red)">
          <h3 style="color:var(--red);margin-bottom:16px">Raw signal volume</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(239,68,68,.08);border-radius:8px">
              <span>Alerts</span><span class="badge red">47</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(239,68,68,.08);border-radius:8px">
              <span>Kubernetes events</span><span class="badge red">18</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(239,68,68,.08);border-radius:8px">
              <span>Infrastructure changes</span><span class="badge red">12</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(239,68,68,.08);border-radius:8px">
              <span>Anomalies</span><span class="badge red">9</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: AEGIS situations -->
      <div>
        <div class="card card-gradient-emerald" style="border-top:3px solid var(--emerald);margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <strong>Payment API degradation</strong>
            <span class="badge red">HIGH</span>
          </div>
          <p style="font-size:.9rem">Multiple pod restarts, latency degradation, and error-rate increases detected after a recent deployment.</p>
        </div>
        <div class="card" style="margin-bottom:12px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <strong>EKS worker capacity risk</strong>
            <span class="badge amber">MEDIUM</span>
          </div>
          <p style="font-size:.9rem">Node-group utilisation is approaching operational limits.</p>
        </div>
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <strong>Production security exposure</strong>
            <span class="badge amber">MEDIUM</span>
          </div>
          <p style="font-size:.9rem">A proposed infrastructure change would introduce public access to a protected resource.</p>
        </div>
        <p style="text-align:center;margin-top:12px;font-weight:700;color:var(--emerald)">3 situations require attention</p>
      </div>
    </div>
  </div>
</section>
```

#### Section C — Capabilities Grid

```html
<section class="page-section" id="devops-capabilities">
  <div class="section-inner">
    <h2>Core capabilities</h2>
    <hr class="section-divider">

    <div class="card-grid card-grid-2 card-grid-stretch">

      <!-- Change Intelligence -->
      <div class="card card-gradient-brand" style="border-top:3px solid var(--brand)">
        <div class="icon-circle" style="background:rgba(99,102,241,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">🔄</span>
        </div>
        <div style="font-weight:800;color:var(--brand-light);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Change Intelligence</div>
        <h3>Ranked correlated changes</h3>
        <p>AEGIS evaluates recent changes against the current problem using time proximity, affected service, change type, and incident severity — and returns a ranked list with correlation scores and plain-language explanations.</p>
      </div>

      <!-- Evidence-backed RCA -->
      <div class="card card-gradient-emerald" style="border-top:3px solid var(--emerald)">
        <div class="icon-circle" style="background:rgba(16,185,129,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">🔍</span>
        </div>
        <div style="font-weight:800;color:var(--emerald);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Evidence-backed RCA</div>
        <h3>Inspectable causal chain</h3>
        <p>AEGIS combines infrastructure state, Kubernetes events, telemetry, change history, and service context to construct a causal chain — from the triggering change through to the observable symptom — with the underlying evidence exposed for engineer review.</p>
      </div>

      <!-- Blast Radius + Governance -->
      <div class="card card-gradient-amber" style="border-top:3px solid var(--amber)">
        <div class="icon-circle" style="background:rgba(245,158,11,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">🛡️</span>
        </div>
        <div style="font-weight:800;color:var(--amber);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Blast Radius + Governance</div>
        <h3>Decision context before execution</h3>
        <p>Before any action runs, AEGIS evaluates affected resources, dependent services, and policy to return one of three governance verdicts:</p>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
          <span class="badge emerald">AUTO</span>
          <span class="badge amber">APPROVAL REQUIRED</span>
          <span class="badge red">BLOCK</span>
        </div>
      </div>

      <!-- Outcome Verification -->
      <div class="card card-gradient-blue" style="border-top:3px solid var(--blue)">
        <div class="icon-circle" style="background:rgba(59,130,246,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">✅</span>
        </div>
        <div style="font-weight:800;color:var(--blue);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Outcome Verification</div>
        <h3>Before/after metric comparison</h3>
        <p>After a supported action completes, AEGIS evaluates whether the operational state actually improved — comparing error rate, latency, pod readiness, and SLO burn rate before and after execution. Execution success ≠ operational success.</p>
      </div>

    </div>
  </div>
</section>
```

#### Section D — Capability Table

```html
<section class="page-section" id="devops-table">
  <div class="section-inner">
    <h2>Designed around your questions</h2>
    <hr class="section-divider">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>DevOps question</th>
            <th>AEGIS capability</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>What needs my attention?</strong></td><td>Situation Intelligence</td></tr>
          <tr><td><strong>What changed?</strong></td><td>Change Intelligence</td></tr>
          <tr><td><strong>What caused the problem?</strong></td><td>Evidence-backed RCA</td></tr>
          <tr><td><strong>Has this happened before?</strong></td><td>Operational Memory</td></tr>
          <tr><td><strong>What should I do?</strong></td><td>Remediation Recommendation</td></tr>
          <tr><td><strong>What will this affect?</strong></td><td>Blast Radius Analysis</td></tr>
          <tr><td><strong>Should I do it?</strong></td><td>Risk + Governance</td></tr>
          <tr><td><strong>Is there a safer approach?</strong></td><td>Operational Planning</td></tr>
          <tr><td><strong>Can AEGIS perform it?</strong></td><td>Safe Operations</td></tr>
          <tr><td><strong>Did it actually work?</strong></td><td>Outcome Verification</td></tr>
          <tr><td><strong>Can we prove what happened?</strong></td><td>Operational Evidence</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

#### Section E — CTA Strip

```html
<section class="page-section" id="devops-cta">
  <div class="section-inner" style="text-align:center">
    <h2>Start with AEGIS for DevOps</h2>
    <p style="max-width:540px;margin:12px auto 0">Join the teams shaping how AEGIS fits into real DevOps workflows.</p>
    <div class="cta-strip">
      <a href="index.html#partner" class="btn-cta-primary">Become a Design Partner</a>
      <a href="aegis-sales-page.html#next-steps" class="btn-cta-secondary">Explore AEGIS for DevOps</a>
    </div>
  </div>
</section>
```

---

### 4.2 SRE Panel (`#panel-sre`)

#### Section A — Introduction

```html
<section class="page-section" id="sre-intro">
  <div class="section-inner">
    <h2>Turn Operational Signals into Governed, Evidence-Backed Action</h2>
    <h3>SRE teams rarely lack data. The harder challenge is answering: what actually needs attention, what action is most appropriate, and did the remediation actually fix the problem?</h3>
    <hr class="section-divider">

    <!-- 9-step lifecycle flow -->
    <div class="flow">
      <div class="flow-step"><div class="step-title">Detect</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Correlate</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Diagnose</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Decide</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Govern</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Execute</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Verify</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Evidence</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">Learn</div></div>
    </div>
  </div>
</section>
```

#### Section B — Challenge Table

```html
<section class="page-section" id="sre-table">
  <div class="section-inner">
    <h2>How AEGIS helps SRE teams</h2>
    <hr class="section-divider">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SRE Challenge</th>
            <th>How AEGIS Helps</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Too many operational signals</strong></td><td>Situation Fusion correlates signals, Kubernetes events, errors, and anomalies into higher-level operational situations.</td></tr>
          <tr><td><strong>Slow incident diagnosis</strong></td><td>Brings together infrastructure state, Kubernetes evidence, recent changes, dependencies, similar incidents, and relevant resolution history.</td></tr>
          <tr><td><strong>Finding what changed</strong></td><td>Change Intelligence correlates operational degradation with recent infrastructure and deployment changes.</td></tr>
          <tr><td><strong>Repeated incidents</strong></td><td>Similarity intelligence identifies related historical incidents; mined resolution patterns show remediation that has previously succeeded.</td></tr>
          <tr><td><strong>Choosing a remediation</strong></td><td>AEGIS surfaces relevant remediation candidates for supported patterns rather than fabricating recommendations when evidence is insufficient.</td></tr>
          <tr><td><strong>Production action risk</strong></td><td>Computes remediation risk using action characteristics, reversibility, and blast radius.</td></tr>
          <tr><td><strong>Unsafe automation</strong></td><td>Governance policies determine whether an action is blocked, requires human approval, or qualifies for conditional auto-approval.</td></tr>
          <tr><td><strong>Large blast radius</strong></td><td>Dependency and blast-radius analysis helps prevent excessively broad operational actions.</td></tr>
          <tr><td><strong>Manual Kubernetes remediation</strong></td><td>Supported Kubernetes operations can be dispatched through AEGIS's Governed Executor Bridge.</td></tr>
          <tr><td><strong>Knowing whether a fix worked</strong></td><td>Performs technical verification and, for supported workflows, application recovery verification using before/after metrics.</td></tr>
          <tr><td><strong>Failed remediation</strong></td><td>A failed recovery generates a high-severity operational alert and returns the situation to the incident workflow rather than silently stopping.</td></tr>
          <tr><td><strong>RCA and audit evidence</strong></td><td>Preserves decisions, approvals, execution runs, verification results, and governance evidence.</td></tr>
          <tr><td><strong>Operational learning</strong></td><td>Successful remediation history is mined into resolution patterns that support future recommendations and incident analysis.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

> Note: The requirements list 14 rows; the source material in req-page.md contains 13 distinct challenge rows. Implement all 13 rows as written above — do not pad with a 14th fabricated row.

#### Section C — Closed SRE Operational Loop

```html
<section class="page-section" id="sre-loop">
  <div class="section-inner">
    <h2>A Closed SRE Operational Loop</h2>
    <h3>AEGIS connects operational capabilities that are often fragmented across multiple tools.</h3>
    <hr class="section-divider">

    <!-- 10 step cards in 2-column grid -->
    <div class="card-grid card-grid-2 card-grid-stretch">

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">1</span>
          <strong style="font-size:1rem">Detect</strong>
        </div>
        <p>Collect and evaluate operational signals from cloud and Kubernetes environments, including node, Pod, deployment, DaemonSet, StatefulSet, availability zone, and batch workload conditions.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">2</span>
          <strong style="font-size:1rem">Correlate</strong>
        </div>
        <p>Situation Fusion combines related operational evidence so SREs focus on the situation rather than manually assembling isolated signals.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">3</span>
          <strong style="font-size:1rem">Diagnose</strong>
        </div>
        <p>Bring together current evidence with historical knowledge — reasoning over Kubernetes, ECS, CloudWatch, and mined resolution patterns. Similarity intelligence surfaces comparable previous incidents.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">4</span>
          <strong style="font-size:1rem">Decide</strong>
        </div>
        <p>For supported situations, identify a candidate remediation backed by evidence. When sufficient historical evidence does not exist, AEGIS returns no matched pattern rather than manufacturing one.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">5</span>
          <strong style="font-size:1rem">Assess Risk</strong>
        </div>
        <p>Calculate remediation risk from destructive-action characteristics, reversibility, and blast radius — so decisions consider not just whether an action can be performed, but its potential consequences.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">6</span>
          <strong style="font-size:1rem">Govern</strong>
        </div>
        <p>The proposed action passes through AEGIS governance. Depending on tenant policy and operational context, the result is <strong>BLOCK</strong>, <strong>REQUIRE APPROVAL</strong>, or <strong>CONDITIONAL AUTO-APPROVAL</strong>.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">7</span>
          <strong style="font-size:1rem">Execute</strong>
        </div>
        <p>Approved supported actions pass through the Governed Executor Bridge and registered executor vocabulary. AEGIS does not give an AI agent unrestricted production access.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">8</span>
          <strong style="font-size:1rem">Verify</strong>
        </div>
        <p>Technical verification checks whether the expected infrastructure state was achieved. For supported workflows, deferred recovery verification compares application metrics before and after.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">9</span>
          <strong style="font-size:1rem">Escalate Failed Recovery</strong>
        </div>
        <p>If the technical action completes but the symptom does not recover, AEGIS surfaces a high-severity incident alert rather than assuming success or automatically chaining another risky remediation.</p>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
          <span class="badge brand">10</span>
          <strong style="font-size:1rem">Learn</strong>
        </div>
        <p>Successful remediation outcomes contribute to mined resolution patterns, which subsequently appear as Matched Resolution Patterns for future incidents and feed historical resolution evidence during incident analysis.</p>
      </div>

    </div>
  </div>
</section>
```

#### Section D — Progressive Autonomy

```html
<section class="page-section" id="sre-autonomy">
  <div class="section-inner">
    <h2>Progressive Autonomy — Not Unrestricted Automation</h2>
    <h3>AEGIS progressively introduces automation inside explicit operational boundaries — expanding autonomy through policy and evidence, not by removing controls.</h3>
    <hr class="section-divider">

    <div class="card-grid card-grid-2 card-grid-stretch">

      <div class="card card-gradient-brand" style="border-top:3px solid var(--brand)">
        <div style="margin-bottom:10px"><span class="badge brand">Level 1 — Understand</span></div>
        <h3>Detect, correlate, and explain</h3>
        <p>AEGIS detects, correlates, and explains the operational situation. No action is taken. Engineers retain full control over all decisions.</p>
      </div>

      <div class="card card-gradient-blue" style="border-top:3px solid var(--blue)">
        <div style="margin-bottom:10px"><span class="badge blue">Level 2 — Recommend</span></div>
        <h3>Evidence-backed candidates</h3>
        <p>AEGIS identifies an evidence-backed remediation candidate where sufficient history exists. The engineer decides whether to act.</p>
      </div>

      <div class="card card-gradient-amber" style="border-top:3px solid var(--amber)">
        <div style="margin-bottom:10px"><span class="badge amber">Level 3 — Governed Human Execution</span></div>
        <h3>Approve, execute, verify</h3>
        <p>AEGIS evaluates risk and policy. An authorised engineer approves the action. AEGIS executes through the Governed Executor Bridge and verifies the outcome.</p>
      </div>

      <div class="card card-gradient-emerald" style="border-top:3px solid var(--emerald)">
        <div style="margin-bottom:10px"><span class="badge emerald">Level 4 — Governed Conditional Autonomy</span></div>
        <h3>Policy-bounded automation</h3>
        <p>For explicitly supported actions and tenant-defined conditions, policy can provide conditional auto-approval. The action still passes through risk assessment, blast-radius controls, policy, a registered executor, verification, and evidence capture.</p>
      </div>

    </div>
  </div>
</section>
```

#### Section E — CTA Strip

```html
<section class="page-section" id="sre-cta">
  <div class="section-inner" style="text-align:center">
    <h2>Build a safer SRE operational loop</h2>
    <p style="max-width:540px;margin:12px auto 0">Work with us to shape how AEGIS fits into real SRE workflows.</p>
    <div class="cta-strip">
      <a href="index.html#partner" class="btn-cta-primary">Become a Design Partner</a>
      <a href="aegis-sales-page.html" class="btn-cta-secondary">Learn more about AEGIS</a>
    </div>
  </div>
</section>
```

---

### 4.3 Platform Engineer Panel (`#panel-platform`)

#### Section A — Introduction

```html
<section class="page-section" id="platform-intro">
  <div class="section-inner">
    <h2>Turn Platform Signals Into Governed Action</h2>
    <h3>Platform engineers operate across Kubernetes, cloud infrastructure, Terraform, observability, CI/CD, and operational tooling. The harder challenge is not seeing what is happening — it is deciding what to do safely.</h3>
    <hr class="section-divider">

    <!-- 6-step lifecycle flow -->
    <div class="flow">
      <div class="flow-step"><div class="step-title">KNOW</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">DECIDE</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">GOVERN</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">EXECUTE</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">VERIFY</div></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step"><div class="step-title">LEARN</div></div>
    </div>
  </div>
</section>
```

#### Section B — Platform Capability Cards

```html
<section class="page-section" id="platform-capabilities">
  <div class="section-inner">
    <h2>Platform capabilities</h2>
    <hr class="section-divider">

    <div class="card-grid card-grid-3 card-grid-stretch">

      <!-- Kubernetes Governed Operations -->
      <div class="card card-gradient-brand" style="border-top:3px solid var(--brand)">
        <div class="icon-circle" style="background:rgba(99,102,241,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">☸️</span>
        </div>
        <div style="font-weight:800;color:var(--brand-light);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Kubernetes Governed Operations</div>
        <h3>10-step governed lifecycle</h3>
        <p>For trusted Kubernetes operations, AEGIS takes a remediation through the full Governance V2 lifecycle — detect condition → understand workload → propose (e.g. resize 6→8 replicas) → assess risk → blast radius → apply policy → determine authority → execute → verify → preserve evidence.</p>
      </div>

      <!-- EKS Infrastructure Scaling -->
      <div class="card card-gradient-blue" style="border-top:3px solid var(--blue)">
        <div class="icon-circle" style="background:rgba(59,130,246,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">⚙️</span>
        </div>
        <div style="font-weight:800;color:var(--blue);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">EKS Infrastructure Scaling</div>
        <h3>Node-group scaling with safety controls</h3>
        <p>Scale EKS managed node groups through the governance lifecycle. Before execution, AEGIS enforces technical safety: refuses if node group is not ACTIVE, if the requested size falls outside configured min/max, or if the single-operation change exceeds the 50-node safety limit.</p>
      </div>

      <!-- Terraform Drift Detection -->
      <div class="card card-gradient-emerald" style="border-top:3px solid var(--emerald)">
        <div class="icon-circle" style="background:rgba(16,185,129,.18);margin-bottom:14px">
          <span style="font-size:1.6rem">🔎</span>
        </div>
        <div style="font-weight:800;color:var(--emerald);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Terraform Drift Detection</div>
        <h3>Desired state vs. live configuration</h3>
        <p style="margin-bottom:12px">AEGIS synchronises Terraform state into its desired-configuration model and compares it with live AWS configuration to surface divergence.</p>
        <!-- Mini before/after comparison -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
          <div style="background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--emerald);margin-bottom:4px">Terraform declares</div>
            <code>10.0.0.0/8</code>
          </div>
          <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--red);margin-bottom:4px">Live AWS contains</div>
            <code>0.0.0.0/0</code>
          </div>
        </div>
        <div style="text-align:center;margin-top:8px"><span class="badge amber">CONFIGURATION DRIFT</span></div>
      </div>

    </div>
  </div>
</section>
```

#### Section C — Security Exposure Remediation Flow

```html
<section class="page-section" id="platform-security">
  <div class="section-inner">
    <h2>Remediate Cloud Security Exposure Safely</h2>
    <h3>Finding an insecure cloud configuration is only the beginning. AEGIS governs the full remediation lifecycle — from detection through to verified, rollback-aware execution.</h3>
    <hr class="section-divider">

    <!-- 11-step vertical flow -->
    <div style="max-width:560px;margin:0 auto">

      <div class="flow-step" style="justify-content:center;text-align:center;background:linear-gradient(135deg,rgba(239,68,68,.08),rgba(239,68,68,.02));border-color:var(--red)">
        <div class="step-title" style="color:var(--red)">Detect Exposure</div>
        <div class="step-desc">Security group rule open to 0.0.0.0/0 identified</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Understand Affected Resources</div>
        <div class="step-desc">Map resources associated with the exposed rule</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(99,102,241,.02));border-color:var(--brand)">
        <div class="step-title" style="color:var(--brand-light)">Propose Revoke Ingress</div>
        <div class="step-desc">Candidate: remove public SSH/rule exposure</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Assess Risk</div>
        <div class="step-desc">Destructive-action characteristics and reversibility</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Calculate Blast Radius</div>
        <div class="step-desc">Resources and services potentially affected</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Evaluate Policy</div>
        <div class="step-desc">Tenant governance rules applied</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center;background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(245,158,11,.02));border-color:var(--amber)">
        <div class="step-title" style="color:var(--amber)">Require Appropriate Approval</div>
        <div class="step-desc">Human authority or conditional auto-approval</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center;background:linear-gradient(135deg,rgba(59,130,246,.08),rgba(59,130,246,.02));border-color:var(--blue)">
        <div class="step-title" style="color:var(--blue)">Execute SG Rule Revocation</div>
        <div class="step-desc">Governed Executor Bridge dispatches the operation</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Verify</div>
        <div class="step-desc">Technical verification — did the rule change apply?</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center">
        <div class="step-title">Maintain Rollback Capability</div>
        <div class="step-desc">Rule state snapshot captured before execution</div>
      </div>
      <div class="flow-arrow-down">↓</div>

      <div class="flow-step" style="justify-content:center;text-align:center;background:linear-gradient(135deg,rgba(16,185,129,.08),rgba(16,185,129,.02));border-color:var(--emerald)">
        <div class="step-title" style="color:var(--emerald)">Capture Evidence</div>
        <div class="step-desc">Complete audit trail of decision, approval, execution, and outcome</div>
      </div>

    </div>
  </div>
</section>
```

#### Section D — Trusted Boundary

```html
<section class="page-section" id="platform-trusted">
  <div class="section-inner">
    <h2>A Trusted Boundary for Platform Automation</h2>
    <h3>AEGIS deliberately separates knowing about an operation from trusting it for governed execution. Operational actions graduate through explicit stages before they are eligible for autonomous execution.</h3>
    <hr class="section-divider">

    <div class="step-list">

      <div class="step-list-item">
        <div class="step-list-num">1</div>
        <div class="step-list-text">
          <strong>Operation Implemented</strong>
          The operational action is built and available in the executor library.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">2</div>
        <div class="step-list-text">
          <strong>Technical Safety Validated</strong>
          Pre-execution guards verified (e.g. ACTIVE state, min/max bounds, safety limits).
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">3</div>
        <div class="step-list-text">
          <strong>Risk Semantics</strong>
          Action classified with destructive-action characteristics and reversibility.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">4</div>
        <div class="step-list-text">
          <strong>Blast-Radius Evaluation</strong>
          Resource and service dependency graph used to scope potential impact.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">5</div>
        <div class="step-list-text">
          <strong>Policy &amp; Authority</strong>
          Tenant-defined rules determine: block, escalate, require human approval, or conditionally auto-approve.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">6</div>
        <div class="step-list-text">
          <strong>Rollback Semantics</strong>
          Rollback information captured from pre-change state before execution begins.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item">
        <div class="step-list-num">7</div>
        <div class="step-list-text">
          <strong>Verification</strong>
          Technical verification confirms the infrastructure change took effect; recovery verification confirms the original condition improved.
        </div>
      </div>
      <div class="step-list-connector">↓</div>

      <div class="step-list-item" style="border-color:var(--emerald);background:linear-gradient(135deg,rgba(16,185,129,.08),rgba(16,185,129,.02))">
        <div class="step-list-num" style="background:rgba(16,185,129,.18);color:var(--emerald)">✓</div>
        <div class="step-list-text">
          <strong style="color:var(--emerald)">Trusted Governed Execution</strong>
          The operation is eligible for the full Governance V2 lifecycle, including conditional autonomy where policy permits.
        </div>
      </div>

    </div>
  </div>
</section>
```

#### Section E — Outcome Transformation Table

```html
<section class="page-section" id="platform-outcomes">
  <div class="section-inner">
    <h2>The Platform Engineer Outcome</h2>
    <h3>With AEGIS, Platform Engineers move from reactive tooling to governed platform operations.</h3>
    <hr class="section-divider">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Without AEGIS</th>
            <th>With AEGIS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="col-before">Alerts</td><td class="col-after">Situations</td></tr>
          <tr><td class="col-before">Resources</td><td class="col-after">Operational Context</td></tr>
          <tr><td class="col-before">Terraform</td><td class="col-after">Desired State + Drift</td></tr>
          <tr><td class="col-before">Scripts</td><td class="col-after">Governed Operations</td></tr>
          <tr><td class="col-before">Commands</td><td class="col-after">Risk-Assessed Decisions</td></tr>
          <tr><td class="col-before">Manual Impact Checks</td><td class="col-after">Blast-Radius Analysis</td></tr>
          <tr><td class="col-before">Static Runbooks</td><td class="col-after">Context-Aware Remediation</td></tr>
          <tr><td class="col-before">Generic Approvals</td><td class="col-after">Policy-Based Authority</td></tr>
          <tr><td class="col-before">API Success</td><td class="col-after">Verified Outcomes</td></tr>
          <tr><td class="col-before">Manual Recovery</td><td class="col-after">Rollback-Aware Operations</td></tr>
          <tr><td class="col-before">Manual Audit Notes</td><td class="col-after">Decision Evidence</td></tr>
          <tr><td class="col-before">Repeated Troubleshooting</td><td class="col-after">Operational Memory</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

#### Section F — CTA Strip

```html
<section class="page-section" id="platform-cta">
  <div class="section-inner" style="text-align:center">
    <h2>Govern your platform operations</h2>
    <p style="max-width:540px;margin:12px auto 0">Work with us to shape how AEGIS governs Kubernetes, cloud, and Terraform operations.</p>
    <div class="cta-strip">
      <a href="index.html#partner" class="btn-cta-primary">Become a Design Partner</a>
      <a href="aegis-sales-page.html" class="btn-cta-secondary">Learn more about AEGIS</a>
    </div>
  </div>
</section>
```

---

## 5. Footer and Back-to-Top

Copy the `<footer class="site-footer">` block from `aegis-sales-page.html` verbatim. No changes needed.

Copy the `<button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>` element verbatim.

---

## 6. JavaScript

The complete `<script>` block must implement the following logic. Place it immediately before `</body>`.

```javascript
// ─── Tab descriptions ────────────────────────────────────────────
const TAB_DESCRIPTIONS = {
  devops:   'How AEGIS helps DevOps engineers move from alert noise to safe, governed operational action.',
  sre:      'How AEGIS gives SRE teams a closed operational loop: detect, decide, govern, execute, verify, and learn.',
  platform: 'How AEGIS governs Kubernetes, cloud infrastructure, and Terraform operations for Platform Engineers.'
};

// ─── activateTab ─────────────────────────────────────────────────
// tabId must be one of: 'devops' | 'sre' | 'platform'
function activateTab(tabId) {
  const allTabs   = document.querySelectorAll('[role="tab"]');
  const allPanels = document.querySelectorAll('[role="tabpanel"]');

  // 1. Update tab buttons
  allTabs.forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });

  // 2. Hide all panels synchronously
  allPanels.forEach(panel => {
    panel.classList.remove('active', 'visible');
    panel.style.display = 'none';
    panel.setAttribute('aria-hidden', 'true');
  });

  // 3. Show target panel — set display:block first, then trigger
  //    opacity transition on next paint
  const target = document.getElementById('panel-' + tabId);
  if (!target) return;
  target.style.display = 'block';
  target.removeAttribute('aria-hidden');
  target.classList.add('active');
  // Allow browser to register display:block before starting opacity transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add('visible');
    });
  });

  // 4. Update descriptor text
  const desc = document.getElementById('roleTabDesc');
  if (desc) desc.textContent = TAB_DESCRIPTIONS[tabId] || '';

  // 5. Update URL without page reload
  const url = new URL(window.location.href);
  url.searchParams.set('role', tabId);
  history.replaceState(null, '', url.toString());
}

// ─── Initialise from ?role param ─────────────────────────────────
(function initTabs() {
  const validTabs = ['devops', 'sre', 'platform'];
  const param = new URLSearchParams(window.location.search).get('role');
  const initial = validTabs.includes(param) ? param : 'devops';
  activateTab(initial);
})();

// ─── Keyboard navigation ─────────────────────────────────────────
document.getElementById('roleTabs').addEventListener('keydown', function(e) {
  const tabs = Array.from(this.querySelectorAll('[role="tab"]'));
  const focusedIndex = tabs.indexOf(document.activeElement);
  if (focusedIndex === -1) return;

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    const next = tabs[(focusedIndex + 1) % tabs.length];
    next.focus();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = tabs[(focusedIndex - 1 + tabs.length) % tabs.length];
    prev.focus();
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    activateTab(document.activeElement.dataset.tab);
  }
});

// ─── Tab click ───────────────────────────────────────────────────
document.getElementById('roleTabs').addEventListener('click', function(e) {
  const btn = e.target.closest('[role="tab"]');
  if (btn) activateTab(btn.dataset.tab);
});

// ─── Scroll progress bar ─────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
const topNav         = document.getElementById('topNav');
const backToTop      = document.getElementById('backToTop');
const navLinks       = document.querySelectorAll('.top-nav-links a');
const sections       = document.querySelectorAll('.page-section');

function updateScrollProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';

  topNav.classList.toggle('scrolled', scrollTop > 20);

  backToTop.classList.toggle('show', scrollTop > window.innerHeight * 0.5);

  let current = '';
  sections.forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.top <= 200 && r.bottom > 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ─── Back-to-top ─────────────────────────────────────────────────
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── IntersectionObserver for .page-section fade-in ─────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

sections.forEach(s => {
  if (!s.classList.contains('visible')) fadeObserver.observe(s);
});
```

### 6.1 `activateTab` logic — detailed notes

- `display:none` is set synchronously on all panels before the target panel is shown. This prevents any flash of hidden-but-visible content.
- The double `requestAnimationFrame` is required because setting `display:block` and adding `.visible` (which triggers the `opacity` transition) in the same frame produces no visual transition — the browser needs at least one frame to register the display change first.
- `aria-hidden="true"` is set on every hidden panel and removed (not set to `"false"`) on the active panel.
- `history.replaceState` is called after DOM updates to avoid any race condition with the URL-reading init logic.

---

## 7. Modifications to Existing Files

### 7.1 `src/index.html`

Locate the `.nav-menu` block. Find the existing `<a href="platform-architecture.html" class="nav-link">Architecture</a>` link. Insert the following line immediately after it, before the `<a href="#partner" class="nav-cta">` button:

```html
<a href="aegis-for-teams.html" class="nav-link">AEGIS for Teams</a>
```

### 7.2 `src/aegis-sales-page.html`

Locate the four cards in the "Who It's For" (`#audience`) section inside `.card-grid`. Each card currently has the pattern:

```html
<div class="card card-gradient-brand" style="…">
  <div class="icon-circle" …>…</div>
  <div style="font-weight:700;font-size:1rem">Platform Engineering</div>
</div>
```

Wrap each card `<div>` in an `<a>` tag as follows. Do not change any attributes or styles on the inner div.

**Platform Engineering card:**
```html
<a href="aegis-for-teams.html?role=platform" style="text-decoration:none;color:inherit;display:block;cursor:pointer">
  <!-- existing .card div unchanged -->
</a>
```

**DevOps card:**
```html
<a href="aegis-for-teams.html?role=devops" style="text-decoration:none;color:inherit;display:block;cursor:pointer">
  <!-- existing .card div unchanged -->
</a>
```

**Site Reliability Engineering card:**
```html
<a href="aegis-for-teams.html?role=sre" style="text-decoration:none;color:inherit;display:block;cursor:pointer">
  <!-- existing .card div unchanged -->
</a>
```

**Cloud Operations card:**
```html
<a href="aegis-for-teams.html" style="text-decoration:none;color:inherit;display:block;cursor:pointer">
  <!-- existing .card div unchanged -->
</a>
```

The existing `.card:hover` CSS (transform + border-color change) continues to work because the `<a>` wrapper is `display:block` and the hover styles target the inner `.card` div.

---

## 8. Section Gradient Dividers

Inside each role panel, between every pair of adjacent `.page-section` elements, insert:

```html
<div class="section-gradient-divider"></div>
```

The pattern for each panel body is:

```
<section class="page-section" id="…-intro">…</section>
<div class="section-gradient-divider"></div>
<section class="page-section" id="…-[b]">…</section>
<div class="section-gradient-divider"></div>
…
<section class="page-section" id="…-cta">…</section>
```

Do **not** insert a divider between the hero section and the panel wrappers — the `<div class="section-gradient-divider"></div>` immediately after the `<section id="hero">` closing tag (in the top-level body order from section 3.2) provides that visual separation.

---

## 9. Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Tab exclusivity invariant

*For any* tab activation event (click, keyboard Enter/Space, or URL-driven initial load), exactly one role panel SHALL have `display:block` and `class` including `active`; all other role panels SHALL have `display:none` and `aria-hidden="true"`.

**Validates: Requirements 4.1, 4.7, 4.8, 12.5, 12.6**

---

### Property 2: ARIA consistency with visibility

*For any* state of the tab switcher, the `aria-selected` attribute on each tab button SHALL be `"true"` if and only if that button's associated panel is currently visible (i.e. has `class="role-panel active visible"`), and `"false"` on all other tab buttons.

**Validates: Requirements 4.2, 12.2, 12.3**

---

### Property 3: URL round-trip fidelity

*For any* valid role value `v ∈ {devops, sre, platform}`, activating the tab for `v` SHALL set the URL query parameter `?role=v`; subsequently loading the page with `?role=v` in the URL SHALL activate tab `v` as the initial state.

**Validates: Requirements 4.3, 4.4**

---

### Property 4: Audience card link correctness

*For any* role card on `aegis-sales-page.html`, the wrapping `<a>` element's `href` attribute SHALL contain the role query parameter matching that card's engineering role (or no parameter for Cloud Operations), and the card's visual appearance (computed styles for background, border, colour, and hover transform) SHALL be identical before and after the `<a>` wrapper is added.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

---

### Property 5: Lifecycle flow step count invariant

*For any* rendered role panel, the number of `.flow-step` elements inside that panel's lifecycle flow component SHALL equal the count defined in the requirements: 8 for DevOps, 9 for SRE, and 6 for Platform Engineer.

**Validates: Requirements 5.3, 6.3, 7.3**

---

## 10. Component Reuse Summary

| Component | Source | Used in |
|-----------|--------|---------|
| `.top-nav` | `aegis-sales-page.html` | `aegis-for-teams.html` |
| `.page-section` | `aegis-sales-page.html` | All sections in all panels |
| `.hero-section` + `.hero-bg` | `aegis-sales-page.html` | Hero |
| `.flow` + `.flow-step` + `.flow-arrow` + `.flow-arrow-down` | `aegis-sales-page.html` | All lifecycle flows |
| `.two-col` | `aegis-sales-page.html` | DevOps Section B |
| `.card-grid-2`, `.card-grid-3` + `.card` | `aegis-sales-page.html` | All capability grids |
| `.badge` | `aegis-sales-page.html` | Progressive Autonomy labels, step numbers, governance verdicts |
| `.table-wrap` + `table` | `aegis-sales-page.html` | All tables |
| `.section-gradient-divider` | `aegis-sales-page.html` | Between every section pair |
| `.site-footer`, `.back-to-top` | `aegis-sales-page.html` | Footer, scroll-to-top |
| `aegis-logo.svg` | existing asset | Nav, hero, footer |
| `universal-intelligence-logo.svg` | existing asset | Footer |

---

## 11. Notes for Implementer

1. **CSS class copy order matters.** Copy all existing classes first, then append the new tab/panel classes from section 2.3. Do not interleave them — specificity depends on order.

2. **`role-panel` opacity transition.** The `display:none → display:block → opacity:0 → opacity:1` sequence is the only reliable way to animate opacity while also truly removing the element from layout. The double `requestAnimationFrame` in `activateTab` is deliberate and must not be removed or collapsed into a single rAF.

3. **IntersectionObserver and hidden panels.** The `fadeObserver` observes all `.page-section` elements at document load. Sections inside hidden panels are technically in the DOM but not visible. They will not fire IntersectionObserver callbacks until their parent panel is shown. This is the correct behaviour — sections fade in naturally as the user scrolls after switching to a tab.

4. **Content fidelity.** All table rows, lifecycle flow labels, and step text in this document are sourced directly from `plan/req-page.md`. Do not paraphrase or shorten table cells. Card descriptions (2–3 sentences each) are summaries — do not copy full paragraphs verbatim from req-page.md into card bodies.

5. **No new assets.** Every image reference uses `aegis-logo.svg` or `universal-intelligence-logo.svg`. No additional SVG, PNG, or icon font is required.

6. **CSP `connect-src`**. The `aegis-for-teams.html` page has no contact form and makes no API calls, so `connect-src 'self'` (without the API Gateway domain) is correct.

---

## Architecture

This feature is a client-side static HTML page. There is no server-side component, no API, and no build pipeline.

### Deployment topology

```
Browser
  └── aegis-for-teams.html  (static file, served from same origin as other HTML files)
        ├── aegis-logo.svg        (existing asset, reused)
        └── universal-intelligence-logo.svg  (existing asset, reused)
```

### Page architecture

The page is a single HTML document containing all CSS in a `<style>` block and all JavaScript in a `<script>` block. No module system, bundler, or external runtime is involved.

Tab state lives entirely in the browser: active tab ID is stored in the URL query parameter `?role` (written via `history.replaceState`) and in the CSS classes applied to DOM elements.

### Modification surface for existing files

- `src/index.html` — one `<a>` element added to `.nav-menu`
- `src/aegis-sales-page.html` — four existing card `<div>` elements wrapped in `<a>` elements

No other existing files are modified.

---

## Components and Interfaces

This page has no programmatic API. The components are HTML/CSS/JS constructs within a single file.

### Tab Switcher

| Property | Value |
|----------|-------|
| Container element | `<div role="tablist" id="roleTabs">` |
| Tab buttons | `<button role="tab" data-tab="{devops|sre|platform}">` |
| Panels | `<div role="tabpanel" id="panel-{devops|sre|platform}">` |
| State carrier | URL query param `?role=` + CSS classes `.active` / `.visible` on panels |
| Public function | `activateTab(tabId: string): void` |
| Events handled | `click` on tablist, `keydown` (ArrowLeft, ArrowRight, Enter, Space) on tablist |

### Scroll Progress Bar

| Property | Value |
|----------|-------|
| Element | `<div id="scrollProgress">` |
| Driven by | `window.scroll` event → `scrollProgress.style.width = pct + '%'` |

### Back-to-Top Button

| Property | Value |
|----------|-------|
| Element | `<button id="backToTop">` |
| Visibility | `.show` class toggled when `scrollY > window.innerHeight * 0.5` |
| Action | `window.scrollTo({ top: 0, behavior: 'smooth' })` on click |

### Section Fade-In

| Property | Value |
|----------|-------|
| Target elements | `.page-section` |
| Mechanism | `IntersectionObserver` adds `.visible` class when element enters viewport |
| Threshold | `0.08` with `rootMargin: '0px 0px -60px 0px'` |

### Navigation Active Link Tracking

| Property | Value |
|----------|-------|
| Target | `.top-nav-links a` elements |
| Mechanism | Scroll event scans `.page-section` `getBoundingClientRect()`, sets `.active` on matching anchor |

---

## Data Models

This page has no persistent data store, no database, and no API data models. All state is ephemeral and lives in the browser.

### Tab State

```
TabId = "devops" | "sre" | "platform"

ActiveTabState {
  tabId: TabId               -- Which tab is currently selected
  urlParam: string           -- "?role=<tabId>" written to URL via history.replaceState
  activeButton: HTMLElement  -- The <button> with class="role-tab active" and aria-selected="true"
  activePanel: HTMLElement   -- The <div> with class="role-panel active visible" and no aria-hidden
}
```

### Tab Descriptions Map

```
TAB_DESCRIPTIONS: Record<TabId, string>
  devops   -> "How AEGIS helps DevOps engineers move from alert noise to safe, governed operational action."
  sre      -> "How AEGIS gives SRE teams a closed operational loop: detect, decide, govern, execute, verify, and learn."
  platform -> "How AEGIS governs Kubernetes, cloud infrastructure, and Terraform operations for Platform Engineers."
```

No other data models exist. All page content is static HTML.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system.*

### Property 1: Tab exclusivity invariant

*For any* tab activation event (click, keyboard Enter/Space, or URL-driven initial load), exactly one role panel SHALL have `display:block` and `class` including `active`; all other role panels SHALL have `display:none` and `aria-hidden="true"`.

**Validates: Requirements 4.1, 4.7, 4.8, 12.5, 12.6**

### Property 2: ARIA consistency with visibility

*For any* state of the tab switcher, the `aria-selected` attribute on each tab button SHALL be `"true"` if and only if that button's associated panel is currently visible, and `"false"` on all other tab buttons.

**Validates: Requirements 4.2, 12.2, 12.3**

### Property 3: URL round-trip fidelity

*For any* valid role value `v ∈ {devops, sre, platform}`, activating the tab for `v` SHALL set the URL query parameter `?role=v`; subsequently loading the page with `?role=v` in the URL SHALL activate tab `v` as the initial state.

**Validates: Requirements 4.3, 4.4**

### Property 4: Audience card link correctness

*For any* role card on `aegis-sales-page.html`, the wrapping `<a>` element's `href` SHALL contain the role query parameter matching that card's engineering role (or no parameter for Cloud Operations), and the card's visual appearance SHALL be identical before and after the `<a>` wrapper is added.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

### Property 5: Lifecycle flow step count invariant

*For any* rendered role panel, the number of `.flow-step` elements inside that panel's lifecycle flow SHALL equal: 8 for DevOps, 9 for SRE, and 6 for Platform Engineer.

**Validates: Requirements 5.3, 6.3, 7.3**

---

## Error Handling

This page has no network calls, no form submissions, and no external data dependencies. Error handling is limited to defensive JavaScript guards.

### URL query param — invalid `?role` value

If the `?role` query parameter contains an unrecognised value (e.g. `?role=invalid`), the `initTabs` function falls back to activating the `devops` tab. No error is thrown.

```javascript
const validTabs = ['devops', 'sre', 'platform'];
const param = new URLSearchParams(window.location.search).get('role');
const initial = validTabs.includes(param) ? param : 'devops';
```

### `activateTab` — unknown tabId

If `activateTab` is called with an unrecognised `tabId`, `document.getElementById('panel-' + tabId)` returns `null` and the function returns early via the `if (!target) return;` guard. No panel is shown; no error is thrown.

### Missing DOM elements

If `scrollProgress`, `topNav`, `backToTop`, or `roleTabs` elements are absent from the DOM, the scroll event handler and keyboard handler will throw. These elements are required markup and are always present in the correct implementation. No additional defensive guarding is needed beyond what is specified in the JavaScript section.

---

## Testing Strategy

All testing is manual in-browser verification. There is no automated test suite for this static HTML page.

### Task-level test criteria

Each task in `tasks.md` specifies a concrete manual test. These are:

| Task | Test focus |
|------|-----------|
| Task 1 | Nav renders, scroll progress animates, footer displays, back-to-top works |
| Task 2 | All 3 tabs toggle; URL updates; `?role=sre` on load activates SRE tab; keyboard nav works; `aria-selected` toggles |
| Task 3 | DevOps flow = 8 steps; table = 11 rows; HIGH/MEDIUM/AUTO/APPROVAL/BLOCK badges all render; CTA buttons link correctly |
| Task 4 | SRE flow = 9 steps; table = 13 rows; 10 loop cards; 4 autonomy cards; CTA buttons link correctly |
| Task 5 | Platform flow = 6 steps; 3 capability cards; Terraform drift comparison visible; security flow = 11 steps; step-list = 8 items; outcome table = 12 rows; CTA buttons link correctly |
| Task 6 | index.html "AEGIS for Teams" nav link works; sales page cards navigate to correct `?role=` URLs; card hover effects unchanged |

### Cross-cutting checks

- Open browser DevTools console — no JavaScript errors on load or tab switch
- Test at 1280px, 900px, and 375px widths — layout collapses correctly
- Tab through all interactive elements with keyboard — focus order is logical
- Test `?role=devops`, `?role=sre`, `?role=platform`, `?role=invalid`, and no param in URL — all activate correct initial tab
