/* ============================================
   FlowPilot — Use Cases Filter
   Click category chips to filter visible cards.
   ============================================ */

(function () {
  'use strict';

  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.case-card');
  const countEl = document.getElementById('result-count');
  const emptyEl = document.getElementById('cases-empty');

  if (!chips.length || !cards.length) return;

  function applyFilter(filter) {
    let visibleCount = 0;

    cards.forEach(function (card) {
      const category = card.getAttribute('data-category');
      const shouldShow = (filter === 'all' || category === filter);

      if (shouldShow) {
        card.hidden = false;
        visibleCount++;
      } else {
        card.hidden = true;
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = visibleCount;
    }

    // Show empty state if no results
    if (emptyEl) {
      emptyEl.hidden = visibleCount > 0;
    }
  }

  function setActiveChip(activeChip) {
    chips.forEach(function (chip) {
      const isActive = chip === activeChip;
      chip.classList.toggle('chip--active', isActive);
      chip.setAttribute('aria-selected', String(isActive));
    });
  }

  // Chip click handler
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const filter = chip.getAttribute('data-filter');
      setActiveChip(chip);
      applyFilter(filter);
    });
  });

  // Keyboard navigation: left/right arrow keys move between chips
  const chipsArray = Array.from(chips);

  chipsArray.forEach(function (chip, index) {
    chip.addEventListener('keydown', function (e) {
      let nextIndex = null;

      if (e.key === 'ArrowRight') {
        nextIndex = (index + 1) % chipsArray.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + chipsArray.length) % chipsArray.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = chipsArray.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextChip = chipsArray[nextIndex];
        nextChip.focus();
        nextChip.click();
      }
    });
  });
})();
