// Dashboard API Services - Fake data generators

// Types for dashboard data
export interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
}

export interface AreaChartData {
  series: Array<{
    name: string
    data: ChartDataPoint[]
  }>
}

export interface LineChartData {
  series: Array<{
    name: string
    data: ChartDataPoint[]
  }>
}

export interface BarChartData {
  series: Array<{
    name: string
    data: ChartDataPoint[]
  }>
}

export interface DonutChartData {
  series: number[]
  labels: string[]
}

export interface RadarChartData {
  series: Array<{
    name: string
    data: number[]
  }>
  categories: string[]
}

export interface DashboardFilters {
  dateRange?: {
    start: string
    end: string
  }
  category?: string
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Utility function to generate random data
const generateRandomData = (count: number, min: number = 0, max: number = 100): number[] => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

// Utility function to generate date labels
const generateDateLabels = (
  count: number,
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily',
  dateRange?: { start: string; end: string }
): string[] => {
  const labels: string[] = []

  let startDate: Date
  let endDate: Date

  if (dateRange) {
    startDate = new Date(dateRange.start)
    endDate = new Date(dateRange.end)
  } else {
    endDate = new Date()
    startDate = new Date()
    startDate.setDate(startDate.getDate() - count + 1)
  }

  const timeDiff = endDate.getTime() - startDate.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate)
    const step = Math.floor((daysDiff / (count - 1)) * i)

    switch (period) {
      case 'daily':
        date.setDate(date.getDate() + step)
        labels.push(date.toLocaleDateString('fa-IR'))
        break
      case 'weekly':
        date.setDate(date.getDate() + step * 7)
        labels.push(`هفته ${i + 1}`)
        break
      case 'monthly':
        date.setMonth(date.getMonth() + step)
        labels.push(date.toLocaleDateString('fa-IR', { month: 'long' }))
        break
      case 'yearly':
        date.setFullYear(date.getFullYear() + step)
        labels.push(date.getFullYear().toString())
        break
    }
  }

  return labels
}

// Fake API functions with simulated delay
export const dashboardApi = {
  // Area Chart Data
  getAreaChartData: async (filters?: DashboardFilters): Promise<AreaChartData> => {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay

    const period = filters?.period || 'daily'
    const labels = generateDateLabels(7, period, filters?.dateRange)

    // Apply category filtering
    const category = filters?.category || 'همه'
    const baseMultiplier = category === 'همه' ? 1 : 0.7 + Math.random() * 0.6 // Vary data based on category

    return {
      series: [
        {
          name: 'بازدیدها',
          data: labels.map(label => ({
            x: label,
            y: Math.floor(generateRandomData(1, 100, 500)[0] * baseMultiplier)
          }))
        },
        {
          name: 'کلیک‌ها',
          data: labels.map(label => ({
            x: label,
            y: Math.floor(generateRandomData(1, 60, 300)[0] * baseMultiplier)
          }))
        },
        {
          name: 'فروش',
          data: labels.map(label => ({
            x: label,
            y: Math.floor(generateRandomData(1, 20, 200)[0] * baseMultiplier)
          }))
        }
      ]
    }
  },

  // Line Chart Data
  getLineChartData: async (filters?: DashboardFilters): Promise<LineChartData> => {
    await new Promise(resolve => setTimeout(resolve, 250))

    const period = filters?.period || 'daily'
    const labels = generateDateLabels(15, period, filters?.dateRange)

    return {
      series: [
        {
          name: 'درصد پیشرفت فروش',
          data: labels.map(label => ({
            x: label,
            y: generateRandomData(1, 20, 100)[0]
          }))
        }
      ]
    }
  },

  // Bar Chart Data
  getBarChartData: async (filters?: DashboardFilters): Promise<BarChartData> => {
    await new Promise(resolve => setTimeout(resolve, 200))

    const period = filters?.period || 'daily'
    const labels = generateDateLabels(10, period, filters?.dateRange)

    return {
      series: [
        {
          name: 'Apple',
          data: labels.map(label => ({
            x: label,
            y: generateRandomData(1, 30, 200)[0]
          }))
        },
        {
          name: 'Samsung',
          data: labels.map(label => ({
            x: label,
            y: generateRandomData(1, 40, 250)[0]
          }))
        },
        {
          name: 'Oneplus',
          data: labels.map(label => ({
            x: label,
            y: generateRandomData(1, 20, 180)[0]
          }))
        },
        {
          name: 'Motorola',
          data: labels.map(label => ({
            x: label,
            y: generateRandomData(1, 50, 300)[0]
          }))
        }
      ]
    }
  },

  // Donut Chart Data
  getDonutChartData: async (): Promise<DonutChartData> => {
    await new Promise(resolve => setTimeout(resolve, 150))

    return {
      series: [44, 55, 13, 43, 22],
      labels: ['موبایل', 'لپ‌تاپ', 'تبلت', 'دسکتاپ', 'سایر']
    }
  },

  // Radar Chart Data
  getRadarChartData: async (): Promise<RadarChartData> => {
    await new Promise(resolve => setTimeout(resolve, 180))

    return {
      series: [
        {
          name: 'عملکرد',
          data: [80, 90, 70, 85, 75, 95]
        }
      ],
      categories: ['سرعت', 'امنیت', 'قابلیت اطمینان', 'پشتیبانی', 'قیمت', 'کیفیت']
    }
  },

  // Get available filter options
  getFilterOptions: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))

    return {
      categories: ['همه', 'الکترونیک', 'پوشاک', 'کتاب', 'ورزش', 'خانه'],
      periods: [
        { value: 'daily', label: 'روزانه' },
        { value: 'weekly', label: 'هفتگی' },
        { value: 'monthly', label: 'ماهانه' },
        { value: 'yearly', label: 'سالانه' }
      ]
    }
  }
}
