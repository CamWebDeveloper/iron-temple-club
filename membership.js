/* =========================================================
   IRON TEMPLE CLUB — MEMBERSHIP.JS
   Render de membresías + modal de detalle, beneficios
   completos, fecha de vencimiento y compra simulada.
   ========================================================= */

/* ---------- RENDER: GRID DE MEMBRESÍAS ---------- */
function renderMemberships() {
  const grid = $("#membershipsGrid");
  grid.innerHTML = MEMBERSHIPS.map(m => `
    <div class="membership-card ${m.featured ? "featured" : ""}" data-membership="${m.id}">
      <div class="membership-tier">${escapeHtml(m.tier)}</div>
      <h3>${escapeHtml(m.name)}</h3>
      <div class="membership-price">
        <strong>$${m.price}</strong>
        <span>${escapeHtml(m.period)}</span>
      </div>
      <ul class="membership-benefits">
        ${m.benefits.map(b => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(b)}</li>`).join("")}
      </ul>
      <button class="btn ${m.featured ? "btn-primary" : "btn-outline"} btn-block" data-open-membership="${m.id}">
        Ver beneficios y comprar
      </button>
    </div>
  `).join("");

  $$("[data-open-membership]").forEach(btn => {
    btn.addEventListener("click", () => openMembershipModal(btn.dataset.openMembership));
  });
}

/* ---------- FECHA DE VENCIMIENTO SIMULADA ---------- */
function getExpiryDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("es", { day: "2-digit", month: "long", year: "numeric" });
}

/* ---------- MODAL DE DETALLE ---------- */
function openMembershipModal(id) {
  const m = MEMBERSHIPS.find(x => x.id === id);
  const container = $("#membershipModalContent");

  container.innerHTML = `
    <button class="modal-close" data-close-modal><i class="fa-solid fa-xmark"></i></button>
    <div class="membership-tier">${escapeHtml(m.tier)}</div>
    <h3 style="font-size:32px; margin-bottom:6px;">${escapeHtml(m.name)}</h3>
    <div class="membership-price" style="margin-bottom:22px;">
      <strong>$${m.price}</strong>
      <span>${escapeHtml(m.period)}</span>
    </div>

    <p style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:var(--gray-400); margin-bottom:14px;">Beneficios incluidos</p>
    <ul class="membership-benefits" style="margin-bottom:26px;">
      ${m.fullBenefits.map(b => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(b)}</li>`).join("")}
    </ul>

    <div class="payment-row" style="margin-bottom:22px;">
      <div>
        <strong>Vigencia de tu membresía</strong>
        <span>Vence el ${getExpiryDate()}</span>
      </div>
      <i class="fa-regular fa-calendar" style="color:var(--red-bright); font-size:20px;"></i>
    </div>

    <button class="btn btn-primary btn-block" id="confirmMembershipBtn">
      <i class="fa-solid fa-crown"></i> Comprar ${escapeHtml(m.name)}
    </button>
  `;

  $$("[data-close-modal]", container).forEach(btn => {
    btn.addEventListener("click", () => closeModal("membershipModal"));
  });

  $("#confirmMembershipBtn").addEventListener("click", () => {
    closeModal("membershipModal");
    showToast(`Membresía ${m.name} activada con éxito.`, "fa-crown");
  });

  openModal("membershipModal");
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", renderMemberships);
