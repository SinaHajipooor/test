import NextTopLoader from 'nextjs-toploader';

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
    title: 'Vuexy - MUI Next.js Admin Dashboard Template',
    description:
        'Vuexy - MUI Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

const RootLayout = ({ children }: ChildrenType) => {
    // Vars
    const direction = 'ltr'

    return (
        <html id='__next' lang='en' dir={direction}>
            <NextTopLoader
                color="#7367F0"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #7468ff,0 0 5px #7367f0"
            />
            <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
        </html>
    )
}

export default RootLayout
