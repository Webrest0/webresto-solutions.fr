// menu mobile
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
if (btn) {
  btn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
}

// sécurité: empêcher les images de casser le layout
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = .25;
    img.alt = (img.alt || 'image') + ' (introuvable)';
  });
});

// carrousel inertie (optionnel – améliore le scroll horizontal)
document.querySelectorAll('[data-carousel]').forEach(w => {
  let isDown = false, startX, scrollLeft;
  w.addEventListener('mousedown', e => { isDown = true; w.classList.add('grab'); startX = e.pageX - w.offsetLeft; scrollLeft = w.scrollLeft; });
  w.addEventListener('mouseleave', ()=> isDown=false);
  w.addEventListener('mouseup',   ()=> isDown=false);
  w.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - w.offsetLeft;
    w.scrollLeft = scrollLeft - (x - startX)*1.2;
  });
});
