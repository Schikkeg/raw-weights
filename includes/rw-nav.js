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
              { label: 'Mythos Report',        url: '/guide/mythos.html',                        desc: 'AI threats & safety — preview report' }
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
              { label: 'Vocab Forge',url: '/usecase/vocabforge-fine-tuning-guide.html',            desc: 'Fine-tuned model. Local inference. Habit tracking. Zero cloud.' }

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
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
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
    let html = '';
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
      <button class="rw-theme-btn" id="rw-theme-btn" type="button"></button>
      <a class="rw-cta-btn" href="${u(NAV_DATA.cta.url)}">${NAV_DATA.cta.label}</a>
    </div>
  </div>
</header>
<div class="rw-mobile-menu" id="rw-mobile-menu" aria-hidden="true">
  ${buildMobileNav()}
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

  /* ── Main init ─────────────────────────────────────────────── */
  function init() {
    const container = document.getElementById('rw-nav');
    if (!container) return;
    if (container.dataset.rwNavInit) return; /* guard against double-init */
    container.dataset.rwNavInit = '1';

    injectFavicons();
    container.innerHTML = buildHeaderHTML();

    updateThemeIcon();

    const themeBtn = document.getElementById('rw-theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    initScroll();
    initDropdowns();
    initMobile();
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
