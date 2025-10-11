/* === Coordonnées === */
const EMAIL = "smarttlearning@gmail.com";
const PHONE_E164 = "+33788589812";

/* === Menu mobile : toggle + close on outside click === */
const menuBtn = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    }
  });
}

/* === Helper : Deep-link vers Gmail puis fallback mailto puis Gmail Web === */
function openEmailWithPref(to, subject, body) {
  const enc = encodeURIComponent;
  const gmailApp = `googlegmail://co?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`;
  const mailto = `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
  const gmailWeb = `https://mail.google.com/mail/?view=cm&tf=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`;

  // priorité : Gmail app → fallback mailto → Gmail web
  // on tente d'abord l'app
  const a = document.createElement("a");
  a.href = gmailApp;
  document.body.appendChild(a);
  a.click();

  // si rien ne se passe, on tente mailto après un court délai, puis Gmail Web
  setTimeout(() => {
    window.location.href = mailto;
    setTimeout(() => {
      window.open(gmailWeb, "_blank", "noopener");
    }, 600);
  }, 250);
}

/* === Bouton contact direct (haut du formulaire) === */
const gmailDirect = document.getElementById("gmailDirect");
if (gmailDirect) {
  gmailDirect.addEventListener("click", (e) => {
    e.preventDefault();
    const subject = "Commande WebResto";
    const body =
`Détaillez votre demande :

• Thème (restaurant, mariage, entreprise…):
• Couleurs souhaitées :
• Nom de domaine souhaité :
• Contact à afficher (tél/e-mail) :
• Fonctionnalités : carte/menu, horaires, paiement, commande, etc.
• Références / idées :

Merci !`;
    openEmailWithPref(EMAIL, subject, body);
  });
}

/* === Boutons "Choisir ce pack" : ouvrent email pré-rempli === */
document.querySelectorAll("[data-pack]").forEach(btn => {
  btn.addEventListener("click", () => {
    const pack = btn.getAttribute("data-pack");
    const subject = "Commande WebResto";
    const body =
`Détaillez votre demande :

Pack choisi : ${pack}

• Thème (restaurant, mariage, entreprise…):
• Couleurs souhaitées :
• Nom de domaine souhaité :
• Contact à afficher (tél/e-mail) :
• Fonctionnalités : carte/menu, horaires, lien de paiement, commande en ligne, galerie, Google Maps…
• Références / idées :

Délai standard : 2 semaines (souvent plus rapide selon la complexité).`;
    openEmailWithPref(EMAIL, subject, body);
  });
});

/* === Formulaire : construit le mail et ouvre Gmail/app === */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const fromEmail = document.getElementById("email").value.trim();
    const theme = document.getElementById("theme").value;
    const colors = document.getElementById("colors").value.trim();
    const domain = document.getElementById("domain").value.trim();
    const publicContact = document.getElementById("publicContact").value.trim();
    const msg = document.getElementById("message").value.trim();

    const features = Array.from(document.querySelectorAll(".checks input:checked"))
      .map(i => i.value)
      .join(", ");

    const subject = "Commande WebResto";
    const body =
`Détaillez votre demande :

• Nom : ${name}
• Email : ${fromEmail}
• Thème : ${theme}
• Couleurs : ${colors}
• Nom de domaine : ${domain}
• Contact à afficher : ${publicContact}
• Fonctionnalités souhaitées : ${features}

• Message :
${msg}

Délai standard : 2 semaines (souvent plus rapide selon la complexité).`;

    openEmailWithPref(EMAIL, subject, body);
  });
}

/* === Carousel : slides === */
const slides = [
  {
    label: "Restaurants / Food-trucks",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
  },
  {
    label: "Entreprises & services",
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop" // plus pro
  },
  {
    label: "Groupes de musique",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    label: "Mariages & événements",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop"
  }
];

(function initCarousel(){
  const track = document.querySelector(".carousel-track");
  const dots = document.querySelector(".carousel-dots");
  if (!track || !dots) return;

  // inject slides
  slides.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "slide";
    el.style.backgroundImage = `url("${s.img}")`;

    const label = document.createElement("div");
    label.className = "slide-label";
    label.textContent = s.label;

    el.appendChild(label);
    track.appendChild(el);

    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Aller à ${i+1}`);
    dots.appendChild(dot);
  });

  let index = 0;
  const slideEls = Array.from(document.querySelectorAll(".slide"));
  const dotEls = Array.from(dots.children);

  function show(i){
    index = (i + slideEls.length) % slideEls.length;
    slideEls.forEach((el, k) => el.classList.toggle("active", k === index));
    dotEls.forEach((d, k) => d.classList.toggle("active", k === index));
  }
  show(0);

  document.querySelector(".carousel-btn.left").addEventListener("click", () => show(index-1));
  document.querySelector(".carousel-btn.right").addEventListener("click", () => show(index+1));
  dotEls.forEach((d, k) => d.addEventListener("click", () => show(k)));

  // auto-play léger
  setInterval(()=>show(index+1), 5000);
})();

/* === Reveal on scroll (pour la carte Pizz'Amigo) === */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
}, {threshold:.2});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));