'use client'

// React Imports
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

// Type Imports
import type { DashboardFilters } from '@/services/dashboardApi'

interface DashboardContextType {
  filters: DashboardFilters
  updateFilters: (newFilters: Partial<DashboardFilters>) => void
  resetFilters: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

interface DashboardProviderProps {
  children: ReactNode
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [filters, setFilters] = useState<DashboardFilters>({
    period: 'daily',
    category: 'همه'
  })

  const updateFilters = useCallback((newFilters: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      period: 'daily',
      category: 'همه'
    })
  }, [])

  return (
    <DashboardContext.Provider value={{ filters, updateFilters, resetFilters }}>{children}</DashboardContext.Provider>
  )
}

export const useDashboardFilters = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboardFilters must be used within a DashboardProvider')
  }
  return context
}
