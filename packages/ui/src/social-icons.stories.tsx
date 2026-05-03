import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from './social-icons'

const meta = {
  component: GitHubIcon,
} satisfies Meta<typeof GitHubIcon>

export default meta

export const GitHub: StoryObj = {
  render: () => <GitHubIcon className="h-6 w-6" />,
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg')
    await expect(svg).toBeVisible()
  },
}

export const Twitter: StoryObj = {
  render: () => <TwitterIcon className="h-6 w-6" />,
}

export const Instagram: StoryObj = {
  render: () => <InstagramIcon className="h-6 w-6" />,
}

export const LinkedIn: StoryObj = {
  render: () => <LinkedInIcon className="h-6 w-6" />,
}
