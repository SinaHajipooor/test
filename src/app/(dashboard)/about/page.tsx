import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

import MultiStepForm from '@/components/panel/multiStepsForm/MultiStepForm'

export default function MultiStepsFormPage() {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <MultiStepForm />
      </Grid>
    </Grid>
  )
}
