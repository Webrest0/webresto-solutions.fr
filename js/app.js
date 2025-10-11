// === CONFIG ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// === MENU ===
const menuBtn = document.querySelector(".menu-toggle");
const drawer  = document.querySelector(".nav-drawer");

function closeDrawer(){ drawer.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); }
function openDrawer(){ drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false"); }

menuBtn?.addEventListener("click", (e)=>{
  e.stopPropagation();
  drawer.classList.contains("open") ? closeDrawer() : openDrawer();
});

// Fermeture si clic à l'extérieur
document.addEventListener("click", (e)=>{
  if (!drawer.contains(e.target) && !menuBtn.contains(e.target)){
    closeDrawer();
  }
});

// Fermeture si on clique un lien du menu
drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click", closeDrawer));

// === CAROUSEL ===
(function initCarousel(){
  const track = document.querySelector(".c-track");
  if(!track) return;

  const slides = [...track.children];
  const prev = document.querySelector(".c-prev");
  const next = document.querySelector(".c-next");
  const dots = [...document.querySelectorAll(".dot")];
  let index = 0;

  function go(i){
    index = (i+slides.length)%slides.length;
    track.style.transform = `translateX(-${index*100}%)`;
    dots.forEach((d,k)=>d.classList.toggle("is-active", k===index));
  }

  prev.addEventListener("click", ()=>go(index-1));
  next.addEventListener("click", ()=>go(index+1));
  dots.forEach((d,k)=>d.addEventListener("click", ()=>go(k)));

  // Auto-play léger
  let timer = setInterval(()=>go(index+1), 6000);
  [prev,next,track].forEach(el=>{
    el.addEventListener("pointerenter", ()=>clearInterval(timer));
    el.addEventListener("pointerleave", ()=>timer = setInterval(()=>go(index+1), 6000));
  });
})();

// === MAIL / GMAIL INTENT ===
function composeEmail({subject, body, to = EMAIL}){
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  // 1) mailto (ouvre l'app mail par défaut / Gmail si configuré)
  const mailto = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
  window.location.href = mailto;

  // 2) Secours Gmail web (si l’app ne s’ouvre pas)
  setTimeout(()=>{
    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailWeb, "_blank","noopener");
  }, 800);
}

// Lien mail direct au-dessus du formulaire
document.getElementById("mailtoDirect")?.addEventListener("click", (e)=>{
  e.preventDefault();
  composeEmail({
    subject: "Commande",
    body: "Détaillez votre demande :\n\n"
  });
});

// Boutons “Choisir ce pack”
document.querySelectorAll(".mail-intent").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const pack = btn.dataset.pack || "Pack";
    const body =
`Détaillez votre demande :

• Pack choisi : ${pack}
• Thème (restaurant, mariage, musique, etc.) :
• Couleurs souhaitées :
• Fonctionnalités à intégrer (ex : carte/menu, horaires, lien de paiement, réservation, Maps, galerie, commandes+dashboard) :
• Nom de domaine souhaité :
• Téléphone / email à afficher :
• Budget estimé :
• Échéance :
• Contenus fournis ? (textes / photos / logo) :
• Lien(s) d’inspiration (optionnel) :
• Remarques :`;

    composeEmail({subject:"Commande", body});
  });
});

// === FORMULAIRE ===
const form = document.getElementById("projectForm");
form?.addEventListener("submit", (e)=>{
  e.preventDefault();
  const fd = new FormData(form);

  const feats = fd.getAll("feat").join(", ");
  const body =
`Détaillez votre demande :

• Nom : ${fd.get("name")}
• Email : ${fd.get("email")}
• Thème : ${fd.get("theme")}
• Couleurs : ${fd.get("colors")||""}
• Nom de domaine : ${fd.get("domain")||""}
• Téléphone à afficher : ${fd.get("phone")||""}
• Fonctionnalités : ${feats||"—"}
• Budget : ${fd.get("budget")||""}
• Échéance : ${fd.get("deadline")||""}

Message :
${fd.get("message")||""}`;

  composeEmail({ subject:"Commande", body });
});

// === Appeler: correct tel: sur tous les éléments .btn-call ===
document.querySelectorAll('.btn-call').forEach(a=>{
  a.setAttribute('href', `tel:${PHONE_E164}`);
});