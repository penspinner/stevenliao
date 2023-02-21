'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ColorScheme, Document, Layout } from 'personal-site'
import * as React from 'react'

export const RootLayoutComponent = ({
  children,
  colorScheme,
}: React.PropsWithChildren<{ colorScheme: ColorScheme }>) => {
  const pathname = usePathname()
  return (
    <Document
      colorScheme={colorScheme}
      body={
        <Layout
          avatarImg={
            <Image
              priority
              src="https://stevenliao.vercel.app/images/logo.png"
              width="300"
              height="300"
              alt=""
            />
          }
          colorScheme={colorScheme}
          // TODO: how to best do color scheme here?
          colorSchemeToggleRender={({ children }) => (
            <form
              action="/color-scheme"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault()
                await fetch(
                  (e.target as React.FormHTMLAttributes<HTMLFormElement>).action as string,
                  {
                    method: (e.target as React.FormHTMLAttributes<HTMLFormElement>)
                      .method as string,
                  },
                )
              }}
            >
              {children}
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
