/* =========================================================
   IRON TEMPLE CLUB — STORE.JS
   Tienda: búsqueda, filtros, favoritos y carrito funcional.
   ========================================================= */

let cart = [];              // [{ id, qty }]
let favorites = new Set();  // Set de product ids
let activeFilter = "todos";
let searchQuery = "";

const CATEGORY_LABELS = {
  todos: "Todos",
  suplementos: "Suplementos",
  ropa: "Ropa",
  accesorios: "Accesorios"
};

/* ---------- FILTROS ---------- */
function renderStoreFilters() {
  const container = $("#storeFilters");
  const cats = ["todos", ...new Set(PRODUCTS.map(p => p.cat))];
  container.innerHTML = cats.map(cat => `
    <button data-cat="${cat}" class="${cat === activeFilter ? "active" : ""}">
      ${escapeHtml(CATEGORY_LABELS[cat] || cat)}
    </button>
  `).join("");

  $$("#storeFilters button").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.cat;
      renderStoreFilters();
      renderProducts();
    });
  });
}

/* ---------- RENDER PRODUCTOS ---------- */
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchesCat = activeFilter === "todos" || p.cat === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) ||
                           p.desc.toLowerCase().includes(searchQuery);
    return matchesCat && matchesSearch;
  });
}

function renderProducts() {
  const grid = $("#storeGrid");
  const products = getFilteredProducts();

  if (!products.length) {
    grid.innerHTML = `<p style="color:var(--gray-400); grid-column:1/-1; text-align:center; padding:40px 0;">
      No se encontraron productos con esa búsqueda.
    </p>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
        <button class="fav-btn ${favorites.has(p.id) ? "active" : ""}" data-fav="${p.id}" aria-label="Agregar a favoritos">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="product-body">
        <h4>${escapeHtml(p.name)}</h4>
        <p>${escapeHtml(p.desc)}</p>
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <div class="product-actions">
          <button class="btn btn-outline" data-fav-btn="${p.id}">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="btn btn-primary" data-add="${p.id}">Comprar ahora</button>
        </div>
      </div>
    </div>
  `).join("");

  $$("[data-fav]").forEach(btn => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.fav));
  });
  $$("[data-fav-btn]").forEach(btn => {
    btn.addEventListener("click", () => toggleFavorite(btn.dataset.favBtn));
  });
  $$("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
}

/* ---------- FAVORITOS ---------- */
function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast("Producto eliminado de favoritos.", "fa-heart-crack");
  } else {
    favorites.add(id);
    showToast("Producto agregado a favoritos.", "fa-heart");
  }
  renderProducts();
}

/* ---------- CARRITO ---------- */
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });

  const product = PRODUCTS.find(p => p.id === id);
  showToast(`${product.name} añadido al carrito.`, "fa-cart-plus");
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  const container = $("#cartItems");

  if (!cart.length) {
    container.innerHTML = `<div class="cart-empty">Tu carrito está vacío.<br>Explora la tienda y agrega tus productos favoritos.</div>`;
  } else {
    container.innerHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return "";
      return `
        <div class="cart-item">
          <img src="${product.img}" alt="${escapeHtml(product.name)}">
          <div class="cart-item-info">
            <h5>${escapeHtml(product.name)}</h5>
            <span>$${product.price.toFixed(2)} c/u</span>
            <div class="cart-qty">
              <button data-qty-minus="${item.id}">−</button>
              <span>${item.qty}</span>
              <button data-qty-plus="${item.id}">+</button>
              <button class="cart-remove" data-remove="${item.id}">Eliminar</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    $$("[data-qty-minus]").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.qtyMinus, -1)));
    $$("[data-qty-plus]").forEach(btn => btn.addEventListener("click", () => changeQty(btn.dataset.qtyPlus, 1)));
    $$("[data-remove]").forEach(btn => btn.addEventListener("click", () => removeFromCart(btn.dataset.remove)));
  }

  $("#cartTotal").textContent = `$${getCartTotal().toFixed(2)}`;
}

function updateCartUI() {
  renderCart();
  const count = getCartCount();
  $("#cartBadge").textContent = count;
  $("#storeCartBadge").textContent = count;
}

/* ---------- DRAWER DEL CARRITO ---------- */
function openCart() {
  $("#cartDrawer").classList.add("open");
}
function closeCartDrawer() {
  $("#cartDrawer").classList.remove("open");
}

$("#storeCartBtn").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCartDrawer);

$("#cartCheckoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Tu carrito está vacío.", "fa-triangle-exclamation");
    return;
  }
  showToast("Compra simulada procesada con éxito. ¡Gracias por tu compra!", "fa-circle-check");
  cart = [];
  updateCartUI();
  closeCartDrawer();
});

$("#cartSaveBtn").addEventListener("click", () => {
  closeCartDrawer();
  showToast("Carrito guardado para después.", "fa-bookmark");
});

/* ---------- BÚSQUEDA ---------- */
$("#storeSearchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderProducts();
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStoreFilters();
  renderProducts();
  updateCartUI();
});
