// menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav){
  burger.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// année auto
document.getElementById('year').textContent = new Date().getFullYear();

// scroll doux pour ancres internes
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length>1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
    }
  });
});
