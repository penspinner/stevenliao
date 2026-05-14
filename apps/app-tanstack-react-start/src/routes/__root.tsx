import ProgressBar from '@badrap/bar-of-progress'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router'
import type { ColorScheme } from 'personal-site'
import { Document, RootErrorBoundary, RootNotFound, isColorScheme } from 'personal-site'
import { Layout as PageLayout } from 'personal-site/client'
import * as React from 'react'

import { getColorScheme, updateColorScheme } from './-color-scheme'

import fontCSSHref from '../font.css?url'
import tailwindCSSHref from '../tailwind.css?url'

const fontURL =
  'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2'

const progress = new ProgressBar()

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'preload',
        href: fontURL,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: tailwindCSSHref },
      { rel: 'stylesheet', href: fontCSSHref },
    ],
    meta: [
      { charSet: 'utf8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    ],
  }),
  loader: async () => {
    const colorScheme = await getColorScheme()
    return { colorScheme }
  },
  component: Root,
  errorComponent: RootError,
})

function Root() {
  const router = useRouter()
  const { colorScheme } = Route.useLoaderData()
  const { pathname } = router.state.location
  const [optimisticColorScheme, setOptimisticColorScheme] = React.useState<ColorScheme | null>(null)

  const effectiveColorScheme = optimisticColorScheme ?? colorScheme

  React.useEffect(() => {
    if (router.state.isLoading) {
      progress.start()
    } else {
      progress.finish()
    }
  }, [router.state.isLoading])

  return (
    <Document
      colorScheme={effectiveColorScheme}
      head={<HeadContent />}
      body={
        <>
          <PageLayout
            avatarImg={<img src="/images/shared/logo.png" alt="" />}
            colorScheme={effectiveColorScheme}
            colorSchemeToggleRender={({ children }) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  const form = event.currentTarget
                  const formData = new FormData(form, event.nativeEvent.submitter)
                  const newColorScheme = formData.get('colorScheme')
                  if (!isColorScheme(newColorScheme)) {
                    throw new Error(`Invalid color scheme: ${JSON.stringify(newColorScheme)}`)
                  }
                  setOptimisticColorScheme(newColorScheme)
                  void updateColorScheme({ data: newColorScheme })
                }}
              >
                {children}
              </form>
            )}
            currentPathname={pathname}
            linkRender={({ href, ...props }) => (
              <Link preload="intent" to={href ?? ''} {...props} />
            )}
          >
            <Outlet />
          </PageLayout>
          <Scripts />
        </>
      }
    />
  )
}

function RootError({ error }: { error: unknown }) {
  const router = useRouter()
  const { pathname } = router.state.location
  const is404 =
    typeof error === 'object' && error !== null && 'status' in error && error.status === 404

  const errorContent = is404 ? <RootNotFound /> : <RootErrorBoundary thrown={error} />

  return (
    <Document
      colorScheme="system"
      body={
        <PageLayout
          avatarImg={<img src="/images/shared/logo.png" alt="" />}
          colorScheme="system"
          currentPathname={pathname}
          linkRender={({ href, ...props }) => <Link preload="intent" to={href ?? ''} {...props} />}
        >
          <main className="relative">{errorContent}</main>
        </PageLayout>
      }
    />
  )
}
