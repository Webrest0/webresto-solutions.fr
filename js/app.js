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

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  // Met à jour tous les liens d’appel
  document.querySelectorAll('[href^="tel:"], .call-btn')
    .forEach(btn => btn.setAttribute("href", `tel:${PHONE_E164}`));

  // Un seul bouton email
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
