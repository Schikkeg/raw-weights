---
title: "AI Camp: Co-Scientist & Multi-Agent Architecture | RawWeights"
description: "Session notes from AI Camp — Shadab Hussain on Google's Co-Scientist, multi-agent pipelines, and the fluent prose fraud audit finding."
url: "https://rawweights.com/blog/aicamp-coscientist.html"
type: blog
date: 2026-10-30
---

# AI Camp: Co-Scientist & Multi-Agent Architecture

> Session notes from AI Camp — Shadab Hussain on Google's Co-Scientist, multi-agent pipelines, and the fluent prose fraud audit finding.

## Sections

- Who & Where
- What the session covered
- The evolution of AI at work
- The agent architecture
- The audit: 75 AI-generated papers

## Content

## Who & Where

SH

[Shadab Hussain ↗](https://shadabhussain.com/)

Presenter · Google Co-Scientist Architecture

Organised by

AICamp Google Cloud

## What the session covered

🤖

Agentic Workflows

🔗

Multi-Agent Pipeline

📚

Primary Source Grounding

🔍

Fluent Prose Fraud

🏛

Evidence & Audit Trail

👤

Human-in-the-Loop

The talk focused on a live transition happening in enterprise AI — from tools that speed up single tasks to systems that own entire research workflows end-to-end, with grounded evidence and auditable outputs.

## The evolution of AI at work

Most organisations think they're in Era 3. They're in Era 2.

Era 1

Calculator

AI answers one question.  
Humans run every step.

→

Era 2

Copilot

AI writes one snippet.  
Humans manage all handoffs.

→

Era 3 · Now

Agentic Workflow

AI team owns the full loop.  
Humans set goals & approve.

"The bottleneck in research isn't ideas or data. It's coordination cost — the time experts spend moving information between disconnected tools by hand."

— [Shadab Hussain](https://shadabhussain.com/), AICamp 2026

## The agent architecture

6 specialised roles under one Supervisor. Each agent owns one stage of the research workflow.

Research Goal / Question

↓

🎯

Supervisor — Orchestrator

Decomposes goals · Assigns agents · Allocates compute · Manages async task queues

↓ delegates to ↓

📚

Grounder

Live papers via Semantic Scholar · Real-time citation graphs

💡

Generator

Parallel candidate solutions · Not a single chain of thought

⚖️

Critique & Ranker

Pairwise comparisons · Safety · Novelty · Feasibility

🔗

Verifier

Claims bound to execution logs · Method-code alignment

👤

Human-in-Loop

Goal setting · Final approval · Key decision points

↓

✓ Grounded Research Output + Immutable Audit Trail

"The audit trail is the product as much as the result is." — The layer most teams cut first is the one that survives enterprise audits.

## The audit: 75 AI-generated papers

Same pipeline. Two approaches. Measured across 5 systems.

21%

Phantom Citations

Baseline LLMs — single prompt, no grounding

0%

Phantom Citations

Grounded agentic pipeline — live source binding

### ⚠ Fluent Prose Fraud — The Deeper Problem

What the AI wrote

"The system employed a hybrid symbolic solver combining constraint propagation with stochastic gradient descent to achieve sub-linear convergence, validated across three independent benchmark datasets."

What the code actually did

A deterministic script running a fixed grid search over three pre-specified parameter values. No symbolic solver. No stochastic component. One benchmark file, not three.

LLMs optimise for persuasive language. A human reader can't catch the discrepancy. The only defence: every claim must be checked against the execution log, not just trusted because the writing sounds expert.

What this session inspired

The "fluent prose fraud" finding describes exactly what standard AI does with viral health claims. I built **ClaimLens** to show the difference between a single LLM echoing search results and a grounded multi-agent pipeline — side by side, same claim.

[Read the ClaimLens build →](../usecase/claimlens.html) [▶ Watch the session](https://www.youtube.com/watch?v=i2zy5gt5rLk)
