// スライダーの初期化
const initSlider = () => {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const counter = document.getElementById('slideCounter');
  let currentIndex = 0;
  const totalSlides = slides.length;

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (counter) counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  updateSlider();
};

// メニューの初期化
const initMenu = () => {
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    });
  });

  // メニュー外をクリックした時に閉じる
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initMenu();
});
