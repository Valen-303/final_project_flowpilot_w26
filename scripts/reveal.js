/* ============================================
   FlowPilot — Scroll Reveal
   Uses IntersectionObserver to add .revealed class
   when an element enters the viewport, triggering
   the CSS transition defined in base.css.

   Elements opt in by adding class="reveal".
   Optional: data-reveal-delay="120" for stagger.
   ============================================ */

(function () {
  'use strict';

  // Respect reduced-motion preference: show everything immediately, no animation
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  // Older browsers without IntersectionObserver: just show everything
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-reveal-delay');
        if (delay) {
          el.style.transitionDelay = delay + 'ms';
        }
        el.classList.add('revealed');
        // Once revealed, stop observing — animation runs only on first entry
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,            // trigger when 15% of element is visible
    rootMargin: '0px 0px -40px 0px'   // shift trigger up slightly so it feels like animation begins as element approaches view
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
