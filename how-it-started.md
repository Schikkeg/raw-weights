---
title: "How It Started — Atomic GPT Playground | RawWeights"
description: "Train a real Transformer entirely in your browser. No Python, no GPU. A pure JavaScript decoder-only Transformer — the glass-box educational tool that started RawWeights."
url: "https://rawweights.com/how-it-started.html"
type: page
date: 2026-06-15
---

# How It Started — Atomic GPT Playground

> Train a real Transformer entirely in your browser — no Python, no GPU required. A pure JavaScript decoder-only Transformer based on Andrej Karpathy's makemore, the glass-box educational tool that started RawWeights.

## Overview

Atomic GPT is where RawWeights began. Frustrated by the gap between reading about Transformers and actually understanding them, the founder built a decoder-only Transformer from scratch in pure JavaScript — runnable entirely in the browser with no setup, no Python, no GPU. The architecture follows Andrej Karpathy's makemore project closely enough to be a faithful implementation, but is structured as a glass-box tool designed for inspection and learning rather than production use.

Watching a Transformer train in real time — seeing loss drop, watching the generated text improve from random noise toward something coherent — is the fastest path to genuine intuition for how LLMs work.

## Key Topics / Sections

- **The Playground**: A live, runnable Transformer training session directly in the browser. Train on any text you paste in — names, words, poetry — and watch the model learn character-by-character generation.
- **How it Works (Simple)**: A plain-language explanation of what the Transformer is doing — tokens, attention, prediction, loss — accessible to non-technical readers.
- **How it Works (Technical)**: The engineering implementation — decoder-only architecture, character-level tokenisation, scaled dot-product attention, positional encoding, and the JavaScript training loop. Based on Karpathy's makemore.
- **Training Controls**: Configurable hyperparameters — number of layers, attention heads, embedding dimension, learning rate, context length, and batch size. Changing these and observing effects is the intended learning mode.

## Related Pages

- [Attention Journey](https://rawweights.com/tools/master_sequence_hub.html) — 13 interactive visualisers from RNNs to Transformers
- [Full LLM Lifecycle](https://rawweights.com/guide/full-lifecycle.html) — Transformer architecture in the full LLM context
- [Visualizing AI: RNNs to Transformers](https://rawweights.com/blog/visualizing-ai-rnns-to-transformers.html) — The conceptual journey that leads here
