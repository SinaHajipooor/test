// Custom hooks for dashboard data using React Query

import { useQuery } from '@tanstack/react-query'
import {
  dashboardApi,
  type DashboardFilters,
  type AreaChartData,
  type LineChartData,
  type BarChartData,
  type DonutChartData,
  type RadarChartData
} from '@/services/dashboardApi'

// Query keys for caching
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  areaChart: (filters?: DashboardFilters) => [...dashboardQueryKeys.all, 'areaChart', filters] as const,
  lineChart: (filters?: DashboardFilters) => [...dashboardQueryKeys.all, 'lineChart', filters] as const,
  barChart: (filters?: DashboardFilters) => [...dashboardQueryKeys.all, 'barChart', filters] as const,
  donutChart: (filters?: DashboardFilters) => [...dashboardQueryKeys.all, 'donutChart', filters] as const,
  radarChart: (filters?: DashboardFilters) => [...dashboardQueryKeys.all, 'radarChart', filters] as const,
  filterOptions: () => [...dashboardQueryKeys.all, 'filterOptions'] as const
}

// Area Chart Hook
export const useAreaChartData = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: dashboardQueryKeys.areaChart(filters),
    queryFn: () => dashboardApi.getAreaChartData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false
  })
}

// Line Chart Hook
export const useLineChartData = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: dashboardQueryKeys.lineChart(filters),
    queryFn: () => dashboardApi.getLineChartData(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

// Bar Chart Hook
export const useBarChartData = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: dashboardQueryKeys.barChart(filters),
    queryFn: () => dashboardApi.getBarChartData(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

// Donut Chart Hook
export const useDonutChartData = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: dashboardQueryKeys.donutChart(filters),
    queryFn: () => dashboardApi.getDonutChartData(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

// Radar Chart Hook
export const useRadarChartData = (filters?: DashboardFilters) => {
  return useQuery({
    queryKey: dashboardQueryKeys.radarChart(filters),
    queryFn: () => dashboardApi.getRadarChartData(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

// Filter Options Hook
export const useFilterOptions = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.filterOptions(),
    queryFn: () => dashboardApi.getFilterOptions(),
    staleTime: 30 * 60 * 1000, // 30 minutes - filter options change less frequently
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false
  })
}

// Combined dashboard data hook for multiple charts
export const useDashboardData = (filters?: DashboardFilters) => {
  const areaChart = useAreaChartData(filters)
  const lineChart = useLineChartData(filters)
  const barChart = useBarChartData(filters)
  const donutChart = useDonutChartData(filters)
  const radarChart = useRadarChartData(filters)
  const filterOptions = useFilterOptions()

  return {
    areaChart,
    lineChart,
    barChart,
    donutChart,
    radarChart,
    filterOptions,
    isLoading:
      areaChart.isLoading || lineChart.isLoading || barChart.isLoading || donutChart.isLoading || radarChart.isLoading,
    isError: areaChart.isError || lineChart.isError || barChart.isError || donutChart.isError || radarChart.isError
  }
}
