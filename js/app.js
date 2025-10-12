// === MENU BURGER ===
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const menuClose = document.getElementById('menuClose');

if (menuBtn && menu && menuClose) {
  menuBtn.addEventListener('click', () => {
    menu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  });

  menuClose.addEventListener('click', () => {
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  });

  // Ferme le menu quand on clique sur un lien
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// === DIALOGUE APPELER ===
const callBtn = document.getElementById('callBtn');
const callDialog = document.getElementById('callDialog');
const callClose = document.getElementById('callClose');

if (callBtn && callDialog && callClose) {
  callBtn.addEventListener('click', () => {
    callDialog.showModal();
  });

  callClose.addEventListener('click', () => {
    callDialog.close();
  });
}

// === CARROUSEL ===
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('[data-track]');
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');

  if (!track) return;

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  });
  next?.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });
});

// === FORMULAIRE ===
const form = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');

if (form && formStatus) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = "Envoi en cours...";

    // Simule un envoi pour démonstration
    setTimeout(() => {
      formStatus.textContent = "✅ Message envoyé avec succès !";
      formStatus.classList.add("ok");
      form.reset();
    }, 1200);
  });
}

// === SCROLL DOUX (ancre fluide) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});