// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ApexAreaChart from '@views/charts/apex/ApexAreaChart'
import ApexLineChart from '@views/charts/apex/ApexLineChart'
import ApexRadarChart from '@views/charts/apex/ApexRadarChart'
import ApexDonutChart from '@views/charts/apex/ApexDonutChart'
import RechartsBarChart from '@/views/charts/rechart/RechartsBarChart'

const DashboardPage = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 8 }}>
        <ApexAreaChart />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ApexDonutChart />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <RechartsBarChart />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ApexRadarChart />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ApexLineChart />
      </Grid>
    </Grid>
  )
}

export default DashboardPage
