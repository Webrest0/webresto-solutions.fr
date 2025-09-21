const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const yearEl = document.getElementById('year');

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('active');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

yearEl && (yearEl.textContent = new Date().getFullYear());

const carousel = document.querySelector('.carousel');
if (carousel) {
  const track = carousel.querySelector('.track');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dots = Array.from(carousel.querySelectorAll('.dot'));
  let currentIndex = 0;
  let isPointerDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('img[data-src]');
        if (img) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { root: track, threshold: 0.5 });

  slides.forEach(slide => observer.observe(slide));

  const updateDots = index => {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  const goToSlide = index => {
    if (!track) return;
    currentIndex = (index + slides.length) % slides.length;
    track.scrollTo({
      left: track.clientWidth * currentIndex,
      behavior: 'smooth'
    });
    updateDots(currentIndex);
  };

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));

  track?.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  });

  track?.addEventListener('pointerdown', e => {
    isPointerDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  });

  track?.addEventListener('pointermove', e => {
    if (!isPointerDown) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });

  const endSwipe = () => {
    if (!isPointerDown) return;
    isPointerDown = false;
  };

  track?.addEventListener('pointerup', endSwipe);
  track?.addEventListener('pointercancel', endSwipe);
  track?.addEventListener('mouseleave', endSwipe);

  window.addEventListener('resize', () => goToSlide(currentIndex));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  updateDots(currentIndex);
}
