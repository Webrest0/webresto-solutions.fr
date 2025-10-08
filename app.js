// Menu mobile simple
const burger = document.getElementById('burger');
burger?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if(!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
