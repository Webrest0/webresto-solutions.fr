const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

function gmailDeepLink(to, subject, body) {
  // Deep link Gmail (iOS/Android) + fallback mailto
  const appUrl = `googlegmail:///co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Essaye d'ouvrir l'app
  const timeout = setTimeout(() => { window.location.href = mailtoUrl; }, 600);
  window.location.href = appUrl;

  // Si l'app s'ouvre, on annule le fallback (ça ne casse rien si ce n'est pas supporté)
  setTimeout(() => clearTimeout(timeout), 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  // Boutons contact
  const gmailBtn = document.getElementById("gmailBtn");
  if (gmailBtn) {
    gmailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      gmailDeepLink(
        EMAIL,
        "Demande de site vitrine",
        "Bonjour, je souhaite un site pour mon activité.\n\nMerci."
      );
    });
  }
  const callTop = document.getElementById("callTop");
  if (callTop) callTop.href = `tel:${PHONE_E164}`;
  const callBtn = document.getElementById("callBtn");
  if (callBtn) callBtn.href = `tel:${PHONE_E164}`;

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const opened = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    list.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => list.classList.remove("open"))
    );
  }

  // Scroll doux + lien actif
  const links = document.querySelectorAll('a.nav-link, a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // === CAROUSEL ===
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn.prev");
  const next = document.querySelector(".carousel-btn.next");
  const dotsWrap = document.querySelector(".carousel-dots");
  if (track && prev && next && dotsWrap) {
    const slides = Array.from(track.children);
    let index = 0;

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Aller à la diapositive ${i+1}`);
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    function update() {
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }
    prev.addEventListener("click", () => goTo(index - 1));
    next.addEventListener("click", () => goTo(index + 1));

    // Swipe mobile
    let startX = null;
    track.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, {passive:true});
    track.addEventListener("touchmove", (e) => {
      if (startX === null) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        goTo(index + (dx < 0 ? 1 : -1));
        startX = null;
      }
    }, {passive:true});
  }
});
