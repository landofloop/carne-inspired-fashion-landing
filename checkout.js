document.addEventListener('DOMContentLoaded', () => {

  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
  ];
  const stepIndicators = document.querySelectorAll('.checkout-step');

  function goToStep(n) {
    steps.forEach((s, i) => {
      s.classList.toggle('checkout-section--hidden', i !== n);
    });
    stepIndicators.forEach((ind, i) => {
      ind.classList.remove('checkout-step--active', 'checkout-step--done');
      if (i < n) ind.classList.add('checkout-step--done');
      if (i === n) ind.classList.add('checkout-step--active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Step navigation
  document.getElementById('to-step-2').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const address = document.getElementById('address').value.trim();

    document.getElementById('summary-email').textContent = email || '---';
    document.getElementById('summary-email-2').textContent = email || '---';

    const addrText = [address, city].filter(Boolean).join(', ') || '---';
    document.getElementById('summary-address').textContent = addrText;
    document.getElementById('summary-address-2').textContent = addrText;

    goToStep(1);
  });

  document.getElementById('to-step-3').addEventListener('click', () => {
    const selected = document.querySelector('input[name="shipping"]:checked');
    const label = selected.closest('.shipping-option');
    const name = label.querySelector('.shipping-option__name').textContent;
    const price = label.querySelector('.shipping-option__price').textContent;
    document.getElementById('summary-shipping').textContent = name + ' · ' + price;

    if (selected.value === 'express') {
      document.getElementById('checkout-shipping').textContent = '9.90 €';
      document.getElementById('checkout-total').textContent = '354.90 €';
      document.getElementById('pay-btn').textContent = 'Pay Now — 354.90 €';
    } else {
      document.getElementById('checkout-shipping').textContent = 'Free';
      document.getElementById('checkout-total').textContent = '345 €';
      document.getElementById('pay-btn').textContent = 'Pay Now — 345 €';
    }

    goToStep(2);
  });

  document.getElementById('back-to-1').addEventListener('click', () => goToStep(0));
  document.getElementById('back-to-2').addEventListener('click', () => goToStep(1));

  // Change buttons in summary bars
  document.querySelectorAll('.checkout-summary-change').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(Number(btn.dataset.goto) - 1);
    });
  });

  // Shipping option selection
  document.querySelectorAll('.shipping-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.shipping-option').forEach(o => o.classList.remove('shipping-option--active'));
      opt.classList.add('shipping-option--active');
    });
  });

  // Payment method selection
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('payment-method--active'));
      method.classList.add('payment-method--active');

      const cardFields = document.getElementById('card-fields');
      if (method.querySelector('input').value === 'card') {
        cardFields.classList.remove('hidden');
      } else {
        cardFields.classList.add('hidden');
      }
    });
  });

  // Billing option selection
  document.querySelectorAll('.billing-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.billing-option').forEach(o => o.classList.remove('billing-option--active'));
      opt.classList.add('billing-option--active');
    });
  });

  // Card number formatting
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', () => {
      let val = cardInput.value.replace(/\D/g, '').substring(0, 16);
      cardInput.value = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
  }

  // Expiry formatting
  const expiryInput = document.getElementById('card-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', () => {
      let val = expiryInput.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) val = val.substring(0, 2) + '/' + val.substring(2);
      expiryInput.value = val;
    });
  }

  // Select float label fix
  document.querySelectorAll('.form-field select').forEach(sel => {
    sel.addEventListener('change', () => {
      if (sel.value) sel.classList.add('has-value');
      else sel.classList.remove('has-value');
    });
  });

  // Pay button
  document.getElementById('pay-btn').addEventListener('click', () => {
    const btn = document.getElementById('pay-btn');
    btn.textContent = 'Processing...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      document.getElementById('order-number').textContent =
        Math.floor(10000 + Math.random() * 90000);
      document.getElementById('checkout-success').classList.add('active');
    }, 2000);
  });

  // Mobile summary toggle
  const summaryToggle = document.getElementById('summary-toggle');
  const summaryInner = document.getElementById('summary-inner');

  if (summaryToggle) {
    summaryToggle.addEventListener('click', () => {
      summaryToggle.classList.toggle('open');
      summaryInner.classList.toggle('open');
      const span = summaryToggle.querySelector('span');
      span.textContent = summaryToggle.classList.contains('open')
        ? 'Hide order summary'
        : 'Show order summary';
    });
  }
});
