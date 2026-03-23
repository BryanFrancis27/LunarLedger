import { formatCurrency } from '../../lib/calculations'

export function createCalendarEvents(payables) {
  return payables.map((item) => ({
    id: item.id,
    title: `${item.name} (${formatCurrency(item.amount)})`,
    date: item.dueDate,
  }))
}

export function getHeavySpendingWeek(weeklyExpenses) {
  let maxWeek = 1
  let maxValue = weeklyExpenses[1] || 0

  for (const week of [2, 3, 4]) {
    const value = weeklyExpenses[week] || 0
    if (value > maxValue) {
      maxValue = value
      maxWeek = week
    }
  }

  return maxWeek
}
