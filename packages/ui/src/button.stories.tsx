import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Button } from './button'

const meta = {
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const Loading: Story = {
  args: {
    isPending: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
  },
}
