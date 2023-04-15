import type { V2_MetaFunction } from '@vercel/remix'
import { Uses, usesDescription, usesTitle } from 'personal-site'

import type { loader as rootLoader } from '~/root'

export const config = { runtime: 'edge' }

export const meta: V2_MetaFunction<unknown, { root: typeof rootLoader }> = ({ matches }) => {
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
