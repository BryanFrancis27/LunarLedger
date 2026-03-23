import { formatCurrency } from '../../lib/calculations'

function Stat({ label, value, valueClassName = '' }) {
  return (
    <div className="rounded-xl border border-brand-500/20 bg-black/45 px-3 py-2 shadow-lg shadow-black/35 backdrop-blur">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className={`text-sm font-semibold ${valueClassName}`}>{value}</p>
    </div>
  )
}

function Navbar({ monthlyIncome, totalExpenses, remainingBalance }) {
  return (
    <header className="sticky top-0 z-10 border-b border-brand-500/20 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-white">Lunar</span>
            <span className="text-purple-400">Ledger</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Income" value={formatCurrency(monthlyIncome)} valueClassName="text-brand-400" />
          <Stat label="Expenses" value={formatCurrency(totalExpenses)} valueClassName="text-rose-300" />
          <Stat label="Balance" value={formatCurrency(remainingBalance)} valueClassName="text-emerald-400" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
