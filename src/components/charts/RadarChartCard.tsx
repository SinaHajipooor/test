'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Component Imports
import ApexRadarChart from '@views/charts/apex/ApexRadarChart'

// Hook Imports
import { useRadarChartData } from '@/hooks/useDashboardData'
import { useDashboardFilters } from '@/contexts/DashboardContext'

const RadarChartCard = () => {
  const { filters } = useDashboardFilters()
  const { data, isLoading, isError, error } = useRadarChartData(filters)

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
      <CardHeader title='نمودار راداری عملکرد سیستم' />
      <CardContent>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : data ? (
          <ApexRadarChart data={data} />
        ) : (
          <Typography variant='body2' color='text.secondary' textAlign='center'>
            داده‌ای برای نمایش وجود ندارد
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default RadarChartCard
