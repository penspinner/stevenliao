import { createFileRoute } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import {
  Index,
  PaddedErrorBoundary,
  getArticles,
  indexDescription,
  indexTitle,
} from 'personal-site'

import { createCacheControlHeaders } from '#utils'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: indexTitle }, { name: 'description', content: indexDescription }],
  }),
  loader: async () => {
    const articlesResult = await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
    return {
      articles: articlesResult.data ?? [],
      headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    }
  },
  component: IndexPage,
  errorComponent: IndexError,
})

function IndexPage() {
  const { articles } = Route.useLoaderData()
  return (
    <Index
      articles={articles}
      photos={[
        { src: '/images/shared/algorithms.png' },
        { src: '/images/shared/computer-hackermans.png' },
      ]}
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
    />
  )
}

function IndexError({ error }: ErrorComponentProps) {
  return <PaddedErrorBoundary thrown={error} />
}
