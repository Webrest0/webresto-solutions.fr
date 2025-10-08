// === COORDONNÉES ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// === MENU MOBILE ===
function toggleMenu() {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('open');
}

// === GMAIL (ouvre l'app si dispo, sinon mailto) ===
function gmailDeepLink(to, subject, body) {
  const appUrl = `googlegmail:///co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const t = setTimeout(() => { window.location.href = mailtoUrl; }, 600);
  window.location.href = appUrl;
  setTimeout(() => clearTimeout(t), 1500);
}

// === CAROUSEL ===
let index = 0;
function moveSlide(step) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.children.length;
  index = (index + step + slides) % slides;
  track.style.transform = `translateX(-${index * 100}%)`;
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  // Appel
  document.querySelectorAll('[href^="tel:"], .call-btn')
    .forEach(btn => btn.setAttribute("href", `tel:${PHONE_E164}`));

  // Gmail — deux boutons
  const gmail1 = document.getElementById("gmailBtn");
  const gmail2 = document.getElementById("gmailBtnAddress");
  const subj = "Demande de site Web";
  const body = "Bonjour, je souhaite un site pour mon activité.\n\nMerci.";
  [gmail1, gmail2].forEach(b=>{
    if(!b) return;
    b.addEventListener("click",(e)=>{ e.preventDefault(); gmailDeepLink(EMAIL, subj, body); });
  });

  // Dots du carousel
  const track = document.querySelector(".carousel-track");
  const dotsWrap = document.querySelector(".carousel-dots");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  if (track && dotsWrap && prev && next) {
    const slides = Array.from(track.children);
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i===0) dot.classList.add("active");
      dot.addEventListener("click", () => { index = i; moveSlide(0); updateDots(); });
      dotsWrap.appendChild(dot);
    });
    function updateDots(){
      const dots = dotsWrap.querySelectorAll("button");
      dots.forEach((d,j)=>d.classList.toggle("active", j===index));
    }
    prev.addEventListener("click", ()=>{ moveSlide(-1); updateDots(); });
    next.addEventListener("click", ()=>{ moveSlide(1); updateDots(); });

    // swipe mobile
    let startX=null;
    track.addEventListener("touchstart",(e)=>startX=e.touches[0].clientX,{passive:true});
    track.addEventListener("touchmove",(e)=>{
      if(startX===null) return;
      const dx=e.touches[0].clientX-startX;
      if(Math.abs(dx)>50){ moveSlide(dx<0?1:-1); updateDots(); startX=null; }
    },{passive:true});
  }

  // Scroll fluide
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",(e)=>{
      const id = a.getAttribute("href");
      if(!id || id==="#" ) return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
      const nav = document.querySelector('.navbar');
      nav && nav.classList.remove('open');
    });
  });
});
