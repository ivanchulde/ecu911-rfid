export function renderUserInfo(user) {
  const panel = document.getElementById("userInfoPanel");

  if (!user) {
    panel.innerHTML = "<p>Usuario no encontrado</p>";
    return;
  }

  panel.innerHTML = `
    <div class="user-card">
      <img src="${user.picture.large}" alt="${user.fullName}" />
      <h2>${user.fullName}</h2>
      <p><strong>Edad:</strong> ${user.age} años</p>
      <p><strong>Género:</strong> ${user.gender}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>RFID:</strong> ${user.rfid}</p>
      <p><strong>UUID:</strong> ${user.uuid}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
      <p><strong>Celular:</strong> ${user.cell}</p>
      <p><strong>Nacionalidad:</strong> ${user.nat}</p>
      <p><strong>Dirección:</strong> ${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.country} - ${user.location.postcode}</p>
      <p><strong>Coordenadas:</strong> ${user.location.coordinates.lat}, ${user.location.coordinates.lon}</p>
      <p><strong>Zona horaria:</strong> ${user.location.timezone.offset} (${user.location.timezone.description})</p>
      <p><strong>ID oficial:</strong> ${user.id.name} - ${user.id.value}</p>
      <p><strong>Registrado desde:</strong> ${new Date(user.registered.date).toLocaleDateString()} (${user.registered.age} años)</p>
    </div>
  `;
}

export function renderLog(log, listElement) {
  const li = document.createElement("li");
  li.classList.add("log-item"); // agrega clase para CSS

  if (log.user) {
    li.innerHTML = `
      <img src="${log.user.picture?.thumbnail || ''}" />
      <strong>${log.user.fullName || 'Unknown'}</strong> (${log.rfid}) |
      ${log.time} |
      ${log.action} |
      ${log.status} |
      ${log.user.location?.city || 'N/A'}, ${log.user.location?.country || 'N/A'}
    `;
  } else {
    li.textContent = `
      RFID: ${log.rfid} |
      ${log.time} |
      ${log.action} |
      ${log.status} |
      Unknown User
    `;
  }

  listElement.appendChild(li);
}

export function showAlert(message) {
  alert(message);
}

export function updateDashboard(logs) {
  const entryCount = document.getElementById("entryCount");
  const exitCount = document.getElementById("exitCount");
  const deniedCount = document.getElementById("deniedCount");

  if (!entryCount || !exitCount || !deniedCount) return; // prevent errors

  let entries = 0;
  let exits = 0;
  let denied = 0;

  logs.forEach(log => {
    if (log.action === "ENTRY") entries++;
    if (log.action === "EXIT") exits++;
    if (log.status.includes("DENIED")) denied++;
  });

  entryCount.textContent = entries;
  exitCount.textContent = exits;
  deniedCount.textContent = denied;
}