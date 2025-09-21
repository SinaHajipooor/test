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
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

// Component Imports
import RechartsBarChart from '@views/charts/rechart/RechartsBarChart'

// Hook Imports
import { useBarChartData } from '@/hooks/useDashboardData'
import { useDashboardFilters } from '@/contexts/DashboardContext'

const BarChartWithFilters = () => {
  const { filters, updateFilters } = useDashboardFilters()
  const { data, isLoading, isError, error } = useBarChartData(filters)

  const handlePeriodChange = (event: any) => {
    updateFilters({ period: event.target.value })
  }

  const handleCategoryChange = (event: any) => {
    updateFilters({ category: event.target.value })
  }

  const handleQuickFilter = (period: string) => {
    updateFilters({ period })
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
        title='نمودار میله‌ای فروش محصولات'
        action={
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ButtonGroup size='small' variant='outlined'>
              <Button
                onClick={() => handleQuickFilter('daily')}
                variant={filters.period === 'daily' ? 'contained' : 'outlined'}
              >
                روزانه
              </Button>
              <Button
                onClick={() => handleQuickFilter('weekly')}
                variant={filters.period === 'weekly' ? 'contained' : 'outlined'}
              >
                هفتگی
              </Button>
              <Button
                onClick={() => handleQuickFilter('monthly')}
                variant={filters.period === 'monthly' ? 'contained' : 'outlined'}
              >
                ماهانه
              </Button>
            </ButtonGroup>
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
          <RechartsBarChart data={data} />
        ) : (
          <Typography variant='body2' color='text.secondary' textAlign='center'>
            داده‌ای برای نمایش وجود ندارد
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default BarChartWithFilters
