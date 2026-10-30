---
title: "Drop-Off Oasis — Built with Google ADK | Raw Weights | RawWeights"
description: "How I built an AI walk concierge so my mom and I could make the most of the 45 minutes between school drop-off and pickup."
url: "https://rawweights.com/usecase/drop-off-oasis.html"
type: usecase
date: 2026-10-30
---

# Drop-Off Oasis — Built with Google ADK | Raw Weights

> How I built an AI walk concierge so my mom and I could make the most of the 45 minutes between school drop-off and pickup.

## Sections

- She came 8,000 miles. We had 45 minutes.
- Not a lack of parks. Too many decisions.
- One conversation. Walk plan ready.
- The tech, explained without jargon
- How agent-first development actually feels
- Four things building this taught me
- The people who made the room work
- Built in a day. Still taking walks.

## Content

The story

## She came 8,000 miles. We had 45 minutes.

🇮🇳

Arrival

Mom flies in from India. 3 month visit.

🚗

The gap

45 min after son's drop-off. No plan.

📱

The wake-up

Both on phones. Same car. Completely separate.

🌿

The build

Built at #BuildWithGemini in a single day.

My mom doesn't visit often. A trip this far takes planning, money, and convincing herself to leave home. Three months sounds like a lot of time — but I work, my wife works, our son has school and activities. She's in America but mostly watching it from the kitchen window.

One evening we sat in the parking lot — both on our phones. She was watching YouTube, I was scrolling news. Same car, completely separate. That felt like a waste.

I started searching for parks nearby. Every time I'd find something, I had to answer a dozen questions first: Too long? Make it back in time? Weather okay? It took more mental energy than the walk itself. Most days we stayed in the car.

So I built an app to do that thinking for me. Not for everyone — just for us, for this window.

The problem

## Not a lack of parks. Too many decisions.

Good walking spots existed within 10 minutes of the class. The problem was every walk required answering a set of questions before the first step.

❌ Without the app

😰"Parks near me" returns a list with zero useful context

🕐Manually estimate if you can walk there and back in time

🌧️Open a separate app to check weather

🔄Default to the same spot every time — the only one you know

🚗Give up and wait in the car

✅ With Drop-Off Oasis

💬Tell the AI your pickup time — it handles all the decisions

⏱️Walk sized to your window with a buffer built in

☀️Live weather included — temperature, UV, rain chance

🗺️Fresh spots every visit — remembers where you've been

🎵Walking soundtrack in any language, mood-matched

What it does

## One conversation. Walk plan ready.

You talk to it like texting a friend. It figures out the rest.

drop-off-oasis · AI Walk Concierge

Quick Actions

🗺️ Find walks nearby

🌤️ Check weather

⏱️ Plan my time

🎵 Play music

👥 Find walk buddy

📸 Leave a review

Pickup at 5:30pm near Rengstorff Park. We have about 40 min. What can we do?

Perfect — 42 minutes to work with. Found a spot you haven't been to yet 🌿

🌊

Shoreline at Mountain View

⏱ 25 min walk 1.2 miles Easy trail ⭐ 4.7

🌡️ 74°F ☀️ Sunny 🧴 UV 3 — sunscreen advised 🌟 Walk score 8/10

4:45 PM Drop-off done — head out

4:50 PM 🌿 Arrive at trailhead · walk starts

5:15 PM Turnaround point — head back

5:25 PM ☕ Back to car · 5 min buffer

5:30 PM 🎒 Pickup — right on time

▶

🎵 Kannada Walk Soundtrack · Calm mood

Generated · 3:40 · AI-composed lyrics

 →

🗺️

Scenic Walk Finder

Never suggests the same spot twice — remembers your history via Firestore.

🌤️

Live Weather

Real-time temperature, UV, rain chance. Walk suitability score out of 10.

⏱️

Time Budget

Give it pickup time — get a minute-by-minute schedule with a safety buffer.

🎵

Walk Soundtrack

AI-generated lyrics in English, Hindi, Kannada, Spanish. Mood-matched beats.

👥

Walk Buddy

Find another parent doing the same drop-off. Walk together, not alone.

📸

Community Reviews

Upload photos, leave trail notes. Suggestions improve as the community grows.

How it works

## The tech, explained without jargon

Think of the app as a small team. The AI agent coordinates specialists — each one does one job well. You send a message, the agent decides which specialists to call, and they all work together to send back one answer.

System architecture — how one message becomes a walk plan

👤 You Browser

→

⚡ Frontend FastAPI · A2A

→

🧠 ADK Agent Vertex AI Cloud

↔

💬 Gemini 2.5 Flash · Language

7 specialist tools the agent can call

🗺️ Walk Finder

🌤️ Weather

⏱️ Time Budget

🎵 Soundtrack

👥 Walk Buddy

📊 Walk Streak

📸 Reviews

🗄️

Memory

Cloud Firestore

🌤️

Weather

Open-Meteo API

🗣️

Voice + Music

Cloud TTS · FFmpeg

☁️

Audio Storage

Cloud Storage (GCS)

🧠

The Coordinator

Google Agent Development Kit (ADK)

ADK decides what to do next. When you send a message, it figures out: find walks? check weather? make a schedule? It calls the right tools in the right order so you get one coherent answer.

💬

The Language Brain

Gemini 2.5 Flash

Understands what you write, reasons about it, and formats raw tool output into plain-English responses. Also writes the lyrics for your walking soundtrack in any language you ask.

☁️

Where It Lives

Vertex AI Agent Runtime (Reasoning Engine)

The agent runs in Google's cloud — always on, no install needed. Your browser contacts it, it thinks, you get an answer. Fast without needing a server or any local setup.

🗄️

The Memory

Google Cloud Firestore

Stores which spots you've already visited — so you never get the same suggestion twice. Also tracks walk streaks and community reviews. Persists across sessions automatically.

🌤️

Weather — No Account Needed

Open-Meteo API

Free, open weather data with no API key required. The agent calls it with your coordinates and gets live temperature, UV index, and rain chance — then computes a "walk suitability score."

🎵

Voice + Music Pipeline

Cloud TTS · FFmpeg · Cloud Storage

Gemini writes the lyrics. Cloud TTS speaks them with a natural voice. FFmpeg generates a rhythmic background beat and mixes the two. Result: an MP3 walk soundtrack uploaded to GCS and playable directly in the app.

The code

## How agent-first development actually feels

With Google ADK, you write Python functions and the agent figures out when to call them. That's it. You don't build routing logic or decision trees — you describe what a tool does and let the model orchestrate.

app/agent.py — one tool, plain Python

```deco
@tool
def get_nearby_scenic_walks(user_location_coords: str) -> dict:
    """Find nature walks near the user's drop-off location.
    Never suggests a spot the user has already visited.
    """
    # Pull seen spots from Firestore memory
    seen = db.collection("sessions").document(session_id)\
             .collection("seen_spots").stream()
    seen_ids = {doc.id for doc in seen}

    # Return only fresh spots
    fresh = [s for s in ALL_SPOTS if s["place_id"] not in seen_ids]
    return {"spots": fresh[:3], "total_available": len(fresh)}
```

app/agent.py — wiring 7 tools to one agent

```kw
from google.adk.agents import Agent
from google.adk.models import Gemini

agent = Agent(
    model=Gemini("gemini-2.5-flash"),
    tools=[
        get_nearby_scenic_walks,   # 🗺️  finds fresh spots
        get_weather,               # 🌤️  live conditions
        calculate_time_budget,     # ⏱️  minute-by-minute plan
        generate_walk_soundtrack,  # 🎵  AI-composed music
        find_walk_buddy,           # 👥  connect parents
        log_walk_streak,           # 📊  track progress
        submit_place_review,       # 📸  community notes
    ],
    system_prompt=SYSTEM_PROMPT,
)
```

ADK

You write what, not when

Each tool is a plain Python function with a docstring. The agent reads that docstring to decide when to call it. No routing tables, no switch statements.

Streaming

Responses arrive in parts

The agent sends results as they arrive via the A2A protocol. The frontend tracks artifact IDs to prevent duplicate content from appearing during streaming.

Firestore

Memory across sessions

Every spot the user visits is written to `sessions/{id}/seen_spots`. The walk finder filters against this collection every call.

Audio

Lyrics → voice → beat → mix

Gemini writes lyrics → Cloud TTS voices them → FFmpeg generates a mood-matched rhythm using amplitude-modulated `aevalsrc` → FFmpeg mixes both into one MP3.

What I learned

## Four things building this taught me

01

Real constraints make better products

A fixed 45-minute pickup window made every decision obvious. I didn't design for "someone who might want to walk." The time budget tool, suitability score, and seen-spot memory all exist because constraints were real.

Building for one person isn't limiting. It's clarifying.

02

ADK changes how you think about features

In a traditional app, features are screens or buttons. With ADK, each feature is a tool — a function the agent calls when it decides it's needed. Adding walk buddy finder was writing one Python function.

You write what the feature does. AI figures out when.

03

AI is the easy part. Everything around it is not.

Gemini understanding requests was straightforward. The hard parts: preventing duplicate messages in streaming, getting an MP3 from agent to browser, formatting output to look like a plan instead of a wall of text.

AI handles reasoning. Engineering handles everything else.

04

Imperfect apps still solve real problems

The song still reads more than it sings. Some cards don't render right. There are bugs I haven't fixed. But my mom and I took three walks we wouldn't have taken. That was the actual goal.

Ship the thing that solves the problem.

Thank you

## The people who made the room work

🏗️

Build with Gemini · Mountain View

Track 3: App Builders — "Building Applications with Agent-First Workflows." I walked in without a project idea. The problem found me once we started building.

This wouldn't exist without the people who created an environment where you could show up with a vague idea and leave with a working app. A genuine thank you to:

SP

Srinath Padmanabhan

Direction, architecture guidance, and the kind of support that makes a hackathon actually useful.

Track mentor

CZ

Christina Z.

Energy that kept the room moving all day. The person who makes these events feel like they matter.

Event support

G

Google ADK Team

For building a framework that makes agent-first development feel natural and not like plumbing.

google-adk open source
