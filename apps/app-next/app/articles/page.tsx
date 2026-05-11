import { Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

export const metadata = {
  title: articlesTitle,
  description: articlesDescription,
}

const ArticlesPage = async () => {
  const articlesResult = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  return <Articles articlesResult={articlesResult} />
}

export default ArticlesPage
