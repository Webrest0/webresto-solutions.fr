/* ===========
   CONFIG
=========== */

// ⚠️ Colle ici TES identifiants EmailJS
const EMAILJS_PUBLIC_KEY = "XgRStV-domSnc8RgY";      // clé publique
const EMAILJS_SERVICE_ID = "service_8bw61yj";        // service id
const EMAILJS_TEMPLATE_ID = "template_9ok4wz8";      // template id

// Lien vers le site PIZZ'AMIGO (à mettre à jour si besoin)
const PIZZ_SITE_URL = "https://pizz-amigo.example.com"; // remplace par l'URL réelle


/* ===========
   INIT
=========== */
document.getElementById("year").textContent = new Date().getFullYear();

// EmailJS
if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ===========
   MENU
=========== */
const menuBtn = document.getElementById("menuBtn");
const mainMenu = document.getElementById("mainMenu");
menuBtn.addEventListener("click", () => {
  mainMenu.classList.toggle("menu--open");
});
mainMenu.querySelectorAll(".menu__link").forEach(a => {
  a.addEventListener("click", () => mainMenu.classList.remove("menu--open"));
});

/* ===========
   CALL MODAL
=========== */
const callBtn = document.getElementById("callBtn");
const callModal = document.getElementById("callModal");
const closeCall = callModal.querySelector(".modal__close");

callBtn.addEventListener("click", () => callModal.classList.add("modal--open"));
closeCall.addEventListener("click", () => callModal.classList.remove("modal--open"));
callModal.addEventListener("click", (e) => {
  if (e.target === callModal) callModal.classList.remove("modal--open");
});

/* ===========
   EXAMPLE LINK
=========== */
const pizzLink = document.getElementById("pizzLink");
pizzLink.href = PIZZ_SITE_URL;

/* ===========
   FORM SUBMIT (EmailJS)
=========== */
const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  statusEl.classList.remove("error");
  sendBtn.disabled = true;

  // Récupérer les features multi
  const featuresSel = document.getElementById("features");
  const features = Array.from(featuresSel.selectedOptions).map(o => o.value).join(", ");

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

  // Envoi
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    statusEl.textContent = "✅ Votre message a bien été envoyé.";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Échec de l’envoi. Réessayez plus tard.";
    statusEl.classList.add("error");
  } finally {
    sendBtn.disabled = false;
  }
});