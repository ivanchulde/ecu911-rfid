import { getLogs } from "./storage.js";
import { renderLog, updateDashboard } from "./ui.js";

const logList = document.getElementById("logList");
const filterInput = document.getElementById("filterInput");
const filterForm = document.getElementById("filterForm");

let logs = []; // guardamos todos los logs

// Cargar historial
function loadHistory() {
  logs = getLogs();

  renderLogs(logs);
}

// Renderiza logs en el UL
function renderLogs(logArray) {
  if (!logList) return;
  logList.innerHTML = "";
  logArray.forEach(log => renderLog(log, logList));

  // Actualiza contadores
  updateDashboard(logArray);
}

// Filtrar logs según input (nombre, país, RFID, fecha)
function filterLogs(event) {
  event.preventDefault();
  const query = (filterInput.value || "").toLowerCase().trim();

  if (!query) {
    renderLogs(logs);
    return;
  }

  const filtered = logs.filter(log => {
    const name = log.user?.fullName?.toLowerCase() || "";
    const country = log.user?.location?.country?.toLowerCase() || "";
    const time = (log.time || "").toLowerCase();
    const rfid = (log.rfid || "").toLowerCase();
    const action = (log.action || "").toLowerCase();
    const status = (log.status || "").toLowerCase();

    return (
      name.includes(query) ||
      country.includes(query) ||
      time.includes(query) ||
      rfid.includes(query) ||
      action.includes(query) ||
      status.includes(query)
    );
  });

  renderLogs(filtered);
}

// Eventos
if (filterForm) filterForm.addEventListener("submit", filterLogs);

// Inicializar al cargar DOM
window.addEventListener("DOMContentLoaded", () => {
  loadHistory();
});