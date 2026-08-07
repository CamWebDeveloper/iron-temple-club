/* =========================================================
   IRON TEMPLE CLUB — BOOKING.JS
   Sistema de reservas: 10 clases + modal de reserva con
   selección de horario y confirmación.
   ========================================================= */

const TIME_SLOTS = ["06:00 AM", "08:00 AM", "10:00 AM", "05:00 PM", "07:00 PM"];
let selectedSlot = null;
let selectedClassIndex = null;

/* ---------- RENDER: GRID DE CLASES ---------- */
function renderBookingGrid() {
  const grid = $("#bookingGrid");
  grid.innerHTML = CLASSES.map((c, i) => `
    <div class="booking-card">
      <img src="${c.img}" alt="${escapeHtml(c.name)}" loading="lazy">
      <button class="booking-reserve-btn" data-book="${i}" aria-label="Reservar ${escapeHtml(c.name)}">
        <i class="fa-regular fa-calendar-plus"></i>
      </button>
      <div class="booking-info">
        <h4>${escapeHtml(c.name)}</h4>
        <p>${escapeHtml(c.desc)}</p>
      </div>
    </div>
  `).join("");

  $$("[data-book]").forEach(btn => {
    btn.addEventListener("click", () => openBookingModal(parseInt(btn.dataset.book, 10)));
  });
}

/* ---------- MODAL DE RESERVA ---------- */
function openBookingModal(index) {
  selectedClassIndex = index;
  selectedSlot = null;
  renderBookingModalContent();
  openModal("bookingModal");
}

function renderBookingModalContent() {
  const c = CLASSES[selectedClassIndex];
  const container = $("#bookingModalContent");

  container.innerHTML = `
    <button class="modal-close" data-close-modal><i class="fa-solid fa-xmark"></i></button>
    <img src="${c.img}" alt="${escapeHtml(c.name)}" style="width:100%; height:180px; object-fit:cover; border-radius:14px; margin-bottom:20px;">
    <span class="section-eyebrow">Reserva de clase</span>
    <h3 style="font-size:26px; margin-bottom:8px;">${escapeHtml(c.name)}</h3>
    <p style="color:var(--gray-300); font-size:14px; margin-bottom:24px;">${escapeHtml(c.desc)}</p>

    <p style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:var(--gray-400); margin-bottom:12px;">Selecciona un horario</p>
    <div class="store-filters" id="slotButtons" style="margin-bottom:26px;">
      ${TIME_SLOTS.map(slot => `
        <button data-slot="${slot}" class="${selectedSlot === slot ? "active" : ""}">${slot}</button>
      `).join("")}
    </div>

    <button class="btn btn-primary btn-block" id="confirmBookingBtn">
      <i class="fa-regular fa-calendar-check"></i> Confirmar reserva
    </button>
  `;

  $$("[data-close-modal]", container).forEach(btn => {
    btn.addEventListener("click", () => closeModal("bookingModal"));
  });

  $$("[data-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedSlot = btn.dataset.slot;
      renderBookingModalContent();
    });
  });

  $("#confirmBookingBtn").addEventListener("click", () => {
    if (!selectedSlot) {
      showToast("Selecciona un horario antes de confirmar.", "fa-triangle-exclamation");
      return;
    }
    closeModal("bookingModal");
    showToast(`Reserva confirmada: ${c.name} — ${selectedSlot}.`, "fa-calendar-check");
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", renderBookingGrid);
