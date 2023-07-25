import type { V2_MetaFunction } from '@vercel/remix'
import { Projects, projectsDescription, projectsTitle } from 'personal-site'

export const meta: V2_MetaFunction = () => {
  return [{ title: projectsTitle }, { name: 'description', content: projectsDescription }]
}

const ProjectsPage = () => {
  return (
    <Projects
      projects={[
        {
          name: 'Steven Liao',
          description: 'This website',
          link: { href: 'https://github.com/penspinner/stevenliao', label: 'Steven Liao' },
          logo: '/images/logo.png',
        },
        {
          name: 'Advent of Code',
          description: 'My solutions to a bunch of Advent of Code programming puzzles',
          link: {
            href: 'https://github.com/penspinner/aoc',
            label: 'github.com/penspinner/aoc',
          },
          logo: 'https://adventofcode.com/favicon.png',
        },
        {
          name: 'Algorithms',
          description:
            'My solutions to a bunch of algorithmic challenges gathered from LeetCode and personal experiences',
          link: {
            href: 'https://github.com/penspinner/algorithms',
            label: 'github.com/penspinner/algorithms',
          },
          logo: '/images/algorithms.png',
        },
        {
          name: 'Steven Liao (old)',
          description: 'My old personal website.',
          link: {
            href: 'https://penspinner.github.io',
            label: 'penspinner.github.io',
          },
          logo: '/images/logo.png',
        },
      ]}
    />
  )
}

export default ProjectsPage
