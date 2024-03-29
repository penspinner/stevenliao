import clsx from 'clsx'
import * as React from 'react'

import type { ColorScheme } from '~/types'

export const Document = ({
  colorScheme,
  className,
  head,
  body,
}: React.PropsWithChildren<{
  colorScheme: ColorScheme
  className?: string
  head?: React.ReactElement
  body: React.ReactElement
}>) => {
  return (
    <html className={clsx('h-full antialiased', className)} lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript colorScheme={colorScheme} />
        {head}
      </head>
      <body className="h-full bg-zinc-50 dark:bg-black">{body}</body>
    </html>
  )
}

const ColorSchemeScript = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  if (typeof document !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useLayoutEffect(() => {
      if (colorScheme === 'light') {
        document.documentElement.classList.remove('dark')
      } else if (colorScheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (colorScheme === 'system') {
        const check = (media: MediaQueryList) => {
          if (media.matches) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }

        const media = window.matchMedia('(prefers-color-scheme: dark)')
        check(media)

        // @ts-expect-error I can't figure out what TypeScript wants here ...
        media.addEventListener('change', check)
        // @ts-expect-error I can't figure out what TypeScript wants here ...
        return () => media.removeEventListener('change', check)
      } else {
        console.error('Impossible color scheme state:', colorScheme)
      }
    }, [colorScheme])
  }

  return (
    <script
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
