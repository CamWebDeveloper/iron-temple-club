/* =========================================================
   IRON TEMPLE CLUB — CALENDAR.JS
   Calendario de eventos interactivo (sección pública).
   ========================================================= */

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Los eventos demo están definidos para Julio 2026 (mes de referencia del proyecto)
const EVENTS_MONTH = 6; // Julio (0-indexed)
const EVENTS_YEAR = 2026;

let calState = { year: EVENTS_YEAR, month: EVENTS_MONTH, selectedDay: null };

function renderCalendar() {
  const { year, month } = calState;
  $("#calMonthLabel").textContent = `${MONTH_NAMES[month]} ${year}`;

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isEventMonth = year === EVENTS_YEAR && month === EVENTS_MONTH;

  let cells = "";
  for (let i = 0; i < firstWeekday; i++) {
    cells += `<div class="cal-day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const hasEvent = isEventMonth && EVENTS.some(ev => ev.day === day);
    const isSelected = calState.selectedDay === day;
    cells += `<div class="cal-day ${hasEvent ? "event" : ""} ${isSelected ? "selected" : ""}" data-day="${day}">${day}</div>`;
  }

  $("#calendarGrid").innerHTML = cells;

  $$(".cal-day.event").forEach(cell => {
    cell.addEventListener("click", () => {
      calState.selectedDay = parseInt(cell.dataset.day, 10);
      renderCalendar();
      showEventDetails(calState.selectedDay);
    });
  });
}

function showEventDetails(day) {
  const event = EVENTS.find(ev => ev.day === day);
  const container = $("#calendarDetails");

  if (!event) {
    container.innerHTML = `<h4>Sin eventos</h4><p>No hay eventos programados este día.</p>`;
    return;
  }

  container.innerHTML = `
    <h4>${escapeHtml(event.title)}</h4>
    <p>${escapeHtml(event.desc)}</p>
    <span class="evt-tag">${MONTH_NAMES[calState.month]} ${event.day}</span>
  `;
}

$("#calPrev").addEventListener("click", () => {
  calState.month -= 1;
  if (calState.month < 0) { calState.month = 11; calState.year -= 1; }
  calState.selectedDay = null;
  renderCalendar();
});

$("#calNext").addEventListener("click", () => {
  calState.month += 1;
  if (calState.month > 11) { calState.month = 0; calState.year += 1; }
  calState.selectedDay = null;
  renderCalendar();
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", renderCalendar);
