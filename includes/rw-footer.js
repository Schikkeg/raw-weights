/**
 * RawWeights Centralized Footer v1.0
 * ----------------------------------------
 * Usage:
 *   <!-- Optional: LinkedIn banner above footer -->
 *   <div id="rw-page-extra"></div>
 *
 *   <div id="rw-footer"
 *        data-linkedin="https://..."        <!-- optional LinkedIn URL -->
 *        data-linkedin-label="Read on LinkedIn" <!-- optional label -->
 *        data-related='[{"label":"...", "url":"..."}]'  <!-- optional JSON -->
 *   ></div>
 *   <script src="/includes/rw-footer.js?v=20260612"></script>
 *
 * Cache busting: bump ?v= when footer content changes.
 */
(function () {
  'use strict';

  /* ── Root URL detection (works with file:// and http://) ───── */
  const ROOT = (function () {
    try {
      const s = document.currentScript;
      if (s && s.src) {
        const bare = s.src.split('?')[0].split('#')[0];
        return bare.replace(/\/includes\/rw-footer\.js$/, '/');
      }
    } catch (_) {}
    return '/';
  })();

  function u(path) {
    if (!path) return '#';
    if (/^(https?:\/\/|mailto:|tel:)/.test(path)) return path;
    return ROOT + path.replace(/^\//, '');
  }

  /* ── Security helpers ──────────────────────────────────────── */
  function sanitizeUrl(raw) {
    if (!raw) return null;
    const s = String(raw).trim();
    if (/^(https?:\/\/|mailto:|tel:)/.test(s)) return s;
    if (/^\.?\//.test(s)) return s;
    return null;
  }
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ── SVG Icons ─────────────────────────────────────────────── */
  const ICONS = {
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" aria-hidden="true" style="width:26px;height:26px;border-radius:7px;flex-shrink:0">
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
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`
  };

  /* ── Footer data ───────────────────────────────────────────── */
  const FOOTER_DATA = {
    brand: {
      name: 'RawWeights',
      tagline: 'Raw Weights. Real Intelligence.',
      description: 'Exploring AI from raw fundamentals to applied intelligence — interactive playgrounds, in-depth guides, and field notes on building real systems.',
      url: '/'
    },
    columns: [
      {
        heading: 'Explore',
        links: [
          { label: 'ML Master Hub',       url: '/tools/master_ml_hub.html' },
          { label: 'Attention Journey',   url: '/tools/master_sequence_hub.html' },
          { label: 'Generative Modeling', url: '/tools/deep_generative_modeling.html' },
          { label: 'Reinforcement RL',    url: '/tools/deep_reinforcement.html' },
          { label: 'Simple Regression',   url: '/srt.html' }
        ]
      },
      {
        heading: 'Guides',
        links: [
          { label: 'RAG Guide',           url: '/guide/rag.html' },
          { label: 'LLM Post-Training',   url: '/guide/llm-post-training-guide.html' },
          { label: 'MCP Architecture',    url: '/guide/mcp.html' },
          { label: 'Agentic Strategy',    url: '/guide/adobe-cx-enterprise-ecosystem.html' },
          { label: 'LLM Lifecycle',       url: '/guide/full-lifecycle.html' }
        ]
      },
      {
        heading: 'Connect',
        links: [
          { label: 'Blog',                url: '/blog.html' },
          { label: 'Portfolio',           url: '/portfolio/index.html' },
          { label: 'LinkedIn',            url: 'https://www.linkedin.com/in/shamhc/', external: true },
          { label: 'X / Twitter',         url: 'https://x.com/intent/user?screen_name=shamhcs', external: true },
          { label: 'Disclaimer',          url: '/disclaimer.html' }
        ]
      }
    ],
    social: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shamhc/', icon: 'linkedin' },
      { label: 'X / Twitter', url: 'https://x.com/intent/user?screen_name=shamhcs', icon: 'twitter' }
    ],
    copyright: `© ${new Date().getFullYear()} RawWeights. All rights reserved.`
  };

  /* ── Build related pages section ───────────────────────────── */
  function buildRelated(related) {
    if (!related || !related.length) return '';
    return `<div style="background:var(--rw-bg-alt);border-top:1px solid var(--rw-border);padding:1.75rem 1.5rem;">
      <div style="max-width:1280px;margin:0 auto;">
        <p style="font-family:var(--rw-font-display,sans-serif);font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--rw-text-subtle,#94a3b8);margin-bottom:0.85rem;">Related</p>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
          ${related.map(r => `<a href="${u(r.url)}" style="display:inline-flex;align-items:center;gap:0.3rem;font-size:0.85rem;font-weight:500;color:var(--rw-text-muted);border:1px solid var(--rw-border);border-radius:9999px;padding:0.35rem 0.9rem;text-decoration:none;transition:all 0.15s;background:var(--rw-card);" onmouseover="this.style.borderColor='#f97316';this.style.color='#f97316';this.style.background='var(--rw-orange-light,#fff7ed)'" onmouseout="this.style.borderColor='var(--rw-border)';this.style.color='var(--rw-text-muted)';this.style.background='var(--rw-card)'">${r.label} ${ICONS.arrow}</a>`).join('')}
        </div>
      </div>
    </div>`;
  }

  /* ── Build LinkedIn banner ─────────────────────────────────── */
  function buildLinkedInBanner(url, label) {
    if (!url) return '';
    const text = label || 'Read the full article on LinkedIn';
    return `<div class="rw-linkedin-banner">
      <p>${ICONS.linkedin}&nbsp; ${text}</p>
      <a href="${url}" target="_blank" rel="noopener noreferrer">View on LinkedIn →</a>
    </div>`;
  }

  /* ── Build social icon ─────────────────────────────────────── */
  function buildSocialBtn(s) {
    return `<a class="rw-social-btn" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">${ICONS[s.icon] || s.label}</a>`;
  }

  /* ── Build footer column ───────────────────────────────────── */
  function buildColumn(col) {
    const links = col.links.map(l => {
      const ext = l.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<li><a href="${u(l.url)}"${ext}>${l.label}</a></li>`;
    }).join('');
    return `<div class="rw-footer-col"><h4>${col.heading}</h4><ul>${links}</ul></div>`;
  }

  /* ── Build full footer HTML ────────────────────────────────── */
  function buildFooterHTML(linkedinUrl, linkedinLabel, related) {
    const relatedHTML = buildRelated(related);
    const linkedinHTML = buildLinkedInBanner(linkedinUrl, linkedinLabel);
    return `${relatedHTML}${linkedinHTML}<footer class="rw-footer" role="contentinfo">
  <div class="rw-footer-main">
    <div class="rw-footer-brand-col">
      <a class="rw-footer-brand-logo" href="${u(FOOTER_DATA.brand.url)}">
        ${ICONS.logo}
        <span class="rw-footer-brand-name">Raw<span style="color:#f97316">W</span>eights</span>
      </a>
      <p class="rw-footer-tagline">${FOOTER_DATA.brand.tagline}</p>
      <p class="rw-footer-desc">${FOOTER_DATA.brand.description}</p>
      <div class="rw-footer-social">
        ${FOOTER_DATA.social.map(buildSocialBtn).join('')}
      </div>
    </div>
    ${FOOTER_DATA.columns.map(buildColumn).join('')}
  </div>
  <div class="rw-footer-bottom">
    <span class="rw-footer-copyright">${FOOTER_DATA.copyright}</span>
    <div class="rw-footer-bottom-links">
      <a href="${u('/blog.html')}">Blog</a>
      <a href="${u('/guide/rag.html')}">Guides</a>
      <a href="${u('/disclaimer.html')}">Disclaimer</a>
    </div>
  </div>
</footer>`;
  }

  /* ── Main init ─────────────────────────────────────────────── */
  function init() {
    const container = document.getElementById('rw-footer');
    if (!container) return;

    const linkedinUrl   = sanitizeUrl(container.getAttribute('data-linkedin'));
    const linkedinLabel = container.getAttribute('data-linkedin-label')
      ? escapeHtml(container.getAttribute('data-linkedin-label')) : null;
    let related = null;
    try {
      const raw = container.getAttribute('data-related');
      if (raw) {
        related = JSON.parse(raw)
          .filter(r => r && sanitizeUrl(r.url))
          .map(r => ({ label: escapeHtml(String(r.label || '')), url: sanitizeUrl(r.url) }));
      }
    } catch (_) {}

    container.outerHTML = buildFooterHTML(linkedinUrl, linkedinLabel, related);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
