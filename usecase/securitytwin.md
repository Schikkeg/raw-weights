---
title: "Security Twin - From IDOR to a CI Guard | RawWeights"
description: "A visual build story of Security Twin: reproduce an IDOR in an isolated app copy, detect it in request data, repair it, prove the boundary, and guard against regression."
url: "https://rawweights.com/usecase/securitytwin.html"
type: usecase
date: 2026-10-30
---

# Security Twin - From IDOR to a CI Guard

> A visual build story of Security Twin: reproduce an IDOR in an isolated app copy, detect it in request data, repair it, prove the boundary, and guard against regression.

## Sections

- One changing number. Someone else’s data.
- Follow one run through the product
- Architecture
- How it works: the full 13-stage run
- A fix should not break the rest of the app
- Components
- The wow moment was in the evidence
- Platform review

## Content

01 / A concrete example

## One changing number. Someone else’s data.

The sample Kit Store has a route for reading a kit: `GET /api/kits/:id`. It looks up the requested ID but does not check who owns that kit. Alice can change the number in the URL and receive Bob’s kit.

This walkthrough uses an insecure direct object reference (IDOR) as one concrete example: the app accepts a record number without checking that the signed-in user is allowed to see it. In a real service, this could expose or let someone change another person’s data. OWASP includes IDOR under [Broken Access Control (A01:2025)](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/). The broader flow is about finding a weakness, tracing it to code, fixing it, and checking the repair.

OverviewDeveloper viewNon-developer view

In a few words

One user changes a record number and sees another person’s data. Security Twin makes a safe copy, reproduces that mistake, adds an ownership check, then tests access as both users. The fix works only if it blocks the stranger and still lets the owner in.

Developer view

### The missing authorization check

The route reads an ID from `req.params.id` and calls `getKit(id)`. The vulnerable version returns the kit when it exists, without checking `kit.ownerId` against `currentUser(req)`. The patch adds that ownership check at the route. A cross-user request should return `404`; the owner’s request should still return `200`.

ClickHouse detects one source requesting many different kit IDs. Semgrep then checks the source for the unsafe lookup pattern.

Non-developer view

### A locker with no name check

Imagine a row of lockers. The app checked that a locker number was real, but not that it belonged to the person asking. Someone could change the number and open another person’s locker. Security Twin rehearses this safely, adds the missing name check, and tries again with both people to make sure the repair is right.

### What it does

-   ### Recreates the action
    
    An LLM-backed attacker sends requests through a shield proxy to the isolated copy of the app.
    
-   ### Looks for a pattern
    
    ClickHouse searches request records for a source accessing many different kit IDs.
    
-   ### Connects traffic to code
    
    The pipeline maps the finding to a source file and checks the unsafe pattern with Semgrep.
    
-   ### Chooses a bounded fix
    
    It checks how many callers a change would affect, then chooses a local guard or asks for review.
    
-   ### Proves both outcomes
    
    It confirms the other user is denied while the record owner keeps access.
    
-   ### Prevents a repeat
    
    A Semgrep rule can run in CI to catch the same unsafe pattern in a later change.
    

**Scope rule:** run attack traffic only against systems you own or are explicitly authorized to test. Security Twin is designed to clone into an isolated per-run workspace; it is not permission to probe a production service.

02 / The product

## Follow one run through the product

Choose a moment in the workflow to inspect. The screenshots stay at a readable width, so the page can explain what each screen proves without stacking a wall of images.

13

pipeline stages

29s

recorded end-to-end run

12,450

request rows queried

23ms

recorded detection query

Measurements come from recorded runs and can vary with environment and data volume.

The vulnerable appRun dashboard13-stage pipelineAttack evidenceDetectionRepair decisionVerified outcome

Target appDashboard13 stagesAttackDetectionRepairOutcome

The vulnerable app

![Kit Store sample application with the deliberately vulnerable IDOR route](../images/securitytwin/01-target-app-idor-bug.png)

**The test target.** Kit Store has user-owned records and a deliberately unsafe lookup, giving the run a concrete cross-account access bug to reproduce.

Run dashboard

![Security Twin dashboard with project and run controls](../images/securitytwin/02-dashboard-home.png)

**The operator view.** Start or replay a run here, then follow the stages and their output in one place.

13-stage pipeline

![Security Twin dashboard showing all thirteen stages](../images/securitytwin/03-pipeline-all-13-stages.png)

**One visible sequence.** The stages move from an isolated clone and baseline through attack, detection, patch, proof, and reporting.

Attack evidence

![LLM attacker stage attempting an IDOR request against the shielded twin](../images/securitytwin/04-attack-akashml-llama.png)

**Reproduce the boundary failure.** The attacker exercises the cloned app through the shield, which records the request and its run context.

Detection

![ClickHouse detection stage output for a captured Security Twin run](../images/securitytwin/06-clickhouse-118ms-detect.png)

**Turn traffic into a signal.** ClickHouse groups request events and flags one source touching many distinct kit IDs. This screenshot is a separate earlier run from the 23 ms summary above.

Repair decision

![Security Twin fix stage comparing the local authorization guard and shared function contract blast radius](../images/securitytwin/07-fix-blast-radius.png)

**Keep the fix bounded.** Before editing, the system inspects callers and weighs a local ownership guard against changing a shared function contract.

Verified outcome

![Security Twin dashboard showing all thirteen stages complete in twenty-nine seconds](../images/securitytwin/08-run-complete-29s.png)

**Prove both sides.** The run verifies that another user gets denied while the record owner still succeeds, then reports completion.

03 / System design

## Architecture

The orchestrator controls the run. Attack traffic goes through the shield to the twin, while telemetry flows to ClickHouse. Source analysis and patching use the isolated workspace; the dashboard receives events over server-sent events.

Security Twin system architectureBrowser dashboard starts and watches the orchestrator. The orchestrator directs attack traffic through the shield to a cloned target, queries ClickHouse telemetry, runs Semgrep in the isolated workspace, and persists memory to MongoDB. Optional connections include an LLM, GitHub, Guava, and ElevenLabs. OPERATOR BrowserStart run Â· view findingsFix choice Â· replay demo Dashboard Â· Next.jsHome Â· live run Â· memorySSE event streamUnlock check on live start HTTPS / UI RUN CONTROL + ANALYSIS Orchestrator Â· ExpressREST API Â· sequential 13-stage runnerIn-process event registry Â· decision gate Per-run workspaceClone Â· scan Â· map Â· patch Â· prove/tmp/runs/<run\_id> Attack + traffic stagesGenerate and send requests via shield start / decideSSE HTTP attack and test traffic TARGET + EVIDENCE Shield proxySessions Â· decoys Â· sinkRequest context + run ID Cloned target appKit Store Â· IDOR test route proxy ClickHouselogs + query MongoDBmemory + runs batched events query / persist OPTIONAL PROVIDERS: LLM Â· SEMGREP Â· GITHUB Â· GUAVA Â· ELEVENLABS

Solid request paths show the live run. Dashed data stores and provider integrations can be configured independently; demo replay does not require the backend.

04 / From request to regression guard

## How it works: the full 13-stage run

The pipeline runs stages in order and passes earlier results forward. Here is the chain behind the dashboardâ€™s thirteen cards.

Plain-language walkthroughDeveloper details

-   ### Make a safe copy
    
    The pipeline copies the app into a separate folder for this run and scans it for a starting point. Your original files stay untouched.
    
    1 clone2 scan
    
-   ### Try the IDOR and record the requests
    
    The AI attacker tries to read a kit owned by another user. A shield records the requests, and a traffic stage adds normal activity for comparison.
    
    3 attack4 traffic
    
-   ### Spot the pattern and find the code
    
    ClickHouse finds a source requesting many different kit IDs. The pipeline traces that activity to a file, then Semgrep checks for the unsafe lookup.
    
    5 detect6 map7 confirm
    
-   ### Save the finding and choose a repair
    
    The system saves what it learned and checks how many parts of the app use the lookup. It picks a small fix, or asks a developer to review a wider change.
    
    8 remember9 fix
    
-   ### Test as both users
    
    The same request is tried again. The other user should be denied, while the owner should still get the kit. In this run, the Semgrep score went from one finding to zero.
    
    10 prove
    
-   ### Keep the bug from coming back
    
    The rule can run in CI and block a future change that brings back the unsafe pattern. With optional services configured, the pipeline can also open a draft PR and send alerts.
    
    11 sync12 alert13 brief
    

-   ### Clone + scan
    
    `clone.ts` creates the per-run work copy at `ctx.work_dir`. `scan.ts` records the starting Semgrep result.
    
    clonescan
    
-   ### Attack + traffic
    
    The attacker can send requests only through the shield URL. `traffic.ts` adds run-tagged requests; shield middleware batches request context to ClickHouse.
    
    attacktraffic
    
-   ### Detect + confirm
    
    `detect.ts` queries distinct kit IDs per IP. `map.ts` finds the related source file, and `confirm.ts` checks it against the stored Semgrep rule.
    
    detectmapconfirm
    
-   ### Save context + assess the change
    
    `remember.ts` stores the finding. `fix.ts` checks callers before choosing between an in-handler owner check and a user-scoped function signature.
    
    rememberfix
    
-   ### Probe the patched work copy
    
    `prove.ts` calls the live patched twin to confirm cross-user `404` and owner `200`, then records the result.
    
    prove
    
-   ### Sync + notify
    
    `sync.ts` can create a branch and draft PR. When configured, `alert.ts` and `brief.ts` send a voice alert and audio summary.
    
    syncalertbrief
    

05 / The decision point

## A fix should not break the rest of the app

The simple patch is an ownership check in the route. A different option is to replace a general lookup with a function that always requires the current user. That can make authorization harder to forget, but it changes the function contract and affects every caller.

Choice

Change

When it fits

Trade-off

**In-handler guard**

Return not found if the kit is missing or belongs to someone else.

Default; does not change `getKit(id)` callers.

Every new route still needs to apply the owner check.

**User-scoped lookup**

Use `getKitForUser(id, userId)`.

When caller scope is clear and the signature change is safe.

All call sites must provide the user identity.

// Before: the ID selects a kit, with no owner check const kit = getKit(req.params.id); if (!kit) return res.status(404).json({ error: 'not found' }); // After: keep the function contract and enforce ownership here const kit = getKit(req.params.id); if (!kit || kit.ownerId !== currentUser(req)) { return res.status(404).json({ error: 'not found' }); }

![Dashboard fix stage showing the non-breaking ownership guard and blast-radius analysis](../images/securitytwin/07-fix-blast-radius.png)

The fix view shows the chosen patch alongside its blast-radius reasoning. If the risk is unclear, the orchestrator can pause for a human decision rather than silently broadening the change.

06 / Under the hood

## Components

These files separate run orchestration, request handling, detection, and memory so the full path can be inspected and changed one responsibility at a time.

File / folder

Role

What it does

`orchestrator/src/server.ts`

Control API

Starts runs, streams events, accepts fix decisions, exposes memory and audio endpoints.

`orchestrator/src/pipeline.ts`

Runner

Runs the stage list in order and buffers events in an in-process run registry.

`orchestrator/src/stages/`

Workflow

One module for each of the 13 steps, sharing run context and earlier stage results.

`shield/src/index.ts`, `ch-sink.ts`

Request boundary

Proxies traffic, tracks session/run context, serves decoys, and batches request events.

`attacker/src/agent.ts`

Attack agent

Constrains HTTP requests to the shield and runs the configured LLM tool loop.

`demo-app/src/index.ts`, `kits.ts`

Target twin

Express sample app and kit data, including the deliberately vulnerable route scenario.

`orchestrator/src/ch-requests.ts`, `ch-store.ts`

Detection store

Initializes ClickHouse schemas used for request logs and detection queries.

`orchestrator/src/memory.ts`

Security memory

Stores findings, embeddings, attacker confessions, and completed run history in MongoDB.

`dashboard/src/components/`, `dashboard/src/app/`

Operator UI

Renders pipeline progress, attack events, detection evidence, fix, and proof.

`rules/memory/`, `.github/workflows/twin-gate.yml`

CI regression gate

Runs the learned Semgrep rule as a pull-request check.

07 / The moments that made it real

## The wow moment was in the evidence

A useful security story needs more than a green status. Here is what the saved run records, which providers the project supports, and what Semgrep did (and did not) execute in that run.

The attack became concrete

### Alice asked for Bob’s kit. The app returned it.

AkashML · Llama 3.3 70BAttack · 2,106 msRecorded mode · DEMO

The saved trace shows Alice reading kit-3, owned by Bob, and kit-5, owned by Carol. That turned an authorization warning into visible evidence of another user’s data being returned.

The confirmed run table labels this attack stage DEMO. Treat it as recorded/replayed evidence, not a fresh live LLM call.

Provider choices

### Three model endpoints, one shield boundary

OpenAI · GPT-4oAkashML · Llama 3.3 70BNebius · Qwen3-30B

The attacker supports OpenAI by default, AkashML through `LLM_PROVIDER=akash`, and OpenAI-compatible endpoints such as Nebius. The host check still routes requests through the shield. The saved exploit trace above names AkashML; these are provider options, not a three-way benchmark.

The traffic became a signal

### ClickHouse found repeated kit access

ClickHouse · LIVE106 ms query37 hits · 12 IDs

In the same recorded run, the traffic stage sent 16,070 requests and ClickHouse logged 595. The detection query found 37 kit hits across 12 distinct IDs in 106 ms.

Run: `run-1791572905224`. These numbers describe that run only.

The source check followed the signal

### Semgrep can confirm the mapped code in the same run

Stage 7 · confirmSEC-00124 ms · DEMO result

Stage 6 maps the finding to a source file. When the Semgrep CLI is available, `confirm.ts` runs `semgrep --config rules/memory/idor.yaml --json --quiet <file>` and confirms the issue if the targeted rule matches.

The saved run reports “SEC-001 rule confirmed” in 24 ms but labels the stage DEMO; Semgrep was unavailable, so the fallback result was used. This record does not prove that the CLI ran live.

08 / What the tools brought

## Platform review

### What fit well

-   **Built by Akash MK:** the pipeline connects attack replay, telemetry, source checks, repair, and proof in one run.
-   **AkashML:** powers the LLM attacker with Llama 3.3 70B through an OpenAI-compatible API.
-   **ClickHouse:** event aggregation stayed in SQL and was fast on the recorded data set.
-   **Semgrep:** made source confirmation reusable as a CI rule, not just a one-time scan.
-   **MongoDB:** gave findings and run history a persistent home.
-   **Next.js + SSE:** made stage-by-stage progress legible once the streaming proxy was corrected.

### What needed care

-   Live mode needs several services, environment values, and reachable providers; demo replay is much easier to start.
-   Fallback modes can mask missing data unless their status is prominent.
-   Static patterns need tuning and tests to avoid missing variants or flagging safe code.
-   The demo proves one IDOR flow; it does not establish broad coverage of every vulnerability class.

Mode

What runs

Best for

**Dashboard replay**

Reads bundled recorded events; no backend required.

Trying the UI or showing the run flow.

**Live pipeline**

Clones a target and runs available stages and integrations.

Authorized experiments with configured services and keys.
