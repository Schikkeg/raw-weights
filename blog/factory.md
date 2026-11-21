---
title: "Show your factory | HN Radar | RawWeights"
description: "Watch the same change go through a software factory with and without a gate. Real numbers from the HN Radar build, Qodo hackathon Day 15."
url: "https://rawweights.com/blog/factory.html"
type: blog
date: 2026-11-21
---

# Show your factory | HN Radar

> Watch the same change go through a software factory with and without a gate. Real numbers from the HN Radar build, Qodo hackathon Day 15.

## Sections

- Why a gate at all
- I predicted it, then tested it
- What runs, what is planned
- Fourteen days

## Content

No gateWith the gateGate + guard

PR #51

📝Ticket

⌨️Code + tests

🔍Qodo review

🚧Gate

🛡️Guard

🧑A person

🚀main

**🚧 Gate** checks the review's findings. **🛡️ Guard** protects chosen files: a change there always goes to a person, even when clean.

A change is requested.

**0**open problems

↺ Replay Next step ▸

Numbers are from PR #51 (10 findings, 2 High). This lane shows what would have shipped if I had ignored them.

## Why a gate at all

🏠

### A rule is a pause

Our parents were strict, and it worked because someone kept the rule. A gate is the same: not distrust, a moment to check before you act.

🖥️

### Check your own setup

This month's Java flaw, [CVE-2026-114938](https://www.helpnetsecurity.com/?p=391635), only bites on processors with a specific feature (AVX-512 VBMI). It is easy to rush an upgrade without checking whether your servers even have it. Know your environment first.

🔒

### Enforced beats written

A rule in a document depends on who reads it. A gate that is configured and tested keeps holding on a busy day.

## I predicted it, then tested it

### Outside the guard [PR #51](https://github.com/researchsite/hn-radar/pull/51)

**Predicted**Label appears once nothing Medium or higher is open.

**Observed**10 findings (2 High), all fixed. "Qodo approved" label added 19 Nov, 19:27 UTC.

### Inside the guard [PR #53](https://github.com/researchsite/hn-radar/pull/53)

**Predicted**Clean review, still no label and no auto-approval.

**Observed**3 Medium fixed, review clean, no label. A second account approved.

One lessonA gate in text depends on whoever reads it. Configure it, then test it with a change that should fail.

Honest caveats: #51's label came after I dismissed one Medium finding by hand, and the repo has no CI, so the label does not mean tests passed.

## What runs, what is planned

### Works now

-   Ticket → PR → Qodo review
-   Gate + guard
-   Human merge
-   fetch-hiring
-   fingerprint
-   match
-   showhn
-   pulse
-   draft

### Planned

-   radar USERNAME (building)
-   Agent works tickets alone
-   CI
-   MCP server
-   Scheduled refresh

The agent lane ran on one ticket (three runs, two failed safely). Every ticket since was built by hand with Claude Code. Not autonomous yet.

## Fourteen days

[**Day 1**First review: 3 Medium findings](https://github.com/orgs/qodo-hackathon/discussions/2#discussioncomment-19478646) [**Day 2**Rules in AGENTS.md](https://github.com/orgs/qodo-hackathon/discussions/4#discussioncomment-19559512) [**Day 3**Agents work from tickets](https://github.com/orgs/qodo-hackathon/discussions/5#discussioncomment-19578294) [**Day 4**Small model wiped a test file](https://github.com/orgs/qodo-hackathon/discussions/6#discussioncomment-19681230) [**Day 5**Qodo found holes in my rule](https://github.com/orgs/qodo-hackathon/discussions/7#discussioncomment-19617335) [**Day 6**Asked the code before building](https://github.com/orgs/qodo-hackathon/discussions/8#discussioncomment-19626548) [**Day 7**Dismissing needs a person](https://github.com/orgs/qodo-hackathon/discussions/9#discussioncomment-19637849) [**Day 8**Review before the PR](https://github.com/orgs/qodo-hackathon/discussions/10#discussioncomment-19637310) [**Day 9**A real quality gate](https://github.com/orgs/qodo-hackathon/discussions/11#discussioncomment-19642558) [**Day 10**Drew the whole flow](https://github.com/orgs/qodo-hackathon/discussions/12#discussioncomment-19642716) [**Day 11**Tested the reviewer with planted bugs](https://github.com/orgs/qodo-hackathon/discussions/13#discussioncomment-19669035) [**Day 12**Ticket as a checkable requirement](https://github.com/orgs/qodo-hackathon/discussions/14#discussioncomment-19705155) [**Day 13**Checking the checker](https://github.com/orgs/qodo-hackathon/discussions/15#discussioncomment-19721889) [**Day 14**Workflow + approval guard](https://github.com/orgs/qodo-hackathon/discussions/16#discussioncomment-19759442)

**24** PRs merged · **10** written rules · **669** tests  
Thank you to Qodo and the organizers, **Filip Hric** and **Nnenna Ndukwe**.  
Built with Qodo, Goose, Ollama and Claude · [github.com/researchsite/hn-radar](https://github.com/researchsite/hn-radar)
