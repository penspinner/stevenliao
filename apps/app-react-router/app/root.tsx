import ProgressBar from '@badrap/bar-of-progress'
import { Document as Doc, RootErrorBoundary, RootNotFound, isColorScheme } from 'personal-site'
import type { ColorScheme } from 'personal-site'
import { Layout as PageLayout } from 'personal-site/client'
import * as React from 'react'
import { useLocale } from 'react-aria-components'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from 'react-router'

import { parseColorScheme } from '#modules/color-scheme'

import type { Route } from './+types/root'

import fontCSSHref from '#css/font.css?url'
import tailwindCSSHref from '#css/tailwind.css?url'

export const links: Route.LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'preload',
      href: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    { rel: 'stylesheet', href: fontCSSHref },
    { rel: 'stylesheet', href: tailwindCSSHref },
  ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const colorScheme = await parseColorScheme(request)
  return { colorScheme }
}

const progress = new ProgressBar()

const Root = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const { colorScheme, ColorSchemeForm } = useColorSchemeFetcher()

  React.useEffect(() => {
    if (navigation.state === 'idle') {
      progress.finish()
    } else {
      progress.start()
    }
  }, [navigation.state])

  return (
    <Document colorScheme={colorScheme}>
      <PageLayout
        avatarImg={<img src="/images/shared/logo.png" alt="" />}
        colorScheme={colorScheme}
        colorSchemeToggleRender={({ children }) => <ColorSchemeForm>{children}</ColorSchemeForm>}
        currentPathname={location.pathname}
        linkRender={({ href, ...props }) => <Link prefetch="intent" to={href ?? ''} {...props} />}
      >
        <Outlet />
      </PageLayout>
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
        default: {
          return <RootErrorBoundary thrown={routeError} />
        }
      }
    }

    return <RootErrorBoundary thrown={routeError} />
  })()
  return (
    <Document colorScheme="system">
      <PageLayout
        avatarImg={<img src="/images/shared/logo.png" alt="" />}
        colorScheme="system"
        currentPathname={location.pathname}
        linkRender={({ href, ...props }) => <Link prefetch="intent" to={href ?? ''} {...props} />}
      >
        <main className="relative">{errorContent}</main>
      </PageLayout>
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
  const { locale, direction } = useLocale()
  return (
    <Doc
      colorScheme={colorScheme}
      dir={direction}
      lang={locale}
      head={
        <>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </>
      }
      body={
        <>
          {children}
          <ScrollRestoration />
          <Scripts />
        </>
      }
    />
  )
}

const useColorSchemeFetcher = () => {
  const loaderData = useLoaderData<typeof loader>()
  const colorSchemeFetcher = useFetcher()
  const formDataColorScheme = colorSchemeFetcher.formData?.get('colorScheme')
  const optimisticColorScheme = isColorScheme(formDataColorScheme) ? formDataColorScheme : null
  const ColorSchemeForm = React.useCallback(
    (props: Omit<React.ComponentProps<typeof colorSchemeFetcher.Form>, 'action' | 'method'>) => (
      <colorSchemeFetcher.Form {...props} action="/color-scheme" method="POST" />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorSchemeFetcher.Form],
  )
  return { colorScheme: optimisticColorScheme ?? loaderData.colorScheme, ColorSchemeForm }
}
