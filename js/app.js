/* ====== EmailJS (remplace par TES vrais IDs si besoin) ====== */
const EMAILJS_PUBLIC_KEY = "XgRStV-domSnc8RgY";
const EMAILJS_SERVICE_ID = "service_8bw61yj";
const EMAILJS_TEMPLATE_ID = "template_9ok4wz8";

if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);

/* ====== Année ====== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ====== Menu ====== */
const menuBtn = document.getElementById("menuBtn");
const mainMenu = document.getElementById("mainMenu");
menuBtn.addEventListener("click", ()=> mainMenu.classList.toggle("menu--open"));
mainMenu.querySelectorAll(".menu__link").forEach(a=>{
  a.addEventListener("click", ()=> mainMenu.classList.remove("menu--open"));
});

/* ====== Appeler (modal) ====== */
const callBtn = document.getElementById("callBtn");
const callModal = document.getElementById("callModal");
const closeCall = callModal.querySelector(".modal__close");
callBtn.addEventListener("click", ()=> callModal.classList.add("modal--open"));
closeCall.addEventListener("click", ()=> callModal.classList.remove("modal--open"));
callModal.addEventListener("click", (e)=>{ if(e.target===callModal) callModal.classList.remove("modal--open"); });

/* ====== Scroll fluide sur ancres ====== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", (e)=>{
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

/* ====== Carrousel simple ====== */
const track = document.querySelector(".car-track");
const prev = document.querySelector(".car-prev");
const next = document.querySelector(".car-next");
let slide = 0;
function updateCar(){ track.style.transform = `translateX(-${slide*100}%)`; }
prev.addEventListener("click", ()=>{ slide = Math.max(0, slide-1); updateCar(); });
next.addEventListener("click", ()=>{ slide = Math.min(track.children.length-1, slide+1); updateCar(); });

/* ====== Formulaire EmailJS (interface intacte) ====== */
const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.classList.remove("error");
  sendBtn.disabled = true;

  // multi-select features
  const features = Array.from(document.getElementById("features").selectedOptions).map(o=>o.value).join(", ");

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    pack: form.pack.value,
    theme: form.theme.value,
    colors: form.colors.value.trim(),
    features,
    domain: form.domain.value.trim(),
    public_contact: form.public_contact.value.trim(),
    message: form.message.value.trim()
  };

  try{
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    statusEl.textContent = "✅ Votre message a bien été envoyé.";
    form.reset();
  }catch(err){
    console.error(err);
    statusEl.textContent = "❌ Échec de l’envoi. Réessayez plus tard.";
    statusEl.classList.add("error");
  }finally{
    sendBtn.disabled = false;
  }
});