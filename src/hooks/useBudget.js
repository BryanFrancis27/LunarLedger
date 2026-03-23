import {
  calculateMonthlyIncome,
  calculateWeeklyBudgetSummary,
  calculateTotalExpenses,
  calculateWeeklyExpenses,
  getCumulativeExpenses,
} from '../lib/calculations'
import { normalizePayableCategory } from '../features/payables/payableUtils'
import { useLocalStorage } from './useLocalStorage'

const initialBudgetData = {
  weeklySalary: 0,
  payables: [],
  previousMonthBalance: {
    amount: 0,
    week: 1,
  },
}

export function useBudget() {
  const [budgetData, setBudgetData] = useLocalStorage('budget-data', initialBudgetData)

  const weeklySalary = Number(budgetData.weeklySalary) || 0
  const previousMonthBalance = {
    amount: Number(budgetData.previousMonthBalance?.amount) || 0,
    week: [1, 2, 3, 4].includes(Number(budgetData.previousMonthBalance?.week))
      ? Number(budgetData.previousMonthBalance?.week)
      : 1,
  }
  const payables = (budgetData.payables || []).map((item) => ({
    ...item,
    category: normalizePayableCategory(item.category),
  }))

  const setWeeklySalary = (value) => {
    setBudgetData((previous) => ({
      ...previous,
      weeklySalary: Number(value) || 0,
    }))
  }

  const setPreviousMonthBalance = (amount, week) => {
    setBudgetData((previous) => ({
      ...previous,
      previousMonthBalance: {
        amount: Number(amount) || 0,
        week: [1, 2, 3, 4].includes(Number(week)) ? Number(week) : 1,
      },
    }))
  }

  const clearPreviousMonthBalance = () => {
    setBudgetData((previous) => ({
      ...previous,
      previousMonthBalance: {
        amount: 0,
        week: 1,
      },
    }))
  }

  const addPayable = (payable) => {
    setBudgetData((previous) => ({
      ...previous,
      payables: [
        ...previous.payables,
        {
          id: crypto.randomUUID(),
          ...payable,
          category: normalizePayableCategory(payable.category),
        },
      ],
    }))
  }

  const updatePayable = (id, updates) => {
    setBudgetData((previous) => ({
      ...previous,
      payables: previous.payables.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              category: normalizePayableCategory(updates.category),
            }
          : item,
      ),
    }))
  }

  const deletePayable = (id) => {
    setBudgetData((previous) => ({
      ...previous,
      payables: previous.payables.filter((item) => item.id !== id),
    }))
  }

  const monthlyIncome = calculateMonthlyIncome(weeklySalary)
  const totalAvailableIncome = monthlyIncome + previousMonthBalance.amount
  const weeklyExpenses = calculateWeeklyExpenses(payables)
  const cumulativeExpenses = getCumulativeExpenses(weeklyExpenses)
  const weeklyBudgetSummary = calculateWeeklyBudgetSummary(weeklySalary, weeklyExpenses, previousMonthBalance)
  const safeToSpend = weeklyBudgetSummary.reduce(
    (weeks, item) => ({
      ...weeks,
      [item.week]: item.adjustedSafeToSpend,
    }),
    { 1: 0, 2: 0, 3: 0, 4: 0 },
  )
  const totalExpenses = calculateTotalExpenses(payables)
  const remainingBalance = totalAvailableIncome - totalExpenses

  return {
    weeklySalary,
    payables,
    monthlyIncome,
    totalAvailableIncome,
    previousMonthBalance,
    weeklyExpenses,
    cumulativeExpenses,
    weeklyBudgetSummary,
    safeToSpend,
    totalExpenses,
    remainingBalance,
    setWeeklySalary,
    setPreviousMonthBalance,
    clearPreviousMonthBalance,
    addPayable,
    updatePayable,
    deletePayable,
  }
}
