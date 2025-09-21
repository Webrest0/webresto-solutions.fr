const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const yearEl = document.getElementById('year');

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('active');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

yearEl && (yearEl.textContent = new Date().getFullYear());
