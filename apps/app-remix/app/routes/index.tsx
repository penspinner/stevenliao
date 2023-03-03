import type { V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useRouteError } from '@remix-run/react'
import type { Article } from 'personal-site'
import {
  getArticles,
  Index,
  indexDescription,
  indexTitle,
  PaddedErrorBoundary,
} from 'personal-site'

import { createCacheControlHeaders } from '~/utils'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [
    ...matches[0].meta,
    { title: indexTitle },
    { name: 'description', content: indexDescription },
  ]
}

export const loader = async () => {
  const articles: Article[] = await (
    await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
  ).json()
  return json(
    { articles },
    { headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }) },
  )
}

const IndexPage = () => {
  const { articles } = useLoaderData<typeof loader>()
  return (
    <Index
      articles={articles}
      photos={[{ src: '/images/algorithms.png' }, { src: '/images/computer-hackermans.png' }]}
      roles={[
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

export default IndexPage

export const ErrorBoundary = () => {
  const routeError = useRouteError()
  return <PaddedErrorBoundary thrown={routeError} />
}
