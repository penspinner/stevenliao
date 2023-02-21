import { cookies } from 'next/headers'
import * as React from 'react'

import { RootLayoutComponent } from './layout-component'
import 'personal-site/tailwind.css'
import 'focus-visible'

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
}

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const colorScheme = cookies().get('color-scheme')?.value ?? 'system'
  return <RootLayoutComponent colorScheme={colorScheme}>{children}</RootLayoutComponent>
}

export default RootLayout
