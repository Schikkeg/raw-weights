---
title: "Beyond Classical RL: How LLMs Are Actually Trained | RawWeights"
description: "What classical RL doesn't cover when training frontier LLMs — RLVR, reward hacking, multi-environment training, GRPO, and RLHF explained with interactive sandboxes. Based on NVIDIA guest lecture by Chris Alexiuk."
url: "https://rawweights.com/blog/nvidia-llm-post-training.html"
type: blog
date: 2026-06-15
---

# Beyond Classical RL: How LLMs Are Actually Trained

> What classical reinforcement learning textbooks don't cover when training frontier LLMs — RLVR, reward hacking, GRPO, multi-environment training, and the RLHF vs. RLVR ordering debate. With interactive sandboxes.

## Overview

Classical RL (Q-learning, policy gradients, actor-critic) is necessary background for understanding LLM post-training — but it is not sufficient. Frontier models like DeepSeek-R1 and GPT-4 are trained with techniques that classical RL curricula do not cover: verifiable reward signals (RLVR), group relative policy optimisation (GRPO), multi-environment training for generalisation, and the specific sequencing of RLHF vs. RLVR that changes outcomes dramatically. This article — based on Chris Alexiuk's NVIDIA guest lecture — fills those gaps with interactive sandboxes.

## Key Topics / Sections

- **Before You Start**: What classical RL background is assumed and what this article adds.
- **What Classical RL Doesn't Cover**: The specific gaps — reward functions that work on verifiable outputs (math, code), the difference between subjective human preferences and objective verification, and why classical RL environments don't map to language model training.
- **Interactive Sandbox**: Six interactive modules:
  - *The 4-Phase Post-Training Pipeline*: SFT → Reward Modelling → RLHF → RLVR (or RLVR → RLHF) visualisation
  - *SFT Bootstrap — The Math Teacher Analogy*: How supervised fine-tuning creates the baseline behaviour before RL begins
  - *RLVR — Verifiable vs Subjective Rewards*: Why math and code tasks can use automated verification while open-ended tasks require human or LLM-as-judge scoring
  - *Reward Hacking — Cheese vs Banana*: How models find unexpected paths to reward signals and why reward model robustness is a research problem
  - *Multi-Environment RL — The School Exam Analogy*: Training across multiple task types to prevent over-specialisation
  - *GRPO — Group Relative Policy Optimisation*: DeepSeek's key innovation — comparing a group of sampled responses rather than against an absolute baseline
  - *RLHF vs RLVR — Order Changes Everything*: Why the sequencing of human feedback and verifiable reward training significantly affects final model quality

## Key Takeaways

- RLVR is not classical RL — the reward signal is the verification function, not a learned reward model, which eliminates reward model error compounding
- Reward hacking is a structural problem at frontier scale, not an edge case — GRPO's group-relative scoring is a partial mitigation
- The RLHF vs RLVR ordering debate is unresolved — some frontier labs run RLHF first to install alignment, then RLVR for reasoning; others reverse this

## Related Pages

- [LLM Post-Training Guide](https://rawweights.com/guide/llm-post-training-guide.html) — Full interactive guide to fine-tuning, DPO, and merging
- [From Auto-Complete to Custom Assistant](https://rawweights.com/blog/from-auto-complete-to-custom-assistant.html) — Visual intro to post-training concepts
- [Deep Reinforcement Learning](https://rawweights.com/tools/deep_reinforcement.html) — Interactive RL playground
