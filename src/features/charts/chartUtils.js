export function createExpensePieData(totalExpenses, remainingBalance) {
  return {
    labels: ['Expenses', 'Remaining'],
    datasets: [
      {
        data: [Math.max(totalExpenses, 0), Math.max(remainingBalance, 0)],
        backgroundColor: ['#8a2be2', '#4b0082'],
        hoverBackgroundColor: ['#a855f7', '#6d28d9'],
        borderColor: ['#0a0a0a', '#0a0a0a'],
        borderWidth: 2,
      },
    ],
  }
}
