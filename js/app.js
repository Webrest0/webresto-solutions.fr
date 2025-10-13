// ===== BURGER MENU =====
const burger=document.getElementById('burger');
const menu=document.getElementById('sideMenu');
const closeMenu=document.getElementById('closeMenu');
const backdrop=document.getElementById('backdrop');
function openMenu(){menu.classList.add('open');backdrop.hidden=false;}
function closeMenuFn(){menu.classList.remove('open');backdrop.hidden=true;}
burger?.addEventListener('click',openMenu);
closeMenu?.addEventListener('click',closeMenuFn);
backdrop?.addEventListener('click',closeMenuFn);

// ===== CAROUSEL =====
(()=>{const viewport=document.getElementById('cViewport');if(!viewport)return;
const track=viewport.querySelector('.carousel__track');const slides=[...track.children];let i=0;
const prev=document.getElementById('cPrev');const next=document.getElementById('cNext');
function go(n){i=(n+slides.length)%slides.length;track.style.transform=`translateX(-${i*100}%)`;}
prev.addEventListener('click',()=>go(i-1));next.addEventListener('click',()=>go(i+1));go(0);})();

// ===== CHOISIR PACK =====
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const sel=document.getElementById('packSelect');
    if(!sel)return;
    const txt=btn.dataset.pack||'';
    sel.value=txt.includes('dashboard')?'Site avec dashboard':txt.includes('commandes')?'Site vitrine + commandes en ligne':'Site vitrine';
  });
});

// ===== EMAILJS =====
(function(){if(!window.emailjs)return;emailjs.init({publicKey:'XgRStV-domSnc8RgY'});})();
const form=document.getElementById('orderForm');
const statusEl=document.getElementById('formStatus');
form?.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!window.emailjs){statusEl.textContent='Erreur EmailJS';return;}
  const fd=new FormData(form);
  let features=fd.getAll('features');if(!features.length&&fd.get('features'))features=[fd.get('features')];
  const payload={
    name:fd.get('name'),
    email:fd.get('email'),
    phone:fd.get('phone'),
    pack:fd.get('pack'),
    theme:fd.get('theme'),
    features:(features||[]).join(', '),
    colors:fd.get('colors'),
    domain:fd.get('domain'),
    public_contact:fd.get('contact_display'), // ✅ correspond à {{public_contact}}
    message:fd.get('message')
  };
  statusEl.textContent='Envoi en cours...';
  try{
    await emailjs.send('service_8bw61yj','template_9ok4wz8',payload);
    statusEl.textContent='Message