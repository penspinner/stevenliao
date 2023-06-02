import { useLoaderData } from '@remix-run/react'
import type { V2_MetaFunction } from '@vercel/remix'
import { json } from '@vercel/remix'
import type { Article } from 'personal-site'
import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

import { createCacheControlHeaders } from '~/utils'

export const config = { runtime: 'edge' }

export const meta: V2_MetaFunction = () => {
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
  return json(
    { articles },
    { headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }) },
  )
}

const ArticlesPage = () => {
  const { articles } = useLoaderData<typeof loader>()
  return <Articles articles={articles} />
}

export default ArticlesPage
