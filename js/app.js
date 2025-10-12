// ====== MENU (trois traits) ======
const menuBtn = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const backdrop = document.getElementById('backdrop');
const closeMenuBtn = document.getElementById('close-menu');

function openMenu(){
  sideMenu.classList.add('open');
  backdrop.classList.add('show');
  menuBtn.classList.add('is-open');
  menuBtn.setAttribute('aria-expanded','true');
  sideMenu.setAttribute('aria-hidden','false');
}
function closeMenu(){
  sideMenu.classList.remove('open');
  backdrop.classList.remove('show');
  menuBtn.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded','false');
  sideMenu.setAttribute('aria-hidden','true');
}

menuBtn?.addEventListener('click', () => {
  const isOpen = sideMenu.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});
closeMenuBtn?.addEventListener('click', closeMenu);
backdrop?.addEventListener('click', closeMenu);

// Empêche le zoom iOS au focus (pour inputs si un jour on les réactive)
document.addEventListener('touchstart', function(e){
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA'){
    e.target.style.fontSize = '16px';
  }
}, {passive:true});