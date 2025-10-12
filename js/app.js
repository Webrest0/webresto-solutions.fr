// ===== Drawer (menu)
const drawer = document.getElementById('nav-drawer');
const toggleBtn = document.getElementById('menu-toggle');
const backdrop = document.getElementById('drawer-backdrop');

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('show');
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.classList.remove('show');
}
toggleBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (drawer.classList.contains('open')) closeDrawer();
  else openDrawer();
});
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});
document.querySelectorAll('.drawer-link').forEach(a => a.addEventListener('click', closeDrawer));

// ===== Carousel (Pour qui ?)
const slides = [
  {
    title: 'Restaurant / Food-truck',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1480&auto=format&fit=crop'
  },
  {
    title: 'Entreprise & services',
    img: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1480&auto=format&fit=crop'
  },
  {
    title: 'Mariage / Événement',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1480&auto=format&fit=crop'
  },
  {
    title: 'Groupes de musique',
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1480&auto=format&fit=crop'
  }
];

const track = document.getElementById('car-track');
const dotsWrap = document.getElementById('car-dots');
let index = 0;

function renderSlides() {
  track.innerHTML = slides.map(s => `
    <div class="slide" style="background-image:url('${s.img}')">
      <div class="label">${s.title}</div>
    </div>
  `).join('');
  dotsWrap.innerHTML = slides.map((_,i)=>`<button data-i="${i}" aria-label="Aller au slide ${i+1}"></button>`).join('');
  update();
}
function update() {
  track.style.transform = `translateX(${-index*100}%)`;
  [...dotsWrap.children].forEach((d,i)=> d.classList.toggle('active', i===index));
}
function move(step){ index=(index+step+slides.length)%slides.length; update(); }

document.querySelector('.car-arrow.left')?.addEventListener('click', ()=>move(-1));
document.querySelector('.car-arrow.right')?.addEventListener('click', ()=>move(1));
dotsWrap?.addEventListener('click', (e)=>{
  if(e.target.tagName==='BUTTON'){ index=parseInt(e.target.dataset.i,10); update(); }
});

renderSlides();

// ===== Email deep link (Gmail d’abord, fallback Mailto)
const EMAIL = 'smarttlelearning@gmail.com';
function openEmail(subject, body) {
  // 1) Essai Gmail app (Android/iOS – pas garanti partout)
  const gmailApp = `googlegmail://co?to=${encodeURIComponent(EMAIL)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // 2) Gmail Web
  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // 3) Mailto
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Petite stratégie : on essaie l’app → web → mailto
  const win = window.open(gmailApp, '_blank');
  setTimeout(() => {
    try { if (!win || win.closed || typeof win.closed === 'undefined') { window.open(gmailWeb, '_blank'); } }
    catch { window.location.href = mailto; }
  }, 350);
}

document.getElementById('writeEmail')?.addEventListener('click', () => {
  openEmail('Commande', 'Détaillez votre demande…');
});

// ===== “Choisir ce pack” → ouvre e-mail prérempli
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const pack = btn.dataset.pack || 'Site';
    const subject = `Commande — ${pack}`;
    const tmpl =
`Détaillez votre demande :

• Thème du site : (restaurant, mariage, entreprise, musique, autre…)
• Couleurs voulues :
• Nom de domaine souhaité :
• Contact public (tel ou e-mail) :
• Fonctionnalités à intégrer (carte/menu, paiement, réservations, horaires, carte Google, réseaux sociaux, mentions…) :
• Contenus fournis (logo, photos, textes) :
• Exemples de sites que vous aimez :
• Contraintes / remarques :

⚑ Délai indicatif : minimum 2 semaines (souvent plus rapide).`;
    openEmail('Commande', tmpl);
  });
});

// ===== Form → e-mail prérempli (objet = Commande)
const brief = document.getElementById('briefForm');
brief?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(brief);
  const data = Object.fromEntries(fd.entries());
  const subject = 'Commande';
  const body =
`Détaillez votre demande :

Nom : ${data.name || ''}
Email : ${data.email || ''}
Téléphone : ${data.phone || ''}
Thème : ${data.theme || ''}
Couleurs : ${data.colors || ''}

Nom de domaine : ${data.domain || ''}
Contact public : ${data.publicContact || ''}

Fonctionnalités : ${data.features || ''}
Contenus/contraintes : ${data.content || ''}

Message :
${data.message || ''}

⚑ Délai indicatif : minimum 2 semaines (souvent plus rapide).`;

  openEmail(subject, body);
});