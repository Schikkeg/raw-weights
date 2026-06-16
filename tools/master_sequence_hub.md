---
title: "Master Guide: Sequence Models to Transformers | RawWeights"
description: "Explore the evolution of sequence models. Understand the math and mechanics behind modern AI—from RNNs to Transformers—with 13 hands-on interactive visualizers."
url: "https://rawweights.com/tools/master_sequence_hub.html"
type: tool
date: 2026-06-15
---

# Attention Journey — Sequence Models to Transformers

> 13 interactive sections tracing the mathematical evolution from vanilla RNNs through LSTM gating, backpropagation through time, self-attention, and the full Transformer architecture. A searchable sidebar guides navigation.

## Overview

The Attention Journey is a long-form interactive guide — part textbook, part playground. A searchable table of contents sidebar lets readers jump to any section; each section contains explanatory text, interactive visualisers, and runnable code pseudocode. The journey traces how the field moved from recurrent processing to parallelised attention, with the mathematics made explicit at each step.

Inputs include configurable sequence lengths, embedding dimensions, attention head counts, and gate values. Outputs include hidden state visualisations, attention weight heatmaps, and gradient flow diagrams.

## Key Topics / Sections

The 13 sections:

- **1. Introduction to Sequence Models**: Why sequences matter — time series, language, and any data where order encodes information.
- **2. Problem Formulations**: Sequence-to-single-output, single-input-to-sequence, and sequence-to-sequence — the three task types that drive architecture choices.
- **3-4. Building & Formalising RNNs**: The hidden state as a memory pad; the mathematics of hidden state propagation; TensorFlow pseudocode.
- **5. Training RNNs**: Computing sequence loss across time steps; backpropagation through time (BPTT) mathematically derived.
- **6. Real-World Sequence Modeling & Embeddings**: Word embeddings, tokenisation, and how sequences of text become sequences of vectors.
- **7. Backpropagation Through Time**: Vanishing and exploding gradient problems in recurrent networks — why standard RNNs fail on long sequences.
- **8. LSTMs and Gating Mechanisms**: Solving gradient instability with forget gate, input gate, and output gate; interactive gate visualiser.
- **9. Limitations of Recurrent Models**: Sequential computation bottleneck, fixed-size context, and why the field needed a different approach.
- **10. Introduction to Attention**: Eliminating recurrence; the intuition behind self-attention as a differentiable lookup.
- **11. The Attention Mechanism (Q, K, V)**: The database search analogy; Query, Key, Value decomposition; the 2-step extraction process.
- **12. Self-Attention Operations**: Four steps — positional encoding, QKV extraction, attention weighting, feature extraction — with interactive diagrams.
- **13. Transformer Architecture & Applications**: Multi-head attention; stacking layers; real-world applications from translation to code generation.

## Related Pages

- [ML Master Hub](https://rawweights.com/tools/master_ml_hub.html) — Prerequisites: neural network fundamentals
- [How It Started](https://rawweights.com/how-it-started.html) — Train a decoder-only Transformer in the browser
- [Visualizing AI: RNNs to Transformers](https://rawweights.com/blog/visualizing-ai-rnns-to-transformers.html) — Blog companion to this playground
