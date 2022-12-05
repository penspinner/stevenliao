import { SimpleLayout } from '~/components/simple-layout'

export const thankYouTitle = 'You’re subscribed - Steven Liao'
export const thankYouDescription = 'Thanks for subscribing to my newsletter.'

export const ThankYou = () => {
  return (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  )
}
