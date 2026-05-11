import { clsx } from 'clsx'
import * as React from 'react'

import type { ColorScheme } from './types'

export const Document = ({
  colorScheme,
  className,
  dir,
  head,
  lang = 'en',
  body,
}: React.PropsWithChildren<{
  colorScheme: ColorScheme
  className?: string
  dir?: 'ltr' | 'rtl'
  head?: React.ReactElement
  lang?: string
  body: React.ReactElement
}>) => {
  return (
    <html
      className={clsx('h-full antialiased', className)}
      dir={dir}
      lang={lang}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript colorScheme={colorScheme} />
        {head}
      </head>
      <body className="h-full bg-zinc-50 dark:bg-black">{body}</body>
    </html>
  )
}

const addOrRemoveColorScheme = (media: MediaQueryList | MediaQueryListEvent) => {
  document.documentElement.classList.toggle('dark', media.matches)
}

const ColorSchemeScript = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  if (typeof document !== 'undefined') {
    // oxlint-disable-next-line react-hooks/rules-of-hooks
    React.useLayoutEffect(() => {
      if (colorScheme === 'light') {
        document.documentElement.classList.remove('dark')
      } else if (colorScheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        const media = globalThis.matchMedia('(prefers-color-scheme: dark)')
        addOrRemoveColorScheme(media)

        media.addEventListener('change', addOrRemoveColorScheme)
        return () => {
          media.removeEventListener('change', addOrRemoveColorScheme)
        }
      }
    }, [colorScheme])
  }

  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
  const colorScheme = ${JSON.stringify(colorScheme)};
  if (colorScheme === "system") {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    if (media.matches) document.documentElement.classList.add("dark");
  }
`,
      }}
    />
  )
}
