---
title: "CareerWiki: I Built a Local AI That Knows My Entire Career | RawWeights"
description: "How I built a local-first AI career knowledge base that ingests 25 years of documents and generates tailored resumes in minutes — with zero cloud data."
url: "https://rawweights.com/usecase/careerwiki-guide.html"
type: usecase
date: 2026-10-30
---

# CareerWiki: I Built a Local AI That Knows My Entire Career

> How I built a local-first AI career knowledge base that ingests 25 years of documents and generates tailored resumes in minutes — with zero cloud data.

## Sections

- The problem every senior professional has
- What CareerWiki actually is
- Architecture: how data flows
- The ingest pipeline
- 3 ways to generate a resume
- Swappable templates: one wiki, many looks
- Beyond resumes: what the wiki unlocks
- The AI stack
- The Obsidian connection nobody talks about
- Turning appraisal feedback into career intelligence
- What I learned building this
- Get started in 15 minutes

## Content

## The problem every senior professional has

You've built real things. Led real teams. Shipped products with real metrics. But the moment you need to articulate all of it quickly — for a new opportunity, a board introduction, a partner pitch — you end up spending a weekend reconstructing your own career.

The old process — every single time

📧

Hunt

Dig through old emails, reviews, LinkedIn to remember what you built

📋

Cut

Trim 25 years to 2 pages. Drop whole roles. Lose the numbers.

🤖

Polish

Paste into ChatGPT. Get generic wording. It doesn't know your actual metrics.

🔁

Repeat

Different opportunity next month. Start from zero again.

The output is always underwhelming — not because the AI is bad, but because the input is thin. A 2-page resume fed into an LLM produces a 2-page resume with better words. The model can only work with what you give it.

The second problem compounds it: as your career grows, you can't fit everything in one document. You drop the early platform work because the recent roles feel more relevant. Then six months later that earlier experience is exactly what someone needs — and the details are gone.

What everyone does

-   Maintain 3-4 resume versions manually
-   They go stale within weeks
-   LLM gets a 2-page snapshot
-   Output is generic, metrics are vague
-   Repeat for every new context

What CareerWiki does

-   One wiki stores your full career history
-   Every ingest adds to it — nothing lost
-   LLM gets structured, complete facts
-   Output is specific, grounded, tailored
-   New context? Just change the JD.

**The insight:** Career document quality is proportional to source data quality. Your wiki is that source — it grows with you, stores everything, and never forgets.

## What CareerWiki actually is

CareerWiki is a local AI system built on what Andrej Karpathy calls the **llmwiki pattern**: raw sources → wiki → schema → output. You feed it documents. It builds a structured knowledge base. You query the knowledge base to generate outputs.

It runs entirely on your machine using Ollama and a 7B parameter model. Nothing leaves your computer. No subscription. No API costs. Your performance reviews, salary history, and career details stay local.

📥

#### Ingest

Drop PDFs, DOCX, or Markdown files. The LLM extracts facts across 6 passes and writes structured wiki pages automatically.

🗂

#### Wiki

Plain Markdown files organized by role, skills, education, projects, and reviews. Editable in the browser or any text editor.

📄

#### Generate

Paste a JD → get a tailored HTML resume in 3 modes. Photo embedded, ATS keywords included, print-to-PDF ready.

## Architecture: how data flows

The system has three layers. The ingest pipeline converts raw documents into structured Markdown. The wiki is the source of truth — plain text files that any LLM can read. The generation layer pulls from the wiki, scores content against the JD, and produces HTML.

![CareerWiki component architecture diagram](/images/careerwiki-architecture.svg "Click to enlarge")

Click to enlarge · Left: Ingest flow (raw docs → extractor → multi-pass LLM → wiki) · Right: Generate flow (wiki → scored context → LLM → HTML) · Center: shared llm.py + Ollama

![CareerWiki architecture — full view](/images/careerwiki-architecture.svg)

✕

Every module talks to the LLM through a single `llm.py` adapter that supports both Ollama (local) and Anthropic (cloud) via a single env variable. The wiki is just a folder of Markdown files — no database, no schema migration, no lock-in.

## The ingest pipeline

This is the most interesting engineering. A single document goes through six separate LLM calls, each focused on one extraction task. I call this multi-pass ingest and it produces dramatically better results than a single "summarize this" prompt.

-   1
    
    #### Document type detection
    
    Keyword match on the first 300 characters. Routes to: resume, performance\_review, annual\_goals, personal\_project, or general. No LLM needed — fast and reliable.
    
-   2
    
    #### Pass 1 — Profile extraction
    
    Name, headline, summary, contact, core competencies. Existing wiki page is always included in the prompt: "preserve all, add/improve only."
    
-   3
    
    #### Pass 2 — Role pages (one per employer)
    
    Detects all employers first, then writes a dedicated wiki page for each. Pages ≥500 bytes are protected — a thinner resume variant can't overwrite a rich role page built from multiple reviews.
    
-   4
    
    #### Passes 3–5 — Skills, education, achievements
    
    Each gets its own pass with its own focused prompt. Achievement bullets are appended (never overwritten) so every document contributes without losing history.
    
-   5
    
    #### Pass 6 — Project pages
    
    Named projects get their own wiki page with problem, contribution, outcomes, and scale. Personal AI projects (this post!) get their own document type and write directly to wiki/projects/.
    
-   6
    
    #### Review merge (performance reviews only)
    
    FY achievements are extracted and merged into the employer's role page. Your FY2025 rating shows up in your PANW wiki page even though it wasn't in your original resume.
    

**Technical note:** All LLM calls use a brace-counting JSON parser rather than `json.loads()` directly. This handles the common case where the model adds prose before or after the JSON block — which 7B models do frequently.

## 3 ways to generate a resume

Not every application is the same. I added three modes after realising that sometimes I want to tailor my existing hand-crafted resume, and sometimes I want a fresh one built entirely from the wiki.

Mode

What it does

Best for

**A — Enrich Existing**

Injects JD-matched bullets (highlighted orange) at the top of each job section in your existing HTML resume. Adds a "JD Key Skills" group.

You have a polished resume already and just want the JD-specific additions highlighted

**B — New (JD-focused)**

Generates a fresh resume using only wiki content that has keyword overlap with the JD. Roles with no match are excluded.

Applying to a role in a different domain — keep it tight and relevant

**C — New (Full)**

Generates a complete resume with all career content. JD-relevant items are sorted to the top within each section.

Target company values breadth of experience; or you want to see everything

All modes use a two-pass pipeline: Pass 1 is the LLM producing structured JSON (~2,000 tokens), Pass 2 is pure Python injecting that JSON into an HTML template. This separation means you can fix layout bugs without touching the LLM prompt, and vice versa.

**JD match check:** Before generating, the system runs an instant keyword scorer against your wiki. If match is below 20%, it warns you with exactly which requirements are missing — and blocks generation until you confirm. Prevents hallucinated experience.

## Swappable templates: one wiki, many looks

The HTML output is fully decoupled from the LLM. Every generation mode produces a JSON data structure first, then Python injects that JSON into a template file. The LLM never touches the visual design.

This means you can have multiple templates for different contexts — and switch between them without regenerating content:

🏢

#### Corporate two-column

The default. Photo top-left, contact sidebar, experience right. Works for most enterprise roles. Print-to-PDF ready at A4.

✦

#### Minimal single-column

Clean, ATS-safe, text-only. Drop in a second template file and pass `template_path` to generate\_resume. Same wiki data, different look.

🎨

#### Creative / portfolio

For design, product, and marketing roles. Richer visual hierarchy, project gallery section. Just another HTML file — no new LLM logic.

**The separation matters:** When you fix a layout bug or want to update the font, you touch the template file only. When you want to update your career summary, you update the wiki. The two never interfere with each other.

The same approach applies to company-specific branding. Applying to a company you know uses a design-forward culture? Drop in their colour palette. The wiki content stays identical — only the presentation changes.

## Beyond resumes: what the wiki unlocks

Once your career is documented in structured Markdown, the resume is just one output. The same wiki feeds a surprising number of other tasks.

Performance Reviews

#### Review season becomes a copy-paste job

Your wiki already has every FY achievement, every metric, every project outcome — tagged by employer and year. Writing a self-assessment goes from two days to thirty minutes. The accomplishments are there; you're just selecting and framing them.

LinkedIn & Bios

#### Speaker bios, LinkedIn About, exec summaries

Different contexts want different lengths and emphases. Your wiki has everything. Paste the context ("write a 100-word speaker bio for a cybersecurity conference") and the LLM has the facts to work with. No hallucinating seniority you don't have.

Interview Prep

#### STAR stories on demand

Ask the wiki-backed LLM: "give me three STAR examples of cross-functional leadership from my career." It draws from documented projects, reviews, and outcomes — not vague recollections. Walk into interviews with specific numbers.

Career Clarity

#### See your career as a graph

After ingesting 25 years, patterns emerge that surprised me: I've led platform migrations four times across different companies. That's a narrative thread, not a coincidence. The wiki makes invisible patterns visible.

## The AI stack

Everything runs locally. The only external dependency is Ollama, which manages model loading and serves a local HTTP API that mimics the OpenAI interface.

🦙

#### Ollama + qwen2.5:7b

7B parameter model. Runs on CPU. 4-minute resume generation on a modern laptop. 16K context window for large wikis.

🌊

#### Streaming with timeout=(10, None)

The killer fix. Setting read timeout to None eliminates all generation timeouts. The HTTP connection streams tokens indefinitely.

🔄

#### Multi-pass LLM architecture

6 focused prompts per document. Each pass has a narrow schema. Far better extraction quality than one big "summarize everything" call.

📸

#### Base64 image embedding

Profile photos embedded as data URLs. Resume HTML is fully self-contained — works in Streamlit iframes, email attachments, and offline.

☁️

#### Anthropic fallback

One env variable switches from Ollama to Claude API. Same code, same prompts, 10x faster generation when you need it.

🐍

#### Streamlit UI

4-tab app: Ingest, Generate, Wiki browser, Lint audit. The fastest way to build a functional AI tool UI without JavaScript.

## The Obsidian connection nobody talks about

Here's something I didn't plan but turned out to be powerful: the `wiki/` directory is 100% compatible with [Obsidian](https://obsidian.md).

Open your CareerWiki wiki folder as an Obsidian vault and you get a full visual graph of your career — roles linking to achievements, projects linking to skills, reviews linking to roles. The `[[page-name]]` backlinks that ingest.py writes are valid Obsidian wiki links.

**Try it:** Open Obsidian → Open folder as vault → select your `wiki/` directory. Your career graph appears immediately. Use Obsidian's Canvas feature to arrange your career timeline visually.

This also means you can edit wiki pages in Obsidian with full autocomplete and graph view, then run CareerWiki generation. The two tools work on the same files without conflict.

## Turning appraisal feedback into career intelligence

Every performance review has an "areas for improvement" section. Usually it gets read once and filed. CareerWiki does something different with it.

When a review is ingested, a dedicated Pass E extracts those development areas and writes them to `wiki/growth-areas.md` — a dedicated file that accumulates improvement feedback across all your reviews over time.

📋

#### Captured automatically

During review ingest, the LLM extracts improvement areas as a separate pass. No manual work — just ingest your appraisal doc.

🟡

#### Three-state JD matching

The JD fit checker now returns: **matched** (proven strength), **in progress** (growth area from reviews), or **not found**. Honest signal, not binary.

✏️

#### Edit with awareness

If a JD keyword maps to a growth area, the app flags it: "this is in your development plan — edit the bullet carefully." No hallucinated expertise.

**Example:** Your FY2025 review flagged "executive communication" as a development area. A JD requires it. Instead of the system treating this as a hard miss, it surfaces it as amber: "In progress — from FY2025 review." You can choose to mention it thoughtfully rather than silently omit it or fabricate experience.

Over time, `growth-areas.md` becomes a longitudinal view of your professional development — what was flagged in FY2023 vs FY2025, and whether those gaps have closed (they'd appear as matches in your skills wiki by then).

## What I learned building this

Prompt Engineering

#### Existing content in every prompt

Always include the current wiki page in the prompt with "preserve, add/improve only." Without this, each ingest run overwrites previous work instead of enriching it.

LLM Reliability

#### 7B models hallucinate company names badly

qwen2.5:7b created vendor companies (Akamai, NYSE) as employer pages. Fixed with a canonical slug map and a skip-list frozenset. Never trust LLM-generated company names directly.

Architecture

#### Streaming is not optional at this scale

Blocking HTTP with a 600s timeout was fine for individual ingest passes. For resume generation (2K tokens), the CPU model regularly exceeded it. timeout=(10, None) is the correct pattern for any long-running LLM call.

Python / Web

#### XHTML will ruin your HTML preview

Saving resumes as .xhtml makes browsers parse them as strict XML. A single unescaped & in a Google Fonts URL breaks the entire render. Always output .html.

Data Design

#### Protect pages once they're good

After a performance review ingests a rich 5,000-byte PANW page, the next resume ingest shouldn't overwrite it with 800 bytes. Pages ≥500 bytes are now immutable to resume passes.

UX

#### Block on low JD match before generation

Without a relevance check, users waste 10 minutes generating a hallucinated resume for a JD that's completely outside their background. A fast keyword scorer catches this in milliseconds.

Windows / PowerShell

#### Unicode in .ps1 files will break PowerShell 5.1

Box-drawing characters (──) in script comments caused a cryptic "Missing closing '}'" parse error on every run. PowerShell 5.1 misparsed the Unicode as control characters. Replace all decorative Unicode with plain ASCII dashes — problem gone immediately.

Streamlit / Paths

#### Never use relative paths inside a Streamlit app

Streamlit sets its own CWD when it launches. `Path("templates/assets/photo.jpg").resolve()` resolved to the wrong directory — photo showed as broken in every preview. Fix: `_PROJECT_DIR = Path(__file__).parent.parent` at module level, used everywhere.

Streamlit

#### Confirmation dialogs require session\_state + st.rerun()

Streamlit processes exactly one button click per render cycle. A "Generate anyway?" confirmation can't be handled in the same render as the original click. Pattern: set `fire_generate=True` in session\_state, call `st.rerun()`, then pick it up at the top of the next render.

File I/O

#### glob("\*.xhtml") silently misses your new .html files

After switching from .xhtml to .html output, the "Previously Generated Resumes" list went empty. The glob pattern was never updated. Now it runs two globs, merges them, sorts by mtime, and uses `mime="text/html"` for all downloads.

## Get started in 15 minutes

Prerequisites: Python 3.11+, [Ollama](https://ollama.com) installed and running.

-   1
    
    #### Pull the model (one-time, ~4 GB)
    
    `ollama pull qwen2.5:7b`
    
-   2
    
    #### Clone and install
    
    `git clone https://github.com/researchsite/careerwiki`  
    `pip install -r requirements.txt`
    
-   3
    
    #### Copy .env.example to .env
    
    The default config points to local Ollama. No API keys needed to start.
    
-   4
    
    #### Drop your documents into raw\_sources/ and start the app
    
    `streamlit run app.py` — then open **http://localhost:8501** and click Ingest.
    

**Privacy:** The .gitignore excludes raw\_sources/, wiki/, output/, and your .env. Only the source code commits. Your career data never leaves your machine unless you push it yourself.

[View on GitHub →](https://github.com/researchsite/careerwiki) [Architecture deep-dive ↑](#architecture)
