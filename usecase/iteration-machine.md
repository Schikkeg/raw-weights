---
title: "The Iteration Machine | RawWeights"
description: "Six AI practitioners share what it actually takes to build agents that improve: the observation loop, calibrated evals, simulation, model-independent harnesses, and efficient training."
url: "https://rawweights.com/usecase/iteration-machine.html"
type: usecase
date: 2026-10-30
---

# The Iteration Machine

> Six AI practitioners share what it actually takes to build agents that improve: the observation loop, calibrated evals, simulation, model-independent harnesses, and efficient training.

## Sections

- The Evening
- The Core Thesis
- The Iteration Loop
- Building Robust Evals
- Context Engineering
- Training at Scale
- Four Panel Takes
- What Stays Hard

## Content

### In this page

1.  [The Evening](#section-speakers)
2.  [The Core Thesis](#section-thesis)
3.  [The Iteration Loop](#section-loop)
4.  [Building Robust Evals](#section-calibration)
5.  [Context Engineering](#section-context)
6.  [Training at Scale](#section-shao)
7.  [Four Panel Takes](#section-panel)
8.  [What Stays Hard](#section-hard)

## The Evening

Who spoke and what they covered

A Nubank AI event brought together six practitioners — two researchers sharing production systems at scale, and four panelists representing different layers of the AI tooling stack. The connecting thread across all six talks: **the hard part is not building agents, it's building the loop that makes agents better.**

Nubank · Talk

#### Aman Gupta

Principal ML Engineer. Built the eval + iteration system powering AI at 135M users.

Nubank · Talk

#### Shao Tang

Senior Staff ML Engineer. Research on 8-bit Muon optimizer for efficient pre-training.

Braintrust · Panel

#### Ameya Bhatawdekar

Field CTO. AI-shaped data and what it takes to get signal at production scale.

Snowglobe · Panel

#### Shreya Rajpal

CEO & Cofounder. Simulation as a probing tool — two modes, two different jobs.

Factory · Panel

#### Eno Reyes

CTO & Cofounder. Model-independent harnesses and the eval ladder nobody climbs.

Nubank AI · Panel

#### Rohan Ramanath

GM of AI Division. Moderating and pushing on judge calibration: how do you trust your judges?

## The Core Thesis

Aman Gupta, Nubank

"Agent quality is a function of velocity. The loop is the product."

— Aman Gupta, Principal ML Engineer, Nubank (135M users)

This is the entire talk in two sentences. Not: build a better model. Not: add more tools. The team that improves fastest wins. The bottleneck is never the model — it's how fast you can observe failures, evaluate what went wrong, and iterate on a fix.

Everything Aman described — observation sources, eval design, prompt optimization — is in service of one goal: compress the cycle time of the loop.

**Why this matters:** Most teams focus on the prompt or the model. Aman's argument is that those are outputs of the loop, not the loop itself. If you don't have a fast, reliable loop, every improvement is a lucky guess.

## The Iteration Loop

Click a node to explore each stage

👁️ Observe → ⚖️ Evaluate → 🔁 Iterate ↩

#### 👁️ Observe — Two Sources of Truth

You can't evaluate what you haven't seen. Aman's team uses two complementary observation pipelines running in parallel.

**Production Traces** Real user conversations logged from live traffic. Shows you exactly how users actually talk to your agent — including the edge cases you never anticipated.

**Synthetic Simulation** Controlled environments where you generate test conversations. Lets you cover edge cases before they reach users, and measure specific behaviors on demand.

**Nubank's simulation win:** In a recent experiment, simulation caught the same failure rates as production traffic — in a fraction of the time and cost. For a 135M-user system, waiting for real traffic to surface a failure can mean millions of bad interactions before you know something's wrong.

#### ⚖️ Evaluate — Binary, Not Beautiful

Aman's team tried 1–10 scales. They moved to pass/fail. Here's why that's actually smarter.

**Pass / Fail Only** Binary evals are easier for human raters to agree on. "Did the agent answer the question correctly?" is clearer than "Rate this answer from 1–10."

**Inter-Annotator Agreement** 100 conversations × 5 human labelers = 500 labels. Measure how often they agree. High agreement = your eval criteria is clear. Low agreement = fix the criteria, not the model.

**Judge Calibration** Once humans agree, tune your LLM judge to match human labels. If the judge diverges, the judge is wrong — not the humans.

**Recalibrate Continuously** Models update. User behavior shifts. Data distribution drifts. Your judges must be re-calibrated whenever anything significant changes.

#### 🔁 Iterate — Four Speeds

Iteration isn't one thing — it's a ladder. Each rung is faster and more automated than the one below.

**Manual** Read evals, rewrite prompts by hand. Slow. No guarantee of improvement. Good for initial exploration only.

**JEPA via DSPy** LLM-assisted prompt optimization. Generates candidate prompt rewrites, scores them against your evals, keeps the best. Faster than manual, more principled.

**PPO (Internal)** Proximal Prompt Optimization — Nubank's internal tool. Epsilon-clipped changes prevent wild divergence. Now drives 60%+ of prompt edits at Nubank.

**Deployment Gate** Changes must pass simulation → evals → 1–5% A/B test → human fallback. Any step failing sends it back to the loop.

**GPT-4.1 → GPT-5 lesson:** When Nubank upgraded to GPT-5, prompts that worked fine on 4.1 broke. GPT-5 follows instructions more strictly — which exposed ambiguities in prompts that 4.1 tolerated. The iteration loop caught this in simulation before it hit users.

## Building Robust Evals

Aman Gupta + Ameya Bhatawdekar

An eval that isn't calibrated is just vibes in a spreadsheet. The process Aman described — echoed by Ameya from Braintrust — is a five-step loop, not a one-time setup.

-   **Define your guidelines.** Write what "good" looks like for your specific use case. These are not generic — "accurate" means something different for a financial AI than a creative writing tool. Be specific enough that two people reading them reach the same conclusion.
    
-   **Test human agreement first.** Have multiple annotators label the same 100 conversations independently. Calculate inter-annotator agreement. If they disagree often, your guidelines are ambiguous — fix the guidelines before touching any model.
    
-   **Run your LLM judge.** Once humans agree, run the same conversations through your LLM judge. Compare its labels to human labels. The judge should track human agreement closely (Spearman correlation is a common measure).
    
-   **Measure and close the gap.** Where the judge diverges from humans, refine the judge's instructions. The judge is wrong; the humans are the ground truth. Iterate on the judge like you iterate on the agent.
    
-   **Re-calibrate on change.** Any significant change — new model, new data distribution, new user behavior — requires you to restart from step 2. **This is not a one-and-done process.**
    

**Ameya's point:** Production data is what forces this process to stay honest. When you're in a planning room writing evals by hand, you make assumptions about how users will behave. Everyone is surprised by the variance when they hit production. The loop only works if production feeds back into your eval set.

## Context Engineering

Aman Gupta, Nubank · The real lever in agent systems

Prompt engineering is a small subset of context engineering. The whole question is: what information does the model have when it generates a response, and is that the right information? Aman's team structures prompts into five layers — each with a specific job.

Role Who is this agent? What is its identity and boundaries?

Instructions What must it always do? What must it never do?

Routines Step-by-step procedures for specific task types

Macros Reusable templates and standard responses

Working Memory Dynamic context: retrieved facts, conversation history, user state

The shift Aman highlighted: teams are moving **away from RAG** toward **dynamic context discovery**. Instead of a fixed retrieval step, the agent decides what it needs and fetches it. The prompt becomes a scaffold; the content is assembled at runtime.

### Tool Design Principles

Tools are part of context — their names, descriptions, and return values shape what the model does. Aman's team learned these rules the hard way:

Idempotent

Calling a tool twice should produce the same result as calling it once. Agents retry on uncertainty.

Structured Errors

Return machine-readable errors with context. Vague error strings make the model guess wrong next step.

Don't Chain Tools

One tool, one job. If a tool calls another tool internally, failures become invisible and debugging becomes impossible.

Write Real Descriptions

Tool descriptions are part of the prompt. "Gets data" is useless. "Returns last 30 days of transaction history for account ID" is useful.

## Training at Scale

Shao Tang, Nubank · The efficiency layer under everything

Aman's loop runs on top of models. Shao Tang works on what goes into making those models cheaper and more efficient to build. This is deeper ML research — but the punchline is practical: **train bigger models on the same hardware by compressing the optimizer's memory footprint.**

### Start here: what is an optimizer?

When you train a language model, you run examples through it, measure the error, and adjust the model's weights to reduce that error. The optimizer is the component that decides how to adjust the weights. It keeps notes between updates — called **optimizer state** — to make smarter adjustments.

The problem: optimizer state is huge. For a large model, it can take as much memory as the model itself — sometimes more. This directly limits how large a model you can train on a given set of hardware.

### Adam vs. Muon — what's different

#### Adam W (traditional)

Tracks two types of momentum — first-order (direction) and second-order (how fast the direction is changing). Both stored at full precision.

Optimizer state memory

Full (100%) — two momentum buffers

Compressing to 8-bit with simple linear quantization causes training to diverge. Needs expensive dynamic quantization to be stable.

#### Muon (newer)

Tracks only first-order momentum, but structures it as a matrix update (Newton-Schulz iteration). Better convergence than Adam in pre-training experiments.

Optimizer state after 8-bit compression

38% of original

**Key finding:** Muon's matrix structure is mathematically robust to simple linear quantization. No dynamic quantization needed.

62%

optimizer state memory saved with 8-bit Muon

Parity

validation loss matches full-precision Muon on benchmarks

Larger

models now trainable on the same hardware budget

**Why this matters for the rest of the talks:** Every agent system the panelists described runs on top of a base model. Shao's work means those base models can be larger — better reasoning, better instruction following — without needing proportionally more expensive hardware. The efficiency layer is what makes the iteration layer sustainable.

## Four Panel Takes

Click a name to see their key insight

Ameya Shreya Eno Rohan

A

#### Ameya Bhatawdekar

Field CTO · Braintrust

### AI-Shaped Data is Different — and Traditional Tools Can't Handle It

When you start building AI products, traditional observability tools feel fine. You log traces, you look at dashboards, you ship. Then you get product-market fit and suddenly you have millions of traces — and each trace isn't a number, it's a document.

Traditional observability data

Numbers. CPU %, latency, error rates. Fits in rows, queryable in seconds, scales easily with standard tools.

AI-shaped data

Gigabytes per trace. Tool calls, reasoning chains, context windows, multi-turn conversations. Traditional tools choke.

Ameya's framing: at production scale, you face two new challenges simultaneously. First, the volume — hundreds of millions of traces per day. Second, the unknown-unknown problem: your scoring functions can only catch failures you've already defined. The interesting failures are the ones you haven't anticipated yet.

"Almost everyone is surprised by the variance they observe in production. You need to harvest production data to build out your evals — you can't write them in a planning room."

— Ameya Bhatawdekar, Braintrust

S

#### Shreya Rajpal

CEO & Cofounder · Snowglobe

### Simulation Has Two Jobs — Don't Confuse Them

Shreya's background is self-driving cars. In autonomous vehicles, you don't wait for the car to encounter a pedestrian running a red light before you test for it. You simulate. AI agents have the same problem: waiting for real users to find edge cases is costly.

Mode 1: Robustness / Probing

Oversample edge cases. Scores will look _worse_ than production. That's intentional — you're drawing the boundary of where your agent fails, not measuring average performance.

Mode 2: Distribution Match

Mimic production distribution. Scores look realistic. Used for rapid iteration — fast feedback on whether a change actually helped on typical inputs.

The trap: teams run simulation in robustness mode, see lower scores, panic and think their agent is broken. Shreya's point is that in robustness mode, a high failure rate is the correct output — you designed it to fail at the edges. The metric isn't "pass rate," it's "how far from my normal distribution does failure start?"

**When you have no production data yet:** Snowglobe benchmarks against general conversational datasets, then augments for the specific domain (customer success, coding, etc.). Out of the box, zero-data simulation still beats engineers manually writing test scenarios — and it's dramatically faster.

E

#### Eno Reyes

CTO & Cofounder · Factory

### The Eval Ladder — Start at the Bottom, Not the Top

Most teams building agents jump straight to LLM-as-judge evaluation. Eno's argument: you're starting at the wrong end. There's a whole ladder of cheaper, faster, more reliable evaluations that teams skip past, leaving enormous value on the table.

Type Checkers  
& Linters

Free, instant, no AI required. Does the output parse? Is it valid JSON? Does it match the expected schema? "A massive upgrade in agent abilities" just from adding these.

Unit Tests

Spot checks on single behaviors. "Does the agent respond appropriately? Is prompt caching set up?" Run on every commit. Fast and deterministic.

Integration  
/ E2E Tests

Run the full agent loop end-to-end on a curated set of scenarios. Like CI/CD but for agents. Connects the whole system together.

LLM Judge  
Rubrics

Last resort, not first resort. Expensive, non-deterministic, requires calibration. But necessary for open-ended quality judgments that can't be codified.

Factory's AutoWiki (an agent that auto-generates internal wikis from codebases) illustrates this full stack: sub-agents explore the codebase, synthesis merges findings, validator agents independently check the work, and finally rubric-based judges assess quality. Each layer catches different failure modes.

"LLMs checking LLMs — if your probes are precise enough, it works. The question is precision."

— Eno Reyes, Factory

R

#### Rohan Ramanath

GM of AI Division · Nubank

### Eval and Observability Are Inherently Coupled

Rohan moderated the panel, but his most pointed contribution was a framing challenge he kept returning to: tracing is only half the product. You can log every interaction in perfect detail and still know nothing about quality. Eval is what connects traces to meaning.

His sharpest question of the evening — aimed at Ameya — was about the trust problem with LLM judges: _"Braintrust has a product called Scorers, which is essentially an LLM that takes in a prompt and gives you a judgment on your eval dataset. How do you measure the quality of your LLM judges?"_

The answer Ameya gave — and Aman had illustrated earlier — is that you calibrate. You never just "vibe" an LLM judge. You establish human ground truth first, then measure how closely the judge tracks it. A judge you haven't calibrated is a judge you can't trust.

**The model-change risk:** Rohan also surfaced a future concern — in a world where LLMs are nearly infallible, using one LLM to evaluate another becomes circular. But in the real world today, LLMs make errors, and knowing when the judge is wrong is itself an unsolved problem. Human calibration stays load-bearing until models become deterministic.

## What Stays Hard

Panel closing thoughts · What optimization doesn't solve

The panel closed with predictions. There was surprising agreement on one thing: the tools for optimization will keep getting better. What won't get easier is everything upstream of optimization.

Defining "good" stays hard ▶

What does a good answer look like for your specific product? This question sounds simple and is actually the hardest part. It's application-specific, it can't be borrowed from a benchmark, and it requires domain expertise to even articulate. MMLU can tell you if a model knows facts. It can't tell you if your fintech agent is giving the right balance of caution and helpfulness for your user base. That definition is yours to write — and it will change as your product evolves.

Human calibration remains until models become deterministic ▶

LLM judges reduce the load on humans but don't eliminate it. As long as models are probabilistic — producing different outputs for the same input across runs — you need humans to establish ground truth, detect drift, and catch the categories of failure that LLM judges systematically miss. The moment judges become reliable enough to replace human calibration, the problem mostly goes away. We're not there yet.

Production data will always surprise you ▶

Every panelist echoed the same observation independently: teams are consistently surprised by how users actually behave in production. Users are creative, inconsistent, and often use your product in ways you never anticipated. Simulation helps, but it's constrained by your imagination. Production expands the edges of what's possible in ways that can't be fully anticipated. The gap between "we tested it well" and "users found a way to break it" never fully closes.

Optimization is getting easier — data and evals are not ▶

This was the strongest prediction from the panel — said almost verbatim by Ameya: "Data and evals are always the hard part. Optimization gets easier." Tools like PPO, DSPy, and automated prompt optimization mean that once you have good evals, the iteration step is increasingly automated. But you still have to define what you're optimizing for. No tool can do that for you.

Closed-loop, human-managed software factories — within 12 months ▶

The panel's shared bet for the near term: software development will look increasingly like a closed loop where agents write, test, and evaluate their own code — but humans remain in the management role. Not fully autonomous, not fully manual. A hybrid where the iteration machine runs mostly on its own, but humans set the direction, calibrate the judges, and handle the cases where automated evals can't reach a confident answer.

[

#### AI Evaluations: Practitioner Guide

The foundations behind everything discussed here — RAGAS, G-Eval, calibration, EDD, and the full maturity path from manual to automated evals.

→](/tools/eval-proving-ground.html)
