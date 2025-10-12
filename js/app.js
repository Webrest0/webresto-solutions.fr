// ------ Drawer (menu 3 traits)
const drawer = document.getElementById('drawer');
const toggle = document.getElementById('menuToggle');

function closeDrawer(){ drawer.setAttribute('aria-hidden', 'true'); }
function openDrawer(){ drawer.setAttribute('aria-hidden', 'false'); }

toggle?.addEventListener('click', () => {
  const hidden = drawer.getAttribute('aria-hidden') !== 'false';
  hidden ? openDrawer() : closeDrawer();
});
document.addEventListener('click', (e) => {
  if (!drawer.contains(e.target) && e.target !== toggle && drawer.getAttribute('aria-hidden') === 'false') {
    closeDrawer();
  }
});
// Fermer quand on clique un lien
document.querySelectorAll('.navlink').forEach(a => {
  a.addEventListener('click', closeDrawer);
});

// ------ Appel (modal 2 numéros)
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const closeEls = document.querySelectorAll('[data-close-modal]');

callBtn?.addEventListener('click', ()=> callModal.setAttribute('aria-hidden','false'));
closeEls.forEach(el => el.addEventListener('click', ()=> callModal.setAttribute('aria-hidden','true')));

// ------ EmailJS : envoi du formulaire
const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

function collectFeatures(){
  const checked = [...document.querySelectorAll('input[name="features"]:checked')].map(i=>i.value);
  const otherChk = document.getElementById('otherFeatChk');
  const otherVal = document.getElementById('otherFeat')?.value?.trim();
  if (otherChk?.checked && otherVal) checked.push(`Autre: ${otherVal}`);
  return checked.join(', ');
}

// activer champ "Autre…" quand coché
const otherChk = document.getElementById('otherFeatChk');
const otherBox = document.getElementById('otherFeatBox');
otherChk?.addEventListener('change', ()=> {
  otherBox.hidden = !otherChk.checked;
});

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = 'Envoi en cours…';

  const data = new FormData(form);

  // Vérifs simples (nom, email, phone requis)
  if(!data.get('name') || !data.get('email') || !data.get('phone')){
    statusEl.textContent = '⚠️ Merci de remplir les champs obligatoires (nom, e-mail, téléphone).';
    return;
  }

  const templateParams = {
    // Ces clés doivent correspondre à ton modèle EmailJS
    user_name: data.get('name'),
    user_email: data.get('email'),
    user_phone: data.get('phone'),
    pack: data.get('pack'),
    theme: data.get('theme'),
    colors: data.get('colors'),
    features: collectFeatures(),
    domain: data.get('domain'),
    public_contact: data.get('public_contact'),
    message: data.get('message') || '',
    subject: 'Commande' // objet
  };

  try{
    await emailjs.send('service_8bw61yj','template_9ok4wz8', templateParams);
    statusEl.textContent = '✅ Demande envoyée. Merci !';
    form.reset();
    otherBox.hidden = true;
  }catch(err){
    console.error(err);
    statusEl.textContent = '❌ Échec de l’envoi. Réessaie plus tard.';
  }
});

// ------ Carrousel (garde ton contenu, nav simple)
const track = document.getElementById('carouselTrack');
const prev = document.querySelector('.carousel .prev');
const next = document.querySelector('.carousel .next');
function scrollBySlide(dir){
  if(!track) return;
  const slide = track.querySelector('.slide');
  if(!slide) return;
  const w = slide.getBoundingClientRect().width + 16;
  track.scrollBy({left: dir*w, behavior:'smooth'});
}
prev?.addEventListener('click', ()=> scrollBySlide(-1));
next?.addEventListener('click', ()=> scrollBySlide(1));