'use client'

// Next Imports
import { useState } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

// Hook Imports
import { useLineChartData } from '@/hooks/useDashboardData'

// React Imports

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const ApexLineChart = () => {
  // Local filter state for this chart only
  const [localFilters, setLocalFilters] = useState({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      end: new Date().toISOString().split('T')[0] // today
    }
  })

  const { data: chartData, isLoading, error } = useLineChartData(localFilters)

  // Use API data or show loading state
  const series =
    chartData?.series?.map(s => ({
      data: s.data.map(d => d.y)
    })) || []

  const handleDateRangeChange = (field: 'start' | 'end', date: Dayjs | null) => {
    const dateString = date ? date.format('YYYY-MM-DD') : ''

    setLocalFilters(prev => ({
      dateRange: {
        ...prev.dateRange,
        [field]: dateString
      }
    }))
  }

  // Only show skeleton on initial load (when there's no data yet)
  if (isLoading && !(chartData as any)?.series?.length) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card>
          <CardHeader
            title='درصد پیشرفت فروش'
            subheader={
              <Typography variant='caption'>می‌توانید درصد پیشرفت فروش برای هر ماه را مشاهده نمایید</Typography>
            }
            action={
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Skeleton variant='rectangular' width='100%' height={40} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Skeleton variant='rectangular' width='100%' height={40} />
                  </Grid>
                </Grid>
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
      </LocalizationProvider>
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
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
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
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px', fontFamily: 'YekanBakh' }
      },
      categories: chartData?.series[0]?.data?.map(item => item.x) || []
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardHeader
          title='درصد پیشرفت فروش'
          subheader={<Typography variant='caption'>می‌توانید درصد پیشرفت فروش برای هر ماه را مشاهده نمایید</Typography>}
          action={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='تاریخ شروع'
                      value={localFilters.dateRange?.start ? dayjs(localFilters.dateRange.start) : null}
                      onChange={(date: Dayjs | null) => handleDateRangeChange('start', date)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true
                        }
                      }}
                    />
                  </DemoContainer>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='تاریخ پایان'
                      value={localFilters.dateRange?.end ? dayjs(localFilters.dateRange.end) : null}
                      onChange={(date: Dayjs | null) => handleDateRangeChange('end', date)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true
                        }
                      }}
                    />
                  </DemoContainer>
                </Grid>
              </Grid>
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
          <AppReactApexCharts type='line' width='100%' height={400} options={options} series={series} />
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}

export default ApexLineChart
