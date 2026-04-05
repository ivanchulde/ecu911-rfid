export function getRFID(inputValue) {
  return inputValue.trim();
}

export function generateRFID() {
  return Math.floor(Math.random() * 100000).toString();
}