/**
 * RawWeights Announcement Bar v3.0
 * -----------------------------------
 * Rotating carousel with prev/next arrow navigation.
 * Slides are baked into this file — run the update script after adding
 * new content so they stay fresh without any per-page data dependency.
 *
 * Update script:  node _private/scripts/update-announcement.js
 *
 * Optional per-page override (set before rw-nav.js loads):
 *
 *   window.RW_ANNOUNCE_CONFIG = {
 *     slides:   3,        // how many baked slides to show (default: 3)
 *     interval: 10000,    // ms per slide (default: 10000, min: 2000)
 *
 *     // Static mode — completely replaces baked slides on this page:
 *     static: [
 *       { label: 'Event', text: 'PatchConf 2026 — Nov 14', url: '/events.html' },
 *     ]
 *   };
 */
(function () {
  'use strict';

  /* ─── Baked slides (auto-updated by update-announcement.js) ─────
     Run:  node _private/scripts/update-announcement.js
     ──────────────────────────────────────────────────────────────── */
    /* @@BAKED_SLIDES_START@@ */
  var BAKED_SLIDES = [
    { label: "Usecase", text: "Debrief — Conference Memory & Networking Intelligence", url: "https://rawweights.com/usecase/debrief.html" },
    { label: "Blog", text: "Debrief — 9 Hours, 1 Graph, 14 People Remembered", url: "https://rawweights.com/usecase/debrief-film.html" },
    { label: "Guide", text: "AI Agent Observability — Why 200 OK Lies", url: "https://rawweights.com/usecase/observability.html" }
  ];
  /* @@BAKED_SLIDES_END@@ */

  var INTERVAL_VAR = '--rw-announce-interval';
  var HEIGHT_VAR   = '--rw-announce-height';
  var BAR_HEIGHT   = 40;   /* px — keep in sync with brand.css */
  var FADE_MS      = 220;  /* must match #rw-announce-stage transition in brand.css */

  /* ── Config merge ───────────────────────────────────────────── */
  var cfg = { slides: 3, interval: 10000, static: null };
  try {
    var u = window.RW_ANNOUNCE_CONFIG;
    if (u && typeof u === 'object') {
      if (typeof u.slides   === 'number') cfg.slides   = Math.max(1, u.slides);
      if (typeof u.interval === 'number') cfg.interval = Math.max(2000, u.interval);
      if (Array.isArray(u.static))        cfg.static   = u.static;
    }
  } catch (_) {}

  /* ── Helpers ────────────────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Build slides ───────────────────────────────────────────── */
  function buildSlides() {
    if (Array.isArray(cfg.static) && cfg.static.length) {
      return cfg.static.slice(0, cfg.slides).map(function (s) {
        return { label: String(s.label || 'New'), text: String(s.text || ''), url: s.url || null };
      });
    }
    return BAKED_SLIDES.slice(0, cfg.slides);
  }

  /* ── Render one slide into the stage element ────────────────── */
  function renderSlide(stage, slide) {
    stage.innerHTML =
      '<span id="rw-announce-label">' + esc(slide.label) + '</span>' +
      (slide.url
        ? '<span id="rw-announce-text"><a href="' + esc(slide.url) + '">' + esc(slide.text) + '</a></span>'
        : '<span id="rw-announce-text">' + esc(slide.text) + '</span>');
  }

  /* ── Restart progress bar ───────────────────────────────────── */
  function restartProgress(progress) {
    progress.classList.remove('running');
    void progress.offsetWidth;
    progress.classList.add('running');
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    var slides = buildSlides();
    if (!slides.length) return;

    document.documentElement.style.setProperty(HEIGHT_VAR,   BAR_HEIGHT + 'px');
    document.documentElement.style.setProperty(INTERVAL_VAR, cfg.interval + 'ms');

    /* ── Build bar DOM ────────────────────────────────────────── */
    var bar = document.createElement('div');
    bar.id = 'rw-announcement';
    bar.setAttribute('role', 'banner');
    bar.setAttribute('aria-label', 'Site announcement');

    var btnPrev = document.createElement('button');
    btnPrev.className = 'rw-announce-arrow';
    btnPrev.id = 'rw-announce-prev';
    btnPrev.type = 'button';
    btnPrev.setAttribute('aria-label', 'Previous announcement');
    btnPrev.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"' +
      ' fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M15 18l-6-6 6-6"/></svg>';

    var stage = document.createElement('div');
    stage.id = 'rw-announce-stage';
    stage.style.opacity = '0';

    var btnNext = document.createElement('button');
    btnNext.className = 'rw-announce-arrow';
    btnNext.id = 'rw-announce-next';
    btnNext.type = 'button';
    btnNext.setAttribute('aria-label', 'Next announcement');
    btnNext.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"' +
      ' fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M9 18l6-6-6-6"/></svg>';

    var progress = document.createElement('div');
    progress.id = 'rw-announce-progress';

    bar.appendChild(btnPrev);
    bar.appendChild(stage);
    bar.appendChild(btnNext);
    bar.appendChild(progress);
    document.body.insertBefore(bar, document.body.firstChild);

    /* Single slide — hide arrows */
    if (slides.length === 1) {
      bar.classList.add('rw-announce-single');
      renderSlide(stage, slides[0]);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { stage.style.opacity = '1'; });
      });
      return;
    }

    /* ── Carousel state ─────────────────────────────────────── */
    var idx    = 0;
    var paused = false;

    function showSlide(i, direction) {
      paused = true;
      stage.style.opacity = '0';
      setTimeout(function () {
        idx = ((i % slides.length) + slides.length) % slides.length;
        renderSlide(stage, slides[idx]);
        stage.style.opacity = '1';
        paused = false;
        restartProgress(progress);
      }, FADE_MS);
    }

    /* Auto-advance on progress bar end */
    progress.addEventListener('animationend', function () {
      if (!paused) showSlide(idx + 1);
    });

    /* Manual navigation */
    btnPrev.addEventListener('click', function () { showSlide(idx - 1); });
    btnNext.addEventListener('click', function () { showSlide(idx + 1); });

    /* Pause auto-advance on hover */
    bar.addEventListener('mouseenter', function () {
      paused = true;
      progress.style.animationPlayState = 'paused';
    });
    bar.addEventListener('mouseleave', function () {
      progress.style.animationPlayState = 'running';
      paused = false;
    });

    /* Show first slide */
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
