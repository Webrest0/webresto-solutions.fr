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

// === CAROUSEL (Pour qui ?) ===
let index = 0;
function moveSlide(step) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const slides = track.children.length;
  index = (index + step + slides) % slides;
  track.style.transform = `translateX(-${index * 100}%)`;
}
function updateDots() {
  const dots = document.querySelectorAll('.carousel-dots button');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  // Appeler
  document.querySelectorAll('[href^="tel:"], .call-btn')
    .forEach(btn => btn.setAttribute("href", `tel:${PHONE_E164}`));

  // Email unique
  const gmailAddressBtn = document.getElementById("gmailBtnAddress");
  if (gmailAddressBtn) {
    gmailAddressBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gmailDeepLink(
        EMAIL,
        "Demande de site Web",
        "Bonjour, je souhaite un site pour mon activité.\n\nMerci."
      );
    });
  }

  // Boutons “Choisir ce pack”
  document.querySelectorAll(".select-plan").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.getAttribute("data-plan") || "Pack";
      gmailDeepLink(
        EMAIL,
        `Choix du pack : ${plan}`,
        `Bonjour,\nJe choisis : ${plan}.\n\nParlez-moi des étapes pour démarrer, merci.`
      );
    });
  });

  // Carousel : dots + flèches + swipe
  const track = document.querySelector(".carousel-track");
  const dotsWrap = document.querySelector(".carousel-dots");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  if (track && dotsWrap && prev && next) {
    const slides = Array.from(track.children);
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => { index = i; moveSlide(0); updateDots(); });
      dotsWrap.appendChild(dot);
    });
    prev.addEventListener("click", () => { moveSlide(-1); updateDots(); });
    next.addEventListener("click", () => { moveSlide(1); updateDots(); });

    // Swipe mobile
    let startX = null;
    track.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener("touchmove", (e) => {
      if (startX === null) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 50) { moveSlide(dx < 0 ? 1 : -1); updateDots(); startX = null; }
    }, { passive: true });
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