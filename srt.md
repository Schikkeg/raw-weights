---
title: "RawWeights | Engineering the Probabilistic Web"
description: "A Principal Architect's log on integrating AI into modern web systems. Dissecting fundamentals, evaluating tools, and architecting the future."
url: "https://rawweights.com/srt.html"
type: page
date: 2026-06-15
---

# Simple Regression Trainer — Start Here

> An interactive simple linear regression trainer — the entry point to the RawWeights learning path. Understand gradient descent by training a model to predict revenue from ad spend.

## Overview

The Simple Regression Trainer (SRT) is Step 1 on the RawWeights learning path. Before attention mechanisms, before transformers, before LLMs — there is y = mx + b. This interactive tool trains a linear regression model in the browser, letting you see gradient descent update the slope and intercept in real time as the model learns to fit the data.

This is the foundational intuition that all subsequent ML concepts build on: the model makes a prediction, measures its error, and adjusts its weights to reduce that error. Everything that follows is a more complex version of this same loop.

## Key Topics / Sections

- **Interactive Regression Canvas**: A scatter plot of data points (Ad Spend vs. Revenue) with a live-updating regression line. Drag points, add points, and watch the model refit in real time.
- **Prediction Interface**: Enter an ad spend value and read the model's revenue prediction from the current fitted line.
- **How the Machine Learns — The Concepts**: Four educational cards explaining the core ML loop:
  - *The Hypothesis*: y = mx + b — the slope (weight) and intercept (bias)
  - *The Cost Function (Loss)*: Mean squared error — how the model measures how wrong it is
  - *Gradient Descent*: The weight update step — moving m and b in the direction that reduces loss
  - *Convergence*: When the loss stops decreasing — the model has found its best fit for the data
- **Hyperparameter Controls**: Adjust learning rate and number of training steps; observe how these affect convergence speed and final fit quality.

## Related Pages

- [ML Master Hub](https://rawweights.com/tools/master_ml_hub.html) — Level 2: deeper neural network playgrounds
- [How It Started](https://rawweights.com/how-it-started.html) — The Transformer playground that the learning path leads toward
- [Full LLM Lifecycle](https://rawweights.com/guide/full-lifecycle.html) — Where this simple training loop leads at scale
