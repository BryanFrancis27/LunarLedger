export function getWeekOfMonth(dateInput) {
  const day = new Date(dateInput).getDate()
  if (day <= 7) return 1
  if (day <= 14) return 2
  if (day <= 21) return 3
  return 4
}
