// === COORDONNÉES ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// === MENU MOBILE ===
function toggleMenu() {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('open');
}

// === CAROUSEL ===
let index = 0;
function moveSlide(step) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.children.length;
  index = (index + step + slides) % slides;
  track.style.transform = `translateX(-${index * 310}px)`;
}

// === SCROLL FLUIDE ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// === AUTO FERMETURE DU MENU MOBILE ===
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.navbar');
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});

// === MISE À JOUR DES LIENS AUTOMATIQUES ===
document.addEventListener("DOMContentLoaded", () => {
  // bouton appel principal
  const callButtons = document.querySelectorAll('[href^="tel:"], .call-btn');
  callButtons.forEach(btn => btn.setAttribute("href", `tel:${PHONE_E164}`));

  // bouton mail (ouvre l'app Gmail si dispo)
  const mailButtons = document.querySelectorAll('a[href^="mailto:"], .contact-btn[href^="mailto:"]');
  mailButtons.forEach(btn => {
    btn.setAttribute(
      "href",
      `mailto:${EMAIL}?subject=Demande%20de%20site%20Web&body=Bonjour%2C%20je%20souhaite%20un%20site%20pour%20mon%20activité.`
    );
  });
});
