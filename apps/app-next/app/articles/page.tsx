import { Article, Articles, articlesDescription, articlesTitle, getArticles } from 'personal-site'

export const metadata = {
  title: articlesTitle,
  description: articlesDescription,
}

const ArticlesPage = async () => {
  const articles: Article[] = await (
    await getArticles({
      username: '2ezpz2plzme',
      page: '1',
      per_page: '3',
    })
  ).json()
  return <Articles articles={articles} />
}

export default ArticlesPage
