---
title: "SecondEar — Built at the Guava Voice Hackathon | RawWeights"
description: "How two people built a silent FDCPA compliance voice agent in two days at the Guava Voice Hackathon. Honest account of the platform, the learnings, and the moments in between."
url: "https://rawweights.com/usecase/secondear.html"
type: usecase
date: 2026-10-30
---

# SecondEar — Built at the Guava Voice Hackathon

> How two people built a silent FDCPA compliance voice agent in two days at the Guava Voice Hackathon. Honest account of the platform, the learnings, and the moments in between.

## Sections

- What It Does
- Architecture
- How It Works
- Components
- What We Actually Learned
- Moments in Between
- Platform Review — Guava
- The Team

## Content

## What It Does

SecondEar silently joins a regulated debt collection call and monitors it against three FDCPA requirements in real time. No human reviewer needed. When the call ends, a structured JSON report lands in `reports/`.

3

FDCPA checklist items

2

days to build

0

words spoken by agent

2

team members

🎙️

#### Listens, Never Speaks

Joins the call as a silent party. The LLM is locked into a task with no completion criteria — it can never decide to greet or respond.

✅

#### Live Checklist

Checks every utterance against the mini-Miranda, identity verification, and dispute rights. Marks hits with timestamps as soon as keywords land.

🛡️

#### Auto-Redaction

Card numbers and SSNs are masked before anything is logged. A separate flag tracks when sensitive data was spoken and by whom.

🔍

#### CRM Match

Scans utterances for debtor names. When a match is found, the account record — balance, status, DOB — surfaces instantly in the terminal.

📄

#### Compliance Report

On hangup, a structured JSON report captures the checklist verdict, full redacted transcript, flags, and the CRM account if matched.

☁️

#### Deployed on Guava Cloud

Runs on a real provisioned number. Any call to `+1 (484) 317-4203` is monitored. No server to manage.

**The FDCPA checklist:** Mini-Miranda (§807(11)) — "This is an attempt to collect a debt."  ·  Identity check before account discussion.  ·  Dispute rights (§809(a)) — "You have the right to dispute this debt within 30 days."

## Architecture

Three layers. Guava Cloud owns the phone network and speech-to-text. `main.py` receives events and orchestrates the pipeline. Four expert modules each do exactly one job.

Inbound

📞   Phone Call  ·  +1 (484) 317-4203

PSTN

Guava Cloud

Phone Gateway

Accepts inbound PSTN  
provisions +1 (484) 317-4203

STT Engine

Streams partial transcripts  
fires events per utterance

Session Manager

Tracks call lifecycle  
routes on\_call\_start / on\_session\_end

SDK events

SecondEar Core — main.py

on\_call\_start

init per-call state  
set\_task(silent, never-ends)

on\_caller\_speech

dedup by utterance\_id  
→ redact → CRM → checklist

on\_agent\_speech

safety net only  
SecondEar never speaks

on\_session\_end

build report → save  
clear call state

module calls

Expert Modules

redactor.py

regex strips card / SSN  
before any storage

checklist.py

3 FDCPA keyword arrays  
first hit per item wins

crm.py

name scan → account lookup  
returns on first match

report.py

builds JSON + verdict  
prints terminal summary

output

Output

Terminal — live hits

✔ checklist hits as they land  
CRM card on name match  
⚠ redaction alerts

report\_\*.json

COMPLIANT / NON-COMPLIANT  
full redacted transcript  
timestamps + CRM record

## How It Works

A single Python file, four supporting modules, and a cloud deploy. The entire processing pipeline fits in under 200 lines.

📞

Inbound Call

+1 (484) 317-4203

→

☁️

Guava Cloud

STT · Session

→

👂

SecondEar

Guava Python SDK

→

📋

Report

COMPLIANT / NOT

-   1
    
    #### Call arrives
    
    `on_call_start` fires. SecondEar immediately sets a task: _"Stay silent for the entire call. Never greet. This task never completes."_ This locks the LLM from ever speaking.
    
-   2
    
    #### Speech events arrive — deduplicated
    
    Guava's STT fires `on_caller_speech` multiple times per sentence as it refines the transcript. SecondEar tracks `utterance_id → last text` and skips unchanged events — otherwise every sentence is processed 3–5 times.
    
-   3
    
    #### Redact, then check
    
    The redactor strips card numbers and SSNs before anything is stored. The cleaned text is then checked against the 3-item FDCPA keyword list. First match per item wins — no re-processing.
    
-   4
    
    #### CRM lookup on name detection
    
    Every utterance is scanned for known debtor names. On first match, the account record is printed to the terminal and stored in call state. Subsequent utterances skip the lookup.
    
-   5
    
    #### Hangup triggers the report
    
    `on_session_end` builds a JSON report: checklist verdict (COMPLIANT / NON-COMPLIANT), all hits with timestamps, the redacted transcript, any flags, and the CRM record if matched.
    

## Components

Every file in the project, its single responsibility, and the key implementation detail a developer needs to know.

File

Role

Key Detail

`main.py`

Agent definition + all four Guava callbacks. Owns per-call state dict and the processing pipeline.

Uses `_state[call.id]` dict. Each call gets its own `hits`, `transcript`, `flags`, `seen_ids`, and `crm_matched` keys. Cleared on `on_session_end`.

`checklist.py`

FDCPA compliance items. Each item has an id, a human label, a keyword list, and a required flag.

Keyword matching is `any(kw in lower for kw in item["keywords"])`. Add more synonyms here if STT mis-transcribes an industry phrase.

`redactor.py`

Strips card numbers (12–19 digits, space/hyphen-separated) and SSNs (###-##-####) from any string.

Regex requires the final char to be a digit: `\b(?:\d[ -]?){12,18}\d\b` — avoids eating the trailing space and swallowing the next word.

`crm.py`

Mock CRM. Dict of 4 accounts. `lookup(text)` scans for first/last name in the utterance.

Only fires once per call (guarded by `state["crm_matched"]`). In production: replace the dict with a real CRM API call.

`report.py`

Builds the JSON report and prints the terminal summary at call end.

Verdict is COMPLIANT if every `required: True` checklist item has a hit. Writes to `reports/report_{call.id}.json`.

`chat_sim.py`

Windows-safe test mode. Simulates caller utterances via `stdin` — no phone, no audio device needed.

Wraps stdout in a UTF-8 encoder so ✔ / ⚠ / ─ render correctly on Windows. Guava's `agent.chat()` uses `curses` which isn't available on Windows Python.

`start.bat`

Local startup script. Reads `.env`, sets `PYTHONUTF8=1`, runs `guava run .`

Sets code page 65001 (`chcp 65001`) so the Windows terminal renders Unicode output correctly before Python even starts.

`guava.toml`

Guava project config — project ID, org ID, phone number.

The `phone_number` here is what `guava deploy up` uses. The env var `GUAVA_AGENT_NUMBER` is auto-injected by Guava cloud on top of this at runtime.

**Call state is per-call, not global.** `_state` is a module-level dict keyed by `call.id`. Concurrent calls each get their own isolated state and it’s garbage-collected in `on_session_end`. Adding multi-call support required no extra architecture.

## What We Actually Learned

Two days. One platform we'd never touched. Here's what we got wrong before we got it right.

01

The agent kept saying "How can I help?" — not a bug, a missing concept

We set the agent's `purpose` to say it was a silent recorder. It still greeted callers. Turns out `purpose` shapes personality, but the LLM still needs an active _task_ to stop it from defaulting to a greeting. We had to call `call.set_task()` in `on_call_start` with an objective of staying silent and a `completion_criteria` of "Never." That combination finally stopped it.

Purpose shapes who the agent is. Task shapes what it does right now. You need both.

02

`on_caller_speech` fires 3–5 times per sentence

Guava's STT refines the transcript incrementally. The same `utterance_id` fires multiple times with progressively more complete text. Without deduplication, every FDCPA keyword check ran 3–5 times per sentence. The fix: track a dict of `utterance_id → last seen text` and skip the callback if the text hasn't changed. This is not in the main quickstart doc — we hit it during testing.

STT events are a stream, not a list of final sentences. Deduplicate or process everything multiple times.

03

`agent.chat()` doesn't work on Windows

The Guava Python SDK's `chat()` mode uses the `curses` module, which isn't available on Windows Python. We lost 45 minutes trying to get it running before reading the error message carefully. We ended up writing a custom Windows-compatible simulator (`chat_sim.py`) using `stdin` input. Not a problem in production, but worth knowing before a demo where you're on a Windows laptop.

Read error messages before googling. "No module named '\_curses'" tells you everything.

04

Guava cloud deployment doesn't accept `GUAVA_API_KEY` in `.env`

Both `GUAVA_API_KEY` and `GUAVA_AGENT_NUMBER` are reserved — Guava auto-injects them on cloud. If you include them in your `.env`, `guava deploy up` fails with a "reserved variable" error. The fix is to remove them from `.env` entirely for deploy. For local dev, you still need to set them manually or in a gitignored file.

Cloud env vars auto-injected by the platform shouldn't appear in your own .env. Check which ones are reserved.

05

Went from zero to deployed in about two days — that's the real outcome

Before Friday, I didn't know what TTS stood for, hadn't heard of Guava, and had never built a voice agent. By Sunday we had a working agent deployed on a real phone number, with silent monitoring, live checklist hits, real-time redaction, and a CRM lookup. That's a concrete, transferable skill — not a hackathon trophy. You can have your own opinion about the leaderboard. This part is factual.

Platform fluency in 48 hours is a real outcome, independent of where you placed.

## Moments in Between

The things that don't make the GitHub commit history — the conversations, the wrong turns, the "what if we used this for…" threads.

🔇Muting the Welcome

The first thing Guava does when a call connects is greet the caller. For a silent monitor, that's a problem. We spent longer than expected understanding that suppressing it required both a strongly-worded `purpose` and an active task — one or the other wasn't enough. The moment it finally stayed quiet was genuinely satisfying.

🗣️When It Mishears

STT is good but not perfect. "Dispute rights" got transcribed as "this cute nights" in one test. We added more keyword variants to the checklist, but the right long-term fix is fuzzy matching or a small embedding model over utterances. A quick hackathon fix often reveals a harder production problem.

💡Other Ideas, Live

Once people at the event saw the demo, the ideas came fast. Healthcare calls. Financial advice suitability checks. Immigration attorney lines. Real estate disclosures. The compliance monitoring pattern generalises anywhere a regulated professional has to say specific things. We wrote them down. A few are worth building.

🤝Face Time with the Team

Guava is based in LA. Getting weekend access to their engineering team — not their docs, their actual engineers — is something you don't get from a solo build. Questions that would have taken hours to debug took minutes. That access alone was worth showing up to the hackathon.

💻Local First, Cloud Later

The real development loop was: write it in chat-sim mode on the laptop, no phone call, no audio, just typed input simulating utterances. Once the checklist logic was solid, flip to `guava run .` locally against a real call. Cloud deploy was last — only after local was confirmed clean. That sequence saved hours of waiting on deploys to test basic logic.

## Platform Review — Guava

Honest take after two days of actual building, not after reading the landing page.

✓ What Worked Well

-   Zero infrastructure. Deploy one command, get a real phone number.
-   The callback model (`on_caller_speech`, `on_session_end`) is clean and predictable.
-   Cloud deploy is fast — under 2 minutes from code change to live.
-   `guava deploy logs` streams real-time output without any setup.
-   Python SDK feel is close to Flask — familiar enough to move fast.

⚠ Watch Out For

-   `agent.chat()` is Linux/Mac only. Not in the docs prominently.
-   STT deduplication is your problem — the SDK fires every partial transcript.
-   `guava deploy up` needs an interactive TTY — can't pipe a “y” to it from CI.
-   Reserved env vars (`GUAVA_API_KEY`, `GUAVA_AGENT_NUMBER`) can't appear in your `.env`.
-   WebRTC + phone simultaneously requires `guava.Runner` — not the default pattern.

Feature

Experience

Notes

Phone provisioning

Works instantly

Number auto-assigned. No Twilio account needed.

STT quality

Good, not perfect

Industry terms can mis-transcribe. Worth testing your specific vocabulary.

Cloud deploy

Fast, CLI-driven

Requires interactive terminal. Can't automate from a non-TTY shell.

Python SDK

Comfortable

Decorator-based callbacks. Close to Flask. No async footguns.

Docs

Starter-complete

Covers 80% of what you need. Edge cases (dedup, multi-channel) require experimentation.

WebRTC

Available, extra step

Needs `guava.Runner` if you want phone + browser simultaneously.

Would we use it again? Yes, for voice-first projects where the main loop is listen → process → optionally respond. It removes almost all of the infrastructure layer that would otherwise eat a hackathon weekend.

## The Team

Two people. Built over a hackathon weekend. The debt collection scenario was chosen because FDCPA is specific enough that checklist items are well-defined — no ambiguity about what "compliant" means.

S

Sham Sundar HC

Architecture · Python · Guava SDK

Built the agent, all callbacks, redactor, checklist, CRM lookup, and deploy pipeline. Came in not knowing what TTS meant; left with a deployed voice agent on a real number.

Ar

Arnav Channaveer

Testing · Demo · Use Cases

Covered the demo flow end to end, stress-tested the checklist against edge cases, and mapped the compliance pattern to adjacent industries. Spotted the STT mis-transcription problem during a live test run.
