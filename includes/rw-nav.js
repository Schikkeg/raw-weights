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
        cols: 2,
        viewAll: { label: 'See all playgrounds', url: '/tools/master_ml_hub.html' },
        groups: [
          {
            heading: 'Core ML',
            items: [
              { label: 'ML Master Hub',          url: '/tools/master_ml_hub.html',            desc: 'Interactive ML sandbox — all models' },
              { label: 'Attention Journey',      url: '/tools/master_sequence_hub.html',       desc: 'RNNs → Transformers visual deep dive' },
              { label: 'CNN Explorer',           url: '/tools/cnn_sandbox.html',               desc: 'Convolutional network architecture' },
              { label: 'Generative Modeling',    url: '/tools/deep_generative_modeling.html',  desc: 'VAE, GAN & CycleGAN playground' }
            ]
          },
          {
            heading: 'Applied',
            items: [
              { label: 'Reinforcement Learning', url: '/tools/deep_reinforcement.html',        desc: 'Deep RL with policy gradients' },
              { label: 'Simple Regression',      url: '/srt.html',                             desc: 'Gradient descent visualizer' },
              { label: 'Limitations & Frontiers',url: '/tools/limitations-and-frontiers.html', desc: 'Edge cases and AI model boundaries' },
              { label: 'Build. Measure. Ship',   url: '/tools/eval-proving-ground.html',       desc: 'AI eval — the proving ground', badge: 'New' }
            ]
          }
        ]
      },
      {
        id: 'guides',
        label: 'Guides',
        cols: 3,
        viewAll: { label: 'Browse all guides', url: '/guide/rag.html' },
        groups: [
          {
            heading: 'ML Fundamentals',
            items: [
              { label: 'RAG Guide',              url: '/guide/rag.html',                           desc: 'Complete retrieval-augmented generation guide' },
              { label: 'LLM Post-Training',      url: '/guide/llm-post-training-guide.html',       desc: 'Fine-tune your own language model' },
              { label: 'MCP Architecture',       url: '/guide/mcp.html',                           desc: 'Model Context Protocol interactive guide' },
              { label: 'LLM Lifecycle',          url: '/guide/full-lifecycle.html',                desc: 'Full LLM architecture & production lifecycle' },
              { label: 'Fine-Tuning LLMs',       url: '/guide/fine-tuning-llm-guide.html',         desc: 'When to fine-tune — the specialist protocol' },
              { label: 'Fine-Tuning: Production',url: '/guide/fine-tuning-production.html',        desc: 'LoRA, alignment, synthetic data, GPU costs' }
            ]
          },
          {
            heading: 'Agentic Systems',
            items: [
              { label: 'Agentic AI Strategy',      url: '/guide/adobe-cx-enterprise-ecosystem.html',  desc: 'Strategic framework for agentic systems' },
              { label: 'Agent Autonomy Dial',      url: '/guide/agent-autonomy-dial.html',            desc: 'How much should an AI agent decide?' },
              { label: 'AI Security Stack',        url: '/guide/ai-security-stack-autopsy.html',      desc: 'Why legacy security misses AI agents' },
              { label: 'AI Threat Model',          url: '/guide/ai-security-threat-model.html',       desc: 'STRIDE, trust boundaries, security blueprint' },
              { label: 'Agent Security Guide',     url: '/guide/ai-security-redteam-brief.html',      desc: 'OWASP LLM Top 10 attacker playbook' },
              { label: 'Blueprint: Site Transform',url: '/guide/agent-blueprint-site-transform.html', desc: 'How an agent rebuilds a site end-to-end' }
            ]
          },
          {
            heading: 'Build & Deploy',
            items: [
              { label: 'RAG Pipeline Toolkit',   url: '/guide/rag-pipeline-toolkit.html',            desc: 'Production RAG pipeline patterns' },
              { label: "RAG Architect's Studio",  url: '/guide/rag-architects-studio.html',           desc: 'Advanced RAG design patterns' },
              { label: 'MCP Practitioner',        url: '/guide/mcp-practitioner-playbook.html',       desc: 'Hands-on MCP server patterns' },
              { label: 'AG2 Quick Reference',     url: '/guide/ag2-quickref.html',                    desc: 'AG2 — 10 key concepts from beta' },
              { label: 'The Compiler | LLM Wiki', url: '/guide/llm-wiki-compiler.html',               desc: 'When pre-compiled knowledge beats RAG' },
              { label: 'AI Observability',        url: '/usecase/observability.html',                 desc: 'Why 200 OK lies — telemetry for agents', badge: 'New' }
            ]
          }
        ]
      },
      {
        id: 'usecases',
        label: 'Use Cases',
        cols: 3,
        viewAll: { label: 'Browse all use cases', url: '/blog.html' },
        groups: [
          {
            heading: 'Recent Builds',
            items: [
              { label: 'Debrief',          url: '/usecase/debrief.html',               desc: 'Conference memory & networking intelligence', badge: 'New' },
              { label: 'ClaimLens',        url: '/usecase/claimlens.html',             desc: '3-agent fact-checker pipeline' },
              { label: 'TrustLens',        url: '/usecase/trustlens.html',             desc: 'AI vendor trust scorer' },
              { label: 'Plumber Lab',      url: '/usecase/plumber-lab.html',           desc: 'Pipeline security, visualized' },
              { label: 'TechDebt Copilot', url: '/usecase/tech-debt-copilot.html',     desc: 'AI agent for EOL & CVE audits' }
            ]
          },
          {
            heading: 'Agentic Builds',
            items: [
              { label: 'Briefd',        url: '/usecase/briefd.html',                desc: 'Personal reply agent with approval loop' },
              { label: 'TripRipple',    url: '/usecase/tripripple.html',            desc: 'Agent memory copilot for travel' },
              { label: 'BuildBridge',   url: '/usecase/buildbridge-ai.html',        desc: 'Article → GitHub repo in 30 seconds' },
              { label: 'AgentIntel',    url: '/usecase/agentintel-guide.html',      desc: '7-agent swarm for AI visibility' },
              { label: 'Signal Memory', url: '/usecase/mem0-b2b-signal-memory.html', desc: 'Beyond RAG — memory across sessions' }
            ]
          },
          {
            heading: 'Security & Edge',
            items: [
              { label: 'SecurityTwin',  url: '/usecase/securitytwin.html',                   desc: 'IDOR detection in an isolated app copy' },
              { label: 'ShadowShield',  url: '/usecase/shadowshield-ai.html',                desc: 'Swap PII before AI chatbots see it' },
              { label: 'SentTriage',    url: '/usecase/sent-triage.html',                    desc: 'Behavioral email classifier' },
              { label: 'VocabForge',    url: '/usecase/vocabforge-fine-tuning-guide.html',   desc: 'Fine-tuned model, local inference' },
              { label: 'SERP Delta',    url: '/usecase/serpdelta.html',                      desc: 'LLM knowledge staleness detector' }
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
    const badge = item.badge ? `<span class="rw-nav-badge">${item.badge}</span>` : '';
    return `<a class="rw-dropdown-item${active}" href="${u(item.url)}">
      <span class="rw-dropdown-item-label">${item.label}${badge}</span>
      ${item.desc ? `<span class="rw-dropdown-item-desc">${item.desc}</span>` : ''}
    </a>`;
  }

  /* ── Build desktop nav items ───────────────────────────────── */
  function buildDesktopNav() {
    return NAV_DATA.items.map(item => {
      if (item.groups) {
        const cols3 = item.cols === 3;
        const active = item.groups.some(g => g.items.some(i => isActive(i.url)));
        const viewAllHTML = item.viewAll
          ? `<div class="rw-dropdown-footer"><a class="rw-dropdown-viewall" href="${u(item.viewAll.url)}">${item.viewAll.label} →</a></div>`
          : '';
        return `<div class="rw-dropdown${active ? ' open-default' : ''}" data-dropdown="${item.id}">
          <button class="rw-nav-link rw-dropdown-trigger${active ? ' active' : ''}" type="button"
                  aria-haspopup="true" aria-expanded="false" aria-controls="rw-dd-${item.id}">
            ${item.label} ${ICONS.chevron}
          </button>
          <div class="rw-dropdown-menu rw-dropdown-wide${cols3 ? ' rw-dropdown-wide-3' : ''}" id="rw-dd-${item.id}" role="menu">
            <div class="rw-dropdown-cols${cols3 ? ' rw-dropdown-cols-3' : ''}">
              ${item.groups.map(g => `<div class="rw-dropdown-group">
                <div class="rw-dropdown-group-heading">${g.heading}</div>
                ${g.items.map(buildDropdownItem).join('')}
              </div>`).join('')}
            </div>
            ${viewAllHTML}
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
    /* Exposed for search page: apply same badge + thumbnail injection to any Pagefind container */
    window.__rw.watchResults = watchResults;

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
        /* On the search page, focus the hero input instead of opening the overlay */
        if (window.__rw && typeof window.__rw.fillHeroSearch === 'function') {
          var heroInp = document.getElementById('rw-sp-q');
          if (heroInp) { heroInp.focus(); heroInp.select(); return; }
        }
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

    /* Pre-load Pagefind eagerly so it is ready before any tool call arrives */
    var __rwPF = null;
    var __rwPFReady = import('/pagefind/pagefind.js').then(function (pf) {
      __rwPF = pf;
      return pf;
    }).catch(function () { return null; });

    mc.registerTool({
      name: 'search_rawweights',
      description: [
        'Search RawWeights for articles, guides, playgrounds, and use cases.',
        'Returns a `message` field (pre-formatted Markdown list) — present it directly to the user as your response.',
        'Also returns `results[]` for structured access: each item has url, title, excerpt, and sub_results[] (section-level deep-link anchors).',
        'If results is empty, direct the user to results_url to browse visually.'
      ].join(' '),
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string', description: 'Search term, topic, or question to find content for' } },
        required: ['query']
      },
      execute: function (p) {
        var query = (p && p.query) ? p.query : '';
        var resultsUrl = 'https://rawweights.com/search/?q=' + encodeURIComponent(query);

        function runSearch(pf) {
          if (!pf) return Promise.resolve({ query: query, results_url: resultsUrl, results: [], error: 'Pagefind unavailable' });
          return pf.search(query).then(function (res) {
            var top = (res && res.results || []).slice(0, 5);
            if (top.length === 0) return { query: query, results_url: resultsUrl, results: [] };
            return Promise.all(top.map(function (r) { return r.data(); })).then(function (items) {
              var results = items.map(function (d) {
                var pageUrl = /^https?:\/\//.test(d.url) ? d.url : 'https://rawweights.com' + d.url;
                return {
                  url: pageUrl,
                  title: (d.meta && d.meta.title) ? d.meta.title : pageUrl,
                  excerpt: (d.excerpt || '').replace(/<\/?mark>/g, ''),
                  sub_results: (d.sub_results || []).map(function (s) {
                    /* s.url from Pagefind already contains the full path + anchor hash */
                    var subUrl = s.url || '';
                    if (subUrl && !/^https?:\/\//.test(subUrl)) subUrl = 'https://rawweights.com' + subUrl;
                    return { title: s.title || '', url: subUrl || pageUrl };
                  })
                };
              });
              /* Pre-format as Markdown so agents can present it without parsing JSON */
              var lines = ['Here are the top results for **' + query + '**:\n'];
              results.forEach(function (r) {
                lines.push('- [' + r.title + '](' + r.url + ')');
                lines.push('  ' + r.excerpt);
                var subs = r.sub_results.filter(function (s) { return s.url !== r.url && s.title && s.url; });
                subs.forEach(function (s) { lines.push('  - [' + s.title + '](' + s.url + ')'); });
              });
              return { query: query, results_url: resultsUrl, results: results, message: lines.join('\n') };
            });
          }).catch(function (err) {
            return { query: query, results_url: resultsUrl, results: [], error: String(err) };
          });
        }

        /* Use cached module if ready, otherwise wait for the pre-load promise */
        return __rwPF ? runSearch(__rwPF) : __rwPFReady.then(runSearch);
      }
    });

    mc.registerTool({
      name: 'get_navigation',
      description: [
        'Returns the complete RawWeights site navigation: every section (Playgrounds, Guides, Use Cases, Blog) with each link\'s label, url, and one-line description.',
        'Use this to answer "what does this site cover?", "find me something about X", or to build a menu for the user.',
        'Each entry in sections[].links has a url — present these as clickable links to send the user to that page.',
        'To navigate the user: return the url from the matching link.',
        'To summarise the site: group and describe the sections array by section name.',
        'To find a specific topic: scan links[].desc for keywords, then return the matching url.'
      ].join(' '),
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: function () {
        var sections = [];
        NAV_DATA.items.forEach(function (item) {
          var links = [];
          if (item.url) {
            links.push({ label: item.label, url: 'https://rawweights.com' + item.url });
          }
          if (item.items) {
            item.items.forEach(function (i) {
              links.push({ label: i.label, url: 'https://rawweights.com' + i.url, desc: i.desc || '' });
            });
          }
          if (item.groups) {
            item.groups.forEach(function (g) {
              g.items.forEach(function (i) {
                links.push({ label: i.label, url: 'https://rawweights.com' + i.url, desc: i.desc || '' });
              });
            });
          }
          sections.push({ section: item.label, links: links });
        });
        return { site: 'RawWeights', baseUrl: 'https://rawweights.com', sections: sections };
      }
    });

    mc.registerTool({
      name: 'get_footer_links',
      description: 'Returns all links from the RawWeights site footer grouped by category (Playgrounds, Guides, Use Cases, Connect). Use this to discover supplementary pages or to help the user find a specific section.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: function () {
        var footer = document.querySelector('footer.rw-footer') || document.getElementById('rw-footer');
        var links = footer
          ? Array.from(footer.querySelectorAll('a[href]')).map(function (a) {
              return { text: a.textContent.trim(), url: a.href, path: a.getAttribute('href') };
            })
          : [];
        return { links: links, count: links.length };
      }
    });

    mc.registerTool({
      name: 'get_page_sections',
      description: [
        'Returns all h2/h3 section headings on a page as objects with: text (heading text), url (full deep-link anchor URL), level (h2 or h3).',
        'Two modes:',
        '(1) No url argument — inspects the page currently open in the browser.',
        '(2) url argument (e.g. "/guide/rag.html") — fetches that page and returns its sections without navigating away.',
        'After receiving sections: to find a specific section, do a case-insensitive keyword match on sections[].text.',
        'For example, if the user asks for the "evaluation section", match against "evaluation" and return the sections[].url of the match as a clickable link.',
        'Partial matches count — "Evaluation & Metrics" matches the keyword "evaluation".',
        'Always return sections[].url (not just the anchor) as the direct link the user can click.',
        'Always prefer mode (2) when the user asks about a specific page by name or after a search_rawweights call.'
      ].join(' '),
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Optional. Path or full URL of a RawWeights page to inspect, e.g. "/guide/rag.html". Omit to inspect the current page.'
          }
        },
        additionalProperties: false
      },
      execute: function (p) {
        function extractSections(doc, pageUrl) {
          var base = pageUrl.replace(/#.*$/, '');
          var body = doc.body || doc;
          return Array.from(doc.querySelectorAll('h2, h3')).map(function (h) {
            var id = h.id;
            /* If heading has no id, check closest ancestor section/div/article with one */
            if (!id && typeof h.closest === 'function') {
              var anc = h.closest('section[id], article[id], div[id]');
              if (anc && anc !== body) id = anc.id;
            }
            /* Fall back to a slug generated from the heading text */
            if (!id) {
              id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');
              h.id = id;
            }
            return { level: h.tagName.toLowerCase(), text: h.textContent.trim(), anchor: '#' + id, url: base + '#' + id };
          });
        }

        if (p && p.url) {
          var target = /^https?:\/\//.test(p.url) ? p.url : 'https://rawweights.com' + (p.url.charAt(0) === '/' ? '' : '/') + p.url;
          return fetch(target).then(function (resp) {
            return resp.text();
          }).then(function (html) {
            var doc = (new DOMParser()).parseFromString(html, 'text/html');
            var sections = extractSections(doc, target);
            return { page: target, sections: sections, count: sections.length };
          }).catch(function (err) {
            return { error: err.message, page: target, sections: [] };
          });
        }

        /* Current page mode */
        var base = window.location.origin + window.location.pathname;
        var sections = extractSections(document, base);
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
