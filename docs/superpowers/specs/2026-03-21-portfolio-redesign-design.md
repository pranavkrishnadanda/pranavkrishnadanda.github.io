# Portfolio Redesign — Design Spec
**Date:** 2026-03-21
**Author:** Pranav Krishna Danda
**Goal:** Redesign personal portfolio to target full-time Software Engineer roles (AI systems + backend) at FAANG and top tech product companies.

---

## 1. Context & Problem

The current portfolio has accurate information but several content and structure issues that hurt its effectiveness with technical recruiters:

- **Stat cards show company-scale metrics** (151 DB tables, 86 APIs, 48K records) that read as Oovacha's platform metrics, not personal achievements
- **Hero description is too niche** — "clinical trial sites" self-selects out recruiters at non-clinical companies
- **Typing animation cycles 3 role titles** — signals lack of focus/identity to recruiters
- **All 3 projects are from one employer** — no evidence of personal initiative or building outside work
- **Phone number exposed publicly** — scraping/spam risk
- **No resume download link** — recruiter friction
- **No blog/writing section** — missed differentiator opportunity
- **Experience bullets read like job descriptions** — output-focused, not impact + reasoning focused

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

### 3.2 Navigation
- Links: About, Experience, Projects, Skills, Blog, Let's Talk
- Add Download Resume pill button in nav (placeholder URL, easy to swap)

### 3.3 Hero
Remove: Typing animation cycling multiple roles
Add: Single static title — "Software Engineer"

```
Hi, I'm
Pranav Krishna Danda
Software Engineer

Building production AI systems — autonomous agents,
backend infrastructure, and LLM pipelines at scale.

[View My Work]  [Get In Touch]  [Download Resume]
```

Rationale: "Software Engineer" matches FAANG job posting language. Description signals AI differentiation to the right recruiters without excluding backend roles.

### 3.4 Currently Building Strip
Slim full-width banner between Hero and About:
```
Currently Building -> Scaled Autonomous Agentic Systems
```
Signals active shipping mindset. One line only.

### 3.5 About
Bio (3 paragraphs, tight):
```
Software Engineer with 1+ year of production experience building
autonomous AI agents, backend systems, and LLM pipelines.

Currently at Oovacha, automating clinical data workflows across
27 trial sites. Previously at Mushroom Solutions building
deep learning classification systems.

Based in Hyderabad, India. B.Tech in CS & Engineering (AI & ML), VVIT.
```

Stat Cards (4) — personal wins only:
- AI Agents Shipped: 3 (In production)
- Records Processed: 78.6K+ (Clinical data)
- Time Automated: 22 hrs/week (Manual work eliminated)
- Model Accuracy: 97.8% (Peak classification)

Add: "Open to opportunities" green status badge near name.

### 3.6 Experience

**Oovacha** — Software Developer — Mar 2025 to Present
- Built 3 autonomous AI agent systems from scratch — an inline clinical query agent, an EDC validation engine, and a Claude-powered multi-tool framework — now live across 27 trial sites
- Designed and shipped a message-driven validation pipeline processing 78.6K+ clinical records against 77 configurable rules, catching discrepancies before human reviewers ever see them
- Selected SQS over direct API calls to guarantee message durability and decouple processing load from clinical data ingestion
- Architected backend infrastructure across AWS ECS Fargate, Aurora PostgreSQL, SQS, S3, and Cognito
- Integrated custom MCP servers into AI pipelines, enabling natural language querying of production clinical databases

Tech: Python, Claude API, MCP, FastAPI, AWS, PostgreSQL, SQS

**Mushroom Solutions** — ML Engineer Intern — Mar 2024 to Mar 2025
- Trained deep learning classification models hitting 97.8% accuracy on 15,400+ records — automated 17 workflows, eliminating 22 hrs/week of manual processing
- Built an intelligent RAG chatbot combining Azure AI Search + FAISS with Redis caching, serving 5,000 queries/day
- Shipped Django REST APIs with role-based access control, serving ML inference across 4 internal teams
- Covered agent tool execution and edge cases with end-to-end test automation using Behave BDD

Tech: TensorFlow, Keras, FAISS, Django, Redis, Azure AI Search

### 3.7 Projects

Tab switcher: Work | Personal — client-side filter, no reload.

**Work Tab (3 cards) — badge: Production**

1. Clinical AI Agent Framework
   - Description: 3 autonomous agents with tool execution, error recovery, MCP-based NL querying of production PostgreSQL
   - Stack: Python, Claude API, MCP, FastAPI
   - Repo: No public repo (proprietary)

2. EDC Validation Engine
   - Description: 3-stage message-driven pipeline, 78.6K+ records, 77 rules, SQS-backed durability
   - Stack: Python, SQS, PostgreSQL, AWS
   - Repo: No public repo (proprietary)

3. RAG Search Platform
   - Description: Hybrid vector+keyword search, 5K queries/day, sub-second latency, 10K+ doc corpus
   - Stack: FAISS, Azure AI Search, Redis, Django
   - Repo: No public repo (proprietary)

**Personal Tab (4 cards) — badge: Personal, with GitHub link**

1. Autonomous AI Coding Assistant
   - Description: MCP-powered coding assistant with file ops, code assistance, project management
   - Stack: Python, MCP, Claude API
   - Repo: github.com/pranavkrishnadanda/Autonomous-AI-Coding-Assistant

2. Claude Agent System
   - Description: Terminal-based agentic system with Ollama + MCP tools, local Claude Code alternative
   - Stack: Python, Ollama, MCP
   - Repo: github.com/pranavkrishnadanda/Claude-Agent-System

3. Multimodal RAG System
   - Description: Cross-modal retrieval combining text and image embeddings
   - Stack: Python, Multimodal Embeddings, Vector DBs
   - Repo: github.com/pranavkrishnadanda/Multimodal-Retrieval-Augmented-Generation-system

4. AirDoc
   - Description: Touchfree PDF/image viewer controlled by hand gestures for accessibility
   - Stack: Python, Computer Vision, MediaPipe
   - Repo: github.com/pranavkrishnadanda/AirDoc

### 3.8 Skills

Three visual depth tiers:
- Primary (filled circle): production experience, used daily
- Secondary (empty circle): comfortable, used in real projects
- Familiar (dotted circle): learned, can pick up fast

Categories:
- AI & Agents: Primary — Python, Claude API, MCP Protocol, Autonomous Agents | Secondary — FAISS, Hugging Face, Azure AI Search | Familiar — TensorFlow, Keras
- Backend & APIs: Primary — FastAPI, REST APIs, SQLAlchemy | Secondary — Django, Flask
- Cloud & Infrastructure: Primary — AWS ECS Fargate, SQS, Aurora PostgreSQL | Secondary — S3, Cognito | Familiar — Docker
- Databases & Messaging: Primary — PostgreSQL | Secondary — Redis, RabbitMQ
- Frontend: Secondary — TypeScript, Next.js, React
- Testing: Secondary — Behave BDD, Test Automation

### 3.9 Blog (Placeholder)

Section header: Writing

Intro:
```
I'm documenting what I build — agent architectures,
backend design decisions, and lessons from production AI systems.
```

3 placeholder cards (grayed out, locked icon, Coming Soon badge):
1. "How I built a 3-stage clinical validation pipeline with SQS"
2. "MCP Protocol: What it is and why it matters for AI agents"
3. "RAG vs Fine-tuning: What I learned building both in production"

Subscribe CTA: links to email or Substack when ready.
When posts are written: swap Coming Soon badge for a link. No structural code change needed.

### 3.10 Contact

Remove: Phone number (scraping/spam risk)

Intro copy:
```
I'm actively looking for full-time Software Engineer roles
focused on AI systems and backend infrastructure.
Open to roles across India and remote opportunities globally.

Response time: usually within 24 hours
```

3 contact cards:
- Email: pranavkrishna317@gmail.com
- LinkedIn: linkedin.com/in/pranavkrishnadanda
- GitHub: github.com/pranavkrishnadanda

Status badge: Available for full-time roles, Based in Hyderabad, India

---

## 4. Visual Design

- Theme: Dark — keep existing palette (#07070a bg, #818cf8 purple accent, #22d3ee cyan, #fb923c orange)
- Fonts: Keep Space Grotesk (headings), Inter (body), JetBrains Mono (code/tags)
- No structural redesign — refine existing components, fix content
- New components needed: Tab switcher (Projects), depth tier indicators (Skills), Currently Building strip, blog placeholder cards, resume download button

---

## 5. What Does NOT Change

- Dark theme and color palette
- Font choices
- Single-page scroll architecture
- Navbar scroll behavior
- Hero background orbs and grid pattern
- Scroll indicator
- Back-to-top button
- Footer structure
- robots.txt, sitemap.xml, Google verification

---

## 6. Resume Link

Placeholder URL in nav and hero. User will upload resume to Google Drive or similar and swap the href. No code change needed beyond updating the URL.

---

## 7. Out of Scope

- Backend/CMS for blog posts (static HTML placeholders only for now)
- Contact form (email link is sufficient)
- Analytics beyond existing Google verification setup
- Dark/light mode toggle
