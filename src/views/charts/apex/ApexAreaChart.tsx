'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { Typography } from '@mui/material'

// Hook Imports
import { useDashboardFilters } from '@/contexts/DashboardContext'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Type Imports
import type { AreaChartData } from '@/services/dashboardApi'

// Vars
const areaColors = {
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}

// Default data
const defaultSeries = [
  {
    name: 'بازدیدها',
    data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
  },
  {
    name: 'کلیک‌ها',
    data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
  },
  {
    name: 'فروش',
    data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220]
  }
]

interface ApexAreaChartProps {
  data?: AreaChartData
}

const ApexAreaChart = ({ data }: ApexAreaChartProps) => {
  const { filters, updateFilters } = useDashboardFilters()

  // Use provided data or default data
  const series =
    data?.series?.map(s => ({
      name: s.name,
      data: s.data.map(d => d.y)
    })) || defaultSeries

  const handlePeriodChange = (event: any) => {
    updateFilters({ period: event.target.value })
  }

  const handleCategoryChange = (event: any) => {
    updateFilters({ category: event.target.value })
  }

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const textDisabled = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      fontSize: '13px',
      markers: {
        offsetY: 2,
        offsetX: 3
      },
      itemMargin: { horizontal: 10 }
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,

      type: 'solid'
    },
    grid: {
      show: true,
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: textDisabled, fontSize: '13px', fontFamily: 'YekanBakh' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: textDisabled, fontSize: '13px', fontFamily: 'YekanBakh' }
      },
      categories: data?.series[0]?.data?.map(item => item.x) || [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12'
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title='آخرین به‌روزرسانی‌ها'
        subheader={
          <Typography variant='caption'>
            می‌توانید نمودار مربوط به آخرین به‌روزرسانی‌ها را برای هر ماه ببینید.
          </Typography>
        }
        action={
          <Box sx={{ display: 'flex', gap: 2, minWidth: 200 }}>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>دوره</InputLabel>
              <Select value={filters.period || 'daily'} label='دوره' onChange={handlePeriodChange}>
                <MenuItem value='daily'>روزانه</MenuItem>
                <MenuItem value='weekly'>هفتگی</MenuItem>
                <MenuItem value='monthly'>ماهانه</MenuItem>
                <MenuItem value='yearly'>سالانه</MenuItem>
              </Select>
            </FormControl>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>دسته‌بندی</InputLabel>
              <Select value={filters.category || 'همه'} label='دسته‌بندی' onChange={handleCategoryChange}>
                <MenuItem value='همه'>همه</MenuItem>
                <MenuItem value='الکترونیک'>الکترونیک</MenuItem>
                <MenuItem value='پوشاک'>پوشاک</MenuItem>
                <MenuItem value='کتاب'>کتاب</MenuItem>
                <MenuItem value='ورزش'>ورزش</MenuItem>
                <MenuItem value='خانه'>خانه</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='area' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexAreaChart
