/* Défilement fluide */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id && id.length>1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
      // Ferme le menu latéral si ouvert
      closeSide();
    }
  });
});

/* Menu latéral (trois traits) */
const menuBtn = document.getElementById('menuBtn');
const side = document.getElementById('sideMenu');
function openSide(){ side?.classList.add('open'); menuBtn?.classList.add('open'); }
function closeSide(){ side?.classList.remove('open'); menuBtn?.classList.remove('open'); }
menuBtn?.addEventListener('click', ()=>{
  if (side?.classList.contains('open')) closeSide(); else openSide();
});
side?.addEventListener('click', (e)=>{
  const panel = side.querySelector('.side-nav');
  if (panel && !panel.contains(e.target)) closeSide();
});

/* Modale Appeler */
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
function openModal(){ if(callModal && !callModal.open) callModal.showModal(); }
function closeModal(){ if(callModal && callModal.open) callModal.close(); }
callBtn?.addEventListener('click', openModal);
callModal?.querySelector('.close')?.addEventListener('click', closeModal);
callModal?.addEventListener('click', (e)=>{
  const card = callModal.querySelector('.modal-card');
  if(card && !card.contains(e.target)) closeModal();
});

/* Carrousel */
const track = document.getElementById('carTrack');
document.querySelector('.car-btn.left')?.addEventListener('click', ()=> track?.scrollBy({left:-300,behavior:'smooth'}));
document.querySelector('.car-btn.right')?.addEventListener('click', ()=> track?.scrollBy({left:300,behavior:'smooth'}));

/* Formulaire — message de confirmation côté front (pas EmailJS ici) */
const form = document.getElementById('orderForm');
const formMsg = document.getElementById('formMsg');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  formMsg.textContent = '✅ Votre demande a bien été envoyée (simulation).';
  form.reset();
});