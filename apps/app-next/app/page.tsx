'use client'

import Image from 'next/image'

import image1 from '~/images/photos/image-1.jpg'
import image2 from '~/images/photos/image-2.jpg'
import image3 from '~/images/photos/image-3.jpg'
import image4 from '~/images/photos/image-4.jpg'
import image5 from '~/images/photos/image-5.jpg'
import logoGreatJones from '~/images/logos/great-jones.jpeg'
import logoManaPartners from '~/images/logos/mana-partners.jpeg'
import logoPercolate from '~/images/logos/percolate.jpeg'
import logoRoofstock from '~/images/logos/roofstock.jpeg'
import { Article, getArticles } from 'personal-site'
import { Index } from 'personal-site'
// import { generateRssFeed } from 'personal-site/dist/server'

const IndexPage = async () => {
  // if (process.env.NODE_ENV === 'production') {
  //   await generateRssFeed()
  // }

  const resp = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  const articles = await resp.json()
  return (
    <Index
      articles={articles}
      photos={[
        { src: image1 },
        { src: image2 },
        { src: image3 },
        { src: image4 },
        { src: image5 },
      ]}
      photoRender={(photo) => <Image src={photo.src} alt={photo.alt ?? ''} />}
      roles={[
        {
          company: 'Roofstock',
          title: 'Software Engineer',
          logo: logoRoofstock,
          start: 'May 2022',
          end: 'Oct 2022',
        },
        {
          company: 'Great Jones',
          title: 'Software Engineer',
          logo: logoGreatJones,
          start: 'Mar 2020',
          end: 'May 2022',
        },
        {
          company: 'Percolate/Seismic',
          title: 'Fullstack Developer',
          logo: logoPercolate,
          start: 'Oct 2018',
          end: 'Mar 2020',
        },
        {
          company: 'MANA Partners/Tech',
          title: 'Fullstack Developer',
          logo: logoManaPartners,
          start: 'Jan 2017',
          end: 'Oct 2018',
        },
      ]}
      roleRender={(role) => <Image src={role.logo} alt="" unoptimized />}
    />
  )
}

export default IndexPage

// export const getStaticProps = async () => {
//   if (process.env.NODE_ENV === 'production') {
//     await generateRssFeed()
//   }

//   const resp = await getArticles({
//     username: '2ezpz2plzme',
//     page: '1',
//     per_page: '3',
//   })
//   const articles = await resp.json()
//   return { props: { articles } }
// }
