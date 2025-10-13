/* ============================
   CONFIG — EmailJS (remplis tes vrais IDs)
============================ */
const EMAILJS_PUBLIC_KEY   = "XgRStV-domSnc8RgY";   // clé publique
const EMAILJS_SERVICE_ID   = "service_8bw61yj";    // service id
const EMAILJS_TEMPLATE_ID  = "template_9ok4wz8";   // template id

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

/* ============================
   Burger
============================ */
const burgerBtn  = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
  const open = !mobileMenu.hasAttribute('hidden');
  if (open) {
    mobileMenu.setAttribute('hidden', '');
    burgerBtn.setAttribute('aria-expanded', 'false');
  } else {
    mobileMenu.removeAttribute('hidden');
    burgerBtn.setAttribute('aria-expanded', 'true');
  }
});
// Ferme le menu quand on clique un lien
document.querySelectorAll('.mobile-nav .m-link').forEach(a=>{
  a.addEventListener('click', () => {
    mobileMenu.setAttribute('hidden', '');
    burgerBtn.setAttribute('aria-expanded','false');
  });
});
// Smooth scroll (ancre)
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

/* ============================
   Carousel “Pour qui ?” — 1 slide centrée
============================ */
const track  = document.getElementById('carousel_track');
const prev   = document.getElementById('carousel_prev');
const next   = document.getElementById('carousel_next');

function centerTo(index){
  const slide = track.children[index];
  const left  = slide.offsetLeft - (track.clientWidth - slide.clientWidth)/2;
  track.scrollTo({ left, behavior:'smooth' });
}
function currentIndex(){
  const slides = [...track.children];
  const mid = track.scrollLeft + track.clientWidth/2;
  return slides.reduce((idx, el, i) => {
    const center = el.offsetLeft + el.clientWidth/2;
    return Math.abs(center - mid) < Math.abs(slides[idx].offsetLeft + slides[idx].clientWidth/2 - mid) ? i : idx;
  }, 0);
}
prev.addEventListener('click', ()=> centerTo(Math.max(0, currentIndex()-1)));
next.addEventListener('click', ()=> centerTo(Math.min(track.children.length-1, currentIndex()+1)));
window.addEventListener('resize', ()=> centerTo(currentIndex()));
// au chargement
window.addEventListener('load', ()=> centerTo(0));

/* ============================
   Choisir un pack -> préremplir le formulaire (verrouillé visuel)
============================ */
document.querySelectorAll('.link-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const select = document.getElementById('pack');
    if (select){ select.value = btn.dataset.pack; }
  });
});

/* ============================
   Formulaire -> EmailJS
   (Uniquement la partie “public_contact” corrigée)
============================ */
const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Envoi…';

  const formData = new FormData(form);

  // Récupérer les features multiples
  const features = formData.getAll('features').join(', ');

  // Tolérance sur le champ de contact public
  const publicContact =
    formData.get('public_contact') ||
    formData.get('public_contact[]') ||
    formData.get('contact') || '';

  // Payload EXACTEMENT comme les variables EmailJS
  const payload = {
    name:   formData.get('name')   || '',
    email:  formData.get('email')  || '',
    phone:  formData.get('phone')  || '',
    pack:   formData.get('pack')   || '',
    theme:  formData.get('theme')  || '',
    colors: formData.get('colors') || '',
    features,
    domain: formData.get('domain') || '',
    public_contact: publicContact,    // <<<<<< correspond à {{public_contact}}
    message: formData.get('message') || ''
  };

  try {
    if (!window.emailjs) throw new Error('EmailJS non chargé');
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
    statusEl.textContent = 'Message envoyé ✅';
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Erreur lors de l’envoi. Vérifie tes clés EmailJS.';
  }
});