'use client'

import Image from 'next/image'
import type { Article } from 'personal-site'
import { Index } from 'personal-site'

export const IndexPageComponent = ({ articles }: { articles: Article[] }) => {
  return (
    <Index
      articles={articles}
      photos={[
        { src: 'https://stevenliao.vercel.app/images/algorithms.png' },
        { src: 'https://stevenliao.vercel.app/images/computer-hackermans.png' },
      ]}
      photoRender={(photo) => (
        <Image src={photo.src} height="176" width="288" alt={photo.alt ?? ''} priority />
      )}
      roles={[
        {
          company: 'Roofstock',
          title: 'Software Engineer',
          logo: 'https://stevenliao.vercel.app/images/logos/roofstock.jpeg',
          start: 'May 2022',
          end: 'Oct 2022',
        },
        {
          company: 'Great Jones',
          title: 'Software Engineer',
          logo: 'https://stevenliao.vercel.app/images/logos/great-jones.jpeg',
          start: 'Mar 2020',
          end: 'May 2022',
        },
        {
          company: 'Percolate/Seismic',
          title: 'Fullstack Developer',
          logo: 'https://stevenliao.vercel.app/images/logos/percolate.jpeg',
          start: 'Oct 2018',
          end: 'Mar 2020',
        },
        {
          company: 'MANA Partners/Tech',
          title: 'Fullstack Developer',
          logo: 'https://stevenliao.vercel.app/images/logos/mana-partners.jpeg',
          start: 'Jan 2017',
          end: 'Oct 2018',
        },
      ]}
      roleRender={(role) => <Image src={role.logo} alt="" />}
    />
  )
}
