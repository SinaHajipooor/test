// Form data types for multi-step form

export interface AccountFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  website: string
}

export interface PersonalFormData {
  firstName: string
  lastName: string
  country: string
  language: string[]
  gender: string
  birthDate: string
  registrationDate: string
  experience: string
  skills: string[]
  newsletter: boolean
  terms: boolean
}

export interface AdvancedFormData {
  bio: string
  files: string[]
  notifications: string[]
  priority: string
}

export interface MultiStepFormData {
  step1: AccountFormData
  step2: PersonalFormData
  step3: AdvancedFormData
}

// Store types
export interface FormState {
  currentStep: number
  step1Data: Partial<AccountFormData>
  step2Data: Partial<PersonalFormData>
  step3Data: Partial<AdvancedFormData>
  uploadedFiles: File[]
}

export interface FormActions {
  setCurrentStep: (step: number) => void
  updateStep1Data: (data: Partial<AccountFormData>) => void
  updateStep2Data: (data: Partial<PersonalFormData>) => void
  updateStep3Data: (data: Partial<AdvancedFormData>) => void
  addUploadedFile: (file: File) => void
  removeUploadedFile: (index: number) => void
  clearUploadedFiles: () => void
  resetForm: () => void
  getFormData: () => {
    step1: Partial<AccountFormData>
    step2: Partial<PersonalFormData>
    step3: Partial<AdvancedFormData>
    uploadedFiles: File[]
  }
}

export type FormStore = FormState & FormActions
