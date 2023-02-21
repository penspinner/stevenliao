'use client'

import Image from 'next/image'
import { Projects } from 'personal-site'

export const ProjectsPageComponent = () => {
  return (
    <Projects
      projects={[
        {
          name: 'Steven Liao',
          description: 'This website',
          link: { href: 'https://github.com/penspinner/stevenliao', label: 'Steven Liao' },
          logo: 'https://stevenliao.vercel.app/images/logo.png',
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
          logo: 'https://stevenliao.vercel.app/images/algorithms.png',
        },
        {
          name: 'Steven Liao (old)',
          description: 'My old personal website.',
          link: {
            href: 'https://penspinner.github.io',
            label: 'penspinner.github.io',
          },
          logo: 'https://stevenliao.vercel.app/images/logo.png',
        },
      ]}
      projectLogoRender={(project) => <Image src={project.logo} alt="" height="32" width="32" />}
    />
  )
}
