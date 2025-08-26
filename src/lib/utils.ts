export function formatDate(value: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(new Date(value));
}
