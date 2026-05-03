import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Section } from './section'

const meta = {
  component: Section,
  args: {
    title: 'About',
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Section title="Work Experience">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Senior Engineer at Acme Inc. — building design systems and tooling.
      </p>
    </Section>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Work Experience')).toBeVisible()
    await expect(canvas.getByText(/Senior Engineer/)).toBeVisible()
  },
}

export const MultipleParagraphs: Story = {
  render: () => (
    <Section title="Education">
      <div className="space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          B.S. Computer Science — University of Tech
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          M.S. Human-Computer Interaction — Design Institute
        </p>
      </div>
    </Section>
  ),
}
