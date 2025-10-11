// --- MENU MOBILE ---
function toggleMenu() {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('open');
}

// --- CAROUSEL ---
let index = 0;
function moveSlide(step) {
  const track = document.querySelector('.carousel-track');
  const slides = track.children.length;
  index = (index + step + slides) % slides;
  track.style.transform = `translateX(-${index * 310}px)`;
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// --- AUTO CLOSE MENU ON MOBILE CLICK ---
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.navbar');
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});