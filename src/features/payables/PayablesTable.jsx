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
        <div className="overflow-x-auto rounded-xl border border-brand-500/20 bg-black/35 shadow-lg shadow-black/25">
          <table className="w-full min-w-[620px] text-left text-sm">
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
                  <td className="px-3 py-3">{item.name}</td>
                  <td className="px-3 py-3 text-brand-400">{formatCurrency(item.amount)}</td>
                  <td className="px-3 py-3">{item.dueDate}</td>
                  <td className="px-3 py-3">Week {getWeekOfMonth(item.dueDate)}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
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
