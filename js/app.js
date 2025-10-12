/* ========== EmailJS (envoi direct, pas d’ouverture Gmail) ========== */
const EMAILJS_PUBLIC  = "XgRSTv-domSnc8RgY";   // ta clé publique
const EMAILJS_SERVICE = "service_8bw61yj";     // service ID
const EMAILJS_TPL     = "template_9ok4wz8";    // template ID

document.addEventListener('DOMContentLoaded', () => {
  try { emailjs?.init({ publicKey: EMAILJS_PUBLIC }); } catch(e){}

  initMenu();
  initCall();
  initCarousel();
  initForm();
});

/* ========== Menu burger ========== */
function initMenu(){
  const btn = document.getElementById('menuBtn');
  const sheet = document.getElementById('wr-menu');
  const close = document.getElementById('menuClose');
  const links = sheet?.querySelectorAll('.menu-link')||[];

  if(!btn || !sheet) return;

  const open = ()=>{ sheet.hidden=false; btn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
  const hide = ()=>{ sheet.hidden=true; btn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };

  btn.addEventListener('click', ()=> sheet.hidden ? open() : hide());
  close?.addEventListener('click', hide);
  links.forEach(a=>a.addEventListener('click', hide));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && !sheet.hidden) hide(); });
  sheet.addEventListener('click', (e)=>{ if(e.target===sheet) hide(); });
}

/* ========== Dialog “Appeler” (2 numéros) ========== */
function initCall(){
  const openBtn = document.getElementById('callBtn');
  const dlg = document.getElementById('callDialog');
  const close = document.getElementById('callClose');
  if(!openBtn || !dlg) return;

  openBtn.addEventListener('click', ()=>{ try{ dlg.showModal(); }catch{ dlg.open = true; } });
  close?.addEventListener('click', ()=> dlg.close ? dlg.close() : (dlg.open=false));
  dlg.addEventListener('click', (e)=>{
    const r=dlg.getBoundingClientRect();
    const inBox = r.top<=e.clientY && e.clientY<=r.bottom && r.left<=e.clientX && e.clientX<=r.right;
    if(!inBox) dlg.close ? dlg.close() : (dlg.open=false);
  });
}

/* ========== Carousel ========== */
function initCarousel(){
  const root = document.querySelector('[data-carousel]');
  if(!root) return;
  const track = root.querySelector('[data-track]');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');

  const step = ()=> (track.querySelector('.c-item')?.getBoundingClientRect().width || track.clientWidth*0.8) + 14;

  prev?.addEventListener('click', ()=> track.scrollBy({left:-step(), behavior:'smooth'}));
  next?.addEventListener('click', ()=> track.scrollBy({left: step(), behavior:'smooth'}));
}

/* ========== Formulaire (🔒 ne pas toucher la structure) ========== */
function initForm(){
  const form = document.getElementById('orderForm');
  const status = document.getElementById('formStatus');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = 'Envoi…';
    status.className = 'form-status';

    const fd = new FormData(form);
    const features = Array.from(form.querySelectorAll('input[name="features"]:checked'))
      .map(i=>i.value);
    const other = fd.get('features_other')?.toString().trim();
    if(other) features.push('Autre: '+other);

    const payload = {
      client_name:     (fd.get('client_name')||'').toString().trim(),
      client_email:    (fd.get('client_email')||'').toString().trim(),
      client_phone:    (fd.get('client_phone')||'').toString().trim(),
      pack:            (fd.get('pack')||'').toString(),
      theme:           (fd.get('theme')||'').toString(),
      colors:          (fd.get('colors')||'').toString().trim(),
      domain:          (fd.get('domain')||'').toString().trim(),
      display_contact: (fd.get('display_contact')||'').toString().trim(),
      message:         (fd.get('message')||'').toString().trim(),
      features:        features.join(', ')
    };

    if(!payload.client_name){ status.textContent='Le nom est obligatoire.'; status.classList.add('err'); return; }
    if(!payload.client_email){ status.textContent='L’email est obligatoire.'; status.classList.add('err'); return; }

    try{
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TPL, payload);
      form.reset();
      status.textContent = '✅ Votre message a bien été envoyé.';
      status.classList.add('ok');
    }catch(err){
      console.error(err);
      status.textContent = '❌ Échec de l’envoi. Réessayez plus tard.';
      status.classList.add('err');
    }
  });
}