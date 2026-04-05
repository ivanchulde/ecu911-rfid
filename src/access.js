export function validateAccess(rfid) {
  const rfidNum = parseInt(rfid);

  // Verificar rango permitido
  const inRange = rfidNum >= 1001 && rfidNum <= 1029;

  return {
    status: inRange ? "PENDING" : "DENIED" // "PENDING" para validar luego si existe el usuario
  };
}

export function validateSchedule() {
  const hour = new Date().getHours();

  // Solo horario laboral 8am - 6pm
  return hour >= 8 && hour <= 20;
}
