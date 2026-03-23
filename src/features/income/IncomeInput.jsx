import { useEffect, useState } from 'react'
import { Button, Card, Input } from '../../components/ui'
import { calculateMonthlyIncome } from './incomeUtils'
import { formatCurrency } from '../../lib/calculations'

function IncomeInput({
  weeklySalary,
  previousMonthBalance,
  onWeeklySalaryChange,
  onPreviousMonthBalanceChange,
  onClearPreviousMonthBalance,
}) {
  const [weeklySalaryInput, setWeeklySalaryInput] = useState(
    weeklySalary ? String(weeklySalary) : '',
  )
  const [previousMonthBalanceInput, setPreviousMonthBalanceInput] = useState(
    previousMonthBalance.amount ? String(previousMonthBalance.amount) : '',
  )

  useEffect(() => {
    setWeeklySalaryInput(weeklySalary ? String(weeklySalary) : '')
  }, [weeklySalary])

  useEffect(() => {
    setPreviousMonthBalanceInput(previousMonthBalance.amount ? String(previousMonthBalance.amount) : '')
  }, [previousMonthBalance.amount])

  const monthlyIncome = calculateMonthlyIncome(weeklySalary)

  const handleWeeklySalaryChange = (event) => {
    const nextValue = event.target.value
    setWeeklySalaryInput(nextValue)

    if (nextValue === '') {
      onWeeklySalaryChange(0)
      return
    }

    onWeeklySalaryChange(Number(nextValue) || 0)
  }

  const handlePreviousMonthBalanceAmountChange = (event) => {
    const nextValue = event.target.value
    setPreviousMonthBalanceInput(nextValue)

    if (nextValue === '') {
      onPreviousMonthBalanceChange(0, previousMonthBalance.week)
      return
    }

    onPreviousMonthBalanceChange(Number(nextValue) || 0, previousMonthBalance.week)
  }

  const handleCarryoverWeekChange = (event) => {
    onPreviousMonthBalanceChange(previousMonthBalance.amount, Number(event.target.value))
  }

  return (
    <Card title="Income" subtitle="Set your weekly salary">
      <div className="space-y-4">
        <Input
          id="weekly-salary"
          label="Weekly Salary"
          type="number"
          min="0"
          step="0.01"
          value={weeklySalaryInput}
          onChange={handleWeeklySalaryChange}
          placeholder="0.00"
        />

        <div className="rounded-xl border border-brand-500/25 bg-black/45 p-3 shadow-lg shadow-brand-600/10">
          <p className="text-sm text-gray-400">Monthly Income Estimate</p>
          <p className="text-xl font-semibold text-brand-400">{formatCurrency(monthlyIncome)}</p>
        </div>

        <div className="space-y-3 rounded-xl border border-brand-500/20 bg-black/40 p-3">
          <p className="text-sm text-gray-300">Optional: Previous Month Remaining Balance</p>

          <Input
            id="previous-month-balance"
            label="Carryover Amount"
            type="number"
            min="0"
            step="0.01"
            value={previousMonthBalanceInput}
            onChange={handlePreviousMonthBalanceAmountChange}
            placeholder="0.00"
          />

          <label className="block">
            <span className="mb-1 block text-sm text-gray-300">Use This For Week</span>
            <select
              id="carryover-week"
              value={previousMonthBalance.week}
              onChange={handleCarryoverWeekChange}
              className="input-modern"
            >
              <option value={1}>Week 1</option>
              <option value={2}>Week 2</option>
              <option value={3}>Week 3</option>
              <option value={4}>Week 4</option>
            </select>
          </label>

          <div className="flex justify-stretch sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-full sm:w-auto"
              onClick={() => {
                setPreviousMonthBalanceInput('')
                onClearPreviousMonthBalance()
              }}
            >
              Remove Carryover
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default IncomeInput
