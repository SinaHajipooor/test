'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const ApexBarChart = () => {
  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        barHeight: '30%',
        horizontal: true
      }
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px', fontFamily: 'YekanBakh' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      categories: ['دوشنبه، ۱۱', 'پنج‌شنبه، ۱۴', 'جمعه، ۱۵', 'دوشنبه، ۱۸', 'چهارشنبه، ۲۰', 'جمعه، ۲۱', 'دوشنبه، ۲۳'],
      labels: {
        style: { colors: disabledText, fontSize: '13px', fontFamily: 'YekanBakh' }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='علم داده'
        subheader='۷۴,۳۸۲.۷۲ ریال'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts
          type='bar'
          width='100%'
          height={400}
          options={options}
          series={[{ data: [700, 350, 480, 600, 210, 550, 150] }]}
        />
      </CardContent>
    </Card>
  )
}

export default ApexBarChart
