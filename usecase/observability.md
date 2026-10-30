---
title: "AI Agent Observability — Why 200 OK Lies | RawWeights"
description: "Traditional monitoring is blind to AI agent failures. Learn the telemetry standards, trace architectures, and interactive tools to actually see what your agent did."
url: "https://rawweights.com/usecase/observability.html"
type: usecase
date: 2026-10-30
---

# AI Agent Observability — Why 200 OK Lies

> Traditional monitoring is blind to AI agent failures. Learn the telemetry standards, trace architectures, and interactive tools to actually see what your agent did.

## Sections

- The Paradigm Shift: Deterministic → Probabilistic
- Railway Simulator: See the Difference
- Compounding Error Calculator
- The 4-Layer Observability Control Plane
- X-Ray Trace Inspector
- Telemetry Standards: OTel vs OpenInference
- Sampling Strategies: Head-Based vs Tail-Based
- 9 Directions Worth Exploring
- Vendor Landscape

## Content

## The Paradigm Shift: Deterministic → Probabilistic

Traditional software fails loudly. An unhandled exception throws a stack trace. A bad database query returns an error code. You know exactly what broke and where.

AI agents fail silently. The same prompt submitted twice can take completely different execution paths. A retrieval step returns garbage context. The model hallucinates. Your monitoring dashboard stays green the whole time.

🚦

#### Traditional: Explicit Failures

Exceptions, stack traces, HTTP 5xx errors. Every failure mode is loud and localized. Monitoring looks for known signatures.

👻

#### Agents: Silent Failures

Wrong answers returned at 200 OK. Hallucinations, bad context, looping tool calls — all invisible to traditional metrics.

🔬

#### What You Need Instead

Runtime state reconstruction, causal trace linking, context quality verification, and probabilistic evaluation.

Feature

Deterministic Monitoring

Probabilistic Observability

**Code Execution**

Static, pre-compiled logic; fixed control flows

Dynamic, model-generated logic; non-deterministic tool selection

**Failure Modes**

Explicit exceptions, stack traces, HTTP 5xx

Silent failures (200 OK), hallucinations, low-relevance retrieval

**State Complexity**

Bounded local memory, predictable request scope

Dynamic: multi-turn history, vector embeddings, transient scratchpads

**Root Cause**

Stack trace inspection, local reproduction

Causal trace tree reconstruction, context audit, token entropy analysis

## Railway Simulator: See the Difference

Think of a static commuter railway vs. a dynamic agent network. The commuter train stops loudly when a rail breaks. The agent network silently routes to the wrong city — and every sensor along the route reports perfect health.

Request Flow Simulator

Reset Send Request Introduce Failure

Static Railway (Traditional Software)

A Origin B Midpoint C Dest ✕

Idle — click Send Request

Dynamic Agent Network (AI Agent)

INPUT LLM SWITCH CORRECT WRONG ← wrong city!

Idle — click Send Request

Key Insight

The static railway fails **loud and early**. The agent network continues at full speed and only reveals its error when you check the final destination — which, in production, no one does automatically.

## Compounding Error Calculator

Agent failures don't add linearly — they compound. A 10-step workflow where each step succeeds 95% of the time doesn't give you 95% end-to-end success. It gives you 60%.

Adjust the sliders to see how quickly individual step accuracy translates into end-to-end collapse:

Number of Steps: 10

 10

Per-Step Accuracy: 95.0%

 95.0%

59.9%

End-to-end success probability

40.1%

Requests that will silently fail

Cumulative Success Rate per Step

S1

95.0%

S2

90.3%

S3

85.7%

S4

81.5%

S5

77.4%

S6

73.5%

S7

69.8%

S8

66.3%

S9

63.0%

S10

59.9%

Thought Experiment

Work through the math: if a system handles 1,000,000 daily requests and 4% fail silently — plausible with a 25-step chain at 99.8% per step — that's **40,000 wrong answers daily**, all at HTTP 200 OK. Your real rate will depend on chain length and step reliability. The point is: this never appears in a standard monitoring dashboard.

## The 4-Layer Observability Control Plane

A production-grade agent observability control plane intercepts, processes, stores, and analyzes telemetry across four strictly separated layers. Each layer has different storage engines, different query patterns, and different latency requirements.

Agent Runtime — four signal sources

**App Logic**what decisions / why they were made

**LangGraph / Framework**how steps executed & chained

**K8s / GPU Infra**CPU · VRAM · queue depth

**Brain / Vector Memory**reads + writes · similarity scores · state

↓ emits four signal types ↓

STRUCTURED LOGS TRACE SPANS (OpenInference) METRICS — USE / RED MEMORY EVENTS

↓

Collection — OpenTelemetry Collector

**Signal Enrichment**stamps trace\_id, session\_id, user\_id on every log & metric

**Tail-Based Sampling**buffers traces; retains anomalies, drops clean noise

**PII Scrubbing**masks prompt content & user data at the collection boundary

↓ routes to specialist storage backends ↓

Storage — four specialist backends

**Log Store**Elasticsearch / ClickHouse · full-text JSON · queryable by trace\_id

**Trace DB**Jaeger / Arize Phoenix · span hierarchies indexed by Trace ID

**Time-Series DB**Prometheus · numerical USE + RED aggregations · alertable

**Memory Audit Log**Mem0 / pgvector · drift scans · poisoning sweeps · state diffs

↓ unified query layer enables cross-signal correlation ↓

Analysis — operator visibility

**Dashboards**Grafana · Phoenix UI — click a latency spike → jump to trace → filter logs, all in one view

**Anomaly Detection**eval score drops · 10× token spikes · retrieval quality drift over time

**Alert Engine**PagerDuty / Slack · threshold breaches → on-call notification

↓ anomaly signals trigger policy dispatch ↓

Control Plane — closed-loop feedback (no redeployment needed)

**Guardrail API**NeMo / Llama Guard · tighten safety filters automatically when eval scores drop

**RAG Threshold Tuner**raise similarity floor · adjust top\_k when retrieval quality drifts below baseline

**Traffic Control**circuit breakers · rate throttles · automatic fallback to secondary model provider

↑ policy updates flow back to Agent Runtime — the loop closes without a code deployment ↑

-   1
    
    #### Layer 1 emits what and why
    
    The application layer emits domain signals about decisions made. The framework emits structural signals about how orchestration ran. The runtime emits hardware signals about resource constraints.
    
-   2
    
    #### Layer 2 decouples and enriches
    
    The collection layer sits between the app and storage. It handles protocol translation, batching, signal enrichment, and — critically — tail-based sampling decisions.
    
-   3
    
    #### Layer 3 stores by access pattern
    
    Metrics go to time-series databases optimized for numerical aggregation. Logs go to full-text search engines. Traces go to distributed trace storage indexed by Trace ID.
    
-   4
    
    #### Layer 4 correlates across signals
    
    The key power: click a latency spike on a metrics dashboard, jump directly to the underlying trace, then filter logs by that exact Trace ID — without copy-pasting.
    

## X-Ray Trace Inspector

This is what a real agent trace looks like. Click any span to expand its attributes. Notice how the HTTP 200 OK at the root level tells you nothing — you have to inspect the retrieval span to find the silent failure.

Filter: All Warnings LLM only Tools only trace\_id: 4bf92f3577b3

▼ ROOT HTTP POST /api/v1/investigate 2,340ms 200 OK

http.method:"POST"

http.status\_code:200

net.peer.ip:"10.0.4.12"

▶ LLM query\_classification 120ms OK

llm.model\_name:"claude-sonnet-4-6"

llm.token\_count.prompt:450

llm.token\_count.completion:80

llm.output:"intent=flight\_search, destination=TYO"

▼ TOOL flight\_search\_api 2,100ms 200 OK

tool.name:"flight\_search\_api"

tool.parameters:{"destination":"TYO","departure\_date":"2025-05-01"}

http.status\_code:200

agent.retry\_count:3

▼ RETRIEVAL vector\_search 340ms ⚠ LOW SCORE

retrieval.query\_text:"flights to Tokyo May 1st"

retrieval.documents.0.score:0.41

retrieval.documents.1.score:0.38

retrieval.quality\_threshold:0.70

retrieval.threshold\_breached:true

llm.context\_length\_utilization\_pct:78.4%

▶ LLM response\_generation 180ms ⚠ SILENT FAIL

llm.model\_name:"claude-sonnet-4-6"

llm.token\_count.prompt:1240

llm.token\_count.completion:185

llm.output:"Flights available on May 1st to Tokyo..."

eval.factual\_accuracy:0.23

eval.groundedness:0.18

The retrieval step returned documents with similarity scores of 0.41 and 0.38 — both below the quality threshold of 0.70. The LLM generated a confident-sounding response using that garbage context. The HTTP status code reported 200 OK throughout.

## Telemetry Standards: OTel vs OpenInference

Standard OpenTelemetry was built for HTTP endpoints and database queries. It has no native primitives for prompt tokens, vector similarity scores, or reasoning steps. OpenInference extends OTel specifically for AI systems.

📡

#### Standard OTel Span

Captures: HTTP method, status code, URL, peer IP. **Misses:** token counts, model ID, prompt text, retrieval scores, retry logic.

🧬

#### OpenInference Span

Adds: `llm.model_name`, `llm.token_count.*`, `tool.parameters`, `retrieval.documents.*.score`, `agent.retry_count`.

🔗

#### Trace Context Propagation

W3C `traceparent` headers carry Trace ID + Span ID across service boundaries, sub-agents, and async calls — keeping the entire journey stitched together.

### The 7 Span Primitives You Need

Primitive

What It Stores

Why It Matters for Agents

Trace ID

128-bit global request identifier

Ties every sub-agent call, tool, and DB query to one user request

Root Span

Full transaction from ingress to response

Your timer for end-to-end latency — the thing the user actually experiences

Child Spans

Named sub-tasks nested inside parent

RAG retrieval, LLM inference, tool call — each gets its own measurable unit

Span Attributes

Key-value metadata on each span

Where token counts, similarity scores, and model IDs live

Span Events

Timestamped point-in-time markers

Rate limit hits, retry attempts, stream chunk arrivals

Span Links

Causal references across separate trace contexts

Essential for async sub-agent delegation — unlike parent-child spans they cross trace ID boundaries

Context Propagation

Serialized Trace ID in HTTP/gRPC headers

Prevents trace fragmentation when requests cross service boundaries

### Span Links in Multi-Agent Systems

Parent-child spans share the same Trace ID. Span Links are different — they reference spans in a _completely separate_ trace context. This is what makes async sub-agent delegation traceable: the Research Agent starts its own trace, but its root span links back to the Orchestrator span that spawned it.

TRACE A Orchestrator Agent trace\_id: aaa-111

▼ ROOT plan\_travel\_itinerary

▼ LLM decompose\_task

TOOL delegate\_to\_research\_agent → spawns Trace B

▶ LLM assemble\_itinerary awaits Trace B result

span\_link

TRACE B Research Agent trace\_id: bbb-222

▼ ROOT research\_task ← linked to aaa-111

TOOL web\_search

RETR vector\_search

LLM summarize\_findings

span\_link.trace\_id: "aaa-111" · span\_link.span\_id: "spa-002"

1 Async delegation **Orchestrator → Research Agent** — the research agent runs independently on its own trace. A span link lets you trace back from the research result to the exact orchestrator span that created the task.

2 Background eval pipeline **Eval runs after main trace closes** — the evaluator opens a new trace, but links to the original trace it scored. You can correlate eval results with the exact execution context that produced them.

3 Multi-turn sessions **Cross-turn root cause** — turn 7 references the constraint established in turn 2. Without span links, you'd need to search manually across sessions; with them, the causal chain is navigable in one click.

## Sampling Strategies: Head-Based vs Tail-Based

Storing 100% of production traces is cost-prohibitive. But choosing what to keep is critical — the wrong approach discards exactly the failures you need.

Head-Based Sampling

Dangerous for agents

Decision made at request ingress — before execution starts.

Randomly drops 90% of requests. Low-frequency silent failures are discarded at the same rate as routine successes.

Cheap: no buffering required. But you'll never see the rare catastrophic hallucination that only happens 0.1% of the time.

Tail-Based Sampling

Built for agents

Buffers the full trace locally. Decision made after request completes, using actual execution signals.

Retains traces where: retrieval score < 0.70, tool retries > 2, token usage > 10× baseline, eval score dropped.

Moderate cost (memory buffer at collector). But you capture 100% of the complex anomalous traces that matter.

## 9 Directions Worth Exploring

Current observability platforms handle infrastructure metrics and distributed traces well. The nine areas below aren't necessarily missing from every product — some have partial solutions, others are emerging. Think of them as directions the field is still working through: good hackathon territory, or things to watch as products mature.

EXPLORE #1

Code-Aware AST Analysis

What if trace frames could link to the exact source code AST node — docstring, type annotation, git SHA — that caused a hallucination? The idea: pinpoint line 35 automatically, not after hours of debugging.

EXPLORE #2

ClickHouse Threat Hunting

SQL window queries over trace streams to detect multi-session "slow-and-low" prompt injection — patterns that look harmless per-request but reveal intent across sessions. Most threat tools still work per-request.

EXPLORE #3

Long-Term Memory Auditability

Agents with persistent memory can accumulate drift or deliberately poisoned entries over weeks. Automated sweep jobs that flag semantic outliers before they enter active context is still an open design problem.

EXPLORE #4

Environment State-Diffing

A tool call returning 200 OK proves nothing about whether the mutation was correct. Pre/post state snapshots diffed against agent intent — and automated rollback — would close this verification gap.

EXPLORE #5

Auto-Discovery Topology Maps

In LangGraph or CrewAI systems, sub-agent communication graphs form at runtime. Auto-rendering these without manual instrumentation — by hooking into framework event dispatchers — is technically feasible but not mainstream.

EXPLORE #6

Outcome-Centric Business KPIs

Translating token costs and latency into "cost per completed claim = $0.22 vs. manual $14.50" requires linking trace context to business outcome schemas. Some platforms are starting to offer this; most don't yet.

EXPLORE #7

Closed-Loop Feedback Control

The control plane diagram above shows the closed loop conceptually. Platforms like NeMo Guardrails support dynamic rule updates, but a fully automated signal-to-policy pipeline without human review is still emerging.

EXPLORE #8

Auto-Generated Issue Tickets

Clustering failure traces by root cause and auto-opening a Jira story with impact stats, code pointers, and a suggested fix — this is a compelling hackathon project. LLM-assisted root cause grouping makes it plausible.

EXPLORE #9

Observability-Driven Caching

If your trace logs reveal that 30% of requests are semantically near-identical, you could auto-generate prompt caching rules. The observability data is already there — it just needs a recommendation engine on top.

Note on framing

These are drawn from research and architectural thinking, not from testing specific production systems. They're worth watching as the agent observability space matures — and several make strong hackathon starting points.

## Vendor Landscape

Four distinct platform archetypes exist. The right choice depends on how much control you need vs. how much operational overhead you can absorb.

Archetype

Examples

Control

Agent-Native

Complexity

**Self-Managed**

OTel Collector + Prometheus + Jaeger

Maximum

Low — manual

High

**Commercial Managed**

Datadog, Dynatrace, New Relic

Moderate

Moderate — LLM wrappers

Low

**Cloud-Native**

AWS CloudWatch, GCP Operations

Moderate

Low — infra only

Low

**Purpose-Built AI**

Arize Phoenix, LangSmith, Braintrust

Moderate

Maximum — first-class

Low–Medium

Recommendation

Start with a purpose-built AI platform (Arize Phoenix or LangSmith) for rapid time-to-value on agent-specific observability. Layer in OTel-based infrastructure telemetry alongside it rather than choosing one or the other. **Never use only a general-purpose APM tool for agent observability** — you will be completely blind to the failures that matter most.

🎓

Inspired by a session on **Observability for AI Agents** by **Elena Karrer** from **MongoDB**. The architecture synthesis, interactive tools, extended thinking, and 9 directions to explore are the author's own research and learning built on top of that foundation.
