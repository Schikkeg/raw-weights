---
title: "The Compiler | LLM Wiki — RawWeights | RawWeights"
description: "Karpathy's LLM Wiki explained as a compiler: raw sources go in, compiled wiki pages come out. Understand ingest, query, lint — and when pre-compiled knowledge beats RAG."
url: "https://rawweights.com/guide/llm-wiki-compiler.html"
type: guide
date: 2026-10-30
---

# The Compiler | LLM Wiki — RawWeights

> Karpathy's LLM Wiki explained as a compiler: raw sources go in, compiled wiki pages come out. Understand ingest, query, lint — and when pre-compiled knowledge beats RAG.

## Sections

- Why the Compiler Metaphor
- 3-Layer Architecture
- The 3 Operations
- Lint — The Static Analyzer
- Wiki vs RAG — When Each Wins
- The Limits
- How to Start

## Content

## Why the Compiler Metaphor

In 2026, most teams using Claude or GPT-4o for internal knowledge access have the same setup: dump documents into a vector database, write a RAG pipeline, retrieve chunks at query time, inject into context, answer. It works. It also costs tokens every single query, returns different answers to the same question depending on retrieval luck, and is nearly impossible to debug when it gets something wrong.

Andrej Karpathy published a GitHub Gist in April 2026 describing a different pattern. Instead of retrieving at runtime, you do the expensive reading and synthesis work _once_, upfront. The result is a set of structured markdown files — a wiki — that both humans and AI agents can query cheaply.

A compiled program runs fast because the hard work happened at compile time, not at runtime. The LLM Wiki does the same: the expensive retrieval and synthesis happens at **ingest time**. Every query after that just reads already-compiled files.

🔁

#### RAG — Interpreted

Every query re-retrieves from the source. Like an interpreted language: flexible, but pays the parsing cost every run.

⚡

#### Wiki — Compiled

Knowledge compiled once at ingest. Queries just read files. Cheaper, faster, auditable.

🔬

#### Lint — Static Analysis

A scheduled pass that checks the compiled artifact for errors — dead links, contradictions, stale data. This is where the compiler metaphor completes.

## 3-Layer Architecture

Every LLM Wiki is three things. Click each layer to see what lives inside it.

raw/ CLAUDE.md wiki/

Layer 1

#### raw/ — Source files (immutable)

The LLM reads these. It never modifies them.

raw/

  meeting-2026-06-01.txt ← Zoom transcript

  client-feedback-q2.pdf ← Exported from Maven

  competitor-analysis.md ← Your research notes

  slack-export-2026-05.json ← Team Slack archive

  sales-call-recording.vtt ← WebVTT transcript

-   🔒
    
    **Never modified by the LLM.** If a source is wrong, you fix the source and re-ingest.
    
-   📥
    
    **Any format works.** PDF, Markdown, JSON, VTT, plain text — the LLM reads them all at ingest time.
    
-   ⏱️
    
    **Timestamped or dated files** help the lint step detect staleness. Name files with ISO dates when possible.
    

Layer 2

#### CLAUDE.md — The Schema (compiler flags)

You write this. The LLM reads it before every operation.

CLAUDE.md is the constitution of your wiki. It defines what page types exist, how they're structured, how they're named, and what the three operations (ingest / query / lint) should do. Karpathy called this "the most important file in the repo — it co-evolved constantly."

CLAUDE.md

```h
## Page Types

### clients/{name}.md
- one_liner:   one sentence summary
- status:      active | churned | prospect | stale
- last_contact: ISO date (YYYY-MM-DD)
- notes:       free-form paragraphs
- related:     links to other wiki pages

### competitors/{name}.md
- positioning: paragraph
- strengths:   bullet list
- weaknesses:  bullet list
- sources:     raw/ files used

### concepts/{slug}.md
- definition:  1–2 sentences
- how_we_use_it: specific to our context

## Naming Conventions
# lowercase, hyphens not underscores
# clients/acme-corp.md  NOT  Clients/AcmeCorp.md

## Ingest Procedure
1. Read raw source fully
2. Identify all entities (clients, competitors, concepts)
3. For each entity: update existing page OR create new page
4. Append (never overwrite) — tag additions with date
5. Update index.md and log.md

## Lint Procedure
1. Verify every index.md entry → real file exists
2. Verify every wiki file → appears in index.md
3. Scan for broken [[links]]
4. Flag: status=active AND last_contact > 90 days
5. Flag: pages with >85% content overlap (merge candidates)
6. Fix schema violations (missing required fields)
7. Log every action to log.md
```

Layer 3

#### wiki/ — Compiled artifact (LLM-maintained)

Plain markdown files. The LLM is the primary author. Humans can edit too.

wiki/

  index.md ← catalogue of all pages (must fit in one context window)

  log.md ← append-only operation log

  clients/

    acme-corp.md ← compiled from 6 raw sources

    techvision.md

  competitors/

    openai.md

    anthropic.md

  concepts/

    rag.md

    churn-signal.md

-   👤
    
    **Human-readable by design.** If the client page is wrong, you open it, read it, fix it. No retrieval logs to trace.
    
-   🤖
    
    **Agent-readable by design.** Every query starts with index.md (small), selects relevant pages, reads those. Cheap.
    
-   📋
    
    **index.md is the map.** It must stay small enough to fit in one context window (~200 pages max before this breaks).
    

## The 3 Operations

Everything in the LLM Wiki is one of three operations. The LLM reads CLAUDE.md first every time to know the rules, then executes.

⚡ Ingest 🔍 Query 🔬 Lint

Triggered when you drop a new file into `raw/`. This is the "compile" step. It's slow and expensive — but you only pay once per source.

1.  1
    
    ##### Read CLAUDE.md
    
    Load the schema — page types, naming conventions, the ingest procedure rules.
    
2.  2
    
    ##### Read index.md
    
    Load the catalogue to know which wiki pages already exist and what they cover.
    
3.  3
    
    ##### Read the raw source
    
    Fully read the new file. PDFs, VTT transcripts, Slack exports — all gets read now.
    
4.  4
    
    ##### Identify entities & concepts
    
    Extract all clients, competitors, concepts, and people mentioned. Cross-reference against the existing index.
    
5.  5
    
    ##### Update or create wiki pages
    
    Existing page → append new information (tagged with date, never overwriting). New entity → create a page following the schema. Contradictions between old and new → surface them explicitly.
    
6.  6
    
    ##### Update index.md & log.md
    
    Add any new pages to the catalogue. Append to log.md exactly what was created or changed and why.
    

**Cost reality:** A thorough ingest of a 90-minute meeting transcript might cost ~50K tokens. But every person who later queries `wiki/clients/acme-corp.md` spends ~500 tokens. If 10 people query it, you're already ahead — and the compound savings grow over time.

How you ask questions. This is the fast path — you never go back to raw sources.

1.  1
    
    ##### Read index.md
    
    The LLM loads the small catalogue (~a few KB) to understand what pages exist and what they cover.
    
2.  2
    
    ##### Select relevant pages
    
    Based on the query, pick 2-5 relevant wiki pages. "What did Acme Corp say about pricing?" → load `clients/acme-corp.md`.
    
3.  3
    
    ##### Read selected pages & answer
    
    Read the markdown files and answer from them. The total context might be 3-4 pages × 2KB = 6-8KB. Far cheaper than re-retrieving from raw sources.
    

**Debuggability:** If the answer is wrong, you know exactly why — open the page it read, see the incorrect claim, fix it. With RAG you'd need to trace chunk IDs, retrieval scores, and prompt injection order to find the same bug.

The scheduled health check. Run weekly or monthly. This is what keeps the compiled artifact trustworthy over time — without it, the wiki rots.

1.  1
    
    ##### Read CLAUDE.md + index.md
    
    Load the lint rules and the full catalogue of pages.
    
2.  2
    
    ##### Walk every wiki page
    
    Read all pages in wiki/ systematically. This is the expensive part of lint.
    
3.  3
    
    ##### Run 7 checks (see simulator below)
    
    Dead links, index drift, contradictions, staleness, duplication, orphan pages, schema violations.
    
4.  4
    
    ##### Fix what can be auto-fixed
    
    Broken links, missing index entries, schema violations — fix automatically. Contradictions and staleness → flag for human review.
    
5.  5
    
    ##### Append full run report to log.md
    
    Every check, every fix, every flag — logged permanently so humans can audit and revert if needed.
    

**Why lint is the most underrated part:** Without it, a wiki written by an LLM will drift. Pages contradict each other. Links go stale. Clients marked "active" churn. Lint is what makes the wiki a living artifact rather than a snapshot that quietly becomes wrong.

## Lint — The Static Analyzer

In compiler tooling, **lint** is a static analysis pass that checks an artifact for errors without running it. In the LLM Wiki, lint reads every page in `wiki/` and runs 7 checks. Click "Run Lint" to simulate a real lint pass.

$ llm-wiki lint --all ▶ Run Lint

Click "Run Lint" to start the analyzer…

✅ Lint complete — 5 auto-fixed, 2 flagged for human review Reset

### The 7 Lint Checks Explained

-   🔗
    
    **Dead links** — Scans every `[[link]]` reference and verifies the target file exists. Auto-fixes by removing or updating broken references.
    
-   📋
    
    **Index drift** — Checks that every file in `wiki/` appears in `index.md`, and every `index.md` entry points to a real file. Auto-fixes both directions.
    
-   ⚡
    
    **Contradictions** — Detects when two pages make conflicting claims about the same entity or fact. Flags for human review (cannot auto-fix — needs judgment).
    
-   🕰️
    
    **Staleness** — Finds pages with `status: active` but `last_contact` older than your threshold (e.g. 90 days). Updates status to "stale" and flags.
    
-   🔁
    
    **Duplication** — Detects pages with high content overlap (>85%). Auto-merges when safe, flags ambiguous cases.
    
-   🔍
    
    **Orphan pages** — Finds pages that nothing links to. Either adds them to a relevant parent page or flags for deletion.
    
-   📐
    
    **Schema violations** — Checks that all pages have the required fields defined in CLAUDE.md. Auto-generates missing fields from page content when possible.
    

## Wiki vs RAG — When Each Wins

These aren't competing philosophies — they're tools for different situations. If you've read the RAG guides here, you already know the retrieval mechanics. Here's how to choose.

Dimension

RAG (Interpreted)

LLM Wiki (Compiled)

When knowledge is built

At query time, every time

Once at ingest; queries just read files

Cost model

Pay per query

Pay once at ingest; each query cheap

Human readability

No — chunks, embeddings, vector scores

Yes — plain markdown, open and fix

Debuggability

Hard — trace retrieval logs, chunk IDs

Easy — open the wrong page, fix the fact

Contradiction handling

None — retrieves both, LLM picks one

Lint step surfaces and resolves explicitly

Infrastructure required

Vector DB, embeddings, retrieval pipeline

Files + LLM + CLAUDE.md config

Best corpus size

Unlimited — scales to millions of docs

~200 pages — index.md must fit in context

Best for

Large, high-velocity, unique-per-query corpora

Stable, bounded, repeatedly-queried knowledge

Staleness handling

Re-embed when source changes

Lint + scheduled re-ingest

### Decision Wizard

Answer 3 questions to get a recommendation.

Which pattern fits your situation?

How many documents will you have?

Under 200 pages Hundreds to thousands Millions of docs

How often does the content change?

Slowly (weekly/monthly) Constantly (hourly/daily)

Who needs to read & fix the knowledge?

Humans + agents (auditable) Agents only (opaque is fine)

## The Limits

The LLM Wiki is a personal-to-team scale tool by design. Karpathy's original gist was honest about where it breaks. Understanding the limits tells you when to switch to RAG — or to a hybrid.

Wiki pages (50 pages — healthy) 50 / 200

index.md is small and coherent. The LLM can navigate the full graph in context. ✅ Ideal range.

Wiki pages (150 pages — approaching limit) 150 / 200

index.md is getting heavy. Cross-page linking may become inconsistent. Time to audit page granularity — are some pages too narrow?

Wiki pages (200+ pages — breaks here) 200+ / 200

index.md no longer fits in one context window. The agent loses global graph coherence. Links between pages become unreliable.

Compiled word count (~400K words — hard ceiling) 400K words

Karpathy reported reaching ~100 articles, ~400K compiled words on a single research topic. Beyond this, the wiki itself won't fit in context for lint passes.

**What to do when you hit the limit:** Split into multiple focused wikis (one per domain — clients wiki, competitors wiki, concepts wiki). Each gets its own CLAUDE.md and index.md. Queries load only the relevant wiki, not all of them.

📊

#### High-velocity data

If your raw sources change hourly and queries need real-time accuracy, RAG is better. The wiki is a snapshot that re-compiles on a schedule.

🔀

#### Concurrent writers

Multiple LLM agents writing to the same wiki simultaneously risks corruption. The pattern assumes a single writer per wiki at a time.

🌐

#### Millions of documents

The wiki is designed for bounded knowledge bases — your clients, your competitors, your concepts. Not for indexing the public internet.

## How to Start

The original Karpathy gist is short and copy-pasteable into Claude Code. Here's the minimum viable path:

1.  1
    
    ##### Create the folder structure
    
    Make `raw/`, `wiki/`, and an empty `CLAUDE.md`. Drop 2-3 source files into `raw/` — meeting transcripts, documents, notes.
    
2.  2
    
    ##### Write your CLAUDE.md
    
    Define 2-3 page types that make sense for your domain. Don't over-engineer — start with `clients/` and `concepts/`. The schema evolves as you use it.
    
3.  3
    
    ##### Run your first ingest
    
    Open Claude Code, add the `wiki/` folder as context, and say: _"Read CLAUDE.md, then ingest raw/\[your-file\]."_ Watch it create pages and update index.md.
    
4.  4
    
    ##### Query it
    
    Ask a question about the content you just ingested. Notice how it loads index.md first, selects a page, answers from the page — not from re-reading the raw source.
    
5.  5
    
    ##### Schedule lint
    
    After a few weeks of adding raw sources, run _"Read CLAUDE.md and run lint on wiki/"_. Add this to a weekly cron once the wiki is mature.
    

**Primary source:** Karpathy's original gist is at [gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — it's short, worth reading in full. The CLAUDE.md section is the most copy-pasteable starting point.

### Related on RawWeights

[

#### RAG Architect's Studio

Context engineering, Lost in the Middle, agentic RAG — the retrieval foundations the wiki replaces or complements.

→](rag-architects-studio.html)[

#### The Signal Memory Problem

Mem0's approach to cross-session memory — a different architecture for a different memory problem.

→](mem0-b2b-signal-memory.html)[

#### MCP Practitioner's Playbook

How to connect your wiki folder to Claude Code via MCP — the plumbing that makes CLAUDE.md operations work.

→](mcp-practitioner-playbook.html)[

#### Eval Proving Ground

How to know if your wiki pages are actually correct — eval patterns that apply to compiled knowledge.

→](eval-proving-ground.html)
