'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { Typography } from '@mui/material'

// Hook Imports
import { useDonutChartData } from '@/hooks/useDashboardData'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#32baff',
  series5: '#ffa1a1'
}

const ApexDonutChart = () => {
  // Hooks
  const theme = useTheme()
  const { data: chartData, isLoading, error } = useDonutChartData()

  if (isLoading) {
    return (
      <Card>
        <CardHeader
          title='مقایسه هزینه‌ها'
          subheader={<Typography variant='caption'>مقایسه هزینه‌ها در دسته بندی‌های مختلف</Typography>}
        />
        <CardContent>
          <Skeleton variant='circular' width={430} height={430} sx={{ mx: 'auto' }} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color='error'>خطا در بارگذاری داده‌ها</Typography>
        </CardContent>
      </Card>
    )
  }

  // Vars
  const textSecondary = 'var(--mui-palette-text-secondary)'

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: chartData?.labels || [],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2, donutColors.series4],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      fontSize: '13px',
      position: 'bottom',
      markers: {
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      labels: { colors: textSecondary },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: textSecondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: () => '31%',
              color: 'var(--mui-palette-text-primary)'
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='مقایسه هزینه‌ها'
        subheader={<Typography variant='caption'>مقایسه هزینه‌ها در دسته بندی‌های مختلف</Typography>}
      />
      <CardContent>
        <AppReactApexCharts type='donut' width='100%' height={430} options={options} series={chartData?.series || []} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
