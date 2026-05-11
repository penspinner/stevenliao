/// <reference types="./types.d.ts" />
import type { Preview } from '@storybook/react-vite'
import { clsx } from 'clsx'
import { useEffect } from 'react'

import './tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/u,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        document.documentElement.classList.add('h-full')
      }, [])

      return (
        <div className={clsx('h-full', context.globals.theme === 'dark' && 'dark')}>
          <div className="h-full bg-zinc-50 dark:bg-black">
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview
