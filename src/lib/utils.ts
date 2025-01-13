export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}
