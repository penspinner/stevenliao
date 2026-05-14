'use client'

import Image from 'next/image'
import type { Article } from 'personal-site'
import { Index } from 'personal-site'

export const IndexPageComponent = ({ articles }: { articles: Article[] }) => {
  return (
    <Index
      articles={articles}
      photos={[
        { src: '/images/shared/algorithms.png' },
        { src: '/images/shared/computer-hackermans.png' },
      ]}
      photoRender={(photo) => (
        <Image src={photo.src} height="176" width="288" alt={photo.alt ?? ''} priority />
      )}
      roles={[
        {
          company: 'Roofstock',
          title: 'Senior Software Engineer',
          logo: '/images/logos/roofstock.jpeg',
          start: 'Oct 2024',
          end: 'Present',
        },
        {
          company: 'Sysarro',
          title: 'Software Engineer (Contract)',
          logo: '/images/logos/sysarro.svg',
          start: 'Feb 2024',
          end: 'Oct 2024',
        },
        {
          company: 'Civil Street',
          title: 'Lead Full Stack Engineer',
          logo: '/images/logos/civil-street.jpeg',
          start: 'Jan 2023',
          end: 'Present',
        },
        {
          company: 'Roofstock',
          title: 'Software Engineer',
          logo: '/images/logos/roofstock.jpeg',
          start: 'May 2022',
          end: 'Oct 2022',
        },
        {
          company: 'Great Jones',
          title: 'Software Engineer',
          logo: '/images/logos/great-jones.jpeg',
          start: 'Mar 2020',
          end: 'May 2022',
        },
        {
          company: 'Percolate/Seismic',
          title: 'Fullstack Developer',
          logo: '/images/logos/percolate.jpeg',
          start: 'Oct 2018',
          end: 'Mar 2020',
        },
        {
          company: 'MANA Partners/Tech',
          title: 'Fullstack Developer',
          logo: '/images/logos/mana-partners.jpeg',
          start: 'Jan 2017',
          end: 'Oct 2018',
        },
      ]}
      roleRender={(role) => <Image src={role.logo} alt="" />}
    />
  )
}
