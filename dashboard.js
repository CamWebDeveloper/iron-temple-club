/* =========================================================
   IRON TEMPLE CLUB — DASHBOARD.JS
   Panel de usuario: rutina, calendario Elite, calorías,
   pagos, dieta descargable y notificaciones.
   ========================================================= */

let calorieState = {
  goal: 2200,
  consumed: 0,
  log: []
};

let notifications = USER_DEMO.notifications.map((n, i) => ({ ...n, id: i }));

/* ---------- NAVEGACIÓN DE TABS ---------- */
function setDashboardTab(tab) {
  $$(".panel-nav button").forEach(btn => btn.classList.toggle("active", btn.dataset.panelTab === tab));
  $$(".panel-tab-content").forEach(content => content.classList.toggle("active", content.id === `tab-${tab}`));
  $(".panel-sidebar").classList.remove("open");
}
window.setDashboardTab = setDashboardTab;

$$("[data-panel-tab]").forEach(btn => {
  btn.addEventListener("click", () => setDashboardTab(btn.dataset.panelTab));
});

$("#panelMobileMenu").addEventListener("click", () => {
  $(".panel-sidebar").classList.add("open");
});

/* ---------- RENDER: RUTINA ---------- */
function renderRoutine() {
  const container = $("#tab-rutina");
  container.innerHTML = `
    <h2>Mi rutina</h2>
    <p class="sub">Plan asignado por tu coach — actualizado semanalmente.</p>
    ${USER_DEMO.routine.map(day => `
      <div class="routine-day">
        <h4>${escapeHtml(day.day)} <span style="color:var(--gray-500); font-size:11px;">${day.items.length} ejercicios</span></h4>
        <ul>
          ${day.items.map(item => `<li><span>${escapeHtml(item)}</span> <i class="fa-regular fa-circle-check" style="color:var(--gray-600);"></i></li>`).join("")}
        </ul>
      </div>
    `).join("")}
  `;
}

/* ---------- RENDER: CALENDARIO ELITE (dentro del panel) ---------- */
function renderPanelCalendar() {
  const container = $("#tab-calendario");
  const isElite = USER_DEMO.plan.toLowerCase().includes("elite");

  if (!isElite) {
    container.innerHTML = `
      <h2>Calendario de eventos</h2>
      <p class="sub">Esta sección es exclusiva para miembros <strong style="color:var(--red-bright)">Elite Black</strong>.</p>
      <div class="diet-card">
        <div>
          <h4 style="margin-bottom:6px;">Desbloquea el calendario Elite</h4>
          <p style="color:var(--gray-400); font-size:13px;">Sube a Elite Black para acceder a torneos, masterclasses y retos exclusivos.</p>
        </div>
        <button class="btn btn-primary" onclick="closePanel('dashboardPanel'); scrollToTarget('#membresias');">Ver membresías</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <h2>Calendario de eventos</h2>
    <p class="sub">Acceso exclusivo Elite Black — tus próximos eventos.</p>
    ${EVENTS.map(ev => `
      <div class="payment-row">
        <div>
          <strong>${escapeHtml(ev.title)}</strong>
          <span>${escapeHtml(ev.desc)}</span>
        </div>
        <span class="payment-status paid">Día ${ev.day}</span>
      </div>
    `).join("")}
  `;
}

/* ---------- RENDER: CONTADOR DE CALORÍAS ---------- */
function renderCalorieTracker() {
  const container = $("#tab-calorias");
  const pct = Math.min(Math.round((calorieState.consumed / calorieState.goal) * 100), 100);

  container.innerHTML = `
    <h2>Contador de calorías</h2>
    <p class="sub">Registra tus comidas y sigue tu consumo diario.</p>
    <div class="calorie-tracker">
      <div class="calorie-ring-wrap">
        <div class="calorie-ring" style="--pct:${pct}">
          <strong>${calorieState.consumed}</strong>
        </div>
        <div>
          <p style="color:var(--gray-300); font-size:14px;">Meta diaria: <strong style="color:#fff;">${calorieState.goal} kcal</strong></p>
          <p style="color:var(--gray-400); font-size:13px; margin-top:4px;">${pct}% de tu objetivo alcanzado</p>
        </div>
      </div>
      <form class="calorie-form" id="calorieForm">
        <input type="text" id="foodName" placeholder="Alimento (ej. Pechuga de pollo)" required>
        <input type="number" id="foodCals" placeholder="Calorías" min="1" required style="max-width:140px;">
        <button type="submit" class="btn btn-primary">Agregar</button>
      </form>
      <ul class="calorie-log" id="calorieLog">
        ${calorieState.log.map((entry, i) => `
          <li><span>${escapeHtml(entry.name)}</span> <span>${entry.cals} kcal <i class="fa-solid fa-xmark" data-remove-log="${i}" style="margin-left:10px; cursor:pointer; color:var(--gray-500);"></i></span></li>
        `).join("") || `<li style="justify-content:center; color:var(--gray-500);">Aún no has registrado alimentos hoy.</li>`}
      </ul>
    </div>
  `;

  $("#calorieForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#foodName").value.trim();
    const cals = parseInt($("#foodCals").value, 10);
    if (!name || !cals) return;
    calorieState.log.push({ name, cals });
    calorieState.consumed += cals;
    renderCalorieTracker();
    showToast(`${name} agregado (${cals} kcal).`, "fa-fire");
  });

  $$("[data-remove-log]").forEach(icon => {
    icon.addEventListener("click", () => {
      const i = parseInt(icon.dataset.removeLog, 10);
      calorieState.consumed -= calorieState.log[i].cals;
      calorieState.log.splice(i, 1);
      renderCalorieTracker();
    });
  });
}

/* ---------- RENDER: PAGOS ---------- */
function renderPayments() {
  const container = $("#tab-pagos");
  container.innerHTML = `
    <h2>Pagos realizados</h2>
    <p class="sub">Historial de tus transacciones en Iron Temple Club.</p>
    ${USER_DEMO.payments.map(p => `
      <div class="payment-row">
        <div>
          <strong>${escapeHtml(p.concept)}</strong>
          <span>${escapeHtml(p.amount)}</span>
        </div>
        <span class="payment-status paid">${escapeHtml(p.status)}</span>
      </div>
    `).join("")}
  `;
}

/* ---------- RENDER: DIETA DESCARGABLE ---------- */
function renderDiet() {
  const container = $("#tab-dieta");
  container.innerHTML = `
    <h2>Dieta descargable</h2>
    <p class="sub">Plan nutricional asignado por tu coach — ${escapeHtml(USER_DEMO.plan)}.</p>
    <div class="diet-card">
      <div>
        <h4 style="margin-bottom:6px;">Plan Nutricional — Julio 2026</h4>
        <p style="color:var(--gray-400); font-size:13px;">Documento en formato de texto con tu distribución de comidas diarias.</p>
      </div>
      <button class="btn btn-primary" id="downloadDietBtn"><i class="fa-solid fa-file-arrow-down"></i> Descargar</button>
    </div>
  `;

  $("#downloadDietBtn").addEventListener("click", () => {
    const content = [
      "IRON TEMPLE CLUB — PLAN NUTRICIONAL",
      `Miembro: ${USER_DEMO.name}`,
      `Plan: ${USER_DEMO.plan}`,
      "",
      "Desayuno: Avena + claras de huevo + fruta",
      "Media mañana: Batido de proteína + almendras",
      "Almuerzo: Pechuga de pollo + arroz integral + vegetales",
      "Merienda: Yogur griego + frutos rojos",
      "Cena: Salmón + vegetales al vapor",
      "",
      "Documento de demostración — Iron Temple Club (portafolio)."
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plan-nutricional-iron-temple.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Dieta descargada con éxito.", "fa-file-arrow-down");
  });
}

/* ---------- RENDER: NOTIFICACIONES ---------- */
function renderNotifications() {
  const container = $("#tab-notificaciones");
  container.innerHTML = `
    <h2>Notificaciones</h2>
    <p class="sub">Mantente al día con tu actividad en el club.</p>
    ${notifications.map(n => `
      <div class="notif-row ${n.unread ? "unread" : ""}" data-notif="${n.id}">
        <i class="fa-solid fa-bell"></i>
        <span>${escapeHtml(n.text)}</span>
      </div>
    `).join("")}
  `;

  $$("[data-notif]").forEach(row => {
    row.addEventListener("click", () => {
      const id = parseInt(row.dataset.notif, 10);
      const notif = notifications.find(n => n.id === id);
      if (notif) notif.unread = false;
      renderNotifications();
      updateNotifBadge();
    });
  });
}

function updateNotifBadge() {
  const unreadCount = notifications.filter(n => n.unread).length;
  const badge = $("#notifBadge");
  badge.textContent = unreadCount;
  badge.style.display = unreadCount ? "inline-block" : "none";
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#panelUserName").textContent = USER_DEMO.name;
  $("#panelUserPlan").textContent = USER_DEMO.plan;

  renderRoutine();
  renderPanelCalendar();
  renderCalorieTracker();
  renderPayments();
  renderDiet();
  renderNotifications();
  updateNotifBadge();
});
