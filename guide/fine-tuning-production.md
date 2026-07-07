---
title: "Fine-Tuning Part 2: The Production Protocol | RawWeights"
description: "What happens after you train? LoRA deployment paths, RL alignment methods, synthetic data, GPU cost tiers, distillation, and Ollama — the full production playbook."
url: "https://rawweights.com/guide/fine-tuning-production.html"
type: guide
date: 2026-07-07
---

# Fine-Tuning Part 2: The Production Protocol

> What happens after you train? LoRA deployment paths, RL alignment methods, synthetic data, GPU cost tiers, distillation, and Ollama — the full production playbook.

## Sections

- After Training: Two Ways to Deploy a LoRA Adapter
- Model Cards — Your Model's Passport
- Canary Deployments & Stack Rollback
- Reinforcement Learning — The Alignment Engine
- How Rewards Work: RLVR vs RLHF
- The Method Ladder — Always SFT Before RL
- Synthetic Data — Teaching Without Enough Real Examples
- Distillation — The Teacher-Student Protocol
- GPU Cost Architecture — Three Tiers
- Training vs Inference Cost — The Break-Even
- Ollama & Local Inference — AI That Runs Anywhere
- The Production Checklist

## Attribution

Building the VocabForge pipeline end-to-end taught me that the initial training run is the smaller half of the work. Everything after — packaging it so it doesn't become a black box, choosing a deployment path that doesn't overextend you on day one, building feedback loops so the model improves rather than just repeating itself — that's where most of the decisions live. The sections below are the ones I had to figure out in practice.

## Related Pages

- [Fine-Tuning Part 1](https://rawweights.com/guide/fine-tuning-llm-guide.html)
- [LLM Post-Training Guide](https://rawweights.com/guide/llm-post-training-guide.html)
- [RL Deep Dive](https://rawweights.com/tools/deep_reinforcement.html)
- [ML Concepts Hub](https://rawweights.com/tools/master_ml_hub.html)


