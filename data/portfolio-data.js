/**
 * RawWeights — Portfolio data
 * Single source of truth for portfolio/index.html.
 * To add a project: append an entry here. No HTML edits needed.
 *
 * tags must be from: 'Agentic AI' | 'Security' | 'Hackathon' | 'Fine-Tuning' | 'RAG' | 'Interactive'
 */
(function () {
  'use strict';
  window.PORTFOLIO_DATA = [
    {
      id: 'debrief',
      title: 'Debrief — Conference Memory & Networking Intelligence',
      excerpt: 'Built at the conference where we had the problem. A mobile-first graph app that remembers every person, session, and idea from your day. FalkorDB + Bright Data + Qodo.',
      tags: ['Hackathon', 'Agentic AI'],
      date: '2026-10-30',
      emoji: '🧠',
      gradient: 'linear-gradient(135deg,#0a1628 0%,#1a2a4a 100%)',
      link: '/usecase/debrief.html',
      cta: 'View case study →'
    },
    {
      id: 'securitytwin',
      title: 'SecurityTwin — From IDOR to a CI Guard',
      excerpt: 'Reproduce an IDOR in an isolated app copy, detect it in request data, repair it automatically, prove the boundary, and block it in CI — a full security loop.',
      tags: ['Security', 'Agentic AI'],
      date: '2026-10-10',
      emoji: '🛡️',
      gradient: 'linear-gradient(135deg,#0a0a1a 0%,#1a0a2a 100%)',
      link: '/usecase/securitytwin.html',
      cta: 'View case study →'
    },
    {
      id: 'plumber-lab',
      title: 'Plumber Lab — Pipeline Security, Visualized',
      excerpt: 'Interactive lab that teaches CI/CD pipeline security through hands-on experience. No prior knowledge needed — built as an AI-powered tutorial.',
      tags: ['Security', 'Interactive'],
      date: '2026-10-06',
      emoji: '🔧',
      gradient: 'linear-gradient(135deg,#0a1a0a 0%,#1a2a0a 100%)',
      link: '/usecase/plumber-lab.html',
      cta: 'Read build log →'
    },
    {
      id: 'trustlens',
      title: 'TrustLens — AI Vendor Trust Scorer',
      excerpt: 'Scores vendors by trustworthiness — verified claims, fake review detection, real purchase data — in seconds. Built at AI Commerce Gallery Hackathon 2026.',
      tags: ['Hackathon', 'Agentic AI'],
      date: '2026-10-04',
      emoji: '🔍',
      gradient: 'linear-gradient(135deg,#0a1020 0%,#102030 100%)',
      link: '/usecase/trustlens.html',
      cta: 'View case study →'
    },
    {
      id: 'claimlens',
      title: 'ClaimLens — 3-Agent Fact-Checker',
      excerpt: 'A 3-agent pipeline (Extractor, Grounder, Verifier) that shows exactly where standard AI echoes viral hoaxes. Python + Streamlit.',
      tags: ['Agentic AI', 'RAG'],
      date: '2026-09-24',
      emoji: '🔎',
      gradient: 'linear-gradient(135deg,#101020 0%,#1a1a30 100%)',
      link: '/usecase/claimlens.html',
      cta: 'View case study →'
    },
    {
      id: 'briefd',
      title: 'Briefd — Personal Reply Agent',
      excerpt: 'A message arrives. Briefd searches your KB, briefs you if it\'s new, drafts a reply, and holds for approval. TrueFoundry Agent Harness Hackathon 2026.',
      tags: ['Hackathon', 'Agentic AI'],
      date: '2026-09-20',
      emoji: '📬',
      gradient: 'linear-gradient(135deg,#0d1020 0%,#1a2030 100%)',
      link: '/usecase/briefd.html',
      cta: 'View case study →'
    },
    {
      id: 'tripripple',
      title: 'TripRipple — Agent Memory Copilot',
      excerpt: 'Remembers why every travel decision was made, screens hotel replacements against constraints, and notifies only affected parties. Mastra Agent Memory Hackathon.',
      tags: ['Hackathon', 'Agentic AI'],
      date: '2026-08-20',
      emoji: '✈️',
      gradient: 'linear-gradient(135deg,#030d1a 0%,#0a1a2a 100%)',
      link: '/usecase/tripripple.html',
      cta: 'View case study →'
    },
    {
      id: 'tech-debt-copilot',
      title: 'Tech Debt Copilot — MongoDB BuildFest SF',
      excerpt: 'Audits your stack for EOL packages, CVE exposures, and upcoming deprecations — full conversation persistence via MongoDB Atlas.',
      tags: ['Hackathon', 'Agentic AI'],
      date: '2026-08-14',
      emoji: '⚙️',
      gradient: 'linear-gradient(135deg,#0a1010 0%,#102020 100%)',
      link: '/usecase/tech-debt-copilot.html',
      cta: 'View case study →'
    },
    {
      id: 'agentintel',
      title: 'AgentIntel — 7-Agent Swarm for AI Visibility',
      excerpt: '7-agent swarm that scrapes websites, benchmarks competitors, and generates AEO/GEO recommendations — Band, Guild, and Actian wired in.',
      tags: ['Agentic AI'],
      date: '2026-07-24',
      emoji: '📡',
      gradient: 'linear-gradient(135deg,#080c18 0%,#101828 100%)',
      link: '/usecase/agentintel-guide.html',
      cta: 'Read build log →'
    },
    {
      id: 'shadowshield',
      title: 'ShadowShield AI — PII Redaction for AI Services',
      excerpt: 'Chrome extension that intercepts sensitive data across four browser channels before AI services see it — three-tier local AI detection cascade.',
      tags: ['Security'],
      date: '2026-07-12',
      emoji: '🕶️',
      gradient: 'linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 100%)',
      link: '/usecase/shadowshield-ai.html',
      cta: 'View case study →'
    },
    {
      id: 'careerwiki',
      title: 'CareerWiki — Local AI That Knows Your Entire Career',
      excerpt: 'Ingests 25+ years of career documents, generates tailored resumes in minutes — zero cloud data, zero hallucination. Ollama + Streamlit.',
      tags: ['RAG'],
      date: '2026-07-23',
      emoji: '📂',
      gradient: 'linear-gradient(135deg,#0a1f1f 0%,#0d3333 100%)',
      link: '/usecase/careerwiki-guide.html',
      cta: 'Read guide →'
    },
    {
      id: 'vocabforge',
      title: 'VocabForge — What Happens When You Fine-Tune',
      excerpt: 'Fine-tuned Qwen3 1.7B on 90 examples with LoRA. 6 real failures, one working model running locally with Ollama — no GPU required after training.',
      tags: ['Fine-Tuning'],
      date: '2026-07-02',
      emoji: '📝',
      gradient: 'linear-gradient(135deg,#0a2010 0%,#1a3a20 100%)',
      link: '/usecase/vocabforge-fine-tuning-guide.html',
      cta: 'Read build log →'
    },
    {
      id: 'senttriage',
      title: 'SentTriage — Behavioral Email Classifier',
      excerpt: '6 action-based buckets, 86% accuracy via Proximal Prompt Optimization. Asks what an email requires from you — evaluated live via LangSmith.',
      tags: ['Fine-Tuning'],
      date: '2026-06-25',
      emoji: '📧',
      gradient: 'linear-gradient(135deg,#0d1b2a 0%,#1b2a4a 100%)',
      link: '/usecase/sent-triage.html',
      cta: 'Read case study →'
    },
    {
      id: 'rfp-agent',
      title: 'RFP Intelligent Agent',
      excerpt: 'Bridges LLMs with structured enterprise hardware catalogs via MCP. Java + Gemini + 5 deterministic tool classes eliminate hallucinations in spec-heavy RFP scoring.',
      tags: ['Agentic AI'],
      date: '2026-06-01',
      emoji: '🤖',
      gradient: 'linear-gradient(135deg,#1e3a5f 0%,#1a237e 100%)',
      link: '/portfolio/rfp-mcp-agent.html',
      cta: 'View case study →'
    },
    {
      id: 'passive-safety',
      title: 'Passive Food Safety Watchdog',
      excerpt: 'Silently monitors 29,000+ FDA/USDA recalls and alerts households before they know to ask. A real-world GraphRAG system in Phase 1 production.',
      tags: ['RAG'],
      date: '2026-06-10',
      emoji: '🥗',
      image: '/images/passive.png',
      link: '/guide/passive-safety-watchdog.html',
      cta: 'Read builder\'s log →'
    },
    {
      id: 'biologic-osint',
      title: 'BioLogic: AI-Powered OSINT Dashboard',
      excerpt: 'Real-time health intelligence dashboard built at a hackathon — React, Node, Java MCP, and Gemini AI tracking disease signals from open sources.',
      tags: ['Hackathon', 'Security'],
      date: '2026-06-08',
      emoji: '🧬',
      image: '/images/biologic.jpg',
      link: '/blog/biologic-osint.html',
      cta: 'View pitch →'
    },
    {
      id: 'threatscope',
      title: 'ThreatScope Analytics',
      excerpt: 'Free IP threat intelligence for agencies and startups. Real-time threat scoring, geolocation mapping, and risk classification for any IP address.',
      tags: ['Security'],
      date: '2026-06-05',
      emoji: '🔭',
      gradient: 'linear-gradient(135deg,#1a0a0a 0%,#3d0000 100%)',
      link: '/blog/threatscope.html',
      cta: 'Read build log →'
    },
    {
      id: 'site-transform',
      title: 'Blueprint: AI Site Redesign from Scratch',
      excerpt: 'Multi-agent pipeline that transformed rawweights.com — unified design system, centralized nav/footer, and content layer. The full engineering playbook.',
      tags: ['Agentic AI'],
      date: '2026-06-13',
      emoji: '🏗️',
      gradient: 'linear-gradient(135deg,#0f2027 0%,#2c5364 100%)',
      link: '/guide/agent-blueprint-site-transform.html',
      cta: 'Read blueprint →'
    },
    {
      id: 'contextcal',
      title: 'ContextCal — Agentic Scheduling Without Calendar Access',
      excerpt: 'LangGraph agent that parses free-text availability in multiple languages, handles timezone conversion, generates invites — no calendar API integration.',
      tags: ['Agentic AI'],
      date: '2026-06-17',
      emoji: '📅',
      gradient: 'linear-gradient(135deg,#0f0f2d 0%,#1a1a4e 100%)',
      link: '/guide/contextCal.html',
      cta: 'Read builder\'s log →'
    },
    {
      id: 'ml-playground',
      title: 'AI & ML Master Playground',
      excerpt: 'Browser-based sandbox covering 12+ ML models — neural networks, attention, CNNs, generative modeling, RL — with real-time parameter tuning. Pure JavaScript.',
      tags: ['Interactive'],
      date: '2026-01-01',
      emoji: '🧪',
      image: '/images/sandbox.png',
      link: '/tools/master_ml_hub.html',
      cta: 'Open playground →'
    },
    {
      id: 'java-lstm',
      title: 'Teaching a Java App to "Hear" the Server',
      excerpt: 'Local LSTM autoencoder in pure Java detecting anomalies in Apache server logs — real-time behavioral pattern detection with Slack alerting. No APIs, no cloud.',
      tags: ['Fine-Tuning'],
      date: '2026-01-01',
      emoji: '🫀',
      gradient: 'linear-gradient(135deg,#051510 0%,#0a2a20 100%)',
      link: '/blog/teaching-a-java-app-to-hear-the-heartbeat-of-the-server.html',
      cta: 'Read build log →'
    }
  ];
})();
