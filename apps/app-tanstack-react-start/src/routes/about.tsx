import { createFileRoute } from '@tanstack/react-router'
import { About, aboutDescription, aboutTitle } from 'personal-site'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: aboutTitle }, { name: 'description', content: aboutDescription }],
  }),
  component: AboutPage,
})

function AboutPage() {
  return <About avatarImg={<img src="/images/shared/avatar.jpg" alt="" />} />
}
