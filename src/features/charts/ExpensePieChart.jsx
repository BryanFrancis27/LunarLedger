import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card } from '../../components/ui'
import { createExpensePieData } from './chartUtils'

ChartJS.register(ArcElement, Tooltip, Legend)

function ExpensePieChart({ totalExpenses, remainingBalance }) {
  const data = createExpensePieData(totalExpenses, remainingBalance)

  return (
    <Card title="Monthly Distribution" subtitle="Expenses vs remaining balance">
      <div className="mx-auto w-full max-w-[320px] rounded-xl border border-brand-500/20 bg-black/35 p-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.18)] sm:max-w-[360px]">
        <Pie
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#d9d9e3',
                },
              },
              tooltip: {
                backgroundColor: '#120f1e',
                borderColor: '#8a2be2',
                borderWidth: 1,
                titleColor: '#f5f3ff',
                bodyColor: '#e0e0e0',
              },
            },
          }}
        />
      </div>
    </Card>
  )
}

export default ExpensePieChart
