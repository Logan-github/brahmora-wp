/* ═══════════════════════════════════════════════════════════════════
   BRAHMORA TECHNOLOGIES — Shared site behaviour
   Nav scroll state, mobile menu, accessible dropdowns, scroll reveal,
   smooth in-page scrolling and active-section highlighting.
   Every handler is defensive: it no-ops if the element is absent.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Theme toggle (light / dark) ──────────────────────────────── */
  // The no-FOUC inline script in each <head> has already applied the saved
  // theme before paint. Here we wire up the toggle button and keep it in sync.
  (function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById('themeToggle');

    var currentTheme = function () {
      return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    };
    var syncBtn = function () {
      if (!btn) return;
      var isLight = currentTheme() === 'light';
      btn.setAttribute('aria-pressed', String(isLight));
      btn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    };
    var apply = function (theme, persist) {
      if (theme === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      if (persist) { try { localStorage.setItem('theme', theme); } catch (e) {} }
      syncBtn();
    };

    syncBtn();
    if (btn) {
      btn.addEventListener('click', function () {
        apply(currentTheme() === 'light' ? 'dark' : 'light', true);
      });
    }

    // Follow the OS preference only when the user hasn't chosen explicitly.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: light)');
      var onChange = function (e) {
        var saved;
        try { saved = localStorage.getItem('theme'); } catch (err) {}
        if (!saved) apply(e.matches ? 'light' : 'dark', false);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  })();

  /* ── Nav shadow on scroll ─────────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScrollNav = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();
  }

  /* ── Mobile menu toggle ───────────────────────────────────────── */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the mobile menu after tapping a real link (not a dropdown trigger)
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Accessible dropdowns ─────────────────────────────────────── */
  // Desktop: CSS opens on hover/focus-within. JS keeps aria-expanded in
  // sync for keyboard/AT users and enables click-to-toggle + Escape.
  var isDesktop = function () { return window.innerWidth > 900; };
  document.querySelectorAll('.nav-trigger').forEach(function (btn) {
    var item = btn.closest('.nav-item');
    if (!item) return;

    var setExpanded = function (state) {
      btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    };

    // Reflect hover/focus open-state for assistive tech on desktop
    item.addEventListener('mouseenter', function () { if (isDesktop()) setExpanded(true); });
    item.addEventListener('mouseleave', function () { if (isDesktop()) setExpanded(false); });
    item.addEventListener('focusin', function () { setExpanded(true); });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) setExpanded(false);
    });

    // Click toggles (prevents the button acting as a dead link on mobile)
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    // Escape closes and returns focus to the trigger
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setExpanded(false);
        btn.focus();
      }
    });
  });

  /* ── Scroll reveal ────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      // Show everything immediately when motion is reduced or unsupported
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* ── Smooth in-page scrolling ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* ── Active in-page nav highlighting ──────────────────────────── */
  // Only for links pointing at same-page sections.
  var inPageLinks = Array.prototype.filter.call(
    document.querySelectorAll('.nav-menu a[href^="#"], .toc a[href^="#"]'),
    function (a) { return a.getAttribute('href').length > 1; }
  );
  var watched = inPageLinks
    .map(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      return sec ? { link: a, sec: sec } : null;
    })
    .filter(Boolean);

  if (watched.length) {
    var updateActive = function () {
      var pos = window.scrollY + 120;
      var current = watched[0];
      watched.forEach(function (w) {
        if (w.sec.offsetTop <= pos) current = w;
      });
      watched.forEach(function (w) {
        var on = w === current;
        w.link.classList.toggle('active', on);
        if (on) { w.link.setAttribute('aria-current', 'true'); }
        else { w.link.removeAttribute('aria-current'); }
      });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }
})();
