// ===== DATA =====
const RESTAURANTS = [
  {
    id: 1, name: "Pizzaria Napolitana", category: "pizza",
    tags: ["Pizza", "Italiana", "Massa"], emoji: "🍕",
    rating: 4.8, reviews: 2341, time: "25-35 min", fee: 0,
    promo: "30% OFF", open: true,
    menu: [
      { id: 101, name: "Pizza Margherita", desc: "Molho de tomate, mozzarella, manjericão fresco", price: 42.90, emoji: "🍕" },
      { id: 102, name: "Pizza Calabresa", desc: "Calabresa, cebola, azeitona, mozzarella", price: 44.90, emoji: "🍕" },
      { id: 103, name: "Pizza 4 Queijos", desc: "Mozzarella, parmesão, gorgonzola, catupiry", price: 49.90, emoji: "🧀" },
      { id: 104, name: "Pizza Frango c/ Catupiry", desc: "Frango desfiado, catupiry cremoso", price: 46.90, emoji: "🍗" },
      { id: 105, name: "Refrigerante 2L", desc: "Coca-Cola, Guaraná ou Sprite", price: 12.00, emoji: "🥤" },
    ]
  },
  {
    id: 2, name: "Burger House", category: "burger",
    tags: ["Hambúrguer", "Batata Frita", "American"], emoji: "🍔",
    rating: 4.6, reviews: 1892, time: "30-45 min", fee: 4.99,
    promo: null, open: true,
    menu: [
      { id: 201, name: "Classic Burger", desc: "Blend 180g, queijo cheddar, alface, tomate, cebola", price: 28.90, emoji: "🍔" },
      { id: 202, name: "Double Smash", desc: "Dois smash burgers, cheddar duplo, molho especial", price: 38.90, emoji: "🍔" },
      { id: 203, name: "Chicken Crispy", desc: "Frango empanado crocante, maionese temperada", price: 32.90, emoji: "🍗" },
      { id: 204, name: "Batata Frita G", desc: "Porção grande crocante com sal e tempero", price: 18.90, emoji: "🍟" },
      { id: 205, name: "Onion Rings", desc: "Anéis de cebola empanados crocantes", price: 16.90, emoji: "🧅" },
    ]
  },
  {
    id: 3, name: "Sushi Zen", category: "japanese",
    tags: ["Japonesa", "Sushi", "Temaki"], emoji: "🍱",
    rating: 4.9, reviews: 3102, time: "40-55 min", fee: 6.99,
    promo: null, open: true,
    menu: [
      { id: 301, name: "Combo Sushi 30 peças", desc: "Variedade de niguiris, hossomaki e uramaki", price: 69.90, emoji: "🍣" },
      { id: 302, name: "Temaki Salmão", desc: "Cone de arroz com salmão fresco e cream cheese", price: 24.90, emoji: "🌮" },
      { id: 303, name: "Hot Philadelphia", desc: "Uramaki frito com salmão e cream cheese (8 un)", price: 32.90, emoji: "🍱" },
      { id: 304, name: "Missoshiru", desc: "Sopa de missô com tofu e cebolinha", price: 12.90, emoji: "🍜" },
      { id: 305, name: "Saquê", desc: "Saquê gelado 300ml", price: 19.90, emoji: "🍶" },
    ]
  },
  {
    id: 4, name: "Churrascaria do Gaúcho", category: "brazilian",
    tags: ["Churrasco", "Brasileira", "Carnes"], emoji: "🥩",
    rating: 4.7, reviews: 1543, time: "45-60 min", fee: 7.99,
    promo: null, open: true,
    menu: [
      { id: 401, name: "Picanha na Brasa", desc: "300g de picanha grelhada com farofa e vinagrete", price: 59.90, emoji: "🥩" },
      { id: 402, name: "Fraldinha", desc: "200g de fraldinha ao ponto, acompanha arroz e feijão", price: 48.90, emoji: "🍖" },
      { id: 403, name: "Costela de Porco", desc: "Meia costela suína defumada", price: 54.90, emoji: "🍖" },
      { id: 404, name: "Feijão Tropeiro", desc: "Feijão carioca, bacon, farinha, couve", price: 22.90, emoji: "🫘" },
      { id: 405, name: "Caipirinha", desc: "Caipirinha de limão 300ml", price: 18.00, emoji: "🍹" },
    ]
  },
  {
    id: 5, name: "Green Bowl", category: "healthy",
    tags: ["Saudável", "Saladas", "Vegano"], emoji: "🥗",
    rating: 4.5, reviews: 987, time: "20-30 min", fee: 0,
    promo: "Frete grátis", open: true,
    menu: [
      { id: 501, name: "Power Bowl", desc: "Quinoa, frango grelhado, abacate, espinafre, tomate", price: 36.90, emoji: "🥙" },
      { id: 502, name: "Salada Caesar", desc: "Alface romana, croutons, parmesão, molho caesar", price: 28.90, emoji: "🥗" },
      { id: 503, name: "Wrap Vegano", desc: "Wrap integral, grão-de-bico, legumes, homus", price: 32.90, emoji: "🌯" },
      { id: 504, name: "Suco Verde", desc: "Couve, maçã, gengibre, limão", price: 14.90, emoji: "🥤" },
      { id: 505, name: "Açaí 500ml", desc: "Açaí batido com granola e banana", price: 22.90, emoji: "🫐" },
    ]
  },
  {
    id: 6, name: "Doceria da Vó", category: "dessert",
    tags: ["Sobremesas", "Bolos", "Doces"], emoji: "🍰",
    rating: 4.8, reviews: 2109, time: "30-40 min", fee: 3.99,
    promo: null, open: false,
    menu: [
      { id: 601, name: "Fatia de Bolo Red Velvet", desc: "Bolo aveludado com cobertura de cream cheese", price: 18.90, emoji: "🎂" },
      { id: 602, name: "Brownie de Chocolate", desc: "Brownie quente com sorvete de baunilha", price: 22.90, emoji: "🍫" },
      { id: 603, name: "Cheesecake de Frutas", desc: "Fatia de cheesecake com calda de morango", price: 19.90, emoji: "🍰" },
      { id: 604, name: "Brigadeiro Gourmet (6 un)", desc: "Brigadeiros artesanais sortidos", price: 24.90, emoji: "🍬" },
      { id: 605, name: "Vitamina de Baunilha", desc: "Shake cremoso de baunilha 400ml", price: 16.90, emoji: "🥛" },
    ]
  },
  {
    id: 7, name: "Empório das Bebidas", category: "drinks",
    tags: ["Bebidas", "Cervejas", "Destilados"], emoji: "🍺",
    rating: 4.4, reviews: 756, time: "15-25 min", fee: 2.99,
    promo: null, open: true,
    menu: [
      { id: 701, name: "Cerveja Artesanal IPA", desc: "Garrafa 500ml produção local", price: 18.90, emoji: "🍺" },
      { id: 702, name: "Kit Heineken (6 latas)", desc: "6 latas Heineken 350ml geladas", price: 39.90, emoji: "🍻" },
      { id: 703, name: "Whisky Jack Daniel's 1L", desc: "Whisky americano original", price: 149.90, emoji: "🥃" },
      { id: 704, name: "Vinho Tinto Seco", desc: "Cabernet Sauvignon 750ml", price: 69.90, emoji: "🍷" },
      { id: 705, name: "Red Bull 250ml", desc: "Energético original gelado", price: 12.90, emoji: "⚡" },
    ]
  },
  {
    id: 8, name: "Tacos El Primo", category: "burger",
    tags: ["Mexicana", "Tacos", "Burritos"], emoji: "🌮",
    rating: 4.3, reviews: 621, time: "25-40 min", fee: 5.99,
    promo: null, open: true,
    menu: [
      { id: 801, name: "Combo 3 Tacos", desc: "3 tacos de carne, queijo, pico de gallo", price: 34.90, emoji: "🌮" },
      { id: 802, name: "Burrito de Frango", desc: "Tortilla grande, frango, feijão, arroz, cheddar", price: 38.90, emoji: "🌯" },
      { id: 803, name: "Nachos c/ Guacamole", desc: "Nachos crocantes com guacamole fresco", price: 28.90, emoji: "🥑" },
      { id: 804, name: "Margarita", desc: "Coquetel de tequila com limão", price: 22.90, emoji: "🍹" },
    ]
  }
];

// ===== STATE =====
let cart = [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'relevance';
let currentUser = null;
let checkoutStep = 1;
let selectedPayment = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
  renderRestaurants();
  loadUserFromStorage();
});

// ===== RENDER RESTAURANTS =====
function getFilteredRestaurants() {
  let list = [...RESTAURANTS];
  if (currentCategory !== 'all') {
    list = list.filter(r => r.category === currentCategory);
  }
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (currentSort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (currentSort === 'time') list.sort((a, b) => parseInt(a.time) - parseInt(b.time));
  else if (currentSort === 'price') list.sort((a, b) => a.fee - b.fee);
  return list;
}

function renderRestaurants() {
  const grid = document.getElementById('restaurantGrid');
  const empty = document.getElementById('emptyState');
  const list = getFilteredRestaurants();
  if (!list.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  grid.innerHTML = list.map(r => `
    <div class="restaurant-card" onclick="openRestaurantModal(${r.id})">
      <div class="card-img ${r.promo ? 'has-promo' : ''}" data-promo="${r.promo || ''}">
        <span>${r.emoji}</span>
        ${!r.open ? '<div class="closed-overlay">Fechado agora</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-name">${r.name}</div>
        <div class="card-tags">${r.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
        <div class="card-meta">
          <span class="card-rating"><i class="fa-solid fa-star"></i> ${r.rating} (${r.reviews.toLocaleString('pt-BR')})</span>
          <span class="card-time"><i class="fa-regular fa-clock"></i> ${r.time}</span>
          <span class="card-fee ${r.fee === 0 ? 'free' : ''}">${r.fee === 0 ? 'Grátis' : 'R$ ' + r.fee.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterByCategory(cat, el) {
  currentCategory = cat;
  document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');
  else {
    const found = document.querySelector(`.category-item[data-cat="${cat}"]`);
    if (found) found.classList.add('active');
  }
  renderRestaurants();
  scrollToRestaurants();
}

function filterRestaurants() {
  currentSearch = document.getElementById('searchInput').value;
  renderRestaurants();
}

function sortRestaurants() {
  currentSort = document.getElementById('sortSelect').value;
  renderRestaurants();
}

function scrollToRestaurants() {
  document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== RESTAURANT MODAL =====
function openRestaurantModal(id) {
  const r = RESTAURANTS.find(x => x.id === id);
  if (!r) return;
  const content = document.getElementById('restaurantModalContent');
  content.innerHTML = `
    <div class="rest-modal-hero" style="background:${getCategoryGradient(r.category)}">
      <span>${r.emoji}</span>
    </div>
    <div class="rest-modal-body">
      <h2>${r.name}</h2>
      <div class="rest-modal-meta">
        <span><i class="fa-solid fa-star" style="color:#ffc107"></i> ${r.rating} (${r.reviews.toLocaleString('pt-BR')} avaliações)</span>
        <span><i class="fa-regular fa-clock"></i> ${r.time}</span>
        <span><i class="fa-solid fa-motorcycle"></i> ${r.fee === 0 ? '<span style="color:#2e7d32;font-weight:700">Frete grátis</span>' : 'R$ ' + r.fee.toFixed(2).replace('.', ',')}</span>
        <span style="color:${r.open ? '#2e7d32' : '#c62828'};font-weight:700">
          <i class="fa-solid fa-circle" style="font-size:0.6rem"></i> ${r.open ? 'Aberto' : 'Fechado'}
        </span>
      </div>
      <div class="menu-section">
        <h3><i class="fa-solid fa-utensils"></i> Cardápio</h3>
        <div class="menu-list">
          ${r.menu.map(item => `
            <div class="menu-item">
              <div class="menu-item-emoji">${item.emoji}</div>
              <div class="menu-item-info">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-desc">${item.desc}</div>
                <div class="menu-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
              </div>
              ${r.open
                ? `<button class="btn-add" onclick="addToCart(${r.id}, ${item.id})" title="Adicionar"><i class="fa-solid fa-plus"></i></button>`
                : `<button class="btn-add" style="background:#ccc;cursor:not-allowed" title="Fechado" disabled><i class="fa-solid fa-plus"></i></button>`
              }
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  openModal('restaurantModal', 'restaurantModalOverlay');
}

function getCategoryGradient(cat) {
  const map = {
    pizza: 'linear-gradient(135deg,#ff8a65,#e64a19)',
    burger: 'linear-gradient(135deg,#ffb74d,#f57c00)',
    japanese: 'linear-gradient(135deg,#ef9a9a,#c62828)',
    brazilian: 'linear-gradient(135deg,#a5d6a7,#2e7d32)',
    healthy: 'linear-gradient(135deg,#80cbc4,#00695c)',
    dessert: 'linear-gradient(135deg,#ce93d8,#6a1b9a)',
    drinks: 'linear-gradient(135deg,#90caf9,#1565c0)',
  };
  return map[cat] || 'linear-gradient(135deg,#eeeeee,#bdbdbd)';
}

function closeRestaurantModal() {
  closeModal('restaurantModal', 'restaurantModalOverlay');
}

// ===== CART =====
function addToCart(restaurantId, itemId) {
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
  const item = restaurant.menu.find(i => i.id === itemId);
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, emoji: item.emoji, qty: 1, restaurantId });
  }
  updateCartUI();
  showToast(`${item.emoji} ${item.name} adicionado!`, 'success');
}

function removeFromCart(itemId) {
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  if (cart[idx].qty > 1) cart[idx].qty--;
  else cart.splice(idx, 1);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  if (!cart.length) {
    emptyEl.style.display = 'flex';
    itemsEl.innerHTML = '';
    footerEl.style.display = 'none';
    return;
  }
  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-minus"></i></button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="addToCartDirect(${item.id})"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  `).join('');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? 4.99 : 0;
  document.getElementById('cartSubtotal').textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
  document.getElementById('cartDelivery').textContent = 'R$ ' + delivery.toFixed(2).replace('.', ',');
  document.getElementById('cartTotal').textContent = 'R$ ' + (subtotal + delivery).toFixed(2).replace('.', ',');
}

function addToCartDirect(itemId) {
  const item = cart.find(c => c.id === itemId);
  if (item) {
    item.qty++;
    updateCartUI();
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
}

// ===== LOGIN MODAL =====
function openLoginModal() {
  openModal('loginModal', 'loginModalOverlay');
}
function closeLoginModal() {
  closeModal('loginModal', 'loginModalOverlay');
}
function switchTab(tab) {
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}
function handleLogin(e) {
  e.preventDefault();
  const email = e.target.querySelector('[type="email"]').value;
  currentUser = { email, name: email.split('@')[0] };
  localStorage.setItem('mf_user', JSON.stringify(currentUser));
  updateUserUI();
  closeLoginModal();
  showToast('Bem-vindo de volta! 👋', 'success');
}
function handleRegister(e) {
  e.preventDefault();
  const name = e.target.querySelector('[type="text"]').value;
  const email = e.target.querySelector('[type="email"]').value;
  currentUser = { email, name };
  localStorage.setItem('mf_user', JSON.stringify(currentUser));
  updateUserUI();
  closeLoginModal();
  showToast(`Conta criada! Seja bem-vindo, ${name}! 🎉`, 'success');
}
function updateUserUI() {
  const btn = document.getElementById('btnLogin');
  if (currentUser) {
    btn.textContent = currentUser.name;
    btn.onclick = logout;
  } else {
    btn.textContent = 'Entrar';
    btn.onclick = openLoginModal;
  }
}
function logout() {
  currentUser = null;
  localStorage.removeItem('mf_user');
  updateUserUI();
  showToast('Você saiu da conta', 'info');
}
function loadUserFromStorage() {
  try {
    const saved = localStorage.getItem('mf_user');
    if (saved) {
      currentUser = JSON.parse(saved);
      updateUserUI();
    }
  } catch (e) {}
}

// ===== ADDRESS MODAL =====
function openAddressModal() {
  openModal('addressModal', 'addressModalOverlay');
}
function closeAddressModal() {
  closeModal('addressModal', 'addressModalOverlay');
}
function formatCEP(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  input.value = v;
}
function saveAddress() {
  const street = document.getElementById('streetInput').value.trim();
  const number = document.getElementById('numberInput').value.trim();
  const neighborhood = document.getElementById('neighborhoodInput').value.trim();
  if (!street || !number) {
    showToast('Preencha rua e número', 'error');
    return;
  }
  const label = `${street}, ${number}${neighborhood ? ' - ' + neighborhood : ''}`;
  document.getElementById('addressLabel').textContent = label;
  closeAddressModal();
  showToast('Endereço salvo! 📍', 'success');
}

// ===== CHECKOUT MODAL =====
function openCheckoutModal() {
  if (!cart.length) {
    showToast('Seu carrinho está vazio!', 'error');
    return;
  }
  checkoutStep = 1;
  selectedPayment = null;
  toggleCart();
  renderCheckoutStep();
  openModal('checkoutModal', 'checkoutModalOverlay');
}
function closeCheckoutModal() {
  closeModal('checkoutModal', 'checkoutModalOverlay');
}

function renderCheckoutStep() {
  const content = document.getElementById('checkoutContent');
  const steps = [1, 2, 3];
  steps.forEach(s => {
    const el = document.getElementById('step' + s);
    el.classList.remove('active', 'done');
    if (s === checkoutStep) el.classList.add('active');
    else if (s < checkoutStep) el.classList.add('done');
  });

  if (checkoutStep === 1) {
    const street = document.getElementById('streetInput') ? document.getElementById('streetInput').value : '';
    content.innerHTML = `
      <div class="checkout-section">
        <h3>Endereço de entrega</h3>
        <div class="form-group"><label>Rua</label><input type="text" id="co_street" placeholder="Nome da rua" value="${street}" /></div>
        <div class="form-group"><label>Número</label><input type="text" id="co_number" placeholder="Nº" /></div>
        <div class="form-group"><label>Complemento</label><input type="text" id="co_comp" placeholder="Apto, bloco... (opcional)" /></div>
        <div class="form-group"><label>Bairro</label><input type="text" id="co_neighborhood" placeholder="Seu bairro" /></div>
        <button class="btn-primary" onclick="checkoutNext()">Continuar <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  } else if (checkoutStep === 2) {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const delivery = 4.99;
    const total = subtotal + delivery;
    content.innerHTML = `
      <div class="checkout-section">
        <h3>Forma de pagamento</h3>
        <div class="payment-options">
          <div class="pay-opt ${selectedPayment === 'credit' ? 'selected' : ''}" onclick="selectPayment('credit',this)">
            <i class="fa-solid fa-credit-card"></i><span>Crédito</span>
          </div>
          <div class="pay-opt ${selectedPayment === 'debit' ? 'selected' : ''}" onclick="selectPayment('debit',this)">
            <i class="fa-solid fa-credit-card"></i><span>Débito</span>
          </div>
          <div class="pay-opt ${selectedPayment === 'pix' ? 'selected' : ''}" onclick="selectPayment('pix',this)">
            <i class="fa-brands fa-pix"></i><span>Pix</span>
          </div>
          <div class="pay-opt ${selectedPayment === 'cash' ? 'selected' : ''}" onclick="selectPayment('cash',this)">
            <i class="fa-solid fa-money-bill-wave"></i><span>Dinheiro</span>
          </div>
        </div>
        <div class="order-summary-list">
          <h3 style="margin-bottom:12px">Resumo do pedido</h3>
          ${cart.map(i => `<div class="order-row"><span>${i.qty}x ${i.name}</span><span>R$ ${(i.price * i.qty).toFixed(2).replace('.', ',')}</span></div>`).join('')}
          <div class="order-row"><span>Taxa de entrega</span><span>R$ ${delivery.toFixed(2).replace('.', ',')}</span></div>
          <div class="order-row total"><span>Total</span><span>R$ ${total.toFixed(2).replace('.', ',')}</span></div>
        </div>
        <button class="btn-primary" onclick="checkoutNext()">Confirmar pedido <i class="fa-solid fa-check"></i></button>
      </div>`;
  } else if (checkoutStep === 3) {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = (subtotal + 4.99).toFixed(2).replace('.', ',');
    const mins = 35 + Math.floor(Math.random() * 15);
    content.innerHTML = `
      <div class="success-screen">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h3>Pedido confirmado!</h3>
        <p>Seu pedido foi recebido e está sendo preparado</p>
        <p style="margin-top:8px;font-weight:700;color:var(--red)">Total: R$ ${total}</p>
        <div class="tracking-bar" style="margin-top:28px">
          <div class="track-step done"><i class="fa-solid fa-receipt"></i><span>Pedido</span></div>
          <div class="track-step done"><i class="fa-solid fa-fire-burner"></i><span>Preparando</span></div>
          <div class="track-step"><i class="fa-solid fa-motorcycle"></i><span>A caminho</span></div>
          <div class="track-step"><i class="fa-solid fa-house"></i><span>Entregue</span></div>
        </div>
        <p style="margin-top:20px;color:var(--gray-4);font-size:0.9rem">Previsão de entrega: <strong>${mins} minutos</strong></p>
        <button class="btn-primary" style="margin-top:24px" onclick="finishOrder()">Voltar ao início</button>
      </div>`;
    cart = [];
    updateCartUI();
  }
}

function selectPayment(method, el) {
  selectedPayment = method;
  document.querySelectorAll('.pay-opt').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
}

function checkoutNext() {
  if (checkoutStep === 1) {
    const street = document.getElementById('co_street').value.trim();
    const number = document.getElementById('co_number').value.trim();
    if (!street || !number) { showToast('Preencha rua e número', 'error'); return; }
    checkoutStep = 2;
    renderCheckoutStep();
  } else if (checkoutStep === 2) {
    if (!selectedPayment) { showToast('Selecione a forma de pagamento', 'error'); return; }
    checkoutStep = 3;
    renderCheckoutStep();
  }
}

function finishOrder() {
  closeCheckoutModal();
  showToast('Obrigado pela preferência! 🎉', 'success');
}

// ===== MODAL HELPERS =====
function openModal(id, overlayId) {
  document.getElementById(id).classList.add('open');
  document.getElementById(overlayId).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id, overlayId) {
  document.getElementById(id).classList.remove('open');
  document.getElementById(overlayId).classList.remove('open');
  document.body.style.overflow = '';
}

// ===== TOAST =====
function showToast(message, type) {
  type = type || 'info';
  const icons = { success: 'fa-check-circle', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 3200);
}

// ===== ESC KEY TO CLOSE MODALS =====
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeRestaurantModal();
    closeLoginModal();
    closeAddressModal();
    closeCheckoutModal();
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar.classList.contains('open')) toggleCart();
  }
});

// ===== SCROLL HEADER SHADOW =====
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 10) header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  else header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
});
