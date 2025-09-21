import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormStore } from '@/types/formTypes'

const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      step1Data: {},
      step2Data: {},
      step3Data: {},
      uploadedFiles: [],

      // Actions
      setCurrentStep: (step: number) => set({ currentStep: step }),

      updateStep1Data: (data: Partial<AccountFormData>) =>
        set(state => ({
          step1Data: { ...state.step1Data, ...data }
        })),

      updateStep2Data: (data: Partial<PersonalFormData>) =>
        set(state => ({
          step2Data: { ...state.step2Data, ...data }
        })),

      updateStep3Data: (data: Partial<AdvancedFormData>) =>
        set(state => ({
          step3Data: { ...state.step3Data, ...data }
        })),

      addUploadedFile: (file: File) =>
        set(state => ({
          uploadedFiles: [...state.uploadedFiles, file]
        })),

      removeUploadedFile: (index: number) =>
        set(state => ({
          uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index)
        })),

      clearUploadedFiles: () => set({ uploadedFiles: [] }),

      resetForm: () =>
        set({
          currentStep: 0,
          step1Data: {},
          step2Data: {},
          step3Data: {},
          uploadedFiles: []
        }),

      getFormData: () => {
        const state = get()
        return {
          step1: state.step1Data,
          step2: state.step2Data,
          step3: state.step3Data,
          uploadedFiles: state.uploadedFiles
        }
      }
    }),
    {
      name: 'multi-step-form-storage',
      partialize: state => ({
        step1Data: state.step1Data,
        step2Data: state.step2Data,
        step3Data: state.step3Data,
        currentStep: state.currentStep
        // Note: uploadedFiles are not persisted as File objects can't be serialized
      })
    }
  )
)

export default useFormStore
