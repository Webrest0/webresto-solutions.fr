/* =========================
   Appeler (modal natif)
   ========================= */
(function setupCall(){
  const callBtn = document.getElementById('callBtn');
  if(!callBtn) return;
  callBtn.addEventListener('click', () => {
    // iOS/Android affichent la popup système sur click tel:
    window.location.href = 'tel:+33784674767';
    // Si pas de réponse, l’utilisateur peut appeler manuellement le second numéro affiché partout sur le site.
  });
})();

/* =========================
   Drawer (trois traits)
   ========================= */
(function setupDrawer(){
  const btn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('drawer');
  const close = document.getElementById('drawerClose');
  const backdrop = document.getElementById('drawerBackdrop');

  function open(){ drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); backdrop.hidden=false; }
  function hide(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); backdrop.hidden=true; }

  btn?.addEventListener('click', open);
  close?.addEventListener('click', hide);
  backdrop?.addEventListener('click', hide);
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click', hide));
})();

/* =========================
   Carrousel “Pour qui ?”
   (utilise tes 4 fichiers dans /Images)
   ========================= */
(function carousel(){
  const slides = [
    {src:'Images/restaurant.PNG',  label:'Restaurant'},
    {src:'Images/mariage.PNG',     label:'Mariage / Événement'},
    {src:'Images/artisan.PNG',     label:'Artisan / Service'},
    {src:'Images/association.PNG', label:'Association'}
  ];

  const track = document.getElementById('carouselTrack');
  if(!track) return;

  // injecte les slides
  track.innerHTML = slides.map(s => `
    <div class="carousel__slide">
      <img src="${s.src}" alt="${s.label}">
      <div class="theme-tag">${s.label}</div>
    </div>
  `).join('');

  const root = track.closest('[data-carousel]');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');

  function go(dir){
    const w = track.clientWidth;
    track.scrollBy({left: dir * w, behavior:'smooth'});
  }
  prev.addEventListener('click',()=>go(-1));
  next.addEventListener('click',()=>go(1));
})();

/* =========================
   Choisir un pack -> préremplit le formulaire
   (OFFRES verrouillées, on ne change pas l’UI)
   ========================= */
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const value = btn.getAttribute('data-pack');
    const sel = document.querySelector('select[name="pack"]');
    if(sel){
      sel.value = value;
      document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
    }
  });
});

/* =========================
   EmailJS — envoi formulaire
   (inclut le champ Contact à afficher)
   ========================= */
// Remplace ces constantes par tes vraies valeurs EmailJS
const EMAILJS_PUBLIC_KEY = 'VOTRE_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'VOTRE_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';

(function setupEmail(){
  const form = document.getElementById('orderForm');
  const status = document.getElementById('sendStatus');
  if(!form) return;

  // Prévenir zoom iOS sur focus (font-size 16px déjà en CSS)
  form.setAttribute('autocomplete','on');

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = 'Envoi…';

    const fd = new FormData(form);

    const payload = {
      name: fd.get('name') || '',
      email: fd.get('email') || '',
      phone: fd.get('phone') || '',
      pack: fd.get('pack') || '',
      theme: fd.get('theme') || '',
      features: (fd.getAll('features') || []).join(', '),
      colors: fd.get('colors') || '',
      domain: fd.get('domain') || '',
      contact_public: fd.get('contact_public') || '',
      message: fd.get('message') || ''
    };

    try{
      // init si EmailJS est chargé (optionnel si vous l’incluez via <script src="https://cdn.emailjs.com/sdk/3.11.0/email.min.js"></script>)
      if(window.emailjs?.init) emailjs.init(EMAILJS_PUBLIC_KEY);

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, EMAILJS_PUBLIC_KEY);
      status.textContent = '✅ Message envoyé. Merci !';
      form.reset();
    }catch(err){
      console.error(err);
      status.textContent = '❌ Échec de l’envoi. Réessaie plus tard.';
    }
  });
})();