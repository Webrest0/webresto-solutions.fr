// === Config ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// === Menu mobile ===
const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (toggleBtn && menu) {
  const toggle = () => {
    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  };
  toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== toggleBtn) {
      menu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', "false");
      menu.setAttribute('aria-hidden', "true");
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', "false");
      menu.setAttribute('aria-hidden', "true");
    }
  });
}

// === Carousel ===
(function setupCarousel(){
  const root = document.querySelector('.carousel');
  if(!root) return;
  const track = root.querySelector('.track');
  const slides = [...root.querySelectorAll('.slide')];
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dots = root.querySelector('.dots');
  if(!slides.length) return;

  let index = 0;
  const makeDots = () => {
    dots.innerHTML = '';
    slides.forEach((_,i)=>{
      const b = document.createElement('button');
      b.addEventListener('click', ()=>go(i));
      dots.appendChild(b);
    });
  };
  const update = () => {
    track.style.transform = `translateX(${index * -100}%)`;
    [...dots.children].forEach((d,i)=>d.classList.toggle('active', i===index));
  };
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    update();
  };
  prev.addEventListener('click', ()=>go(index-1));
  next.addEventListener('click', ()=>go(index+1));
  makeDots(); update();
})();

// === Gmail deep link (Android) + mailto fallback ===
function openEmail(to, subject, body) {
  const enc = (s)=>encodeURIComponent(s || "");
  const intent = `intent://send/${enc(to)}#Intent;scheme=mailto;package=com.google.android.gm;S.browser_fallback_url=${enc('mailto:'+to+'?subject='+enc(subject)+'&body='+enc(body))};end`;
  // Heuristique Android
  const isAndroid = /Android/i.test(navigator.userAgent);
  if (isAndroid) {
    window.location.href = intent;
  } else {
    window.location.href = `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
  }
}

// === Boutons "Choisir ce pack" -> email prérempli ===
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const pack = btn.dataset.pack || "";
    const subject = "Commande";
    const body =
`Détaillez votre demande :

Pack choisi : ${pack}

Thème du site : (Restaurant / Entreprise / Musique / Mariage / Décide pour moi / Autre : …)

Couleurs souhaitées : …

Fonctionnalités à intégrer (plusieurs possibles) :
- Carte/menu
- Formulaire de commande
- Lien de paiement (Stripe)
- Horaires dynamiques
- Google Maps / adresse
- Galerie photos
- Décide pour moi
- Autre : …

Nom de domaine souhaité : …
Contact à afficher (tel ou e-mail) : …

Autres précisions : …`;
    openEmail(EMAIL, subject, body);
  });
});

// === Formulaire -> email "Commande" ===
const form = document.getElementById('order-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const getAll = (name)=>{
      // Récupère checkboxes multiples
      const values = [];
      form.querySelectorAll(`[name="${name}"]`).forEach(el=>{
        if (el.type === 'checkbox' && el.checked) values.push(el.value);
      });
      if(values.length) return values;
      const v = data.get(name);
      return v ? [v] : [];
    };

    const subject = "Commande";
    const features = getAll('features');
    const body =
`Détaillez votre demande :

Nom / Société : ${data.get('name') || ''}
E-mail : ${data.get('email') || ''}
Téléphone : ${data.get('phone') || ''}

Pack souhaité : ${data.get('pack') || ''}
Thème du site : ${data.get('theme') || ''}${data.get('theme_custom') ? ' — '+data.get('theme_custom'): ''}

Couleurs souhaitées : ${data.get('colors') || ''}

Fonctionnalités à intégrer : ${features.join(', ')}${data.get('features_custom') ? ' — '+data.get('features_custom'): ''}

Nom de domaine souhaité : ${data.get('domain') || ''}
Contact à afficher : ${data.get('contact') || ''}

Message :
${data.get('message') || ''}

(PS : délai indicatif communiqué après votre validation du cahier des charges.)`;

    openEmail(EMAIL, subject, body);
  });
}