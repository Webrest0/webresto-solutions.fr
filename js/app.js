// === Drawer ===
const drawer = document.getElementById('drawer');
const menuBtn = document.getElementById('menuBtn');
const drawerClose = document.getElementById('drawerClose');
const backdrop = document.getElementById('backdrop');

function openDrawer() {
  drawer.classList.add('open');
  backdrop.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn?.addEventListener('click', () => {
  if (drawer.classList.contains('open')) closeDrawer(); else openDrawer();
});
drawerClose?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
drawer.querySelectorAll('.drawer-link').forEach(a => a.addEventListener('click', closeDrawer));

// === Call modal ===
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const closeCall = document.getElementById('closeCall');

callBtn?.addEventListener('click', () => callModal.showModal());
closeCall?.addEventListener('click', () => callModal.close());

// === Carousel (verrouillé au niveau contenu) ===
const slides = [...document.querySelectorAll('#forWhoCarousel .slide')];
const prev = document.getElementById('cPrev');
const next = document.getElementById('cNext');
let idx = 0;

function show(i){
  slides.forEach((s,k)=> s.classList.toggle('active', k===i));
}
prev?.addEventListener('click', ()=>{ idx = (idx - 1 + slides.length) % slides.length; show(idx); });
next?.addEventListener('click', ()=>{ idx = (idx + 1) % slides.length; show(idx); });

// (Optionnel) glissement tactile
let startX=null;
document.getElementById('forWhoCarousel')?.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;},{passive:true});
document.getElementById('forWhoCarousel')?.addEventListener('touchend',e=>{
  if(startX==null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if(Math.abs(dx)>40){ dx>0 ? prev.click() : next.click(); }
  startX=null;
},{passive:true});