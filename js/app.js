/* Liens d’ancrage en smooth */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* Menu (visuel uniquement) */
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', ()=> menuBtn.classList.toggle('open'));

/* Modale "Appeler" */
const callBtn   = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');

function openModal(){ if (callModal && !callModal.open) callModal.showModal(); }
function closeModal(){ if (callModal && callModal.open) callModal.close(); }

callBtn?.addEventListener('click', openModal);
callModal?.querySelector('.close')?.addEventListener('click', closeModal);
callModal?.addEventListener('click', (e)=>{
  const card = callModal.querySelector('.modal-card');
  if (card && !card.contains(e.target)) closeModal();
});

/* Carrousel */
const track = document.getElementById('carTrack');
document.querySelector('.car-btn.left')?.addEventListener('click', ()=> track?.scrollBy({left:-300,behavior:'smooth'}));
document.querySelector('.car-btn.right')?.addEventListener('click', ()=> track?.scrollBy({left:300,behavior:'smooth'}));