import { V2_MetaFunction } from '@remix-run/node'
import { Uses, usesDescription, usesTitle } from 'personal-site'

export const meta: V2_MetaFunction = ({ matches }) => {
  return [
    ...matches[0].meta,
    { title: usesTitle },
    { name: 'description', content: usesDescription },
  ]
}

const UsesPage = () => {
  return <Uses />
}

export default UsesPage
