// ombre nav au scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = (window.scrollY > 8) ? '0 8px 24px rgba(0,0,0,.25)' : 'none';
});
