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

  function wireConversationDemo() {
    const thread = document.querySelector('.ch3-conversation .ch3-thread');
    if (!thread || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const composer = thread.querySelector('.ch3-mini-composer');
    const originalMessages = Array.from(thread.querySelectorAll('.ch3-message'));
    if (!composer || originalMessages.length < 3) return;

    const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));
    let cycle = 0;

    function typingIndicator() {
      const el = document.createElement('div');
      el.className = 'ch3-message chilla ch3-typing ch3-demo-dynamic';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<span></span><span></span><span></span>';
      thread.insertBefore(el, composer);
      requestAnimationFrame(() => el.classList.add('is-shown'));
      return el;
    }

    function dynamicMessage(kind, text, label) {
      const el = document.createElement('div');
      el.className = `ch3-message ${kind} ch3-demo-dynamic`;
      if (label) {
        const tag = document.createElement('span');
        tag.className = 'ch3-msg-label';
        tag.textContent = label;
        el.appendChild(tag);
      }
      const p = document.createElement('p');
      p.textContent = text;
      el.appendChild(p);
      thread.insertBefore(el, composer);
      requestAnimationFrame(() => el.classList.add('is-shown'));
      return el;
    }

    async function show(el, delay) {
      await sleep(delay);
      el.classList.add('is-shown');
    }

    async function run() {
      while (document.body.contains(thread)) {
        cycle += 1;
        thread.querySelectorAll('.ch3-demo-dynamic').forEach(el => el.remove());
        originalMessages.forEach(el => el.classList.remove('is-shown'));
        composer.classList.remove('is-active');

        await sleep(cycle === 1 ? 450 : 1100);
        composer.classList.add('is-active');
        await sleep(650);
        composer.classList.remove('is-active');

        await show(originalMessages[0], 220);
        let typing = typingIndicator();
        await sleep(850);
        typing.remove();
        await show(originalMessages[1], 80);

        typing = typingIndicator();
        await sleep(720);
        typing.remove();
        await show(originalMessages[2], 80);

        await sleep(1900);
        composer.classList.add('is-active');
        await sleep(520);
        composer.classList.remove('is-active');
        dynamicMessage('user', 'What happened today?');

        typing = typingIndicator();
        await sleep(780);
        typing.remove();
        dynamicMessage('chilla', 'I stayed out. Conditions didn’t fit the way we’re working toward your goal.', 'Chilla');

        await sleep(650);
        dynamicMessage('chilla', 'Nothing needs your attention right now. I’m still watching.');

        await sleep(4300);
      }
    }

    originalMessages.forEach(el => el.classList.add('ch3-demo-sequenced'));
    run();
  }

  async function init() {
    await loadShell();
    wireShell();
    wireReveals();
    wireConversationDemo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
