(function () {
  'use strict';

  function sendEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  }

  // Delegated click tracking keeps working for shared header/footer content
  // that is injected after DOMContentLoaded.
  document.addEventListener('click', (event) => {
    const origin = event.target instanceof Element ? event.target : null;
    if (!origin) return;

    const tierTarget = origin.closest('[data-tier]');
    if (tierTarget) {
      const tier = tierTarget.getAttribute('data-tier');
      if (tier) {
        sendEvent('tier_click', {
          event_category: 'pricing',
          event_label: `Selected ${tier} Tier`
        });
      }
    }

    const periodTarget = origin.closest('[data-period]');
    if (periodTarget) {
      const period = periodTarget.getAttribute('data-period');
      if (period) {
        sendEvent('pricing_period_change', {
          event_category: 'pricing',
          event_label: period
        });
      }
    }

    const trackedTarget = origin.closest('[data-track]');
    if (trackedTarget) {
      const label = trackedTarget.getAttribute('data-track');
      if (label) {
        sendEvent('cta_click', {
          event_category: 'navigation',
          event_label: label
        });
      }
    }
  });

  // Preserve the existing 50% scroll-depth event without firing repeatedly.
  let scrolledHalf = false;
  window.addEventListener('scroll', () => {
    if (scrolledHalf || !document.body) return;
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (!height) return;

    const scrolled = (window.scrollY + window.innerHeight) / height;
    if (scrolled >= 0.5) {
      scrolledHalf = true;
      sendEvent('scroll_halfway', {
        event_category: 'engagement',
        event_label: 'User Scrolled 50%'
      });
    }
  }, { passive: true });

  // Preserve the existing 30-second engagement event.
  window.setTimeout(() => {
    sendEvent('time_on_site_30s', {
      event_category: 'engagement',
      event_label: 'Stayed 30s+'
    });
  }, 30000);
})();