/* ============================================================
   PORTFOLIO — BOUDRAA KOCEILA
   Interactions : scroll reveal, navbar, menu mobile,
   retour en haut, parallax léger, formulaire de contact.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Année dynamique dans le footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Navbar : style au scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- 3. Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('mobile-open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ---------- 4. Apparition des sections au défilement ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 5. Bouton "Retour en haut" ---------- */
  const backToTop = document.getElementById('backToTop');

  const onScrollTop = () => {
    if (window.scrollY > 480) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
  onScrollTop();
  window.addEventListener('scroll', onScrollTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 6. Parallax léger sur les formes du hero ---------- */
  const blobs = document.querySelectorAll('.hero-blob');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && blobs.length) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = i % 2 === 0 ? 0.12 : -0.08;
        blob.style.transform = `translateY(${offset * speed}px)`;
      });
    }, { passive: true });
  }

  /* ---------- 7. Formulaire de contact (démonstration front-end) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Merci de remplir tous les champs.';
        formStatus.style.color = '#E4572E';
        return;
      }

      // Emplacement prévu pour l'envoi réel (API / contrôleur Razor Page / endpoint mail).
      // Exemple : appel fetch('/api/contact', { method: 'POST', body: JSON.stringify({...}) })

      formStatus.textContent = `Merci ${name} ! Votre message a bien été pris en compte.`;
      formStatus.style.color = '#14B8A6';
      contactForm.reset();
    });
  }

  /* ---------- 8. Mise en évidence du lien de navigation actif ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));

});
