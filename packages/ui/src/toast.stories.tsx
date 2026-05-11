import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { Button } from './button'
import { ToastProvider, toast } from './toast'

const meta = {
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        <Button
          onPress={() => {
            toast.success('Operation completed successfully.')
          }}
        >
          Show Success Toast
        </Button>
        <Button
          onPress={() => {
            toast.danger('Something went wrong.')
          }}
        >
          Show Error Toast
        </Button>
      </div>
      <ToastProvider />
    </>
  ),
  play: async ({ canvas }) => {
    const successBtn = canvas.getByText('Show Success Toast')
    const errorBtn = canvas.getByText('Show Error Toast')

    await userEvent.click(successBtn)
    await expect(canvas.getByText('Operation completed successfully.')).toBeVisible()

    await userEvent.click(errorBtn)
    await expect(canvas.getByText('Something went wrong.')).toBeVisible()
  },
}
