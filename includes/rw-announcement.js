/**
 * RawWeights Announcement Bar v1.0
 * ----------------------------------
 * Renders a dismissible bar above the nav.
 * Reads latest article from window.SITE_CONTENT if available;
 * falls back to a static link to the blog.
 *
 * Usage: <script src="/includes/rw-announcement.js"></script>
 *        (include after data/site-content.js if dynamic content wanted)
 *
 * Dismiss state is stored in sessionStorage — bar reappears each session.
 * CSS is driven by brand.css; this script only sets --rw-announce-height
 * on :root to slide the nav down when the bar is visible.
 */
(function () {
  'use strict';

  var DISMISS_KEY   = 'rw-announce-dismissed';
  var ANNOUNCE_VAR  = '--rw-announce-height';
  var BAR_HEIGHT    = 40; /* px — must match #rw-announcement height in brand.css */

  /* ── Root URL detection ──────────────────────────────────────── */
  var ROOT = (function () {
    try {
      var s = document.currentScript;
      if (s && s.src) {
        return s.src.split('?')[0].replace(/\/includes\/rw-announcement\.js$/, '/');
      }
    } catch (_) {}
    return '/';
  })();

  function u(path) {
    if (!path) return '#';
    if (/^(https?:\/\/|mailto:|tel:)/.test(path)) return path;
    return ROOT + path.replace(/^\//, '');
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Build announcement inner HTML ──────────────────────────── */
  function buildContent() {
    var article = null;
    try {
      if (window.SITE_CONTENT &&
          Array.isArray(window.SITE_CONTENT.articles) &&
          window.SITE_CONTENT.articles.length) {
        article = window.SITE_CONTENT.articles[0];
      }
    } catch (_) {}

    if (article) {
      var type  = esc(String(article.type  || 'New'));
      var title = String(article.title || 'Latest post');
      if (title.length > 80) title = title.slice(0, 77) + '…';
      var link  = esc(String(article.link || u('blog.html')));
      return '<span id="rw-announce-label">' + type + '</span>' +
             '<span id="rw-announce-text"><a href="' + link + '">' + esc(title) + '</a></span>';
    }

    return '<span id="rw-announce-text">' +
           '<a href="' + u('blog.html') + '">' +
           'New guides and playgrounds &mdash; explore the latest on RawWeights &rarr;' +
           '</a></span>';
  }

  /* ── Dismiss ─────────────────────────────────────────────────── */
  function dismiss() {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch (_) {}
    document.documentElement.style.setProperty(ANNOUNCE_VAR, '0px');
    var bar = document.getElementById('rw-announcement');
    if (bar) {
      bar.style.opacity = '0';
      bar.style.pointerEvents = 'none';
      setTimeout(function () { bar.style.display = 'none'; }, 260);
    }
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    try { if (sessionStorage.getItem(DISMISS_KEY)) return; } catch (_) {}

    /* Set CSS variable so brand.css can shift header and body */
    document.documentElement.style.setProperty(ANNOUNCE_VAR, BAR_HEIGHT + 'px');

    var bar = document.createElement('div');
    bar.id = 'rw-announcement';
    bar.setAttribute('role', 'banner');
    bar.setAttribute('aria-label', 'Site announcement');
    bar.innerHTML = buildContent() +
      '<button id="rw-announce-close" type="button" aria-label="Dismiss announcement">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"' +
      ' fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>';

    /* Insert as first child of body so it's above everything */
    document.body.insertBefore(bar, document.body.firstChild);

    var closeBtn = document.getElementById('rw-announce-close');
    if (closeBtn) closeBtn.addEventListener('click', dismiss);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
