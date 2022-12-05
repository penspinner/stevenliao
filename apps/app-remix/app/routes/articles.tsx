import { json, V2_MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Article, Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

import { createCacheControlHeaders } from '~/utils'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [
    ...matches[0].meta,
    { title: articlesTitle },
    { name: 'description', content: articlesDescription },
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

const ArticlesPage = () => {
  const { articles } = useLoaderData<typeof loader>()
  return <Articles articles={articles} />
}

export default ArticlesPage
