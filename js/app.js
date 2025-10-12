/* ===== Burger / Drawer ===== */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('drawer-backdrop');
const drawerClose = drawer.querySelector('.drawer-close');

function openDrawer() {
  drawer.classList.add('open');
  backdrop.classList.add('show');
  burger.setAttribute('aria-expanded', 'true');
  drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  drawer.classList.remove('open');
  backdrop.classList.remove('show');
  burger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
}
burger?.addEventListener('click', (e)=> {
  const open = drawer.classList.contains('open');
  open ? closeDrawer() : openDrawer();
});
drawerClose?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);

/* Fermer le drawer quand on clique un lien */
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

/* ===== Carrousel “Pour qui ?” ===== */
const track = document.getElementById('car-track');
const leftBtn = document.querySelector('.car-arrow.left');
const rightBtn = document.querySelector('.car-arrow.right');

function slideTo(index){
  const w = track.clientWidth;
  const slides = track.children.length;
  if(index < 0) index = 0;
  if(index > slides-1) index = slides-1;
  track.dataset.index = index;
  track.scrollTo({left: index * w, behavior:'smooth'});
}
leftBtn?.addEventListener('click', ()=> slideTo( Number(track.dataset.index||0) - 1 ));
rightBtn?.addEventListener('click', ()=> slideTo( Number(track.dataset.index||0) + 1 ));
window.addEventListener('resize', ()=> slideTo( Number(track.dataset.index||0) ));

/* ===== Offres → pré-remplir le pack dans le formulaire ===== */
document.querySelectorAll('.choose-pack').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const pack = btn.getAttribute('data-pack');
    const select = document.querySelector('#wr-form select[name="pack"]');
    if(select){
      select.value = pack;
      // Aller à la section formulaire
      document.getElementById('demander').scrollIntoView({behavior:'smooth'});
    }
  });
});

/* ===== Formulaire (EmailJS si clés, sinon mailto) ===== */
const form = document.getElementById('wr-form');
const statusEl = document.getElementById('form-status');

function buildEmailBody(data){
  return [
    "Détaillez votre demande :",
    "",
    `Nom / Société : ${data.name}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone}`,
    ``,
    `Pack souhaité : ${data.pack}`,
    `Thème du site : ${data.theme}`,
    `Couleurs souhaitées : ${data.colors || ""}`,
    `Fonctionnalités à intégrer : ${data.features || ""}`,
    `Nom de domaine souhaité : ${data.domain || ""}`,
    `Contact à afficher : ${data.public_contact || ""}`,
    ``,
    `Message :`,
    `${data.message || ""}`
  ].join("\n");
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  statusEl.textContent = "Envoi…";

  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  // récupère tous les features cochés
  const features = [];
  form.querySelectorAll('input[name="features"]:checked').forEach(c => features.push(c.value));
  data.features = features.join(', ');

  try{
    // Envoi EmailJS si clés fournies
    const keys = window._WR_KEYS;
    if(keys && window.emailjs){ 
      emailjs.init(keys.publicKey);
      await emailjs.send(keys.serviceId, keys.templateId, data);
      statusEl.textContent = "Message envoyé ✅";
      form.reset();
      return;
    }

    // Fallback : mailto (ouvre l'app Mail / Gmail)
    const to = "smarttlelearning@gmail.com";
    const subject = encodeURIComponent("Commandes Webresto");
    const body = encodeURIComponent(buildEmailBody(data));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    statusEl.textContent = "App mail ouvert ✉️";
  }catch(err){
    console.error(err);
    statusEl.textContent = "Erreur d’envoi. Réessaie.";
  }
});

/* ===== iOS : empêcher zoom sur focus (déjà géré par font-size>=16) ===== */