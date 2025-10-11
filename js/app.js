const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

// Ouvre l'app Gmail si possible, sinon bascule vers l'app mail par défaut
function gmailDeepLink(to, subject, body) {
  const appUrl = `googlegmail:///co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const t = setTimeout(() => { window.location.href = mailtoUrl; }, 600);
  window.location.href = appUrl;
  setTimeout(() => clearTimeout(t), 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  // Liens d’action
  const callTop = document.getElementById("callTop");
  if (callTop) callTop.href = `tel:${PHONE_E164}`;

  // Ouvrir Gmail (bouton + adresse)
  const gmailBtn = document.getElementById("gmailBtn");
  const gmailBtnAddress = document.getElementById("gmailBtnAddress");
  const subject = "Demande de site vitrine";
  const body = "Bonjour, je souhaite un site pour mon activité.%0A%0AMerci.";
  [gmailBtn, gmailBtnAddress].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      gmailDeepLink(EMAIL, subject, "Bonjour, je souhaite un site pour mon activité.\n\nMerci.");
    });
  });

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const opened = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    navList.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => navList.classList.remove("open"))
    );
  }

  // Scroll doux
  document.querySelectorAll('a.nav-link, a[href^="#"]').forEach(link => {
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