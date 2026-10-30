---
title: "Plumber Lab — Pipeline Security, Visualized | RawWeights"
description: "An interactive lab that teaches CI/CD pipeline security through hands-on experience. No prior knowledge needed."
url: "https://rawweights.com/usecase/plumber-lab.html"
type: usecase
date: 2026-10-30
---

# Plumber Lab — Pipeline Security, Visualized

> An interactive lab that teaches CI/CD pipeline security through hands-on experience. No prior knowledge needed.

## Sections

- Start Here
- The Analogy
- Live Playground
- How Rules Work
- Architecture
- vs. Other Tools

## Content

## Start Here

Install → Scan → Fix → Gate. No account needed.

Run plumber on any repo that has GitHub Actions or GitLab CI workflows. You get a letter score (A–E), a list of what’s wrong, and exact instructions on how to fix each item.

A–E

score

9

risk categories

0

config to start

2

platforms: GH + GL

► Don’t have a workflow file yet? Start here.

💡

**What is a workflow file?** A workflow file is a YAML file inside `.github/workflows/` in your repo. It tells GitHub when to run automated tasks — tests, builds, deployments. If you have no workflows yet, copy one of these to get started, then run plumber on it.

Minimal starter — CI with tests

.github/workflows/ci.yml A-score ready

```hl-cmt
# Copy this into .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read        # least privilege — required by plumber

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4
        with:
          persist-credentials: false  # don't write token to .git/config
      - run: npm ci
      - run: npm test
```

Weekly dependency audit

.github/workflows/audit.yml A-score ready

```hl-cmt
# Runs every Monday — checks for vulnerable packages
name: Security Audit

on:
  schedule:
    - cron: '0 9 * * 1'  # every Monday 9am UTC

permissions:
  contents: read

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4
        with:
          persist-credentials: false
      - run: npm audit --audit-level=high
```

macOS / Linux Windows

1

Install

One command. No account, no token, no config file needed.

brew install getplumber/plumber/plumber

copy

2

Scan your repo

Run from your repo root. Plumber finds all workflow files automatically.

plumber scan .

copy

3

Add the security gate to CI

Add this step to your workflow. It blocks the pipeline if the score drops below B — like a bouncer that won’t let bad changes through.

\- name: Plumber security gate run: | curl -sSfL https://get.getplumber.io | sh ./plumber scan --min-score B .

copy

1

Install via Scoop

Or download the binary directly from getplumber.io/docs/cli/installation.

scoop bucket add plumber https://github.com/getplumber/scoop-plumber scoop install plumber

copy

2

Scan your repo

Run from your repo root in PowerShell.

plumber scan .

copy

3

Add the security gate to CI

Same step as Linux — paste into your GitHub Actions workflow YAML.

\- name: Plumber security gate run: | curl -sSfL https://get.getplumber.io | sh ./plumber scan --min-score B .

copy

✅

**Real result:** A Next.js project with no CI workflows started at Score E, 30/100 after adding two basic workflow files. Two fixes — `persist-credentials: false` and branch protection — brought it to Score A, 100/100 in under 10 minutes.

## The Analogy

Pick the one that clicks. They all describe the same tool.

Pipeline security sounds intimidating. It’s not. Pick the analogy below that makes most sense to you — each one maps directly to how plumber works.

🚪

The Bouncer

Has a rulebook. Nothing gets in that breaks the rules.

📋

The Playbook

Everyone on the team follows the same rules, automatically.

✍️

Spell Check

Catches mistakes as they happen, not after the damage is done.

At a club

A bouncer stands at the door with a rulebook

Fake ID? You’re not getting in

Under age? Rejected, no matter who you are

The bouncer doesn’t debate the rule — they enforce it

No bouncer = anyone walks in

In your pipeline

Plumber scans every change before it ships

Action not pinned to a specific version? Rejected

Token written to disk? Flagged, every time

`--min-score B` is the bouncer that blocks the deployment

No plumber = any workflow ships, no questions asked

🔑

**The key idea:** The bouncer doesn’t wait until someone causes trouble inside. They check at the door. Plumber checks before the code ships — not after a breach is reported.

On a sports team

A playbook is a written set of plays everyone knows

New player joins — they learn the playbook

No one improvises in critical moments

The coach doesn’t re-explain the rules every game

Consistency wins championships

In your pipeline

`.plumber.yaml` is your team’s security playbook

New developer joins — the rules already apply to their PRs

No one has to remember to check — plumber does it automatically

Security lead doesn’t have to review every workflow change

One policy file → consistent security across every repo

📋

**The key idea:** Security rules written down and enforced automatically means nobody has to trust that someone remembered to follow them. The playbook runs itself.

In a word processor

Spell check reads every word as you type

Red squiggly appears under the mistake immediately

You fix it before sending the email

It doesn’t wait for your boss to point it out

Same rules apply to everyone

In your pipeline

Plumber reads every workflow file on every commit

Flagged issue appears in CI immediately, not after a breach

You fix it before the vulnerable workflow ships to production

Doesn’t wait for a security audit six months later

The same check runs for every developer, every PR

✍️

**The key idea:** You already use spell check without thinking about it. Pipeline security should work the same way — automatic, immediate, not a separate process you have to schedule.

### Now in code terms

If you’ve used ESLint for JavaScript, you’ve already used the same mental model. Plumber is a linter for your workflow files — same concept, different file type.

ESLint — checks .js files

```hl-dim
function checkUser(user) {
  if (user.age == "18") {  // ← eqeqeq rule
    return true;
  }
}

// Rule: use === not ==
// Input: your JS code
// Output: list of violations
```

Plumber — checks .yml workflow files

```hl-dim
steps:
  - uses: actions/checkout@v4  # ← unpinned tag
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      # persist-credentials missing = token on disk

# Rule: pin to SHA, not a tag
// Input: your workflow YAML
// Output: score + findings
```

## Live Playground

Pick a vulnerability type. See it caught. See the fix. Watch the score change.

🔒 Unpinned Action 💾 Credential Leak ⚡ Dangerous Trigger 🐛 Script Injection

ci.yml Unpinned Action

```
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4  # ← mutable tag
      - run: npm ci && npm test
```

⚠️

**The risk:** `@v4` is a tag the action owner can move to any commit at any time. If someone compromises the `actions/checkout` repository and moves the `v4` tag to a malicious commit, every pipeline using `@v4` automatically runs the malicious code — with full access to your secrets.

plumber scan .

Unpinned Action \[MEDIUM\]

actions/checkout pinned to mutable tag @v4

ci.yml line 6

The tag can be moved to any commit.

Fix: pin to a full SHA hash instead.

Score: E 55/100

E

before fix

Show Fix →

ci.yml fixed

```
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4
      - run: npm ci && npm test
```

A

100/100 — pipeline clean

## How Rules Work

Step through the credential-leak check, one line at a time.

Under the hood, plumber uses **OPA (Open Policy Agent)** — the same policy engine that powers Kubernetes security. Rules are written in **Rego**, a declarative language. Think of it as the spell-check dictionary: each rule is one question the engine asks about your pipeline.

Here is the credential-leak rule being evaluated against a real workflow, step by step.

← Prev Step 1 of 5 Next →

The Rule (Rego)

credential-leak.rego OPA policy

```
package credential_leak

import rego.v1

deny contains finding if {
  some i
  job := input.pipeline.jobs[i]
  some j
  step := job.steps[j]
  contains(step.uses, "actions/checkout")
  step.with.persistCredentials == true
  finding := { "message": "credential leak", ... }
}
```

Your Pipeline (parsed data)

input.pipeline parsed YAML

```
{
  "pipeline": {
    "jobs": [
      { "name": "build",
        "steps": [...] }
    ]
  }
}
```

**Step 1 of 5 — Your YAML is parsed into structured data.**  
  
Plumber reads `ci.yml` and converts it into a Go data object called `NormalizedPipeline`. This is serialised to JSON and becomes `input.pipeline` — the data every rule reads. Think of it as plumber transcribing the YAML into a format the rules engine can interrogate.

## Architecture

Click any box to see what it does.

Plumber is a Go command-line tool. Your YAML goes in one end, a score and findings come out the other. The middle layer — the NormalizedPipeline — is the design insight that makes it work on both GitHub Actions and GitLab CI with the same rules.

📄

YAML Files

.github/workflows/

→

🔍

Go Parser

github/ gitlab/

→

🧱

Pipeline IR

common data shape

→

⚖️

OPA Engine

policy evaluator

→

📋

Rules

9 categories

→

📊

Score + Findings

A–E · SARIF · JSON

🔄

#### One Rule, Two Platforms

Both GitHub Actions and GitLab CI parse into the same data shape. A rule written once works on both — no duplication, no platform-specific versions.

📖

#### Open Rules

Every rule is a readable file in the open-source repo. You can see exactly what is being checked and why. No black box.

⚡

#### Attack-Path Scoring

Not every problem is equal. A misconfiguration in a deploy pipeline that publishes to npm is ranked higher than the same issue in a docs build. Scoring reflects actual risk.

## vs. Other Tools

Filter by what matters to you. ✓ yes   ◐ partial   ✗ no

All GitLab CI Free / No Account Attack-Path Score Runtime Monitoring Block CI (Policy Gate)

⭐ getplumber

Purpose-built CI/CD security scanner

✓GitHub Actions

✓GitLab CI

✓Free / no account

✓Attack-path scoring

✗Runtime monitoring

✓Block CI (score gate)

zizmor

Rust-based GitHub Actions linter

✓GitHub Actions

✗GitLab CI

✓Free / no account

✗Attack-path scoring

✗Runtime monitoring

✗Block CI (score gate)

actionlint

Syntax checker for GitHub Actions

✓GitHub Actions

✗GitLab CI

✓Free / no account

✗Attack-path scoring

✗Runtime monitoring

✗Block CI (score gate)

Harden-Runner

Runtime monitoring for GitHub Actions

✓GitHub Actions

✗GitLab CI

◐Free / no account

✗Attack-path scoring

✓Runtime monitoring

✗Block CI (score gate)

Semgrep

SAST with GitHub Actions rule bundle

✓GitHub Actions

◐GitLab CI

◐Free / no account

✗Attack-path scoring

✗Runtime monitoring

✗Block CI (score gate)
