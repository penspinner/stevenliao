import Image from 'next/image'
import Head from 'next/head'

import logoAnimaginary from '~/images/logos/animaginary.svg'
import { Projects, projectsDescription, projectsTitle } from 'personal-site'

const projects = [
  {
    name: 'Steven Liao',
    description: 'Personal website',
    link: { href: 'https://github.com/penspinner/aoc', label: 'Steven Liao' },
    logo: logoAnimaginary,
  },
  {
    name: 'Advent of Code',
    description:
      'My solutions to a bunch of Advent of Code programming puzzles.',
    link: {
      href: 'https://github.com/penspinner/aoc',
      label: 'github.com/penspinner/aoc',
    },
    logo: logoAnimaginary,
  },
  {
    name: 'Steven Liao (old)',
    description: 'My old personal website.',
    link: {
      href: 'https://penspinner.github.io',
      label: 'penspinner.github.io',
    },
    logo: logoAnimaginary,
  },
  {
    name: 'cosmOS',
    description:
      'The operating system that powers our Planetaria space shuttles.',
    link: { href: '#', label: 'github.com' },
    logo: logoAnimaginary,
  },
]

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>{projectsTitle}</title>
        <meta name="description" content={projectsDescription} />
      </Head>
      <Projects
        projects={projects}
        projectLogoRender={(project) => (
          <Image src={project.logo} alt="" unoptimized />
        )}
      />
    </>
  )
}

export default ProjectsPage
