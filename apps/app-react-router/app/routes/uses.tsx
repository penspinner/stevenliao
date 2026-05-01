import { Uses, usesDescription, usesTitle } from 'personal-site'

import type { Route } from './+types/uses'

export const meta: Route.MetaFunction = () => {
  return [{ title: usesTitle }, { name: 'description', content: usesDescription }]
}

const UsesPage = () => {
  return <Uses />
}

export default UsesPage
