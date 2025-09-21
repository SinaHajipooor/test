'use client'

// React Imports
import React from 'react'

// MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MuiStepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import type { StepperProps } from '@mui/material/Stepper'

// Third-party Imports
import { toast } from 'react-toastify'

// Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'

// Step Components
import Step1AccountInfo from './steps/Step1AccountInfo'
import Step2PersonalInfo from './steps/Step2PersonalInfo'
import Step3AdvancedSettings from './steps/Step3AdvancedSettings'

// Store Imports
import useFormStore from '@/stores/formStore'

// Vars
const steps = [
  {
    title: 'اطلاعات حساب',
    subtitle: 'جزئیات حساب کاربری خود را وارد کنید'
  },
  {
    title: 'اطلاعات شخصی',
    subtitle: 'تنظیم اطلاعات شخصی'
  },
  {
    title: 'تنظیمات پیشرفته',
    subtitle: 'تنظیمات و فایل‌های اضافی'
  }
]

// Styled Components
const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  justifyContent: 'center',
  '& .MuiStep-root': {
    '&:first-of-type': {
      paddingInlineStart: 0
    },
    '&:last-of-type': {
      paddingInlineEnd: 0
    },
    [theme.breakpoints.down('md')]: {
      paddingInline: 0
    }
  }
}))

const MultiStepForm = () => {
  // Store
  const { currentStep, setCurrentStep, resetForm } = useFormStore()

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    toast.success('فرم با موفقیت ارسال شد')
    resetForm()
  }

  const handleReset = () => {
    resetForm()
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <Step1AccountInfo onNext={handleNext} />
      case 1:
        return <Step2PersonalInfo onNext={handleNext} onBack={handleBack} />
      case 2:
        return <Step3AdvancedSettings onBack={handleBack} onSubmit={handleSubmit} />
      default:
        return <Typography color='text.primary'>مرحله نامشخص</Typography>
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={currentStep}>
            {steps.map((label, index) => {
              const labelProps: {
                error?: boolean
              } = {}

              if (index === currentStep) {
                labelProps.error = false
              }

              return (
                <Step key={index}>
                  <StepLabel
                    {...labelProps}
                    slots={{
                      stepIcon: StepperCustomDot
                    }}
                  >
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{label.title}</Typography>
                        <Typography className='step-subtitle'>{label.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider />
      <CardContent>
        {currentStep === steps.length ? (
          <>
            <Typography className='mlb-2 mli-1' color='text.primary'>
              تمام مراحل با موفقیت تکمیل شد!
            </Typography>
            <div className='flex justify-end mt-4'>
              <Button variant='contained' onClick={handleReset}>
                شروع مجدد
              </Button>
            </div>
          </>
        ) : (
          renderStepContent(currentStep)
        )}
      </CardContent>
    </Card>
  )
}

export default MultiStepForm
