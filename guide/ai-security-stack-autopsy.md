---
title: "The Stack Autopsy — Why Legacy Security Can't See Your AI Agent | RawWeights"
description: "CSPM, pen tests, IAM, SOC — five tools already running on your site, five reasons none of them can see what an AI content agent does. An interactive post-mortem."
url: "https://rawweights.com/guide/ai-security-stack-autopsy.html"
type: guide
date: 2026-06-15
---

# The Stack Autopsy — Why Legacy Security Can't See Your AI Agent

> An interactive post-mortem on the coverage gap between traditional security tools and AI content agents. Five case files, a coverage map, and a full attack trace — the tools aren't wrong, the world changed.

## Overview

Five security tools are running on your site right now: CSPM, penetration testing, IAM, SIEM/SOC, and DAST. When an AI content agent starts reading files, rewriting pages, and making authenticated API calls, none of these tools register it as a threat — because they were built for a deterministic, human-operated world. This guide runs an interactive post-mortem to show exactly where each tool's coverage ends and what falls through the gap.

The guide uses the patient metaphor — your AI content publishing agent is the patient, the security stack is the diagnostic team, and the autopsy reveals the coverage gaps.

## Key Topics / Sections

- **The Patient**: An AI content publishing agent with read access to your CMS, write access to published pages, and authenticated API keys — a high-privilege, non-human actor that logs as a service account.
- **Five Case Files**: Each file examines one security tool and why it fails to detect specific AI agent behaviour:
  - CSPM: Monitors cloud configuration, misses runtime content changes
  - Pen Testing: Point-in-time, misses emergent agent behaviour post-deployment
  - IAM: Sees the service account, not the agent reasoning that drives it
  - SIEM/SOC: Signature-based rules written for known attack patterns, not novel agent actions
  - DAST: Tests the app surface, not the LLM's output or the agent's tool choices
- **What Your Stack Actually Covers**: Coverage gap matrix showing which attack surfaces each tool addresses and which remain blind spots.
- **The Attack Nobody Saw**: A traced attack scenario in which an AI agent is prompt-injected through malicious content in a retrieved document, causing it to exfiltrate data through its own authenticated write path — invisible to all five tools.
- **The Tools Aren't Wrong — The World Changed**: Framing the gap not as tool failure but as a world that outpaced the threat model; what new detection primitives are needed.

## Related Pages

- [Mythos AI Threats](https://rawweights.com/guide/mythos.html) — The four core AI threat categories
- [Agent Blueprint — Site Transform](https://rawweights.com/guide/agent-blueprint-site-transform.html) — How an agent actually touches your site
- [Passive Safety Watchdog](https://rawweights.com/guide/passive-safety-watchdog.html) — Building proactive AI-powered monitoring
