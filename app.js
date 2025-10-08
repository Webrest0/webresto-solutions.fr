// Menu mobile simple
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (btn) {
  btn.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', String(!open));
  });
}
