/* =========================================================
   IRON TEMPLE CLUB — MAIN.JS
   Núcleo de la app: preloader, header, menú móvil, scroll
   reveals, contadores, utilidades de modal/panel/toast y
   render de secciones de contenido general.
   ========================================================= */

/* ---------- HELPERS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ---------- PRELOADER ---------- */
window.addEventListener("load", () => {
  const pre = $("#preloader");
  setTimeout(() => pre && pre.classList.add("hidden"), 500);
});

/* ---------- HEADER SCROLL ---------- */
const header = $("#mainHeader");
function onScrollHeader() {
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
window.addEventListener("scroll", onScrollHeader);
onScrollHeader();

/* ---------- MENÚ MÓVIL ---------- */
const hamburgerBtn = $("#hamburgerBtn");
const mainNav = $("#mainNav");
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mainNav.classList.toggle("open");
});
$$(".main-nav a").forEach(a => a.addEventListener("click", () => {
  hamburgerBtn.classList.remove("active");
  mainNav.classList.remove("open");
}));

/* ---------- SCROLL SUAVE CON OFFSET DE HEADER ---------- */
function scrollToTarget(selector) {
  const el = $(selector);
  if (!el) return;
  const offset = 90;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

$$("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => scrollToTarget(btn.dataset.scroll));
});

$("#heroBookBtn").addEventListener("click", () => scrollToTarget("#reservas"));
$("#calorieCTA").addEventListener("click", () => {
  openPanel("dashboardPanel");
  if (window.setDashboardTab) window.setDashboardTab("calorias");
});

/* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals() {
  $$("[data-reveal]:not(.in-view)").forEach(el => revealObserver.observe(el));
}

/* ---------- CONTADORES ANIMADOS (hero stats) ---------- */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("es");
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString("es");
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

$$(".stat-number").forEach(el => statObserver.observe(el));

/* ---------- TOASTS ---------- */
function showToast(message, icon = "fa-circle-check") {
  const container = $("#toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
window.showToast = showToast;

/* ---------- MODALES GENÉRICOS (auth / membership / booking) ---------- */
function openModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
window.openModal = openModal;
window.closeModal = closeModal;

$$(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
  $$("[data-close-modal]", overlay).forEach(btn => {
    btn.addEventListener("click", () => closeModal(overlay.id));
  });
});

/* ---------- PANELES A PANTALLA COMPLETA (dashboard / tienda) ---------- */
function openPanel(id) {
  const panel = $(`#${id}`);
  if (!panel) return;
  panel.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closePanel(id) {
  const panel = $(`#${id}`);
  if (!panel) return;
  panel.classList.remove("open");
  document.body.style.overflow = "";
}
window.openPanel = openPanel;
window.closePanel = closePanel;

$$("[data-close-panel]").forEach(btn => {
  btn.addEventListener("click", () => closePanel("dashboardPanel"));
});
$$("[data-close-store]").forEach(btn => {
  btn.addEventListener("click", () => closePanel("storePanel"));
});

/* ---------- AUTENTICACIÓN (registro / login demo) ---------- */
$("#registerBtn").addEventListener("click", () => openModal("authModal"));
$("#heroRegisterBtn").addEventListener("click", () => openModal("authModal"));
$("#loginBtn").addEventListener("click", () => {
  openModal("authModal");
  switchAuthTab("login");
});

function switchAuthTab(tab) {
  $$(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  $("#registerForm").hidden = tab !== "register";
  $("#loginForm").hidden = tab !== "login";
}
$$(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
});

$("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal("authModal");
  showToast("Cuenta creada con éxito. ¡Bienvenido a Iron Temple!", "fa-user-check");
  setTimeout(() => openPanel("dashboardPanel"), 350);
});

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal("authModal");
  showToast("Sesión iniciada correctamente.", "fa-user-check");
  setTimeout(() => openPanel("dashboardPanel"), 350);
});

/* ---------- ACCESO RÁPIDO A LA TIENDA ---------- */
$("#storeQuickBtn").addEventListener("click", () => openPanel("storePanel"));

/* ---------- WHATSAPP FLOTANTE ---------- */
$("#whatsappFloat").href = "https://wa.me/10000000000?text=" +
  encodeURIComponent("Hola, quiero información sobre Iron Temple Club");

/* ---------- RENDER: GALERÍA ---------- */
function renderGallery() {
  const grid = $("#galleryGrid");
  grid.innerHTML = GALLERY_PHOTOS.map(photo => `
    <div class="g-item ${photo.size}">
      <img src="${photo.img}" alt="${escapeHtml(photo.label)}" loading="lazy">
      <span>${escapeHtml(photo.label)}</span>
    </div>
  `).join("");
}

/* ---------- RENDER: ENTRENADORES ---------- */
function renderTrainers() {
  const grid = $("#trainersGrid");
  grid.innerHTML = TRAINERS.map(t => `
    <div class="trainer-card">
      <div class="trainer-photo"><img src="${t.photo}" alt="${escapeHtml(t.name)}" loading="lazy"></div>
      <div class="trainer-info">
        <h4>${escapeHtml(t.name)}</h4>
        <div class="trainer-spec">${escapeHtml(t.specialty)}</div>
        <div class="trainer-exp">${escapeHtml(t.experience)}</div>
        <div class="trainer-social">
          <a href="${t.social.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="${t.social.tiktok}" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          <a href="${t.social.whatsapp}" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
  `).join("");
}

/* ---------- RENDER: TRANSFORMACIONES ---------- */
function renderTransformations() {
  const grid = $("#transformationsGrid");
  grid.innerHTML = TRANSFORMATIONS.map(t => `
    <div class="transformation-card">
      <div class="transformation-imgs">
        <div><img src="${t.before}" alt="Antes — ${escapeHtml(t.name)}" loading="lazy"><span>Antes</span></div>
        <div><img src="${t.after}" alt="Después — ${escapeHtml(t.name)}" loading="lazy"><span>Después</span></div>
      </div>
      <div class="transformation-meta">
        <h4>${escapeHtml(t.name)}</h4>
        <span>${escapeHtml(t.weeks)}</span>
      </div>
    </div>
  `).join("");
}

/* ---------- RENDER: PROMOCIONES ---------- */
function renderPromotions() {
  const grid = $("#promoGrid");
  grid.innerHTML = PROMOTIONS.map(p => `
    <div class="promo-card">
      <span class="promo-tag">${escapeHtml(p.tag)}</span>
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.desc)}</p>
      <div class="promo-expiry">${escapeHtml(p.expiry)}</div>
    </div>
  `).join("");
}

/* ---------- RENDER: BLOG ---------- */
function renderBlog() {
  const grid = $("#blogGrid");
  grid.innerHTML = BLOG_POSTS.map(b => `
    <article class="blog-card">
      <img src="${b.img}" alt="${escapeHtml(b.title)}" loading="lazy">
      <div class="blog-card-body">
        <span class="blog-cat">${escapeHtml(b.cat)}</span>
        <h4>${escapeHtml(b.title)}</h4>
        <p>${escapeHtml(b.excerpt)}</p>
      </div>
    </article>
  `).join("");
}

/* ---------- RENDER: TESTIMONIOS ---------- */
function renderTestimonials() {
  const track = $("#testimonialsTrack");
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-video">
        <img src="${t.thumb}" alt="Testimonio de ${escapeHtml(t.name)}" loading="lazy">
        <button class="testimonial-play" aria-label="Reproducir testimonio de ${escapeHtml(t.name)}">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="testimonial-body">
        <p>"${escapeHtml(t.quote)}"</p>
        <div class="testimonial-author">
          <div>
            <strong>${escapeHtml(t.name)}</strong>
            <span>${escapeHtml(t.plan)}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  $$(".testimonial-play").forEach(btn => {
    btn.addEventListener("click", () => showToast("Video de demostración — funcionalidad simulada.", "fa-play"));
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderTrainers();
  renderTransformations();
  renderPromotions();
  renderBlog();
  renderTestimonials();
  observeReveals();
});
