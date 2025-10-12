// ===== EmailJS init =====
emailjs.init('XgRStV-domSnc8RgY'); // Public Key

// ===== Drawer =====
const burgerBtn = document.getElementById('burgerBtn');
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function closeDrawer(){
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('show');
  burgerBtn.setAttribute('aria-expanded','false');
}
burgerBtn.addEventListener('click', () => {
  drawer.classList.toggle('open');
  drawerBackdrop.classList.toggle('show');
  burgerBtn.setAttribute('aria-expanded', drawer.classList.contains('open'));
});
drawerBackdrop.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(a=>{
  a.addEventListener('click', closeDrawer);
});

// ===== Call modal =====
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const modalBackdrop = document.getElementById('modalBackdrop');

function openModal(el){ el.classList.add('show'); modalBackdrop.classList.add('show'); }
function closeAnyModal(){ 
  document.querySelectorAll('.modal').forEach(m=>m.classList.remove('show')); 
  modalBackdrop.classList.remove('show'); 
}
callBtn.addEventListener('click', ()=> openModal(callModal));
modalBackdrop.addEventListener('click', closeAnyModal);
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click', closeAnyModal));

// ===== Preview PIZZ’AMIGO in modal (iframe) =====
const previewBtn = document.getElementById('previewBtn');
const previewModal = document.getElementById('previewModal');
const previewFrame = document.getElementById('previewFrame');
if (previewBtn){
  previewBtn.addEventListener('click', ()=>{
    previewFrame.src = 'https://pizz-amigo.netlify.app/';
    openModal(previewModal);
  });
}

// ===== Form logic =====
const orderForm = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

// Theme "Autre"
const themeSelect = document.getElementById('themeSelect');
const themeOther = document.getElementById('themeOther');
themeSelect.addEventListener('change', ()=>{
  if(themeSelect.value === 'Autre'){
    themeOther.classList.remove('hide');
    themeOther.required = true;
  } else{
    themeOther.classList.add('hide');
    themeOther.required = false;
    themeOther.value = '';
  }
});

// Features "Autre"
const featOtherChk = document.getElementById('featOtherChk');
const featOtherInput = document.getElementById('featOtherInput');
featOtherChk.addEventListener('change', ()=>{
  if(featOtherChk.checked){
    featOtherInput.classList.remove('hide');
    featOtherInput.focus();
  } else{
    featOtherInput.classList.add('hide');
    featOtherInput.value = '';
  }
});

// Submit to EmailJS
orderForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.className = 'form-status';
  statusEl.textContent = '';

  if(!orderForm.reportValidity()){
    return;
  }

  // Collect data
  const formData = new FormData(orderForm);
  // Build features (checkboxes)
  const features = Array.from(orderForm.querySelectorAll('input[name="features"]:checked'))
    .map(i=>i.value);
  if (featOtherChk.checked && featOtherInput.value.trim()){
    features.push('Autre: ' + featOtherInput.value.trim());
  }

  const themeValue = (themeSelect.value === 'Autre' && themeOther.value.trim())
    ? themeOther.value.trim()
    : themeSelect.value;

  // Map to EmailJS template variables
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    pack: formData.get('pack'),
    theme: themeValue,
    colors: formData.get('colors') || '',
    features: features.join(', '),
    domain: formData.get('domain') || '',
    public_contact: formData.get('public_contact'),
    message: formData.get('message') || ''
  };

  document.getElementById('sendBtn').disabled = true;

  try{
    await emailjs.send('service_8bw61yj', 'template_9ok4wz8', payload);
    statusEl.textContent = '✅ Formulaire envoyé avec succès.';
    statusEl.classList.add('ok');
    orderForm.reset();
    // Reset dynamic fields
    themeOther.classList.add('hide');
    featOtherInput.classList.add('hide');
    document.getElementById('sendBtn').disabled = false;
  }catch(err){
    statusEl.textContent = '❌ Échec de l’envoi. Réessaie plus tard.';
    statusEl.classList.add('err');
    document.getElementById('sendBtn').disabled = false;
    console.error(err);
  }
});