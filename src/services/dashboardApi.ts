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
const generateDateLabels = (count: number, period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily'): string[] => {
  const labels: string[] = []
  const now = new Date()

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now)

    switch (period) {
      case 'daily':
        date.setDate(date.getDate() - i)
        labels.push(date.toLocaleDateString('fa-IR'))
        break
      case 'weekly':
        date.setDate(date.getDate() - i * 7)
        labels.push(`هفته ${i + 1}`)
        break
      case 'monthly':
        date.setMonth(date.getMonth() - i)
        labels.push(date.toLocaleDateString('fa-IR', { month: 'long' }))
        break
      case 'yearly':
        date.setFullYear(date.getFullYear() - i)
        labels.push(date.getFullYear().toString())
        break
    }
  }

  return labels.reverse()
}

// Fake API functions with simulated delay
export const dashboardApi = {
  // Area Chart Data
  getAreaChartData: async (filters?: DashboardFilters): Promise<AreaChartData> => {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API delay

    const period = filters?.period || 'daily'
    const labels = generateDateLabels(7, period)

    return {
      series: [
        {
          name: 'فروش',
          data: labels.map((label, index) => ({
            x: label,
            y: generateRandomData(1, 1000, 5000)[0]
          }))
        },
        {
          name: 'درآمد',
          data: labels.map((label, index) => ({
            x: label,
            y: generateRandomData(1, 800, 4000)[0]
          }))
        }
      ]
    }
  },

  // Line Chart Data
  getLineChartData: async (filters?: DashboardFilters): Promise<LineChartData> => {
    await new Promise(resolve => setTimeout(resolve, 250))

    const period = filters?.period || 'daily'
    const labels = generateDateLabels(12, period)

    return {
      series: [
        {
          name: 'کاربران فعال',
          data: labels.map((label, index) => ({
            x: label,
            y: generateRandomData(1, 50, 500)[0]
          }))
        },
        {
          name: 'بازدیدکنندگان',
          data: labels.map((label, index) => ({
            x: label,
            y: generateRandomData(1, 100, 1000)[0]
          }))
        },
        {
          name: 'تبدیل',
          data: labels.map((label, index) => ({
            x: label,
            y: generateRandomData(1, 10, 100)[0]
          }))
        }
      ]
    }
  },

  // Bar Chart Data
  getBarChartData: async (filters?: DashboardFilters): Promise<BarChartData> => {
    await new Promise(resolve => setTimeout(resolve, 200))

    const categories = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور']

    return {
      series: [
        {
          name: 'محصولات فروخته شده',
          data: categories.map(category => ({
            x: category,
            y: generateRandomData(1, 20, 200)[0]
          }))
        }
      ]
    }
  },

  // Donut Chart Data
  getDonutChartData: async (filters?: DashboardFilters): Promise<DonutChartData> => {
    await new Promise(resolve => setTimeout(resolve, 150))

    return {
      series: [44, 55, 13, 43, 22],
      labels: ['موبایل', 'لپ‌تاپ', 'تبلت', 'دسکتاپ', 'سایر']
    }
  },

  // Radar Chart Data
  getRadarChartData: async (filters?: DashboardFilters): Promise<RadarChartData> => {
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
