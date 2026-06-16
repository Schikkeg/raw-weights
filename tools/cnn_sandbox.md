---
title: "How The Machine Sees | CNN Sandbox | RawWeights"
description: "Master Convolutional Neural Networks (CNNs) with this interactive visual sandbox. Explore the exact math behind filters, ReLU, max pooling, and backpropagation."
url: "https://rawweights.com/tools/cnn_sandbox.html"
type: tool
date: 2026-06-15
---

# CNN Sandbox — How the Machine Sees

> An interactive visual sandbox for understanding Convolutional Neural Networks from the ground up — explore convolution filters, ReLU, max pooling, and backpropagation with pixel-level visualisations.

## Overview

The CNN Sandbox makes the mathematics of computer vision concrete through pixel-level interactive visualisation. Select a source photograph, then walk through each stage of the convolutional pipeline — convolution, ReLU activation, max pooling, and backpropagation — seeing exactly what happens to the pixel values at each step.

Inputs include the source photograph selection, filter choice (edge, horizontal, vertical, custom), and the backpropagation target filter. Outputs include live feature maps, pooled maps, and gradient visualisations.

## Key Topics / Sections

The 8 sections of the CNN Sandbox:

- **Global Sandbox Setup**: Choose the source photograph — the input image that flows through every subsequent stage of the pipeline.
- **1. The Convolutional Pipeline**: Network architecture diagram showing how input → convolution → ReLU → pooling → fully connected → output is wired together.
- **2. The Paper Shredder**: Intuitive metaphor for convolution — the filter slides over the image and produces a "shredded" representation that highlights specific features.
- **3. Convolution: Feature Extraction**: The core operation — a 3×3 filter slides over an 8×8 input image, computing element-wise products and sums at each position to produce a 6×6 feature map. Live pixel value visualisation at every position.
- **4. Nonlinearity (ReLU)**: Before and after comparison showing how ReLU zeroes negative pixel values in the feature map — removing noise while preserving positive activations.
- **5. Max Pooling (Downsampling)**: 6×6 feature map down to 3×3 — each 2×2 region reduced to its maximum value, preserving the strongest activations while halving spatial dimensions.
- **6. Backpropagation (Learning)**: Side-by-side comparison of a random filter, its current feature map, the target filter, and the perfect feature map. Animated gradient updates showing the filter converging toward the target.
- **7. Final Output Paradigms**: Four output heads demonstrated:
  - *Classification*: Softmax probability vector
  - *Detection*: R-CNN bounding boxes
  - *Segmentation*: Pixel-perfect multi-class masks
  - *Regression*: Continuous control (e.g. steering angle)
- **8. FAQ & Insights**: Common questions about filter sizes, stride, padding, and depth.

## Related Pages

- [Grayscale Logic](https://rawweights.com/blog/grayscale_logic.html) — Computer vision as business intelligence; Tesla vs. Waymo pure vision debate
- [ML Master Hub](https://rawweights.com/tools/master_ml_hub.html) — Neural network fundamentals prerequisite
- [Deep Generative Modeling](https://rawweights.com/tools/deep_generative_modeling.html) — How CNNs are used inside generative models
