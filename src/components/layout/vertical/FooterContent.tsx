'use client'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks

  return (
    <div className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-center')}>
      <p className='text-sm text-center'>تمامی حقوق متعلق به سامانه آزمایشی می‌باشد</p>
    </div>
  )
}

export default FooterContent
