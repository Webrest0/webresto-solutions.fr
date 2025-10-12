/* ===== Drawer (3 traits) ===== */
const burgerBtn = document.getElementById('burgerBtn');
const drawer = document.getElementById('drawer');
burgerBtn?.addEventListener('click', ()=> drawer.classList.toggle('show'));
document.addEventListener('click', (e)=>{
  if(!drawer.contains(e.target) && !burgerBtn.contains(e.target)){ drawer.classList.remove('show'); }
});
document.querySelectorAll('.navlink').forEach(a=>a.addEventListener('click', ()=>drawer.classList.remove('show')));

/* ===== Modal Appeler ===== */
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const modalClose = document.getElementById('modalClose');
callBtn?.addEventListener('click', ()=> callModal.classList.add('show'));
modalClose?.addEventListener('click', ()=> callModal.classList.remove('show'));
callModal?.addEventListener('click', (e)=>{ if(e.target===callModal){ callModal.classList.remove('show'); }});

/* ===== Année footer ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Champs "Autre…" (thème + fonctionnalités) ===== */
const theme = document.getElementById('theme');
const themeOther = document.getElementById('theme-other');
theme?.addEventListener('change', ()=>{
  themeOther.style.display = theme.value === 'Autre' ? 'block' : 'none';
});

const featuresSel = document.getElementById('features');
const featuresOther = document.getElementById('features-other');
featuresSel?.addEventListener('change', ()=>{
  const hasOther = [...featuresSel.selectedOptions].some(o=>o.value==='Autre');
  featuresOther.style.display = hasOther ? 'block' : 'none';
});

function collectFeatures(){
  if(!featuresSel) return '';
  const list = [...featuresSel.selectedOptions].map(o=>o.value);
  const hasOther = list.includes('Autre');
  const otherTxt = (featuresOther?.value || '').trim();
  const base = list.filter(v=>v!=='Autre');
  return (hasOther && otherTxt) ? [...base, otherTxt].join(', ') : base.join(', ');
}

/* ===== EmailJS (envoi direct) ===== */
(() => { try{
  emailjs.init({ publicKey: 'XgRSTv-domSnc8RgY' }); // ta clé publique
}catch(e){} })();

const SERVICE_ID = 'service_8bw61yj';
const TEMPLATE_ID = 'template_9ok4wz8';

const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');
const sendBtn = document.getElementById('sendBtn');

function setStatus(msg, ok){
  statusEl.textContent = msg;
  statusEl.style.color = ok ? '#34c759' : '#ff453a';
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  setStatus('', true);

  // validations simples
  if(!form.checkValidity()){
    setStatus('Merci de remplir les champs requis (*).', false);
    return;
  }

  const payload = {
    user_name: document.getElementById('name').value.trim(),
    user_email: document.getElementById('email').value.trim(),
    user_phone: document.getElementById('phone').value.trim(),
    pack: document.getElementById('pack').value,
    theme: theme.value === 'Autre' ? (themeOther.value.trim() || 'Autre') : theme.value,
    colors: document.getElementById('colors').value.trim(),
    features: collectFeatures(),
    domain: document.getElementById('domain').value.trim(),
    contact_display: document.getElementById('contactDisplay').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  sendBtn.disabled = true;

  try{
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload);
    setStatus('✅ Mail envoyé. Merci !', true);
    form.reset();
    themeOther.style.display = 'none';
    featuresOther.style.display = 'none';
  }catch(err){
    console.error(err);
    setStatus('❌ Échec de l’envoi. Réessaie plus tard.', false);
  }finally{
    sendBtn.disabled = false;
  }
});