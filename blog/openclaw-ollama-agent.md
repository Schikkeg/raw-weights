---
title: "My Son Doesn't Have a Phone. So I Built Him an AI Morning Alarm. | RawWeights"
description: "Cloud rate limits during testing, a 7B model that sent JSON to Telegram at 6am instead of cricket news, and the one insight that fixed everything: request shape, not volume, is what triggers rate limits."
url: "https://rawweights.com/blog/openclaw-ollama-agent.html"
type: blog
date: 2026-10-30
---

# My Son Doesn't Have a Phone. So I Built Him an AI Morning Alarm.

> Cloud rate limits during testing, a 7B model that sent JSON to Telegram at 6am instead of cricket news, and the one insight that fixed everything: request shape, not volume, is what triggers rate limits.

## Sections

- The Idea
- First Wall: I Couldn't Even Finish Testing
- Going Local — the 6am Moment
- The JSON Problem — Why Tool Calls Don't Execute
- Three Models, Three Lessons
- The Insight That Fixed Everything
- Full Setup Guide
- Command Reference
- Today's Delivery
- 9 Things I Actually Learned

## Content

## The Idea

My son is in middle school and doesn't have a phone yet. Every morning, getting him up is a negotiation. I walk in, he pulls the blanket. I walk in again, he says "five more minutes."

Then I had a different idea. What if I walked in with something worth waking up for — cricket scores, a car story, something weird in the world? Written like it's meant for a curious kid, not a search engine. Not me summarizing the news. An AI doing it overnight, delivered to my Telegram at 6am, ready to read the moment I open his door.

OpenClaw handles scheduled jobs, connects to Ollama, and can deliver messages via Telegram channels. I have an NVIDIA RTX 4060 Laptop GPU with 8GB VRAM sitting idle most of the night. This seemed like exactly the kind of thing I could set up in an evening.

⏰

#### 6am every day

Cron job fires, AI writes a kid-friendly news roundup overnight, delivered to Telegram before I get up.

🦙

#### Local, always-on

Ollama on my RTX 4060. No ongoing API cost, no rate limits — or so I thought before I started testing.

📢

#### The morning ritual

My son doesn't need a phone. I have one. The news brief is my opening line when I walk into his room. It works better than an alarm.

It did not work in an evening. It took several evenings, two dead ends, and one insight I didn't see coming.

## First Wall: I Couldn't Even Finish Testing

The default model in many OpenClaw setups is `minimax-m3:cloud`. It looks like a local Ollama model — you pull it the same way, it shows up in `ollama list`, you access it on the same port. But the `:cloud` suffix means the inference runs on Ollama's hosted servers. Free tier, shared quota.

The \`:cloud\` Trap

Any Ollama model with a **:cloud** suffix routes through Ollama's hosted servers. It shares a free-tier quota with everyone else. You're accessing it via your local Ollama — but the compute, and the rate limits, belong to Ollama's side.

The rate limit hit before I got anywhere useful. Not because I was sending a lot of traffic — I wasn't, it was day one. It hit because _setup itself is bursty_. Every time I tried to verify the full end-to-end pipeline — explore in chat, configure something, trigger the cron manually, check the Telegram delivery — each of those steps was a separate API call. Five minutes of testing meant 8–10 calls. That's a burst. Free tier throttled.

The brutal part: when you hit the rate limit mid-test, you can't tell whether the thing you just configured is broken or whether the rate limit is hiding the real answer. I spent 20 minutes questioning my Telegram config because I couldn't tell if the message failed or if the model never ran.

Then OpenClaw's own bug made it permanent: there's a documented issue where the cooldown state gets _stuck_ after a rate limit hit, looking like a permanent failure until you restart the gateway. What should be a 30-second wait becomes an hour of confused troubleshooting.

Burst

rate limit type — per-minute, not daily

8–10

API calls in a typical setup session

Stuck

cooldown bug — needs gateway restart

1

production call per day — never a problem

The standard advice at this point: switch to a fully local model. No rate limits, no cloud dependency. That's what I did — and the problem got more interesting.

## Going Local — the 6am Moment

`qwen2.5-coder:7b` is tool-use tuned, fits entirely in 8GB VRAM, runs locally with no rate limits. I pulled it, updated the config, verified the right model was running, and scheduled the job. Everything looked correct.

Then I went to bed and waited for the morning.

At 6am I checked Telegram. Something had arrived. But it wasn't the news. It was this:

What arrived at 6am — instead of cricket scores

{ "tool": "sessions\_send", "parameters": { "session": "main", "message": "📰 Kids News Roundup — Monday...\\n\\n🏏 Cricket: Australia..." } }

The model had written the news content perfectly — it was right there, inside the JSON. It had decided to call the correct tool with the correct parameters. But instead of _executing_ the tool call through the protocol OpenClaw's gateway watches for, it printed the whole thing as a plain text message. And that became the delivery.

I walked into his room that morning with nothing useful to say. The AI had talked to itself all night.

## The JSON Problem — Why Tool Calls Don't Execute

This isn't a bug you can fix with prompt engineering. It's a capability threshold, and understanding it changes how you think about local model selection for agentic work.

When OpenClaw runs an agent, it injects a system prompt that describes all available tools — their names, parameter schemas, and when to use them. A capable model reads this, decides which tool to call, and emits the call in a structured binary/JSON format that OpenClaw's gateway intercepts and executes. A model at or near its capability ceiling reads the same system prompt and decides to call the tool — but then writes the JSON as ordinary chat text instead of emitting it through the tool-call protocol.

7B behaviour — prints JSON as text

I'll send this now: {"tool": "send", "params": {"to": "7913...", "msg": "📰 Kids News..."}}

Cloud model — executes the call

\[OpenClaw gateway receives structured tool call, executes delivery silently, message appears in Telegram\]

The smoking gun came when the 7B model started leaking OpenClaw's _own internal runtime context_ — the metadata block that tells the model where to deliver the message — directly into the printed JSON. It wasn't misunderstanding the instructions. It couldn't hold the full agent tool surface in working memory and execute the protocol correctly at the same time.

Technical Note

This is separate from the `baseUrl` issue. If `models.providers.ollama.baseUrl` points to `http://127.0.0.1:11434/v1` (the OpenAI-compatible path), tool calling _also_ breaks — Ollama's streaming format on that path doesn't carry tool call metadata correctly. The native endpoint is `http://127.0.0.1:11434`. Check this first before blaming the model. In my case, the baseUrl was already correct — the 7B model was the actual limit.

This failure showed up across all three tool types I tested: `sessions_spawn`, `sessions_send`, and the basic `send`. It wasn't the complexity of the task — even a single-step delivery failed. Which meant there was no prompt rewrite that could fix it.

## Three Models, Three Lessons

I tested the progression you'd naturally try on 8GB VRAM: start small, scale up until something works.

Model

Type

VRAM

Tool Call Result

Failure Mode

`qwen2.5-coder:7b`

Local

~4 GB

✗ Fails

Emits JSON as chat text. Delivery body becomes raw JSON.

`qwen2.5:14b`

Local

~8 GB (partial CPU)

✗ Fails differently

Stops emitting raw JSON, but gets confused by OpenClaw's injected runtime context block — asks for clarification instead of proceeding silently.

`minimax-m3:cloud` (chat bursts)

Cloud via Ollama

None (hosted)

⚠ Rate-limited

Works correctly per call, but multi-step chat sessions exceed free-tier burst limits. Stuck-cooldown bug compounds this.

`minimax-m3:cloud` (cron only)

Cloud via Ollama

None (hosted)

✓ Works

None. 1–2 calls per day, once at 6am. Never approaches burst limit. This is the current production setup.

The 14B result was the most interesting. It had enough capacity to stop printing raw JSON — that capability threshold was cleared. But it hit a different wall: OpenClaw injects a metadata block into the system prompt that tells the model where to deliver the output. A 7B model can't hold all of this and produce structured output. A 14B model holds it, reads the delivery instructions, and then asks for confirmation rather than following them silently. Same underlying gap — following a complex injected system instruction — just surfacing differently.

32B would likely clear both bars, but would require heavy CPU offload on 8GB VRAM — probably too slow to be practical for a morning delivery that needs to complete in seconds.

The Right Call

Keeping `minimax-m3:cloud` for the single daily cron job is a legitimate permanent setup. One call at 6am, outside of any burst window, never hits the rate limit. Local `qwen2.5-coder:7b` handles all casual chat. Per-job model overrides (`openclaw cron edit <job-id> --model "..."`) make this mix-and-match trivial.

## The Insight That Fixed Everything

Here's the thing I didn't understand at the start: the cloud model that rate-limited me during testing is the same model that runs perfectly in production. The model didn't change. The request shape did.

Testing — bursty, rate-limited

Explore in chat → configure → test cron → check delivery → adjust → re-test → repeat = 8-10 API calls in 3 minutes = burst limit hit every session = can't tell if config is broken or if rate limit ate the error

Production — single call, never limited

Cron job fires at 6am = 1 API call = content generated = --announce handles delivery = model never needs a tool call = no burst, no rate limit, ever

The workaround isn't really a workaround. It's just correctly understanding what the cron job is — a single, isolated task that does one thing. The cloud rate limit applies to _burst conversations_. A daily cron call that fires once at 6am and asks the model to write one piece of content is never going to be a burst. The same model works for both; you just can't verify it using a bursty chat session.

The key design decision

Use `--announce` with `--channel` and `--to` — these flags tell OpenClaw to handle delivery itself, outside the model's control. The model's only job is to write text. It never needs to make a tool call. No tool call means no tool-call failure. This is what made the cloud model safe for this use case — one clean content-generation request, nothing else.

Once I understood this, the setup became obvious: local model for casual chat (fine for non-tool tasks), cloud model for the one daily cron job (reliable tool execution when needed, single call so no burst). Two models, different jobs, zero conflicts.

## Full Setup Guide

Start to finish, from a clean Windows machine. These are the exact steps I ran.

### Install Ollama and OpenClaw

-   1
    
    #### Install Ollama
    
    Download from **ollama.com** and run the installer. Ollama starts as a background service automatically. Verify it's running:
    
    `ollama list`
    
-   2
    
    #### Pull a local model (for casual chat)
    
    For general chat and non-tool tasks. Does _not_ need to handle tool calls.
    
    `ollama pull qwen2.5-coder:7b`
    
-   3
    
    #### Install OpenClaw
    
    Follow the OpenClaw installer for Windows. After install, verify the config file location:
    
    `openclaw config file`
    
-   4
    
    #### Edit openclaw.json directly — not via CLI JSON args
    
    PowerShell strips double quotes differently than bash. For any config value containing JSON structures, edit `openclaw.json` in a text editor instead of using `--strict-json` CLI flags. Set the native Ollama endpoint:
    
    `# In openclaw.json: "models": { "providers": { "ollama": { "baseUrl": "http://127.0.0.1:11434", // NOT http://...11434/v1 } } }, "agents": { "defaults": { "model": { "primary": "ollama/qwen2.5-coder:7b" } } }`
    
-   5
    
    #### Verify config (in your OS terminal, not the OpenClaw chat window)
    
    OpenClaw has two interfaces: the chat window (shows the agent status bar at the bottom) and the OS terminal (PowerShell, Command Prompt). All CLI commands must run in the OS terminal.
    
    `openclaw config get agents.defaults.model openclaw config get models.providers.ollama.baseUrl openclaw config validate`
    

### Set Up Telegram

-   6
    
    #### Create a Telegram bot
    
    In Telegram, message **@BotFather** → `/newbot` → follow prompts. Copy the bot token.
    
-   7
    
    #### Add bot token to openclaw.json
    
    Telegram does _not_ use `openclaw channels login telegram`. The token goes directly in config — channels login is for other providers.
    
    `# In openclaw.json, under channels.telegram: "telegram": { "botToken": "YOUR_BOT_TOKEN_HERE" }`
    
-   8
    
    #### Restart the gateway and pair
    
    The user must message the bot first to initiate pairing. After restarting:
    
    `openclaw gateway restart # User messages the bot → bot replies with pairing code openclaw pairing list telegram openclaw pairing approve telegram <PAIRING_CODE>`
    
-   9
    
    #### Test delivery manually
    
    Get the user's Telegram chat ID from `pairing list` output and test:
    
    `openclaw message send --channel telegram --target <CHAT_ID> --message "test"`
    

### Create the Cron Job

-   10
    
    #### Add the cron job — with one critical rule on the prompt
    
    Never instruct the model to "send" or "deliver" anything in the `--message` prompt. The `--announce` flag handles delivery outside the model's control. If the model is also told to send, it attempts a redundant tool call it can't complete — and that failure becomes the message body.
    
    `openclaw cron add \ --name "Daily Kids News" \ --cron "0 6 * * *" \ --tz "America/Los_Angeles" \ --session isolated \ --message "Write a middle-school-friendly news roundup: \ 1) latest cricket news, \ 2) latest car/automotive news, \ 3) one interesting story from the last 24 hours. \ Keep language simple and fun for a middle schooler. \ Format with clear headers." \ --announce \ --channel telegram \ --to "<CHAT_ID>"`
    
-   11
    
    #### Set the model override for this job specifically
    
    After creating the job, override its model to one that can reliably execute tool calls. This keeps local `qwen2.5-coder:7b` for chat while the cron job uses the cloud model.
    
    `openclaw cron list # Copy the job ID, then: openclaw cron edit <job-id> --model "ollama/minimax-m3:cloud" openclaw cron run <job-id> # Verify the delivery arrived before enabling openclaw cron enable <job-id>`
    

## Command Reference

All the commands I actually needed, grouped by purpose. Run these in your OS terminal, not the OpenClaw chat window.

Diagnostics\# Check what's running ollama list ollama ps ollama show qwen2.5-coder:7b \# Test Ollama directly curl http://127.0.0.1:11434/api/chat \\ -d '{"model":"qwen2.5-coder:7b","messages":\[{"role":"user","content":"hi"}\]}'

OpenClaw Config\# Find the config file openclaw config file \# Read values openclaw config get agents.defaults.model openclaw config get models.providers.ollama.baseUrl openclaw config get agents.entries openclaw config validate \# Set values (simple strings only — JSON values: edit the file) openclaw config set agents.defaults.model.primary "ollama/qwen2.5-coder:7b" openclaw config set models.providers.ollama.baseUrl "http://127.0.0.1:11434"

Gatewayopenclaw gateway restart \# Use this to clear stuck cooldown state after rate limit hits

Telegramopenclaw pairing list telegram openclaw pairing approve telegram <PAIRING\_CODE> openclaw channels logs --channel telegram --limit 5 openclaw message send --channel telegram --target <CHAT\_ID> --message "test"

Cron Jobsopenclaw cron list openclaw cron run <job-id> openclaw cron runs <job-id> openclaw cron edit <job-id> --model "ollama/minimax-m3:cloud" openclaw cron edit <job-id> --message "new prompt here" openclaw cron enable <job-id> openclaw cron disable <job-id> openclaw cron remove <job-id>

Model Pullsollama pull qwen2.5-coder:7b ollama pull qwen2.5:14b \# cloud (not local — requires Ollama account) ollama pull minimax-m3:cloud

## Today's Delivery

This arrived at 6am this morning. My son doesn't have a phone — I read it to him when I walk into his room. Cricket, a car recall, a robot that beat Usain Bolt. He was out of bed before I finished the third one.

The model wrote it. OpenClaw delivered it to my Telegram. Nothing leaked. No JSON.

🤖

Morning News Bot

6:00 AM · August 24, 2026

**📰 Kids News Roundup — Monday, August 24, 2026**

🏏 Cricket News: Australia Crushes Bangladesh in Two Days!

Big news! Australia beat Bangladesh in the second Test in Mackay in just two days — super fast for a five-day game. Mitchell Starc grabbed 10 wickets including 6-12 in the first innings. Bangladesh scored 64 then 95. Australia won by an innings, tying the series 1-1.

🚗 Car News: Tesla Recalls Almost 3 Million Cars

Tesla recalled ~3 million cars in China — their hidden door handles can get stuck and not open in an emergency. Chinese carmakers are recalling 1M+ more for similar issues. Tesla will fix them free, usually with a software update.

🤖 Cool Story: A Robot Beat Usain Bolt's 100m Record!

At a robot sports event in Beijing, a humanoid robot called "Lightning" ran the 100m faster than any human ever — faster than Usain Bolt! Engineers say robots keep getting better at running and balancing. The future of sports might look very different!

✓✓ Delivered · 6:02 AM

Written by `minimax-m3:cloud`. Delivered by OpenClaw `--announce`. The model's only job was writing — no tool call needed.

## 9 Things I Actually Learned

The things the tutorials don't say — discovered by hitting each one in sequence.

01

#### `:cloud` suffix = not local

Ollama models with `:cloud` route through Ollama's hosted servers with a shared free-tier quota. The rate limit is per-minute, not daily — a burst of setup chat is enough to hit it.

02

#### 7B models break at tool-call output, not decision

They correctly decide which tool to call and what parameters to pass. They fail at emitting the structured format OpenClaw's gateway intercepts. Different failure than "doesn't understand the task."

03

#### Testing is bursty. Production isn't. They behave differently.

A setup session fires 8–10 API calls in minutes — that's a burst. A daily cron fires 1 call at 6am — that's not. The cloud model that rate-limited me during testing works fine in production because the request shape is completely different. You can't verify end-to-end with a conversational test session.

04

#### `baseUrl` must be the native Ollama endpoint

`http://127.0.0.1:11434` — not `.../v1`. The OpenAI-compatible path breaks tool-calling streaming. Check this before blaming the model.

05

#### OpenClaw chat window ≠ OS terminal

Typing `openclaw cron list` into the OpenClaw chat asks the agent to interpret it, not run it. CLI commands only work in PowerShell/CMD.

06

#### Never tell the model to "send" anything in the cron prompt

`--announce` handles delivery outside the model's control. If the prompt also says "send to Telegram," the model tries a tool call it can't complete — and the failure JSON becomes the message.

07

#### Per-job model overrides let you mix local and cloud

`openclaw cron edit <job-id> --model "..."` sets a model for just that job. Chat stays local. The one cron job that needs reliable tool calls gets the cloud model.

08

#### PowerShell JSON quoting is fragile

For any config value containing JSON structures, edit `openclaw.json` directly in a text editor. The `--strict-json` CLI flag + PowerShell quoting is a reliable way to corrupt your config.

09

#### Shortcut labels are stale — trust `config get`

Start Menu and taskbar tiles cache the model name separately from `openclaw.json`. The tile can show `minimax-m3:cloud` while the actual runtime model is something completely different. Always verify with `openclaw config get` and `ollama ps`.

Where Things Stand

The path to fully local would be a 32B model — heavy CPU offload on 8GB VRAM, probably too slow for a 6am delivery. The current setup (local 7B for chat, cloud model for the one daily cron) is stable, never hits rate limits, and does exactly what it was built to do. Sometimes the right architecture is the one that's boring enough to run every morning without anyone noticing.
