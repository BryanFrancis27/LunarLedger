export const PAYABLE_CATEGORIES = ['Billings', 'Mandatory Needs']

export function normalizePayableCategory(category) {
  return PAYABLE_CATEGORIES.includes(category) ? category : PAYABLE_CATEGORIES[0]
}

export function validatePayable(payable) {
  if (!payable.name?.trim()) return 'Payable name is required.'
  if (!payable.amount || Number(payable.amount) <= 0) return 'Amount must be greater than zero.'
  if (!payable.dueDate) return 'Due date is required.'
  if (!PAYABLE_CATEGORIES.includes(payable.category)) return 'Please select a valid category.'
  return ''
}
