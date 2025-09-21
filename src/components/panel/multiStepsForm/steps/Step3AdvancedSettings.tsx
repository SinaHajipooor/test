'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

// Component Imports
import DirectionalIcon from '@/components/DirectionalIcon'

// Schema Imports
import { advancedSchema } from '@/schemas/multiStepFormSchema'
import type { AdvancedFormData } from '@/types/formTypes'

// Store Imports
import useFormStore from '@/stores/formStore'

interface Step3AdvancedSettingsProps {
  onBack: () => void
  onSubmit: () => void
}

const Step3AdvancedSettings = ({ onBack, onSubmit }: Step3AdvancedSettingsProps) => {
  // Store
  const { step3Data, updateStep3Data, uploadedFiles, addUploadedFile, removeUploadedFile } = useFormStore()

  // Vars
  const Notifications = ['ایمیل', 'پیامک', 'اعلان‌های مرورگر', 'تلگرام']
  const Priorities = ['کم', 'متوسط', 'زیاد', 'فوری']

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AdvancedFormData>({
    resolver: valibotResolver(advancedSchema),
    mode: 'onChange',
    defaultValues: {
      bio: step3Data.bio || '',
      appointmentDate: step3Data.appointmentDate || '',
      appointmentTime: step3Data.appointmentTime || '',
      files: step3Data.files || [],
      notifications: step3Data.notifications || [],
      priority: step3Data.priority || ''
    }
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach(file => addUploadedFile(file))
  }

  const handleFileRemove = (index: number) => {
    removeUploadedFile(index)
  }

  const handleFormSubmit = (data: AdvancedFormData) => {
    updateStep3Data(data)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12 }} mb={4}>
          <h2 className='text-2xl font-bold mb-1'>تنظیمات پیشرفته</h2>
          <Typography variant='body2'>فیلدهای مربوط به این مرحله را با دقت وارد کنید</Typography>
        </Grid>

        {/* Bio - Textarea */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name='bio'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label='بیوگرافی'
                placeholder='درباره خود بنویسید...'
                error={!!errors.bio}
                helperText={errors.bio?.message}
                onChange={e => {
                  field.onChange(e)
                  updateStep3Data({ bio: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Appointment Date - Date Picker */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='appointmentDate'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Box>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  تاریخ قرار ملاقات
                </Typography>
                <DatePicker
                  selected={value ? new Date(value) : null}
                  onChange={date => {
                    const dateString = date ? date.toISOString() : ''

                    onChange(dateString)
                    updateStep3Data({ appointmentDate: dateString })
                  }}
                  dateFormat='yyyy/MM/dd'
                  placeholderText='تاریخ قرار ملاقات را انتخاب کنید'
                  customInput={
                    <TextField
                      fullWidth
                      error={!!errors.appointmentDate}
                      helperText={errors.appointmentDate?.message}
                    />
                  }
                />
              </Box>
            )}
          />
        </Grid>

        {/* Appointment Time - DateTime Picker */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='appointmentTime'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Box>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  زمان قرار ملاقات
                </Typography>
                <DatePicker
                  selected={value ? new Date(value) : null}
                  onChange={date => {
                    const dateString = date ? date.toISOString() : ''

                    onChange(dateString)
                    updateStep3Data({ appointmentTime: dateString })
                  }}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='yyyy/MM/dd HH:mm'
                  placeholderText='زمان قرار ملاقات را انتخاب کنید'
                  customInput={
                    <TextField
                      fullWidth
                      error={!!errors.appointmentTime}
                      helperText={errors.appointmentTime?.message}
                    />
                  }
                />
              </Box>
            )}
          />
        </Grid>

        {/* Priority - Radio */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl component='fieldset' error={!!errors.priority}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              اولویت
            </Typography>
            <Controller
              name='priority'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  onChange={e => {
                    field.onChange(e)
                    updateStep3Data({ priority: e.target.value })
                  }}
                >
                  {Priorities.map(priority => (
                    <FormControlLabel key={priority} value={priority} control={<Radio />} label={priority} />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Notifications - Multi Checkbox */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl component='fieldset' error={!!errors.notifications}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              نحوه اطلاع‌رسانی
            </Typography>
            <Controller
              name='notifications'
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormGroup>
                  {Notifications.map(notification => (
                    <FormControlLabel
                      key={notification}
                      control={
                        <Checkbox
                          checked={Array.isArray(value) && (value as string[]).includes(notification)}
                          onChange={e => {
                            const currentValue = Array.isArray(value) ? value : []

                            const newValue = e.target.checked
                              ? [...currentValue, notification]
                              : currentValue.filter(item => item !== notification)

                            onChange(newValue)
                            updateStep3Data({ notifications: newValue })
                          }}
                        />
                      }
                      label={notification}
                    />
                  ))}
                </FormGroup>
              )}
            />
            {errors.notifications && <FormHelperText>{errors.notifications.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* File Uploader */}
        <Grid size={{ xs: 12 }}>
          <Typography variant='body2' sx={{ mb: 2 }}>
            آپلود فایل‌ها
          </Typography>
          <Paper
            variant='outlined'
            sx={{
              p: 3,
              border: '2px dashed',
              borderColor: 'primary.main',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'action.hover'
              }
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id='file-upload'
              type='file'
              multiple
              accept='image/*,.pdf,.doc,.docx'
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Box sx={{ mb: 2 }}>
              <i
                className='ri-upload-cloud-2-line'
                style={{ fontSize: '2rem', color: 'var(--mui-palette-primary-main)' }}
              />
            </Box>
            <Typography variant='body2' color='text.secondary'>
              فایل‌های خود را اینجا بکشید یا کلیک کنید
            </Typography>
            <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 1 }}>
              فرمت‌های پشتیبانی شده: JPG, PNG, PDF, DOC, DOCX
            </Typography>
          </Paper>

          {/* File Previews */}
          {uploadedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' sx={{ mb: 1 }}>
                فایل‌های آپلود شده:
              </Typography>
              <Grid container spacing={2}>
                {uploadedFiles.map((file, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Paper
                      variant='outlined'
                      sx={{
                        p: 2,
                        position: 'relative',
                        '&:hover .remove-btn': {
                          opacity: 1
                        }
                      }}
                    >
                      <IconButton
                        className='remove-btn'
                        size='small'
                        onClick={() => handleFileRemove(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          backgroundColor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'error.dark'
                          }
                        }}
                      >
                        <i className='ri-close-line' />
                      </IconButton>

                      {file.type.startsWith('image/') ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar
                            src={URL.createObjectURL(file)}
                            variant='rounded'
                            sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                          />
                          <Typography variant='caption' display='block' noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary' display='block'>
                            {(file.size / 1024).toFixed(1)} KB
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar
                            variant='rounded'
                            sx={{
                              width: 80,
                              height: 80,
                              mx: 'auto',
                              mb: 1,
                              backgroundColor: 'primary.main'
                            }}
                          >
                            <i className='ri-file-line' style={{ fontSize: '2rem' }} />
                          </Avatar>
                          <Typography variant='caption' display='block' noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary' display='block'>
                            {(file.size / 1024).toFixed(1)} KB
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12 }} className='flex justify-between'>
          <Button
            variant='outlined'
            onClick={onBack}
            color='secondary'
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            قبلی
          </Button>
          <Button variant='contained' type='submit' disabled={!isValid} endIcon={<i className='ri-check-line' />}>
            ارسال
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Step3AdvancedSettings
