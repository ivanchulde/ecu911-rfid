let users = [];

export async function loadUsers() {
  const response = await fetch("https://randomuser.me/api/?results=30");
  const data = await response.json();

  users = data.results.map((user, index) => ({
    rfid: (1000 + index).toString(),
    uuid: user.login.uuid,
    username: user.login.username,
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
    fullName: `${user.name.first} ${user.name.last}`,
    gender: user.gender,
    age: user.dob.age,
    email: user.email,
    phone: user.phone,
    cell: user.cell,
    nationality: user.nat,
    location: {
      street: `${user.location.street.number} ${user.location.street.name}`,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
      coordinates: {
        lat: user.location.coordinates.latitude,
        lon: user.location.coordinates.longitude
      },
      timezone: {
        offset: user.location.timezone.offset,
        description: user.location.timezone.description
      }
    },
    id: {
      name: user.id.name,
      value: user.id.value
    },
    picture: user.picture,
    registered: {
      date: user.registered.date,
      age: user.registered.age
    }
  }));
}

// Devuelve un usuario por RFID
export function getUserByRFID(rfid) {
  return users.find(user => user.rfid === rfid);
}