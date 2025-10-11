// ====== CONFIG ======
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";
const SITE_EXAMPLE_URL = "https://pizz-amigo.netlify.app"; // lien Pizz'Amigo validé

// ====== MENU ======
const menuBtn = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");
const mask = document.querySelector(".drawer-mask");
const drawerClose = document.querySelector(".drawer-close");

function openDrawer(){ drawer.classList.add("open"); mask.classList.add("show"); menuBtn.setAttribute("aria-expanded","true"); }
function closeDrawer(){ drawer.classList.remove("open"); mask.classList.remove("show"); menuBtn.setAttribute("aria-expanded","false"); }

menuBtn?.addEventListener("click", () => {
  drawer.classList.contains("open") ? closeDrawer() : openDrawer();
});
drawerClose?.addEventListener("click", closeDrawer);
mask?.addEventListener("click", closeDrawer);
drawer?.querySelectorAll(".drawer-link").forEach(a => a.addEventListener("click", closeDrawer));

// ====== EXEMPLE : bouton Voir le site ======
const viewBtn = document.getElementById("btn-view-site");
if (viewBtn) viewBtn.href = SITE_EXAMPLE_URL;

// ====== GMAIL DEEP LINK ======
function openGmail(to, subject="", body=""){
  const qs = new URLSearchParams({ to, su: subject, body }).toString();
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&${qs}`;
  const mailtoUrl = `mailto:${to}?${new URLSearchParams({ subject, body }).toString()}`;
  // Ouvre Gmail; si bloqué par navigateur, on bascule sur mailto
  const win = window.open(gmailUrl, "_blank");
  if (!win) window.location.href = mailtoUrl;
}

// Bouton “Écrire à …”
document.getElementById("btn-gmail")?.addEventListener("click", () => {
  openGmail(EMAIL, "Demande de site WebResto", "");
});

// Formulaire → ouvre GMAIL avec le message tapé
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name")?.value?.trim() || "";
  const email = document.getElementById("email")?.value?.trim() || "";
  const message = document.getElementById("message")?.value?.trim() || "";
  const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  openGmail(EMAIL, "Demande de site WebResto", body);
});

// ====== POUR QUI : CAROUSEL ======
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = [...carousel.querySelectorAll(".slide")];
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  const dotsWrap = carousel.querySelector(".carousel-dots");
  let index = 0;

  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((b, n)=> b.classList.toggle("active", n===index));
  }

  // Dots
  slides.forEach((_, i)=>{
    const b=document.createElement("button");
    b.setAttribute("aria-label", `Aller au slide ${i+1}`);
    if(i===0) b.classList.add("active");
    b.addEventListener("click", ()=>go(i));
    dotsWrap.appendChild(b);
  });

  prev.addEventListener("click", ()=>go(index-1));
  next.addEventListener("click", ()=>go(index+1));

  // Swipe mobile
  let startX=0, dx=0;
  track.addEventListener("touchstart", (e)=>{ startX=e.touches[0].clientX; dx=0; }, {passive:true});
  track.addEventListener("touchmove", (e)=>{ dx=e.touches[0].clientX-startX; }, {passive:true});
  track.addEventListener("touchend", ()=>{ if(Math.abs(dx)>50){ dx<0 ? go(index+1) : go(index-1); } });

  // Auto-play léger
  setInterval(()=>go(index+1), 5500);
});