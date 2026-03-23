import { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Footer, Navbar } from '../components/layout'
import { Card } from '../components/ui'
import { IncomeInput } from '../features/income'
import { PayableForm, PayablesTable } from '../features/payables'
import { WeeklySummary } from '../features/weekly'
import { ExpensePieChart } from '../features/charts'
import { CalendarView } from '../features/calendar'
import { useBudget } from '../hooks/useBudget'

function App() {
  const {
    weeklySalary,
    payables,
    totalAvailableIncome,
    previousMonthBalance,
    weeklyExpenses,
    cumulativeExpenses,
    safeToSpend,
    totalExpenses,
    remainingBalance,
    setWeeklySalary,
    setPreviousMonthBalance,
    clearPreviousMonthBalance,
    addPayable,
    updatePayable,
    deletePayable,
  } = useBudget()

  const [view, setView] = useState('planner')
  const [editingId, setEditingId] = useState(null)
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false)
  const viewMenuRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (viewMenuRef.current && !viewMenuRef.current.contains(event.target)) {
        setIsViewMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const editingPayable = useMemo(
    () => payables.find((item) => item.id === editingId) || null,
    [payables, editingId],
  )

  const handlePayableSubmit = (formData) => {
    if (editingId) {
      updatePayable(editingId, formData)
      setEditingId(null)
      return
    }

    addPayable(formData)
  }

  return (
    <div className="bg-modern relative min-h-screen text-gray-200">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-12 top-16 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          monthlyIncome={totalAvailableIncome}
          totalExpenses={totalExpenses}
          remainingBalance={remainingBalance}
        />

        <Container>
          <section className="mb-4 flex flex-col gap-3 rounded-xl border border-brand-500/20 bg-black/25 px-3 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-4">
            <div>
              <h2 className="text-base font-semibold text-white">{view === 'planner' ? 'Planner' : 'Insights'}</h2>
              <p className="text-xs text-gray-400">
                {view === 'planner'
                  ? 'Manage salary, payables, and monthly distribution.'
                  : 'Review weekly trends and due-date timing.'}
              </p>
            </div>

            <div ref={viewMenuRef} className="relative w-full sm:max-w-[220px] sm:shrink-0">
              <button
                type="button"
                id="view-switch-main"
                aria-haspopup="listbox"
                aria-expanded={isViewMenuOpen}
                onClick={() => setIsViewMenuOpen((open) => !open)}
                className="h-11 w-full rounded-xl border border-brand-500/35 bg-black/45 pl-4 pr-12 text-left text-sm font-semibold tracking-wide text-gray-100 shadow-[0_0_0_1px_rgba(138,43,226,0.12)] outline-none transition-all duration-200 hover:border-brand-400/60 hover:bg-brand-500/10 focus:ring-2 focus:ring-brand-500/60"
              >
                {view === 'planner' ? 'Planner' : 'Insights'}
              </button>

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <span
                  className={`mb-0.5 block h-2.5 w-2.5 border-b-2 border-r-2 border-brand-200/80 transition-transform duration-200 ${
                    isViewMenuOpen ? '-rotate-135' : 'rotate-45'
                  }`}
                />
              </span>

              {isViewMenuOpen ? (
                <div className="absolute right-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-brand-500/40 bg-[#140f22]/95 shadow-[0_18px_36px_rgba(10,8,18,0.7)] backdrop-blur">
                  <button
                    type="button"
                    role="option"
                    aria-selected={view === 'planner'}
                    onClick={() => {
                      setView('planner')
                      setIsViewMenuOpen(false)
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-150 ${
                      view === 'planner'
                        ? 'bg-brand-500/30 text-brand-100'
                        : 'text-gray-200 hover:bg-brand-500/15 hover:text-white'
                    }`}
                  >
                    Planner
                  </button>

                  <button
                    type="button"
                    role="option"
                    aria-selected={view === 'insights'}
                    onClick={() => {
                      setView('insights')
                      setIsViewMenuOpen(false)
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-150 ${
                      view === 'insights'
                        ? 'bg-brand-500/30 text-brand-100'
                        : 'text-gray-200 hover:bg-brand-500/15 hover:text-white'
                    }`}
                  >
                    Insights
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <div className="pr-0 lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto lg:pr-1">
            {view === 'planner' && (
              <>
                <section className="grid gap-4 xl:grid-cols-12">
                  <div className="xl:col-span-5">
                    <IncomeInput
                      weeklySalary={weeklySalary}
                      previousMonthBalance={previousMonthBalance}
                      onWeeklySalaryChange={setWeeklySalary}
                      onPreviousMonthBalanceChange={setPreviousMonthBalance}
                      onClearPreviousMonthBalance={clearPreviousMonthBalance}
                    />
                  </div>

                  <div className="xl:col-span-7">
                    <PayableForm
                      onSubmit={handlePayableSubmit}
                      initialPayable={editingPayable}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                </section>

                <section className="mt-4 grid gap-4 xl:grid-cols-12">
                  <div className="xl:col-span-8">
                    <PayablesTable
                      payables={payables}
                      onEdit={(id) => setEditingId(id)}
                      onDelete={deletePayable}
                    />
                  </div>

                  <div className="xl:col-span-4">
                    <ExpensePieChart totalExpenses={totalExpenses} remainingBalance={remainingBalance} />
                  </div>
                </section>
              </>
            )}

            {view === 'insights' && (
              <section className="grid gap-4 xl:grid-cols-12">
                <div className="xl:col-span-7">
                  <WeeklySummary
                    weeklySalary={weeklySalary}
                    weeklyExpenses={weeklyExpenses}
                    cumulativeExpenses={cumulativeExpenses}
                    safeToSpend={safeToSpend}
                    previousMonthBalance={previousMonthBalance}
                    payables={payables}
                  />
                </div>

                <div className="xl:col-span-5">
                  <Card title="Calendar View" subtitle="Payable due dates by month">
                    <CalendarView payables={payables} weeklyExpenses={weeklyExpenses} />
                  </Card>
                </div>
              </section>
            )}
          </div>
        </Container>

        <Footer />
      </div>
    </div>
  )
}

export default App
