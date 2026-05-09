import { createFileRoute } from '@tanstack/react-router'
import type { Article } from 'personal-site'
import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

import { createCacheControlHeaders } from '#utils'

export const Route = createFileRoute('/articles')({
  head: () => ({
    meta: [{ title: articlesTitle }, { name: 'description', content: articlesDescription }],
  }),
  loader: async () => {
    const response = await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
    const articles: Article[] = await response.json()
    return {
      articles,
      headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    }
  },
  component: ArticlesPage,
})

function ArticlesPage() {
  const { articles } = Route.useLoaderData()
  return <Articles articles={articles} />
}
