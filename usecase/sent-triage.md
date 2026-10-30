---
title: "SentTriage — Behavioral Email Classifier | RawWeights"
description: "Most email filters ask what an email is about. SentTriage asks what it requires from you. A builder's log: 6 buckets, 8 behavioral signals, 5 prompt iterations, and what the eval loop actually taught me."
url: "https://rawweights.com/usecase/sent-triage.html"
type: usecase
date: 2026-10-30
---

# SentTriage — Behavioral Email Classifier

> Most email filters ask what an email is about. SentTriage asks what it requires from you. A builder's log: 6 buckets, 8 behavioral signals, 5 prompt iterations, and what the eval loop actually taught me.

## Sections

- The Real Problem
- Why I Built This
- vs. Other Tools
- How It Works
- The Eval Story
- Failure Analysis
- What's Next

## Content

### In this page

1.  [The Real Problem](#section-problem)
2.  [Why I Built This](#section-why)
3.  [vs. Other Tools](#section-comparison)
4.  [How It Works](#section-how)
5.  [The Eval Story](#section-eval)
6.  [Failure Analysis](#section-failures)
7.  [What's Next](#section-next)

## The Real Problem

Why a full inbox isn't really about volume

Your inbox isn't overwhelming because there are too many emails. It's overwhelming because every email is a micro-decision. _Do I need to act on this? Now? Later? Did I already handle it? Is it even for me?_

Most tools solve the wrong thing. They sort by topic — newsletters here, promotions there, "important" emails somewhere else. But **the anxiety isn't about what the email is. It's about what it requires.**

"Gmail can tell you this email is from a company you bought from. SentTriage asks: have you ever replied to them? Did you start this conversation? Is anyone waiting on you?"

— The behavioral signal that changes everything

The insight behind SentTriage: if you know what an email _requires_ from you, you don't need to open it. You just need the right bucket. Six buckets, one decision, done.

⭐

VIP\_ENGAGED

#### Keep in Inbox

People you've emailed before. Known contacts. Always stays.

💬

GHOSTED\_THREAD

#### Follow Up

You started this conversation. They replied. You forgot. They're waiting.

📄

VITAL\_LOGISTICS

#### Keep — Important

Tax docs, bank alerts, medical, active shipping, appointment reminders.

⏰

EXPIRED\_LOGISTICS

#### Archive

OTP codes, delivered package notifications. Their moment has passed.

🎭

DECOY\_MARKETING

#### Archive + Unsubscribe

Marketing disguised as personal. "Hey, quick question for you…" from strangers.

🧟

ZOMBIE\_NOISE

#### Delete Instantly

Bulk noise you've ignored for months, or senders who defied your unsubscribe request.

## Why I Built This

From studying evals to applying them on a real problem

This project started in a GenAcademy class on AI Evaluations. The first thing I built was a study guide on _why evals matter_. The second was a conference dispatch on _how practitioners run the iteration loop at production scale_. And then I thought: I should actually do it myself.

[

Step 1 — Study

#### AI Evals: Practitioner Guide

Why benchmarks lie, how to design evals that catch real failures, the full calibration process.

](/tools/eval-proving-ground.html)[

Step 2 — Conference

#### The Iteration Machine

Nubank running evals at 135M users. "Quality is a function of velocity. The loop is the product."

](iteration-machine.html)

Step 3 — Build

#### SentTriage

Apply the loop to a real personal problem. 100 emails. 5 iterations. Find out where the prompt breaks.

**The key thing I wanted to test:** Could I actually do what the practitioners described — read all failures before naming any categories, let the patterns emerge, then fix only the specific mechanism that broke? Not guess at a fix. Actually diagnose.

## vs. Other Tools

What exists and why behavioral signals are different

Tool

How it decides

Reply history

Thread direction

Time decay

Unsubscribe enforcement

Gmail Priority Inbox

Open/reply patterns + sender frequency

Partial

✗

✗

✗

SaneBox

Sender importance + interaction history

✓

✗

✗

✗

Unroll.me

Subscription detection only

✗

✗

✗

Partial

Clean Email

Sender type + volume rules

✗

✗

✗

✓

SentTriage

8 behavioral signals — what it _requires_ from you

✓

✓

✓

✓

The gap that none of the existing tools fill: **GHOSTED\_THREAD detection**. No tool currently tells you "you started this conversation, the other person replied three days ago, and they're waiting." That's the highest-anxiety category in an inbox — and the easiest to miss. SentTriage specifically looks for it by checking thread direction and reply history together.

Also unique: **time-decay for logistics**. An OTP code from 2 hours ago is EXPIRED\_LOGISTICS, not VITAL\_LOGISTICS. A package delivery notification from 3 weeks ago is noise. No existing tool makes this distinction automatically.

## How It Works

8 behavioral signals, structured metadata, one LLM call per email

SentTriage doesn't read the full email body. It reads a structured metadata record — 8 behavioral signals extracted from the email headers and sent-folder history. This makes it faster, cheaper, and privacy-preserving: no raw body text leaves your machine.

Example email record sent to classifier

Subject: Re: Contract draft — version 2  
From: legal@partnerco.com  
Days old: 2  
Reply history: Have replied before  
Thread initiated: By me  
Has attachment: Yes  
Preview: Attached is the revised contract incorporating your redlines…

1

**Reply history**Have you ever emailed this person before? Key to VIP vs. cold sender

2

**Thread direction**Who started the conversation? "By me" + reply from them = possible GHOSTED

3

**Email age**How many days old? OTP codes and tracking links decay fast

4

**Has attachment**Official document indicator — tax docs, contracts, statements

5

**Sender tone**Personal vs. automated vs. bulk — detected from preview + subject

6

**Prior stop requests**"Replied 'unsubscribe' previously" = automatic ZOMBIE\_NOISE

7

**Content type**OTP code vs. shipping update vs. bank statement — specific patterns

8

**Urgency framing**"Ends tonight" vs. "monthly digest" — commercial pressure vs. genuine urgency

**Model used:** Llama-3.3-70B-Instruct via Nebius AI (OpenAI-compatible endpoint). Temperature 0, structured output schema, `@traceable` on every call so every classification is visible in LangSmith.

## The Eval Story

Five prompt versions. Not a straight line up.

This is the part no one usually shows. Prompt iteration doesn't always go up. I ran 5 versions. One of them dropped from 84% to **76%** — worse than where I started. The eval loop is what let me catch it and recover.

v1

Baseline

84%

8-signal behavioral prompt. First run. GHOSTED/VIP confusion, OTP → VITAL misfires, ZOMBIE → DECOY errors.

v2

+1%

85%

Added GHOSTED priority rule. Small gain but created a new problem: ALL "Re:" threads were getting GHOSTED regardless of who started them.

v3

⬇ worse

80%

Added emotional framing rule for DECOY/ZOMBIE. Caused re-engagement emails ("We miss you") to flip to DECOY instead of ZOMBIE. Regression of 5 points.

v4 ★

Best

86%

Three targeted fixes: (1) "Thread by sender → never GHOSTED"; (2) B2B cold sales = DECOY; (3) ALL one-time codes → EXPIRED regardless of age.

v5

⬇ overfit

76%

Added "prior relationship" as a DECOY signal. Caused SaaS lifecycle emails to flip to DECOY (overfit). Worse than v1. Reverted to v4 as best.

**The lesson:** The eval loop was the only thing that kept v3 and v5 from shipping. Without tracking every version in `eval_summary.csv`, I would not have known that adding rules sometimes makes things worse. Iteration is not a ratchet. It requires measurement at every step.

86%

peak accuracy (v4)

14

failures remaining in v4

3

failure categories discovered

76%

worst version (v5 — overfit)

## Failure Analysis

Read all failures first. Name the categories after. This is the rule.

The GenAcademy submission required annotating every failure and discovering the failure categories from the data — not assumptions made in advance. Here are the three patterns that emerged from reading all 14 v4 failures.

6 failures ghosted\_vip\_boundary\_blur

▶

The model confuses **VIP\_ENGAGED** and **GHOSTED\_THREAD** — the two hardest buckets to separate. The core issue: GHOSTED requires that (a) I started the conversation AND (b) the sender's reply is waiting for me. The model kept firing the GHOSTED rule when the thread was started by the sender, or treating a soft courtesy phrase ("let me know if this works") as a blocking reply.

Examples (truth → predicted)

VIP\_ENGAGED

→

GHOSTED\_THREAD

e001: "Re: Project proposal review" — thread was initiated by sender, not by me.

VIP\_ENGAGED

→

GHOSTED\_THREAD

e003: "Re: Contract draft v2" — delivered contract with "let me know if this works" treated as blocking request.

GHOSTED\_THREAD

→

VIP\_ENGAGED

e028: Catch-up call confirmation — "I'll send a calendar invite" still requires me to confirm the meeting.

**Fix in v4:** Explicit rule added — "Thread initiated: By sender → NEVER classify as GHOSTED\_THREAD." Reduced this category from 7 to 6 failures. Remaining gap requires understanding reply _intent_, not just presence.

7 failures decoy\_human\_test\_too\_narrow

▶

The biggest failure category in v4. The DECOY definition in v4 was too narrow: it targeted emails that impersonate a human ("Hey, quick question from Jake"). It correctly caught cold B2B sales but missed brand commercial emails that use _personal emotional hooks_ — "as a valued customer," "we miss you," "your cart is expiring." Those are also DECOY (they're targeting you personally) but don't use "I" language from a human.

What got misclassified

DECOY\_MARKETING

→

ZOMBIE\_NOISE

"Special offer just for you — as a valued customer, 40% off." (e071)

DECOY\_MARKETING

→

ZOMBIE\_NOISE

"We miss you — come back! Use code COMEBACK20." (e073)

DECOY\_MARKETING

→

ZOMBIE\_NOISE

"Last chance — your cart is expiring." (e077)

**Remaining gap:** Fixing DECOY/ZOMBIE without introducing regressions is the hardest part of this dataset. v3 and v5 both introduced regressions trying to solve this. The boundary requires understanding marketing _intent level_, which may need fine-tuning rather than prompt engineering.

1 failure otp\_age\_zero

▶

A one-item pattern but an important one. A PayPal OTP code with "Days old: 0" was classified as VITAL\_LOGISTICS because the v1 prompt had a rule: "Days old = 0 → still active → VITAL." The mistake: OTP and MFA codes expire in _minutes_, not days. By the time any classifier runs on them, they're expired. The correct rule: ALL one-time codes → EXPIRED\_LOGISTICS, regardless of age.

EXPIRED\_LOGISTICS

→

VITAL\_LOGISTICS

e051: "Your PayPal one-time passcode is 204817. Valid for 10 minutes only." Days old: 0.

**Fix in v4:** "ALL one-time codes and MFA/OTP messages → EXPIRED\_LOGISTICS regardless of Days old." Fixed all 3 OTP failures across the test set (e047, e049, e051, e053, e055 — most caught in v1, one remained to v4).

## What's Next

The remaining 14% and what would actually fix it

The v4 prompt hit 86%. The remaining 14% is concentrated in two places: GHOSTED/VIP boundary judgment and DECOY/ZOMBIE brand commercial distinction. Here's what would actually move the needle.

Phase 2 — PPO

Proximal Prompt Optimization already scaffolded in `langsmith_eval.py` (commented out). The next step: run automated prompt rewrites against the eval set, epsilon-clipped to prevent wild changes. This is the approach Nubank described using for 60%+ of their prompt edits.

DECOY/ZOMBIE boundary

Brand commercial emails ("valued customer," cart abandonment) need a finer distinction than prompt engineering can provide. Candidate for a few-shot examples targeting intent level — personal targeting vs. bulk broadcast — or fine-tuning on a larger annotated dataset.

Real inbox integration

Currently classifies synthetic metadata. The next step is a Gmail API connector that extracts the 8 signals from real emails in real time — reply history from Sent folder, email age from headers, attachment from metadata. The classifier doesn't change; only the input extraction pipeline does.

Cheat sheet eval set

As the SentTriage project spec describes: save every confirmed failure as a permanent test case. Before any new prompt ships, run it against the full cheat sheet. Any regression = the prompt doesn't ship. This is the discipline that makes the loop reliable.

**The most important thing I learned:** Data and evals are always the hard part. The optimization tools — LangSmith, PPO, automated runners — are getting better fast. But someone still has to read every failure, resist the urge to name patterns before they've read them all, and be honest when a fix made things worse. That part doesn't automate.

[

View on GitHub

github.com/researchsite/SentTriage — prompts, eval data, LangSmith integration

↗](https://github.com/researchsite/SentTriage)

Built on the foundation of

[

#### AI Evaluations: Practitioner Guide

RAGAS, G-Eval, calibration, the eval maturity ladder — everything that makes an eval set trustworthy.

→](/tools/eval-proving-ground.html)[

#### The Iteration Machine

Nubank's production eval loop at 135M users. The conference that made me want to actually run this experiment.

→](/usecase/iteration-machine.html)
