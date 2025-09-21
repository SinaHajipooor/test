// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ApexBarChart from '@views/charts/apex/ApexBarChart'
import ApexAreaChart from '@views/charts/apex/ApexAreaChart'
import ApexLineChart from '@views/charts/apex/ApexLineChart'
import ApexRadarChart from '@views/charts/apex/ApexRadarChart'
import ApexDonutChart from '@views/charts/apex/ApexDonutChart'
import ApexColumnChart from '@views/charts/apex/ApexColumnChart'
import ApexScatterChart from '@views/charts/apex/ApexScatterChart'
import ApexCandlestickChart from '@views/charts/apex/ApexCandlestickChart'

const DashboardPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexAreaChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexColumnChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexScatterChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexLineChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexBarChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexCandlestickChart />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ApexRadarChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ApexDonutChart />
      </Grid>
    </Grid>
  )
}

export default DashboardPage
