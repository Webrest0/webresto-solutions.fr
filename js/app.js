// Menu mobile toggle
const hamb = document.getElementById('hamb');
const nav  = document.getElementById('nav');
if (hamb && nav) {
  hamb.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // petit overlay en mobile
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open')) {
      const within = nav.contains(e.target) || hamb.contains(e.target);
      if (!within) nav.classList.remove('open');
    }
  });
}

// Smooth scroll pour ancres
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Améliore le scroll-snap sur iOS
document.querySelectorAll('.carousel').forEach(c=>{
  c.addEventListener('wheel', (e)=>{
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      c.scrollBy({left: e.deltaY, behavior:'smooth'});
      e.preventDefault();
    }
  }, {passive:false});
});