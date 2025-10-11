// === CONFIG ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";
// Lien public du site Pizz'Amigo :
const PIZZ_LINK = "pizz-amigo.netlify.app"; // ← remplace par l’URL réelle si besoin

// === NAV (hamburger) ===
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const actions = document.querySelector(".actions");

function closeMenu(){
  if(menu.classList.contains("open")){
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-hidden","true");
  }
}
function openMenu(){
  menu.classList.add("open");
  menuBtn.setAttribute("aria-expanded","true");
  menu.setAttribute("aria-hidden","false");
}

menuBtn?.addEventListener("click", (e)=>{
  e.stopPropagation();
  menu.classList.toggle("open");
  const opened = menu.classList.contains("open");
  menuBtn.setAttribute("aria-expanded", opened ? "true":"false");
  menu.setAttribute("aria-hidden", opened ? "false":"true");
});

// Fermer en cliquant ailleurs
document.addEventListener("click", (e)=>{
  if(!menu.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});
// Fermer via Echap
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeMenu(); });

// === HERO buttons (raccourcis) ===
document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.setAttribute("href",`tel:${PHONE_E164}`));

// === Exemple (lien Pizz) ===
const pizzBtn = document.getElementById("btn-pizz");
if(pizzBtn){ pizzBtn.href = PIZZ_LINK; }

// === CAROUSEL “Pour qui ?” ===
(function initCarousel(){
  const root = document.querySelector(".carousel");
  if(!root) return;
  const track = root.querySelector(".track");
  const slides = [...root.querySelectorAll(".slide")];
  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");
  const dots = root.querySelector(".dots");

  let index = 0;
  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index*100}%)`;
    [...dots.children].forEach((d,k)=>d.classList.toggle("active", k===index));
  }
  // dots
  slides.forEach((_,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.setAttribute("aria-label",`Aller à la diapo ${i+1}`);
    b.addEventListener("click", ()=>go(i));
    dots.appendChild(b);
  });
  go(0);

  prev.addEventListener("click", ()=>go(index-1));
  next.addEventListener("click", ()=>go(index+1));
})();

// === MAIL helpers ===
function gmailDeepLink(to, subject, body){
  // Tentative Gmail web/app
  const url = new URL("https://mail.google.com/mail/");
  url.searchParams.set("view","cm");
  url.searchParams.set("fs","1");
  url.searchParams.set("to", to);
  url.searchParams.set("su", subject);
  url.searchParams.set("body", body);
  // Fallback mailto
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // essaie Gmail, puis fallback
  const w = window.open(url.toString(), "_blank");
  const t = setTimeout(()=>{
    try{ if(!w || w.closed) window.location.href = mailto; }
    catch{ window.location.href = mailto; }
  }, 1200);

  // si l’onglet s’ouvre bien, on nettoie le timer
  const clear = ()=>clearTimeout(t);
  window.addEventListener("focus", clear, {once:true});
}

// Lien “Écrire …”
document.getElementById("btn-gmail")?.addEventListener("click", (e)=>{
  e.preventDefault();
  gmailDeepLink(
    EMAIL,
    "Commande",
    "Détaillez votre demande :\n\n"
  );
});

// Boutons “Choisir ce pack” -> pré-remplissage
document.querySelectorAll(".btn-mail").forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const pack = btn.dataset.pack || "Pack";
    const body = `Détaillez votre demande :\n\nPack choisi : ${pack}\n\nNom : \nEmail : \nTéléphone : \nAutres infos : \n`;
    gmailDeepLink(EMAIL, "Commande", body);
  });
});

// Formulaire -> Gmail + fallback, Objet=Commande
document.getElementById("sendBtn")?.addEventListener("click", ()=>{
  const name = document.getElementById("fname").value.trim();
  const mail = document.getElementById("fmail").value.trim();
  const msg  = document.getElementById("fmsg").value.trim();

  const body =
`Détaillez votre demande :

Nom : ${name}
Email : ${mail}

Message :
${msg}
`;

  gmailDeepLink(EMAIL, "Commande", body);
});