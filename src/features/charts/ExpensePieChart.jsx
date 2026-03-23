import { useEffect, useState } from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Card } from '../../components/ui'
import { createExpensePieData } from './chartUtils'

ChartJS.register(ArcElement, Tooltip, Legend)

function ExpensePieChart({ totalExpenses, remainingBalance }) {
  const data = createExpensePieData(totalExpenses, remainingBalance)
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isPhone = screenWidth < 640
  const isTablet = screenWidth >= 640 && screenWidth < 1024

  return (
    <Card title="Monthly Distribution" subtitle="Expenses vs remaining balance">
      <div className="mx-auto h-[220px] w-full max-w-[280px] rounded-xl border border-brand-500/20 bg-black/35 p-2.5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.18)] sm:h-[270px] sm:max-w-[340px] sm:p-3 md:h-[320px] md:max-w-[420px]">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: isPhone ? 'bottom' : 'top',
                labels: {
                  color: '#d9d9e3',
                  boxWidth: isPhone ? 10 : isTablet ? 12 : 14,
                  font: {
                    size: isPhone ? 10 : isTablet ? 11 : 12,
                  },
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
