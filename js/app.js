// ===== Burger / Side menu =====
const burger = document.getElementById('burger');
const menu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const backdrop = document.getElementById('backdrop');

function openMenu() {
  menu.classList.add('open');
  menu.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
}
function closeMenuFn() {
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
}
burger?.addEventListener('click', openMenu);
closeMenu?.addEventListener('click', closeMenuFn);
backdrop?.addEventListener('click', closeMenuFn);

// ===== Carousel “Pour qui ?” (1 carte centrée) =====
(function initCarousel(){
  const viewport = document.getElementById('cViewport');
  if(!viewport) return;
  // wrap children inside inner flex (for smooth translate)
  const inner = document.createElement('div');
  inner.className = 'carousel__viewport-inner';
  while (viewport.firstChild) inner.appendChild(viewport.firstChild);
  viewport.appendChild(inner);

  const slides = [...inner.children];
  let i = 0;
  const prev = document.getElementById('cPrev');
  const next = document.getElementById('cNext');

  function go(idx){
    i = (idx + slides.length) % slides.length;
    inner.style.transform = `translateX(-${i*100}%)`;
  }
  prev.addEventListener('click', ()=>go(i-1));
  next.addEventListener('click', ()=>go(i+1));
  // start centered at first slide
  go(0);
})();

// ===== Choisir pack -> remplit le select du formulaire =====
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const pack = btn.dataset.pack || '';
    const sel = document.getElementById('packSelect');
    if(sel){
      [...sel.options].forEach(o=>{ if(o.textContent.includes(pack.split(' ')[1]||pack)) sel.value = o.textContent; });
    }
  });
});

// ===== EmailJS (envoi formulaire) =====
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
  // Compose payload pour ton template:
  const payload = {
    name: fd.get('name'),
    email: fd.get('email'),
    phone: fd.get('phone'),
    pack: fd.get('pack'),
    theme: fd.get('theme'),
    features: (fd.getAll('features') || fd.get('features') || []).toString(),
    colors: fd.get('colors'),
    domain: fd.get('domain'),
    contact_display: fd.get('contact_display'),
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

// ===== iOS zoom fix (gesture) =====
window.addEventListener('gesturestart', e => e.preventDefault(), { passive:false });