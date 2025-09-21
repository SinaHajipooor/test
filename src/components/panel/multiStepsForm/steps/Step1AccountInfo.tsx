'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

// Component Imports
import DirectionalIcon from '@/components/DirectionalIcon'

// Schema Imports
import { accountSchema } from '@/schemas/multiStepFormSchema'
import type { AccountFormData } from '@/types/formTypes'

// Store Imports
import useFormStore from '@/stores/formStore'

interface Step1AccountInfoProps {
  onNext: () => void
}

const Step1AccountInfo = ({ onNext }: Step1AccountInfoProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  // Store
  const { step1Data, updateStep1Data } = useFormStore()

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AccountFormData>({
    resolver: valibotResolver(accountSchema),
    mode: 'onChange', // Enable live validation
    defaultValues: {
      username: step1Data.username || '',
      email: step1Data.email || '',
      password: step1Data.password || '',
      confirmPassword: step1Data.confirmPassword || '',
      phone: step1Data.phone || '',
      website: step1Data.website || ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const onSubmit = (data: AccountFormData) => {
    updateStep1Data(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12 }} mb={4}>
          <h2 className='text-2xl font-bold mb-1'>اطلاعات حساب</h2>
          <Typography variant='body2'>فیلدهای مربوط به این مرحله را با دقت وارد کنید</Typography>
        </Grid>

        {/* Username */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='نام کاربری'
                placeholder='نام کاربری خود را وارد کنید'
                error={!!errors.username}
                helperText={errors.username?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ username: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='email'
                label='ایمیل'
                placeholder='example@gmail.com'
                error={!!errors.email}
                helperText={errors.email?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ email: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='شماره تلفن'
                placeholder='09123456789'
                error={!!errors.phone}
                helperText={errors.phone?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ phone: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Website */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='website'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='وب‌سایت'
                placeholder='https://example.com'
                error={!!errors.website}
                helperText={errors.website?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ website: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='رمز عبور'
                placeholder='حداقل ۸ کاراکتر'
                type={isPasswordShown ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ password: e.target.value })
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='نمایش رمز عبور'
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            )}
          />
        </Grid>

        {/* Confirm Password */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='تکرار رمز عبور'
                placeholder='رمز عبور را مجدداً وارد کنید'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep1Data({ confirmPassword: e.target.value })
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='نمایش رمز عبور'
                        >
                          <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} className='flex justify-between'>
          <Button
            variant='outlined'
            disabled
            color='secondary'
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            قبلی
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={!isValid}
            endIcon={<DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />}
          >
            بعدی
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Step1AccountInfo
