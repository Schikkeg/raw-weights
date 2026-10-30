---
title: "ShadowShield AI — Chrome Extension Experiment | RawWeights"
description: "A Chrome extension that replaces your real personal data with safe stand-ins before AI chatbots see it, then swaps real values back in the response."
url: "https://rawweights.com/usecase/shadowshield-ai.html"
type: usecase
date: 2026-10-30
---

# ShadowShield AI — Chrome Extension Experiment

> A Chrome extension that replaces your real personal data with safe stand-ins before AI chatbots see it, then swaps real values back in the response.

## Sections

- The Problem
- Where It Can Help
- The Core Idea
- How It Works
- What Gets Caught
- Three Detection Layers
- AI Sites Covered
- How It Intercepts (Tech)
- Detection Pipeline (Tech)
- MV3 Challenges (Tech)
- The Bigger Picture
- What We Learned
- Contributors

## Content

## The Problem

When you use an AI assistant, it's easy to forget that everything you type goes to a server you don't control. That's usually fine — until you paste in something you'd rather keep private.

👴

#### Everyday personal use

Someone is renewing a Medicare form and asks ChatGPT to help fill it in. They type their Social Security Number, date of birth, and home address right into the chat box. It just feels like talking to a helpful tool.

What happens to that information?

It's sent to OpenAI's servers. It may be stored in chat history. They have no idea — it just looked like a helpful window.

🏢

#### Work tasks

An employee pastes a CRM record — customer name, account number, complaint history — into Microsoft Copilot to help draft a reply. Completely reasonable thing to do. Totally normal workflow.

What happens to that information?

Customer data lands on Microsoft's servers. Existing company security tools don't see inside browser chat boxes.

**Neither person did anything wrong.** They used AI the way it's designed to be used. ShadowShield's goal is to make this safer without asking anyone to change how they work.

## Where It Can Help

Any situation where you use an AI to help with text that contains personal or sensitive details.

🏥

#### Health & benefits

Getting help understanding a medical form, insurance document, or Medicare renewal — without sharing your real SSN or date of birth with the AI.

💼

#### Work documents

Drafting customer emails, support replies, or HR documents that include names, account numbers, or employee IDs — AI helps write, your data stays private.

💳

#### Financial help

Asking AI to explain a bank statement, help with a tax question, or review a credit card dispute — using real numbers as context without exposing them.

👨‍💻

#### Developer workflows

Pasting code or config files that contain API keys, database credentials, or access tokens into AI chat for debugging help — without leaking working secrets.

⚖️

#### Legal & admin

Getting AI to help draft letters, understand contracts, or fill in forms that require personal identifiers — without sharing them externally.

🧒

#### Helping others

Assisting a family member (elderly parent, child) who is using AI tools without understanding what information they're sharing.

## The Core Idea

ShadowShield works like a silent translator. Before your message reaches the AI, it swaps real information for realistic-looking stand-ins. When the AI replies, the stand-ins are swapped back. The AI gives a useful answer — it just never knew it was working with stand-in values.

👤

You type

SSN: 123-45-6789  
Card: 4111 1111 1111 1111  
Alice Johnson  
alice@corp.com

→

🛡️

ShadowShield swaps

Stores real values  
Creates stand-ins  
Remembers the swap

→

🤖

AI receives

SSN: 456-78-9012  
Card: 5292 8417 3065 1847  
Emily Chen  
emily@fastmail.com

→

✅

You read back

SSN: 123-45-6789  
Card: 4111 1111…  
Alice Johnson  
alice@corp.com

🎭

#### Stand-ins look real

The stand-in credit card passes the same format check as a real one. Stand-in SSNs have the right pattern. The AI gives a useful answer — not "I can't see a valid number".

🔒

#### Swap happens on your machine

Your real information never leaves your computer. The AI website only ever sees the stand-in version. When the AI replies, the swap back happens before you even read it.

👆

#### Nothing to do

No button to click, no form to fill, no pop-ups. Type normally, press send normally. The extension is invisible unless you look for it in the browser's developer tools.

## How It Works

Five things happen in under half a second — invisibly — between you pressing send and the AI seeing your message.

⌨️

You press send

Extension catches the keypress before the website does

🔍

Finds private info

Spots SSNs, phone numbers, names, card numbers in your text

🎭

Creates stand-ins

Each real value gets replaced with a realistic-looking made-up version

📤

Sends the stand-in

AI receives the made-up version. Your real data stays on your computer.

✅

Swaps back

When the AI replies, real values replace the stand-ins in what you see

⚡

#### Under 500ms

Detection, stand-in generation, and swap happen fast enough that you don't notice any delay vs. a normal AI chat.

💻

#### Stays on your machine

The checking runs on your computer — either a small local AI model or Chrome's built-in AI. Your real data never goes anywhere.

🌐

#### Works on 13+ AI sites

ChatGPT, Claude, Gemini, Copilot, Perplexity, and more. New sites are picked up automatically — no updates needed.

## What Gets Caught

The extension automatically identifies 11+ types of sensitive information. Click any type below to see an example of what gets swapped.

🔢

#### Social Security Number

123-45-6789

📱

#### Phone Number

(415) 555-1234

📧

#### Email Address

alice@company.com

💳

#### Credit Card

4111 1111 1111 1111

👤

#### Full Name

Alice Smith

🏠

#### Home Address

123 Oak Street, Boston

🔑

#### API Keys & Tokens

sk-abc123...

🎂

#### Date of Birth

DOB: 1985-03-22

🛂

#### Passport Number

A12345678

🏦

#### Bank Account

Account: 4827-3910-2

🌐

#### IP Address

192.168.1.105

🏷️

#### Custom IDs

EMP-4829, PROJ-ALPHA

##### What gets swapped

##### How it's detected

##### Notes

**Names and addresses** need the local AI model (Option A below) running to be detected reliably — there's no pattern that can tell "Alice Smith" apart from any other two-word phrase. In offline mode, these two types are missed.

## Three Detection Layers

The extension doesn't rely on a single method. It tries the best available option automatically and falls back gracefully if something isn't set up. You get the same result regardless — the only difference is whether names are caught and how fast it runs.

Option A — Local AI model Option B — Chrome built-in AI Option C — Pattern matching

#### 🖥️ Ollama + local AI model

A small AI model (llama3.2) runs on your computer. It actually reads your text and understands context — so "lucky number 123-45-6789" is recognised as not being a real SSN, while "my SSN is 123-45-6789" is.

-   Catches SSN, phone, email, credit card
-   Catches **names and addresses** (unique to this option)
-   Understands context — avoids flagging random numbers
-   Needs Ollama installed (~5 min setup)

#### When is this used?

Whenever Ollama is running and reachable on your machine. This is the most thorough option. If Ollama is offline or slow, the extension falls through to Option B automatically.

**Speed:** ~200–400ms. Slightly slower but catches the most.

#### 🧠 Gemini Nano (built into Chrome)

Chrome 130+ ships with a small AI model called Gemini Nano. No download needed — it's already in your browser. The extension asks it which types of information are present in your text, then uses built-in patterns to find the exact positions.

-   Catches SSN, phone, email, credit card
-   Names and addresses — missed (no pattern to find position)
-   No extra apps to install
-   Chrome 130+ desktop only, needs a Chrome flag enabled

#### When is this used?

When Option A is unavailable but you have Chrome 130+ with Gemini Nano enabled. Good balance of accuracy and zero setup.

**Speed:** ~50–100ms. Faster than Option A, zero server dependency.

#### 🔍 Built-in pattern matching

The extension looks for text that _looks like_ an SSN, phone number, or email — and checks whether a relevant word like "SSN", "phone", or "email" appears nearby. "My SSN is 123-45-6789" passes. "Lucky number 123-45-6789" doesn't.

-   Catches SSN, phone, email, credit card, API keys
-   Names and addresses — no pattern exists for these
-   Always available — zero setup, works offline
-   Lowest recall — only used as a last resort

#### When is this used?

Only as a fallback when neither Option A nor B is available. It's the safety net that's always there, even if everything else is offline.

**Speed:** Under 1ms. Instant. No AI, no network call.

**Automatic cascade:** Option A → Option B → Option C. The extension tries the best available method every time. You don't choose — it just works with whatever you have.

## AI Sites Covered

Currently works on 13 AI sites. New ones get picked up automatically — no update needed.

✓ ChatGPT ✓ Claude ✓ Gemini ✓ Microsoft Copilot ✓ Perplexity ✓ Google AI Studio ✓ Grok ✓ DeepSeek ✓ Mistral ✓ Poe ✓ GitHub Copilot ✓ Google AI Search ✓ Chrome Built-in AI

### Why it works on sites it's never seen before

Most browser extensions work by hard-coding the layout of each website — the exact button ID, the exact class name of the input box. That breaks every time a site redesigns.

ShadowShield takes two separate approaches that work together:

⏰

#### Patches the browser, not the site

For sending data: the extension patches Chrome's own send functions (`fetch`, XHR, etc.) rather than each website's UI. Every AI site uses those same browser functions, so all sites are covered automatically.

🎭

#### Playwright discovers input selectors

For DOM interception (watching what you type): the MCP server uses Playwright to open the new site in a headless browser, score every textarea and button by ARIA role, position, and keywords like "chat / send / prompt", then cache the best selectors. Results are stored locally with a 7-day refresh.

🧪

#### Self-tests after discovery

After Playwright finds the selectors, it types a test SSN, submits the message, and checks the network request to confirm the real SSN is absent. If the test fails, the site isn't added to the list.

### Why Playwright runs in the MCP server, not the extension

Chrome extensions are sandboxed — they can't spawn processes, write files, or launch a headless browser. Playwright has to live in the companion Node.js server (the MCP server) running locally on your machine. When you visit a new AI site, the extension pings the server, the server runs Playwright asynchronously in the background (you're not blocked), and the discovered selectors come back via the REST API.

**Real example:** When Grok launched, typing `npm run discover -- https://x.com/i/grok` ran Playwright against it, found the ProseMirror input, cached the selector, passed the self-test, and had it working — before any user visited it.

## How It Intercepts (Tech)

Four separate code paths are patched at `document_start` — before any page script runs — so nothing slips through regardless of which method the AI site uses to send data.

fetch()

#### Network fetch

Wraps the global `fetch` function. Intercepts POST bodies, masks them, then wraps the response with a TransformStream to de-mask SSE/NDJSON streams as they arrive token by token.

XMLHttpRequest

#### XHR (legacy)

Some AI sites still use XHR. Patches `XMLHttpRequest.prototype.send` and `open` to intercept bodies before they leave the browser.

MutationObserver

#### DOM text watching

Watches for text entered into `textarea` and `contenteditable` elements. Masks in-place before the React synthetic event fires. Coordinates with fetch layer to avoid double-processing.

window.ai

#### Web AI API

Chrome's `window.LanguageModel` API. Patches `create()` and wraps each session's `prompt()` method so local AI usage is also protected.

**Double-masking guard:** With both DOM and fetch interception active, the same text could be processed twice. A `recentlyMasked` map (30-second TTL) lets the fetch layer skip text already masked at the DOM layer.

## Detection Pipeline (Tech)

The MCP server combines regex candidate detection with LLM intent verification. The three-tier merge logic in the server:

// 1. LLM confirmed at overlapping position → keep const confirmedByLlm = llmEntities.some( lm => lm.type === re.type && !(re.end <= lm.start || re.start >= lm.end) ); if (confirmedByLlm) return true; // 2. LLM missed it but a PII keyword is within ±80 chars → keep // e.g. "ssn", "social security", "phone", "mobile" etc. if (hasNearbyKeyword(entity)) return true; // 3. Neither → drop ("lucky number 123-45-6789" lands here) return false;

How the content script talks to Gemini Nano (which only lives in page context, not the extension world):

// content script → page context window.postMessage( { type: 'SS\_NANO\_DETECT\_REQUEST', text, requestId }, '\*' ); // page-interceptor.ts asks Nano, then replies with type list window.postMessage( { type: 'SS\_NANO\_DETECT\_RESULT', requestId, types: \["ssn", "phone"\] }, '\*' ); // regex then finds where those types appear in the original text

## MV3 Challenges (Tech)

⚡

#### No persistent background

MV3 service workers terminate when idle. All state (shadow map, recent masks) lives in the content script process — not the service worker.

⏰

#### document\_start timing

The injected script must run at `document_start`. One frame late = page may have already called fetch without the intercept in place.

🌐

#### Isolated world

Content scripts can't see `window.ai` or page globals. Any page-context access needs a `world:"MAIN"` injection + postMessage bridge.

📡

#### SSE token splitting

A shadow value like "324-88-5540" can arrive in 3 separate SSE events. Reliable fix: wait for stream end, then de-mask the stable DOM at +200ms / +800ms / +2500ms.

🔄

#### isTrusted events

After replacing text, dispatching a synthetic Enter to submit triggers the interceptor again. Synthetic events have `isTrusted: false` — checking this flag breaks the loop.

📝

#### ProseMirror innerText

ChatGPT uses ProseMirror. `innerText` isn't reliable in all states. Cascade: `innerText` → `textContent` → child node scan covers all cases.

## The Bigger Picture

Right now, ShadowShield knows about common PII types that affect most people — SSNs, credit cards, phone numbers. But every company or team has its own sensitive information that no off-the-shelf tool knows about. Here's where this could go.

🗂️

Now

#### Common PII — universal patterns

The extension today protects the things that look the same for everyone: social security numbers, credit cards, phone numbers, email addresses. These have predictable formats that pattern matching handles well.

🏷️

Next idea

#### Company-specific identifiers

Most companies have internal IDs that mean nothing to a regex — employee numbers like "EMP-4829", project codes like "PROJ-ALPHA-7", or customer account formats unique to their CRM. A small fine-tuned model trained on examples of your company's ID formats could learn to flag these.

📋

Next idea

#### Policy-aware protection (RAG)

Instead of universal rules, connect the extension to a company's own policy documents. It could then know things like "project codenames are restricted until launch" or "this AI site is not approved for customer data" — and act accordingly. The same substitution mechanism, but guided by your policies rather than a hardcoded list.

💬

Next idea

#### Real-time chat (WebSocket)

WebSocket connections — used by some AI sites for real-time streaming — can only protect values that were already seen in a previous message. True first-message protection for WebSockets is a harder problem that needs a different interception approach.

💾

Later

#### Persistent stand-in values

Right now, the stand-in values reset each browser session. If you continue a chat conversation after closing the tab, the extension won't know the swap from the previous session. Persisting the mapping across sessions would fix this.

🔍

Later

#### Larger local models

The 3-billion-parameter model (llama3.2:3b) used today is fast but makes mistakes on edge cases — it sometimes tags surrounding words as part of a name, or misses less common identifier formats. Larger models would improve accuracy but need more RAM.

**Honest note:** These are ideas, not a roadmap with dates. The current version is an experiment. The goal is to understand whether this approach is even viable before building further.

## What We Learned

Building this turned up some non-obvious problems. These are the ones worth writing down.

004

architecture

#### Playwright can't run inside a Chrome extension

The original design had Playwright (for discovering AI site selectors) living inside the extension itself. Chrome extensions are sandboxed — they can't spawn processes, launch a headless browser, or access the filesystem. Had to split: the extension handles the browser side, a local Node.js MCP server owns Playwright, SQLite, and LLM calls. The extension talks to the server over a local REST API (`localhost:7331`). Lesson: design the extension/server split early — retrofitting it later is painful.

001

windows / powershell

#### PowerShell 5.1 and 7 are different languages

The `&&` operator, null-coalescing `??`, and optional chaining `?.` all exist in PS 7 but not in 5.1 — which is what Windows ships with by default. Scripts that worked in a terminal broke silently in CI. Always check `$PSVersionTable` first.

006

extension / content-script isolation

#### Extension scripts and page scripts live in separate worlds

A Chrome content script cannot access `window.ai`, the page's `fetch`, or anything set by the website's own JavaScript. You have to inject a separate script with `world: "MAIN"` and pass information back and forth through `postMessage`. This trips up almost everyone new to Chrome extension development.

011

extension / response handling

#### AI responses arrive in tiny pieces, not as one block of text

ChatGPT's streaming response might send "324" in one event, then "-88" in another, then "-5540" in a third. A stand-in value like "324-88-5540" is never present as a whole string in the raw data. The only reliable fix: wait until the response is completely finished, then find and replace in the stable text on screen.

014

detection / local AI model

#### Small AI models invent entity types for random numbers

Ask a 3B-parameter model to find SSNs in "lucky number 345345345" and it may tag "345345345" as a custom entity type anyway — even though there's no SSN context. We added filters: discard any custom entity that's just digits, or that contains no digits at all.

018

detection / name extraction

#### Small models grab surrounding words when extracting names

Input: "shall we let arjun go". The model returned: name = "let arjun go". Replacing that deleted the words "let" and "go" from the sentence. Fix: a list of common English verbs and prepositions — if a name entity contains one, discard it.

020

extension / interception layers

#### Two layers watching the same text can process it twice

The extension watches text both at the input box level (DOM) and at the network level (fetch). Without coordination, the same message gets masked twice — producing double stand-ins. Fix: a 30-second memory of "texts we already processed" so the network layer skips anything the DOM layer already handled.

023

extension / timing

#### The swap map may not be ready when the first response bytes arrive

The real-to-stand-in mapping is sent from the extension to the page layer asynchronously. If you check "is the map empty?" and skip response wrapping when it is, you'll miss the de-masking entirely — because the map arrives milliseconds after the first response bytes. The wrapper must always be in place; the map can arrive late.

## Contributors

Built by one person. Made better by four conversations.

![Prasad Bhat](https://media.licdn.com/dms/image/v2/D5603AQGgXhp3yrrprA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666885529926?e=1785369600&v=beta&t=tbh33_cs51DMo-RBjbMwYthsJLYddYjYQafrTx6xztI)

Prasad Bhat

Discussion partner

![Seema Prabhu](https://media.licdn.com/dms/image/v2/D4E03AQHf1uh9816URg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1697731951178?e=1785369600&v=beta&t=O7e2EhxCixzirSt9beOHLmiyZRPL4jjuzNwPsJgx8w0)

Seema Prabhu

Discussion partner

MS

Manjesh Srinivasa

Discussion partner

![Manjesh Srinivasa](https://media.licdn.com/dms/image/v2/D5603AQHP2JmxLyO6ww/profile-displayphoto-shrink_100_100/B56Z7t1Xv0HYAI-/0/1782106652716?e=1785369600&v=beta&t=hEO7-iEe52f2zU1XVISuZBhkDSznAb6Syt2UY5L7OWc)

Sham

Discussion partner
