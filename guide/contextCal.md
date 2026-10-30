---
title: "Agentic Scheduling Without Calendar Access — ContextCal | RawWeights"
description: "How ContextCal replaces 3 hours of email back-and-forth with a link — parsing multilingual availability, normalizing timezones, and computing meeting overlap without ever touching a calendar API."
url: "https://rawweights.com/guide/contextcal-react-agent.html"
type: guide
date: 2026-10-30
---

# Agentic Scheduling Without Calendar Access — ContextCal

> How ContextCal replaces 3 hours of email back-and-forth with a link — parsing multilingual availability, normalizing timezones, and computing meeting overlap without ever touching a calendar API.

## Sections

- The Problem Nobody Talks About
- How It Works — The 9-Step Flow
- Inside the Agent — The Agentic Flow
- Blind Privacy & Contextual Nuance
- Component Architecture
- Next Step — Agent-to-Agent (A2A) Compatible

## Content

01

## The Problem Nobody Talks About

Why cross-timezone scheduling is silently eating team hours

Global teams face a universal friction point: scheduling joint meetings. Both sides have calendars. Neither wants to share them. So the organizer sends an email asking for availability.

Responses trickle in over 24 hours. Some say _"9–5 IST"_, others say _"mornings only"_, one says _"je suis libre mercredi après-midi"_. Someone converts timezones in their head and gets it wrong.

**The information exists. The friction is transforming it.** That's exactly where an agent adds value.

The manual workflow cost

✗

Email thread for availability — 1–2 rounds = 24–48 hrs

✗

Manual timezone math — error-prone across multiple regions

✗

Calendar screenshots — privacy risk, stale within hours

✗

Doodle/When2meet — requires structured input, no casual phrasing, no multilingual support

✓

ContextCal: participants reply in their own words — agent parses and finds the slot in 5 minutes

ContextCal vs When2meet / Doodle

Capability

When2meet / Doodle

ContextCal

Input method

Click a grid UI

Free text or voice, any phrasing

Language support

English structured input only

Any language — Hindi, French, Chinese…

Timezone handling

User converts manually

Agent normalizes all to UTC

Privacy

Grid visible to everyone

Organizer sees intersection only

Vague availability ("mornings only")

✗ Not supported

✓ LLM resolves to time window

Voice input

✗ Not supported

✓ Whisper STT (local, multilingual)

Programmable / A2A

✗ No API

✓ A2A Agent Card — any orchestrator

02

## How It Works — The 9-Step Flow

LangGraph orchestrates everything end-to-end

1

Organizer creates session Human

Sets meeting title, date range, and participant names in the admin UI.

2

Unique token links generated System

SHA-256 secure token per participant, stored in SQLite. Organizer shares each link individually.

3

Participants respond in any language Human

Free-text typed or spoken via Whisper STT. No calendar access. No structured format required.

4

LLM parses each response → structured JSON LLM

Llama-3.3-70B extracts timezone, time windows, hard constraints, soft preferences, and flexibility flag — from any language.

5

Normalize all timezones → UTC Python

Pure Python via pytz. Every timezone converted to UTC — deterministic. The LLM never touches time math.

6

Compute slot overlap — interval intersection math Python

Event-sweep algorithm finds N-way intersections. Slots ranked by coverage %. Near-miss path triggered if no full overlap.

7

LLM generates human-friendly summary LLM

Llama-3.3-70B drafts a meeting announcement with slot details and actionable next steps for the organizer.

8

Generate iCal (.ics) file System

RFC 5545 compliant with VTIMEZONE blocks. Works with Google Calendar, Outlook, Apple Calendar.

9

Organizer reviews & downloads invite Human

Human-in-the-loop approval gate. Agent never sends or posts anything autonomously. Organizer confirms before any calendar action.

03

## Inside the Agent — The Agentic Flow

What happens internally for each participant response

Each LangGraph node operates in a **Think → Act → Observe** cycle. Here's what runs when a Hinglish response hits the agent:

── Cycle 1: Parse the Response

🧠 Think

"Response is Hinglish. 'baje' = time in Hindi. 'raat' = night. Should extract Wednesday 9:30 PM–11:30 PM IST."

⚡ Act

Call `parse_availability()` with the raw Hinglish text as input.

👁 Observe

```
{ timezone: "Asia/Kolkata",
  windows: [{ day: "Wednesday",
    start: "21:30",
    end: "23:30" }],
  flexible: true }
```

── Cycle 2: Normalize to UTC (Python only)

🧠 Think

"Multiple timezones parsed. Must convert to UTC. LLM must NOT compute this — use Python pytz. Resolve relative day names against the session date range."

⚡ Act

Call Python `normalize_to_utc()` → pytz localizes each window to the correct absolute UTC datetime.

👁 Observe

```
Wed IST 21:30–23:30
→ UTC T16:00Z–T18:00Z

All participants now
aligned to UTC.
```

── Cycle 3: Compute Overlap + Handle Near-Miss

🧠 Think

"Run event-sweep. Full N-way overlap fails — one participant's window misses. Route to near-miss path and surface best partial slot."

⚡ Act

Call Python `compute_overlap()` → conditional edge routes graph to summarize node.

👁 Observe

```
best_slot: Wed 16:00–18:00Z
coverage: 83% (5/6)
duration: 120 min
→ human decision needed
```

The critical design boundary

The LLM handles **language understanding** and **prose generation**. Python handles all **time math**. LLMs hallucinate datetime arithmetic — by making this boundary explicit in the LangGraph node types, overlap computation is provably correct regardless of which model is used.

04

## Blind Privacy & Contextual Nuance

Two design decisions that make this work in the real world

🔒

### Blind Privacy Integration

Token-scoped access

Each participant gets a unique SHA-256 token. Their URL only shows their own response page — no participant list, no other responses visible.

No calendar data stored

Only free-text availability descriptions in SQLite. No calendar events, no event titles, no recurring data — just words.

Organizer sees only the intersection

Results show computed overlap slots. Individual responses stay private — the agent consolidates without exposing raw inputs.

🧠

### Contextual Nuance Handling

Vague time words → default windows

_"mornings only"_ → 09:00–12:00 · _"afternoon"_ → 13:00–17:00 · _"evenings"_ → 18:00–21:00. Defaults baked into the LLM prompt.

Hard vs soft constraints

_"I can't do Friday"_ → hard exclusion. _"I prefer not early mornings"_ → soft preference. Both preserved in parsed JSON.

Flexibility signals

_"I'm flexible"_ / _"whatever works"_ → `flexible: true`. Overlap engine weights flexible participants lower in near-miss ranking.

Real inputs → parsed JSON

\# Hinglish input:  
"Wednesday raat ko 9:30 baje  
se available hun. Thursday  
bhi chal sakta hai"  
  
\# Parsed:  
{ "timezone": "Asia/Kolkata",  
"windows": \[  
{ "day": "Wednesday",  
"start": "21:30" },  
{ "day": "Thursday",  
"start": "09:00" }\],  
"flexible": true }

\# French input:  
"Je suis disponible mercredi  
après-midi et jeudi matin,  
pas vendredi SVP"  
  
\# Parsed:  
{ "timezone": "Europe/Paris",  
"windows": \[  
{ "day": "Wednesday",  
"start": "13:00" },  
{ "day": "Thursday",  
"start": "09:00" }\],  
"hard\_constraints": \["no Friday"\] }

\# Casual English:  
"Honestly I'm pretty flexible,  
mornings work best,  
avoid Thu afternoon"  
  
\# Parsed:  
{ "timezone": "America/New\_York",  
"windows": \[  
{ "day": "Mon–Wed,Fri",  
"start": "09:00" }\],  
"flexible": true,  
"soft\_prefs": \["avoid Thu PM"\] }

05

## Component Architecture

What's under the hood

Component

Technology

Role

app.py

Streamlit 1.58

Single-page UI, query-param routing (`?token`, `?view`)

agents/graph.py

LangGraph 1.2

5-node stateful graph, MemorySaver checkpointing, conditional error routing

agents/parser.py

Llama-3.3-70B / Nebius

Free-text → structured JSON (timezone, windows, constraints, flexibility)

agents/normalizer.py

Python / pytz

Resolves weekday names to dates, converts all windows to UTC

agents/overlap.py

Python / datetime

Event-sweep N-way interval intersection, near-miss path

agents/summarizer.py

Llama-3.3-70B / Nebius

Generates human-friendly meeting announcement

tools/ical\_generator.py

icalendar library

RFC 5545 .ics with VTIMEZONE blocks

tools/whisper\_stt.py

faster-whisper (local)

Voice → text, CPU inference, multilingual Whisper model

db/database.py

SQLite

Sessions, participants (raw + parsed JSON), consolidated results

\# LangGraph node chain — agents/graph.py (simplified)  
def build\_graph():  
graph = StateGraph(AgentState)  
  
graph.add\_node("parse", parse\_node) \# LLM → JSON  
graph.add\_node("normalize", normalize\_node) \# Python TZ math  
graph.add\_node("overlap", overlap\_node) \# Python interval math  
graph.add\_node("summarize", summarize\_node) \# LLM → prose  
graph.add\_node("ical", ical\_node) \# System → .ics  
graph.add\_node("error", error\_node) \# Graceful recovery  
  
graph.add\_conditional\_edges("parse", route\_after\_parse, {...})  
graph.add\_conditional\_edges("overlap", route\_after\_overlap, {...})  
\# Each node routes to "error" on failure — agent never crashes the UI  
  
return graph.compile(checkpointer=MemorySaver())

06

## Next Step — Agent-to-Agent (A2A) Compatible

Don't build adapters for every platform. Become a discoverable agent.

The current framing — "build an email adapter, then a Slack adapter, then a REST adapter" — means ContextCal does integration work for every platform indefinitely.

The smarter move: expose ContextCal as an **A2A-compatible agent**. Publish an Agent Card at `/.well-known/agent.json`. Any A2A-aware orchestrator — Gmail AI, Outlook Copilot, a LangGraph workflow — discovers ContextCal and delegates scheduling to it.

**ContextCal stops being a feature and becomes infrastructure.** The LangGraph pipeline inside stays unchanged. You add one A2A HTTP layer on top.

Before — ContextCal owns every integration

Gmail adapter → Outlook adapter → Slack adapter…

∞ integrations, all maintained by ContextCal

After — Platforms discover ContextCal via A2A

Gmail AI A2A ──▶ ContextCal

Copilot A2A ──▶ ContextCal

AG2 Agent A2A ──▶ ContextCal

1 spec · zero per-platform maintenance

The A2A Agent Card

\# /.well-known/agent.json — ContextCal A2A Agent Card  
{  
"name": "ContextCal",  
"description": "Schedules meetings from free-text availability in any language",  
"url": "https://your-host/a2a",  
"capabilities": { "streaming": true, "pushNotifications": false },  
"skills": \[{  
"id": "schedule\_meeting",  
"name": "Schedule a Meeting",  
"inputModes": \["text"\],  
"outputModes": \["text", "file"\],  
"examples": \[  
"Schedule: Participant A says raat ko 9 baje, B says mercredi après-midi"  
\]  
}\]  
}

🔒

What stays identical

The entire LangGraph pipeline — parse, normalize, overlap, summarize, iCal. Zero changes to agent logic.

➕

What gets added

A FastAPI A2A endpoint that receives tasks, runs the pipeline, and streams status back per the A2A protocol spec.

🌐

What becomes possible

Any A2A-compatible orchestrator can delegate scheduling without a custom integration per platform.
