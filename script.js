// ===========================
// HEADER SCROLL
// ===========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===========================
// MENU HAMBURGUER
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// REMOVE # DA URL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    }
  });
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname);
      }, 100);
    }
  }
});

// ===========================
// INTERSECTION OBSERVER
// ===========================
const animated = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 85);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animated.forEach(el => observer.observe(el));

// ===========================
// COOKIE BANNER
// ===========================
const cookieBanner  = document.getElementById('cookieBanner');
const cookieAccept  = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (!localStorage.getItem('cookieChoice')) {
  cookieBanner.classList.add('visible');
}
cookieAccept.addEventListener('click', () => {
  localStorage.setItem('cookieChoice', 'accepted');
  cookieBanner.classList.remove('visible');
});
cookieDecline.addEventListener('click', () => {
  localStorage.setItem('cookieChoice', 'declined');
  cookieBanner.classList.remove('visible');
});