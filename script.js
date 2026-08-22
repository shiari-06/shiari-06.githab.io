document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. スライダーの処理
  ========================================== */
  const track = document.getElementById('sliderTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const counter = document.getElementById('slideCounter');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // スライド位置とカウンターの更新
  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
  };

  // 次のスライドへ（末尾まで行ったら先頭に戻る）
  const showNext = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  };

  // 前のスライドへ（先頭で押したら末尾に戻る）
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  };

  // ボタンのクリックイベント
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // キーボードの矢印キー（左右）でも操作可能
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });

  // 初期表示
  updateSlider();

  /* ==========================================
     2. メニューの処理
  ========================================== */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // メニューの開閉切り替え
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });

  // リンクをクリックした際にメニューを閉じる
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    });
  });
});
