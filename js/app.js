/* ---------- MENU ---------- */
const menuBtn   = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const menu      = document.getElementById('wr-menu');

function toggleMenu(show){
  const open = show ?? menu.hasAttribute('hidden');
  if(open){ menu.removeAttribute('hidden'); menuBtn.setAttribute('aria-expanded','true'); }
  else{ menu.setAttribute('hidden',''); menuBtn.setAttribute('aria-expanded','false'); }
}
menuBtn?.addEventListener('click', ()=>toggleMenu(true));
menuClose?.addEventListener('click', ()=>toggleMenu(false));
menu?.querySelectorAll('.menu-link').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));

/* ---------- CALL DIALOG ---------- */
const callBtn   = document.getElementById('callBtn');
const callDlg   = document.getElementById('callDialog');
const callClose = document.getElementById('callClose');
callBtn?.addEventListener('click', ()=>callDlg.showModal());
callClose?.addEventListener('click', ()=>callDlg.close());

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* ---------- CAROUSEL ---------- */
document.querySelectorAll('[data-carousel]').forEach(car=>{
  const track = car.querySelector('[data-track]');
  const prev  = car.querySelector('[data-prev]');
  const next  = car.querySelector('[data-next]');
  const step  = () => track.clientWidth * 0.8;
  prev.addEventListener('click', ()=> track.scrollBy({left:-step(), behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left: step(), behavior:'smooth'}));
});

/* ---------- EMAILJS (ENVOI DIRECT, PAS D’OUVERTURE GMAIL) ---------- */
const EMAILJS_PUBLIC  = 'XgRSTv-domSnc8RgY';      // ta clé publique
const EMAILJS_SERVICE = 'service_8bw61yj';        // ton service
const EMAILJS_TPL     = 'template_9ok4wz8';       // ton template

if(window.emailjs){
  emailjs.init({ publicKey: EMAILJS_PUBLIC });
}

const form = document.getElementById('orderForm');
const status = document.getElementById('formStatus');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  status.textContent = 'Envoi…';
  status.className = 'form-status';

  // construit les features cochées
  const fd = new FormData(form);
  const all = fd.getAll('features').filter(Boolean);
  const other = fd.get('features_other')?.trim();
  if(other) all.push('Autre: '+other);

  const payload = {
    client_name:     fd.get('client_name') || '',
    client_email:    fd.get('client_email') || '',
    client_phone:    fd.get('client_phone') || '',
    pack:            fd.get('pack') || '',
    theme:           fd.get('theme') || '',
    colors:          fd.get('colors') || '',
    domain:          fd.get('domain') || '',
    display_contact: fd.get('display_contact') || '',
    message:         fd.get('message') || '',
    features:        all.join(', ')
  };

  try{
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TPL, payload);
    status.textContent = '✓ Votre demande a bien été envoyée.';
    status.classList.add('ok');
    form.reset();
  }catch(err){
    console.error(err);
    status.textContent = '✗ Échec de l’envoi. Réessayez plus tard.';
    status.classList.add('err');
  }
});