---
title: "ThreatScope Analytics — Building in Public: Week 1 | RawWeights"
description: "ThreatScope Analytics — free IP threat intelligence for agencies and startups who can't afford enterprise security tools yet."
url: "https://rawweights.com/blog/threatscope.html"
type: blog
date: 2026-06-15
---

# ThreatScope Analytics — Building in Public: Week 1

> A build-in-public log for ThreatScope Analytics — free IP threat intelligence for agencies and startups. Covers the real problem, architecture decisions, API key security, engineering challenges, and who this product is for.

## Overview

Enterprise IP threat intelligence tools cost thousands per month. Agencies and early-stage startups that need this data for client security reviews often go without, relying on manual lookups across free public tools. ThreatScope is a free, consolidated IP threat intelligence dashboard built to close that gap — and this article is Week 1 of a public build log documenting every decision, trade-off, and lesson learned.

## Key Topics / Sections

- **The Real Problem**: The cost and access gap in IP threat intelligence — free tools are fragmented, enterprise tools are inaccessible to small teams, and the manual workflow of stitching public sources wastes hours per week.
- **Why I Built This**: The specific scenario that triggered the build — a client security review that required data from six different free APIs, manually correlated.
- **What ThreatScope Does**: Features in Week 1 — bulk IP lookup, threat score aggregation across multiple intelligence feeds, reputation history, geolocation, and ASN data. Single-dashboard synthesis.
- **API Key Security**: Architecture decisions for protecting the intelligence feed API keys — server-side proxying, environment variable management, rate limit handling, and the attack surface of browser-exposed keys.
- **How It Was Built**: Technical stack — backend proxy for API calls, frontend dashboard, data normalisation layer for inconsistent feed formats, and the caching strategy for expensive lookups.
- **In the Trenches**: Week 1 engineering reality — which intelligence feed had the best data, rate limiting surprises, and normalisation edge cases.
- **Playing Every Role**: The build-in-public reality of solo development — writing code, doing product design, handling DevOps, and managing the public documentation simultaneously.
- **Who This Is For**: Target users — digital agencies, startup security teams, penetration testers, and researchers who need consolidated IP intelligence without enterprise budgets.

## Key Takeaways

- API key security is the first production concern for a data aggregation tool — server-side proxying is non-negotiable for keys with rate limits and billing
- Intelligence feed data quality varies enormously — some feeds have better coverage, others have better freshness, and normalising them requires per-feed handling
- Building in public generates useful early feedback but requires committing to transparency about what is broken

## Related Pages

- [Mythos AI Threats](https://rawweights.com/guide/mythos.html) — AI-specific threat landscape
- [AI Security Stack Autopsy](https://rawweights.com/guide/ai-security-stack-autopsy.html) — Why legacy security tools miss AI agent activity
