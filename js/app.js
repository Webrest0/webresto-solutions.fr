// === COORDONNÉES ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// === MENU MOBILE ===
function toggleMenu() {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('open');
}
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});