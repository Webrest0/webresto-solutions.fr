// ========== NAV BURGER ==========
const burger = document.getElementById('btn-burger');
const menu   = document.getElementById('main-menu');
const backdrop = document.getElementById('menu-backdrop');

function closeMenu(){
  menu.classList.remove('open');
  backdrop.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}
function openMenu(){
  menu.classList.add('open');
  backdrop.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
}
burger.addEventListener('click', ()=> menu.classList.contains('open') ? closeMenu() : openMenu());
backdrop.addEventListener('click', closeMenu);
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ========== APPELER (2 numéros) ==========
const callDialog = document.getElementById('callDialog');
document.getElementById('btn-call').addEventListener('click', ()=> callDialog.showModal());
callDialog.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', ()=> callDialog.close()));

// ========== APERÇU DU SITE (restons sur la page) ==========
const siteDialog = document.getElementById('siteDialog');
const siteFrame  = document.getElementById('siteFrame');
document.querySelectorAll('[data-open-site]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    siteFrame.src = btn.getAttribute('data-open-site');
    siteDialog.showModal();
  })
});
siteDialog.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', ()=> {
  siteFrame.src = 'about:blank';
  siteDialog.close();
}));

// ========== SELECT "Autre" logique ==========
const theme = document.getElementById('theme');
const themeOther = document.getElementById('themeOther');
theme.addEventListener('change', ()=>{
  const isOther = theme.value === 'autre';
  themeOther.classList.toggle('dn', !isOther);
  if(!isOther) themeOther.value='';
});

const features = document.getElementById('features');
const featuresOther = document.getElementById('featuresOther');
features.addEventListener('change', ()=>{
  const isOther = Array.from(features.selectedOptions).some(o => o.value === 'autre');
  featuresOther.classList.toggle('dn', !isOther);
  if(!isOther) featuresOther.value='';
});

// ========== EMAILJS ==========
(function(){ emailjs.init({ publicKey: 'XgRStV-domSnc8RgY' }); })();

const form = document.getElementById('orderForm');
const statusBox = document.getElementById('formStatus');

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusBox.classList.remove('error');
  statusBox.textContent = 'Envoi en cours…';

  // construire le payload attendu par ton template
  const fd = new FormData(form);
  const selectedFeatures = Array.from(features.selectedOptions).map(o=>o.value).join(', ');

  const data = {
    // champs côté template EmailJS
    customer_name: fd.get('customer_name'),
    customer_email: fd.get('customer_email'),
    customer_phone: fd.get('customer_phone'),
    pack: fd.get('pack'),
    theme: fd.get('theme') === 'autre' ? (fd.get('theme_other')||'Autre') : fd.get('theme'),
    colors: fd.get('colors'),
    features: selectedFeatures + (featuresOther.classList.contains('dn') ? '' : `, ${fd.get('features_other')||''}`),
    domain: fd.get('domain'),
    public_contact: fd.get('public_contact'),
    message: fd.get('message') || '(aucun)'
  };

  try{
    await emailjs.send('service_8bw61yj','template_9ok4wz8', data);
    statusBox.textContent = '✅ Votre demande a bien été envoyée.';
    form.reset();
    themeOther.classList.add('dn');
    featuresOther.classList.add('dn');
  }catch(err){
    statusBox.classList.add('error');
    statusBox.textContent = '❌ Échec de l’envoi. Réessayez plus tard.';
    console.error(err);
  }
});