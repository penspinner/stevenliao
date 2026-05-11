import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { InputWithButtonForm } from './input-with-button-form'

const meta = {
  component: InputWithButtonForm,
  args: {
    buttonLabel: 'Search',
    Icon: MagnifyingGlassIcon,
    placeholder: 'Search...',
  },
} satisfies Meta<typeof InputWithButtonForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFormSubmit: (event) => {
      event.preventDefault()
    },
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Search...')
    const button = canvas.getByText('Search')
    await expect(input).toBeVisible()
    await expect(button).toBeVisible()
    await userEvent.type(input, 'hello')
    await expect(input).toHaveValue('hello')
  },
}
