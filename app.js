/* ============================================================
   MOMIN SAAD AHEMAR — CV / Portfolio  (clone of BrextherFx.com)
   Interactivity: QR codes, mobile nav scroll-spy, footer year.
   ============================================================ */

(function () {
  'use strict';

  var GITHUB_URL = 'https://github.com/BrextherFx';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- QR codes (header + print) ---------- */
  function renderQR(elId, sizePx) {
    var el = document.getElementById(elId);
    if (!el || typeof qrcode === 'undefined') return;
    try {
      var qr = qrcode(0, 'M');          // type 0 = auto, error-correction M
      qr.addData(GITHUB_URL);
      qr.make();
      // cellSize/margin tuned so the SVG scales cleanly to the target box
      el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      var svg = el.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', sizePx);
        svg.setAttribute('height', sizePx);
        svg.style.width = sizePx + 'px';
        svg.style.height = sizePx + 'px';
        svg.style.display = 'block';
      }
    } catch (e) {
      /* QR is non-critical; ignore failures (e.g. offline) */
    }
  }

  renderQR('qr-header', 36);
  renderQR('qr-print', 56);

  /* ---------- Mobile bottom nav: smooth scroll + scroll-spy ---------- */
  var navButtons = Array.prototype.slice.call(document.querySelectorAll('.mn-btn'));

  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var sectionIds = navButtons.map(function (b) { return b.dataset.target; });

  function setActive(id) {
    navButtons.forEach(function (b) {
      b.classList.toggle('active', b.dataset.target === id);
    });
  }

  if ('IntersectionObserver' in window && sectionIds.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
