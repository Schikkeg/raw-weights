---
title: "Unslop | RawWeights"
description: "A rolling 20-day feed of hands-on AI engineering videos surfaced from Hacker News, Lobsters, trusted channels and YouTube search, vetted by an LLM against a published rubric. Every pick shows its evidence."
url: "https://rawweights.com/unslop.html"
type: page
date: 2026-11-06
---

# Unslop

> A rolling 20-day feed of hands-on AI engineering videos, vetted by an LLM against a published four-gate rubric. Every pick shows the evidence it passed on.

The list of videos is rendered in the browser from machine-readable data, so this file describes the page instead of copying a snapshot that would go stale daily.

## Get the current picks

- Data (JSON): https://rawweights.com/data/unslop.json — each entry has title, channel, category, sub-topic, evidence quote, confidence (1-5), where it was first seen, share date and a link to the video. The file also has the selection funnel counts.
- RSS feed: https://rawweights.com/unslop-feed.xml — new picks as they are added.
- Page: https://rawweights.com/unslop.html

## How a video gets picked

1. Found: Hacker News, Lobsters, a short list of trusted YouTube channels, and YouTube search.
2. Free checks: private, live, or under 8 minutes is dropped before any model is used.
3. Four gates, in order: topic (about AI systems?), hype (not marketing or news?), joke (not shared as a punchline?), depth (real implementation signal in the captions, description or title?).
4. Grounding check: the model's evidence quote must appear in the text it was given, or confidence is capped.

## Filters on the page

- Topic: nine categories, each with sub-topics.
- Source: Hacker News, Lobsters, Trusted channel, YouTube Search. Trusted channel means the video's channel is on the watchlist.
- Confidence: High (4-5), Medium (3), Low (1-2).
- Choices inside a group combine as OR; choices across groups combine as AND.

## Related

- Case study: https://rawweights.com/usecase/unslop.html — why it exists, how it differs from Karpathy's HackerTube, the pipeline, an interactive gate runner, and what broke.
