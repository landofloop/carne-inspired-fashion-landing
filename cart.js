document.addEventListener('DOMContentLoaded', () => {

  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const cartEmpty = document.getElementById('cart-empty');
  const cartRecs = document.getElementById('cart-recs');

  function recalc() {
    const items = cartItems.querySelectorAll('.cart-item');
    let subtotal = 0;
    let totalQty = 0;

    items.forEach(item => {
      const price = Number(item.dataset.price);
      const qty = Number(item.dataset.qty);
      subtotal += price * qty;
      totalQty += qty;
    });

    document.getElementById('subtotal').textContent = subtotal + ' €';
    document.getElementById('total').textContent = subtotal + ' €';
    document.getElementById('cart-item-count').textContent = totalQty + (totalQty === 1 ? ' item' : ' items');
    document.querySelector('.cart-count').textContent = totalQty;

    const shippingEl = document.getElementById('shipping');
    if (subtotal >= 100) {
      shippingEl.textContent = 'Free';
      shippingEl.className = 'cart-summary__free';
    } else if (subtotal > 0) {
      shippingEl.textContent = '9.90 €';
      shippingEl.className = '';
      document.getElementById('total').textContent = (subtotal + 9.90).toFixed(2).replace('.', ',') + ' €';
    }

    if (items.length === 0) {
      cartItems.style.display = 'none';
      cartSummary.style.display = 'none';
      cartEmpty.style.display = 'block';
      cartRecs.style.display = 'block';
    }
  }

  // Quantity buttons
  cartItems.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-minus, .qty-plus');
    if (!btn) return;

    const item = btn.closest('.cart-item');
    const qtyEl = item.querySelector('.cart-item__qty-value');
    const priceEl = item.querySelector('.cart-item__price');
    let qty = Number(item.dataset.qty);
    const unitPrice = Number(item.dataset.price);

    if (btn.classList.contains('qty-minus') && qty > 1) {
      qty--;
    } else if (btn.classList.contains('qty-plus') && qty < 10) {
      qty++;
    }

    item.dataset.qty = qty;
    qtyEl.textContent = qty;
    priceEl.textContent = (unitPrice * qty) + ' €';
    recalc();
  });

  // Remove item
  cartItems.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.cart-item__remove');
    if (!removeBtn) return;

    const item = removeBtn.closest('.cart-item');
    item.classList.add('removing');
    setTimeout(() => {
      item.remove();
      recalc();
    }, 300);
  });

  // Order note toggle
  document.getElementById('note-toggle').addEventListener('click', () => {
    const input = document.getElementById('note-input');
    input.classList.toggle('open');
    if (input.classList.contains('open')) input.focus();
  });

  // Promo code toggle
  document.getElementById('promo-toggle').addEventListener('click', () => {
    document.getElementById('promo-form').classList.toggle('open');
    document.getElementById('promo-toggle').style.display =
      document.getElementById('promo-form').classList.contains('open') ? 'none' : '';
  });

  // Promo code apply
  document.getElementById('promo-apply').addEventListener('click', () => {
    const code = document.getElementById('promo-input').value.trim().toUpperCase();
    const msg = document.getElementById('promo-msg');

    if (code === 'CALIENTE10') {
      msg.textContent = 'Code applied! 10% off your order.';
      msg.className = 'cart-promo__msg success';
      document.getElementById('promo-form').classList.remove('open');
    } else if (code === '') {
      msg.textContent = 'Please enter a code.';
      msg.className = 'cart-promo__msg error';
    } else {
      msg.textContent = 'Invalid promo code. Try again.';
      msg.className = 'cart-promo__msg error';
    }
  });

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    const btn = document.getElementById('checkout-btn');
    btn.textContent = 'Redirecting...';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = 'Proceed to Checkout';
      btn.style.pointerEvents = '';
    }, 2000);
  });

  // Quick Add (recommendations)
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

  // Fade-in for recommendations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cart-recommendations .product-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Mobile menu
  const toggle = document.querySelector('.mobile-menu-toggle');
  const headerLeft = document.querySelector('.header__left');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      headerLeft.classList.toggle('mobile-open');
    });
  }
});
