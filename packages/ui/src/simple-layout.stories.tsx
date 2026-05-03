import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Section } from './section'
import { SimpleLayout } from './simple-layout'

const meta = {
  component: SimpleLayout,
  args: {
    title: 'Articles',
    intro: 'Thoughts on design systems, accessibility, and frontend engineering.',
  },
} satisfies Meta<typeof SimpleLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SimpleLayout title="Writing" intro="A collection of technical articles and tutorials.">
      <Section title="Recent">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Article listing goes here.</p>
      </Section>
    </SimpleLayout>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Writing')).toBeVisible()
    await expect(
      canvas.getByText('A collection of technical articles and tutorials.'),
    ).toBeVisible()
    await expect(canvas.getByText('Recent')).toBeVisible()
  },
}
