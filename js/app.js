// Menu burger
const burger = document.getElementById('burger');
const nav = document.getElementById('navLinks');

if (burger) {
  burger.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.right = '12px';
      nav.style.background = '#0f1216';
      nav.style.padding = '12px';
      nav.style.border = '1px solid #ffffff22';
      nav.style.borderRadius = '12px';
      nav.style.boxShadow = '0 20px 50px #00000080';
    } else {
      nav.removeAttribute('style');
    }
  });
}

// Scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});