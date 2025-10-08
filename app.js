// Optionnel : met automatiquement à jour tous les liens "tel" si tu changes de numéro ici.
const PHONE = "+33600000000";
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="tel:"]').forEach(a => a.href = `tel:${PHONE}`);
});
