// Menu burger mobile (iOS/Android)
const burger = document.getElementById('burger');
burger?.addEventListener('click', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  if (!open) {
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '60px';
    nav.style.right = '16px';
    nav.style.padding = '12px';
    nav.style.gap = '10px';
    nav.style.background = 'rgba(11,15,20,.98)';
    nav.style.border = '1px solid rgba(255,255,255,.12)';
    nav.style.borderRadius = '12px';
  }
});
