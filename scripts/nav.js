/* ============================================
   FlowPilot — Navigation
   Minimal JS for mobile hamburger menu toggle.
   ============================================ */

(function () {
  'use strict';

  const hamburger = document.querySelector('.site-nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtns = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__close, .mobile-menu__close-top') : [];
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('nav a') : [];

  if (!hamburger || !mobileMenu) return;

  function setMenuState(isOpen) {
    hamburger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      mobileMenu.hidden = false;
      hamburger.setAttribute('aria-label', 'Close menu');
      // Lock both html and body to fully prevent background scroll on iOS/Safari
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.hidden = true;
      hamburger.setAttribute('aria-label', 'Open menu');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', function () {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Close when clicking any close button (top X or bottom Collapse)
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMenuState(false);
      hamburger.focus();
    });
  });

  // Close when clicking a nav link
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuState(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      hamburger.focus();
    }
  });

  // Reset state on desktop resize
  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', function (e) {
    if (e.matches) {
      setMenuState(false);
    }
  });
})();
