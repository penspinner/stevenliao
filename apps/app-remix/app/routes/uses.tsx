import type { V2_MetaFunction } from '@vercel/remix'
import { Uses, usesDescription, usesTitle } from 'personal-site'

export const config = { runtime: 'edge' }

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
