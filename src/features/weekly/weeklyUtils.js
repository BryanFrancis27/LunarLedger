export function getWeeklyRows(weeklySalary, weeklyExpenses, cumulativeExpenses, safeToSpend) {
  return [1, 2, 3, 4].map((week) => ({
    week,
    salary: weeklySalary,
    expenses: weeklyExpenses[week] || 0,
    cumulative: cumulativeExpenses[week] || 0,
    safeToSpend: safeToSpend[week] || 0,
  }))
}
