/**
 * RawWeights Announcement Bar v2.0 — rotating carousel
 * -------------------------------------------------------
 * Auto-cycles through the latest N articles from window.SITE_CONTENT.
 * A progress bar shows time-to-next-slide. Pauses on hover.
 * Dismiss state persists in sessionStorage (reappears next session).
 *
 * Configuration (set window.RW_ANNOUNCE_CONFIG before this script):
 *
 *   window.RW_ANNOUNCE_CONFIG = {
 *     slides:   3,       // how many articles to cycle (default: 3)
 *     interval: 10000,   // ms per slide (default: 10000)
 *
 *     // Static mode — provide your own slides instead of site-content.js:
 *     static: [
 *       { label: 'New',   text: 'My custom message',  url: '/some-page.html' },
 *       { label: 'Guide', text: 'Another announcement', url: '/guide/rag.html' },
 *     ]
 *   };
 *
 * CSS is in brand.css (sections 3b). This script sets two CSS variables
 * on :root so the nav and body padding offset automatically:
 *   --rw-announce-height   (40px when visible, 0px when dismissed)
 *   --rw-announce-interval (mirrors cfg.interval for the CSS animation)
 */
(function () {
  'use strict';

  var DISMISS_KEY    = 'rw-announce-dismissed';
  var HEIGHT_VAR     = '--rw-announce-height';
  var INTERVAL_VAR   = '--rw-announce-interval';
  var BAR_HEIGHT     = 40; /* px — must match brand.css #rw-announcement height */
  var FADE_MS        = 220; /* matches brand.css #rw-announce-stage transition */

  /* ── Root URL detection ─────────────────────────────────────── */
  var ROOT = (function () {
    try {
      var s = document.currentScript;
      if (s && s.src) return s.src.split('?')[0].replace(/\/includes\/rw-announcement\.js$/, '/');
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

  /* ── Merge config ───────────────────────────────────────────── */
  var cfg = {
    slides:   3,
    interval: 10000,
    static:   null
  };
  try {
    var userCfg = window.RW_ANNOUNCE_CONFIG;
    if (userCfg && typeof userCfg === 'object') {
      if (typeof userCfg.slides   === 'number') cfg.slides   = Math.max(1, userCfg.slides);
      if (typeof userCfg.interval === 'number') cfg.interval = Math.max(2000, userCfg.interval);
      if (Array.isArray(userCfg.static))        cfg.static   = userCfg.static;
    }
  } catch (_) {}

  /* ── Build slides array ─────────────────────────────────────── */
  function buildSlides() {
    /* Static mode */
    if (Array.isArray(cfg.static) && cfg.static.length) {
      return cfg.static.slice(0, cfg.slides).map(function (s) {
        return {
          label: String(s.label || 'New'),
          text:  String(s.text  || ''),
          url:   s.url || null
        };
      });
    }

    /* Dynamic mode — site-content.js */
    try {
      if (window.SITE_CONTENT && Array.isArray(window.SITE_CONTENT.articles)) {
        return window.SITE_CONTENT.articles.slice(0, cfg.slides).map(function (a) {
          var title = String(a.title || 'Latest post');
          if (title.length > 82) title = title.slice(0, 79) + '…';
          return {
            label: String(a.type || 'New'),
            text:  title,
            url:   String(a.link || u('blog.html'))
          };
        });
      }
    } catch (_) {}

    /* Fallback */
    return [{
      label: 'Explore',
      text:  'New guides and playgrounds — explore the latest on RawWeights',
      url:   u('blog.html')
    }];
  }

  /* ── Render one slide into the stage element ────────────────── */
  function renderSlide(stage, slide) {
    var labelHTML = '<span id="rw-announce-label">' + esc(slide.label) + '</span>';
    var textHTML  = slide.url
      ? '<span id="rw-announce-text"><a href="' + esc(slide.url) + '">' + esc(slide.text) + '</a></span>'
      : '<span id="rw-announce-text">' + esc(slide.text) + '</span>';
    stage.innerHTML = labelHTML + textHTML;
  }

  /* ── Restart the progress bar animation ─────────────────────── */
  function restartProgress(progress) {
    progress.classList.remove('running');
    void progress.offsetWidth; /* force reflow so animation resets */
    progress.classList.add('running');
  }

  /* ── Dismiss the bar ────────────────────────────────────────── */
  function dismiss(bar) {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch (_) {}
    document.documentElement.style.setProperty(HEIGHT_VAR, '0px');
    bar.style.opacity = '0';
    bar.style.pointerEvents = 'none';
    setTimeout(function () { bar.style.display = 'none'; }, 260);
  }

  /* ── Main init ──────────────────────────────────────────────── */
  function init() {
    try { if (sessionStorage.getItem(DISMISS_KEY)) return; } catch (_) {}

    var slides = buildSlides();
    if (!slides.length) return;

    /* Set CSS variables so brand.css offsets nav + body automatically */
    document.documentElement.style.setProperty(HEIGHT_VAR,   BAR_HEIGHT + 'px');
    document.documentElement.style.setProperty(INTERVAL_VAR, cfg.interval + 'ms');

    /* Build bar DOM */
    var bar = document.createElement('div');
    bar.id = 'rw-announcement';
    bar.setAttribute('role', 'banner');
    bar.setAttribute('aria-label', 'Site announcement');

    var stage = document.createElement('div');
    stage.id = 'rw-announce-stage';
    stage.style.opacity = '0';

    var closeBtn = document.createElement('button');
    closeBtn.id = 'rw-announce-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Dismiss announcement');
    closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"' +
      ' fill="none" stroke="currentColor" stroke-width="2.5"' +
      ' stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    var progress = document.createElement('div');
    progress.id = 'rw-announce-progress';

    bar.appendChild(stage);
    bar.appendChild(closeBtn);
    bar.appendChild(progress);
    document.body.insertBefore(bar, document.body.firstChild);

    closeBtn.addEventListener('click', function () { dismiss(bar); });

    /* Single slide — no carousel needed */
    if (slides.length === 1) {
      renderSlide(stage, slides[0]);
      /* Fade in */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { stage.style.opacity = '1'; });
      });
      return;
    }

    /* ── Carousel ───────────────────────────────────────────── */
    var idx = 0;
    var paused = false;

    function showSlide(i) {
      stage.style.opacity = '0';
      setTimeout(function () {
        renderSlide(stage, slides[i]);
        stage.style.opacity = '1';
        if (!paused) restartProgress(progress);
      }, FADE_MS);
    }

    /* Progress bar end → advance slide */
    progress.addEventListener('animationend', function () {
      if (paused) return;
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    });

    /* Pause on hover */
    bar.addEventListener('mouseenter', function () {
      paused = true;
      progress.style.animationPlayState = 'paused';
    });
    bar.addEventListener('mouseleave', function () {
      paused = false;
      /* Resume from current slide, starting progress from 0 */
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    });

    /* Show first slide (fade in) */
    renderSlide(stage, slides[0]);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        stage.style.opacity = '1';
        restartProgress(progress);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
