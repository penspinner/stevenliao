import { getLocalTimeZone, today } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { DatePicker } from './date-picker'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Pick a date',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pick a date')).toBeVisible()
  },
}

export const WithValue: Story = {
  args: {
    label: 'Event date',
    defaultValue: today(getLocalTimeZone()),
  },
}
