'use client'

// React Imports
import { useState } from 'react'

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
import Skeleton from '@mui/material/Skeleton'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { Typography } from '@mui/material'

// Hook Imports
import { useAreaChartData, useFilterOptions } from '@/hooks/useDashboardData'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const areaColors = {
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}

const ApexAreaChart = () => {
  // Local filter state for this chart only
  const [localFilters, setLocalFilters] = useState({
    period: 'daily' as 'daily' | 'weekly' | 'monthly' | 'yearly',
    category: 'همه'
  })

  const { data: chartData, isLoading, isFetching, error } = useAreaChartData(localFilters)
  const { data: filterOptions } = useFilterOptions()

  // Use API data or show loading state
  const series =
    chartData?.series?.map(s => ({
      name: s.name,
      data: s.data.map(d => d.y)
    })) || []

  // Only show skeleton on initial load (when there's no data yet)
  if (isLoading && !(chartData as any)?.series?.length) {
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
              <Skeleton variant='rectangular' width={120} height={40} />
              <Skeleton variant='rectangular' width={120} height={40} />
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
          <Skeleton variant='rectangular' width='100%' height={400} />
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

  const handlePeriodChange = (event: any) => {
    setLocalFilters(prev => ({ ...prev, period: event.target.value }))
  }

  const handleCategoryChange = (event: any) => {
    setLocalFilters(prev => ({ ...prev, category: event.target.value }))
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
      categories: chartData?.series[0]?.data?.map(item => item.x) || []
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
          <Box sx={{ display: 'flex', gap: 2, minWidth: 200, position: 'relative' }}>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>دوره</InputLabel>
              <Select value={localFilters.period} label='دوره' onChange={handlePeriodChange}>
                {filterOptions?.periods?.map(period => (
                  <MenuItem key={period.value} value={period.value}>
                    {period.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel>دسته‌بندی</InputLabel>
              <Select value={localFilters.category} label='دسته‌بندی' onChange={handleCategoryChange}>
                {filterOptions?.categories?.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isFetching && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              />
            )}
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
