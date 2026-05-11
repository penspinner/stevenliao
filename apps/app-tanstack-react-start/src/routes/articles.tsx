import { createFileRoute } from '@tanstack/react-router'
import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

import { createCacheControlHeaders } from '#utils'

export const Route = createFileRoute('/articles')({
  head: () => ({
    meta: [{ title: articlesTitle }, { name: 'description', content: articlesDescription }],
  }),
  loader: async () => {
    const articlesResult = await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
    return {
      articlesResult,
      headers: createCacheControlHeaders({ visibility: 'public', maxage: 900 }),
    }
  },
  component: ArticlesPage,
})

function ArticlesPage() {
  const { articlesResult } = Route.useLoaderData()
  return <Articles articlesResult={articlesResult} />
}
