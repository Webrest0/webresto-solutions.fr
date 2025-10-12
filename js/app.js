/* ===== EmailJS (envoi direct sans ouvrir Mail/Gmail) ===== */
const EMAILJS_PUBLIC_KEY = 'XgRSTv-domSnc8RgY';
const EMAILJS_SERVICE_ID = 'service_8bw61yj';
const EMAILJS_TEMPLATE_ID = 'template_9ok4wz8';

(function(){ try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch(e){} })();

/* ===== Header / Menu ===== */
const burgerBtn   = document.getElementById('burgerBtn');
const sideMenu    = document.getElementById('sideMenu');
const closeMenu   = document.getElementById('closeMenu');
const menuBackdrop= document.getElementById('menuBackdrop');

function openMenu(){ sideMenu.classList.add('open'); menuBackdrop.classList.add('show'); sideMenu.setAttribute('aria-hidden','false'); }
function closeMenuFn(){ sideMenu.classList.remove('open'); menuBackdrop.classList.remove('show'); sideMenu.setAttribute('aria-hidden','true'); }

burgerBtn.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
menuBackdrop.addEventListener('click', closeMenuFn);
document.querySelectorAll('.side-link').forEach(a=>a.addEventListener('click', closeMenuFn));

/* ===== Call modal ===== */
const callBtn       = document.getElementById('callBtn');
const callModal     = document.getElementById('callModal');
const callBackdrop  = document.getElementById('callBackdrop');
const closeCall     = document.getElementById('closeCall');

function openCall(){ callModal.classList.add('show'); callBackdrop.classList.add('show'); }
function closeCallFn(){ callModal.classList.remove('show'); callBackdrop.classList.remove('show'); }

callBtn.addEventListener('click', openCall);
closeCall.addEventListener('click', closeCallFn);
callBackdrop.addEventListener('click', closeCallFn);

/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Carousel (verrouillé) ===== */
(function(){
  const track = document.querySelector('#portfolioCarousel .carousel__track');
  const prev = document.querySelector('#portfolioCarousel .prev');
  const next = document.querySelector('#portfolioCarousel .next');
  const scrollBy = () => track.clientWidth * 0.85;

  prev.addEventListener('click', ()=> track.scrollBy({left:-scrollBy(),behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left: scrollBy(),behavior:'smooth'}));
})();

/* ===== Offres : “Choisir ce pack” -> remplit le formulaire ===== */
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const val = btn.getAttribute('data-pack');
    const sel = document.getElementById('packSelect');
    if(sel) sel.value = val;
    document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
  });
});

/* ===== Sélecteur “Fonctionnalités à intégrer” (modifié selon tes règles) ===== */
(function(){
  const root = document.getElementById('featuresSelect');
  const button = root.querySelector('.select-like__button');
  const panel = root.querySelector('.select-like__panel');
  const label = root.querySelector('.select-like__label');
  const hidden = document.getElementById('featuresField');
  const otherRow = panel.querySelector('.option--other');
  const otherCb  = otherRow.querySelector('input[type="checkbox"]');
  const otherInp = otherRow.querySelector('.other-input');

  function updateLabel(){
    const vals = [...panel.querySelectorAll('input[type="checkbox"]:checked')].map(i=>i.value);
    const extra = (otherCb.checked && otherInp.value.trim()) ? ` (${otherInp.value.trim()})` : '';
    hidden.value = vals.join(', ') + extra;
    label.textContent = hidden.value || 'Aucun élément';
  }

  button.addEventListener('click', ()=>{
    const open = root.classList.toggle('open');
    button.setAttribute('aria-expanded', open ? 'true':'false');
    panel.setAttribute('aria-hidden', open ? 'false':'true');
  });

  panel.addEventListener('change', updateLabel);
  otherInp.addEventListener('input', updateLabel);

  document.addEventListener('click', (e)=>{
    if(!root.contains(e.target)){ root.classList.remove('open'); button.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true'); }
  });
})();

/* ===== Envoi du formulaire par EmailJS (sans application Mail) ===== */
const form = document.getElementById('orderForm');
const feedback = document.getElementById('formFeedback');
const sendBtn = document.getElementById('sendBtn');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();

  // validation minimale
  if(!form.name.value.trim()){ feedback.textContent = "Nom : obligatoire."; return; }
  if(!form.email.value.trim()){ feedback.textContent = "E-mail : obligatoire."; return; }

  sendBtn.disabled = true; feedback.textContent = "Envoi en cours…";

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    pack: form.pack.value,
    theme: form.theme.value,
    features: document.getElementById('featuresField').value,
    colors: form.colors.value.trim(),
    domain: form.domain.value.trim(),
    publicContact: form.publicContact.value.trim(),
    message: form.message.value.trim()
  };

  try{
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    feedback.textContent = "✅ Mail envoyé. Merci !";
    form.reset();
    // reset sélecteur “Fonctionnalités”
    document.getElementById('featuresField').value = "";
    document.querySelector('#featuresSelect .select-like__label').textContent = "Aucun élément";
  }catch(err){
    feedback.textContent = "❌ Échec de l’envoi. Réessaie plus tard.";
  }finally{
    sendBtn.disabled = false;
  }
});