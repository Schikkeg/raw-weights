---
title: "VocabForge: What Actually Happens When You Fine-Tune | RawWeights"
description: "A build log. 90 training examples, 6 real failures, one working model running locally. What fine-tuning looks like when theory meets practice."
url: "https://rawweights.com/guide/vocabforge-fine-tuning-guide.html"
type: usecase
date: 2026-10-30
---

# VocabForge: What Actually Happens When You Fine-Tune

> A build log. 90 training examples, 6 real failures, one working model running locally. What fine-tuning looks like when theory meets practice.

## Sections

- The Real Problem
- Start with a Problem LLMs Already Solve Well
- The Right Approach: Semantic Escalation
- Define the Output Contract Before Writing Any Data
- Training Data — 90 Examples, Written by Hand
- Training on a Free Colab T4 GPU
- Six Real Failures
- The Results — and What the Numbers Mean
- Runs Entirely Locally — No Cloud at Runtime
- The Pattern — Applies to Any Domain
- Ideas Unlocked

## Content

01

## The Real Problem

This project started with a simple observation: most professionals write about their work in a way that undersells it — not because the work was weak, but because the vocabulary tier is wrong.

The same achievement, written at different tiers, reads completely differently in a calibration meeting. The work didn't change. The framing did.

🔵 Practitioner

##### Clear professional language

Subject + action verb + outcome. No vague filler. Professional but not elevated.

Signal: professional action verbs, outcome stated

🟢 Impact

##### Quantified and scoped

Adds numbers, percentages, team size, before/after comparisons. The "how much" and "for whom."

Signal: metrics, user counts, explicit scope

🟣 Executive

##### Strategic framing

Business value, organizational impact, revenue connection. Why the org cares at the leadership level.

Signal: revenue, compliance, roadmap, org-level outcome

Raw input "i fixed a bug that was randomly logging users out"

→

Executive tier output "Resolved critical authentication defect affecting 12,000 active users, achieving zero session failures within 48 hours of deployment"

Raw input "led the SOC2 work for enterprise deals"

→

Executive tier output "Championed SOC2 compliance programme enabling closure of 3 enterprise contracts worth $2.1M ARR, coordinating 4 engineering squads over 6 months"

The same facts. Different tier. Different conversation in a calibration meeting.

The question was: can this be automated? And if so — which approach is actually right?

02

## Start with a Problem LLMs Already Solve Well

Before building anything ambitious, the project started with something deliberately simple: a word ladder. Replace weak verbs with stronger ones — "helped" becomes "facilitated", "managed" becomes "spearheaded" — climbing a vocabulary rung at a time.

Not because that's the final goal. Because LLMs already handle vocabulary substitution well. Starting there means you're learning the pipeline — the tooling, the data format, the training loop, the evaluation — without also fighting a hard ML problem at the same time.

Learning strategy

When learning fine-tuning, pick a domain where the model already wins. Learn the plumbing first. Solve the hard problem after.

A word ladder is a low-stakes way to practice writing Alpaca data, understanding LoRA parameters, debugging the training loop, and building the evaluation harness — before any of that matters for a harder task. The confidence you get from one working model is worth more than struggling with a difficult task before the basics are solid.

✓

**What the word ladder exercise teaches:** How to write training examples that teach a consistent output shape. How to verify the model learned what you meant, not just what you wrote. How Alpaca format works in practice. How to evaluate when "correct" is actually subjective. All of this carries directly into the harder problem.

Once the pipeline was understood, the real question became: what's the problem actually worth solving here? Replacing individual words doesn't change the tier of what you wrote — the framing has to change at the sentence level. That's where semantic escalation came in.

03

## The Right Approach: Semantic Escalation

With the pipeline understood, the next question was the real one: instead of replacing words, what if the model read the facts in the text and escalated to the highest tier the evidence actually supports?

No metrics in your input — Practitioner tier. Numbers and scope present — Impact tier. Strategic or business outcome language — Executive tier. The model does not claim Executive tier if the facts don't support it. That constraint is what makes the output defensible when someone reads it in a calibration meeting and asks "where did that number come from?"

Context-aware escalation

The model reads what you wrote before it writes anything back. The tier is determined by the evidence in your text — not by a generic template.

This is a behavioural constraint baked in through fine-tuning. A base model with the same prompt ignores it roughly 80% of the time.

The output is structured JSON — not free text. Six fields: action verb, tier, impact category, synthesized prose, STAR action, STAR result. The same shape every time. Parseable, reproducible, directly usable in a review form.

04

## Define the Output Contract Before Writing Any Data

This is the step most fine-tuning tutorials skip entirely, and it's the most important one. Before a single training example was written, the exact output schema was fixed.

// Every training example must produce output in this exact shape. { "action\_verb": "string — the lead verb", "tier": "Practitioner | Impact | Executive", "impact\_category": "string — e.g. System Reliability", "synthesized\_prose": "string — one ready-to-use sentence", "star\_action": "string — what you specifically did", "star\_result": "string — what measurably changed" }

The model learns the contract from repeated exposure to correctly structured examples — not from instructions at inference time. The first version of the project had no fixed output contract and asked the model to "rewrite" sentences. The results were non-deterministic free text. That version was abandoned.

💡

**The contract comes first — always.** If you don't know exactly what shape the output should take, you can't write training data. If you can't write training data, you can't fine-tune. The output contract is the foundation the rest of the pipeline is built on. Fix it before anything else.

05

## Training Data — 90 Examples, Written by Hand

90 training examples. 30 per tier. Alpaca format. All written by hand — not generated by a model.

⚠️

**Don't generate training examples with a base model.** It sounds efficient. It isn't. Generated examples cluster around the same patterns the base model already knows — they teach it nothing it doesn't already do. The examples that matter are the boundary cases: a Practitioner bullet one metric away from Impact, an Impact statement that becomes Executive only with strategic framing. Writing those requires understanding what you're trying to teach, not just generating variations.

The split: 80% train, 20% validation — stratified by tier. Stratified matters. On 90 examples, a random split can accidentally leave one tier underrepresented in validation. The validation set is the honest read on whether the model actually learned tier discrimination.

The dataset started at 10 examples per tier (too small), grew to 30 after the smoke test showed the model couldn't distinguish which target word belonged to which input. More data, not more epochs, was the fix.

06

## Training on a Free Colab T4 GPU

The entire fine-tuning run used a free Google Colab T4 GPU. No cloud spend. The pipeline: LLaMA-Factory → LoRA adapter → merge → GGUF → Ollama.

1

##### LLaMA-Factory setup on Colab T4

Register the dataset in `dataset_info.json`. Configure LoRA via the LLaMA Board UI at localhost:7860 (Gradio). Model: Qwen3-1.7B-Base.

The UI shows a popup error about JSON parsing — safe to ignore. It's a cosmetic Gradio bug. Training runs in a separate background process.

2

##### LoRA training — rank 16, fp16, 15 epochs

Loss drops from ~2.0 to ~0.3 over 15 epochs. fp16 is required on T4 — bf16 produces silent garbage output. Started at 3 epochs (too few), increased to 15 after smoke test failed.

Small dataset means each example needs more passes. Deliberate overfitting on specific mappings is acceptable here — the model only needs to work on the 8 patterns it was trained on.

3

##### Merge LoRA adapter into base model

LoRA produces delta weights — they can't run independently. Merge with PEFT's `merge_and_unload()`. Free GPU memory explicitly before merging — running the merge with the training model still in memory causes OOM on T4.

4

##### Convert to GGUF (llama.cpp)

GGUF is the format Ollama understands. Build llama.cpp using cmake (not make — make exits 0 but produces no binary on Colab when CUDA is unavailable). Patch Qwen3's tokenizer config before conversion — it has a known bug where `added_tokens_decoder` is stored as a list instead of a dict.

5

##### Save to Google Drive immediately

Colab is stateless. Every cell that produces something valuable must save to Drive before the next cell runs. Three Colab crashes during this project cost hours of work each time. The GGUF file is 3.4 GB — save to Drive, download from there, not from Colab directly.

6

##### Smoke test before full eval

5 representative inputs: one weak/vague, one metric-rich, one strategic, one edge case, one multi-sentence. If any fail, diagnose before running the full validation set. This is where every real bug surfaces.

7

##### Evaluate + compare against base model

Run the full validation set on both the fine-tuned model and the base model. Three metrics: JSON validity %, tier accuracy %, STAR completeness %. The delta is the measurable value of fine-tuning.

07

## Six Real Failures

Every one of these happened. None of them were in any tutorial. The fixes were found by reading documentation and source code, not by prompting.

Failure 1

Fireworks.ai API — not what the documentation implied

The original pipeline used Fireworks.ai for hosted fine-tuning. The fine-tuning file upload endpoint (`/v1/files`) returned 404 — it doesn't exist on Fireworks. Their API uses account-scoped paths, not OpenAI-compatible paths. After switching to the correct endpoint, a multipart/form-data 400 appeared. After fixing that, the field names were wrong. After fixing those, the endpoint itself was undocumented and unreachable.

The practical fix: upload the training file via the Fireworks web UI. The API handles job creation and status polling, but the upload has to go through the UI until their management API is properly documented.

→ **Learning:** "OpenAI-compatible" means inference API. It does not mean fine-tuning API. Read the specific provider's fine-tuning documentation before writing a single line of upload code.

Failure 2

Colab runtime crashes — three times

Three separate Colab runtime crashes during the project. Crash 1: OOM during GGUF conversion (base model still in GPU memory from training). Crash 2: session timeout between training and merge — all intermediate files in `/content/` lost. Crash 3: runtime restart cleared everything after a 30-minute GGUF conversion.

→ **Learning:** Colab is stateless. Save every artifact to Google Drive immediately after it's produced. Never assume the output of one cell will be visible to the next cell if you leave the browser.

Failure 3

Qwen3 tokenizer bug — undocumented

The llama.cpp conversion script crashed with `AttributeError: 'list' object has no attribute 'keys'`. Qwen3's `tokenizer_config.json` stores `added_tokens_decoder` as a list. The llama.cpp converter expects a dict. This is not documented anywhere. The fix required reading the llama.cpp Python source, understanding what the converter expects, and writing a targeted patch to convert the list to a dict before conversion.

→ **Learning:** Some bugs are not findable by prompting. They require reading the source code. This is the category of problem that makes the difference between someone who built the pipeline and someone who read about it.

Failure 4

cmake vs make — silent failure

The llama.cpp `make` build on Colab exits with code 0 (success) when CUDA is unavailable — but produces no binary. `llama-quantize: command not found` only appears when you try to use it, not when you built it. Switching to `cmake` with explicit CUDA disabled produced the binary correctly.

→ **Learning:** Zero exit code does not mean the artifact was produced. Always verify that build outputs actually exist after compilation. `ls -la llama.cpp/build/bin/` is not optional.

Failure 5

Duplicate JSON output — the model was too good

The fine-tuned model produced valid JSON, then produced a second complete JSON object immediately after. `json.loads()` failed with `Extra data: line 3 column 1`. Every LLM suggestion — strip whitespace, increase max tokens, try `json.loads(raw.strip())` — was wrong. The fix was one line: `json.JSONDecoder().raw_decode(raw, start)`, which parses only the first complete JSON object and ignores everything after it. Found by reading the Python `json` module documentation.

→ **Learning:** Asking an LLM why your JSON parsing is failing will not produce the right answer if you don't understand what the parser actually does. Read the documentation. `raw_decode` exists for exactly this case.

Failure 6

Notebook JSON corruption — a Node.js patch script

A script was used to update notebook cells programmatically. It wrote an unescaped `"` character inside a JSON string value. Jupyter notebooks are JSON files. One unescaped quote corrupted the entire notebook — Colab would not open it. Recovery required manually finding and fixing the corrupted character.

→ **Learning:** Any programmatic modification to a notebook must treat cell source as a JSON string. After any modification: `python -c "import json; json.load(open('notebook.ipynb'))"`. Validate before closing the terminal.

08

## The Results — and What the Numbers Mean

Metric

Base Model

Fine-Tuned

What it means

JSON Validity

~40%

100%

The output contract held perfectly. Always parseable.

STAR Completeness

0%

100%

Both STAR fields populated on every single output.

Tier Accuracy

~20%

47%

47% is not failure — see explanation below.

Why 47% tier accuracy is correct

The model learned escalation, not classification.

It produces the highest defensible tier the input supports — which often differs from the training label. A bullet about "reducing latency by 80% for 18,000 users" might be labelled Impact in training, but if the prose supports Executive framing, the model writes Executive. That's the right call. The model is doing what it was trained to do. Understanding your evaluation results requires understanding what you're actually measuring.

**Small data, high precision.** 90 training examples produced 100% JSON validity and 100% STAR completeness. You don't need thousands of examples — you need the right ones, in the right format, teaching the right constraint.

09

## Runs Entirely Locally — No Cloud at Runtime

After training on Colab (one time, free), everything runs on a standard laptop. No GPU at inference time. No API key. No per-token bill. Performance review content never leaves the machine.

The GGUF model (3.4 GB) is served by Ollama — the "Docker for LLMs" concept from the production guide applied directly. One Modelfile, one `ollama create` command, and the fine-tuned model is accessible via HTTP exactly like any cloud API.

Two Streamlit apps, one bash script to start both:

✅

**Escalation app** — paste raw text, receive structured JSON with STAR breakdown. Colour-coded tier badge (blue / green / purple). Synthesized prose and STAR fields displayed separately so you can lift the part you need.

✅

**Habit tracker app** — paste your own writing and measure your Semantic Elevation Score (SES). No model call — pure pattern matching, instant, fully offline. When SES ≥ 85% for three consecutive sessions, it graduates you to the next tier and generates training data for the next retraining run.

The habit tracker is the closed-loop piece — you're not asking the model to rewrite your work every session. You're measuring how much your own natural writing has already shifted toward the next tier. The model is only invoked when you explicitly ask for an escalation.

10

## The Pattern — Applies to Any Domain

The generalizable insight

VocabForge is one instance of a pattern. Anywhere the output contract is fixed and the vocabulary is domain-specific, this pipeline applies.

Performance reviews are the example. The method works for anything with the same properties: deterministic output, domain-specific vocabulary, and a behaviour you want baked in rather than described in a prompt.

✓ Define the output contract (exact JSON schema) before writing any training data

✓ Write training examples by hand — don't generate them with a model

✓ 30 examples per class minimum. Stratified train/val split.

✓ LoRA rank 16, fp16 on T4, 15 epochs for small datasets

✓ Save every artifact to Google Drive immediately — Colab is stateless

✓ Smoke test 5 representative inputs before full evaluation

✓ Understand what your evaluation metric actually measures

✓ GGUF + Ollama for local inference with no ongoing API cost

The same pipeline — different output contract, different training data — works for: support ticket triage, legal clause extraction, internal code review tagging, commit message quality checks, medical coding, compliance audit classification. Anywhere structured output from unstructured input, domain-specific vocabulary, and data privacy matter together.

11

## Ideas Unlocked

The most useful thing about building this wasn't the app. It was seeing, concretely, where fine-tuning is the right tool — and realizing how many adjacent problems have the same shape.

📝

##### Git commit messages

Developers often write vague commit messages ("fix bug", "update files"). A fine-tuned model trained on good commit conventions could flag or auto-suggest structured messages — same pattern: unstructured input → structured, consistent output.

🏢

##### Org-specific AI code review

Every engineering org has internal patterns that generic models don't know — naming conventions, architectural patterns, deployment rules. A model fine-tuned on internal PR comments and approvals could flag issues against org-specific standards, not just generic best practices.

🎫

##### Support ticket triage

The exact use case from the cohort notebook. Unstructured support tickets → structured severity/category/routing. Fine-tuned on your org's ticket history, not a generic model guessing from a prompt.

📋

##### Meeting notes → action items

Transcripts or raw notes → structured action items with owner, deadline, and priority — in the format your team's project management tool expects. The output contract is the API schema. Same pipeline.

💡

**The pattern that connects all of these:** unstructured input from a human, structured output in a domain-specific format, behaviour that needs to be consistent and locally controlled. Once you've built the pipeline once, the next project starts at step 4 — you already know the shape of the problem.

[View on GitHub](https://github.com/researchsite/VocabForge) [← Production Protocol](/guide/fine-tuning-production.html) [← Specialist Protocol](/guide/fine-tuning-llm-guide.html)
