// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('.navlink').forEach(a=>{
  a.addEventListener('click', ()=> mobileNav.classList.remove('open'));
});

// ===== Modal appeler =====
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const closeCall = document.getElementById('closeCall');
callBtn.addEventListener('click', ()=> callModal.showModal());
closeCall.addEventListener('click', ()=> callModal.close());
callModal.addEventListener('click', (e)=>{
  // Ferme si clic hors carte
  const card = e.target.closest('.modal-card');
  if(!card) callModal.close();
});

// ===== Slider (garde le visuel existant) =====
const slider = document.querySelector('[data-slider]');
if (slider){
  const track = slider.querySelector('[data-slides]');
  const dots = slider.querySelector('[data-dots]');
  const slides = [...track.children];

  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    if(i===0) b.classList.add('active');
    b.addEventListener('click', ()=> {
      track.scrollTo({left: slides[i].offsetLeft - track.offsetLeft, behavior:'smooth'});
      dots.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
    });
    dots.appendChild(b);
  });

  slider.querySelector('[data-prev]').addEventListener('click', ()=>{
    track.scrollBy({left: -track.clientWidth*0.9, behavior:'smooth'});
  });
  slider.querySelector('[data-next]').addEventListener('click', ()=>{
    track.scrollBy({left: track.clientWidth*0.9, behavior:'smooth'});
  });
}

// ===== EmailJS (IDs que tu m’as montrés) =====
const EMAILJS_PUBLIC = 'XgRStV-domSnc8RgY';
const EMAILJS_SERVICE = 'service_8bw61yj';
const EMAILJS_TEMPLATE = 'template_9ok4wz8';

emailjs.init({ publicKey: EMAILJS_PUBLIC });

const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

function collectFeatures() {
  const values = [];
  document.querySelectorAll('input[name="features"]:checked').forEach(chk => values.push(chk.value));
  const other = (form.feature_other && form.feature_other.value || '').trim();
  if (other) values.push('Autre : ' + other);
  return values.join(', ');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.className = 'form-status';
  statusEl.textContent = 'Envoi…';

  // Champs nécessaires pour le template EmailJS
  const templateParams = {
    user_name: form.user_name.value.trim(),
    user_email: form.user_email.value.trim(),
    user_phone: form.user_phone.value.trim(),
    pack: form.pack.value,
    theme: form.theme.value,
    colors: form.colors.value.trim(),
    features: collectFeatures(),
    domain: form.domain.value.trim(),
    public_contact: form.public_contact.value.trim(),
    message: form.message.value.trim()
  };

  // contrôle minimal (affichage Nom/Email/Tel manquants résolu)
  if (!templateParams.user_name || !templateParams.user_email || !templateParams.user_phone){
    statusEl.classList.add('err');
    statusEl.textContent = 'Veuillez remplir Nom, E-mail et Téléphone.';
    return;
  }

  try{
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams);
    statusEl.classList.add('ok');
    statusEl.textContent = 'Message envoyé ✅';
    form.reset();
  }catch(err){
    statusEl.classList.add('err');
    statusEl.textContent = 'Échec de l’envoi. Réessaie plus tard.';
    console.error(err);
  }
});