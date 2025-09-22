import { create } from 'zustand'

import { persist } from 'zustand/middleware'

import type { AccountFormData, FormStore, PersonalFormData, AdvancedFormData } from '@/types/formTypes'

// File metadata interface for persistence
interface FileMetadata {
  name: string
  size: number
  type: string
  lastModified: number
  dataUrl: string // Base64 encoded file data
}

const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      step1Data: {},
      step2Data: {},
      step3Data: {},
      uploadedFiles: [],
      persistedFiles: [], // Store file metadata for persistence

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

      addUploadedFile: async (file: File) => {
        // Convert file to base64 for persistence
        const dataUrl = await new Promise<string>(resolve => {
          const reader = new FileReader()

          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })

        const fileMetadata: FileMetadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          dataUrl
        }

        set(state => ({
          uploadedFiles: [...state.uploadedFiles, file],
          persistedFiles: [...state.persistedFiles, fileMetadata]
        }))
      },

      removeUploadedFile: (index: number) =>
        set(state => ({
          uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index),
          persistedFiles: state.persistedFiles.filter((_, i) => i !== index)
        })),

      clearUploadedFiles: () => set({ uploadedFiles: [], persistedFiles: [] }),

      // Convert persisted files back to File objects
      restoreFiles: () => {
        const state = get()

        const restoredFiles = state.persistedFiles.map(metadata => {
          // Convert base64 back to blob
          const byteCharacters = atob(metadata.dataUrl.split(',')[1])
          const byteNumbers = new Array(byteCharacters.length)

          for (let i = 0; i < byteCharacters.length; i += 1) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
          }

          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: metadata.type })

          // Create File object
          return new File([blob], metadata.name, {
            type: metadata.type,
            lastModified: metadata.lastModified
          })
        })

        set({ uploadedFiles: restoredFiles })
      },

      resetForm: () =>
        set({
          currentStep: 0,
          step1Data: {},
          step2Data: {},
          step3Data: {},
          uploadedFiles: [],
          persistedFiles: []
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
        currentStep: state.currentStep,
        persistedFiles: state.persistedFiles
      })
    }
  )
)

export default useFormStore
