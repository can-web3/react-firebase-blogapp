// src/utils/formatDate.ts
export function formatDate(
  value: { toDate: () => Date } | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!value) return ""
  const date = value instanceof Date ? value : value.toDate()
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false   
  }
  return date.toLocaleString(undefined, options ?? defaultOptions)
}
