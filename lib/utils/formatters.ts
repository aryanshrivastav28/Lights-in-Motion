/**
 * Format paisa integer amount into standard Indian Rupee currency format (INR)
 * e.g., 189900 -> "?1,899" or "?1,899.00"
 */
export function formatINR(paisa: number, includeDecimals = false): string {
  const rupees = paisa / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rupees);
}

/**
 * Format grams to human-readable weight (kg / g)
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)} kg`;
  }
  return `${grams} g`;
}

/**
 * Format ISO date string into readable cinema/tech timestamp
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}
