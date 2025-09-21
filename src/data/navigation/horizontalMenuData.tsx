// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'داشبورد',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'فرم چند مرحله‌ای',
    href: '/about',
    icon: 'ri-information-line'
  }
]

export default horizontalMenuData
