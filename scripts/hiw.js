/* ============================================
   FlowPilot — How It Works
   Tab switching + auto-advance + hover pause.
   Keyboard navigation with arrow keys.
   ============================================ */

(function () {
  'use strict';

  const root = document.querySelector('.hiw');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.hiw__tab'));
  const panels = Array.from(root.querySelectorAll('.hiw__panel'));
  const progressBars = Array.from(root.querySelectorAll('.hiw__tab-progress'));
  const interval = parseInt(root.getAttribute('data-autoplay'), 10) || 5000;

  if (!tabs.length || !panels.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isPaused = false;
  let userInteracted = false;

  function showPanel(index) {
    // Update tabs
    tabs.forEach(function (tab, i) {
      const isActive = i === index;
      tab.classList.toggle('hiw__tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update panels + replay animations
    panels.forEach(function (panel, i) {
      const isActive = i === index;
      panel.classList.toggle('hiw__panel--active', isActive);
      panel.hidden = !isActive;

      if (isActive) {
        // Force reflow to replay CSS animations from scratch
        panel.classList.remove('is-animating');
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight;
        panel.classList.add('is-animating');
      } else {
        panel.classList.remove('is-animating');
      }
    });

    currentIndex = index;
    restartProgressBar();
  }

  function restartProgressBar() {
    // Reset all progress bars
    progressBars.forEach(function (bar) {
      bar.style.transition = 'none';
      bar.style.width = '0';
    });

    // After a frame, animate the active one (only if autoplay is running)
    if (!isPaused && !userInteracted) {
      requestAnimationFrame(function () {
        const activeBar = progressBars[currentIndex];
        if (activeBar) {
          activeBar.style.transition = `width ${interval}ms linear`;
          activeBar.style.width = '100%';
        }
      });
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (isPaused || userInteracted) return;
    autoplayTimer = setInterval(function () {
      const next = (currentIndex + 1) % tabs.length;
      showPanel(next);
    }, interval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplay() {
    isPaused = true;
    root.classList.add('is-paused');
    stopAutoplay();
    // Freeze the progress bar where it is
    const activeBar = progressBars[currentIndex];
    if (activeBar) {
      const computed = getComputedStyle(activeBar).width;
      activeBar.style.transition = 'none';
      activeBar.style.width = computed;
    }
  }

  function resumeAutoplay() {
    if (userInteracted) return;
    isPaused = false;
    root.classList.remove('is-paused');
    // Resume: reset progress bar and restart the interval fresh
    restartProgressBar();
    startAutoplay();
  }

  // Click on tab: switch and stop autoplay permanently (user took control)
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      userInteracted = true;
      stopAutoplay();
      root.classList.add('is-paused');
      showPanel(idx);
      // Clear all progress bars since autoplay is off
      progressBars.forEach(function (bar) {
        bar.style.transition = 'none';
        bar.style.width = '0';
      });
    });
  });

  // Keyboard navigation on tabs
  tabs.forEach(function (tab, index) {
    tab.addEventListener('keydown', function (e) {
      let nextIndex = null;
      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    });
  });

  // Pause on hover, resume on leave
  root.addEventListener('mouseenter', pauseAutoplay);
  root.addEventListener('mouseleave', resumeAutoplay);

  // Pause when any focusable element inside is focused (accessibility)
  root.addEventListener('focusin', pauseAutoplay);
  root.addEventListener('focusout', function (e) {
    // Only resume if focus leaves the whole component
    if (!root.contains(e.relatedTarget)) {
      resumeAutoplay();
    }
  });

  // Respect prefers-reduced-motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    userInteracted = true;  // disable autoplay
    root.classList.add('is-paused');
    return;
  }

  // Start: use IntersectionObserver so autoplay only runs when visible
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Trigger animation on the currently active panel when entering viewport
        const activePanel = panels[currentIndex];
        if (activePanel && !activePanel.classList.contains('is-animating')) {
          activePanel.classList.add('is-animating');
        }
        if (!userInteracted && !isPaused) {
          startAutoplay();
          restartProgressBar();
        }
      } else {
        stopAutoplay();
      }
    });
  }, { threshold: 0.3 });

  io.observe(root);
})();
