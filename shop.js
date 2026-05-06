document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  const productCount = document.getElementById('product-count');
  const showingCount = document.getElementById('showing-count');

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Filtering
  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      activeFilter = btn.dataset.filter;
      applyFilterAndSort();
    });
  });

  // Sorting
  sortSelect.addEventListener('change', () => {
    applyFilterAndSort();
  });

  function applyFilterAndSort() {
    let visible = cards.filter(card => {
      if (activeFilter === 'all') return true;
      return card.dataset.category === activeFilter;
    });

    let hidden = cards.filter(card => !visible.includes(card));

    // Sort
    const sortVal = sortSelect.value;
    if (sortVal === 'price-asc') {
      visible.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortVal === 'price-desc') {
      visible.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (sortVal === 'newest') {
      visible.sort((a, b) => {
        const aNew = a.querySelector('.product-card__badge:not(.product-card__badge--hot)');
        const bNew = b.querySelector('.product-card__badge:not(.product-card__badge--hot)');
        return (bNew ? 1 : 0) - (aNew ? 1 : 0);
      });
    }

    hidden.forEach(card => card.classList.add('hidden'));

    visible.forEach((card, i) => {
      card.classList.remove('hidden');
      card.style.order = i;
      card.classList.add('fade-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.remove('fade-enter');
        });
      });
    });

    // Reorder DOM
    visible.forEach(card => grid.appendChild(card));
    hidden.forEach(card => grid.appendChild(card));

    productCount.textContent = visible.length;
    showingCount.textContent = visible.length;
  }

  // Quick Add
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

  // Load More (simulated)
  const loadMoreBtn = document.getElementById('load-more');
  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.textContent = 'No more products';
    loadMoreBtn.style.opacity = '0.4';
    loadMoreBtn.style.pointerEvents = 'none';
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
