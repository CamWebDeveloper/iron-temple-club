/* =========================================================
   IRON TEMPLE CLUB — CHAT.JS
   Chat de asistencia: toggle, mensajes y respuestas
   automáticas simuladas.
   ========================================================= */

let chatOpened = false;

function toggleChat(forceOpen) {
  const panel = $("#chatPanel");
  const shouldOpen = forceOpen !== undefined ? forceOpen : !panel.classList.contains("open");
  panel.classList.toggle("open", shouldOpen);

  if (shouldOpen && !chatOpened) {
    chatOpened = true;
    addChatMessage("¡Hola! Soy el asistente virtual de Iron Temple Club. ¿En qué puedo ayudarte hoy?", "bot");
  }
}

function addChatMessage(text, sender) {
  const messages = $("#chatMessages");
  const msg = document.createElement("div");
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

$("#chatToggle").addEventListener("click", () => toggleChat());
$("#chatClose").addEventListener("click", () => toggleChat(false));

// Botón "Asistencia" del quicknav abre el chat directamente
$("#quicknavChat").addEventListener("click", (e) => {
  e.preventDefault();
  toggleChat(true);
});

$("#chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;

  addChatMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    const response = CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)];
    addChatMessage(response, "bot");
  }, 700);
});
