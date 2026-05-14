'use client'

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ColorScheme } from 'personal-site'
import { Document } from 'personal-site'
import { Layout } from 'personal-site/client'
import * as React from 'react'

// oxlint-disable-next-line new-cap
const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const RootLayoutComponent = ({
  children,
  colorScheme,
}: React.PropsWithChildren<{ colorScheme: ColorScheme }>) => {
  const pathname = usePathname()
  return (
    <Document
      colorScheme={colorScheme}
      className={inter.className}
      body={
        <Layout
          avatarImg={
            <Image priority src="/images/shared/logo.png" width="300" height="300" alt="" />
          }
          colorScheme={colorScheme}
          colorSchemeToggleRender={({ children: colorSchemeChildren }) => (
            <form
              action="/color-scheme"
              method="POST"
              onSubmit={(event) => {
                event.preventDefault()
                const form = event.currentTarget
                void fetch(form.action, { method: form.method })
              }}
            >
              {colorSchemeChildren}
            </form>
          )}
          currentPathname={pathname}
          linkRender={({ href, ...props }) => <Link href={href ?? ''} {...props} />}
        >
          {children}
        </Layout>
      }
    />
  )
}
