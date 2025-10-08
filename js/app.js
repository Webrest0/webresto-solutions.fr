// ====== Variables (modifiez ici si besoin) ======
const EMAIL = "smarttlelearning@gmail.com";
const PHONE_DISPLAY = "07 88 58 98 12";
const PHONE_E164 = "+33788589812"; // pour le lien tel:

// ====== Gmail compose auto ======
function buildGmailUrl() {
  const subject = "Demande de site vitrine";
  const body = `Bonjour, je souhaite un site pour mon activité. Mon numéro : ${PHONE_DISPLAY}\n\nMerci.`;
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: EMAIL,
    su: subject,
    body: body
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Lien Gmail
  const gmailBtn = document.getElementById("gmailBtn");
  if (gmailBtn) gmailBtn.href = buildGmailUrl();

  // Lien tel
  const telLink = document.getElementById("telLink");
  if (telLink) telLink.href = `tel:${PHONE_E164}`;

  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Défilement doux + active link
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

  // Observer pour activer l'onglet courant
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
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 });

  sections.forEach(s => obs.observe(s));
});
