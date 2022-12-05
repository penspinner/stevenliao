import { json, LinksFunction, LoaderArgs, V2_MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from '@remix-run/react'
import NProgress from 'nprogress'
import nProgressCSSHref from 'nprogress/nprogress.css'
import { Document as Doc, Layout, RootErrorBoundary, RootNotFound } from 'personal-site'
import type { ColorScheme } from 'personal-site'
import * as React from 'react'

import tailwindCSSHref from '~/css/tailwind.css'
import { parseColorScheme } from '~/modules/color-scheme'

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
    { rel: 'stylesheet', href: tailwindCSSHref },
    { rel: 'stylesheet', href: nProgressCSSHref },
  ]
}

export const meta: V2_MetaFunction = () => {
  return [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1' }]
}

export const loader = async ({ request }: LoaderArgs) => {
  const colorScheme = await parseColorScheme(request)
  return json({ colorScheme })
}

const Root = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const { colorScheme, ColorSchemeForm } = useColorSchemeFetcher()

  React.useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 200 })
  }, [])
  React.useEffect(() => {
    if (navigation.state === 'idle') {
      NProgress.done()
    } else {
      NProgress.start()
    }
  }, [navigation.state])

  return (
    <Document colorScheme={colorScheme}>
      <Layout
        avatarImg={<img src="/images/logo.png" alt="" />}
        colorScheme={colorScheme}
        colorSchemeToggleRender={({ children }) => <ColorSchemeForm>{children}</ColorSchemeForm>}
        currentPathname={location.pathname}
        linkRender={({ href, ...props }) => <Link prefetch="intent" to={href ?? ''} {...props} />}
      >
        <Outlet />
      </Layout>
    </Document>
  )
}

export default Root

export const ErrorBoundary = () => {
  const routeError = useRouteError()
  const location = useLocation()
  const errorContent = (() => {
    if (isRouteErrorResponse(routeError)) {
      switch (routeError.status) {
        case 404: {
          return <RootNotFound />
        }
      }
    }

    return <RootErrorBoundary thrown={routeError} />
  })()
  return (
    <Document colorScheme="system">
      <Layout
        avatarImg={<img src="/images/logo.png" alt="" />}
        colorScheme="system"
        currentPathname={location.pathname}
        linkRender={({ href, ...props }) => <Link prefetch="intent" to={href ?? ''} {...props} />}
      >
        <main className="relative">{errorContent}</main>
      </Layout>
    </Document>
  )
}

const Document = ({
  children,
  colorScheme,
}: {
  children: React.ReactNode
  colorScheme: ColorScheme
}) => {
  return (
    <Doc
      colorScheme={colorScheme}
      head={
        <>
          <Meta />
          <Links />
        </>
      }
      body={
        <>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </>
      }
    />
  )
}

const useColorSchemeFetcher = () => {
  const loaderData = useLoaderData<typeof loader>()
  const colorSchemeFetcher = useFetcher()
  const formData = colorSchemeFetcher.submission?.formData
  const optimisticColorScheme = formData?.has('colorScheme')
    ? (formData.get('colorScheme') as ColorScheme)
    : null
  const ColorSchemeForm = React.useCallback(
    (props: Omit<React.ComponentProps<typeof colorSchemeFetcher.Form>, 'action' | 'method'>) => (
      <colorSchemeFetcher.Form {...props} action="/color-scheme" method="post" />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorSchemeFetcher.Form],
  )
  return { colorScheme: optimisticColorScheme || loaderData.colorScheme, ColorSchemeForm }
}
