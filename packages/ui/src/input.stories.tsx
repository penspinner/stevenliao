import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { FieldInput, type FieldInputProps } from './input'

const meta = {
  component: FieldInput,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  } satisfies Partial<FieldInputProps>,
} satisfies Meta<typeof FieldInput>

export default meta

export const Default: StoryObj = {
  args: {},
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email')
    await expect(input).toBeVisible()
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
  },
}

export const WithDescription: StoryObj = {
  args: {
    description: 'We will never share your email.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('We will never share your email.')).toBeVisible()
  },
}

export const WithError: StoryObj = {
  args: {
    error: 'Please enter a valid email address.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Please enter a valid email address.')).toBeVisible()
  },
}

export const Disabled: StoryObj = {
  args: {
    disabled: true,
    defaultValue: 'user@example.com',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeDisabled()
  },
}
