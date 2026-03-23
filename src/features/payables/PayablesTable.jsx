import { Button, Card } from '../../components/ui'
import { formatCurrency } from '../../lib/calculations'
import { getWeekOfMonth } from '../../lib/dateHelpers'
import { PAYABLE_CATEGORIES, normalizePayableCategory } from './payableUtils'

function CategorySection({ title, items, onEdit, onDelete }) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">{title}</h3>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-500/25 bg-black/35 p-3 text-sm text-gray-400">
          No entries in this category.
        </p>
      ) : (
        <div className="rounded-xl border border-brand-500/20 bg-black/35 shadow-lg shadow-black/25">
          <p className="px-3 pt-3 text-xs text-gray-400 sm:hidden">Swipe horizontally to view all columns.</p>
          <div className="scroll-x-touch scroll-x-mobile-only -mx-1 px-1 pb-1">
            <table className="w-full min-w-[680px] text-left text-xs sm:min-w-[760px] sm:text-sm lg:min-w-full">
            <thead>
              <tr className="border-b border-brand-500/20 text-gray-300">
                <th className="px-3 py-2.5 font-semibold">Name</th>
                <th className="px-3 py-2.5 font-semibold">Amount</th>
                <th className="px-3 py-2.5 font-semibold">Due Date</th>
                <th className="px-3 py-2.5 font-semibold">Week</th>
                <th className="px-3 py-2.5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5 text-gray-200 transition-all duration-300 hover:bg-brand-500/10 hover:shadow-[inset_0_0_0_1px_rgba(138,43,226,0.2)]"
                >
                  <td className="px-3 py-3 whitespace-nowrap">{item.name}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-brand-400">{formatCurrency(item.amount)}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{item.dueDate}</td>
                  <td className="px-3 py-3 whitespace-nowrap">Week {getWeekOfMonth(item.dueDate)}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button variant="secondary" className="rounded-full px-3 py-1.5" onClick={() => onEdit(item.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="rounded-full px-3 py-1.5" onClick={() => onDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

function PayablesTable({ payables, onEdit, onDelete }) {
  const normalizedPayables = payables.map((item) => ({
    ...item,
    category: normalizePayableCategory(item.category),
  }))

  const billings = normalizedPayables.filter((item) => item.category === PAYABLE_CATEGORIES[0])
  const mandatoryNeeds = normalizedPayables.filter((item) => item.category === PAYABLE_CATEGORIES[1])

  return (
    <Card title="Payables Table" subtitle="Split by category">
      {payables.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-500/25 bg-black/35 p-4 text-sm text-gray-400">
          No payables added yet.
        </p>
      ) : (
        <div className="space-y-4">
          <CategorySection title="Billings" items={billings} onEdit={onEdit} onDelete={onDelete} />
          <CategorySection title="Mandatory Needs" items={mandatoryNeeds} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </Card>
  )
}

export default PayablesTable
