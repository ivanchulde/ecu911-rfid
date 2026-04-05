import { getRFID } from "./rfid.js";
import { getCurrentTime, updateFooterDates } from "./time.js";
import { validateAccess, validateSchedule } from "./access.js";
import { saveLog, getLogs, getLastAction } from "./storage.js";
import { renderLog, renderUserInfo, showAlert, updateDashboard } from "./ui.js";
import { loadUsers, getUserByRFID } from "./user.js";


// At the end of main.js after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  updateFooterDates(); // updates current year and last modified
});

const input = document.getElementById("rfidInput");
const button = document.getElementById("scanBtn");
const logList = document.getElementById("logList"); // can be null if removed from dashboard

let usersLoaded = false;

// Ensure users are loaded before handling scans
async function init() {
  await loadUsers();
  usersLoaded = true;
  console.log("Users loaded");
}

// Handle RFID scan
button.addEventListener("click", handleAccess);

function handleAccess() {
  if (!usersLoaded) {
    showAlert("Users are still loading. Please wait...");
    return;
  }

  const rfid = getRFID(input.value);

  if (!rfid) {
    showAlert("Enter RFID");
    return;
  }

  const rfidNum = parseInt(rfid);

  // Validar rango de RFID
  if (rfidNum < 1001 || rfidNum > 1029) {
    showAlert(`RFID ${rfid} is out of the allowed range (1001-1029).`);
    const time = getCurrentTime();
    const log = { rfid, time, status: "DENIED", action: "UNKNOWN", user: null };
    saveLog(log);
    return;
  }

  const user = getUserByRFID(rfid);

  // Validar que el usuario exista
  if (!user) {
    showAlert(`RFID ${rfid} is not registered.`);
    const time = getCurrentTime();
    const log = { rfid, time, status: "DENIED", action: "UNKNOWN", user: null };
    saveLog(log);
    return;
  }

  const time = getCurrentTime();
  const access = validateAccess(rfid); // Aquí ya puede devolver GRANTED
  const scheduleOk = validateSchedule();

  let status = access.status;
  if (!scheduleOk) {
    status = "DENIED (OUT OF SCHEDULE)";
    showAlert("Access outside working hours");
  }

  const lastAction = getLastAction(rfid);
  const action = lastAction === "ENTRY" ? "EXIT" : "ENTRY";

  // Mostrar info del usuario
  renderUserInfo(user);

  const log = { rfid, time, status, action, user };

  // Guardar log
  saveLog(log);

  // Renderizar log
  if (logList) {
    renderLog(log, logList);
  }

  // Actualizar dashboard si existe
  if (typeof updateDashboard === "function") {
    const logs = getLogs();
    updateDashboard(logs);
  }

  input.value = "";
}

// Load existing logs (for dashboard)
function loadLogs() {
  const logs = getLogs();
  if (logList) {
    logList.innerHTML = ""; // clear existing logs
    logs.forEach(log => renderLog(log, logList));
  }
  updateDashboard(logs);
}

// Initialize
init();
loadLogs();

// At the end of main.js after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  updateFooterDates(); // updates current year and last modified
});