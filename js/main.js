/* =====================================================
   THANKS 訪問看護ステーション - main.js
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- ヘッダー: スクロール時にシャドウ追加 ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---- ハンバーガーメニュー ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
    // 外側クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ---- スクロールフェードイン ---- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 一度だけ発火
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---- お問い合わせフォーム ---- */
  const form = document.querySelector('.contact-form-el');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      const orig = btn.textContent;
      btn.textContent = '送信中…';
      btn.disabled = true;
      // ※実際の送信処理はバックエンドまたはFormspree/Netlify Formsに置き換えてください
      setTimeout(() => {
        btn.textContent = '✓ 送信完了しました。ありがとうございます！';
        form.reset();
      }, 1400);
    });
  }

  /* ---- スムーススクロール (href="#...") ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // ヘッダー分
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
