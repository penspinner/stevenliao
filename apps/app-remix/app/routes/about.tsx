import type { V2_MetaFunction } from '@remix-run/node'
import { About, aboutDescription, aboutTitle } from 'personal-site'

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
