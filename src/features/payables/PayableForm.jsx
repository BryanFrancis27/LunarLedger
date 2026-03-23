import { useEffect, useState } from 'react'
import { Button, Card, Input } from '../../components/ui'
import { PAYABLE_CATEGORIES, normalizePayableCategory, validatePayable } from './payableUtils'

const initialState = {
  name: '',
  amount: '',
  dueDate: '',
  category: PAYABLE_CATEGORIES[0],
}

function PayableForm({ onSubmit, initialPayable, onCancel }) {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!initialPayable) {
      setForm(initialState)
      return
    }

    setForm({
      name: initialPayable.name,
      amount: String(initialPayable.amount),
      dueDate: initialPayable.dueDate,
      category: normalizePayableCategory(initialPayable.category),
    })
  }, [initialPayable])

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationError = validatePayable(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    onSubmit({
      name: form.name.trim(),
      amount: Number(form.amount),
      dueDate: form.dueDate,
      category: form.category,
    })

    if (!initialPayable) {
      setForm(initialState)
    }
  }

  return (
    <Card title={initialPayable ? 'Edit Payable' : 'Add Payable'} subtitle="Track due dates and amounts">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input id="payable-name" label="Payable Name" value={form.name} onChange={handleChange('name')} />

        <Input
          id="payable-amount"
          label="Amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange('amount')}
        />

        <Input id="payable-date" label="Due Date" type="date" value={form.dueDate} onChange={handleChange('dueDate')} />

        <label className="block">
          <span className="mb-1 block text-sm text-gray-300">Category</span>
          <select
            id="payable-category"
            value={form.category}
            onChange={handleChange('category')}
            className="input-modern"
          >
            {PAYABLE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button type="submit" className="w-full rounded-full sm:w-auto">
            {initialPayable ? 'Update Payable' : 'Add Payable'}
          </Button>
          {initialPayable ? (
            <Button type="button" variant="secondary" className="w-full rounded-full sm:w-auto" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </Card>
  )
}

export default PayableForm
