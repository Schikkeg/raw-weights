---
title: "Deep Generative Modeling | RawWeights"
description: "A comprehensive, interactive masterclass on Deep Generative Modeling. Explore Unsupervised Learning, Autoencoders, VAEs, GANs, and Cycle GANs with interactive architectures."
url: "https://rawweights.com/tools/deep_generative_modeling.html"
type: tool
date: 2026-06-15
---

# Deep Generative Modeling — Interactive Masterclass

> A slide-based interactive masterclass on deep generative models — 9 slides covering the full family from unsupervised learning foundations through Autoencoders, VAEs, GANs, CycleGANs, and an interactive sandbox.

## Overview

The Deep Generative Modeling playground presents generative models as a family tree with a common ancestor: the idea of learning a compressed latent representation (Plato's Cave) from which new data instances can be generated. Nine slides progress from the conceptual foundations through the four main generative model branches, their use cases, and a live interactive sandbox.

Interactive elements include architecture diagrams with clickable components, animated forward and backward passes, and a sandbox for experimenting with generation parameters.

## Key Topics / Sections

The 9 slides:

- **Slide 0: The Big Picture**: Generative Modeling vs. Discriminative Modeling; Unsupervised Learning as the foundation; the six core capabilities generative models unlock (data augmentation, anomaly detection, bias detection, data synthesis, distribution learning, generation).
- **Slide 1: The Branches of Generative Modeling**: Family tree of approaches — Autoencoders, VAEs, GANs, CycleGANs, Diffusion Models, and normalising flows — with the relationship between each.
- **Slide 2: Use Cases**: Concrete application mapping — anomaly detection, synthetic data generation, drug discovery, image-to-image translation, data augmentation for imbalanced datasets.
- **Slide 3: The Foundation — Autoencoders**: Encoder → latent bottleneck → decoder; the reconstruction objective; Plato's Cave as the metaphor for the latent variable.
- **Slide 4: Variational Autoencoders (VAEs)**: The reparameterisation trick — sampling from a distribution rather than a point; the ELBO loss (reconstruction + KL divergence); why continuity and completeness of the latent space enable generation.
- **Slide 5: GANs & CycleGANs**: GAN generator vs. discriminator adversarial dynamic; mode collapse and training instability; CycleGAN's cycle consistency loss for unpaired image-to-image translation.
- **Slide 6: Generative Modeling Sequence Flow**: End-to-end pipeline showing how data flows from input through encoding, latent sampling, decoding, and out to generated instances.
- **Slide 7: Evolution of Generative Modeling**: Historical timeline from early generative models through VAEs, GANs, and diffusion models — what each generation improved.
- **Slide 8: Interactive Sandbox**: Experiment with the generative model parameters — latent dimension, noise level, and generation mode (sample, interpolate, reconstruct). See the outputs update in real time.

## Related Pages

- [From Plato to Profile Pictures](https://rawweights.com/blog/variational_breakthrough.html) — Blog companion explaining VAE, GAN, and CycleGAN concepts
- [CNN Sandbox](https://rawweights.com/tools/cnn_sandbox.html) — The convolutional networks that power generative model encoders
- [ML Master Hub](https://rawweights.com/tools/master_ml_hub.html) — Neural network prerequisites
