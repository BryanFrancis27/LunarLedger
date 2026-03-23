import { Card } from '../../components/ui'
import { formatCurrency } from '../../lib/calculations'
import { getWeekOfMonth } from '../../lib/dateHelpers'
import { getWeeklyRows } from './weeklyUtils'

function WeeklySummary({
  weeklySalary,
  weeklyExpenses,
  cumulativeExpenses,
  weeklyBudgetSummary,
  safeToSpend,
  previousMonthBalance,
  payables,
}) {
  const rows =
    weeklyBudgetSummary && weeklyBudgetSummary.length > 0
      ? weeklyBudgetSummary.map((week) => ({
          week: week.week,
          salary: week.salary,
          expenses: week.expenses,
          cumulative: cumulativeExpenses[week.week] || 0,
          savings: week.savings,
          safeToSpend: week.adjustedSafeToSpend,
          originalSafeToSpend: week.safeToSpend,
          carryover: week.carryover,
        }))
      : getWeeklyRows(weeklySalary, weeklyExpenses, cumulativeExpenses, safeToSpend)
  const hasCarryover = (Number(previousMonthBalance?.amount) || 0) > 0
  const payablesByWeek = payables.reduce(
    (weeks, item) => {
      const week = getWeekOfMonth(item.dueDate)
      weeks[week].push(item)
      return weeks
    },
    { 1: [], 2: [], 3: [], 4: [] },
  )

  return (
    <Card title="Weekly Budget Summary" subtitle="Expenses, cumulative obligations, and safe spending">
      {hasCarryover ? (
        <p className="mb-3 rounded-xl border border-brand-500/40 bg-brand-500/10 px-3 py-2 text-sm text-brand-300">
          Previous month balance of {formatCurrency(previousMonthBalance.amount)} is applied to Week {previousMonthBalance.week}.
        </p>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((week) => (
          <article
            key={week.week}
            className="group relative rounded-xl border border-brand-500/20 bg-black/35 p-3 transition-all duration-300 hover:border-brand-500/45 hover:shadow-[0_0_20px_rgba(138,43,226,0.2)]"
          >
            <div className="pointer-events-none absolute inset-x-2 bottom-full z-20 mb-1 hidden translate-y-2 scale-95 rounded-xl border border-brand-500/40 bg-[#0d0a16]/95 p-3 opacity-0 shadow-2xl shadow-brand-900/30 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 md:block">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-400">
                Week {week.week} Due Expenses
              </p>

              {payablesByWeek[week.week].length === 0 ? (
                <p className="text-xs text-gray-400">No expenses due for this week.</p>
              ) : (
                <ul className="space-y-1">
                  {payablesByWeek[week.week].map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-2 text-xs text-gray-200">
                      <span className="truncate">{item.name}</span>
                      <span className="shrink-0 text-brand-400">{formatCurrency(item.amount)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="text-sm font-semibold text-white">Week {week.week}</h3>
            <div className="mt-2 rounded-lg border border-brand-500/20 bg-black/20 p-2 md:hidden">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-400">Due Expenses</p>
              {payablesByWeek[week.week].length === 0 ? (
                <p className="text-xs text-gray-400">No expenses due for this week.</p>
              ) : (
                <ul className="space-y-1">
                  {payablesByWeek[week.week].map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-2 text-xs text-gray-200">
                      <span className="truncate">{item.name}</span>
                      <span className="shrink-0 text-brand-400">{formatCurrency(item.amount)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">Salary</p>
            <p className="text-sm text-brand-400">{formatCurrency(week.salary)}</p>
            <p className="mt-2 text-xs text-gray-400">Weekly Expenses</p>
            <p className="text-sm text-rose-400">{formatCurrency(week.expenses)}</p>
            <p className="mt-2 text-xs text-gray-400">Savings (10%)</p>
            <p className="text-sm text-amber-300">{formatCurrency(week.savings || 0)}</p>
            <p className="mt-2 text-xs text-gray-400">Cumulative Expenses</p>
            <p className="text-sm text-gray-300">{formatCurrency(week.cumulative)}</p>
            <p className="mt-2 text-xs text-gray-400">Safe To Spend</p>
            <p className={`text-sm font-semibold ${week.safeToSpend < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {formatCurrency(week.safeToSpend)}
            </p>
            {Number(week.originalSafeToSpend) < 0 ? (
              <p className="text-xs font-medium text-amber-300">Carryover: {formatCurrency(week.carryover || 0)}</p>
            ) : null}
          </article>
        ))}
      </div>
    </Card>
  )
}

export default WeeklySummary
