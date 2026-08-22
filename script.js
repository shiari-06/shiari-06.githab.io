document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. スクロールフェードイン (Intersection Observer)
  ========================================== */
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // 一度表示されたら監視解除
      }
    });
  }, { threshold: 0.1 });

  fadeInSections.forEach((sec) => observer.observe(sec));

  /* ==========================================
     2. スライダー & タブ切り替え処理
  ========================================== */
  const track = document.getElementById('sliderTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const counter = document.getElementById('slideCounter');
  const tabBtns = document.querySelectorAll('.tab-btn');

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

  // タブをクリックしたときに該当カテゴリの先頭スライドへ移動
  tabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filter = tab.dataset.filter;
      if (filter === 'all') {
        currentIndex = 0;
      } else {
        const targetIndex = slides.findIndex((s) => s.dataset.category === filter);
        if (targetIndex !== -1) {
          currentIndex = targetIndex;
        }
      }
      updateSlider();
    });
  });

  updateSlider();

  /* ==========================================
     3. いいね機能 (LocalStorage / CRUD)
  ========================================== */
  const likeData = JSON.parse(localStorage.getItem('portfolio_likes') || '{}');

  slides.forEach((slide) => {
    const workId = slide.dataset.id;
    const likeBtn = slide.querySelector('.like-btn');
    const heart = likeBtn.querySelector('.heart');
    const countSpan = likeBtn.querySelector('.like-count');

    // 保存データの初期表示
    const currentCount = likeData[workId] || 0;
    countSpan.textContent = currentCount;
    if (currentCount > 0) {
      likeBtn.classList.add('is-liked');
      heart.textContent = '♥';
    }

    // クリックイベント
    likeBtn.addEventListener('click', () => {
      likeData[workId] = (likeData[workId] || 0) + 1;
      countSpan.textContent = likeData[workId];
      likeBtn.classList.add('is-liked');
      heart.textContent = '♥';

      // LocalStorageへ永続化
      localStorage.setItem('portfolio_likes', JSON.stringify(likeData));
    });
  });

  /* ==========================================
     4. ナビゲーションメニューの処理
  ========================================== */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && navMenu) {
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

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      }
    });
  }
});
