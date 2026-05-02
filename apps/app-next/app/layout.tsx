import { cookies } from 'next/headers'
import * as React from 'react'

import { RootLayoutComponent } from './layout-component'

import './tailwind.css'
import 'focus-visible'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const colorScheme = (await cookies()).get('color-scheme')?.value ?? 'system'
  return <RootLayoutComponent colorScheme={colorScheme}>{children}</RootLayoutComponent>
}

export default RootLayout
