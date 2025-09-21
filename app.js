const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = nav?.querySelectorAll('a');
const yearEl = document.getElementById('year');
const brand = document.querySelector('.brand');
const logo = brand?.querySelector('.logo');
const brandText = brand?.querySelector('.brand-text');

burger?.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  burger.setAttribute('aria-expanded', String(isActive));
});

navLinks?.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (logo) {
  const hideLogo = () => {
    brand?.classList.add('no-logo');
    if (brandText) {
      brandText.classList.remove('sr-only');
    }
  };

  if (!logo.complete) {
    logo.addEventListener('error', hideLogo, { once: true });
    logo.addEventListener('load', () => {
      if (!logo.naturalWidth) {
        hideLogo();
      }
    }, { once: true });
  } else if (!logo.naturalWidth) {
    hideLogo();
  }
} else if (brand && brandText) {
  brand.classList.add('no-logo');
  brandText.classList.remove('sr-only');
}
