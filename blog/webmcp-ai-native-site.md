---
title: "When AI Visits Your Site, Does It Understand It? A Guide to WebMCP | RawWeights"
description: "WebMCP turns your website into a structured API that AI agents can actually use — not just read. Interactive playground, real examples, and 5 field notes from real builds."
url: "https://rawweights.com/blog/webmcp-ai-native-site.html"
type: blog
date: 2026-11-06
---

# When AI Visits Your Site, Does It Understand It? A Guide to WebMCP

> WebMCP turns your website into a structured API that AI agents can actually use — not just read. Interactive playground, real examples, and 5 field notes from real builds.

## Sections

- Same question. Completely different answer.
- Ask something. See the difference.
- This is rawweights.com, right now.
- Things we figured out while building.

## Content

The Story

## Same question. Completely different answer.

A user asks an AI: _“I’ve read the RAG basics — where’s the section on evaluation metrics?”_

Without WebMCP

1

AI fetches the page. Gets 8,000 words of raw HTML with no structure.

2

Scans text for “evaluation metrics.” Finds a match somewhere — but no anchor, no location.

3

Guesses. Returns a generic summary with no link to the actual section.

**AI answer** “The guide covers evaluation metrics. You can find it somewhere on the page.”

↔vs

With WebMCP

1

AI calls `get_page_sections()`. Gets a labeled map of every heading + anchor ID in milliseconds.

2

Returns: `Evaluation & Metrics → #metrics`. Calls `search_rawweights("RAG production")` for related guides.

3

Answers with the exact section link + two deeper guides the user didn’t even know to ask for.

**AI answer** “→ Evaluation & Metrics: rawweights.com/guide/rag.html#metrics  
→ Production toolkit: rawweights.com/guide/rag-pipeline-toolkit.html”

Try It

## Ask something. See the difference.

Type a question and watch what a raw HTML response looks like vs a WebMCP tool response.

RAG basics Evaluation Security Playgrounds Fine-tuning

 Ask →

Raw HTML fetch

WebMCP tool call

48ms

```
Tool called: search_rawweights
  quer
```

Live Proof

## This is rawweights.com, right now.

A real agent session on this site. The question was answered using only tool calls — no page crawling.

U

What topics does rawweights.com cover and how is the content organised?  
Don’t fetch any pages — use only the site’s structured tools.

READYhasModelContext: true — Chrome confirmed WebMCP active

TOOLget\_navigation invoked — 1ms

RESULT4 sections returned: Playgrounds · Guides · Use Cases · Blog

AI

RawWeights is organised into four areas:  
  
**Playgrounds** — 8 interactive ML sandboxes (ML Master Hub, Attention Journey, CNN Explorer…)  
**Guides** — 18 deep-dives covering RAG, fine-tuning, MCP, agentic AI, security…  
**Use Cases** — 15 real build stories (Debrief, SecurityTwin, SentTriage…)  
**Blog** — [rawweights.com/blog.html](https://rawweights.com/blog.html)

4

Tools registered

1ms

Tool response time

0

Pages fetched

87

Pages covered

Registered tools on this page

`search_rawweights`Full-text search across all content

`get_navigation`Complete site structure + descriptions

`get_page_sections`Deep-link map of any page’s headings

`get_footer_links`Footer categories and supplementary links

5 Field Notes

## Things we figured out while building.

From real implementation, not the spec.

🛡️

#### Always check `if (document.modelContext)` first

WebMCP is a Chrome origin trial — only 0.5% of global traffic can use it before Google disables the experiment. 1–5% of users are intentionally excluded as holdbacks. Your code _must_ fall back gracefully. If the API isn’t there, your site still works — just without the AI tools. Never assume it exists.

✍️

#### Your tool description is the AI’s instruction manual

Early version said: _“Returns navigation links.”_ AI agents dumped raw JSON at the user. Rewritten as: _“Scan links\[\].desc for keywords matching the user’s question, return the matching URL as a clickable link.”_ — agents instantly changed behavior. The description isn’t documentation. It’s the prompt that runs every time the tool is called.

📦

#### Add a `message` field — not just structured data

Some agents echo tool results verbatim instead of formatting them. Return both: structured JSON _and_ a pre-formatted Markdown string in a `message` field. Even the dumbest agent then outputs readable links. The best agents use the structure. The rest use the message. Nobody gets raw JSON.

📝

#### Standard fields need no schema. Custom fields do.

AI agents already know what `name`, `email`, `tel`, and `date` inputs mean — they’re universal. Define `inputSchema` only for fields the agent couldn’t guess: CRM dropdowns (_Job\_Level\_\_c_, _industry\_vertical_), dependent selects, non-standard labels. Over-describing standard fields adds noise to the tool context and slows the agent down. Describe only what’s unusual.

⚡

#### Flag auto-populated fields — and pace your typing for reCAPTCHA

If a field fills itself (city from zip code, country from locale), say so in the schema: _“Country auto-populates from zip — do not set directly.”_ If the agent tries to override it, the page’s own logic may wipe the value mid-form. For reCAPTCHA: the score is based on keystroke rhythm, mouse entropy, and hover timing — type character-by-character at human speed (35–75ms per key), hover over the submit button before clicking to allow reCAPTCHA’s token to generate, then submit. Programmatic instant-fill gets a bot score of 0.0 every time.

WebMCP is the difference between an AI that reads your site and one that uses it.

One file. 87 pages. Every AI agent gets structured, callable tools automatically.
