export function formatPKR(amount) {
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}
