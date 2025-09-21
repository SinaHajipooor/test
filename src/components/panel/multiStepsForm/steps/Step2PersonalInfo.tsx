'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'

// Component Imports
import DirectionalIcon from '@/components/DirectionalIcon'

// Schema Imports
import { personalSchema } from '@/schemas/multiStepFormSchema'
import type { PersonalFormData } from '@/types/formTypes'

// Store Imports
import useFormStore from '@/stores/formStore'

interface Step2PersonalInfoProps {
  onNext: () => void
  onBack: () => void
}

const Step2PersonalInfo = ({ onNext, onBack }: Step2PersonalInfoProps) => {
  // Store
  const { step2Data, updateStep2Data } = useFormStore()

  // Vars
  const Countries = ['ایران', 'آمریکا', 'انگلستان', 'آلمان', 'فرانسه', 'کانادا', 'استرالیا']
  const Languages = ['انگلیسی', 'فرانسوی', 'اسپانیایی', 'پرتغالی', 'ایتالیایی', 'آلمانی', 'عربی']
  const Genders = ['مرد', 'زن', 'سایر']
  const Experiences = ['تازه‌کار', 'کم‌تجربه', 'متوسط', 'با تجربه', 'حرفه‌ای']
  const Skills = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'PHP', 'TypeScript']

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PersonalFormData>({
    resolver: valibotResolver(personalSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: step2Data.firstName || '',
      lastName: step2Data.lastName || '',
      country: step2Data.country || '',
      language: step2Data.language || [],
      gender: step2Data.gender || '',
      birthDate: step2Data.birthDate || '',
      experience: step2Data.experience || '',
      skills: step2Data.skills || [],
      newsletter: step2Data.newsletter || false,
      terms: step2Data.terms || false
    }
  })

  const onSubmit = (data: PersonalFormData) => {
    updateStep2Data(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12 }} mb={4}>
          <h2 className='text-2xl font-bold mb-1'>اطلاعات شخصی</h2>
          <Typography variant='body2'>فیلدهای مربوط به این مرحله را با دقت وارد کنید</Typography>
        </Grid>

        {/* First Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='نام'
                placeholder='نام خود را وارد کنید'
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                onChange={e => {
                  field.onChange(e)

                  updateStep2Data({ firstName: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='نام خانوادگی'
                placeholder='نام خانوادگی خود را وارد کنید'
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                onChange={e => {
                  field.onChange(e)

                  updateStep2Data({ lastName: e.target.value })
                }}
              />
            )}
          />
        </Grid>

        {/* Country - Select */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.country}>
            <InputLabel>کشور</InputLabel>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label='کشور'
                  onChange={e => {
                    field.onChange(e)

                    updateStep2Data({ country: e.target.value })
                  }}
                >
                  {Countries.map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Language - Multi Select */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.language}>
            <InputLabel>زبان‌ها</InputLabel>
            <Controller
              name='language'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  multiple
                  label='زبان‌ها'
                  value={Array.isArray(value) ? value : []}
                  onChange={e => {
                    const newValue = e.target.value as string[]

                    onChange(newValue)

                    updateStep2Data({ language: newValue })
                  }}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} size='small' />
                      ))}
                    </Box>
                  )}
                >
                  {Languages.map(language => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.language && <FormHelperText>{errors.language.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Gender - Radio */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl component='fieldset' error={!!errors.gender}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              جنسیت
            </Typography>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  onChange={e => {
                    field.onChange(e)

                    updateStep2Data({ gender: e.target.value })
                  }}
                >
                  {Genders.map(gender => (
                    <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Birth Date - Date Picker */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='birthDate'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Box>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  تاریخ تولد
                </Typography>
                <DatePicker
                  selected={value ? new Date(value) : null}
                  onChange={date => {
                    const dateString = date ? date.toISOString() : ''

                    onChange(dateString)

                    updateStep2Data({ birthDate: dateString })
                  }}
                  dateFormat='yyyy/MM/dd'
                  placeholderText='تاریخ تولد را انتخاب کنید'
                  customInput={
                    <TextField fullWidth error={!!errors.birthDate} helperText={errors.birthDate?.message} />
                  }
                />
              </Box>
            )}
          />
        </Grid>

        {/* Experience - Select */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.experience}>
            <InputLabel>سطح تجربه</InputLabel>
            <Controller
              name='experience'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label='سطح تجربه'
                  onChange={e => {
                    field.onChange(e)

                    updateStep2Data({ experience: e.target.value })
                  }}
                >
                  {Experiences.map(exp => (
                    <MenuItem key={exp} value={exp}>
                      {exp}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.experience && <FormHelperText>{errors.experience.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Skills - Multi Select */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.skills}>
            <InputLabel>مهارت‌ها</InputLabel>
            <Controller
              name='skills'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  multiple
                  label='مهارت‌ها'
                  value={Array.isArray(value) ? value : []}
                  onChange={e => {
                    const newValue = e.target.value as string[]

                    onChange(newValue)

                    updateStep2Data({ skills: newValue })
                  }}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} size='small' />
                      ))}
                    </Box>
                  )}
                >
                  {Skills.map(skill => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.skills && <FormHelperText>{errors.skills.message}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Newsletter - Checkbox */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='newsletter'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={e => {
                      field.onChange(e)

                      updateStep2Data({ newsletter: e.target.checked })
                    }}
                    color='primary'
                  />
                }
                label='عضویت در خبرنامه'
              />
            )}
          />
        </Grid>

        {/* Terms - Checkbox */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='terms'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={e => {
                      field.onChange(e)

                      updateStep2Data({ terms: e.target.checked })
                    }}
                    color='primary'
                  />
                }
                label='قبول قوانین و مقررات'
              />
            )}
          />
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

export default Step2PersonalInfo
