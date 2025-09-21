'use client'

// React Imports
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Component Imports
import type { ChildrenType } from '@core/types'

interface QueryProviderProps extends ChildrenType {}

const QueryProvider = ({ children }: QueryProviderProps) => {
  // Create a new QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time in milliseconds that data remains fresh
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Time in milliseconds that unused/inactive cache data remains in memory
            gcTime: 10 * 60 * 1000, // 10 minutes
            // Retry failed requests
            retry: 1,

            // Don't refetch on window focus by default
            refetchOnWindowFocus: false,

            // Don't refetch on reconnect by default
            refetchOnReconnect: false
          },
          mutations: {
            // Retry failed mutations
            retry: 1
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
    </QueryClientProvider>
  )
}

export default QueryProvider
