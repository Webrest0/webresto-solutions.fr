/* ===========================
   EmailJS – Config
   Remplace si besoin par tes valeurs
   =========================== */
const EMAILJS_PUBLIC_KEY = "XgRSTv-domSnc8RgY";     // clé publique (Account > Général)
const EMAILJS_SERVICE_ID  = "service_8bw61yj";      // ID service (Gmail connecté)
const EMAILJS_TEMPLATE_ID = "template_9ok4wz8";     // ID du template “Contactez-nous”

emailjs.init(EMAILJS_PUBLIC_KEY);

/* ===========================
   Menu burger (ouvre/ferme + clic extérieur)
   =========================== */
const menuBtn  = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const scrim    = document.getElementById('scrim');

function closeMenu(){ sideMenu.classList.remove('open'); sideMenu.setAttribute('aria-hidden','true'); scrim.hidden = true; }
function openMenu(){ sideMenu.classList.add('open'); sideMenu.setAttribute('aria-hidden','false'); scrim.hidden = false; }

menuBtn.addEventListener('click', (e)=>{
  e.stopPropagation();
  if (sideMenu.classList.contains('open')) closeMenu(); else openMenu();
});

// fermer au clic en dehors + sur un lien
scrim.addEventListener('click', closeMenu);
sideMenu.querySelectorAll('.menu-link').forEach(a=>a.addEventListener('click', closeMenu));

/* ===========================
   Appeler – modal avec 2 numéros
   =========================== */
const callBtn    = document.getElementById('callBtn');
const callDialog = document.getElementById('callDialog');
callBtn.addEventListener('click', ()=> callDialog.showModal());
callDialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click', ()=>callDialog.close()));

/* ===========================
   Exemple – ouvrir l’aperçu en modal
   =========================== */
const seePizzAmigo = document.getElementById('seePizzAmigo');
const siteDialog   = document.getElementById('siteDialog');
seePizzAmigo.addEventListener('click', ()=> siteDialog.showModal());
siteDialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click', ()=>siteDialog.close()));

/* ===========================
   Formulaire – logique champs “Autre…”
   =========================== */
const theme       = document.getElementById('theme');
const themeOther  = document.getElementById('themeOther');
const featuresSel = document.getElementById('featuresSelect');
const featuresOther = document.getElementById('featuresOther');

theme.addEventListener('change', ()=>{
  if (theme.value === 'Autre…'){ themeOther.classList.remove('hide'); themeOther.focus(); }
  else { themeOther.classList.add('hide'); themeOther.value=''; }
});

featuresSel.addEventListener('change', ()=>{
  const values = Array.from(featuresSel.selectedOptions).map(o=>o.value);
  if (values.includes('Autre…')){ featuresOther.classList.remove('hide'); featuresOther.focus(); }
  else { featuresOther.classList.add('hide'); featuresOther.value=''; }
});

/* ===========================
   Formulaire – Envoi EmailJS
   =========================== */
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');
const sendBtn = document.getElementById('sendBtn');

orderForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  // validations simples (obligatoires)
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const phone   = document.getElementById('phone');
  const pack    = document.getElementById('pack');
  const colors  = document.getElementById('colors');
  const domain  = document.getElementById('domain');
  const display = document.getElementById('display');
  const message = document.getElementById('message');

  const required = [name,email,phone,pack,colors,domain,display];
  for (const f of required){
    if (!f.value.trim()){
      f.focus();
      formStatus.textContent = 'Veuillez remplir tous les champs obligatoires.';
      formStatus.classList.add('err');
      return;
    }
  }

  // thème (avec "Autre…")
  const themeValue = (theme.value === 'Autre…' && themeOther.value.trim())
    ? `Autre: ${themeOther.value.trim()}`
    : theme.value;

  // fonctionnalités (select multiple + "Autre…")
  const selected = Array.from(featuresSel.selectedOptions).map(o=>o.value);
  const idx = selected.indexOf('Autre…');
  if (idx > -1){
    selected.splice(idx,1);
    if (featuresOther.value.trim()) selected.push('Autre: ' + featuresOther.value.trim());
  }
  const features = selected.join(', ');

  // params pour EmailJS
  const params = {
    subject: 'Commande',
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    pack: pack.value,
    theme: themeValue,
    colors: colors.value.trim(),
    features,
    domain: domain.value.trim(),
    display: display.value.trim(),
    message: message.value.trim()
  };

  // envoyer
  sendBtn.disabled = true;
  sendBtn.textContent = 'Envoi…';
  try{
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    formStatus.textContent = '✅ Mail envoyé !';
    formStatus.classList.add('ok');
    orderForm.reset();
    // cacher champs “Autre…”
    themeOther.classList.add('hide'); themeOther.value='';
    featuresOther.classList.add('hide'); featuresOther.value='';
  }catch(err){
    console.error(err);
    formStatus.textContent = '❌ Échec de l’envoi. Réessaie plus tard.';
    formStatus.classList.add('err');
  }finally{
    sendBtn.disabled = false;
    sendBtn.textContent = 'Envoyer';
  }
});

/* ===========================
   Fermeture des modals au ESC et clic extérieur
   =========================== */
document.querySelectorAll('dialog').forEach(dlg=>{
  dlg.addEventListener('click', e=>{
    const card = dlg.querySelector('.modal-card');
    if (!card.contains(e.target)) dlg.close();
  });
});