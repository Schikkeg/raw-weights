---
title: "The Invisible Recall — Building a Passive Food Safety Watchdog | RawWeights"
description: "How we built a GraphRAG food safety system that silently monitors 29,000+ FDA and USDA recalls and alerts households before they know to ask. A builder's log from idea to Phase 1."
url: "https://rawweights.com/guide/passive-safety-watchdog.html"
type: guide
date: 2026-06-15
---

# The Invisible Recall — Building a Passive Food Safety Watchdog

> A builder's log on constructing a GraphRAG food safety system that monitors 29,000+ FDA and USDA recalls and proactively alerts households — before they know to ask.

## Overview

Most food recalls reach consumers too late, if at all. The supply chain is the real risk vector: contaminated products move through distributors, retailers, and pantries before a recall notice reaches anyone. This guide documents the design and Phase 1 build of a passive monitoring system that ingests FDA and USDA recall data continuously, builds a knowledge graph, and surfaces alerts at the moment of relevance — ideally before purchase.

The system uses GraphRAG to model the relationships between products, brands, distributors, and recall categories, enabling queries that pure vector search cannot answer. The builder's log covers architecture decisions, what was learned, engineering details, and the Phase 1 and Phase 2 roadmaps.

## Key Topics / Sections

- **The Problem Nobody Talks About**: The gap between a recall being issued and it reaching the household — the last-mile recall problem.
- **Why the Supply Chain is the Real Risk**: How contamination propagates through distribution networks; why monitoring brands alone is insufficient.
- **How It Works**: GraphRAG architecture — FDA/USDA recall ingestion, entity extraction, graph construction, vector index, and the hybrid query layer.
- **What We Learned Building It**: Practical findings on data quality, recall format inconsistencies across agencies, and graph traversal performance.
- **For the Engineers**: Technical deep dive — data pipeline, graph schema, embedding strategy, and the query routing logic between graph and vector retrieval.
- **Phase 1: What Shipped**: Live monitoring of 29,000+ recalls; household alert matching by product and location; initial evaluation metrics.
- **Phase 2: The Moment of Purchase**: Vision for real-time scanning at point of sale — barcode lookup triggering instant recall check before items enter the home.
- **What's Still on the Learning Path**: Open questions on graph update latency, false positive rates, and notification UX.

## Related Pages

- [RAG Guide](https://rawweights.com/guide/rag.html) — RAG architecture and retrieval strategies
- [Pinecone Retrieval Playbook](https://rawweights.com/guide/pinecone-retrieval-playbook.html) — Six retrieval strategies including hybrid search
- [AI Security Stack Autopsy](https://rawweights.com/guide/ai-security-stack-autopsy.html) — Gaps in traditional monitoring for AI-era systems
