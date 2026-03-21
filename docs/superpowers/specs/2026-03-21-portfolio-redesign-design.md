# Portfolio Redesign — Design Spec
**Date:** 2026-03-21
**Author:** Pranav Krishna Danda
**Goal:** Redesign personal portfolio to target full-time Software Engineer roles (AI systems + backend) at FAANG and top tech product companies.

---

## 1. Context & Problem

The current portfolio has accurate information but several content and structure issues that hurt its effectiveness with technical recruiters:

- **Stat cards show company-scale metrics** (151 DB tables, 86 APIs, 48K records) — Oovacha's platform metrics, not personal achievements
- **Hero description is too niche** — "clinical trial sites" self-selects out recruiters at non-clinical companies
- **Typing animation cycles 3 role titles** — signals lack of focus/identity to recruiters
- **All 3 projects are from one employer** — no evidence of personal initiative
- **Phone number exposed publicly** — scraping/spam risk
- **No resume download link** — recruiter friction
- **No blog/writing section** — missed differentiator opportunity
- **Experience bullets read like job descriptions** — output-focused, not impact + reasoning focused
- **Contact intro is freelance-framed** — must reflect full-time job seeking

### Canonical data corrections
The following values in the existing HTML are incorrect and must be updated everywhere they appear:
- Model accuracy: HTML says 92%, correct value is **97.8%**
- Hours automated: HTML says 20 hrs/week, correct value is **22 hrs/week**
- Records processed: HTML says 48,000+, correct value is **78.6K+**

### Implementation convention
Unless a section says "keep" or "unchanged", treat all listed content as **full replacements** — delete existing content in that section and render only what the spec lists.

---

## 2. Target Audience

**Primary:** Recruiters at FAANG and top tech product companies hiring full-time Software Engineers for:
- AI Engineer / LLM Engineer teams (agents, RAG, Claude API)
- Backend Engineer with AI focus (FastAPI, AWS, system design)

---

## 3. Design Decisions

### 3.1 Page Structure
Single-page, smooth scroll. Section order:
```
Nav -> Hero -> Currently Building Strip -> About -> Experience -> Projects -> Skills -> Blog -> Contact -> Footer
```

All sections must have an `id` attribute: `id="about"`, `id="experience"`, `id="projects"`, `id="skills"`, `id="blog"` (new), `id="contact"`.

### 3.2 Navigation
Replace the existing nav links list with: About, Experience, Projects, Skills, Blog, Let's Talk, Download Resume.

"Blog" is net-new — add `<li><a href="#blog" class="nav-link">Blog</a></li>` before the Let's Talk item.

"Download Resume" — add as the last `<li>` inside `.nav-menu` (so it appears in the mobile drawer too):
```html
<li>
  <a href="#" class="nav-link nav-link--resume" target="_blank" rel="noopener">
    Download Resume
  </a>
</li>
```
Style `.nav-link--resume`: same pill style as `.nav-link--cta` but with `var(--accent-secondary)` (#22d3ee) background instead of primary purple, so it visually differs from "Let's Talk".

### 3.3 Hero
**Remove from HTML:**
- The entire `.hero-title` div (contains `#typingText` and `.typing-cursor`)

**Remove from `js/main.js`:**
- The typing animation block — identifiable as the code that references `#typingText`, defines the roles array, and uses `setTimeout`/`setInterval` to cycle text

**Remove from `css/style.css`:**
- `.typing-cursor` rule
- `@keyframes blink` (or equivalent cursor blink animation)
- `.hero-title` rule if it exists standalone (check before deleting — it may be reused)

**Add:** A static subtitle element, placed after `<h1 class="hero-name">` and before `.hero-description`:
```html
<p class="hero-subtitle reveal">Software Engineer</p>
```
CSS for `.hero-subtitle`:
```css
.hero-subtitle {
    font-family: var(--font-heading);
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 500;
    color: var(--accent-primary);
    margin-bottom: 16px;
}
```

**Updated `.hero-description` text** (replace existing paragraph text only, keep the element):
```
Building production AI systems — autonomous agents,
backend infrastructure, and LLM pipelines at scale.
```

**Updated `.hero-cta`** — replace existing two-button div with three elements:
```html
<div class="hero-cta reveal">
  <a href="#projects" class="btn btn-primary">
    <span>View My Work</span>
    <!-- keep existing arrow SVG -->
  </a>
  <a href="#contact" class="btn btn-secondary">
    <span>Get In Touch</span>
  </a>
  <a href="#" class="hero-resume-link" target="_blank" rel="noopener">
    Download Resume
  </a>
</div>
```
CSS for `.hero-resume-link`:
```css
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

**Update `<head>` meta tags:**
- `<title>`: "Pranav Krishna Danda | Software Engineer"
- `<meta name="description">`: "Software Engineer building autonomous AI agents, backend infrastructure, and LLM pipelines at production scale."
- `<meta property="og:title">`: "Pranav Krishna Danda | Software Engineer"
- `<meta property="og:description">`: "Software Engineer building autonomous AI agents and backend infrastructure at production scale."

### 3.4 Currently Building Strip
New element placed in HTML between `</section>` (hero) and `<section id="about">`:
```html
<div class="currently-building">
  <div class="container">
    <span class="currently-building-dot"></span>
    Currently Building &rarr; Scaled Autonomous Agentic Systems
  </div>
</div>
```
CSS:
```css
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

### 3.5 About

**Replace `.about-text` content entirely:**
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

CSS for the badge:
```css
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
}
@keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}
```

**Stat cards — delete all four existing stat cards. Render these four:**

The existing JS counter selects `.stat-number[data-target]` and uses `parseInt(data-target, 10)`. For static values, omit `data-target` — the JS will ignore those elements.

There is currently no `.stat-sublabel` element in the existing HTML. Add it as a new `<span>` below `.stat-label` with the following CSS:
```css
.stat-sublabel {
    display: block;
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 2px;
    font-style: italic;
}
```

**Card 1 — AI Agents Shipped** (counter animates):
```html
<div class="stat-card">
  <span class="stat-number" data-target="3">0</span>
  <span class="stat-label">AI Agents Shipped</span>
  <span class="stat-sublabel">In production</span>
</div>
```

**Card 2 — Records Processed** (static — omit data-target, JS ignores it):
```html
<div class="stat-card">
  <span class="stat-number">78.6K</span>
  <span class="stat-suffix">+</span>
  <span class="stat-label">Records Processed</span>
  <span class="stat-sublabel">Clinical data</span>
</div>
```

**Card 3 — Time Automated** (counter animates the integer 22, suffix provides the unit):
```html
<div class="stat-card">
  <span class="stat-number" data-target="22">0</span>
  <span class="stat-suffix"> hrs/week</span>
  <span class="stat-label">Time Automated</span>
  <span class="stat-sublabel">Manual work eliminated</span>
</div>
```

**Card 4 — Model Accuracy** (static — omit data-target):
```html
<div class="stat-card">
  <span class="stat-number">97.8</span>
  <span class="stat-suffix">%</span>
  <span class="stat-label">Model Accuracy</span>
  <span class="stat-sublabel">Peak classification</span>
</div>
```

### 3.6 Experience

**Replace the existing bullet lists for both roles entirely.** Delete existing `<ul>` elements and render these:

**Oovacha** — Software Developer — Mar 2025 to Present:
```html
<ul class="timeline-points">
  <li>Built <strong>3 autonomous AI agent systems</strong> from scratch — an inline clinical query agent, an EDC validation engine, and a Claude-powered multi-tool framework — now live across <strong>27 clinical trial sites</strong></li>
  <li>Designed and shipped a <strong>message-driven validation pipeline</strong> processing <strong>78.6K+ clinical records</strong> against 77 configurable rules, catching discrepancies before human reviewers ever see them</li>
  <li>Selected <strong>SQS over direct API calls</strong> to guarantee message durability and decouple processing load from clinical data ingestion</li>
  <li>Architected backend infrastructure across <strong>AWS ECS Fargate, Aurora PostgreSQL, SQS, S3, and Cognito</strong></li>
  <li>Integrated custom <strong>MCP servers</strong> into AI pipelines, enabling natural language querying of production clinical databases</li>
</ul>
```
Tech tags: Python, Claude API, MCP, FastAPI, AWS, PostgreSQL, SQS

**Mushroom Solutions** — ML Engineer Intern — Mar 2024 to Mar 2025:
```html
<ul class="timeline-points">
  <li>Trained deep learning classification models hitting <strong>97.8% accuracy</strong> on 15,400+ records — automated 17 workflows, eliminating <strong>22 hrs/week</strong> of manual processing</li>
  <li>Built an intelligent <strong>RAG chatbot</strong> combining Azure AI Search + FAISS with Redis caching, serving <strong>5,000 queries/day</strong></li>
  <li>Shipped <strong>Django REST APIs</strong> with role-based access control, serving ML inference across 4 internal teams</li>
  <li>Covered agent tool execution and edge cases with <strong>end-to-end test automation</strong> using Behave BDD</li>
</ul>
```
Tech tags: TensorFlow, Keras, FAISS, Django, Redis, Azure AI Search

### 3.7 Projects

**Replace the entire `.projects-grid` content** with the tab switcher and two card groups.

**Project badge structure** — add a `<span class="project-badge project-badge--production">Production</span>` (or `--personal`) as the first child inside each `.project-card-inner`. CSS:
```css
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
```

**GitHub link structure** — for personal cards, add after `.project-tech`:
```html
<a href="https://github.com/pranavkrishnadanda/REPO-NAME"
   class="project-github-link" target="_blank" rel="noopener">
  <!-- GitHub SVG icon (same as existing footer GitHub icon) -->
  View on GitHub
</a>
```
CSS:
```css
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
```

**Repo note for work cards** — add after `.project-tech`:
```html
<p class="project-repo-note">Proprietary — no public repo</p>
```
CSS:
```css
.project-repo-note {
    margin-top: 12px;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-style: italic;
}
```

**Tab switcher** — add above the card groups:
```html
<div class="projects-tabs reveal">
  <button class="projects-tab active" data-group="work">Work</button>
  <button class="projects-tab" data-group="personal">Personal</button>
</div>
```
CSS:
```css
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
JS to add in `main.js`:
```js
// Projects tab switcher
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
    tab.setAttribute('role', 'tab');
    tab.setAttribute('tabindex', '0');
    tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
});
```

**Work group** `<div class="project-group projects-grid" data-group="work">`:

Card 1 — Clinical AI Agent Framework (reuse `.project-card--purple`):
- Badge: Production
- Description: 3 autonomous agents with tool execution, error recovery, and MCP-based natural language querying of production PostgreSQL databases
- Tech tags: Python, Claude API, MCP, FastAPI
- Repo note: "Proprietary — no public repo"

Card 2 — EDC Validation Engine (reuse `.project-card--cyan`):
- Badge: Production
- Description: Message-driven 3-stage pipeline processing 78.6K+ clinical records against 77 configurable rules. SQS-backed for message durability.
- Tech tags: Python, SQS, PostgreSQL, AWS
- Repo note: "Proprietary — no public repo"

Card 3 — RAG Search Platform (reuse `.project-card--orange`):
- Badge: Production
- Description: Hybrid vector + keyword search behind Django APIs. 5,000 queries/day, sub-second latency across 10,000+ document corpus with Redis caching.
- Tech tags: FAISS, Azure AI Search, Redis, Django
- Repo note: "Proprietary — no public repo"

**Personal group** `<div class="project-group projects-grid hidden" data-group="personal">`:

Card 1 — Autonomous AI Coding Assistant (use `.project-card--purple`):
- Badge: Personal
- Description: MCP-powered coding assistant with file operations, intelligent code assistance, and project management. Built to explore agent tool-use patterns independently.
- Tech tags: Python, MCP, Claude API
- GitHub: https://github.com/pranavkrishnadanda/Autonomous-AI-Coding-Assistant

Card 2 — Claude Agent System (use `.project-card--cyan`):
- Badge: Personal
- Description: Terminal-based agentic system with Ollama + MCP tools. Built as a local alternative to Claude Code architecture to understand agent loops under the hood.
- Tech tags: Python, Ollama, MCP
- GitHub: https://github.com/pranavkrishnadanda/Claude-Agent-System

Card 3 — Multimodal RAG System (use `.project-card--orange`):
- Badge: Personal
- Description: Retrieval system combining text and image embeddings for cross-modal document search and querying.
- Tech tags: Python, Multimodal Embeddings, Vector DBs
- GitHub: https://github.com/pranavkrishnadanda/Multimodal-Retrieval-Augmented-Generation-system

Card 4 — AirDoc (use `.project-card--purple`):
- Badge: Personal
- Description: Touchfree PDF and image viewer controlled entirely by hand gestures. Built for accessibility and hands-free presentation workflows.
- Tech tags: Python, Computer Vision, MediaPipe
- GitHub: https://github.com/pranavkrishnadanda/AirDoc

### 3.8 Skills

**Replace the entire `.skills-grid` content** with the categories below.

**Category heading renames (explicit):**
- "AI & Machine Learning" -> "AI & Agents"
- "Cloud & DevOps" -> "Cloud & Infrastructure"
- All other headings unchanged

**Tag text renames (explicit):**
- "AWS ECS" -> "AWS ECS Fargate"
- Add new tag "Autonomous Agents" (does not exist in current HTML — add it)
- Remove "CI/CD" tag entirely (do not carry it over)

**Three skill depth tiers — add these CSS classes:**
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

**Complete tag list — render exactly these tags per category (full replacement):**

AI & Agents (Primary): Python, Claude API, MCP Protocol, Autonomous Agents
AI & Agents (Secondary): FAISS, Hugging Face, Azure AI Search
AI & Agents (Familiar): TensorFlow, Keras

Backend & APIs (Primary): FastAPI, REST APIs, SQLAlchemy
Backend & APIs (Secondary): Django, Flask

Cloud & Infrastructure (Primary): AWS ECS Fargate, SQS, Aurora PostgreSQL
Cloud & Infrastructure (Secondary): S3, Cognito
Cloud & Infrastructure (Familiar): Docker

Databases & Messaging (Primary): PostgreSQL
Databases & Messaging (Secondary): Redis, RabbitMQ

Frontend (Secondary): TypeScript, Next.js, React

Testing (Secondary): Behave BDD, Test Automation

### 3.9 Blog (Placeholder)

**Fully new section — does not exist in current HTML.** Add between the closing `</section>` of Skills and the opening `<section id="contact">`:

```html
<section id="blog" class="section">
  <div class="container">
    <h2 class="section-label reveal">Writing</h2>
    <p class="blog-intro reveal">
      I'm documenting what I build — agent architectures,
      backend design decisions, and lessons from production AI systems.
    </p>
    <div class="blog-grid">
      <!-- 3 placeholder cards (see below) -->
    </div>
    <div class="blog-subscribe reveal">
      <a href="mailto:pranavkrishna317@gmail.com?subject=Subscribe to writing"
         class="blog-subscribe-link">Get notified when I publish</a>
    </div>
  </div>
</section>
```

**Blog card HTML template (repeat 3 times):**
```html
<div class="blog-card blog-card--placeholder reveal">
  <div class="blog-card-icon">
    <!-- lock SVG: same stroke style as other icons, width/height 24px -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
  <span class="blog-card-badge">Coming Soon</span>
  <h3 class="blog-card-title">TITLE HERE</h3>
</div>
```

CSS:
```css
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

**Titles for the 3 placeholder cards:**
1. "How I built a 3-stage clinical validation pipeline with SQS"
2. "MCP Protocol: What it is and why it matters for AI agents"
3. "RAG vs Fine-tuning: What I learned building both in production"

**To publish a post:** Remove `blog-card--placeholder` class, restore opacity (remove opacity rule), replace badge with a `<a href="...">` link, add article content. No structural change.

### 3.10 Contact

**Section heading:** Keep "Let's Work Together" unchanged.

**Replace the existing contact intro paragraph entirely** with:
```html
<p class="contact-intro reveal">
  I'm actively looking for full-time Software Engineer roles focused on
  AI systems and backend infrastructure. Open to roles across India
  and remote opportunities globally.
  <br><br>
  Response time: usually within 24 hours.
</p>
```

**Remove:** Phone number `<a>` card entirely.

**Keep:** Email, LinkedIn, GitHub cards unchanged.

**Add:** Status badge after the contact cards grid:
```html
<div class="contact-status reveal">
  <span class="open-dot"></span>
  Available for full-time roles &middot; Based in Hyderabad, India
</div>
```
CSS (reuses `.open-dot` from section 3.5):
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

---

## 4. Visual Design

- Theme: Dark — keep existing palette (#07070a bg, #818cf8 purple, #22d3ee cyan, #fb923c orange)
- Fonts: Keep Space Grotesk (headings), Inter (body), JetBrains Mono (code/tags)
- No full structural redesign — refine existing components, fix content

New CSS classes to add to `css/style.css`:
`.currently-building`, `.currently-building-dot`, `.hero-subtitle`, `.hero-resume-link`, `.nav-link--resume`, `.open-to-work`, `.open-dot`, `@keyframes pulse-dot`, `.stat-sublabel`, `.project-badge`, `.project-badge--production`, `.project-badge--personal`, `.project-github-link`, `.project-repo-note`, `.projects-tabs`, `.projects-tab`, `.projects-tab.active`, `.project-group`, `.project-group.hidden`, `.skill-primary/secondary/familiar` tier pseudo-elements, `.blog-intro`, `.blog-grid`, `.blog-card`, `.blog-card--placeholder`, `.blog-card-icon`, `.blog-card-badge`, `.blog-card-title`, `.blog-subscribe`, `.blog-subscribe-link`, `.contact-status`

---

## 5. What Does NOT Change

- Dark theme and color palette
- Font choices
- Single-page scroll architecture
- Navbar scroll-shrink behavior
- Hero background orbs and grid pattern
- Scroll indicator
- Back-to-top button
- Footer structure and links
- robots.txt, sitemap.xml, Google verification meta tag
- Existing reveal/scroll animation system in `js/main.js`
- Stat counter animation JS (integer cards only — static cards omit `data-target`)

---

## 6. JS File Location

All JavaScript is in `/js/main.js`. The file currently handles:
- Navbar scroll behavior
- Reveal-on-scroll animations (IntersectionObserver)
- Back-to-top button
- Stat counter animation (reads `data-target`, uses `parseInt`)
- Typing animation — **remove this block entirely** (references `#typingText`)

Add to `main.js`: projects tab switcher (per section 3.7 JS snippet).

---

## 7. Resume Link

Two `href="#"` placeholders:
1. Nav `.nav-link--resume` button
2. Hero `.hero-resume-link` text link

When resume is ready: upload to Google Drive, copy shareable link, replace both `href="#"` values. No other code change needed. Both have `target="_blank"` already set.

---

## 8. Out of Scope

- Backend/CMS for blog posts (static HTML placeholders only)
- Contact form
- Analytics beyond existing Google verification
- Dark/light mode toggle
- Mobile-specific layout redesign (new components must be responsive but no mobile-first rewrite of existing CSS)
