// RawSacredBlends basic interactions
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Age gate
  const ageGate = document.getElementById('ageGate');
  const ageYes = document.getElementById('ageYes');
  const ageNo = document.getElementById('ageNo');
  const AGE_KEY = 'rsb_age_verified_v1';
  const showAgeGate = () => { if (ageGate) ageGate.classList.add('show'); };
  const hideAgeGate = () => { if (ageGate) ageGate.classList.remove('show'); };
  try {
    const verified = localStorage.getItem(AGE_KEY) === 'true';
    if (!verified) showAgeGate();
  } catch {}
  if (ageYes) ageYes.addEventListener('click', () => {
    try { localStorage.setItem(AGE_KEY, 'true'); } catch {}
    hideAgeGate();
  });
  if (ageNo) ageNo.addEventListener('click', () => {
    if (ageGate) {
      ageGate.querySelector('.modal-content').innerHTML = '<h2>Access Restricted</h2><p>You must be of legal age to enter.</p>';
    }
  });

  // Products (placeholder)
  const products = [
    {
      id: 'rainforest-grounding',
      name: 'Rainforest Grounding',
      price: 70,
      image: 'Canopy2.jpg',
      desc: 'Earth-forward ceremonial blend for grounding prayer and clarity.'
    },
    {
      id: 'sunrise-clarity',
      name: 'Sunrise Clarity',
      price: 85,
      image: 'Amazon.jpeg',
      desc: 'Light aromatic profile intended for breath-centered ritual focus.'
    },
    {
      id: 'river-connection',
      name: 'River Connection',
      price: 70,
      image: '1200px-Aerial_view_of_the_Amazon_Rainforest.jpg',
      desc: 'Balanced, prayerful blend offered to deepen relationship and song.'
    }
  ];

  const cartKey = 'rsb_cart_v1';
  const getCart = () => {
    try { return JSON.parse(localStorage.getItem(cartKey) || '[]'); }
    catch { return []; }
  };
  const setCart = (items) => localStorage.setItem(cartKey, JSON.stringify(items));
  const cartCountEl = document.getElementById('cartCount');
  const updateCount = () => {
    const count = getCart().reduce((n, i) => n + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = String(count);
  };

  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    productGrid.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}">
        <div class="media" style="background-image:url('${p.image}');"></div>
        <div class="body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="price">Price (10 g): $${p.price.toFixed(2)}</div>
          <div class="actions">
            <button class="add">Add to Cart</button>
            <button class="buy">Buy Now</button>
          </div>
        </div>
      </div>
    `).join('');

    productGrid.addEventListener('click', (e) => {
      const btn = e.target;
      if (!(btn instanceof HTMLElement)) return;
      const card = btn.closest('.product-card');
      if (!card) return;
      const id = card.getAttribute('data-id');
      const product = products.find(p => p.id === id);
      if (!product) return;

      if (btn.classList.contains('add')) {
        const cart = getCart();
        const existing = cart.find(i => i.id === id);
        if (existing) existing.qty += 1; else cart.push({ id, qty: 1 });
        setCart(cart);
        updateCount();
        card.querySelector('.add').textContent = 'Added ✔';
        setTimeout(() => { card.querySelector('.add').textContent = 'Add to Cart'; }, 1200);
      }
      if (btn.classList.contains('buy')) {
        startCheckout([{ id, qty: 1 }]);
      }
    });
  }

  // Stripe checkout stub
  function startCheckout(items) {
    if (!Array.isArray(items) || items.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    const pubKey = window.STRIPE_PUBLIC_KEY;
    if (!pubKey) {
      console.log('Stripe public key missing. Items:', items);
      alert('Checkout not configured yet. Please add Stripe keys and backend.');
      return;
    }
    const stripe = window.Stripe ? window.Stripe(pubKey) : null;
    if (!stripe) {
      alert('Stripe.js not available.');
      return;
    }
    // Example backend call (replace with your server endpoint)
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) return stripe.redirectToCheckout({ sessionId: data.id });
        throw new Error('Invalid session response');
      })
      .catch(err => {
        console.error(err);
        alert('Unable to start checkout. Please try again later.');
      });
  }

  updateCount();
})();
