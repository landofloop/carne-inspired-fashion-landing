document.addEventListener('DOMContentLoaded', () => {

  // === IMAGE GALLERY ===
  const images = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1100&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1100&fit=crop&crop=bottom',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&h=1100&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&h=1100&fit=crop'
  ];
  let currentIndex = 0;
  const mainImage = document.getElementById('main-image');
  const thumbs = document.querySelectorAll('.pdp__thumb');

  function setImage(index) {
    currentIndex = index;
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = images[index];
      mainImage.style.opacity = '1';
    }, 150);
    thumbs.forEach(t => t.classList.remove('pdp__thumb--active'));
    thumbs[index].classList.add('pdp__thumb--active');
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => setImage(Number(thumb.dataset.index)));
  });

  document.getElementById('gallery-prev').addEventListener('click', () => {
    setImage((currentIndex - 1 + images.length) % images.length);
  });

  document.getElementById('gallery-next').addEventListener('click', () => {
    setImage((currentIndex + 1) % images.length);
  });

  // === COLOR SWATCHES ===
  const swatches = document.querySelectorAll('.pdp__swatch');
  const colorName = document.getElementById('color-name');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('pdp__swatch--active'));
      swatch.classList.add('pdp__swatch--active');
      colorName.textContent = swatch.dataset.color;
    });
  });

  // === SIZE SELECTOR ===
  const sizes = document.querySelectorAll('.pdp__size:not(:disabled)');

  sizes.forEach(size => {
    size.addEventListener('click', () => {
      sizes.forEach(s => s.classList.remove('pdp__size--active'));
      size.classList.add('pdp__size--active');
    });
  });

  // === QUANTITY ===
  const qtyValue = document.getElementById('qty-value');
  const basePrice = 85;
  const addBtn = document.getElementById('add-to-cart');

  function updatePrice() {
    const qty = parseInt(qtyValue.textContent);
    const total = qty * basePrice;
    addBtn.textContent = `Add to Cart — ${total} €`;
  }

  document.getElementById('qty-minus').addEventListener('click', () => {
    let val = parseInt(qtyValue.textContent);
    if (val > 1) {
      qtyValue.textContent = val - 1;
      updatePrice();
    }
  });

  document.getElementById('qty-plus').addEventListener('click', () => {
    let val = parseInt(qtyValue.textContent);
    if (val < 10) {
      qtyValue.textContent = val + 1;
      updatePrice();
    }
  });

  // === ADD TO CART ===
  addBtn.addEventListener('click', () => {
    const qty = parseInt(qtyValue.textContent);
    const count = document.querySelector('.cart-count');
    count.textContent = parseInt(count.textContent) + qty;
    addBtn.classList.add('added');
    addBtn.textContent = 'Added to Cart!';
    setTimeout(() => {
      addBtn.classList.remove('added');
      updatePrice();
    }, 1500);
  });

  // === WISHLIST ===
  document.getElementById('wishlist-btn').addEventListener('click', () => {
    const btn = document.getElementById('wishlist-btn');
    btn.classList.toggle('active');
    const span = btn.querySelector('span');
    span.textContent = btn.classList.contains('active') ? 'Added to Wishlist' : 'Add to Wishlist';
  });

  // === ACCORDIONS ===
  document.querySelectorAll('.pdp__accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const accordion = trigger.parentElement;
      const wasOpen = accordion.classList.contains('pdp__accordion--open');

      document.querySelectorAll('.pdp__accordion').forEach(a => a.classList.remove('pdp__accordion--open'));

      if (!wasOpen) {
        accordion.classList.add('pdp__accordion--open');
      }
    });
  });

  // === QUICK ADD (related products) ===
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

  // === FADE IN ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pdp-related .product-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // === MOBILE MENU ===
  const toggle = document.querySelector('.mobile-menu-toggle');
  const headerLeft = document.querySelector('.header__left');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      headerLeft.classList.toggle('mobile-open');
    });
  }

  // === MAIN IMAGE FADE TRANSITION ===
  mainImage.style.transition = 'opacity 0.15s ease';
});
