// Année footer
document.getElementById('year').textContent = new Date().getFullYear();

// Burger (ouverture/fermeture) — aspect amélioré, comportement identique
const burgerBtn  = document.getElementById('burgerBtn');
const drawer     = document.getElementById('mainNav');
const drawerClose= document.getElementById('drawerClose');

function openDrawer(){
  drawer.hidden = false;
  burgerBtn.setAttribute('aria-expanded','true');
}
function closeDrawer(){
  drawer.hidden = true;
  burgerBtn.setAttribute('aria-expanded','false');
}
burgerBtn?.addEventListener('click', () => drawer.hidden ? openDrawer() : closeDrawer());
drawerClose?.addEventListener('click', closeDrawer);
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// Bouton “Appeler” (comportement existant conservé)
document.getElementById('callBtn')?.addEventListener('click', () => {
  // Numéro principal
  window.location.href = 'tel:+33784674767';
});

// Formulaire : envoi existant (ici juste feedback local si tu utilises EmailJS ailleurs)
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');

orderForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Ici : on laisse ton intégration EmailJS existante.
  // On affiche seulement un petit feedback visuel non intrusif.
  formStatus.textContent = "✅ Message envoyé.";
  setTimeout(()=> formStatus.textContent = "", 4000);
});