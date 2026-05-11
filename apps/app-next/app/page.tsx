import { getArticles, indexDescription, indexTitle } from 'personal-site'

import { IndexPageComponent } from './page-component'

export const metadata = {
  title: indexTitle,
  description: indexDescription,
}

const IndexPage = async () => {
  const articlesResult = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  return <IndexPageComponent articles={articlesResult.data ?? []} />
}

export default IndexPage
