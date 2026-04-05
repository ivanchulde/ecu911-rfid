const KEY = "rfid_logs";

export function saveLog(log) {
  const logs = getLogs();
  logs.push(log);
  localStorage.setItem(KEY, JSON.stringify(logs));
}

export function getLogs() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function getLastAction(rfid) {
  const logs = getLogs().filter(log => log.rfid === rfid);
  return logs.length ? logs[logs.length - 1].action : null;
}