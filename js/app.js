// ===== MENU =====
const toggleBtn = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");

if (toggleBtn) {
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = drawer.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
  });
  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    }
  });
}

// ===== CAROUSEL =====
(function(){
  const track = document.querySelector(".carousel .track");
  if (!track) return;
  const slides = Array.from(track.children);
  const prev = document.querySelector(".carousel .prev");
  const next = document.querySelector(".carousel .next");
  const dotsWrap = document.querySelector(".carousel .dots");
  let index = 0;

  // dots
  slides.forEach((_s,i)=>{
    const b=document.createElement("button");
    if(i===0) b.classList.add("active");
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function update(){
    const w = slides[0].getBoundingClientRect().width + 16;
    track.scrollTo({left: index*w, behavior: "smooth"});
    dots.forEach((d,i)=>d.classList.toggle("active", i===index));
  }
  prev.addEventListener("click", ()=>{ index = (index-1+slides.length)%slides.length; update(); });
  next.addEventListener("click", ()=>{ index = (index+1)%slides.length; update(); });
  dots.forEach((d,i)=> d.addEventListener("click", ()=>{ index=i; update(); }));
})();

// ===== FORM UI (autres champs) =====
const themeSel = document.getElementById("themeSelect");
const themeOtherWrap = document.getElementById("themeOtherWrap");
const featOther = document.getElementById("featOther");
const featOtherWrap = document.getElementById("featOtherWrap");

if (themeSel){
  themeSel.addEventListener("change", ()=>{
    themeOtherWrap.classList.toggle("hidden", themeSel.value !== "autre");
  });
}
if (featOther){
  featOther.addEventListener("change", ()=>{
    featOtherWrap.classList.toggle("hidden", !featOther.checked);
  });
}

// ===== ENVOI MAIL : Gmail d'abord, sinon app mail =====
// Utilisé aussi par les boutons “Choisir ce pack”
const EMAIL_TO = "smarttlelearning@gmail.com";
function openGmailOrMailto({subject, body}){
  // 1) tentative Gmail (iOS + Android)
  const gmailURL = `gmail://co?to=${encodeURIComponent(EMAIL_TO)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoURL = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  let opened = false;
  const t = Date.now();
  const win = window.open(gmailURL, "_self"); // essaye dans l'app; si pas d'app, restera sans effet

  // Fallback rapide vers mailto
  setTimeout(()=>{
    if (!opened && Date.now()-t > 300) return; // si le navigateur a bloqué, rien à faire
    window.location.href = mailtoURL;
  }, 400);
}

// Boutons “Choisir ce pack” -> préremplissage simple
document.querySelectorAll(".send-mail").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const pack = btn.dataset.pack || "Site";
    const subject = "Commande";
    const body = `Détaillez votre demande :%0D%0A%0D%0APack souhaité : ${pack}%0D%0A%0D%0A`;
    openGmailOrMailto({subject, body});
  });
});

// ===== FORM SUBMIT =====
const form = document.getElementById("orderForm");
if (form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);

    const features = fd.getAll("features").filter(v=>v && v!=="autre");
    const featOtherTxt = fd.get("features_autre") || "";
    const featsLine = [...features, ...(featOtherTxt? [featOtherTxt] : [])].join(", ");

    const subject = "Commande";
    const body =
`Détaillez votre demande :

Nom / Société : ${fd.get("name") || ""}
E-mail : ${fd.get("email") || ""}
Téléphone : ${fd.get("phone") || ""}

Pack souhaité : ${fd.get("pack") || ""}
Thème du site : ${fd.get("theme")==="autre" ? (fd.get("theme_autre")||"") : (fd.get("theme")||"")}
Couleurs souhaitées : ${fd.get("colors") || ""}

Fonctionnalités à intégrer : ${featsLine || "-"}

Nom de domaine souhaité : ${fd.get("domain") || ""}
Contact à afficher : ${fd.get("public_contact") || ""}

Message :
${fd.get("message") || ""}`;

    openGmailOrMailto({subject, body});
  });
}