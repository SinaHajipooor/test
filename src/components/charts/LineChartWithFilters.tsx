'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'

// Component Imports
import ApexLineChart from '@views/charts/apex/ApexLineChart'

// Hook Imports
import { useLineChartData } from '@/hooks/useDashboardData'
import { useDashboardFilters } from '@/contexts/DashboardContext'

const LineChartWithFilters = () => {
  const { filters, updateFilters } = useDashboardFilters()
  const { data, isLoading, isError, error } = useLineChartData(filters)

  const handlePeriodChange = (event: any) => {
    updateFilters({ period: event.target.value })
  }

  const handleCategoryChange = (event: any) => {
    updateFilters({ category: event.target.value })
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <Alert severity='error'>خطا در بارگذاری داده‌ها: {error?.message || 'خطای نامشخص'}</Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title='نمودار خطی آمار کاربران'
        subheader={
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip label='کاربران فعال' size='small' color='primary' />
            <Chip label='بازدیدکنندگان' size='small' color='secondary' />
            <Chip label='تبدیل' size='small' color='success' />
          </Box>
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
      />
      <CardContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : data ? (
          <ApexLineChart data={data} />
        ) : (
          <Typography variant='body2' color='text.secondary' textAlign='center'>
            داده‌ای برای نمایش وجود ندارد
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default LineChartWithFilters
