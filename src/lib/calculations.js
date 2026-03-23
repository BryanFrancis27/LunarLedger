import { getWeekOfMonth } from './dateHelpers'

export function calculateWeeklyExpenses(payables) {
  const weeks = { 1: 0, 2: 0, 3: 0, 4: 0 }

  payables.forEach((item) => {
    const week = getWeekOfMonth(item.dueDate)
    weeks[week] += Number(item.amount) || 0
  })

  return weeks
}

export function getCumulativeExpenses(weeklyExpenses) {
  return {
    1: weeklyExpenses[1],
    2: weeklyExpenses[1] + weeklyExpenses[2],
    3: weeklyExpenses[1] + weeklyExpenses[2] + weeklyExpenses[3],
    4: weeklyExpenses[1] + weeklyExpenses[2] + weeklyExpenses[3] + weeklyExpenses[4],
  }
}

export function calculateSafeSpend(weeklySalary, weeklyExpenses, carryover = { amount: 0, week: 1 }) {
  const carryoverAmount = Number(carryover.amount) || 0
  const carryoverWeek = [1, 2, 3, 4].includes(Number(carryover.week)) ? Number(carryover.week) : 1

  return {
    1: weeklySalary - weeklyExpenses[1] + (carryoverWeek === 1 ? carryoverAmount : 0),
    2: weeklySalary - weeklyExpenses[2] + (carryoverWeek === 2 ? carryoverAmount : 0),
    3: weeklySalary - weeklyExpenses[3] + (carryoverWeek === 3 ? carryoverAmount : 0),
    4: weeklySalary - weeklyExpenses[4] + (carryoverWeek === 4 ? carryoverAmount : 0),
  }
}

export function calculateMonthlyIncome(weeklySalary) {
  return (Number(weeklySalary) || 0) * 4
}

export function calculateTotalExpenses(payables) {
  return payables.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}
