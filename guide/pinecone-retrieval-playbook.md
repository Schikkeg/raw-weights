---
title: "The Retrieval Playbook — 6 RAG Search Strategies | RawWeights"
description: "Six query types. Six retrieval strategies. Know which play to call — explained simply with real healthcare examples."
url: "https://rawweights.com/guide/pinecone-retrieval-playbook.html"
type: guide
date: 2026-06-15
---

# The Retrieval Playbook — 6 RAG Search Strategies

> Six query types, six retrieval strategies. An interactive playbook for knowing which search approach to use — explained with real healthcare examples and a live Query Decoder tool.

## Overview

Most RAG tutorials teach one retrieval method. Production systems require six. This guide maps real-world query patterns to the retrieval strategy that handles them best — semantic similarity search, keyword (BM25) search, hybrid fusion, multi-query expansion, HyDE (hypothetical document embeddings), and re-ranking. Healthcare examples make the distinctions concrete.

Three interactive sections let you explore the strategy decision tree, run your own query through the Query Decoder, and validate your pipeline with a Minimum Viable Eval checklist.

## Key Topics / Sections

- **Pick the Right Strategy for the Query**: Decision framework mapping query characteristics (exact terms, semantic intent, ambiguity, multi-hop) to the appropriate retrieval play. Covers all six strategies with trade-off tables.
  - *Semantic Search*: Embedding-based cosine similarity for intent-driven queries
  - *BM25 / Keyword Search*: Token overlap for exact-term lookups (drug names, codes)
  - *Hybrid Fusion*: Reciprocal rank fusion combining semantic and keyword scores
  - *Multi-Query Expansion*: Generating query variants to increase recall
  - *HyDE*: Embedding a hypothetical answer document to improve recall on sparse queries
  - *Re-ranking*: Cross-encoder scoring of top-K candidates for final precision
- **Try It: Query Decoder**: Interactive tool — enter a sample query and the decoder classifies it by type and recommends the retrieval strategy with reasoning.
- **Your Minimum Viable Eval**: A checklist of the minimum evaluation steps before shipping a retrieval pipeline — precision, recall, faithfulness, latency, and cost thresholds.

## Related Pages

- [RAG Guide](https://rawweights.com/guide/rag.html) — Full RAG architecture and pipeline overview
- [RAG Architect's Studio](https://rawweights.com/guide/rag-architects-studio.html) — Context budget and pattern matching tools
- [RAG Pipeline Toolkit](https://rawweights.com/guide/rag-pipeline-toolkit.html) — Interactive parameter tuning and pre-launch checklist
- [LlamaIndex Document Intelligence](https://rawweights.com/guide/llamaindex-document-intelligence.html) — Parser selection and citation trust
