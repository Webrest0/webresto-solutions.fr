// ====== Config EmailJS (envoi direct vers Gmail, sans app) ======
const EMAILJS_PUBLIC_KEY   = "REMPLACE_PAR_TA_PUBLIC_KEY";
const EMAILJS_SERVICE_ID   = "REMPLACE_PAR_TON_SERVICE_ID";
const EMAILJS_TEMPLATE_ID  = "REMPLACE_PAR_TON_TEMPLATE_ID";

// Charger EmailJS si clé fournie
(function loadEmailJS(){
  if(!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY.startsWith("REMPLACE")) return;
  const s = document.createElement('script');
  s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
  s.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY);
  document.head.appendChild(s);
})();

// ====== Bloquer le zoom (iOS/Android) ======
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());

// ====== Menu burger ======
const toggleBtn = document.querySelector('.menu-toggle');
const drawer = document.querySelector('.drawer');
toggleBtn?.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
});
drawer?.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=> {
    drawer.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
  });
});

// ====== Carousel simple ======
const car = document.querySelector('.carousel');
if(car){
  const track = car.querySelector('.car-track');
  const items = [...car.querySelectorAll('.car-item')];
  const left = car.querySelector('.left');
  const right = car.querySelector('.right');
  const dotsWrap = car.querySelector('.car-dots');
  let index = 0;

  items.forEach((_,i)=>{
    const b = document.createElement('button');
    if(i===0) b.classList.add('active');
    b.addEventListener('click', ()=>go(i));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  function go(i){
    index = (i+items.length)%items.length;
    track.scrollTo({left: items[index].offsetLeft, behavior:'smooth'});
    dots.forEach(d=>d.classList.remove('active'));
    dots[index].classList.add('active');
  }
  left.addEventListener('click', ()=>go(index-1));
  right.addEventListener('click', ()=>go(index+1));
}

// ====== Pré-sélection du pack depuis les cartes ======
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.dataset.pack;
    const select = document.getElementById('packSelect');
    if(select){ select.value = v; }
  });
});

// ====== Formulaire : envoi via EmailJS + reset + message ======
const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = '';

  // Validation simple
  const requiredFields = [...form.querySelectorAll('[required]')];
  const invalid = requiredFields.filter(f=>!f.value.trim());
  if(invalid.length){
    statusEl.style.color = '#ff9b9b';
    statusEl.textContent = "Merci de remplir tous les champs obligatoires.";
    invalid[0].focus();
    return;
  }

  // Récupération des valeurs
  const fd = new FormData(form);
  const features = [...form.querySelectorAll('input[name="features"]:checked')].map(i=>i.value);
  const payload = {
    name: fd.get('name'),
    email: fd.get('email'),
    phone: fd.get('phone'),
    pack: fd.get('pack'),
    theme: fd.get('theme'),
    colors: fd.get('colors') || '-',
    features: features.concat(fd.get('features_other') ? ["Autre: "+fd.get('features_other')] : []).join(', '),
    domain: fd.get('domain') || '-',
    public_contact: fd.get('public_contact'),
    message: fd.get('message') || '-'
  };

  // Si EmailJS configuré → envoi direct sans app mail
  if(window.emailjs && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID){
    try{
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
      statusEl.style.color = '#9fe39f';
      statusEl.textContent = "Votre commande a bien été envoyée !";
      form.reset();
      // décocher la case "Autre"
      form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    }catch(err){
      statusEl.style.color = '#ff9b9b';
      statusEl.textContent = "Échec d’envoi. Réessayez plus tard.";
      console.error(err);
    }
    return;
  }

  // Fallback mailto (si EmailJS pas configuré)
  const lines = [
    "Détaillez votre demande :",
    "",
    `Nom / Société : ${payload.name}`,
    `E-mail : ${payload.email}`,
    `Téléphone : ${payload.phone}`,
    "",
    `Pack souhaité : ${payload.pack}`,
    `Thème du site : ${payload.theme}`,
    `Couleurs souhaitées : ${payload.colors}`,
    "",
    `Fonctionnalités à intégrer : ${payload.features}`,
    "",
    `Nom de domaine souhaité : ${payload.domain}`,
    `Contact à afficher : ${payload.public_contact}`,
    "",
    `Message :`,
    `${payload.message}`
  ].join('%0D%0A');

  const mailto = `mailto:smarttlelearning@gmail.com?subject=Commande&body=${lines}`;
  try{
    window.location.href = mailto;
    statusEl.style.color = '#9fe39f';
    statusEl.textContent = "Votre commande a bien été préparée dans votre messagerie.";
    form.reset();
  }catch{
    statusEl.style.color = '#ff9b9b';
    statusEl.textContent = "Impossible d’ouvrir la messagerie.";
  }
});