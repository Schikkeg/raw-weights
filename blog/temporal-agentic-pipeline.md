---
title: "Durable, Retrievable, and Trustworthy | RawWeights"
description: "What I learned architecting an agentic pipeline on Temporal, MongoDB Atlas, and Keycard — durability, retrieval, and identity, each owning exactly one layer."
url: "https://rawweights.com/blog/temporal-agentic-pipeline.html"
type: blog
date: 2026-10-30
---

# Durable, Retrievable, and Trustworthy

> What I learned architecting an agentic pipeline on Temporal, MongoDB Atlas, and Keycard — durability, retrieval, and identity, each owning exactly one layer.

## Sections

- Three Questions, Three Layers
- Plain English First
- The Core Architecture
- Layer 1 — Temporal: Durable Execution
- Layer 2 — MongoDB Atlas: Data + Retrieval
- Layer 3 — Keycard: Identity + Access
- Cost Levers Before You Scale
- Platform Review
- Real Learnings
- Moments In Between
- The Meta-Lesson
- Go Deeper
- People

## Content

## Three Questions, Three Layers

Getting an agentic pipeline right means answering three questions that each belong to a different part of the stack. Answering them with the wrong tool — or letting one layer bleed into another — is where things quietly break.

1

Can my pipeline survive failure without redoing or duplicating work?

2

Can retrieval and application state stay in sync without a separate sync layer?

3

Can I prove an agent only ever touched what it was supposed to?

⏱

#### Durable Execution

Temporal. Owns time: retries, resumability, and state that survives process death — without touching the data layer.

🗄

#### Data + Retrieval

MongoDB Atlas + Voyage AI. Owns data: vector search and operational state in one place, no sync lag between what a pipeline writes and what an agent reads.

🔑

#### Identity + Access

Keycard. Owns trust: short-lived, task-scoped credentials with deny-by-default policy, so you can prove what touched what.

The moment one layer starts doing another’s job — a raw credential ends up inside a workflow’s replay history, say, or a database query reaches back to manage its own retry logic — you’ve broken the boundary and created something that’s hard to spot until it bites you in production.

## Plain English First

New to any of these tools? Here’s what each one actually does — before any technical detail. Come back here if a later section loses you.

Temporal

In plain English

Imagine a video game with **mid-level saves**. Normally if the power goes out, you restart from the beginning. Temporal is the autosave — but for server-side programs. Your pipeline can process 40 of 100 documents, the server can completely die, and when a new server starts it picks up at document 41. No re-doing, no duplicates, no data loss.

MongoDB Atlas + Voyage AI

In plain English

Think of it as **a filing cabinet that can also read meaning**. Normally you search a database by exact keyword. Vector search lets you search by _concept_ — “anything about late payments” returns results even if those exact words don’t appear. Atlas combines both in one place, so there’s no second system to keep in sync with what your pipeline just wrote.

Keycard

In plain English

Think of it like giving a **contractor a temporary badge** that only unlocks the specific doors they need, only during their shift, and automatically expires when the job is done. The contractor never has the master key, never keeps the badge overnight, and there’s a log every time they open a door. That’s what Keycard does — for AI agents accessing databases and APIs.

Why do all three matter together?

Each one solves a different failure mode that the others don’t cover. Without Temporal: a crash halfway through loses progress and can duplicate work. Without the right data layer: what your pipeline just wrote and what your agent can read are out of step. Without access control: when something goes wrong, you can’t prove what the agent touched or didn’t touch. They’re not alternatives — they each own a separate concern.

## The Core Architecture

Each layer owns exactly one concern. Click any layer to jump to the deep-dive.

Source content — documents, chunks, raw text

↓

⏱

Temporal — Durable Execution

owns: time (retries, resumability, event history)

Workflows • Activities • Signals • Queries • Continue-As-New

↓

🗄

MongoDB Atlas + Voyage AI — Data + Retrieval

owns: data (vector search + operational state, one place)

Vector Index • Hybrid Search • Auto-Embeddings • Content-hash dedup

↓

🔑

Keycard — Identity + Access

owns: trust (least-privilege, ephemeral, auditable)

Task-scoped credentials • Deny-by-default • MCP server boundary • Workload identity

↓

Agent + Application

“The moment one layer starts doing another’s job, you’ve created a vulnerability that’s hard to spot until it bites you.”

## Layer 1 — Temporal: Durable Execution

⏱ owns: time

Temporal is not “a retry library.” A retry decorator in a typical framework lives entirely inside one running process — if that process crashes mid-retry, the retry state is gone. Temporal externalizes state to a server outside your process, replays an event history to reconstruct exactly where execution left off, and resumes on a different machine if needed. That’s a categorically different guarantee: not “retry the call,” but **“the process itself can die and the work still finishes.”**

Business logic splits into two kinds of code: **Workflows** (the deterministic orchestration plan) and **Activities** (the actual side-effecting work — API calls, embedding a chunk, writing to the database). If the worker crashes after chunk 40 of 100, a new worker replays the event history, sees chunks 1–40 already completed, and resumes at 41. No re-embedding. No duplicate API calls.

🔁

#### Event History Replay

Temporal replays workflow history to reconstruct state after a crash. The worker recovers without you writing any recovery logic.

🛑

#### Signals + Queries

Pause a workflow until an external party approves (Signal), or inspect what decisions were made (Query). The primitives for approval-gating in compliance workflows.

📜

#### Continue-As-New

Cap event history growth on long-running workflows by continuing execution with a fresh history. Essential for large pipelines that run indefinitely.

⚠ Idempotency is still your job

Retries aren’t automatically safe for side-effecting operations. If an activity charges a card, a naive retry after a timeout could double-charge. You structure the activity to check whether the action was already recorded in event history before retrying, and either skip or explicitly reverse. Temporal gives you the durable record to check against — you still have to write the check.

What about using event history as a compliance record?

I asked directly whether workflow event history could serve as a compliance artifact — proof of what was approved, and when. The answer from Temporal’s developer advocate: _“I don’t know the right answer for that, actually.”_ No confident yes. Event history is an operational replay log, not a product feature warrantied as a compliance artifact. The actual primitives for approval-gating are Signals (pause and wait for external approval) and Queries (inspect decisions made). A real distinction if compliance is a hard requirement.

Self-hostable forever (Apache 2.0). Lock-in is programming-model, not data.

Adopting Temporal requires restructuring code into workflows and activities. Migrating off means rewriting that structure — it’s real but mitigated by keeping activities as thin wrappers around plain functions. The core is Apache-2.0 licensed. No vendor controls your data. The managed Cloud tier starts around $100/month; self-hosting is free with your own ops burden.

[

🎓

Mentioned in the session — try it yourself

Temporal Developer Skill (Public Preview)

Loads expert-level Temporal knowledge into your AI coding agent. Covers workflow determinism, activity patterns, retry policies, error handling, testing strategies, and common pitfalls. About 80% is language-agnostic; Python, TypeScript, and Go specifics are included now, with Java, .NET, and more coming. Install in Claude Code: `/plugin marketplace add temporalio/agent-skills` — or via npx: `npx skills add https://github.com/temporalio/skill-temporal-developer`

Read the announcement →

](https://temporal.io/blog/introducing-temporal-developer-skill)

### Code: Idempotent Ingest Workflow

Workflow Activity (idempotency)

```kw
from temporalio import workflow, activity
from temporalio.common import RetryPolicy
from datetime import timedelta

@workflow.defn
class IngestWorkflow:
    @workflow.run
    async def run(self, document_id: str, chunks: list[dict]) -> None:
        for chunk in chunks:
            # Each activity is retried independently
            # If worker crashes after chunk 40, replay resumes at 41
            await workflow.execute_activity(
                embed_chunk,
                args=[chunk["id"], chunk["text"]],
                start_to_close_timeout=timedelta(minutes=5),
                retry_policy=RetryPolicy(maximum_attempts=3),
            )
```

Workflow orchestrates; activities do the actual work. If the worker crashes at chunk 40/100, a new worker replays history and resumes at 41 — no duplicate API calls.

```dc
@activity.defn
async def embed_chunk(chunk_id: str, text: str) -> None:
    # Idempotency check: skip if this content was already embedded
    # Temporal gives you the durable record; you write the check
    existing = await mongo.find_one({
        "chunk_id": chunk_id,
        "content_hash": hash(text)
    })
    if existing:
        return  # Already done, skip — safe to retry

    vector = await voyage_client.embed(text)
    await mongo.upsert({"chunk_id": chunk_id, "embedding": vector})
```

Content-hash check before embedding. Without this, a retry after timeout could call the embedding API twice for the same content — wasted cost and potentially duplicated data.

## Layer 2 — MongoDB Atlas: Data + Retrieval

🗄 owns: data

The core value proposition: collapsing vector database + operational database + embedding service into one platform. No sync lag between what a pipeline writes and what an agent reads, because there’s no separate sync layer to get out of step.

Worth being precise about where AI actually lives in this layer. MongoDB Atlas the database does not use AI — it’s a database and an index. The one place AI genuinely shows up is Voyage AI’s embedding model, generating the vector representations. Everything else (storage, indexing, hybrid vector + full-text search) is conventional infrastructure.

🔍

#### Hybrid Vector Search

Combine semantic vector similarity with traditional field filters in one query — approval status, content type, tags — without separate filter passes.

♻️

#### Blue/Green Model Migration

Different embedding models produce non-comparable vector spaces. Write new embeddings to a new index while the old one serves traffic, then flip a pointer once backfill completes.

⚡

#### Auto-Embeddings

When an underlying document field updates, the embedding regenerates automatically. Distinct from the blue/green migration — that’s for swapping the model; this is for keeping content in sync under a single model.

Content-hash dedup: a correctness guarantee, not just a cost optimization

A content-hash check before re-embedding means unchanged content never triggers a wasted embedding call. Under Temporal’s retry semantics, this matters: without it, a transient failure could cause the same chunk to be embedded twice, producing duplicate vectors in your index that degrade retrieval quality over time.

⚠ Blue/green vs. auto-embeddings solve adjacent but distinct problems

Blue/green cutover is for migrating the _model itself_: you can’t swap model names in place because vector spaces aren’t comparable across models. Auto-embeddings is for keeping a _single model’s_ embeddings in sync as content changes. Worth checking current Atlas docs before assuming which one your use case actually needs.

### Code: Hybrid Query with Metadata-Only Projection

Hybrid query Content-hash dedup

```cm
// Hybrid vector search — filter on approval status,
// project only metadata (never raw content)
db.knowledge.aggregate([
  {
    "$vectorSearch": {
      "index": "vector_index",
      "path": "embedding",
      "queryVector": queryEmbedding,
      "numCandidates": 100,
      "limit": 5,
      "filter": { "legal_approved_status": "approved" }
    }
  },
  {
    "$project": {
      "_id": 0,
      "id": 1,
      "component_type": 1,
      "tags": 1
      // "text" is NOT projected — agent sees IDs and tags, not raw content
    }
  }
]);
```

The agent receives IDs and metadata. The filter on legal\_approved\_status is enforced at the query layer — not in application code that could be bypassed or accidentally removed.

```kw
import hashlib

async def upsert_chunk_if_changed(chunk_id: str, text: str):
    content_hash = hashlib.sha256(text.encode()).hexdigest()

    # Check if the same content was already embedded
    existing = await db.chunks.find_one({
        "chunk_id": chunk_id,
        "content_hash": content_hash
    })

    if existing:
        return  # Unchanged content — skip embedding API call

    vector = await voyage_client.embed(text)
    await db.chunks.update_one(
        {"chunk_id": chunk_id},
        {"$set": {"embedding": vector, "content_hash": content_hash}},
        upsert=True
    )
```

Content-hash check prevents re-embedding unchanged content on retries. Both a cost optimization (no wasted Voyage AI calls) and a correctness guarantee (no duplicate vectors in the index).

## Layer 3 — Keycard: Identity + Access

🔑 owns: trust

Keycard is identity and access management infrastructure for AI agents — the same product category as Okta or Auth0, purpose-built for agents calling tools autonomously instead of humans clicking a UI. It doesn’t run models or make ML-driven decisions; policy evaluation (RBAC/ABAC/ReBAC) is deterministic rule matching.

A live Q&A clarified the mechanism precisely: identity and access gets scoped to the **MCP server itself**, which mediates what it exposes downstream. The agent never holds or sees raw credentials — the MCP server is the thing actually connecting to the database or API, and that’s the layer where access gets limited. This is a more precise mental model than “the agent mints a per-call token” — the server is the trust boundary, not the agent.

⏲

#### Ephemeral Credentials

Short-lived, task-scoped credentials minted at the point of use, never held statically. When the task ends, the credential expires. Nothing to rotate, nothing to leak.

🚫

#### Deny by Default

Access must be explicitly granted. Versioned policies that can be rolled back. If a grant is revoked mid-flight, the next credential mint fails closed — the activity records the denial and the workflow falls back gracefully.

🏷

#### Workload Identity

Associate identities with a platform or service, not just human users. An agentic pipeline is a first-class identity — you can grant and audit it separately from the developer who built it.

⚠ Two gaps confirmed directly in the Q&A (not inferred from docs)

**No behavioral anomaly detection.** Keycard doesn’t detect misuse or anomalous agent behavior on its own. That’s on the developer to build via policy design. Remediation (revoking a grant) can be manual or programmatic, but there’s no built-in behavioral monitoring.  
  
**Java has no official SDK and no near-term roadmap.** Python, TypeScript, and Go are first-party. Java integration is possible via direct HTTP/OAuth calls (OAuth 2.1, token exchange) — you just lose the SDK convenience and take on more manual plumbing.

Maturity trade-off: purpose-built vs. battle-tested

Keycard’s architectural model (task-scoped, ephemeral, agent-native) is purpose-built for exactly this problem. The alternative path — extending Auth0 or WorkOS into agent use cases — trades that native fit for a battle-tested, broadly-supported platform. Neither is strictly better; it’s early-stage-purpose-built vs. mature-but-adapted, and worth evaluating against how much production track record you need.

### Code: Task-Scoped Credential, Minted at Call Time

Scoped activity Fail-closed revocation

```kw
from keycard import grant, access

@activity.defn
@grant(resource="mongodb://knowledge-collection", scope="read:metadata")
async def search_components(query_embedding: list[float]) -> list[dict]:
    # Credential is minted here, scoped to exactly this resource + scope
    # Short-lived. Never stored. Never written into Temporal workflow history.
    credential = await access("mongodb://knowledge-collection")
    client = mongo_client(credential=credential)

    return client.knowledge.vector_search(
        query_embedding,
        project_fields=["id", "component_type", "tags"],
        # "text" not projected — enforced at query layer too
    )
```

The @grant decorator declares what this function is allowed to touch. The credential is minted only at call time, with exactly this scope. It is never stored, reused, or written into Temporal's workflow history.

```kw
from keycard import grant, access, AccessDeniedError

@activity.defn
@grant(resource="mongodb://knowledge-collection", scope="read:metadata")
async def search_with_fallback(query_embedding: list[float]):
    try:
        credential = await access("mongodb://knowledge-collection")
        # ...search logic...
        return results

    except AccessDeniedError as e:
        # Grant was revoked mid-flight (incident, policy change, etc)
        # access() fails closed — activity records the denial
        # Temporal workflow can catch this and fall back gracefully
        return {"status": "access_denied", "reason": str(e)}
```

If someone revokes the grant mid-flight during an incident, the next access() call fails closed. The activity records the denial. The Temporal workflow catches it and can fall back gracefully rather than crash outright.

## Cost Levers Before You Scale

Each tool has one or two levers that matter disproportionately. Knowing them before you hit scale is more useful than a full pricing table.

Tool

Billing model

Key lever

What it avoids

**Temporal Cloud**

Per Action + storage (~$100/mo base, usage-based)

Batch multiple items into fewer workflow executions. Use `Continue-As-New` to cap history growth. Shorter retention for non-critical workflow types.

One execution per item × 100k items = 100k Action charges per run.

**Temporal Self-hosted**

Free (Apache 2.0) — you own ops

Your backing database (Cassandra/PostgreSQL) is the real cost. Right-size it early.

Paying for infrastructure you over-provisioned at the start.

**MongoDB Atlas**

Storage + compute + search units

Content-hash dedup (no re-embedding unchanged content). Index only the fields you query.

Voyage AI embedding calls on every pipeline run even when nothing changed.

**Keycard**

Per transaction (credential issue, validate, exchange, step-up)

Cache the _retrieval result_ at the application layer for repeated/similar queries — this avoids the credential mint entirely, not just the database round-trip. Free tier: 5,000 tx/month. Paid: $500/mo for 100k tx.

Minting a new credential on every semantically identical agent query.

## Platform Review

Honest takes. Includes the things that were confirmed directly in a live Q&A, not just inferred from documentation.

### Temporal

✅ Liked

Genuinely different guarantee

Not retry logic dressed up. Process death is survivable. Event history replay is the mechanism — it’s real, not marketing.

Self-hostable forever (Apache 2.0)

Core is open-source. You can run it forever without a vendor relationship. Cloud managed tier is optional.

First-class Python, Go, Java, TypeScript, .NET

Java was one of the first SDKs and remains one of the most mature. Not an afterthought.

Event history as a debugging tool

Being able to inspect exactly what happened, in order, after a failure is genuinely useful for diagnosing production incidents.

⚠ Gotcha

Programming-model lock-in is real

Adopting Temporal requires restructuring logic into workflows + activities. Migrating off means rewriting that structure. Mitigated by keeping activities thin, but not eliminated.

Idempotency under retries is still your job

Temporal gives you the durable record and the retry mechanism. Writing the check that makes retries safe is still on you.

Event history ≠ compliance record

The developer advocate was direct: no confident yes on this. It’s an operational replay log. Use Signals + Queries for approval-gating if compliance is a hard requirement.

### MongoDB Atlas + Voyage AI

✅ Liked

Unified storage eliminates sync lag

Vector search and operational state in one place means what a pipeline writes is immediately readable by the agent, without a sync step that can fall behind.

Hybrid vector + field filters in one query

Filtering on approval status, tags, or metadata alongside semantic similarity without separate query passes.

Auto-embeddings for content changes

Field updates automatically trigger re-embedding. One less pipeline to write and maintain.

⚠ Gotcha

Can’t swap embedding models in-place

Different models produce incomparable vector spaces. Blue/green cutover is necessary and takes time to backfill. Plan for it before you hit scale.

Atlas itself doesn’t do AI

The AI is Voyage AI generating the embeddings. Atlas is the storage and index. Worth being precise about this when evaluating or pitching the stack.

Auto-embeddings vs blue/green are easily confused

Solve adjacent but different problems. Check current docs to confirm which applies to your specific situation before building the pipeline.

### Keycard

✅ Liked

Purpose-built primitives for agents

Task-scoped, ephemeral credentials that expire automatically. This is the right mental model for agentic access — not a human SSO session extended to a bot.

MCP server as trust boundary

The agent never holds credentials. The MCP server mediates access and is the thing that connects to the actual resource. More precise than "per-call token."

Fail-closed revocation

Revoking a grant mid-flight causes the next access() call to fail closed. Activity records the denial. Workflow can fall back gracefully rather than crash or silently succeed.

⚠ Gotcha

No behavioral anomaly detection

Keycard enforces policy rules. It doesn’t watch for anomalous behavior. Detecting misuse is on you to design via policy structure.

Java: no SDK, no near-term roadmap

Confirmed directly in Q&A. Python, TypeScript, and Go are first-party. Java integration requires manual HTTP/OAuth plumbing. Not inferred — stated directly.

Early-stage product

The primitives are right. Production track record vs. Auth0/Okta is shorter. Evaluate accordingly if production stability is a hard requirement for your timeline.

## Real Learnings

Not summaries of the documentation. Things that only came out in conversation, live Q&A, and stress-testing the design assumptions.

01 — TEMPORAL

Retries are not automatically safe. You write the idempotency check.

Temporal gives you durable retry state and the event history to check against. It does not make your activities safe to retry by default. A naive retry on an activity that charges a credit card, sends an email, or writes to a downstream system could run twice. The fix is in your activity code — check whether the action was already completed in event history before re-executing.

Temporal solves “the state survived.” You still solve “the action is safe to repeat.”

02 — TEMPORAL

“Can event history serve as a compliance record?” got an honest “I don’t know.”

I asked this directly. Temporal’s developer advocate didn’t give a confident yes. They redirected to the actual primitives: Signals to pause a workflow until an external party approves or denies, and Queries to inspect what decisions were made. Event history is an operational replay log, not a compliance artifact — a real distinction if you’re building under regulatory requirements.

An honest “I don’t know” told me more than a confident yes would have.

03 — TEMPORAL

The lock-in is programming-model lock-in, not data lock-in. That’s a real but different problem.

Adopting Temporal means restructuring business logic into workflows and activities with decorators. Migrating off means rewriting that structure. The core is Apache-2.0 licensed and fully self-hostable — no vendor controls your data, no cloud migration needed. But the code structure is Temporal-specific. Mitigate by keeping activities thin wrappers around plain functions, so only the orchestration layer is coupled.

Self-hostable forever. Rewriting the structure to leave is still work.

04 — MONGODB

Auto-embeddings and blue/green model migration solve different problems that are easy to confuse.

Auto-embeddings (re-embed when a document field changes) and blue/green model migration (swap to a new embedding model without downtime) are described in similar terms but address different failure modes. One is content sync under a stable model; the other is index migration under a model change. Picking the wrong one wastes either pipeline complexity or a disruptive cutover window.

Check which problem you actually have before building the pipeline.

05 — KEYCARD

The MCP server is the trust boundary, not the agent. That’s a more precise mental model.

The initial intuition was that access control applies to the agent directly. The Q&A clarified it: the MCP server is the thing that actually connects to the database or API. Access is scoped to the server, which mediates what it exposes downstream. The agent never holds credentials. This changes where you put your policy enforcement — and where you do your auditing.

Scope the server, not the agent. The server is the boundary you can actually enforce.

06 — KEYCARD

No behavioral anomaly detection. That gap was confirmed directly, not inferred.

A direct audience question got a direct answer: Keycard doesn’t detect misuse or anomalous agent behavior. It enforces policy rules deterministically. If an agent starts accessing resources in a pattern that looks wrong, Keycard doesn’t flag it — that’s on you to build via policy design, external monitoring, or application-layer logic.

Access control and behavioral monitoring are different problems. One tool doesn’t solve both.

07 — ALL THREE TOOLS

These are 15–20 year old distributed systems and security concepts, applied to a new caller.

Idempotent retries, least-privilege access, event sourcing for debuggability — none of these are new ideas. What’s changed is that autonomous, non-deterministic agents make skipping these fundamentals show up as a production incident rather than a theoretical risk. The tools here are good, purpose-built implementations of that discipline. The discipline itself, not any one SDK, is the thing worth internalizing.

The concepts predate the tools by two decades. That’s a feature, not a weakness.

## Moments In Between

The small things that happened in the room that didn’t make it into the official summaries.

The honest answer

I asked Temporal’s developer advocate whether event history could serve as a compliance record. **She said “I don’t know the right answer for that, actually.”** No hedge, no redirect to the marketing pitch. That pause told me the boundary between “operational audit trail” and “compliance evidence” is genuinely unsettled. A confident yes would have been a red flag. The honest answer was the useful one.

The precise correction

I had been thinking about Keycard as “the agent mints a token per call.” The Q&A corrected this: **the MCP server is the trust boundary, not the agent.** The agent never holds credentials. The server is the thing connecting to the actual resource. That one clarification changed where I’d put policy enforcement, where I’d instrument auditing, and how I’d explain the architecture to anyone else. Small precision, large impact on the mental model.

The Java gap, confirmed

I asked about Java support for Keycard. **No SDK, no near-term roadmap.** It wasn’t evasive — it was direct. Python, TypeScript, Go are first-party. Java works via raw HTTP/OAuth, but you lose the decorators and typed clients. I appreciated the directness more than I would have appreciated a non-answer about “future roadmap considerations.” Knowing the gap is real means I can plan around it.

The old idea in new clothes

Somewhere in the middle of the session I realized: **every problem being solved here is a distributed systems or security problem from 2005.** Idempotent retries, least-privilege access, event sourcing. What’s new is that the caller is now non-deterministic and autonomous, so skipping these fundamentals costs you more when it fails. The tools are the implementations. The discipline is the thing that doesn’t expire.

The design phase admission

I came in with an architecture I was still stress-testing, not a finished system. I left with **three places where my assumptions were wrong** (idempotency, the trust boundary, and what event history is actually good for). That’s the best possible outcome for a design review — wrong assumptions surfaced before they became production incidents, not after.

## The Meta-Lesson

None of the individual problems here are new. **Idempotent retries, least-privilege access, and event sourcing for debuggability are 15–20-year-old distributed systems and security concepts.** What’s changed is that autonomous, non-deterministic agents make skipping these fundamentals show up as a production incident instead of a theoretical risk. The tools reviewed here are good, purpose-built implementations of that discipline — but the discipline itself, not any one SDK, is the thing actually worth internalizing.

-   1
    
    #### Each layer owns exactly one concern
    
    Temporal owns time. MongoDB owns data. Keycard owns trust. When a layer starts doing another’s job, you’ve created coupling that’s hard to spot in code review and shows up as a production incident.
    
-   2
    
    #### The guarantee matters more than the feature
    
    A retry decorator and Temporal both “retry failed operations.” The guarantees are categorically different. Understanding what guarantee a tool actually provides — not just what feature it advertises — is what lets you reason about failure modes before you hit them.
    
-   3
    
    #### Stress-test the gaps, not just the happy path
    
    The three most useful things I learned came from asking about edge cases: compliance record use, Java support, behavioral anomaly detection. The honest answers to those questions — including the ones that were “we don’t do that” — were more valuable than a demo of the happy path.
    

## Go Deeper

Links that came up in the session, plus where to start if any of the three tools is new to you.

-   [
    
    Temporal — mentioned in the session
    
    Temporal Developer Skill (Public Preview)
    
    Loads expert Temporal knowledge into your AI coding agent. Install: `/plugin marketplace add temporalio/agent-skills`. Covers determinism, retry, activity patterns, testing, and common pitfalls.
    
    →](https://temporal.io/blog/introducing-temporal-developer-skill)
-   [
    
    Temporal
    
    Temporal AI Tools Hub — docs.temporal.io/with-ai
    
    All AI coding tools for Temporal in one place, including the Skills MCP server and the community #topic-ai Slack channel.
    
    →](https://docs.temporal.io/with-ai)
-   [
    
    MongoDB Atlas
    
    Atlas Vector Search Docs
    
    Hybrid search, auto-embeddings, and the model migration patterns covered in this post. Start here if the MongoDB layer is new to you.
    
    →](https://www.mongodb.com/docs/atlas/atlas-vector-search/)
-   [
    
    Temporal — community
    
    GitHub: temporalio/skill-temporal-developer
    
    Source for the Developer Skill. File issues, browse the content, or install manually if you’re not using a marketplace.
    
    →](https://temporal.io/blog/introducing-temporal-developer-skill#github)

## People

This writeup came out of a Builder After Hours session. Direct, unpolished answers to hard questions were the most useful part — especially when the answer was “we haven’t actually validated that.”

Temporal

Melissa Herrera

Developer Advocate

Direct answers including the honest “I don’t know” on compliance records. That answer was more useful than a confident yes would have been.

MongoDB

Nina Lopatina

Developer Advocate

Clarified the auto-embeddings vs. blue/green distinction and where Voyage AI actually fits in the stack. Precise on what Atlas does vs. what the embedding model does.

Keycard

Matte Noble

Developer Experience Lead

Confirmed the Java SDK gap directly rather than deferring it to a vague roadmap. Clarified the MCP server as trust boundary, which was the most useful correction to my mental model.

Still in the design phase — sharing as I go

This is a working writeup of architecture research, not a production postmortem. The design is still being validated. The learnings above came from stress-testing assumptions with the engineers who build this infrastructure — the most valuable kind of early feedback.
