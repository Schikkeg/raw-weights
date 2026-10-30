/**
 * RawWeights Centralized Navigation v1.0
 * ----------------------------------------
 * Usage: <div id="rw-nav"></div>
 *        <script src="/includes/rw-nav.js?v=20260612"></script>
 *
 * Cache busting: bump ?v= query string when nav-data changes.
 * The nav data is embedded below — no extra HTTP fetch needed.
 * To update navigation, edit NAV_DATA and bump the ?v= in all pages.
 */
(function () {
  'use strict';

  /* ── Root URL detection (works with file:// and http://) ───── */
  const ROOT = (function () {
    try {
      const s = document.currentScript;
      if (s && s.src) {
        const bare = s.src.split('?')[0].split('#')[0];
        return bare.replace(/\/includes\/rw-nav\.js$/, '/');
      }
    } catch (_) {}
    return '/';
  })();

  function u(path) {
    if (!path) return '#';
    if (/^(https?:\/\/|mailto:|tel:)/.test(path)) return path;
    return ROOT + path.replace(/^\//, '');
  }

  /* ── Navigation Data ───────────────────────────────────────── */
  const NAV_DATA = {
    brand: { name: 'RawWeights', url: '/' },
    items: [
      {
        id: 'playgrounds',
        label: 'Playgrounds',
        items: [
          { label: 'ML Master Hub',          url: '/tools/master_ml_hub.html',            desc: 'Interactive ML sandbox — all models' },
          { label: 'Attention Journey',      url: '/tools/master_sequence_hub.html',       desc: 'RNNs → Transformers visual deep dive' },
          { label: 'CNN Explorer',           url: '/tools/cnn_sandbox.html',               desc: 'Convolutional network architecture' },
          { label: 'Generative Modeling',    url: '/tools/deep_generative_modeling.html',  desc: 'VAE, GAN & CycleGAN playground' },
          { label: 'Reinforcement Learning', url: '/tools/deep_reinforcement.html',        desc: 'Deep RL with policy gradients' },
          { label: 'Simple Regression',      url: '/srt.html',                             desc: 'Gradient descent visualizer' },
          { label: 'Limitations & Frontiers',url: '/tools/limitations-and-frontiers.html', desc: 'Edge cases and AI model boundaries' }
        ]
      },
      {
        id: 'guides',
        label: 'Guides',
        groups: [
          {
            heading: 'Fundamentals',
            items: [
              { label: 'RAG Guide',            url: '/guide/rag.html',                           desc: 'Complete retrieval-augmented generation guide' },
              { label: 'LLM Post-Training',    url: '/guide/llm-post-training-guide.html',       desc: 'Fine-tune your own language model' },
              { label: 'MCP Architecture',     url: '/guide/mcp.html',                           desc: 'Model Context Protocol interactive guide' },
              { label: 'LLM Lifecycle',        url: '/guide/full-lifecycle.html',                desc: 'Full LLM architecture & production lifecycle' },
              { label: 'Mythos Report',        url: '/guide/mythos.html',                        desc: 'AI threats & safety — preview report' },
              { label: 'The Compiler | LLM Wiki ',        url: '/guide/llm-wiki-compiler.html',                        desc: 'Understand ingest, query, lint — and when pre-compiled knowledge beats RAG.' },
            ]
          },
          {
            heading: 'Agentic & Applied',
            items: [
              { label: 'Agentic AI Strategy',      url: '/guide/adobe-cx-enterprise-ecosystem.html',  desc: 'Strategic framework for agentic systems' },
              { label: 'Agent Autonomy Dial',      url: '/guide/agent-autonomy-dial.html',            desc: 'How much should an AI agent decide?' },
              { label: 'AI Security Stack',        url: '/guide/ai-security-stack-autopsy.html',      desc: 'Why legacy security misses AI agents' },
              { label: 'Blueprint: Site Transform',url: '/guide/agent-blueprint-site-transform.html', desc: 'How an agent rebuilds a site end-to-end' }
            ]
          }
        ]
      },
      {
        id: 'agentic',
        label: 'Agentic AI',
        groups: [
          {
            heading: 'Strategy',
            items: [
              { label: 'AI Stack Practices',    url: '/blog/ai-stack-practices.html',            desc: 'Patterns for production AI systems' },
              { label: 'Agentic Architecture',  url: '/blog/agentic-architecture-strategy.html',  desc: 'Strategy for agentic system design' },
              { label: 'Agent Autonomy Dial',   url: '/guide/agent-autonomy-dial.html',           desc: 'How much should an AI agent decide?' },
              { label: 'Digital Colleague',     url: '/blog/digital-colleague-masterclass.html',  desc: 'Masterclass: AI as a team member' },
              { label: 'Threatscope',           url: '/blog/threatscope.html',                    desc: 'AI-powered threat intelligence' },
              { label: 'Voice AI Insights',     url: '/blog/voice-ai-insights.html',              desc: 'Building voice-first AI interfaces' },
              { label: 'Agent Memory',     url: '/usecase/mem0-b2b-signal-memory.html',              desc: 'Beyond RAG,across sessions' },
              { label: 'Build. Measure. Ship',     url: '/tools/eval-proving-ground.html',              desc: 'The Proving Ground' },
              { label: 'Fine-Tuning LLMs',     url: '/guide/fine-tuning-llm-guide.html',              desc: 'The Specialist Protocol' },
              { label: 'Fine-Tuning Part 2: ',     url: '/guide/fine-tuning-production.html',              desc: 'The Production Protocol ' },
              { label: 'Agent Security Guide ',     url: '/guide/ai-security-redteam-brief.html',              desc: 'See the Attack Taxonomy ' },
              { label: 'AI Threat Model ',     url: '/guide/ai-security-threat-model.html',              desc: 'Explore the Blueprint ' }
            ]
          },
          {
            heading: 'Build & Deploy',
            items: [
              { label: 'RAG Pipeline Toolkit',  url: '/guide/rag-pipeline-toolkit.html',              desc: 'Production RAG pipeline patterns' },
              { label: "RAG Architect's Studio",url: '/guide/rag-architects-studio.html',             desc: 'Advanced RAG design patterns' },
              { label: 'Pinecone Retrieval',    url: '/guide/pinecone-retrieval-playbook.html',        desc: 'Vector search playbook' },
              { label: 'Passive Safety',        url: '/guide/passive-safety-watchdog.html',            desc: 'AI safety monitoring patterns' },
              { label: 'NVIDIA Post-Training',  url: '/blog/nvidia-llm-post-training.html',            desc: 'LLM fine-tuning strategies' },
              { label: 'LlamaIndex Intel',      url: '/guide/llamaindex-document-intelligence.html',   desc: 'Document AI with LlamaIndex' },
              { label: 'MCP Practitioner',      url: '/guide/mcp-practitioner-playbook.html',          desc: 'Hands-on MCP server patterns & real integrations' },
              { label: 'AG2 Quick Reference',   url: '/guide/ag2-quickref.html',                       desc: 'AG2 — 10 key concepts from the beta session' },
              { label: 'ContextCal',            url: '/guide/ContextCal.html',                        desc: 'Agentic scheduling across language contexts' },
              { label: 'ElevenLabs Builder Map',url: '/guide/elevenlabs-builders-map.html',            desc: 'Five practical decisions for voice AI builders' },
              { label: 'Sent Triage',url: '/usecase/sent-triage.html',            desc: 'Behavioral Email Classifier' },
              { label: 'Vocab Forge',url: '/usecase/vocabforge-fine-tuning-guide.html',            desc: 'Fine-tuned model. Local inference. Habit tracking. Zero cloud.' },
              { label: 'ShadowShield AI',url: '/usecase/shadowshield-ai.html',            desc: 'Swap sensitive information before it sends.' }

            ]
          }
        ]
      },
      { id: 'blog', label: 'Blog', url: '/blog.html' }
    ],
    cta: { label: 'How It Started', url: '/how-it-started.html' }
  };

  /* ── SVG Icons ─────────────────────────────────────────────── */
  const ICONS = {
    /* Circular weight plate + neural graph:
       Plate rim = gym weight plate, grip-hole nodes = neural network, axle = neural hub */
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="#080c18"/>
      <circle cx="24" cy="24" r="19.5" stroke="#f97316" stroke-width="2.2"/>
      <circle cx="24" cy="24" r="12" stroke="rgba(249,115,22,0.3)" stroke-width="1.2"/>
      <line x1="24" y1="24" x2="24" y2="8"  stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="24" y1="24" x2="38" y2="16" stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="24" y1="24" x2="38" y2="32" stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="24" y1="24" x2="24" y2="40" stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="24" y1="24" x2="10" y2="32" stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="24" y1="24" x2="10" y2="16" stroke="rgba(249,115,22,0.7)" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="24" cy="8"  r="2.3" fill="#f97316"/>
      <circle cx="38" cy="16" r="2.3" fill="#f97316" opacity="0.8"/>
      <circle cx="38" cy="32" r="2.3" fill="#f97316"/>
      <circle cx="24" cy="40" r="2.3" fill="#f97316" opacity="0.8"/>
      <circle cx="10" cy="32" r="2.3" fill="#f97316"/>
      <circle cx="10" cy="16" r="2.3" fill="#f97316" opacity="0.8"/>
      <circle cx="24" cy="24" r="4.5" fill="#f97316"/>
      <circle cx="24" cy="24" r="1.8" fill="rgba(255,255,255,0.9)"/>
    </svg>`,
    chevron: `<svg class="rw-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`
  };

  /* ── Theme helpers ─────────────────────────────────────────── */
  function getTheme() {
    return localStorage.getItem('rw-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('rw-theme', t);
  }
  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    updateThemeIcon();
  }
  function updateThemeIcon() {
    const btn = document.getElementById('rw-theme-btn');
    if (!btn) return;
    btn.innerHTML = getTheme() === 'dark' ? ICONS.sun : ICONS.moon;
    btn.setAttribute('aria-label', getTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ── Active page detection ─────────────────────────────────── */
  function isActive(url) {
    if (!url || /^(https?:\/\/)/.test(url)) return false;
    const current = window.location.pathname;
    const clean = url.replace(/^\//, '');
    if (!clean || clean === 'index.html') {
      return current === '/' || current.endsWith('/index.html');
    }
    return current.endsWith('/' + clean) || current === '/' + clean;
  }

  /* ── Build desktop dropdown item ───────────────────────────── */
  function buildDropdownItem(item) {
    const active = isActive(item.url) ? ' rw-dropdown-item-active' : '';
    return `<a class="rw-dropdown-item${active}" href="${u(item.url)}">
      <span class="rw-dropdown-item-label">${item.label}</span>
      ${item.desc ? `<span class="rw-dropdown-item-desc">${item.desc}</span>` : ''}
    </a>`;
  }

  /* ── Build desktop nav items ───────────────────────────────── */
  function buildDesktopNav() {
    return NAV_DATA.items.map(item => {
      if (item.groups) {
        const active = item.groups.some(g => g.items.some(i => isActive(i.url)));
        return `<div class="rw-dropdown${active ? ' open-default' : ''}" data-dropdown="${item.id}">
          <button class="rw-nav-link rw-dropdown-trigger${active ? ' active' : ''}" type="button"
                  aria-haspopup="true" aria-expanded="false" aria-controls="rw-dd-${item.id}">
            ${item.label} ${ICONS.chevron}
          </button>
          <div class="rw-dropdown-menu rw-dropdown-wide" id="rw-dd-${item.id}" role="menu">
            <div class="rw-dropdown-cols">
              ${item.groups.map(g => `<div class="rw-dropdown-group">
                <div class="rw-dropdown-group-heading">${g.heading}</div>
                ${g.items.map(buildDropdownItem).join('')}
              </div>`).join('')}
            </div>
          </div>
        </div>`;
      }
      if (item.items) {
        const active = item.items.some(i => isActive(i.url));
        return `<div class="rw-dropdown${active ? ' open-default' : ''}" data-dropdown="${item.id}">
          <button class="rw-nav-link rw-dropdown-trigger${active ? ' active' : ''}" type="button"
                  aria-haspopup="true" aria-expanded="false" aria-controls="rw-dd-${item.id}">
            ${item.label} ${ICONS.chevron}
          </button>
          <div class="rw-dropdown-menu" id="rw-dd-${item.id}" role="menu">
            ${item.items.map(buildDropdownItem).join('')}
          </div>
        </div>`;
      }
      const active = isActive(item.url) ? ' active' : '';
      return `<a class="rw-nav-link${active}" href="${u(item.url)}">${item.label}</a>`;
    }).join('');
  }

  /* ── Build mobile nav ──────────────────────────────────────── */
  function buildMobileNav() {
    let html = `<button class="rw-mobile-search-btn" id="rw-mobile-search-btn" type="button" aria-label="Search site">
      ${ICONS.search}<span>Search RawWeights</span>
    </button>`;
    NAV_DATA.items.forEach(item => {
      if (item.groups) {
        html += `<div class="rw-mobile-section-label">${item.label}</div>`;
        item.groups.forEach(g => {
          html += `<div class="rw-mobile-sub-label">${g.heading}</div>`;
          g.items.forEach(sub => {
            html += `<a class="rw-mobile-link" href="${u(sub.url)}">${sub.label}</a>`;
          });
        });
      } else if (item.items) {
        html += `<div class="rw-mobile-section-label">${item.label}</div>`;
        item.items.forEach(sub => {
          html += `<a class="rw-mobile-link" href="${u(sub.url)}">${sub.label}</a>`;
        });
      } else {
        html += `<a class="rw-mobile-link" href="${u(item.url)}">${item.label}</a>`;
      }
      html += `<div class="rw-mobile-divider"></div>`;
    });
    html += `<a class="rw-mobile-cta" href="${u(NAV_DATA.cta.url)}">${NAV_DATA.cta.label} →</a>`;
    return html;
  }

  /* ── Build full header HTML ────────────────────────────────── */
  function buildHeaderHTML() {
    /* .rw-mobile-menu is a SIBLING of <header>, NOT a child.
       backdrop-filter on .rw-header creates a containing block for
       position:fixed children in Chrome/Safari, collapsing the menu
       to zero height. Placing it outside the header fixes this. */
    return `<header class="rw-header" id="rw-header" role="banner">
  <div class="rw-header-inner">
    <button class="rw-hamburger" id="rw-hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="rw-mobile-menu">
      <span></span><span></span><span></span>
    </button>

    <a class="rw-logo" href="${u(NAV_DATA.brand.url)}" aria-label="${NAV_DATA.brand.name} home">
      ${ICONS.logo}
      <span class="rw-logo-text">Raw<span style="color:#f97316">W</span>eights</span>
    </a>

    <nav class="rw-nav-links" aria-label="Main navigation">
      ${buildDesktopNav()}
    </nav>

    <div class="rw-nav-right">
      <button class="rw-search-btn" id="rw-search-btn" type="button" aria-label="Search" aria-expanded="false" aria-controls="rw-search-overlay">${ICONS.search}</button>
      <button class="rw-theme-btn" id="rw-theme-btn" type="button"></button>
      <a class="rw-cta-btn" href="${u(NAV_DATA.cta.url)}">${NAV_DATA.cta.label}</a>
    </div>
  </div>
</header>
<div class="rw-mobile-menu" id="rw-mobile-menu" aria-hidden="true">
  ${buildMobileNav()}
</div>
<div class="rw-search-overlay" id="rw-search-overlay" role="dialog" aria-modal="true" aria-label="Search" aria-hidden="true">
  <div class="rw-search-panel" id="rw-search-panel">
    <div class="rw-search-inner">
      <div id="rw-search-pagefind"></div>
      <div class="rw-search-hint">
        <kbd>Esc</kbd> to close &nbsp;&middot;&nbsp; <kbd>Ctrl K</kbd> / <kbd>&#8984; K</kbd> to open
      </div>
    </div>
  </div>
</div>`;
  }

  /* ── Scroll handler ────────────────────────────────────────── */
  function initScroll() {
    const header = document.getElementById('rw-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Desktop dropdown logic ────────────────────────────────── */
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.rw-dropdown');
    dropdowns.forEach(dd => {
      const trigger = dd.querySelector('.rw-dropdown-trigger');
      const menu = dd.querySelector('.rw-dropdown-menu');
      if (!trigger || !menu) return;

      let closeTimer;

      const open = () => {
        clearTimeout(closeTimer);
        // Close others
        document.querySelectorAll('.rw-dropdown.open').forEach(other => {
          if (other !== dd) other.classList.remove('open');
        });
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      };

      const close = () => {
        closeTimer = setTimeout(() => {
          dd.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }, 120);
      };

      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dd.classList.toggle('open');
        trigger.setAttribute('aria-expanded', dd.classList.contains('open'));
      });
      menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      menu.addEventListener('mouseleave', close);
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.rw-dropdown.open').forEach(dd => {
        dd.classList.remove('open');
        const trigger = dd.querySelector('.rw-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Keyboard: Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.rw-dropdown.open').forEach(dd => dd.classList.remove('open'));
      }
    });
  }

  /* ── Mobile menu logic ─────────────────────────────────────── */
  function initMobile() {
    const hamburger = document.getElementById('rw-hamburger');
    const mobileMenu = document.getElementById('rw-mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Search overlay — Pagefind UI ─────────────────────────── */
  function initSearch() {
    const overlay   = document.getElementById('rw-search-overlay');
    const openBtn   = document.getElementById('rw-search-btn');
    const mobileBtn = document.getElementById('rw-mobile-search-btn');
    if (!overlay) return;

    let pfLoaded = false;

    /* Derive page type badge from URL for eyebrow labels */
    function typeFromHref(href) {
      if (!href) return '';
      if (href.indexOf('/blog/')      !== -1) return 'Blog';
      if (href.indexOf('/guide/')     !== -1) return 'Guide';
      if (href.indexOf('/usecase/')   !== -1) return 'Usecase';
      if (href.indexOf('/tools/')     !== -1 || href.indexOf('/srt.html') !== -1) return 'Playground';
      if (href.indexOf('/portfolio/') !== -1) return 'Portfolio';
      return '';
    }

    /* Inline SVG icons for default thumbnails (injected directly — avoids CSS background-image Svelte specificity issues) */
    const SVG_ICONS = {
      blog:       '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      guide:      '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
      playground: '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      usecase:    '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      portfolio:  '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      other:      '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
    };

    /* Process a single result: inject type badge + default thumbnail SVG when no image.
       Skips loading placeholders — called again once real thumb arrives. */
    function processResult(r) {
      const a    = r.querySelector('a[href]');
      const type = typeFromHref(a ? a.getAttribute('href') : '') || 'other';
      const slug = type.toLowerCase();

      if (!r.querySelector('.rw-result-type')) {
        const badge = document.createElement('span');
        badge.className = 'rw-result-type rw-result-type--' + slug;
        badge.textContent = type;
        const inner = r.querySelector('.pagefind-ui__result-inner') || r;
        inner.insertBefore(badge, inner.firstChild);
      }

      /* Pagefind renders a loading placeholder first, then swaps it for the real thumb.
         Only process the real thumb (no pagefind-ui__loading class). */
      const thumb = r.querySelector('.pagefind-ui__result-thumb:not(.pagefind-ui__loading)');
      if (!thumb) return;

      const svgIcon = SVG_ICONS[slug] || SVG_ICONS.other;
      const useDefault = function () {
        thumb.innerHTML = svgIcon;
        thumb.classList.add('rw-thumb-default', 'rw-thumb-' + slug);
      };

      if (thumb.classList.contains('rw-thumb-default')) return; // already processed

      const img = thumb.querySelector('img');
      if (!img || !img.getAttribute('src')) {
        useDefault();
      } else {
        img.addEventListener('error', useDefault);
      }
    }

    /* Watch result DOM — handles both new result additions and the loading→real thumb swap */
    function watchResults(container) {
      Array.from(container.querySelectorAll('.pagefind-ui__result')).forEach(processResult);

      const mo = new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (!node || node.nodeType !== 1) return;
            if (node.classList && node.classList.contains('pagefind-ui__result')) {
              /* A result <li> was added directly */
              processResult(node);
            } else {
              /* A descendant was added — could be the real thumb replacing a loading placeholder.
                 Walk up to find the parent result and re-run processResult on it. */
              const ancestor = node.closest && node.closest('.pagefind-ui__result');
              if (ancestor) { processResult(ancestor); return; }
              /* Or a container holding multiple results was added */
              Array.from(node.querySelectorAll ? node.querySelectorAll('.pagefind-ui__result') : [])
                .forEach(processResult);
            }
          });
        });
      });
      mo.observe(container, { childList: true, subtree: true });
    }

    function loadPagefind(cb) {
      if (pfLoaded) { cb(); return; }
      const css = document.createElement('link');
      css.rel  = 'stylesheet';
      css.href = ROOT + 'pagefind/pagefind-ui.css';
      document.head.appendChild(css);

      const js  = document.createElement('script');
      js.src    = ROOT + 'pagefind/pagefind-ui.js';
      js.onload = function () {
        pfLoaded = true;
        const el = document.getElementById('rw-search-pagefind');
        try {
          new window.PagefindUI({
            element:         '#rw-search-pagefind',
            bundlePath:      ROOT + 'pagefind/',
            showImages:      true,
            showFilters:     false,
            resetStyles:     false,
            excerptLength:   20,
            translations:    { placeholder: 'Search guides, blogs, playgrounds…' }
          });
          if (el) watchResults(el);
        } catch (_) {}
        cb();
      };
      js.onerror = function () {
        const el = document.getElementById('rw-search-pagefind');
        if (el) el.innerHTML =
          '<p class="rw-search-error">Search index not found — run <code>npm run build</code>.</p>';
        pfLoaded = true; cb();
      };
      document.head.appendChild(js);
    }

    function focusInput() {
      const inp = overlay.querySelector('.pagefind-ui__search-input, input[type=text], input[type=search]');
      if (inp) { inp.focus(); inp.select(); }
    }

    function openSearch() {
      window.scrollTo(0, 0); // panel anchors to top; scroll there so it is immediately visible
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('rw-search-open');
      document.documentElement.classList.add('rw-search-open'); // iOS Safari scroll-lock fix
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      loadPagefind(function () { setTimeout(focusInput, 80); });
    }
    function closeSearch() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('rw-search-open');
      document.documentElement.classList.remove('rw-search-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    }

    /* Expose search API for WebMCP tool execute() and page scripts */
    window.__rw = window.__rw || {};
    window.__rw.openSearch = openSearch;
    window.__rw.searchFor  = function (q) {
      openSearch();
      loadPagefind(function () {
        setTimeout(function () {
          const inp = document.querySelector('.pagefind-ui__search-input');
          if (inp) { inp.value = q; inp.dispatchEvent(new Event('input', { bubbles: true })); }
        }, 250);
      });
    };

    if (openBtn)   openBtn.addEventListener('click', openSearch);
    if (mobileBtn) mobileBtn.addEventListener('click', function () {
      closeSearch(); // close mobile menu first
      const mob = document.getElementById('rw-mobile-menu');
      const ham = document.getElementById('rw-hamburger');
      if (mob) { mob.classList.remove('open'); mob.setAttribute('aria-hidden', 'true'); }
      if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
      document.body.style.overflow = '';
      setTimeout(openSearch, 80);
    });

    /* Close on backdrop click */
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('open') ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    });
  }

  /* ── Number counter animation ─────────────────────────────── */
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el   = entry.target;
        const end  = parseFloat(el.dataset.count);
        const suf  = el.dataset.suffix  || '';
        const pre  = el.dataset.prefix  || '';
        const dur  = parseInt(el.dataset.duration) || 1400;
        const dec  = parseInt(el.dataset.decimals) || 0;
        const t0   = performance.now();

        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + (eased * end).toFixed(dec) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });

    els.forEach(el => {
      el.dataset._original = el.textContent;
      observer.observe(el);
    });
  }

  /* ── Persona persistence ───────────────────────────────────── */
  function initPersona() {
    const btns = document.querySelectorAll('.persona-btn[data-target]');
    if (!btns.length) return;

    const saved = localStorage.getItem('rw-persona');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('rw-persona', btn.getAttribute('data-target'));
      });
    });

    if (saved) {
      const match = document.querySelector('.persona-btn[data-target="' + saved + '"]');
      if (match && !match.classList.contains('active')) {
        match.click();
      }
    }
  }

  /* ── Announcement bar injection ───────────────────────────── */
  function injectAnnouncement() {
    if (document.getElementById('rw-announce-script')) return;
    const script = document.createElement('script');
    script.id = 'rw-announce-script';
    script.src = ROOT + 'includes/rw-announcement.js';
    document.head.appendChild(script);
  }

  /* ── Favicon injection — runs once on first nav init ───────── */
  function injectFavicons() {
    if (document.querySelector('link[data-rw-favicon]')) return;
    const head = document.head;
    const root = ROOT;
    [
      { rel: 'icon',             type: 'image/svg+xml',  href: root + 'favicon.svg',                    extra: '' },
      { rel: 'icon',             type: 'image/png',       href: root + 'images/favicon-32.png',          extra: 'sizes="32x32"' },
      { rel: 'icon',             type: 'image/png',       href: root + 'images/favicon-16.png',          extra: 'sizes="16x16"' },
      { rel: 'apple-touch-icon', type: '',                href: root + 'images/apple-touch-icon.png',    extra: 'sizes="180x180"' },
      { rel: 'manifest',         type: '',                href: root + 'site.webmanifest',               extra: '' },
    ].forEach(({ rel, type, href, extra }, i) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const el = document.createElement('link');
      el.rel = rel;
      if (type) el.type = type;
      el.href = href;
      if (extra) {
        extra.split(' ').forEach(attr => {
          const [k, v] = attr.split('=');
          if (k && v) el.setAttribute(k, v.replace(/"/g, ''));
        });
      }
      if (i === 0) el.dataset.rwFavicon = '1'; // marker on first link
      head.appendChild(el);
    });
  }

  /* ── WebMCP: meta tags + registerTool() shell tools ────────── */
  function injectWebMCP() {
    if (document.querySelector('meta[name^="webmcp:"]')) return;

    const head     = document.head;
    const pathname = window.location.pathname;

    const pageType = (function () {
      if (pathname === '/' || /\/index\.html$/.test(pathname))     return 'home';
      if (pathname === '/blog.html')                               return 'listing';
      if (/^\/blog\//.test(pathname))                             return 'article';
      if (/^\/guide\//.test(pathname))                            return 'guide';
      if (/^\/tools\//.test(pathname)
          || pathname === '/srt.html'
          || pathname === '/how-it-started.html')                 return 'tool';
      if (/^\/usecase\//.test(pathname))                          return 'usecase';
      if (/^\/portfolio\//.test(pathname))                        return 'portfolio';
      return 'article';
    })();

    const TYPE_CFG = {
      home:      { type: 'website', action: 'read search', search: true  },
      listing:   { type: 'listing', action: 'search read', search: true  },
      article:   { type: 'article', action: 'read',        search: false },
      guide:     { type: 'article', action: 'read',        search: false },
      tool:      { type: 'tool',    action: 'read interact', tools: 'interactive-ml-playground', search: false },
      usecase:   { type: 'article', action: 'read',        search: false },
      portfolio: { type: 'article', action: 'read',        search: false }
    };
    const tcfg    = TYPE_CFG[pageType] || TYPE_CFG.article;
    const pageDesc = (document.querySelector('meta[name="description"]') || {}).content || '';
    const mdPath   = pathname === '/' ? '/index.md' : pathname.replace(/\.html$/, '.md');

    function addMeta(name, content) {
      if (!content) return;
      const m = document.createElement('meta');
      m.name    = name;
      m.content = content;
      head.appendChild(m);
    }
    function addLink(rel, href, type) {
      if (document.querySelector('link[rel="' + rel + '"]')) return;
      const l = document.createElement('link');
      l.rel  = rel;
      l.href = href;
      if (type) l.type = type;
      head.appendChild(l);
    }

    /* Discovery links */
    addLink('webmcp',    'https://rawweights.com/.well-known/webmcp.json', 'application/json');
    addLink('llms-txt',  'https://rawweights.com/llms.txt');
    addLink('alternate', 'https://rawweights.com' + mdPath, 'text/markdown');

    /* Meta-tag fallback (non-Chrome agents / scrapers) */
    addMeta('webmcp:site',         'RawWeights');
    addMeta('webmcp:feed',         'https://rawweights.com/llms.txt');
    addMeta('webmcp:type',         tcfg.type);
    addMeta('webmcp:action',       tcfg.action);
    if (pageDesc) addMeta('webmcp:description',  pageDesc);
    addMeta('webmcp:canonical-md', 'https://rawweights.com' + mdPath);
    if (tcfg.search) addMeta('webmcp:search', 'https://rawweights.com/search/?q={query}');
    if (tcfg.tools)  addMeta('webmcp:tools',  tcfg.tools);

    /* registerTool() — Chrome 149+ origin trial only */
    const mc = document.modelContext;
    if (!mc || typeof mc.registerTool !== 'function') return;

    mc.registerTool({
      name: 'search_rawweights',
      description: 'Open the RawWeights search UI and return matching articles, guides, and playgrounds. Opens the search overlay and shows live results in the page.',
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string', description: 'Search term or topic to find' } },
        required: ['query']
      },
      execute: function (p) {
        if (window.__rw && typeof window.__rw.searchFor === 'function') {
          window.__rw.searchFor(p.query);
          return { status: 'opened', query: p.query, message: 'Search overlay opened with results for "' + p.query + '"' };
        }
        /* Fallback: navigate to the full search page */
        window.location.href = ROOT + 'search/?q=' + encodeURIComponent(p.query);
        return { status: 'navigating', url: ROOT + 'search/?q=' + encodeURIComponent(p.query) };
      }
    });

    mc.registerTool({
      name: 'get_navigation',
      description: 'Returns the RawWeights site navigation as a flat list of sections and links.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: function () {
        var sections = [];
        NAV_DATA.items.forEach(function (item) {
          var links = [];
          if (item.url) {
            links.push({ label: item.label, url: item.url });
          }
          if (item.items) {
            item.items.forEach(function (i) { links.push({ label: i.label, url: i.url, desc: i.desc || '' }); });
          }
          if (item.groups) {
            item.groups.forEach(function (g) {
              g.items.forEach(function (i) { links.push({ label: i.label, url: i.url, desc: i.desc || '' }); });
            });
          }
          sections.push({ section: item.label, links: links });
        });
        return { site: 'RawWeights', baseUrl: 'https://rawweights.com', sections: sections };
      }
    });

    mc.registerTool({
      name: 'get_footer_links',
      description: 'Returns all links from the RawWeights site footer.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: function () {
        var footer = document.getElementById('rw-footer');
        var links = footer
          ? Array.from(footer.querySelectorAll('a[href]')).map(function (a) {
              return { text: a.textContent.trim(), href: a.getAttribute('href') };
            })
          : [];
        return { links: links, count: links.length };
      }
    });

    mc.registerTool({
      name: 'get_page_sections',
      description: 'Returns all h2/h3 section headings and anchor IDs on the current page for deep-linking.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: function () {
        var sections = Array.from(document.querySelectorAll('h2[id], h3[id]')).map(function (h) {
          return { level: h.tagName.toLowerCase(), text: h.textContent.trim(), anchor: '#' + h.id };
        });
        return { page: window.location.pathname, sections: sections, count: sections.length };
      }
    });

    /* Per-page custom tools declared via window.RW_PAGE_TOOLS */
    var pageTool = window.RW_PAGE_TOOLS;
    if (Array.isArray(pageTool)) {
      pageTool.forEach(function (t) { try { mc.registerTool(t); } catch (_) {} });
    }
  }

  /* ── JSON-LD structured data (no per-page edits) ─────────── */
  function injectStructuredData() {
    try {
      if (document.querySelector('script[type="application/ld+json"]')) return;
      var pathname = window.location.pathname;
      var title    = document.title || '';
      var metaDesc = document.querySelector('meta[name="description"]');
      var desc     = metaDesc ? (metaDesc.getAttribute('content') || '') : '';
      var metaCan  = document.querySelector('link[rel="canonical"]');
      var canon    = metaCan ? (metaCan.getAttribute('href') || '') : '';
      if (!canon) canon = 'https://rawweights.com' + pathname;
      var pub      = { '@type': 'Organization', name: 'RawWeights', url: 'https://rawweights.com' };
      var schema   = null;

      if (/^\/blog\//.test(pathname)) {
        schema = { '@context': 'https://schema.org', '@type': 'Article',
                   headline: title, description: desc, url: canon, publisher: pub };
      } else if (/^\/guide\//.test(pathname)) {
        schema = { '@context': 'https://schema.org', '@type': 'LearningResource',
                   name: title, description: desc, url: canon,
                   educationalLevel: 'advanced', publisher: pub };
      } else if (/^\/tools\//.test(pathname) || pathname === '/srt.html') {
        schema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication',
                   name: title, description: desc, url: canon,
                   applicationCategory: 'EducationalApplication', operatingSystem: 'Web Browser' };
      } else if (/^\/usecase\//.test(pathname)) {
        schema = { '@context': 'https://schema.org', '@type': 'Article',
                   headline: title, description: desc, url: canon,
                   about: { '@type': 'Thing', name: 'AI/ML case study' }, publisher: pub };
      } else if (/^\/portfolio\//.test(pathname)) {
        schema = { '@context': 'https://schema.org', '@type': 'CollectionPage',
                   name: title, description: desc, url: canon };
      }

      if (!schema) return;
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(schema);
      document.head.appendChild(s);
    } catch (_) {}
  }

  /* ── Pagefind metadata — OG image + type filter ─────────── */
  function injectPagefindMeta() {
    try {
      /* OG image → pagefind:image so results show thumbnails */
      var ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg && ogImg.getAttribute('content')) {
        if (!document.querySelector('meta[name="pagefind:image"]')) {
          var pm = document.createElement('meta');
          pm.name = 'pagefind:image';
          pm.content = ogImg.getAttribute('content');
          document.head.appendChild(pm);
        }
      }
      /* Page type → hidden span with data-pagefind-filter so Pagefind indexes it */
      if (document.getElementById('rw-pf-type')) return;
      var p  = window.location.pathname;
      var t  = '';
      if (/^\/blog\//.test(p))                              t = 'Blog';
      else if (/^\/guide\//.test(p))                        t = 'Guide';
      else if (/^\/tools\//.test(p) || p === '/srt.html')   t = 'Playground';
      else if (/^\/usecase\//.test(p))                      t = 'Usecase';
      else if (/^\/portfolio\//.test(p))                    t = 'Portfolio';
      if (t) {
        var span = document.createElement('span');
        span.id = 'rw-pf-type';
        span.setAttribute('data-pagefind-filter', 'type:' + t);
        span.style.cssText = 'display:none!important';
        document.body.appendChild(span);
      }
    } catch (_) {}
  }

  /* ── Main init ─────────────────────────────────────────────── */
  function init() {
    const container = document.getElementById('rw-nav');
    if (!container) return;
    if (container.dataset.rwNavInit) return; /* guard against double-init */
    container.dataset.rwNavInit = '1';

    injectAnnouncement();
    injectFavicons();
    injectWebMCP();
    injectStructuredData();
    injectPagefindMeta();
    container.innerHTML = buildHeaderHTML();

    updateThemeIcon();

    const themeBtn = document.getElementById('rw-theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    initScroll();
    initDropdowns();
    initMobile();
    initSearch();
    initCounters();

    // Run after all DOMContentLoaded handlers have fired (page persona systems initialize there)
    setTimeout(initPersona, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
