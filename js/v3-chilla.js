(function () {
  'use strict';

  async function fetchFragment(paths) {
    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) return await response.text();
      } catch (_) {}
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
      document.body.insertBefore(
        document.createRange().createContextualFragment(headerHtml),
        document.body.firstChild
      );
    }

    const footerHtml = await fetchFragment([
      '/includes/footer-v3.html',
      'includes/footer-v3.html',
      '../includes/footer-v3.html'
    ]);

    if (footerHtml && !document.querySelector('.v3-footer')) {
      document.body.appendChild(document.createRange().createContextualFragment(footerHtml));
    }
  }

  function getTheme() {
    try {
      const saved = window.localStorage.getItem('beaverly-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function wireShell() {
    applyTheme(getTheme());

    const themeToggle = document.querySelector('[data-theme-toggle]');
    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem('beaverly-theme', next); } catch (_) {}
      applyTheme(next);
    });

    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    function closeMenu() {
      mobileMenu?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }

    menuToggle?.addEventListener('click', () => {
      const open = mobileMenu?.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
    });

    mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    }, { passive: true });

    const header = document.querySelector('[data-v3-header]');
    const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  function wireReveals() {
    const items = document.querySelectorAll('.v3-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    items.forEach(item => observer.observe(item));
  }

  async function init() {
    await loadShell();
    wireShell();
    wireReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
