document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .editorial-split__left, .editorial-split__right, .statement-section__image-wrap, .big-statement__inner, .big-statement__image-wrap').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  const toggle = document.querySelector('.mobile-menu-toggle');
  const headerLeft = document.querySelector('.header__left');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      headerLeft.classList.toggle('mobile-open');
    });
  }

  document.querySelectorAll('.product-card__quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const count = document.querySelector('.cart-count');
      count.textContent = parseInt(count.textContent) + 1;
      btn.textContent = 'Added!';
      setTimeout(() => { btn.textContent = 'Quick Add'; }, 1200);
    });
  });
});
