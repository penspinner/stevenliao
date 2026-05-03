import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { Button } from './button'
import { ToastViewport, toastQueue } from './toast'

const meta = {
  component: ToastViewport,
} satisfies Meta<typeof ToastViewport>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <div className="flex gap-2">
        <Button
          onPress={() =>
            toastQueue.add({ description: 'Operation completed successfully.', type: 'success' })
          }
        >
          Show Success Toast
        </Button>
        <Button
          onPress={() => toastQueue.add({ description: 'Something went wrong.', type: 'error' })}
        >
          Show Error Toast
        </Button>
      </div>
      <ToastViewport />
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
