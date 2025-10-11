// Menu burger
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('#nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = !nav.hasAttribute('hidden');
    if (open) nav.setAttribute('hidden', '');
    else nav.removeAttribute('hidden');
  });
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => nav.setAttribute('hidden', ''))
  );
}

// Scroll doux vers les sections
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});