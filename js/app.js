// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '10px';
      nav.style.position = 'absolute';
      nav.style.right = '12px';
      nav.style.top = '58px';
      nav.style.background = 'rgba(12,16,20,.98)';
      nav.style.border = '1px solid rgba(255,255,255,.08)';
      nav.style.borderRadius = '12px';
      nav.style.padding = '10px 12px';
    } else {
      nav.removeAttribute('style');
    }
  });
}

// Smooth scroll (ancres)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth',block:'start'});
      // referme le menu mobile
      if (nav.classList.contains('open')) { burger.click(); }
    }
  });
});