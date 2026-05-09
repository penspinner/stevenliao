import { createFileRoute } from '@tanstack/react-router'
import { Uses, usesDescription, usesTitle } from 'personal-site'

export const Route = createFileRoute('/uses')({
  head: () => ({
    meta: [{ title: usesTitle }, { name: 'description', content: usesDescription }],
  }),
  component: UsesPage,
})

function UsesPage() {
  return <Uses />
}
