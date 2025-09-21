// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
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

export default verticalMenuData
