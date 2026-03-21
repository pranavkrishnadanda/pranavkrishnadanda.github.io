# Resume Redesign Spec

## Goal

Build a single-page, print-to-PDF HTML resume for Pranav Krishna Danda targeting full-time Software Engineer roles at FAANG and Indian product companies (Razorpay, PhonePe, CRED, Paytm). The resume must be ATS-safe, recruiter-scannable in 6 seconds, and consistent with the live portfolio at pranavkrishnadanda.github.io.

## Output File

`resume.html` in the project root — open in Chrome, Cmd+P → Save as PDF (A4).

---

## HTML File Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pranav Krishna Danda — Resume</title>
  <style>
    /* all CSS here */
  </style>
</head>
<body>
  <div class="page">
    <!-- all resume content here -->
  </div>
</body>
</html>
```

---

## Layout & Format

- **Structure:** Single column, full-width. Classic layout — no sidebars, no grids, no columns.
- **Page size:** A4 (210mm × 297mm). Must fit exactly one page when printed.
- **Screen view:** `.page` centered on body, max-width 794px, white background, box-shadow for paper feel. Body background: `#1a1a2e`.
- **Print padding:** 18mm top/bottom, 20mm left/right (baked into `.page` padding for print).
- **Font family:** `Georgia, 'Times New Roman', serif` for all text.
- **Base font size:** 10pt for print. Line height: 1.55.
- **Colour:** Black/dark text on white — pure print-friendly. No coloured backgrounds, no dark mode.
- **Links:** All `<a>` tags styled `color: #111; text-decoration: underline;`. `:visited` and `:hover` also `color: #111` to prevent blue bleed in PDF. Contact line links inherit `color: #333`.
- **Bold in bullets:** `<strong>` tags, default browser bold (font-weight: 700). Used for key numbers and tech names within bullet text.
- **Section dividers:** `border-bottom: 0.8px solid #bbb; padding-bottom: 2px` under each section title.
- **Name rule:** `border-top: 1.5px solid #111` below the contact line, before first section.

---

## Font Sizes

| Element | Size | Weight | Other |
|---|---|---|---|
| Name | 18pt | 700 | letter-spacing: 2px, text-align: center |
| Contact line | 8.8pt | 400 | color: #333, text-align: center |
| Section titles | 9.5pt | 700 | letter-spacing: 1px, text-transform: uppercase |
| Summary body | 9.8pt | 400 | line-height: 1.65 |
| Skills rows | 9.5pt | 400 | line-height: 1.75 |
| Job title / company | 10pt | 700 | role in italic (font-weight: 400) |
| Job date | 9pt | 400 | color: #555 |
| Bullet text | 9.5pt | 400 | line-height: 1.6 |
| Project text | 9.5pt | 400 | line-height: 1.75 |
| Project GitHub URL | 9.5pt | 400 | font-style: italic, color: #666 |
| Education name | 10pt | 700 | — |
| Education date | 9pt | 400 | color: #555 |
| Education sub-line | 9.5pt | 400 | color: #444, margin-top: 2px |

---

## Print CSS

```css
@page {
  size: A4;
  margin: 0;
}

@media print {
  body {
    background: #fff;
    margin: 0;
    padding: 0;
  }
  .page {
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    padding: 18mm 20mm;
  }
}
```

**Overflow policy:** If content overflows one page, reduce bullet line-height from 1.6 to 1.5, then reduce section spacing from 8px to 6px. Do not remove content.

---

## Section Order

1. Header (name + contact)
2. Summary
3. Skills
4. Experience
5. Projects
6. Education

---

## Section Specs

### 1. Header

```
PRANAV KRISHNA DANDA
+91 93924 64717 · pranavkrishna317@gmail.com · linkedin.com/in/pranavkrishnadanda · github.com/pranavkrishnadanda · Hyderabad, India
```

Centered. All contact items are `<a>` tags:
- Phone: `href="tel:+919392464717"`
- Email: `href="mailto:pranavkrishna317@gmail.com"`
- LinkedIn: `href="https://www.linkedin.com/in/pranavkrishnadanda/"`
- GitHub: `href="https://github.com/pranavkrishnadanda"`

Separator between items: `&nbsp;·&nbsp;`

---

### 2. Summary

```
Software Engineer with 1 year of full-time production experience building AI systems and
backend infrastructure. Shipped 3 autonomous AI agents deployed across 27 clinical trial
sites, eliminating weeks of manual data review per study cycle. Built RAG search serving
5,000 queries/day and classification models achieving 97.8% accuracy on 78.6K+ records.
```

**Implementation note (do not render):** "1 year of full-time" intentionally counts only the Oovacha full-time role (March 2025–Present). The Mushroom Solutions internship is listed separately in Experience but excluded from this count — internship ≠ full-time production engineering.

Rules:
- No stack line at the end.
- No "seeking" or job-search language.
- No "from scratch" claim.

---

### 3. Skills

Five rows. Format per row: `<strong>Category:</strong> value1, value2, value3`

```
Languages:          Python, TypeScript, SQL
AI & Agents:        Claude API, MCP, RAG, TensorFlow, Keras, FAISS, Hugging Face
Backend:            FastAPI, Django, Flask, REST APIs
Cloud & Infra:      AWS (ECS Fargate, SQS, Aurora, S3, Cognito), Docker, CI/CD, RabbitMQ
Databases & Search: PostgreSQL, Redis, Azure AI Search
```

**Implementation notes (do not render):**
- RabbitMQ belongs under Cloud & Infra — it is a message broker, not a database.
- Azure AI Search belongs under Databases & Search — it is a search service.
- "REST APIs" is listed for ATS keyword matching only.

---

### 4. Experience

Each role uses:
- **Header row:** `display: flex; justify-content: space-between; align-items: baseline`
  - Left: `<strong>Company</strong> &nbsp;<em>Role Title</em>` — company bold 10pt, role italic normal weight
  - Right: date in 9pt color #555
- **Bullets:** `<ul>` with `padding-left: 14px`, `margin-bottom: 7px` after each role's list
- **Key numbers/tech bolded** using `<strong>` within bullet text

#### Oovacha — Software Engineer | March 2025 – Present

```html
<li>Built <strong>3 autonomous AI agent systems</strong> — clinical query agent, EDC validation engine, and Claude-powered orchestrator — now live across <strong>27 clinical trial sites</strong>, eliminating weeks of manual review per study cycle.</li>
<li>Designed and shipped a message-driven validation pipeline processing <strong>78.6K+ clinical records</strong> against <strong>77 configurable rules</strong> — catching discrepancies in patient data before human reviewers.</li>
<li>Selected <strong>SQS over direct API calls</strong> to guarantee message durability and decouple processing load from clinical data ingestion; deployed on <strong>AWS ECS Fargate, Aurora, SQS, S3, Cognito</strong> with RBAC, audit logging, and BDD automation.</li>
<li>Integrated custom <strong>MCP servers</strong> into AI agent pipelines, enabling site managers and doctors to query clinical databases in natural language — replacing multi-step manual lookups.</li>
```

#### Mushroom Solutions — Software Engineer Intern | March 2024 – March 2025

```html
<li>Trained deep learning classification models achieving <strong>97.8% accuracy on 15,400+ records</strong> — automating 17 workflows and eliminating <strong>22 hrs/week</strong> of manual processing.</li>
<li>Built an intelligent RAG chatbot combining Azure AI Search and FAISS with Redis caching — serving <strong>5,000 queries/day</strong>.</li>
<li>Shipped Django REST APIs with RBAC to serve ML model inference across 4 internal teams, with end-to-end test automation using Behave BDD.</li>
```

**Do NOT include:**
- "from scratch" claim
- 151 PostgreSQL tables / 13 schemas / 6,000+ EDC transactions (company metrics)
- 78.6K+ in both bullet 2 and bullet 4 — only appears in bullet 2

---

### 5. Projects

Three personal GitHub projects only. No work projects.

Each entry is a `<li>` structured as:
```
<strong>Name</strong> | Tech, Stack — Description sentence. <em style="color:#666;">github.com/...</em>
```

- Project name: `<strong>`, 9.5pt
- Pipe and tech stack: plain text
- Em dash then description: plain text
- GitHub URL: `<em style="color:#666;">`, wrapped in `<a href="...">` with black link style

```
Autonomous AI Coding Assistant | Python, Claude API, MCP
→ Multi-agent system for automated code generation, review, and debugging with context-aware tool orchestration.
→ github.com/pranavkrishnadanda/Autonomous-AI-Coding-Assistant

Multimodal RAG System | Python, FAISS, LlamaIndex
→ Retrieval pipeline combining text and image embeddings with hybrid search across a 10,000+ document corpus.
→ github.com/pranavkrishnadanda/Multimodal-Retrieval-Augmented-Generation-system

AirDoc | Python, OpenCV, MediaPipe
→ Touch-free PDF and image viewer controlled entirely by hand gestures, built for accessibility and hands-free presentation workflows.
→ github.com/pranavkrishnadanda/AirDoc
```

---

### 6. Education

```
VVIT — B.Tech Computer Science & Engineering (AI & ML)     Nov 2021 – May 2025
Namburu, Andhra Pradesh  ·  CGPA: 7.98 / 10
```

Header row: `display: flex; justify-content: space-between`. Institution name bold 10pt left, date 9pt #555 right. Sub-line 9.5pt #444.

---

## Consistency with Portfolio

All values must exactly match the live portfolio (`pranavkrishnadanda.github.io`):

| Field | Value |
|---|---|
| Records processed | 78.6K+ |
| Model accuracy | 97.8% |
| Hours automated/week | 22 hrs/week |
| AI agents deployed | 3 |
| Clinical trial sites | 27 |
| RAG chatbot queries | 5,000 queries/day |
| LinkedIn URL | linkedin.com/in/pranavkrishnadanda |
| GitHub URL | github.com/pranavkrishnadanda |
| Email | pranavkrishna317@gmail.com |
| Multimodal RAG repo | Multimodal-Retrieval-Augmented-Generation-system |

---

## What NOT to include

- Typing animation or dynamic JS
- Coloured backgrounds or dark mode styling
- "Open to full-time roles" or job-seeking language in summary
- "from scratch" claim
- 151 PostgreSQL tables / 13 schemas / 6,000+ EDC transactions
- Next.js or SQLAlchemy in skills
- Two-column or sidebar layout
- Typing cursor CSS or animation keyframes
- Blue link colours (use black throughout)
- Phone number on portfolio site (spam risk) — phone IS on resume only
