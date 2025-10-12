/* === Verrou global (ne rien modifier visuellement en dehors de ce qui suit) === */

/* Burger menu */
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const closeNav = document.getElementById('closeNav');

if (burgerBtn && mobileNav){
  burgerBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden','false');
  });
}
if (closeNav){
  closeNav.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden','true');
  });
}

/* Call modal (verrouillé) */
const callBtn = document.getElementById('callBtn');
const callModal = document.getElementById('callModal');
const closeCall = document.getElementById('closeCall');

if (callBtn && callModal){
  callBtn.addEventListener('click', () => callModal.showModal());
}
if (closeCall && callModal){
  closeCall.addEventListener('click', () => callModal.close());
}

/* Carousel (verrouillé) – boutons prev/next */
document.querySelectorAll('.carousel').forEach(carousel=>{
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const step = () => carousel.clientWidth * 0.9;

  prev?.addEventListener('click', ()=> carousel.scrollBy({left:-step(),behavior:'smooth'}));
  next?.addEventListener('click', ()=> carousel.scrollBy({left: step(),behavior:'smooth'}));
});

/* “Choisir ce pack” -> pré-remplissage (respecte le verrouillage du formulaire) */
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    // Ici on n’ouvre/édite rien puisque le formulaire est verrouillé.
    // On affiche juste un petit feedback discret.
    btn.classList.add('chosen');
    setTimeout(()=>btn.classList.remove('chosen'),700);
  });
});