import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Card } from './card'

const meta = {
  component: Card,
} satisfies Meta<typeof Card>

export default meta

export const Default: StoryObj = {
  render: () => (
    <Card>
      <Card.Title href="#">Building an accessible component library</Card.Title>
      <Card.Description>
        Learn how to create reusable, accessible UI components using React Aria Components and
        Tailwind CSS.
      </Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Building an accessible component library')).toBeVisible()
    await expect(canvas.getByText(/reusable, accessible/)).toBeVisible()
    await expect(canvas.getByText('Read article')).toBeVisible()
  },
}

export const WithEyebrow: StoryObj = {
  render: () => (
    <Card>
      <Card.Title as="h3">Understanding state machines</Card.Title>
      <Card.Eyebrow decorate>Engineering</Card.Eyebrow>
      <Card.Description>
        State machines are a powerful pattern for managing complex UI state in React applications.
      </Card.Description>
      <Card.Cta>Read more</Card.Cta>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Engineering')).toBeVisible()
    await expect(canvas.getByText('Understanding state machines')).toBeVisible()
  },
}

export const WithoutLink: StoryObj = {
  render: () => (
    <Card>
      <Card.Title>Static card</Card.Title>
      <Card.Description>
        This card has no link — the title renders as a plain heading.
      </Card.Description>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Static card')).toBeVisible()
  },
}
