// === Réglages contact ===
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_DISPLAY = "07 88 58 98 12";
const PHONE_E164 = "+33788589812";

// === Lien Gmail compose ===
function buildGmailUrl() {
  const subject = "Demande de site vitrine";
  const body = `Bonjour, je souhaite un site pour mon activité. Mon numéro : ${PHONE_DISPLAY}\n\nMerci.`;
  const p = new URLSearchParams({ view:"cm", fs:"1", to:EMAIL, su:subject, body });
  return `https://mail.google.com/mail/?${p.toString()}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Bouton Gmail + liens tel
  const gmailBtn = document.getElementById("gmailBtn");
  if (gmailBtn) gmailBtn.href = buildGmailUrl();

  const telTop = document.getElementById("telTop");
  if (telTop) telTop.href = `tel:${PHONE_E164}`;
  const telLink = document.getElementById("telLink");
  if (telLink) telLink.href = `tel:${PHONE_E164}`;

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
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const map = {};
  navLinks.forEach(l => { map[l.getAttribute("href")] = l; });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = `#${entry.target.id}`;
      const link = map[id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-42% 0px -52% 0px", threshold: 0.01 });

  sections.forEach(s => obs.observe(s));
});
