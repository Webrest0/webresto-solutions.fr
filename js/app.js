// Burger
const burgerBtn=document.getElementById('burgerBtn');
const mobileMenu=document.getElementById('mobileMenu');
burgerBtn.onclick=()=>{
  const open=mobileMenu.hasAttribute('hidden');
  if(open){mobileMenu.removeAttribute('hidden');burgerBtn.setAttribute('aria-expanded','true')}
  else{mobileMenu.setAttribute('hidden','');burgerBtn.setAttribute('aria-expanded','false')}
};
document.querySelectorAll('#mobileMenu a').forEach(a=>a.onclick=()=>mobileMenu.setAttribute('hidden',''));

// Carousel
const track=document.querySelector('.carousel__track');
const slides=Array.from(document.querySelectorAll('.slide'));
let i=0;
function update(){track.style.transform=`translateX(-${i*100}%)`}
document.querySelector('.carousel .prev').onclick=()=>{i=(i-1+slides.length)%slides.length;update();}
document.querySelector('.carousel .next').onclick=()=>{i=(i+1)%slides.length;update();}
update();

// EmailJS
(function(){emailjs.init({publicKey:"XgRStV-domSnc8RgY"});})();
const form=document.getElementById('orderForm');
const statusEl=document.getElementById('formStatus');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const fd=new FormData(form);
  const data=Object.fromEntries(fd.entries());
  statusEl.textContent='Envoi...';
  try{
    await emailjs.send('service_8bw61yj','template_9ok4wz8',data);
    statusEl.textContent='Message envoyé ✅';
    form.reset();
  }catch(e){statusEl.textContent='Erreur : vérifie EmailJS';console.error(e);}
});