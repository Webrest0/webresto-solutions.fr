// ====== CONFIG ======
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// ====== MENU (drawer) ======
const drawer = document.querySelector(".nav-drawer");
const toggleBtn = document.querySelector(".menu-toggle");

function closeDrawer() {
  drawer.classList.remove("open");
  toggleBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
}

function openDrawer() {
  drawer.classList.add("open");
  toggleBtn.setAttribute("aria-expanded", "true");
  drawer.setAttribute("aria-hidden", "false");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
}
document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) closeDrawer();
});

// ====== CALL BUTTON (normalize tel:) ======
document.querySelectorAll("a[href^='tel:']").forEach((a) => {
  a.setAttribute("href", `tel:${PHONE_E164}`);
});

// ====== CAROUSEL ======
(function initCarousel(){
  const root = document.querySelector(".carousel");
  if(!root) return;

  const track = root.querySelector(".car-track");
  const slides = Array.from(root.querySelectorAll(".car-slide"));
  const btnPrev = root.querySelector(".car-arrow.left");
  const btnNext = root.querySelector(".car-arrow.right");
  const dotsWrap = root.querySelector(".car-dots");

  // set background images from CSS var
  slides.forEach(s => {
    const bg = getComputedStyle(s).getPropertyValue("--bg");
    if(bg) s.style.backgroundImage = bg.trim();
  });

  let index = 0;
  function goto(i){
    index = (i + slides.length) % slides.length;
    track.scrollTo({left: index * track.clientWidth, behavior:"smooth"});
    Array.from(dotsWrap.children).forEach((d,di)=>d.classList.toggle("active", di===index));
  }
  slides.forEach((_,i)=>{
    const b=document.createElement("button");
    b.addEventListener("click",()=>goto(i));
    dotsWrap.appendChild(b);
  });
  goto(0);

  btnPrev.addEventListener("click", ()=>goto(index-1));
  btnNext.addEventListener("click", ()=>goto(index+1));
  window.addEventListener("resize", ()=>goto(index));
})();

// ====== PREFER GMAIL, FALLBACK mailto / web Gmail ======
function gmailDeepLink(to, subject, body){
  // 1) Try Gmail app (iOS/Android)
  const gmailApp = `googlegmail:///co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // 2) Fallback to default mail app
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // 3) Fallback web Gmail
  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Try to open Gmail app first with a short timeout, then fallbacks
  const start = Date.now();
  const t = setTimeout(()=>{
    if (Date.now() - start < 1200) {
      // user likely doesn't have Gmail scheme handled -> try mailto
      const win = window.open(mailto, "_self");
      setTimeout(()=>{ if(!win || win.closed) window.open(gmailWeb, "_blank"); }, 600);
    }
  }, 800);
  window.location.href = gmailApp;
  setTimeout(()=>clearTimeout(t), 1800);
}

// “Écrire à …” button
const gmailAddressBtn = document.getElementById("gmailAddress");
if (gmailAddressBtn) {
  gmailAddressBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gmailDeepLink(
      EMAIL,
      "Commande",
      "Détaillez votre demande :\n\n"
    );
  });
}

// ====== FORM ======
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const pack = document.querySelector(".choose-pack.active")?.dataset.pack || "";
  const body = [
    "Détaillez votre demande :",
    "",
    `Nom : ${data.get("nom") || ""}`,
    `Email : ${data.get("email") || ""}`,
    `Téléphone : ${data.get("tel") || ""}`,
    `Pack : ${pack}`,
    `Thème : ${data.get("theme") || ""}`,
    `Couleurs : ${data.get("couleurs") || ""}`,
    `Nom de domaine souhaité : ${data.get("domaine") || ""}`,
    `Pages/sections : ${data.get("sections") || ""}`,
    `Lien de paiement : ${data.get("paiement") || ""}`,
    `Contact public (tel/mail) : ${data.get("contactPublic") || ""}`,
    `Horaires : ${data.get("horaires") || ""}`,
    `Logo/Photos : ${data.get("assets") || ""}`,
    "",
    `Message complémentaire :`,
    `${data.get("message") || ""}`,
  ].join("\n");

  gmailDeepLink(EMAIL, "Commande", body);
});

// remember chosen pack to include in email
document.querySelectorAll(".choose-pack").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".choose-pack").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});