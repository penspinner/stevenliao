import type { V2_MetaFunction } from '@vercel/remix'
import { About, aboutDescription, aboutTitle } from 'personal-site'

export const config = { runtime: 'edge' }

export const meta: V2_MetaFunction = ({ matches }) => {
  return [
    ...matches[0].meta,
    { title: aboutTitle },
    { name: 'description', content: aboutDescription },
  ]
}

const AboutPage = () => {
  return <About avatarImg={<img src="/images/avatar.jpg" alt="" />} />
}

export default AboutPage
