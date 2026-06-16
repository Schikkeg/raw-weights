---
title: "MCP: The Practitioner's Playbook | RawWeights"
description: "Part 2 of MCP on RawWeights — authentication patterns, transport layer, the full 4-capability map including Sampling, security threats, and a decision gate for when MCP makes sense."
url: "https://rawweights.com/guide/mcp-practitioner-playbook.html"
type: guide
date: 2026-06-15
---

# MCP: The Practitioner's Playbook

> Part 2 of the MCP series — the implementation-level guide covering authentication mechanics, transport layer choices, the full four-capability map including Sampling, security threats, overhead reality, and a decision gate for when MCP is and is not the right choice.

## Overview

The MCP Agentic Web guide (Part 1) covers the protocol's purpose and high-level architecture. This playbook goes deeper into implementation details that practitioners encounter when building MCP servers and clients: how OAuth flows for remote servers, which transport to choose and why, the four capabilities in full detail including the often-missed Sampling capability, the real security threats MCP introduces, and an honest assessment of when MCP overhead is worth it.

Eight sections run from gaps in Part 1 through a practical getting-started guide.

## Key Topics / Sections

- **What's in This Guide**: The gaps this guide fills over the introductory MCP content — Sampling, security threats, transport decision, and the overhead reality check.
- **Authentication Mechanics**: OAuth 2.0 flow for remote MCP servers; API key patterns for trusted environments; session token management; when stdio (local) vs. SSE (remote) changes the auth model entirely.
- **Transport Layer**: stdio for local process communication vs. HTTP+SSE for remote servers — when to choose each, connection lifecycle, error handling, and reconnect patterns.
- **Full Capability Map**: All four MCP capabilities explained with implementation notes:
  - *Tools*: Model-controlled function calls (the most common capability)
  - *Resources*: App-controlled data access with URI schemes
  - *Prompts*: User-controlled prompt templates with arguments
  - *Sampling*: Server-initiated LLM requests — the least understood capability
- **Security Threats**: Prompt injection through malicious tool responses; credential leakage through over-permissioned servers; SSRF via resource URIs; and the novel threat of a compromised MCP server in a trusted agent loop.
- **MCP Overhead Reality**: Latency cost of MCP vs. direct API calls; when the standardisation benefit outweighs the overhead; minimal viable MCP server for evaluation.
- **Decision Gate**: A structured decision tree — use MCP when you have N>2 tools used by M>1 models, or when tool portability across agent frameworks is required. Skip MCP for single-model, single-tool, or latency-critical integrations.
- **Getting Started**: Minimal working MCP server in Python and TypeScript; reference to the official MCP SDK; testing with Claude Desktop.

## Related Pages

- [MCP Guide](https://rawweights.com/guide/mcp.html) — Part 1: The Agentic Web Architecture and core concepts
- [Site Transformation Agent](https://rawweights.com/agents/) — A LangGraph agent that uses MCP-style tool patterns
- [Agentic Architecture Strategy](https://rawweights.com/blog/agentic-architecture-strategy.html) — Framework selection for autonomous systems
