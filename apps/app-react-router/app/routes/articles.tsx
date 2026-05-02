import type { Article } from 'personal-site'
import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'
import { useLoaderData } from 'react-router'

import { createCacheControlHeaders } from '#utils'

import type { Route } from './+types/articles'

export const meta: Route.MetaFunction = () => {
  return [{ title: articlesTitle }, { name: 'description', content: articlesDescription }]
}

export const loader = async () => {
  const articles: Article[] = await (
    await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
  ).json()
  return new Response(JSON.stringify({ articles }), {
    headers: {
      'Content-Type': 'application/json',
      ...createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    },
  })
}

const ArticlesPage = () => {
  const { articles } = useLoaderData<{ articles: Article[] }>()
  return <Articles articles={articles} />
}

export default ArticlesPage
