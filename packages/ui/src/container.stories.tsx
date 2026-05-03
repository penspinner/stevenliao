import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Container } from './container'

const meta = {
  component: Container,
} satisfies Meta<typeof Container>

export default meta

export const Default: StoryObj = {
  render: () => (
    <Container className="border-2 border-dashed border-sky-300 bg-sky-50/50">
      <p>Container content goes here.</p>
    </Container>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Container content goes here.')).toBeVisible()
  },
}

export const MultipleChildren: StoryObj = {
  render: () => (
    <Container className="border-2 border-dashed border-sky-300 bg-sky-50/50">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Section Title</h2>
        <p>First paragraph of content.</p>
        <p>Second paragraph of content.</p>
      </div>
    </Container>
  ),
}
