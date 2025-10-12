/* EmailJS */
const EMAILJS_PUBLIC_KEY  = 'XgRSTv-domSnc8RgY';
const EMAILJS_SERVICE_ID  = 'service_8bw61yj';
const EMAILJS_TEMPLATE_ID = 'template_9ok4wz8';

/* Helper */
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>[...r.querySelectorAll(s)];

/* Drawer */
const menuBtn=$('#menuBtn'), drawer=$('#drawer');
menuBtn.addEventListener('click',()=>{
  const open=drawer.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
$$('.drawer-link',drawer).forEach(a=>a.addEventListener('click',()=>{
  drawer.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

/* Modal Appel */
const callModal=$('#callModal');
$('#callBtn').addEventListener('click',()=>callModal.showModal());
$$('[data-close]',callModal).forEach(b=>b.addEventListener('click',()=>callModal.close()));

/* Modal Aperçu */
const previewModal=$('#previewModal'), previewFrame=$('#previewFrame');
$$('[data-preview]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    previewFrame.src=btn.getAttribute('data-preview');
    previewModal.showModal();
  });
});
$$('[data-close]',previewModal).forEach(b=>b.addEventListener('click',()=>{
  previewFrame.src='about:blank';
  previewModal.close();
}));

/* Footer Year */
$('#year').textContent=new Date().getFullYear();

/* EmailJS */
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form=$('#orderForm');
const statusEl=$('#formStatus');
const sendBtn=$('#sendBtn');

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  statusEl.textContent='';
  sendBtn.disabled=true;

  const featuresSel = $('#featuresSelect');
  const features = [...featuresSel.selectedOptions].map(o=>o.value).join(', ');

  const data={
    name:form.name.value.trim(),
    email:form.email.value.trim(),
    phone:form.phone.value.trim(),
    pack:form.pack.value,
    theme:form.theme.value,
    colors:form.colors.value.trim(),
    features,
    domain:form.domain.value.trim(),
    contact:form.contact.value.trim(),
    message:form.message.value.trim()||'(aucun)'
  };

  if(!data.name || !data.email || !data.phone){
    statusEl.textContent='Veuillez remplir nom, e-mail et téléphone.';
    sendBtn.disabled=false; return;
  }

  try{
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    form.reset();
    statusEl.textContent='✅ Message envoyé. Merci !';
  }catch(err){
    console.error(err);
    statusEl.textContent='❌ Échec de l’envoi. Réessayez.';
  }finally{
    sendBtn.disabled=false;
  }
});