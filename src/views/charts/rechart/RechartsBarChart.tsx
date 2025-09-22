'use client'

// Next Imports
import { useState } from 'react'

import dynamic from 'next/dynamic'

// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

// Third-party Imports
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

// Component Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Hook Imports
import { useBarChartData } from '@/hooks/useDashboardData'

// React Imports

import type { TooltipProps } from '@/libs/Recharts'

// Styled Component Imports
const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

// Vars
const colors = {
  Apple: '#826af9',
  Samsung: '#9f87ff',
  Oneplus: '#d2b0ff',
  Motorola: '#f8d3ff'
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography color='text.primary'>{props.label}</Typography>
        <Divider />
        {props &&
          props.payload &&
          props.payload.map((i: any) => {
            return (
              <Box key={i.dataKey} className='flex items-center gap-2.5' sx={{ '& i': { color: i.fill } }}>
                <i className='ri-circle-fill text-[10px]' />
                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const RechartsBarChart = () => {
  // Hooks
  const theme = useTheme()

  // Local filter state for this chart only
  const [localFilters, setLocalFilters] = useState({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      end: new Date().toISOString().split('T')[0] // today
    }
  })

  const { data: chartData, isLoading, error } = useBarChartData(localFilters)

  // Transform API data to Recharts format
  const data =
    chartData?.series?.reduce((acc, series) => {
      series.data.forEach((point, index) => {
        if (!acc[index]) {
          acc[index] = { name: point.x }
        }

        acc[index][series.name] = point.y
      })

      return acc
    }, [] as any[]) || []

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
            title='فروش محصولات'
            subheader={
              <Typography variant='caption'>می‌توانید نمودار مربوط به فروش محصولات را برای هر ماه ببینید.</Typography>
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
            <div className='flex flex-wrap mbe-4 gap-6'>
              <Skeleton variant='rectangular' width={80} height={20} />
              <Skeleton variant='rectangular' width={80} height={20} />
              <Skeleton variant='rectangular' width={80} height={20} />
              <Skeleton variant='rectangular' width={80} height={20} />
            </div>
            <Skeleton variant='rectangular' width='100%' height={350} />
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardHeader
          title='فروش محصولات'
          subheader={
            <Typography variant='caption'>می‌توانید نمودار مربوط به فروش محصولات را برای هر ماه ببینید.</Typography>
          }
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
          <div className='flex flex-wrap mbe-4 gap-6'>
            {chartData?.series?.map(series => (
              <Box
                key={series.name}
                className='flex items-center gap-1.5'
                sx={{ '& i': { color: colors[series.name as keyof typeof colors] } }}
              >
                <i className='ri-circle-fill text-xs' />
                <Typography variant='body2'>{series.name}</Typography>
              </Box>
            ))}
          </div>
          <AppRecharts>
            <div className='bs-[350px]'>
              <ResponsiveContainer>
                <BarChart
                  height={350}
                  data={data}
                  barSize={15}
                  style={{ direction: theme.direction }}
                  margin={{ left: -20 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' reversed={theme.direction === 'rtl'} />
                  <YAxis orientation={theme.direction === 'rtl' ? 'right' : 'left'} />
                  <Tooltip content={CustomTooltip} />
                  {chartData?.series?.map(series => (
                    <Bar
                      key={series.name}
                      dataKey={series.name}
                      stackId='a'
                      fill={colors[series.name as keyof typeof colors]}
                      radius={series.name === 'Motorola' ? [15, 15, 0, 0] : undefined}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AppRecharts>
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}

export default RechartsBarChart
