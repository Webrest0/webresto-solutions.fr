// Burger / Drawer
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawerClose');

function openDrawer(){ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); }
function closeDrawer(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }

burger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawer.addEventListener('click', (e)=>{ if(e.target.matches('.drawer__link')) closeDrawer(); });

// Carrousel
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const track = carousel.querySelector('[data-track]');
  const prev  = carousel.querySelector('[data-prev]');
  const next  = carousel.querySelector('[data-next]');
  const step = ()=> Math.max(260, carousel.clientWidth*0.6);
  prev.addEventListener('click', ()=> track.scrollBy({left:-step(), behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left: step(), behavior:'smooth'}));
});

// Choisir ce pack -> préremplit le formulaire
document.querySelectorAll('[data-choose-pack]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.getAttribute('data-choose-pack');
    const select = document.querySelector('#order-form select[name="pack"]');
    if(select){
      [...select.options].forEach(o=>{ if(o.textContent.startsWith(v)) o.selected=true; });
      document.getElementById('demander').scrollIntoView({behavior:'smooth'});
    }
  });
});

// Confort iOS : éviter zoom sur focus
document.querySelectorAll('input,select,textarea').forEach(el=>{
  el.addEventListener('touchstart', ()=>{ document.documentElement.style.fontSize='16px'; }, {passive:true});
});