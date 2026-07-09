/**
 * Formats an ISO date string / Date into a readable label,
 * e.g. "9 Jul 2026".
 */
export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats a Date into the "yyyy-MM-dd" shape an <input type="date">
 * expects, so edit forms can be pre-filled correctly.
 */
export function toInputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
