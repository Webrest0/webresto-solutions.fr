document.addEventListener('DOMContentLoaded', () => {
  /* ===== Menu burger : toggle + fermer au clic ===== */
  const burger = document.getElementById('burgerBtn');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const opened = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', opened ? 'false' : 'true');
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Popup “Appeler” ===== */
  const openCall = document.getElementById('openCall');
  if (openCall) {
    openCall.addEventListener('click', () => {
      const dlg = document.createElement('dialog');
      dlg.className = 'modal';
      dlg.innerHTML = `
        <div class="modal-card">
          <button class="modal-close" aria-label="Fermer">✕</button>
          <h3 class="modal-title">Appeler</h3>

          <a class="btn-call-main" href="tel:+33784674767">Appeler le +33 7 84 67 47 67</a>

          <div class="alt-wrap">
            <small>Si pas de réponse :</small>
            <a class="alt-call" href="tel:0788589812">Appeler le 07 88 58 98 12</a>
          </div>
        </div>`;
      document.body.appendChild(dlg);
      dlg.showModal();

      const close = () => { dlg.close(); dlg.remove(); };
      dlg.querySelector('.modal-close').addEventListener('click', close);
      dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
      window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once:true });
    });
  }

  /* ===== Lien “Voir le site” de l’exemple : pas d’aperçu custom ===== */
  // (On laisse simplement le navigateur suivre le lien)
});