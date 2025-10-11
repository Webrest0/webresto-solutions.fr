// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  if (navLinks.classList.contains('open')) {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.right = '16px';
    navLinks.style.top = '64px';
    navLinks.style.padding = '12px';
    navLinks.style.background = '#0f1419';
    navLinks.style.border = '1px solid #202731';
    navLinks.style.borderRadius = '14px';
    navLinks.style.gap = '10px';
  } else {
    navLinks.removeAttribute('style');
  }
});

// Pour-qui carousel dots
const car = document.getElementById('pqCarousel');
const dotsWrap = document.getElementById('pqDots');

if (car && dotsWrap) {
  const items = [...car.children];
  items.forEach((_, i) => {
    const d = document.createElement('i');
    if (i === 0) d.classList.add('active');
    dotsWrap.appendChild(d);
  });

  const dots = [...dotsWrap.children];
  car.addEventListener('scroll', () => {
    const w = car.getBoundingClientRect().width;
    const idx = Math.round(car.scrollLeft / (w * 0.75)); // approx index
    dots.forEach((d,i)=> d.classList.toggle('active', i===idx));
  });
}