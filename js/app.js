const EMAIL = "smarttlelearning@gmail.com";
const PHONE_E164 = "+33788589812";

function buildGmailUrl() {
  const subject = "Demande de site vitrine";
  const body = `Bonjour, je souhaite un site pour mon activité.\n\nMerci.`;
  const p = new URLSearchParams({ view:"cm", fs:"1", to:EMAIL, su:subject, body });
  return `https://mail.google.com/mail/?${p.toString()}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const gmailBtn = document.getElementById("gmailBtn");
  if (gmailBtn) gmailBtn.href = buildGmailUrl();

  const callTop = document.getElementById("callTop");
  if (callTop) callTop.href = `tel:${PHONE_E164}`;

  const callBtn = document.getElementById("callBtn");
  if (callBtn) callBtn.href = `tel:${PHONE_E164}`;

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
});
