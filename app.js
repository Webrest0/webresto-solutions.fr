// Micro-interactions : réduction de la navbar au scroll
let last = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY || 0;
  nav.style.boxShadow = y > 8 ? '0 8px 24px rgba(0,0,0,.25)' : 'none';
  last = y;
});
