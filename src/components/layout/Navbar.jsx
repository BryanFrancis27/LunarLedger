import { formatCurrency } from '../../lib/calculations'

function Stat({ label, value, valueClassName = '' }) {
  return (
    <div className="min-w-0 rounded-xl border border-brand-500/20 bg-black/45 px-3 py-2 shadow-lg shadow-black/35 backdrop-blur">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className={`truncate text-sm font-semibold ${valueClassName}`} title={value}>
        {value}
      </p>
    </div>
  )
}

function Navbar({ monthlyIncome, totalExpenses, remainingBalance }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-500/20 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-white">Lunar</span>
            <span className="text-purple-400">Ledger</span>
          </h1>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 md:w-auto md:grid-cols-3">
          <Stat label="Income" value={formatCurrency(monthlyIncome)} valueClassName="text-brand-400" />
          <Stat label="Expenses" value={formatCurrency(totalExpenses)} valueClassName="text-rose-300" />
          <Stat label="Balance" value={formatCurrency(remainingBalance)} valueClassName="text-emerald-400" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
