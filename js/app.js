// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '64px';
      nav.style.padding = '12px 14px';
      nav.style.background = 'rgba(16,19,23,.95)';
      nav.style.border = '1px solid #2a323b';
      nav.style.borderRadius = '12px';
      nav.style.zIndex = '60';
    } else {
      nav.removeAttribute('style');
    }
  });
}

// Smooth scroll (ancre interne)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // refermer le menu sur mobile
        if (nav.classList.contains('nav--open')) {
          burger.click();
        }
      }
    }
  });
});
