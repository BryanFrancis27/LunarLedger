import { getWeekOfMonth } from './dateHelpers'

function roundCurrency(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100
}

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

export function calculateWeeklyBudgetSummary(
  weeklySalary,
  weeklyExpenses,
  carryover = { amount: 0, week: 1 },
  savingsRate = 0.1,
) {
  const baseSalary = Number(weeklySalary) || 0
  const carryoverAmount = Number(carryover.amount) || 0
  const carryoverWeek = [1, 2, 3, 4].includes(Number(carryover.week)) ? Number(carryover.week) : 1
  const normalizedSavingsRate = Math.max(0, Number(savingsRate) || 0)
  const weeks = [1, 2, 3, 4]

  const summary = weeks.map((week) => {
    const salaryWithCarryover = roundCurrency(baseSalary + (week === carryoverWeek ? carryoverAmount : 0))
    const expenses = roundCurrency(weeklyExpenses[week] || 0)
    const savings = roundCurrency(salaryWithCarryover * normalizedSavingsRate)
    const safeToSpend = roundCurrency(salaryWithCarryover - savings - expenses)

    return {
      week,
      salary: salaryWithCarryover,
      expenses,
      savings,
      safeToSpend,
      adjustedSafeToSpend: safeToSpend,
      carryover: 0,
    }
  })

  summary.forEach((currentWeek, currentIndex) => {
    if (currentWeek.safeToSpend >= 0) {
      return
    }

    const carryoverNeeded = roundCurrency(Math.abs(currentWeek.safeToSpend))
    currentWeek.carryover = carryoverNeeded

    for (let previousIndex = currentIndex - 1; previousIndex >= 0; previousIndex -= 1) {
      if (summary[previousIndex].adjustedSafeToSpend > 0) {
        summary[previousIndex].adjustedSafeToSpend = roundCurrency(
          summary[previousIndex].adjustedSafeToSpend - carryoverNeeded,
        )
        break
      }
    }
  })

  return summary
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
