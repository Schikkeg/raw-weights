---
title: "What Voice AI Gets Right — Insights from Building at Scale | RawWeights"
description: "11 insights that shift how you think about product metrics, latency, data flywheels, and building with AI — drawn from the engineering reality of a 1M-user voice AI product."
url: "https://rawweights.com/blog/voice-ai-insights.html"
type: blog
date: 2026-06-15
---

# What Voice AI Gets Right — Insights from Building at Scale

> 11 insights drawn from engineering a 1M-user voice AI product — covering product metrics, latency architecture, data flywheels, build vs. buy, and why voice prompting makes agents dramatically more effective.

## Overview

Building a voice AI product at a million-user scale reveals truths that benchmarks and demos do not. This article distils 11 specific insights that shift how engineers and product managers think about voice AI — from which metric everyone optimises for (and why it is the wrong one) to the counterintuitive UX decisions that increase retention.

## Key Topics / Sections

- **The Metric Everyone Optimises For Is the Wrong One**: Why latency-to-first-byte is measured but latency-to-understanding is what users actually experience — and why optimising the wrong metric creates products that feel fast but perform poorly.
- **Never Combine Your Transcription Model with Your Formatting Model**: Architectural separation of ASR (acoustic recognition) from post-processing (punctuation, capitalisation, entity formatting) — why coupling them creates a debugging nightmare and limits model improvement.
- **Context Collection Happens Before a Word Is Spoken**: How gathering user context at session start (device, location, history, intent signals) changes every downstream decision in the voice pipeline.
- **The AI Context Layer Everyone Is Building On Was Designed for Blind People in 2001**: Why accessibility infrastructure (ARIA, screen reader APIs) is now the substrate for voice AI interfaces — and the constraints this creates.
- **A Protocol Swap Drove a Dramatic Overnight Usage Jump**: The architectural change that had the largest single-day impact on engagement — switching from REST polling to WebSocket streaming for real-time audio feedback.
- **The UX Decisions That Seem Wrong — and Why They're Exactly Right**: Counterintuitive UX choices that increase retention: deliberate pause before response, barge-in suppression, and confirmation echoing.
- **The 20→80 Shift Is What Product-Market Fit Actually Looks Like**: How the usage distribution changed when the product found its core use case — and what the data actually showed vs. what the team expected.
- **Build vs. Buy Comes Down to One Question**: The frame that resolves most build vs. buy debates for voice AI components — and it is not cost.
- **AI Coding Agents Are Trained to Be Polite — and That's a Serious Engineering Problem**: Why coding agent politeness (excessive confirmation, cautious suggestions, hedge-everything outputs) creates specific failure modes in voice AI development workflows.
- **Move Human Judgment Upstream**: Why human review should happen at decision points, not at output review — and what changes when you restructure the workflow around that principle.
- **Using Your Voice to Prompt AI Agents Makes Them Dramatically More Effective**: The empirical finding that voice-prompted agent sessions produce measurably better outputs than text-prompted sessions — and the hypothesis for why.

## Key Takeaways

- The metric that engineering teams optimise for in voice AI is almost always not the metric that drives user satisfaction
- Architectural separation of ASR from post-processing is a non-negotiable design choice for a maintainable voice pipeline
- Voice prompting changes how users formulate requests — and that change produces better agent outputs, not just more convenient inputs

## Related Pages

- [Agentic Architecture Strategy](https://rawweights.com/blog/agentic-architecture-strategy.html) — Building resilient autonomous systems
- [Digital Colleague Masterclass](https://rawweights.com/blog/digital-colleague-masterclass.html) — Coding agents and the three pillars of autonomous task completion
- [MCP Guide](https://rawweights.com/guide/mcp.html) — Standardised tool integration for AI agents
