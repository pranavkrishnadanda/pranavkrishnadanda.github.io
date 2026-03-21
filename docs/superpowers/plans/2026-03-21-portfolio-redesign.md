# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Pranav's personal portfolio to target full-time Software Engineer roles at FAANG and top tech companies by fixing misleading stats, adding personal projects, removing the typing animation, and adding blog/resume sections.

**Architecture:** Single-page static HTML/CSS/JS site. All changes are in three files: `index.html` (structure and content), `css/style.css` (all styling), and `js/main.js` (interactivity). No build tools, no framework, no package manager — changes are direct file edits.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES5-compatible, IIFE pattern), Google Fonts (already loaded)

**Spec:** `docs/superpowers/specs/2026-03-21-portfolio-redesign-design.md`

**Verification method:** This is a static site with no test framework. Each task's verification step is: open `index.html` in a browser (or refresh if already open) and visually confirm the change. Use browser DevTools console to check for JS errors.

---

## File Map

| File | Role | Changes |
|---|---|---|
| `index.html` | All HTML structure and content | Tasks 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |
| `css/style.css` | All styling | Tasks 2, 3, 4, 5, 7, 8, 9, 10 |
| `js/main.js` | Navbar, scroll, counters, typing animation | Tasks 3, 7 |

---

## Task 1: Update Meta Tags and Page Title

**Files:**
- Modify: `index.html:1-19`

- [ ] **Step 1: Update the `<title>` tag**

In `index.html` line 6, change:
```html
<title>Pranav Krishna Danda | AI Engineer</title>
```
To:
```html
<title>Pranav Krishna Danda | Software Engineer</title>
```

- [ ] **Step 2: Update the meta description**

In `index.html` line 7, change:
```html
<meta name="description" content="AI Engineer building autonomous agents, RAG pipelines, and production ML systems. Full-stack across Python, TypeScript, AWS, and PostgreSQL at scale.">
```
To:
```html
<meta name="description" content="Software Engineer building autonomous AI agents, backend infrastructure, and LLM pipelines at production scale.">
```

- [ ] **Step 3: Update Open Graph title**

In `index.html` line 12, change:
```html
<meta property="og:title" content="Pranav Krishna Danda | AI Engineer">
```
To:
```html
<meta property="og:title" content="Pranav Krishna Danda | Software Engineer">
```

- [ ] **Step 4: Update Open Graph description**

In `index.html` line 13, change:
```html
<meta property="og:description" content="AI Engineer building autonomous agents that replace manual workflows at production scale.">
```
To:
```html
<meta property="og:description" content="Software Engineer building autonomous AI agents and backend infrastructure at production scale.">
```

- [ ] **Step 5: Verify**

Open `index.html` in browser. Open DevTools > Elements > `<head>`. Confirm all four meta tag values match the new text. Check browser tab title shows "Pranav Krishna Danda | Software Engineer".

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: update meta tags to Software Engineer positioning"
```

---

## Task 2: Update Navigation

**Files:**
- Modify: `index.html:36-48`
- Modify: `css/style.css:87` (active nav selector)
- Modify: `js/main.js:87` (active nav selector)

- [ ] **Step 1: Add Blog nav link**

In `index.html`, find the `<ul class="nav-menu">` block (lines 36-48). Add Blog link before the Let's Talk item:
```html
<li><a href="#blog" class="nav-link">Blog</a></li>
```
So the list reads: About, Experience, Projects, Skills, **Blog**, Let's Talk.

- [ ] **Step 2: Add Download Resume nav link**

After the Let's Talk `<li>`, add:
```html
<li><a href="#" class="nav-link nav-link--resume" target="_blank" rel="noopener">Download Resume</a></li>
```

- [ ] **Step 3: Style the Resume nav button**

In `css/style.css`, find the `.nav-link--cta` block (around line 191). Add a new rule after it:
```css
.nav-link--resume {
    background: var(--accent-secondary);
    color: var(--bg-primary);
    padding: 8px 20px;
    border-radius: 100px;
    font-weight: 600;
}

.nav-link--resume::after { display: none; }

.nav-link--resume:hover {
    background: #06b6d4;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(34, 211, 238, 0.3);
}
```

- [ ] **Step 4: Fix active nav link selector to exclude resume button**

In `js/main.js` line 87, change:
```js
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');
```
To:
```js
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta):not(.nav-link--resume)');
```

- [ ] **Step 5: Verify**

Refresh browser. Confirm nav shows: About · Experience · Projects · Skills · Blog · Let's Talk · Download Resume. The Download Resume button should have a cyan tint. Clicking "Blog" should smooth-scroll (will fail until blog section exists — that's expected). Check DevTools console for JS errors — there should be none.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: add Blog and Download Resume links to nav"
```

---

## Task 3: Update Hero Section

**Files:**
- Modify: `index.html:52-84`
- Modify: `css/style.css` (remove typing CSS, add hero-subtitle, hero-resume-link)
- Modify: `js/main.js:8-49` (remove typing animation)

- [ ] **Step 1: Remove typing animation from `js/main.js`**

Delete lines 8-49 of `js/main.js` — the entire `// ---------- Typing Effect ----------` block, from the comment through `if (typingElement) { setTimeout(type, 1000); }`.

The file should go directly from `'use strict';` to `// ---------- Navbar Scroll ----------`.

- [ ] **Step 2: Remove typing HTML from `index.html`**

Find and delete the entire `.hero-title` div in the hero section:
```html
<div class="hero-title reveal">
    <span class="typing-text" id="typingText"></span>
    <span class="typing-cursor">|</span>
</div>
```

- [ ] **Step 3: Add static subtitle to `index.html`**

Directly after `<h1 class="hero-name reveal">`, add:
```html
<p class="hero-subtitle reveal">Software Engineer</p>
```

- [ ] **Step 4: Update hero description text**

Find `<p class="hero-description reveal">` and replace its content with:
```html
<p class="hero-description reveal">
    Building production AI systems — autonomous agents,
    backend infrastructure, and LLM pipelines at scale.
</p>
```

- [ ] **Step 5: Add Download Resume link to hero CTA**

Find the `.hero-cta` div. After the existing two buttons, add:
```html
<a href="#" class="hero-resume-link" target="_blank" rel="noopener">Download Resume</a>
```

- [ ] **Step 6: Remove typing CSS from `css/style.css`**

Search for and delete these CSS rules:
- `.typing-cursor { ... }` block
- `@keyframes blink { ... }` block (if it exists)
- `.hero-title { ... }` block (search for it — if it only styles the now-removed div, delete it; if shared, keep it)

- [ ] **Step 7: Add new CSS for subtitle and resume link**

Add to `css/style.css` in the Hero section (after `.hero-description`):
```css
.hero-subtitle {
    font-family: var(--font-heading);
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 500;
    color: var(--accent-primary);
    margin-bottom: 16px;
}

.hero-resume-link {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition);
    align-self: center;
}

.hero-resume-link:hover {
    color: var(--text-primary);
}
```

- [ ] **Step 8: Verify**

Refresh browser. Confirm:
- Hero shows "Software Engineer" as a static colored subtitle — no typing animation
- Description reads "I build autonomous AI systems and backend infrastructure..."
- Three elements in the CTA row: View My Work button, Get In Touch button, Download Resume text link
- No JS errors in DevTools console

- [ ] **Step 9: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: replace typing animation with static Software Engineer title"
```

---

## Task 4: Add Currently Building Strip

**Files:**
- Modify: `index.html` (add new div between hero and about)
- Modify: `css/style.css` (add strip styles)

- [ ] **Step 1: Add HTML to `index.html`**

Find the closing `</section>` of the hero section (line ~84) and the opening `<section id="about"` line. Between them, insert:
```html
<!-- ========== CURRENTLY BUILDING ========== -->
<div class="currently-building">
    <div class="container">
        <span class="currently-building-dot"></span>
        Currently Building &rarr; Scaled Autonomous Agentic Systems
    </div>
</div>
```

- [ ] **Step 2: Add CSS to `css/style.css`**

Add after the Hero section CSS (before the About section CSS):
```css
/* ---------- Currently Building Strip ---------- */
.currently-building {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 12px 0;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.currently-building-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-primary);
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    top: -1px;
}
```

- [ ] **Step 3: Verify**

Refresh browser. Scroll past the hero. A slim dark strip should appear reading "● Currently Building → Scaled Autonomous Agentic Systems" in monospace font with a purple dot. Check it renders correctly on mobile width (DevTools responsive mode).

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add Currently Building strip between hero and about"
```

---

## Task 5: Rewrite About Section

**Files:**
- Modify: `index.html:87-132`
- Modify: `css/style.css` (add open-to-work, open-dot, pulse-dot, stat-sublabel)

- [ ] **Step 1: Replace bio text in `index.html`**

Find the `<div class="about-text reveal">` block (lines 91-107). Replace its entire content with:
```html
<div class="about-text reveal">
    <p class="about-lead">
        Software Engineer with <strong>1+ year of production experience</strong> building
        autonomous AI agents, backend systems, and LLM pipelines.
    </p>
    <p>
        Currently at <strong>Oovacha</strong>, automating clinical data workflows across
        27 trial sites. Previously at <strong>Mushroom Solutions</strong> building
        deep learning classification systems.
    </p>
    <p>
        Based in <strong>Hyderabad, India</strong>. B.Tech in Computer Science &amp; Engineering
        (AI &amp; ML) from VVIT.
    </p>
    <div class="open-to-work">
        <span class="open-dot"></span>
        Open to full-time roles
    </div>
</div>
```

- [ ] **Step 2: Replace all four stat cards in `index.html`**

Find the `<div class="stats-grid reveal">` block (lines 108-129). Delete all four existing `<div class="stat-card">` elements and replace with:
```html
<div class="stats-grid reveal">
    <div class="stat-card">
        <span class="stat-number" data-target="3">0</span>
        <span class="stat-label">AI Agents Shipped</span>
        <span class="stat-sublabel">In production</span>
    </div>
    <div class="stat-card">
        <span class="stat-number">78.6K</span>
        <span class="stat-suffix">+</span>
        <span class="stat-label">Records Processed</span>
        <span class="stat-sublabel">Clinical data</span>
    </div>
    <div class="stat-card">
        <span class="stat-number" data-target="22">0</span>
        <span class="stat-suffix"> hrs/week</span>
        <span class="stat-label">Time Automated</span>
        <span class="stat-sublabel">Manual work eliminated</span>
    </div>
    <div class="stat-card">
        <span class="stat-number">97.8</span>
        <span class="stat-suffix">%</span>
        <span class="stat-label">Model Accuracy</span>
        <span class="stat-sublabel">Peak classification</span>
    </div>
</div>
```

- [ ] **Step 3: Add CSS to `css/style.css`**

Add after the existing `.stat-label` rule:
```css
.stat-sublabel {
    display: block;
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 2px;
    font-style: italic;
}

.open-to-work {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 20px;
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.open-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    animation: pulse-dot 2s infinite;
    flex-shrink: 0;
}

@keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}
```

- [ ] **Step 4: Verify**

Refresh browser and scroll to About. Confirm:
- Bio is 3 short paragraphs — no mention of 151 tables or 86 APIs
- Green pulsing dot + "Open to full-time roles" badge visible
- 4 stat cards show: "3 AI Agents Shipped", "78.6K+ Records Processed", "22 hrs/week Time Automated", "97.8% Model Accuracy"
- Cards 1 and 3 animate (counter counts up) — cards 2 and 4 are static
- Each card has a small italic sublabel below the main label
- No JS errors in console

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: rewrite About section with correct stats and open-to-work badge"
```

---

## Task 6: Rewrite Experience Section

**Files:**
- Modify: `index.html:135-185`

- [ ] **Step 1: Replace Oovacha bullet list**

Find the first `<ul class="timeline-points">` inside the Oovacha timeline card. Delete its existing `<li>` items and replace with:
```html
<ul class="timeline-points">
    <li>Built <strong>3 autonomous AI agent systems</strong> from scratch — an inline clinical query agent, an EDC validation engine, and a Claude-powered multi-tool framework — now live across <strong>27 clinical trial sites</strong></li>
    <li>Designed and shipped a <strong>message-driven validation pipeline</strong> processing <strong>78.6K+ clinical records</strong> against 77 configurable rules, catching discrepancies before human reviewers ever see them</li>
    <li>Selected <strong>SQS over direct API calls</strong> to guarantee message durability and decouple processing load from clinical data ingestion</li>
    <li>Architected backend infrastructure across <strong>AWS ECS Fargate, Aurora PostgreSQL, SQS, S3, and Cognito</strong></li>
    <li>Integrated custom <strong>MCP servers</strong> into AI pipelines, enabling natural language querying of production clinical databases</li>
</ul>
```

- [ ] **Step 2: Update Oovacha tech tags**

Find the `<div class="timeline-tags">` for Oovacha. Replace its content with:
```html
<div class="timeline-tags">
    <span>Python</span><span>Claude API</span><span>MCP</span><span>FastAPI</span><span>AWS</span><span>PostgreSQL</span><span>SQS</span>
</div>
```

- [ ] **Step 3: Update Mushroom Solutions role title**

Find `<h3 class="timeline-role">Machine Learning Engineer Intern</h3>` and change it to:
```html
<h3 class="timeline-role">ML Engineer Intern</h3>
```

- [ ] **Step 4: Replace Mushroom Solutions bullet list**

Find the second `<ul class="timeline-points">`. Delete its `<li>` items and replace with:
```html
<ul class="timeline-points">
    <li>Trained deep learning classification models hitting <strong>97.8% accuracy</strong> on 15,400+ records — automated 17 workflows, eliminating <strong>22 hrs/week</strong> of manual processing</li>
    <li>Built an intelligent <strong>RAG chatbot</strong> combining Azure AI Search + FAISS with Redis caching, serving <strong>5,000 queries/day</strong></li>
    <li>Shipped <strong>Django REST APIs</strong> with role-based access control, serving ML inference across 4 internal teams</li>
    <li>Covered agent tool execution and edge cases with <strong>end-to-end test automation</strong> using Behave BDD</li>
</ul>
```

- [ ] **Step 5: Update Mushroom Solutions tech tags**

Find the `<div class="timeline-tags">` for Mushroom Solutions. Replace its content with:
```html
<div class="timeline-tags">
    <span>TensorFlow</span><span>Keras</span><span>FAISS</span><span>Django</span><span>Redis</span><span>Azure AI Search</span>
</div>
```

- [ ] **Step 6: Verify**

Refresh and scroll to Experience. Confirm:
- Oovacha has 5 bullets, starting with "Built 3 autonomous AI agent systems from scratch"
- Third bullet mentions SQS architecture decision reasoning
- No mention of "151 tables", "86 APIs", or "48,000 records"
- Mushroom Solutions role title reads "ML Engineer Intern"
- Mushroom Solutions has 4 bullets with 97.8% and 22 hrs/week
- Tech tags match the spec

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: rewrite Experience bullets with impact-first language and correct metrics"
```

---

## Task 7: Rebuild Projects Section with Tab Switcher

**Files:**
- Modify: `index.html:188-248`
- Modify: `css/style.css` (add tab, badge, github link, repo note CSS)
- Modify: `js/main.js` (add tab switcher JS)

- [ ] **Step 1: Add project badge, github link, repo note CSS to `css/style.css`**

Add after the existing project card CSS block:
```css
/* ---------- Project Badges ---------- */
.project-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 100px;
    margin-bottom: 12px;
}

.project-badge--production {
    background: rgba(34, 211, 238, 0.1);
    color: var(--accent-cyan);
    border: 1px solid rgba(34, 211, 238, 0.2);
}

.project-badge--personal {
    background: rgba(167, 139, 250, 0.1);
    color: var(--accent-purple);
    border: 1px solid rgba(167, 139, 250, 0.2);
}

.project-github-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    transition: color var(--transition);
}

.project-github-link:hover { color: var(--text-primary); }

.project-repo-note {
    margin-top: 12px;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-style: italic;
}

/* ---------- Projects Tab Switcher ---------- */
.projects-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--border);
}

.projects-tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 24px;
    font-size: 0.95rem;
    font-family: var(--font-body);
    color: var(--text-secondary);
    cursor: pointer;
    margin-bottom: -1px;
    transition: color var(--transition), border-color var(--transition);
}

.projects-tab.active {
    color: var(--accent-primary);
    border-bottom-color: var(--accent-primary);
}

.projects-tab:hover:not(.active) { color: var(--text-primary); }

.project-group.hidden { display: none; }
```

- [ ] **Step 2: Replace projects HTML in `index.html`**

Find the `<div class="projects-grid">` (line ~191) through its closing `</div>` (line ~248). Replace the entire inner content of `<section id="projects">` container div with:

```html
<h2 class="section-label reveal">Featured Projects</h2>

<div class="projects-tabs reveal">
    <button class="projects-tab active" data-group="work" role="tab" tabindex="0">Work</button>
    <button class="projects-tab" data-group="personal" role="tab" tabindex="0">Personal</button>
</div>

<!-- Work Projects -->
<div class="projects-grid project-group" data-group="work">

    <div class="project-card project-card--purple reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--production">Production</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93V12h3.5a2.75 2.75 0 0 1 2.75 2.75v1.32A4 4 0 0 1 17 24a4 4 0 0 1-2-7.46v-1.79h-6v1.79A4 4 0 0 1 7 24a4 4 0 0 1-2-7.46v-1.79A2.75 2.75 0 0 1 7.75 12h3.5V9.93A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/></svg>
            </div>
            <h3 class="project-title">Clinical AI Agent Framework</h3>
            <p class="project-description">3 autonomous agents with tool execution, error recovery, and MCP-based natural language querying of production PostgreSQL databases.</p>
            <div class="project-tech">
                <span>Python</span><span>Claude API</span><span>MCP</span><span>FastAPI</span>
            </div>
            <p class="project-repo-note">Proprietary — no public repo</p>
        </div>
        <div class="project-glow"></div>
    </div>

    <div class="project-card project-card--cyan reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--production">Production</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <h3 class="project-title">EDC Validation Engine</h3>
            <p class="project-description">Message-driven 3-stage pipeline processing 78.6K+ clinical records against 77 configurable rules. SQS-backed for message durability.</p>
            <div class="project-tech">
                <span>Python</span><span>SQS</span><span>PostgreSQL</span><span>AWS</span>
            </div>
            <p class="project-repo-note">Proprietary — no public repo</p>
        </div>
        <div class="project-glow"></div>
    </div>

    <div class="project-card project-card--orange reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--production">Production</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
            <h3 class="project-title">RAG Search Platform</h3>
            <p class="project-description">Hybrid vector + keyword search behind Django APIs. 5,000 queries/day, sub-second latency across 10,000+ document corpus with Redis caching.</p>
            <div class="project-tech">
                <span>FAISS</span><span>Azure AI Search</span><span>Redis</span><span>Django</span>
            </div>
            <p class="project-repo-note">Proprietary — no public repo</p>
        </div>
        <div class="project-glow"></div>
    </div>

</div>

<!-- Personal Projects -->
<div class="projects-grid project-group hidden" data-group="personal">

    <div class="project-card project-card--purple reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--personal">Personal</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3 class="project-title">Autonomous AI Coding Assistant</h3>
            <p class="project-description">MCP-powered coding assistant with file operations, intelligent code assistance, and project management. Built to explore agent tool-use patterns independently.</p>
            <div class="project-tech">
                <span>Python</span><span>MCP</span><span>Claude API</span>
            </div>
            <a href="https://github.com/pranavkrishnadanda/Autonomous-AI-Coding-Assistant" class="project-github-link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                View on GitHub
            </a>
        </div>
        <div class="project-glow"></div>
    </div>

    <div class="project-card project-card--cyan reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--personal">Personal</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 9 15 12 9 15"/></svg>
            </div>
            <h3 class="project-title">Claude Agent System</h3>
            <p class="project-description">Terminal-based agentic system with Ollama + MCP tools. Built as a local alternative to Claude Code architecture to understand agent loops under the hood.</p>
            <div class="project-tech">
                <span>Python</span><span>Ollama</span><span>MCP</span>
            </div>
            <a href="https://github.com/pranavkrishnadanda/Claude-Agent-System" class="project-github-link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                View on GitHub
            </a>
        </div>
        <div class="project-glow"></div>
    </div>

    <div class="project-card project-card--orange reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--personal">Personal</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <h3 class="project-title">Multimodal RAG System</h3>
            <p class="project-description">Retrieval system combining text and image embeddings for cross-modal document search and querying.</p>
            <div class="project-tech">
                <span>Python</span><span>Multimodal Embeddings</span><span>Vector DBs</span>
            </div>
            <a href="https://github.com/pranavkrishnadanda/Multimodal-Retrieval-Augmented-Generation-system" class="project-github-link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                View on GitHub
            </a>
        </div>
        <div class="project-glow"></div>
    </div>

    <div class="project-card project-card--purple reveal">
        <div class="project-card-inner">
            <span class="project-badge project-badge--personal">Personal</span>
            <div class="project-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            </div>
            <h3 class="project-title">AirDoc</h3>
            <p class="project-description">Touchfree PDF and image viewer controlled entirely by hand gestures. Built for accessibility and hands-free presentation workflows.</p>
            <div class="project-tech">
                <span>Python</span><span>Computer Vision</span><span>MediaPipe</span>
            </div>
            <a href="https://github.com/pranavkrishnadanda/AirDoc" class="project-github-link" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                View on GitHub
            </a>
        </div>
        <div class="project-glow"></div>
    </div>

</div>
```

- [ ] **Step 3: Add tab switcher JS to `js/main.js`**

Before the closing `})();` at the end of `main.js`, add:
```js
    // ---------- Projects Tab Switcher ----------
    var projectTabs = document.querySelectorAll('.projects-tab');
    projectTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var group = this.getAttribute('data-group');
            projectTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.project-group').forEach(function(g) {
                g.classList.toggle('hidden', g.getAttribute('data-group') !== group);
            });
        });
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
        });
    });
```

- [ ] **Step 4: Verify**

Refresh and scroll to Projects. Confirm:
- Tab switcher shows "Work" (active, purple underline) and "Personal"
- Work tab shows 3 cards — each has a cyan "Production" badge and "Proprietary — no public repo" note
- Click "Personal" — Work cards hide, 4 personal cards appear with purple "Personal" badge and GitHub links
- Click "Work" again — switches back
- GitHub links open correct repos in new tab
- No JS errors in console
- Works on mobile width (cards stack, tabs still clickable)

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: rebuild Projects section with Work/Personal tab switcher and 4 personal projects"
```

---

## Task 8: Rewrite Skills Section

**Files:**
- Modify: `index.html:251-341`
- Modify: `css/style.css` (add skill tier pseudo-element CSS)

- [ ] **Step 1: Add skill tier CSS to `css/style.css`**

Find the existing `.skill-tag` rule. Add after it:
```css
.skill-tag.skill-primary::before,
.skill-tag.skill-secondary::before,
.skill-tag.skill-familiar::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    vertical-align: middle;
    position: relative;
    top: -1px;
}

.skill-tag.skill-primary::before {
    background: var(--accent-primary);
}

.skill-tag.skill-secondary::before {
    border: 1.5px solid var(--text-secondary);
}

.skill-tag.skill-familiar::before {
    border: 1.5px dashed var(--text-muted);
}

.skill-tag.skill-familiar {
    opacity: 0.6;
    font-style: italic;
}
```

- [ ] **Step 2: Replace skills HTML in `index.html`**

Find the `<div class="skills-grid">` block. Replace its entire content with:
```html
<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        AI &amp; Agents
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-primary">Python</span>
        <span class="skill-tag skill-primary">Claude API</span>
        <span class="skill-tag skill-primary">MCP Protocol</span>
        <span class="skill-tag skill-primary">Autonomous Agents</span>
        <span class="skill-tag skill-secondary">FAISS</span>
        <span class="skill-tag skill-secondary">Hugging Face</span>
        <span class="skill-tag skill-secondary">Azure AI Search</span>
        <span class="skill-tag skill-familiar">TensorFlow</span>
        <span class="skill-tag skill-familiar">Keras</span>
    </div>
</div>

<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        Backend &amp; APIs
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-primary">FastAPI</span>
        <span class="skill-tag skill-primary">REST APIs</span>
        <span class="skill-tag skill-primary">SQLAlchemy</span>
        <span class="skill-tag skill-secondary">Django</span>
        <span class="skill-tag skill-secondary">Flask</span>
    </div>
</div>

<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
        Cloud &amp; Infrastructure
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-primary">AWS ECS Fargate</span>
        <span class="skill-tag skill-primary">SQS</span>
        <span class="skill-tag skill-primary">Aurora PostgreSQL</span>
        <span class="skill-tag skill-secondary">S3</span>
        <span class="skill-tag skill-secondary">Cognito</span>
        <span class="skill-tag skill-familiar">Docker</span>
    </div>
</div>

<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        Databases &amp; Messaging
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-primary">PostgreSQL</span>
        <span class="skill-tag skill-secondary">Redis</span>
        <span class="skill-tag skill-secondary">RabbitMQ</span>
    </div>
</div>

<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Frontend
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-secondary">TypeScript</span>
        <span class="skill-tag skill-secondary">Next.js</span>
        <span class="skill-tag skill-secondary">React</span>
    </div>
</div>

<div class="skill-category reveal">
    <h3 class="skill-category-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        Testing
    </h3>
    <div class="skill-tags">
        <span class="skill-tag skill-secondary">Behave BDD</span>
        <span class="skill-tag skill-secondary">Test Automation</span>
    </div>
</div>
```

- [ ] **Step 3: Verify**

Refresh and scroll to Skills. Confirm:
- Category "AI & Machine Learning" is now "AI & Agents"
- Category "Cloud & DevOps" is now "Cloud & Infrastructure"
- Primary tags have a solid purple dot prefix
- Secondary tags have an empty circle prefix
- Familiar tags (TensorFlow, Keras, Docker) are slightly faded and italic
- No "CI/CD" tag anywhere
- "AWS ECS Fargate" (not just "AWS ECS")
- "Autonomous Agents" is present under AI & Agents

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: rewrite Skills section with tier system and renamed categories"
```

---

## Task 9: Add Blog Section

**Files:**
- Modify: `index.html` (add new section between Skills closing and Contact opening)
- Modify: `css/style.css` (add blog CSS)

- [ ] **Step 1: Add blog CSS to `css/style.css`**

Add before the Contact section CSS:
```css
/* ============================================
   BLOG
   ============================================ */
.blog-intro {
    color: var(--text-secondary);
    margin-bottom: 40px;
    max-width: 600px;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
}

.blog-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 24px;
    transition: border-color var(--transition);
}

.blog-card--placeholder {
    opacity: 0.6;
    cursor: default;
}

.blog-card-icon {
    color: var(--text-muted);
    margin-bottom: 12px;
}

.blog-card-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 100px;
    background: rgba(100, 116, 139, 0.15);
    color: var(--text-muted);
    margin-bottom: 12px;
}

.blog-card-title {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.4;
}

.blog-subscribe {
    text-align: center;
}

.blog-subscribe-link {
    color: var(--accent-primary);
    font-size: 0.9rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition);
}

.blog-subscribe-link:hover { color: var(--accent-purple); }
```

- [ ] **Step 2: Add blog section HTML to `index.html`**

Find the closing `</section>` of the Skills section and the opening `<section id="contact"`. Between them, insert:
```html
<!-- ========== BLOG ========== -->
<section id="blog" class="section">
    <div class="container">
        <h2 class="section-label reveal">Writing</h2>
        <p class="blog-intro reveal">
            I'm documenting what I build — agent architectures,
            backend design decisions, and lessons from production AI systems.
        </p>
        <div class="blog-grid">
            <div class="blog-card blog-card--placeholder reveal">
                <div class="blog-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span class="blog-card-badge">Coming Soon</span>
                <h3 class="blog-card-title">How I built a 3-stage clinical validation pipeline with SQS</h3>
            </div>
            <div class="blog-card blog-card--placeholder reveal">
                <div class="blog-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span class="blog-card-badge">Coming Soon</span>
                <h3 class="blog-card-title">MCP Protocol: What it is and why it matters for AI agents</h3>
            </div>
            <div class="blog-card blog-card--placeholder reveal">
                <div class="blog-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span class="blog-card-badge">Coming Soon</span>
                <h3 class="blog-card-title">RAG vs Fine-tuning: What I learned building both in production</h3>
            </div>
        </div>
        <div class="blog-subscribe reveal">
            <a href="mailto:pranavkrishna317@gmail.com?subject=Subscribe to writing" class="blog-subscribe-link">
                Get notified when I publish
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Verify**

Refresh and scroll to Writing section. Confirm:
- 3 grayed-out cards appear with lock icons and "Coming Soon" badges
- Three post titles are readable
- "Get notified when I publish" link opens email client with correct subject
- Nav "Blog" link now smooth-scrolls to this section
- Section has a light background (no `section--dark`) — correct, it contrasts with the dark Skills section above it

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add Blog placeholder section with 3 coming-soon post cards"
```

---

## Task 10: Rewrite Contact Section

**Files:**
- Modify: `index.html:344-376`
- Modify: `css/style.css` (add contact-status CSS)

- [ ] **Step 1: Replace contact intro paragraph**

Find `<p class="contact-intro reveal">` (the paragraph starting "Have a project in mind?"). Replace the entire element with:
```html
<p class="contact-intro reveal">
    I'm actively looking for full-time Software Engineer roles focused on
    AI systems and backend infrastructure. Open to roles across India
    and remote opportunities globally.
    <br><br>
    Response time: usually within 24 hours.
</p>
```

- [ ] **Step 2: Remove phone number card**

Find and delete the entire phone number `<a>` contact card:
```html
<a href="tel:+919392464717" class="contact-card reveal">
    ...
</a>
```

- [ ] **Step 3: Add contact status badge**

After the closing `</div>` of `.contact-grid`, add:
```html
<div class="contact-status reveal">
    <span class="open-dot"></span>
    Available for full-time roles &middot; Based in Hyderabad, India
</div>
```

- [ ] **Step 4: Add contact-status CSS**

Add to `css/style.css` in the Contact section:
```css
.contact-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 32px;
    font-size: 0.85rem;
    color: var(--text-secondary);
}
```

- [ ] **Step 5: Verify**

Refresh and scroll to Contact. Confirm:
- Intro paragraph reads "actively looking for full-time Software Engineer roles..."
- Only 3 contact cards: Email, LinkedIn, GitHub — no phone card
- Green pulsing dot + "Available for full-time roles · Based in Hyderabad, India" below the cards
- No JS errors in console

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: rewrite Contact section for full-time job seeking, remove phone number"
```

---

## Task 11: Final End-to-End Verification

**Files:** None — review only

- [ ] **Step 1: Full page scroll-through**

Open `index.html` in browser. Scroll slowly from top to bottom and verify every section in order:
- [ ] Nav: About, Experience, Projects, Skills, Blog, Let's Talk, Download Resume
- [ ] Hero: "Software Engineer" static subtitle, updated description, 3 CTA elements, no typing animation
- [ ] Currently Building strip: purple dot, monospace text
- [ ] About: 3-paragraph bio, green pulse badge, 4 corrected stat cards with sublabels
- [ ] Experience: Oovacha 5 bullets (SQS decision reasoning present), Mushroom 4 bullets, correct metrics throughout
- [ ] Projects: Tab switcher works, Work shows 3 production cards, Personal shows 4 cards with GitHub links
- [ ] Skills: 6 categories, tier dots visible, renamed headings, no CI/CD
- [ ] Blog: 3 grayed placeholder cards, subscribe link
- [ ] Contact: Full-time framing, 3 cards (no phone), status badge
- [ ] Footer: Unchanged

- [ ] **Step 2: Check mobile layout**

Open DevTools > Toggle device toolbar > iPhone 14 Pro size. Scroll through all sections. Confirm nothing overflows or breaks.

- [ ] **Step 3: Check DevTools console**

Open Console tab. Confirm zero JS errors on page load and after interacting with the projects tab switcher and nav links.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: portfolio redesign complete — all sections updated"
```
