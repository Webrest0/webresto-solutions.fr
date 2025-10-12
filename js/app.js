/* =====================
   CONFIG EmailJS (tes IDs)
   ===================== */
const EMAILJS_PUBLIC_KEY   = 'XgRSTv-domSnc8RgY';     // clé publique
const EMAILJS_SERVICE_ID   = 'service_8bw61yj';        // service Gmail (ton compte)
const EMAILJS_TEMPLATE_ID  = 'template_9ok4wz8';       // modèle “Contactez-nous”

// IMPORTANT : dans ton modèle EmailJS, assure-toi d’avoir ces variables :
// name, email, phone, pack, theme, colors, features, domain, contact, message

/* ============ Utils ============ */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* ============ Menu burger ============ */
const menuBtn = $('#menuBtn');
const drawer  = $('#drawer');
$$('.drawer-link', drawer).forEach(a => a.addEventListener('click', () => {
  drawer.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));
menuBtn.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

/* ============ Modal Appel ============ */
const callBtn = $('#callBtn');
const callModal = $('#callModal');
callBtn.addEventListener('click', () => callModal.showModal());
$$('[data-close]', callModal).forEach(b => b.addEventListener('click', ()=> callModal.close()));

/* ============ Aperçu “Voir le site” ============ */
const previewModal = $('#previewModal');
const previewFrame = $('#previewFrame');
$$('[data-preview]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    previewFrame.src = btn.getAttribute('data-preview');
    previewModal.showModal();
  });
});
$$('[data-close]', previewModal).forEach(b => b.addEventListener('click', ()=>{
  previewFrame.src = 'about:blank';
  previewModal.close();
}));

/* ============ Année footer ============ */
$('#year').textContent = new Date().getFullYear();

/* ============ Features multi-select ============ */
const FEATURES = [
  'Carte/menu','Formulaire commande','Paiement (Stripe)',
  'Horaires dynamiques','Google Maps','Galerie photos',
  'Newsletter','SEO local','Décide pour moi','Autre...'
];
const chipsWrap = $('#featuresChips');
const selectedFeatures = new Set();
FEATURES.forEach(label=>{
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'chip';
  chip.textContent = label;
  chip.addEventListener('click', ()=>{
    if (selectedFeatures.has(label)) {
      selectedFeatures.delete(label);
      chip.classList.remove('active');
    } else {
      selectedFeatures.add(label);
      chip.classList.add('active');
    }
  });
  chipsWrap.appendChild(chip);
});

/* ============ EmailJS ============ */
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = $('#orderForm');
const sendBtn = $('#sendBtn');
const formStatus = $('#formStatus');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  formStatus.textContent = '';
  sendBtn.disabled = true;

  // payload → DOIT matcher les variables du template
  const data = {
    name:   form.name.value.trim(),
    email:  form.email.value.trim(),
    phone:  form.phone.value.trim(),
    pack:   form.pack.value,
    theme:  form.theme.value,
    colors: form.colors.value.trim(),
    features: Array.from(selectedFeatures).join(', '),
    domain: form.domain.value.trim(),
    contact: form.contact.value.trim(),
    message: form.message.value.trim() || '(aucun)'
  };

  // mini-validation (champs obligatoires)
  if(!data.name || !data.email || !data.phone){
    formStatus.textContent = 'Veuillez remplir nom, e-mail et téléphone.';
    sendBtn.disabled = false;
    return;
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    form.reset();
    selectedFeatures.clear();
    $$('.chip.active').forEach(c=>c.classList.remove('active'));
    formStatus.textContent = '✅ Message envoyé. Je vous réponds vite !';
  } catch (err) {
    console.error(err);
    formStatus.textContent = '❌ Échec de l’envoi. Réessayez.';
  } finally {
    sendBtn.disabled = false;
  }
});