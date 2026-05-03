import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { IndeterminateProgress } from './indeterminate-progress'

const meta = {
  component: IndeterminateProgress,
} satisfies Meta<typeof IndeterminateProgress>

export default meta

export const Default: StoryObj = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toBeVisible()
  },
}
