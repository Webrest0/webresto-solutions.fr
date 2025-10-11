// Menu burger (mobile)
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const opened = nav.style.display === 'flex';
    nav.style.display = opened ? 'none' : 'flex';
  });
}

// Scroll doux pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  });
});

// Sélecteur horizontal accessible (drag to scroll)
document.querySelectorAll('.carousel, .scroller').forEach(scroller => {
  let isDown = false, startX = 0, scrollLeft = 0;
  scroller.addEventListener('pointerdown', e => {
    isDown = true; startX = e.pageX; scrollLeft = scroller.scrollLeft; scroller.setPointerCapture(e.pointerId);
  });
  scroller.addEventListener('pointermove', e => {
    if (!isDown) return;
    scroller.scrollLeft = scrollLeft - (e.pageX - startX);
  });
  scroller.addEventListener('pointerup', () => { isDown = false; });
});