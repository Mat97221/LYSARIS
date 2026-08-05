// parallax.js — Anime les images de fond en fonction du défilement de la page
document.addEventListener('DOMContentLoaded', function () {
  // Respecte la préférence "réduire les animations" : un fond qui dérive au scroll est
  // exactement le genre d'effet que prefers-reduced-motion demande de désactiver.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxElements = document.querySelectorAll('.parallax-bg');

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(function (el) {
      // La vitesse peut être réglée par élément via data-speed (0.2 = lent, 0.6 = rapide)
      const speed = parseFloat(el.dataset.speed) || 0.3;
      const offset = scrollY * speed;
      el.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
    });
  }

  // requestAnimationFrame = on ne recalcule que quand le navigateur est prêt
  // à rafraîchir l'écran (évite les saccades et économise la batterie)
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateParallax();
});
