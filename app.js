// Burger menu (mobile)
const burger = document.getElementById('burger');
burger?.addEventListener('click', ()=>{
  const nav = document.querySelector('.nav');
  if(!nav) return;
  nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
  if(nav.style.display === 'flex'){
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(8,12,18,.96)';
    nav.style.position = 'absolute';
    nav.style.right = '16px';
    nav.style.top = '56px';
    nav.style.padding = '12px';
    nav.style.border = '1px solid rgba(255,255,255,.12)';
    nav.style.borderRadius = '12px';
    nav.style.gap = '10px';
  }
});
