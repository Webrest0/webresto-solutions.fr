// ===== Burger / Side menu (verrouillé) =====
const burger = document.getElementById('burger');
const menu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const backdrop = document.getElementById('backdrop');

function openMenu(){ menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); burger.setAttribute('aria-expanded','true'); backdrop.hidden=false; }
function closeMenuFn(){ menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); burger.setAttribute('aria-expanded','false'); backdrop.hidden=true; }

burger?.addEventListener('click', openMenu);
closeMenu?.addEventListener('click', closeMenuFn);
backdrop?.addEventListener('click', closeMenuFn);

// ===== Carousel “Pour qui ?” corrigé =====
(function(){
  const viewport = document.getElementById('cViewport');
  if(!viewport) return;
  const track = viewport.querySelector('.carousel__track');
  const slides = [...track.children];
  let i = 0;

  const prev = document.getElementById('cPrev');
  const next = document.getElementById('cNext');

  function go(idx){
    i = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${i*100}%)`;
  }
  prev.addEventListener('click', ()=>go(i-1));
  next.addEventListener('click', ()=>go(i+1));
  go(0);
})();

// ===== Choisir pack -> pré-remplit le select (verrou) =====
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const sel = document.getElementById('packSelect');
    if(!sel) return;
    const label = btn.dataset.pack || '';
    if(label.includes('dashboard')) sel.value = 'Site avec dashboard';
    else if(label.includes('commandes')) sel.value = 'Site vitrine + commandes en ligne';
    else sel.value = 'Site vitrine';
  });
});

// ===== EmailJS (verrou : envoi seulement) =====
(function initEmail(){
  if(!window.emailjs) return;
  emailjs.init({ publicKey: 'XgRStV-domSnc8RgY' });
})();

const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if(!window.emailjs){ statusEl.textContent = "Erreur : EmailJS indisponible."; return; }

  const fd = new FormData(form);
  // Multi-select features (compatible mobile)
  let features = fd.getAll('features');
  if(!features.length && fd.get('features')) features = [fd.get('features')];

  const payload = {
    name: fd.get('name'),
    email: fd.get('email'),
    phone: fd.get('phone'),
    pack: fd.get('pack'),
    theme: fd.get('theme'),
    features: (features||[]).filter(Boolean).join(', '),
    colors: fd.get('colors'),
    domain: fd.get('domain'),
    contact: fd.get('contact_display'), // le template EmailJS doit utiliser {{contact}}
    message: fd.get('message')
  };

  statusEl.textContent = "Envoi en cours…";
  try{
    await emailjs.send('service_8bw61yj','template_9ok4wz8', payload);
    statusEl.textContent = "Message envoyé ✅";
    form.reset();
  }catch(err){
    statusEl.textContent = "Envoi impossible. Vérifie la connexion / clés EmailJS.";
    console.error(err);
  }
});

// ===== Empêche le zoom iOS lors de la saisie =====
window.addEventListener('gesturestart', e => e.preventDefault(), { passive:false });