---
title: "BioLogic: AI-Powered OSINT Dashboard — Hackathon Pitch | RawWeights"
description: "An under-the-hood look at BioLogic, a real-time OSINT health intelligence dashboard. Learn how we integrated React, Node, Java MCP tools, and Gemini AI to aggregate clinical and social data instantly."
url: "https://rawweights.com/blog/biologic-osint.html"
type: blog
date: 2026-06-15
---

# BioLogic: AI-Powered OSINT Dashboard — Hackathon Pitch

> Under-the-hood look at BioLogic — a real-time OSINT health intelligence dashboard built with React, Node, Java MCP tools, and Gemini AI to synthesise clinical and social data on demand.

## Overview

BioLogic flips the traditional OSINT workflow: instead of searching and manually synthesising, you query once and the system aggregates and synthesises across clinical databases, social signals, and news sources in real time. Built as a hackathon project, it demonstrates how MCP tools, Gemini AI, and a multi-source ingestion architecture can collapse the gap between raw data and actionable health intelligence.

The pitch covers the core philosophy, the system architecture, role-specific value propositions, engineering trade-offs, and deep dives into OSINT methodology.

## Key Topics / Sections

- **Core Philosophy — Stop Searching, Start Synthesising**: The fundamental shift from keyword search to synthesis-on-demand; why aggregation without synthesis is still manual work.
- **System Architecture**: Data flow map across five layers — social signal ingestion, clinical data APIs, Java MCP tool layer, Gemini AI synthesis, and React/Node frontend. The MCP tools bridge the Java backend to the LLM layer.
- **Why This Architecture Matters For Your Role**: Persona-specific value framing for researchers, journalists, public health teams, and security analysts.
- **Technical Hurdles Visualiser**: Interactive walkthrough of the engineering challenges — rate limiting across data sources, clinical data normalisation, latency budget for real-time synthesis, and hallucination risk on medical claims.
- **Engineering ROI & Strategy**: Build vs. buy analysis for each architecture layer; where the real moat is (the synthesis layer, not the data aggregation).
- **Persona Takeaways**: Structured takeaways for each target user persona.
- **OSINT Deep Dives**: Case studies showing BioLogic applied to specific health intelligence scenarios.

## Key Takeaways

- MCP tools enable a Java backend to participate in an LLM-driven synthesis pipeline without a full rewrite
- Synthesis quality depends more on source curation than on model choice
- Real-time OSINT at this scope requires thoughtful rate limit management across a dozen concurrent data source connections

## Related Pages

- [MCP Practitioner's Playbook](https://rawweights.com/guide/mcp-practitioner-playbook.html) — Building MCP servers like the Java tools used here
- [Passive Safety Watchdog](https://rawweights.com/guide/passive-safety-watchdog.html) — Another real-world monitoring system built with GraphRAG
