import { cookies } from 'next/headers'
import { isColorScheme } from 'personal-site'
import * as React from 'react'

import { RootLayoutComponent } from './layout-component'

import './tailwind.css'
import 'focus-visible'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const rawCookie = (await cookies()).get('color-scheme')?.value
  const colorScheme = isColorScheme(rawCookie) ? rawCookie : 'system'
  return <RootLayoutComponent colorScheme={colorScheme}>{children}</RootLayoutComponent>
}

export default RootLayout
