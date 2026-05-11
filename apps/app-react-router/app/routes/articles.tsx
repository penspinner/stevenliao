import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'
import { data, useLoaderData } from 'react-router'

import { createCacheControlHeaders } from '#utils'

import type { Route } from './+types/articles'

export const meta: Route.MetaFunction = () => {
  return [{ title: articlesTitle }, { name: 'description', content: articlesDescription }]
}

export const loader = async () => {
  const articlesResult = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  return data(
    { articlesResult },
    {
      headers: {
        'Content-Type': 'application/json',
        ...createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
      },
    },
  )
}

const ArticlesPage = () => {
  const { articlesResult } = useLoaderData<typeof loader>()
  return <Articles articlesResult={articlesResult} />
}

export default ArticlesPage
