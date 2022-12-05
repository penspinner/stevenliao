import Head from 'next/head'

import { Card } from '~/components/card'
import { SimpleLayout } from '~/components/simple-layout'
import { formatDate } from '../../lib/format-date'
import { Article, getArticles } from '~/lib/get-articles'

const Article = ({ article }: { article: Article }) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow className="md:hidden" decorate>
          <time dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow className="mt-1 hidden md:block">
        <time dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </Card.Eyebrow>
    </article>
  )
}

const ArticlesIndex = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      <Head>
        <title>Articles - Steven Liao</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default ArticlesIndex

export const getStaticProps = async () => {
  const resp = await getArticles({
    username: '2ezpz2plzme',
    page: '1',
    per_page: '3',
  })
  const articles = await resp.json()
  return {
    props: {
      articles,
    },
  }
}
