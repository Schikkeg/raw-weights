---
title: "RFP Intelligent Agent | RawWeights"
description: "Explore a proof-of-concept RFP Intelligent Agent built with Java, Google Gemini, and the Model Context Protocol (MCP). Discover how to bridge LLMs with highly structured enterprise data."
url: "https://rawweights.com/portfolio/rfp-mcp-agent.html"
type: page
date: 2026-10-30
---

# RFP Intelligent Agent

> Explore a proof-of-concept RFP Intelligent Agent built with Java, Google Gemini, and the Model Context Protocol (MCP). Discover how to bridge LLMs with highly structured enterprise data.

## Sections

- The Problem
- The Architecture
- Architecture Evaluation: 5 Core Capability Tests
- Critical Architecture Learnings

## Content

## The Problem

Enterprise Sales Engineering (SE) teams spend countless hours manually cross-referencing massive, 100+ parameter hardware specification sheets to answer customer RFPs.

While traditional "Gems" or RAG (Retrieval-Augmented Generation) setups exist, they fail at strict numeric constraints. If an RFP requires _"100G interfaces AND >30M sessions,"_ standard text-search AI will often hallucinate or misalign features across products.

## The Architecture

By implementing the **Model Context Protocol (MCP)**, I built a Java-based server that acts as a deterministic "dumb filing cabinet," allowing the LLM to act as the "smart brain." Instead of fuzzy document searches, Gemini executes precise function calls to grep the raw JSON database dynamically.

User Prompt Gemini LLM (Context Engine) Tool Calling Java MCP Server (Stdio / SSE) @JsonAnySetter Logic JSON DB Query JSON-RPC Raw Data

## Architecture Evaluation: 5 Core Capability Tests

To prove the viability of MCP over traditional RAG (document uploads), I executed five distinct architectural stress tests. Each prompt was designed specifically to break standard AI workflows using complex math, multi-variable filtering, and deep database logic.

TEST 01

### Strict Numeric Threshold Filtering

"Search the enterprise database for items with a power draw under 50W, an operating temperature up to 60°C, and native support for IPv6. List only the passing models."

**Observation:** Evaluated deterministic filtering accuracy. The MCP server processed exact numeric boundaries via API, preventing the LLM from relying on "fuzzy" text search, eliminating misaligned specs and hallucinations.

TEST 02

### Relational Data Mapping & Math

"Compare our entry-level and mid-tier enterprise subscriptions. The customer needs 500,000 daily API calls and dedicated support. Calculate the exact cost difference and recommend the cheapest option."

**Observation:** Tested automated data retrieval combined with arithmetic reasoning. The AI successfully pulled live pricing matrices, performed the cost delta calculation, and formulated an evidence-based recommendation.

TEST 03

### High-Dimensional Boolean Scanning

"The client requires strict compliance with FIPS 140-2 and SOC 2 Type II. Scan the entire 1,000+ item catalog and return only the modules that natively support both."

**Observation:** Evaluated rapid 'needle-in-a-haystack' retrieval across deep JSON hierarchies. Validated that the architecture strictly respects boolean (Yes/No) requirements without falling back on semantic approximations.

TEST 04

### Categorical Cross-referencing

"Find a ruggedized inventory appliance suitable for sub-zero freezer environments that also supports long-range RFID scanning."

**Observation:** Tested the blending of categorical tags (environmental constraints) with highly specific technical capabilities. Demonstrated how deterministic tools prevent the AI from recommending popular but physically incompatible items.

TEST 05

### Real-time External Benchmarking

"A competitor claims their new service processes 10,000 transactions per second at $0.05/tx. Cross-reference this with our current enterprise tier specs and draft a neutral technical gap analysis."

**Observation:** Assessed competitive positioning logic. Demonstrated how the AI holds unverified external prompt data in its context window and cross-references it against verified internal MCP endpoints to generate instant, accurate gap analyses.

## Critical Architecture Learnings

### 1\. SDK Abstractions Save Time

Using the official Java MCP SDK drastically reduced API compatibility time. Writing custom JSON-RPC parsing in Java is brittle; leveraging the SDK shielded the app from protocol updates and parsing errors.

### 2\. Specification Definition is Everything

Writing clean code isn't enough. The **Input Schema** and the tool **Description** are the _only_ ways the LLM knows how to map user intent to your function. Nailing the semantic description dictates the success of tool calling.

### 3\. Debug Protocol, Not the LLM

Never use the LLM chat window to debug tool connectivity. Always use the **MCP Inspector**. It isolates the server logic from the AI's natural language engine, proving immediately if your schema and JSON returns are valid.

### 4\. Dual-Mode Transport is Mandatory

Always build the server to support both `stdin/stdout` (for seamless AI client integration) and `SSE via HTTP` (for local UI debugging and remote hosting). Attempting to debug Stdio directly in an IDE is a trap.

### Project Meta

**Role** Solutions Architect / Developer

**Architecture Type** Retrieval via Deterministic Tool Calling

**Tech Stack**

Java 17 Javalin Jackson Databind MCP SDK Google Gemini

**Capabilities Built**

-   Cross-catalog constraint grepping
-   Automated competitive math comparison
-   120+ schema-agnostic field ingestion
