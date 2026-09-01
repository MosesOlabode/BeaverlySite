(function () {
  'use strict';

  const CHILLA_URL = 'https://chilla.beaverlyai.com';

  async function fetchFragment(paths) {
    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) return await response.text();
      } catch (_) {
        // Try the next path.
      }
    }
    return '';
  }

  async function loadShell() {
    const headerHtml = await fetchFragment([
      '/includes/header-v3.html',
      'includes/header-v3.html',
      '../includes/header-v3.html'
    ]);

    if (headerHtml && !document.querySelector('[data-v3-header]')) {
      const fragment = document.createRange().createContextualFragment(headerHtml);
      document.body.insertBefore(fragment, document.body.firstChild);
    }

    const footerHtml = await fetchFragment([
      '/includes/footer-v3.html',
      'includes/footer-v3.html',
      '../includes/footer-v3.html'
    ]);

    if (footerHtml && !document.querySelector('.v3-footer')) {
      const fragment = document.createRange().createContextualFragment(footerHtml);
      document.body.appendChild(fragment);
    }
  }

  function getPreferredTheme() {
    try {
      const saved = window.localStorage.getItem('beaverly-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function wireShell() {
    applyTheme(getPreferredTheme());

    const themeToggle = document.querySelector('[data-theme-toggle]');
    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem('beaverly-theme', next); } catch (_) {}
      applyTheme(next);
    });

    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    function setMenuState(open) {
      mobileMenu?.classList.toggle('is-open', open);
      mobileMenu?.setAttribute('aria-hidden', String(!open));
      menuToggle?.setAttribute('aria-expanded', String(open));
      menuToggle?.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }

    function closeMenu() {
      setMenuState(false);
    }

    menuToggle?.addEventListener('click', () => {
      setMenuState(!mobileMenu?.classList.contains('is-open'));
    });

    mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    const header = document.querySelector('[data-v3-header]');
    const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  function wireHomeDemo() {
    const demo = document.querySelector('[data-home-demo]');
    if (!demo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const status = demo.querySelector('[data-home-demo-status]');
    const state = demo.querySelector('[data-home-demo-state]');
    const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));
    let started = false;

    function setStage(stage) {
      demo.classList.remove('is-goal', 'is-working', 'is-report', 'is-resetting');
      demo.classList.add(`is-${stage}`);

      if (stage === 'goal') {
        if (status) status.textContent = 'Goal';
        if (state) state.textContent = 'Given to Chilla';
      } else if (stage === 'working') {
        if (status) status.textContent = 'Working';
        if (state) state.textContent = 'Chilla is on it';
      } else {
        if (status) status.textContent = 'Report';
        if (state) state.textContent = 'Chilla reports back';
      }
    }

    async function run() {
      demo.classList.add('is-animated');

      while (document.body.contains(demo)) {
        // Move quickly enough that an impatient visitor immediately notices
        // the proof is animated, while leaving the actual copy readable.
        setStage('goal');
        await sleep(2800);

        setStage('working');
        await sleep(1400);

        setStage('report');
        await sleep(5000);

        demo.classList.add('is-resetting');
        await sleep(350);
      }
    }

    function start() {
      if (started) return;
      started = true;
      run();
    }

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start();
      });
    }, { threshold: 0.3 });

    observer.observe(demo);
  }

  function wireHomepage() {
    const composerText = document.querySelector('[data-composer-text]');
    const prompts = document.querySelectorAll('[data-prompt]');

    prompts.forEach((prompt) => {
      prompt.addEventListener('click', () => {
        prompts.forEach((item) => item.classList.remove('is-active'));
        prompt.classList.add('is-active');
        if (composerText) composerText.textContent = prompt.getAttribute('data-prompt') || 'What are you working towards?';
      });
    });

    document.querySelector('[data-go-chilla]')?.addEventListener('click', () => {
      window.location.href = CHILLA_URL;
    });

    const revealItems = document.querySelectorAll('.v3-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  async function init() {
    await loadShell();
    wireShell();
    wireHomepage();
    wireHomeDemo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();