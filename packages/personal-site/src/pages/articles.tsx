import { Card } from '~/components/card'
import { SimpleLayout } from '~/components/simple-layout'
import { formatDate } from '~/lib/format-date'
import { Article } from '~/lib/get-articles'

export const articlesTitle = 'Articles - Steven Liao'
export const articlesDescription =
  'Writing about my web development learnings. Here are my articles in chronological order.'

export const Articles = ({ articles }: { articles: Article[] }) => {
  return (
    <SimpleLayout title="Articles" intro={articlesDescription}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <article className="md:grid md:grid-cols-4 md:items-baseline" key={article.slug}>
              <Card className="md:col-span-3">
                <Card.Title href={article.url}>{article.title}</Card.Title>
                <Card.Eyebrow className="md:hidden" decorate>
                  <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
                </Card.Eyebrow>
                <Card.Description>{article.description}</Card.Description>
                <Card.Cta>Read article</Card.Cta>
              </Card>
              <Card.Eyebrow className="mt-1 hidden md:block">
                <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
              </Card.Eyebrow>
            </article>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
