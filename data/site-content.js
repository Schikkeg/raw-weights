/**
 * RawWeights — Centralized site content
 * Single source of truth for articles used by blog.html and index.html.
 *
 * Fields:
 *   title    — article headline
 *   excerpt  — short description (~1–2 sentences)
 *   date     — display date string
 *   image    — path or URL to hero image
 *   type     — "Guide" | "Blog" | "LinkedIn Article" | "Web Performance"
 *   link     — canonical URL for the article
 *   linkedin — LinkedIn post URL (null if none); used for the LinkedIn carousel
 */
(function () {
  'use strict';
  window.SITE_CONTENT = {
    articles: [
      {
        title: "Rubik Navigator — Build Guide",
        excerpt: "How I built a Rubik's Cube coach on Replit that teaches your way — formula or free exploration. Framework, packages, architecture, and the loop bug that took five iterations to fix.",
        date: "Aug 12, 2026",
        image: "./images/cube.png",
        type: "Usecase",
        link: "https://rawweights.com/usecase/rubik-navigator-guide.html",
        linkedin: null
      },
      {
        title: "PanchangChef: Calendar-Aware Indian Recipe AI on Snowflake",
        excerpt: "How I built an AI chef that reads the Hindu ritual calendar, enforces Sattvic fasting rules, and matches your pantry to 305 Indian recipes — inside Snowflake Cortex.",
        date: "July 31, 2026",
        image: "./images/panchangchef-og.jpg.png",
        type: "Usecase",
        link: "https://rawweights.com/usecase/panchangchef-guide.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_buildinpublic-snowflake-cortexai-share-7488974821155078144-0DN_/"
      },
      {
        title: "AgentIntel: I Built a Multi-Agent Swarm to Diagnose AI Visibility",
        excerpt: "How I built a 7-agent swarm at a hackathon that scrapes websites, benchmarks competitors, and generates AEO/GEO recommendations — with Band, Guild, and Actian wired in.",
        date: "July 24, 2026",
        image: "./images/agentintel-og.jpeg",
        type: "Usecase",
        link: "https://rawweights.com/usecase/agentintel-guide.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_agentintel-aeo-geo-activity-7486646388059951104-Qn6E"
      },
      {
        title: "CareerWiki: I Built a Local AI That Knows My Entire Career",
        excerpt: "How I built a local-first AI career knowledge base that ingests 25 years of documents and generates tailored resumes in minutes — with zero cloud data.",
        date: "July 23, 2026",
        image: "./images/careerwiki-og.png",
        type: "Usecase",
        link: "https://rawweights.com/usecase/careerwiki-guide.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_localai-ollama-buildinpublic-share-7485988520810131456-a8Mh/"
      },
      {
        title: "The Compiler | LLM Wiki ",
        excerpt: "Karpathy's LLM Wiki explained as a compiler: raw sources go in, compiled wiki pages come out. Understand ingest, query, lint — and when pre-compiled knowledge beats RAG.",
        date: "July 16, 2026",
        image: "./images/wiki.png",
        type: "Guide",
        link: "https://rawweights.com/guide/llm-wiki-compiler.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_karpathyllmwiki-aiarchitecture-knowledgemanagement-share-7483423035459534848-AciU/"
      },
      {
        title: "ShadowShield AI — Chrome Extension Experiment  ",
        excerpt: "A Chrome extension that replaces your real personal data with safe stand-ins before AI chatbots see it, then swaps real values back in the response.",
        date: "July 12, 2026",
        image: "./images/shadowshield.png",
        type: "Usecase",
        link: "https://rawweights.com/usecase/shadowshield-ai.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_googlechrome-share-7482282008845680640-B-0z/"
      },
      {
        title: "The Blueprint — Threat Modeling AI Systems Before You Build ",
        excerpt: "How security engineers think before a single line of code is written. STRIDE, trust boundaries, and a hands-on AI threat model using a healthcare AI assistant — from GenAcademy with Harsh (Cloudflare).",
        date: "July 05, 2026",
        image: "./images/stride.png",
        type: "Guide",
        link: "https://rawweights.com/guide/ai-security-threat-model.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-aisecurity-threatmodeling-share-7479716178052096001-m1nP/"
      },
      {
        title: "The Red Team Brief — AI Threat Playbook for Agentic Systems ",
        excerpt: "The Stack Autopsy showed you why conventional security approaches miss the agentic threat model. This is the attacker's full playbook — OWASP LLM Top 10, the Triple Threat risk model, and hands-on walkthroughs of PromptFoo, NeMo Guardrails, and Microsoft Presidio.",
        date: "July 04, 2026",
        image: "./images/playbook.png",
        type: "Guide",
        link: "https://rawweights.com/guide/ai-security-redteam-brief.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-aisecurity-llmsecurity-share-7479313067663650816-8l9z/"
      },
      {
        title: "VocabForge: What Actually Happens When You Fine-Tune",
        excerpt: "A build log. 90 training examples, 6 real failures, one working model running locally. What fine-tuning looks like when theory meets practice.",
        date: "July 02, 2026",
        image: "./images/vocabforge.png",
        type: "Guide",
        link: "https://rawweights.com/usecase/vocabforge-fine-tuning-guide.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_fine-tuned-modellocal-inferencehabit-tracking-ugcPost-7478393217281847296-NZD_/"
      },
      {
        title: "Fine-Tuning Part 2: The Production Protocol ",
        excerpt: "What happens after you train? LoRA deployment paths, RL alignment methods, synthetic data, GPU cost tiers, distillation, and Ollama — the full production playbook.",
        date: "June 28, 2026",
        image: "./images/proddeploy.png",
        type: "Guide",
        link: "https://rawweights.com/guide/fine-tuning-production.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_machinelearning-ai-llm-activity-7477249460524277760-v21e"
      },
      {
        title: "Fine-Tuning LLMs: The Specialist Protocol",
        excerpt: "When should you fine-tune an LLM — and when is it overkill? A visual guide covering knowledge gaps, behavioral gaps, RAG vs fine-tuning, RAFT, SFT, and preference optimization.",
        date: "June 27, 2026",
        image: "./images/spectrum.png",
        type: "Guide",
        link: "https://rawweights.com/guide/fine-tuning-llm-guide.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_ai-llms-machinelearning-activity-7476879607988670466-Bm_B"
      },
      {
        title: "SentTriage — Behavioral Email Classifier",
        excerpt: "Most email filters ask what an email is about. SentTriage asks what it requires from you. A builder's log: 6 buckets, 8 behavioral signals, 5 prompt iterations, and what the eval loop actually taught me.",
        date: "June 25, 2026",
        image: "./images/senttriage.png",
        type: "Guide",
        link: "https://rawweights.com/usecase/sent-triage.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_svaihub-aicamp-buildinpublic-activity-7476162673206906880-dxIu"
      },
      {
        title: "The Iteration Machine ",
        excerpt: "Six AI practitioners share what it actually takes to build agents that improve: the observation loop, calibrated evals, simulation, model-independent harnesses, and efficient training.",
        date: "June 23, 2026",
        image: "./images/iteration.png",
        type: "Guide",
        link: "https://rawweights.com/usecase/iteration-machine.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_nubank-svai-aicamp-share-7475445541116694528-NikD/"
      },
      {
        title: "The Proving Ground ",
        excerpt: "Why benchmarks lie, what modern AI eval actually looks like, and how to build the measurement layer your system deserves — RAGAS, G-Eval, cascade math, coverage matrices, and the Iron Triangle.",
        date: "June 22, 2026",
        image: "./images/proving.png",
        type: "Guide",
        link: "https://rawweights.com/tools/eval-proving-ground.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_we-buy-cars-knowing-theyve-been-crash-tested-activity-7475055975343775744-7rIU"
      },
      {
        title: "The Signal Memory Problem  ",
        excerpt: "Why B2B AI agents forget everything between sessions — and how Mem0 fixes deduplication, contradiction management, and graph retrieval without you rebuilding it from scratch.",
        date: "June 21, 2026",
        image: "./images/memo.png",
        type: "Guide",
        link: "https://rawweights.com/usecase/mem0-b2b-signal-memory.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-mem0-b2bai-activity-7474427956254277632-Oths"
      },
      {
        title: "The Production Checklist: From Demo to Live ",
        excerpt: "Four pillars, one real case study (Eikos Health), and an interactive checklist for shipping AI applications to production — no hand-waving.",
        date: "June 19, 2026",
        image: "./images/checklist.png",
        type: "Guide",
        link: "https://rawweights.com/usecase/production-readiness-checklist.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-ai-machinelearning-activity-7473796842556923904-z923"
      },
      {
        title: "The Builder's Map: Practical Decisions for Voice AI with ElevenLabs ",
        excerpt: "Five decisions that shape every voice agent deployment — from which build path to choose, through the real enterprise questions nobody covers in a demo.",
        date: "June 18, 2026",
        image: "./images/elevenlabs.png",
        type: "Guide",
        link: "https://rawweights.com/guide/elevenlabs-builders-map.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-voiceai-elevenlabs-activity-7473451233601830912-8BDR/"
      },
      {
        title: "Agentic Scheduling Without Calendar Access — ContextCal",
        excerpt: "How ContextCal replaces 3 hours of email back-and-forth with a link — parsing multilingual availability, normalizing timezones, and computing meeting overlap without ever touching a calendar API.",
        date: "June 17, 2026",
        image: "./images/contextcal.png",
        type: "Guide",
        link: "https://rawweights.com/guide/contextCal.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-langgraph-nebiusai-activity-7473182479202308096-TvSx"
      },
      {
        title: "AG2 Beta — Session Quick Reference",
        excerpt: "10 concepts from the AG2 Beta hands-on workshop with Vasily Radostev. Click the session map to explore each concept, then try them live on the playground.",
        date: "June 16, 2026",
        image: "./images/ag2.png",
        type: "Guide",
        link: "https://rawweights.com/guide/ag2-quickref.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_ag2-aiagents-genai-activity-7472826958184218624-1coU"
      },
      {
        title: "MCP: The Practitioner's Playbook",
        excerpt: "Part 2 of MCP on RawWeights — authentication patterns, transport layer, the full 4-capability map including Sampling, security threats, and a decision gate for when MCP makes sense.",
        date: "June 14, 2026",
        image: "./images/mcp_practise.png",
        type: "Guide",
        link: "https://rawweights.com/guide/mcp-practitioner-playbook.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_mcp-the-practitioners-playbook-rawweights-activity-7472168088621207552-HVPX"
      },
      {
        title: "Blueprint: How an Agent Rebuilds a Website From the Ground Up",
        excerpt: "You handed an AI a prompt and got a redesigned website. Here's what actually happened inside the agent — and how to build one that does it reliably.",
        date: "June 13, 2026",
        image: "./images/sitetransform.png",
        type: "Guide",
        link: "https://rawweights.com/guide/agent-blueprint-site-transform.html",
        linkedin: null
      },
      {
        title: "The AI Security Stack Autopsy",
        excerpt: "CSPM, pen tests, IAM, SOC — five tools already running on your site, five reasons none of them can see what an AI content agent does.",
        date: "June 13, 2026",
        image: "./images/autospy.png",
        type: "Guide",
        link: "https://rawweights.com/guide/ai-security-stack-autopsy.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_agenticai-aisecurity-devsecops-activity-7464004601097392128--Crr/"
      },
      {
        title: "The Agent Autonomy Dial",
        excerpt: "Five levels of AI autonomy, two axes of control — an interactive framework for deciding how much should an AI agent decide vs. when humans stay in the loop.",
        date: "June 13, 2026",
        image: "./images/dial.png",
        type: "Guide",
        link: "https://rawweights.com/guide/agent-autonomy-dial.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-activity-7471818327863242752-mBvj/"
      },
      {
        title: "Document Intelligence — The Complete LlamaIndex Stack",
        excerpt: "Parser selection, citation trust, and production readiness — the three layers of document intelligence that most RAG tutorials skip.",
        date: "June 12, 2026",
        image: "./images/llama.png",
        type: "Guide",
        link: "https://www.rawweights.com/guide/llamaindex-document-intelligence.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-llamaindex-documentai-activity-7471099532622274561-PxpJ/"
      },
      {
        title: "The Invisible Recall — Building a Passive Food Safety Watchdog",
        excerpt: "How we built a GraphRAG food safety system that silently monitors 29,000+ FDA and USDA recalls and alerts households before they know to ask.",
        date: "June 10, 2026",
        image: "./images/passive.png",
        type: "Guide",
        link: "https://www.rawweights.com/guide/passive-safety-watchdog.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_passive-watch-dog-activity-7470730452576874497-srAo/"
      },
      {
        title: "The Retrieval Playbook — 6 RAG Search Strategies",
        excerpt: "Six query types. Six retrieval strategies. Know which play to call — explained simply with real healthcare examples.",
        date: "June 09, 2026",
        image: "./images/pinecone_slide.png",
        type: "Guide",
        link: "https://rawweights.com/guide/pinecone-retrieval-playbook.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_pinecone-pinecone-rag-activity-7470335349223755777-xQ9k/"
      },
      {
        title: "RAG Architect's Studio — Context Budget & Pattern Matcher",
        excerpt: "Two interactive tools: allocate your context window like a budget, then match your use case to the right RAG pattern.",
        date: "June 07, 2026",
        image: "./images/ragad_slide.png",
        type: "Guide",
        link: "https://rawweights.com/guide/rag-architects-studio.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_in-college-we-all-knew-someone-whod-fill-activity-7469646186610630656-kOU6/"
      },
      {
        title: "RAG Pipeline Toolkit — Design, Tune & Debug",
        excerpt: "Interactive RAG pipeline toolkit — chunk size, top-K, embedding model picker, retrieval strategy, 12 debug signals, and a 20-point pre-launch checklist.",
        date: "June 06, 2026",
        image: "./images/rag_slide.png",
        type: "Guide",
        link: "https://rawweights.com/guide/rag-pipeline-toolkit.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-rag-activity-7469272786025222147-3wK-/"
      },
      {
        title: "Beyond Classical RL: How LLMs Are Actually Trained",
        excerpt: "What classical RL doesn't cover when training frontier LLMs — RLVR, reward hacking, multi-environment training, GRPO, and RLHF explained with interactive sandboxes.",
        date: "June 05, 2026",
        image: "./images/nvidia_slide.png",
        type: "Blog",
        link: "https://rawweights.com/blog/nvidia-llm-post-training.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_machinelearning-datascience-deeplearning-activity-7431542124044779521-Aow7/"
      },
      {
        title: "What Voice AI Gets Right — Insights from Building at Scale",
        excerpt: "11 insights that shift how you think about product metrics, latency, data flywheels, and building with AI — drawn from the engineering reality of a 1M-user voice AI product.",
        date: "June 04, 2026",
        image: "./images/voice_slide.png",
        type: "Blog",
        link: "https://rawweights.com/blog/voice-ai-insights.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_genacademy-wisprflow-activity-7468536597190393856-EqHn/"
      },
      {
        title: "ThreatScope Analytics — Building in Public: Week 1",
        excerpt: "ThreatScope Analytics — free IP threat intelligence for agencies and startups who can't afford enterprise security tools yet.",
        date: "June 02, 2026",
        image: "./images/intro_slide.png",
        type: "Blog",
        link: "https://rawweights.com/blog/threatscope.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_agenticai-aisecurity-devsecops-activity-7464004601097392128--Crr/"
      },
      {
        title: "The Digital Colleague: Professional Automation with Coding Agents",
        excerpt: "Explore the evolution of AI agents from simple autocomplete tools to independent digital colleagues capable of 100-hour autonomous projects.",
        date: "June 01, 2026",
        image: "./images/codex.png",
        type: "Blog",
        link: "https://rawweights.com/blog/digital-colleague-masterclass.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_the-digital-colleague-professional-automation-activity-7467385964458487808-68aY/"
      },
      {
        title: "Architecting Autonomy: A Strategic Framework for Agentic AI",
        excerpt: "A deep dive into the evolution of automation, the levels of AI autonomy, and the frameworks required to build resilient autonomous systems.",
        date: "May 31, 2026",
        image: "./images/agenticstrategy.png",
        type: "Blog",
        link: "https://rawweights.com/blog/agentic-architecture-strategy.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_aiarchitecture-agenticautomation-aiautonomy-activity-7466985010642972672-lKeo/"
      },
      {
        title: "Agentic AI: Best Practices & Architecture",
        excerpt: "A guide to the Agentic AI ecosystem, featuring tech stack breakdowns, model selection frameworks, and prompting best practices.",
        date: "May 30, 2026",
        image: "./images/agentic.png",
        type: "Blog",
        link: "https://rawweights.com/blog/ai-stack-practices.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_zoom-linkedin-nanobanano-activity-7442003615625609217-_02X/"
      },
      {
        title: "The Liquid Software Supply Chain",
        excerpt: "An interactive architectural guide to the JFrog Platform. Explore how Artifactory, Xray, AI Catalog, and Connect secure your software supply chain.",
        date: "May 19, 2026",
        image: "./images/jfrog.png",
        type: "Guide",
        link: "https://rawweights.com/guide/jfrog.html",
        linkedin: null
      },
      {
        title: "The Agentic Web Architecture",
        excerpt: "Explore our interactive guide to the Model Context Protocol (MCP). Learn how to solve the N x M integration problem and build self-evolving AI agents.",
        date: "May 16, 2026",
        image: "./images/mcp.png",
        type: "Guide",
        link: "https://rawweights.com/guide/mcp.html",
        linkedin: null
      },
      {
        title: "BioLogic: AI-Powered OSINT Dashboard - Hackathon Pitch",
        excerpt: "An under-the-hood look at BioLogic, a real-time OSINT health intelligence dashboard integrating React, Node, Java MCP tools, and Gemini AI.",
        date: "May 9, 2026",
        image: "./images/biologic.jpg",
        type: "Blog",
        link: "https://rawweights.com/blog/biologic-osint.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_agenticaibootcamp-builtinpublic-playwright-activity-7467866006120484864-uZ6m/"
      },
      {
        title: "SF Bay Area AI Meetup: Hybrid Search Debates & Meeting the Cohort",
        excerpt: "A down-to-earth recap of the Pinecone & The Gen Academy AI Meetup in SF — hybrid search debates, meeting the Mastering Agentic AI cohort, and MCP server updates.",
        date: "May 6, 2026",
        image: "./images/aish.png",
        type: "Blog",
        link: "https://rawweights.com/blog/ai_meetup_sfmay6_takeaways.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_agenticai-physicalai-robotics-activity-7465324745673162752-Y9-9/"
      },
      {
        title: "The Reality of Agentic Engineering: Insights from AI Dev 26",
        excerpt: "What happens when you put 25,000 tools in the hands of AI agents? Dive into my AI Dev 26 conference recap for hands-on insights and the hard questions about multi-agent sandboxing.",
        date: "Apr 29, 2026",
        image: "./images/Sham_Andrew.png",
        type: "Blog",
        link: "https://rawweights.com/blog/ai_dev_2026_takeaways.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_aidev26-softwareengineering-ai-activity-7455517710118985730-yu73/"
      },
      {
        title: "From Auto-Complete to Custom Assistant: A Visual Guide to LLM Post-Training",
        excerpt: "Discover how to move beyond basic RAG with our new interactive, visual guide to LLM post-training. Step-by-step infographics on data preparation, DPO training, model merging, and test-time compute.",
        date: "Apr 13, 2026",
        image: "./images/ptl.jpg",
        type: "Blog",
        link: "https://rawweights.com/blog/from-auto-complete-to-custom-assistant.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_buildinpublic-agenticai-promptengineering-activity-7466688513908953089-6Yu6/"
      },
      {
        title: "The Architect's Illusion: Why AI is Transforming Jobs, Not Erasing Them",
        excerpt: "A visual exploration of the shift from deterministic programming to probabilistic AI. Discover why the limitations of the Universal Approximation Theorem are creating new opportunities.",
        date: "Apr 06, 2026",
        image: "./images/uat.jpg",
        type: "Blog",
        link: "https://rawweights.com/blog/uat.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_supplychain-mlops-devsecops-activity-7462407948896522240-XrCI/"
      },
      {
        title: "Guide to RAG (Retrieval-Augmented Generation)",
        excerpt: "Learn the architecture, chunking strategies, limitations, and evaluation metrics for AI models. Tailored for Developers, PMs, and Beginners.",
        date: "Apr 04, 2026",
        image: "./images/rag.jpg",
        type: "Guide",
        link: "https://rawweights.com/guide/rag.html",
        linkedin: null
      },
      {
        title: "From Asset Selectors to Liquid Synthesis: The Bicycle Math of Reinforcement Learning",
        excerpt: "Explore an interactive Deep Reinforcement Learning playground that teaches the math behind AI. Discover how continuous policy gradients could transform the web.",
        date: "Mar 29, 2026",
        image: "./images/rel.jpg",
        type: "Blog",
        link: "https://rawweights.com/blog/learning-bicycle-math-driving-ai-evolution.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_in-college-we-all-knew-someone-whod-fill-activity-7469646186610630656-kOU6/"
      },
      {
        title: "From Plato to Profile Pictures: Unpacking Deep Generative Models",
        excerpt: "A comprehensive, interactive masterclass on Deep Generative Modeling. Explore Unsupervised Learning, Autoencoders, VAEs, GANs, and Cycle GANs.",
        date: "Mar 23, 2026",
        image: "./images/dgm.jpg",
        type: "Blog",
        link: "https://rawweights.com/blog/variational_breakthrough.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_ai-machinelearning-deeplearning-activity-7428441739536805888-H8iw/"
      },
      {
        title: "Why Computer Vision is the New Business Intelligence",
        excerpt: "How do machines actually see? Explore the Tesla vs. Waymo pure vision debate and learn how B2B companies use CNNs to unlock powerful new business metrics.",
        date: "Mar 15, 2026",
        image: "./images/cnnarchi.jpeg",
        type: "Blog",
        link: "https://rawweights.com/blog/grayscale_logic.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_computervision-deeplearning-machinelearning-activity-7439061201247965184-JPDF/"
      },
      {
        title: "Teaching a Java App to Hear the Heartbeat of the Server",
        excerpt: "Your own data is the best teacher. Discover why building a local neural network from scratch gives you the visibility needed to navigate the AI era.",
        date: "Mar 08, 2026",
        image: "./images/java_ai_exp.png",
        type: "Blog",
        link: "https://rawweights.com/blog/teaching-a-java-app-to-hear-the-heartbeat-of-the-server.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_artificialintelligence-softwareengineering-activity-7457708599331545088-XTLF/"
      },
      {
        title: "Visualizing AI: An Interactive Journey from RNNs to Transformers",
        excerpt: "Explore the evolution of sequence models — from RNNs to Transformers — with 13 hands-on interactive visualizers.",
        date: "Mar 01, 2026",
        image: "./images/transformer.png",
        type: "Blog",
        link: "https://rawweights.com/blog/visualizing-ai-rnns-to-transformers.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_rnns-transformers-engineering-activity-7436331624633548800-91Vg/"
      },
      {
        title: "Achieving Domain-Wide Core Web Vitals Consistency",
        excerpt: "Optimizing a single page for performance is tactical. Sustaining domain-wide Google Core Web Vitals passing across Mobile and Desktop is operational.",
        date: "Feb 24, 2026",
        image: "./images/vital.jpg",
        type: "Web Performance",
        link: "https://rawweights.com/blog/webvital.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_websiteperformance-corewebvitals-frontendarchitecture-activity-7432191881373024256-mjAl/"
      },
      {
        title: "Bridging the Gap Between ML Theory and Intuition: An Interactive Sandbox",
        excerpt: "Discover how our AI & ML Master Playground bridges the gap by turning static equations into dynamic, tactile experiences you can build, break, and manipulate in real-time.",
        date: "Feb 22, 2026",
        image: "./images/sandbox.png",
        type: "Blog",
        link: "https://rawweights.com/blog/bridging-the-gap-between-ml-theory-and-intuition-in-interactive-sandbox.html",
        linkedin: "https://www.linkedin.com/posts/shamhc_artificialintelligence-machinelearning-llm-activity-7434154839057637376-SIUg/"
      },
      {
        title: "Building a Tiny AI in Your Browser (No Python Required)",
        excerpt: "LLMs aren't magic — they're math. I built the Atomic GPT Playground: a pure JavaScript Decoder-Only Transformer. No Python, no GPUs, and no servers.",
        date: "Feb 14, 2026",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
        type: "LinkedIn Article",
        link: "https://www.linkedin.com/pulse/building-tiny-ai-your-browser-python-required-hassan-chikkegowda-nxroc",
        linkedin: "https://www.linkedin.com/pulse/building-tiny-ai-your-browser-python-required-hassan-chikkegowda-nxroc"
      },
      {
        title: "Why I paused the advanced AI rush to build a simple regression tool",
        excerpt: "Why is your model failing? Usually it's not the architecture — it's a lack of intuition for the Learning Rate and the Cost Function.",
        date: "Feb 8, 2026",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        type: "LinkedIn Article",
        link: "https://www.linkedin.com/pulse/why-i-paused-advanced-ai-rush-build-simple-regression-sham-sundar-v0dcc/",
        linkedin: "https://www.linkedin.com/pulse/why-i-paused-advanced-ai-rush-build-simple-regression-sham-sundar-v0dcc/"
      },
    ]
  };
})();
