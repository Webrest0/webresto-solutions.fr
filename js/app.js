// ================== PARAMÈTRES ==================
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";
// Remplace ici si besoin :
const SITE_PIZZ_URL = "https://pizzamigo.netlify.app/";

// ================== MENU ==================
function toggleMenu(){
  document.querySelector('.drawer').classList.toggle('open');
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.menu-toggle')?.addEventListener('click', toggleMenu);

  // Exemple: lien Pizz'Amigo
  const pizz = document.getElementById('pizzLink');
  if (pizz) pizz.href = SITE_PIZZ_URL;

  // Carrousel
  initCarousel();

  // Boutons "Choisir ce pack"
  document.querySelectorAll('.choose-pack').forEach(btn=>{
    btn.addEventListener('click', () => {
      composeEmail(EMAIL, `Demande — ${btn.dataset.pack}`, `Bonjour,\n\nJe souhaite le pack: ${btn.dataset.pack}.\n\nMerci !`);
    });
  });

  // Contact: email unique
  document.getElementById('emailUnique')?.addEventListener('click', () => {
    composeEmail(EMAIL, "Demande de site", "Bonjour,\n\nParlez-moi de votre projet :\n");
  });

  // Mini formulaire (envoi via email compose)
  document.getElementById('quickForm')?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = (document.getElementById('qName').value || "").trim();
    const mail = (document.getElementById('qEmail').value || "").trim();
    const msg  = (document.getElementById('qMsg').value || "").trim();
    const subject = `Contact rapide — ${name || "Sans nom"}`;
    const body = `Nom: ${name}\nEmail: ${mail}\n\nMessage:\n${msg}`;
    composeEmail(EMAIL, subject, body);
  });
});

// ================== COMPOSE EMAIL (Gmail deep link avec fallback) ==================
function composeEmail(to, subject="", body=""){
  const enc = s => encodeURIComponent(s || "");
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const isIOS = /iphone|ipad|ipod/.test(ua);

  // 1) Essai Gmail app
  let appUrl = "";
  if (isAndroid) appUrl = `gmail://co?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`;
  if (isIOS)     appUrl = `googlegmail:///co?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`;

  // 2) Fallback web Gmail
  const webGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`;
  // 3) Fallback mailto
  const mailto = `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;

  // Tentative d'ouverture Gmail app, sinon bascule
  let tried = false;
  const t = setTimeout(()=>{
    if (tried) return;
    // Si Gmail web est accessible (et souvent connecté), on teste d'abord
    window.location.href = webGmail;
    setTimeout(()=>{ window.location.href = mailto; }, 800);
  }, 900);

  if (appUrl){
    tried = true;
    window.location.href = appUrl;
  } else {
    // pas de schéma app possible → web puis mailto
    window.location.href = webGmail;
    setTimeout(()=>{ window.location.href = mailto; }, 800);
  }
  setTimeout(()=>clearTimeout(t), 3000);
}

// ================== CAROUSEL ==================
function initCarousel(){
  const track = document.querySelector('.c-track');
  const slides = [...document.querySelectorAll('.c-slide')];
  const prev = document.querySelector('.c-prev');
  const next = document.querySelector('.c-next');
  const dotsWrap = document.querySelector('.c-dots');
  if (!track || slides.length === 0) return;

  // Dots
  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Aller au slide ${i+1}`);
    if (i===0) b.classList.add('active');
    b.addEventListener('click', ()=>goTo(i));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];

  let index = 0;
  const max = slides.length - 1;
  function goTo(i){
    index = Math.max(0, Math.min(max, i));
    const x = slides[index].offsetLeft - (track.clientWidth - slides[index].clientWidth)/2;
    track.scrollTo({ left: x, behavior: 'smooth' });
    dots.forEach(d=>d.classList.remove('active'));
    dots[index].classList.add('active');
  }
  function step(dir){ goTo(index + dir); }

  prev?.addEventListener('click', ()=>step(-1));
  next?.addEventListener('click', ()=>step(1));

  // Mise à jour à la main au scroll (au cas où)
  track.addEventListener('scroll', ()=>{
    const mid = track.scrollLeft + track.clientWidth/2;
    let nearest = 0; let best = Infinity;
    slides.forEach((s,i)=>{
      const center = s.offsetLeft + s.clientWidth/2;
      const d = Math.abs(center - mid);
      if (d < best){ best = d; nearest = i; }
    });
    if (nearest !== index){ index = nearest; dots.forEach(d=>d.classList.remove('active')); dots[index].classList.add('active'); }
  }, {passive:true});
}