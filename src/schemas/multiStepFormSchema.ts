import {
  email,
  object,
  minLength,
  string,
  array,
  forward,
  pipe,
  nonEmpty,
  check,
  boolean,
  url,
  regex,
  maxLength
} from 'valibot'

// Step 1: Account Information Schema
export const accountSchema = pipe(
  object({
    username: pipe(
      string(),
      nonEmpty('نام کاربری الزامی است'),
      minLength(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),
      regex(/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط می‌تواند شامل حروف، اعداد و خط تیره باشد')
    ),
    email: pipe(string(), nonEmpty('ایمیل الزامی است'), email('لطفاً یک ایمیل معتبر وارد کنید')),
    password: pipe(
      string(),
      nonEmpty('رمز عبور الزامی است'),
      minLength(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
      regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'رمز عبور باید شامل حروف کوچک، بزرگ و عدد باشد')
    ),
    confirmPassword: pipe(string(), nonEmpty('تکرار رمز عبور الزامی است')),
    phone: pipe(
      string(),
      nonEmpty('شماره تلفن الزامی است'),
      regex(/^09\d{9}$/, 'شماره تلفن باید با 09 شروع شده و 11 رقم باشد')
    ),
    website: pipe(string(), nonEmpty('وب‌سایت الزامی است'), url('لطفاً یک آدرس وب معتبر وارد کنید'))
  }),
  forward(
    check(input => input.password === input.confirmPassword, 'رمزهای عبور مطابقت ندارند'),
    ['confirmPassword']
  )
)

// Step 2: Personal Information Schema
export const personalSchema = object({
  firstName: pipe(string(), nonEmpty('نام الزامی است'), minLength(2, 'نام باید حداقل ۲ کاراکتر باشد')),
  lastName: pipe(string(), nonEmpty('نام خانوادگی الزامی است'), minLength(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')),
  country: pipe(string(), nonEmpty('کشور الزامی است')),
  language: pipe(array(string()), nonEmpty('حداقل یک زبان انتخاب کنید'), minLength(1, 'حداقل یک زبان انتخاب کنید')),
  gender: pipe(string(), nonEmpty('جنسیت الزامی است')),
  birthDate: pipe(string(), nonEmpty('تاریخ تولد الزامی است')),
  registrationDate: pipe(string(), nonEmpty('تاریخ و زمان ثبت نام الزامی است')),
  experience: pipe(string(), nonEmpty('سطح تجربه الزامی است')),
  skills: pipe(array(string()), nonEmpty('حداقل یک مهارت انتخاب کنید'), minLength(1, 'حداقل یک مهارت انتخاب کنید')),
  newsletter: boolean(),
  terms: boolean()
})

// Step 3: Advanced Settings Schema
export const advancedSchema = object({
  bio: pipe(
    string(),
    nonEmpty('بیوگرافی الزامی است'),
    minLength(10, 'بیوگرافی باید حداقل ۱۰ کاراکتر باشد'),
    maxLength(100, 'بیوگرافی باید حداکثر 100 کاراکتر باشد')
  ),
  files: pipe(array(string()), nonEmpty('حداقل یک فایل آپلود کنید'), minLength(1, 'حداقل یک فایل آپلود کنید')),
  notifications: pipe(
    array(string()),
    nonEmpty('حداقل یک روش اطلاع‌رسانی انتخاب کنید'),
    minLength(1, 'حداقل یک روش اطلاع‌رسانی انتخاب کنید')
  ),
  priority: pipe(string(), nonEmpty('اولویت الزامی است'))
})

// Combined schema for all steps
export const multiStepFormSchema = object({
  step1: accountSchema,
  step2: personalSchema,
  step3: advancedSchema
})

// Import types from separate types file
export type { AccountFormData, PersonalFormData, AdvancedFormData, MultiStepFormData } from '@/types/formTypes'
