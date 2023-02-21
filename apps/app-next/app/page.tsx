import { getArticles, indexDescription, indexTitle } from 'personal-site'

import { IndexPageComponent } from './page-component'

export const metadata = {
  title: indexTitle,
  description: indexDescription,
}

const IndexPage = async () => {
  const resp = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  const articles = await resp.json()
  return <IndexPageComponent articles={articles} />
}

export default IndexPage
