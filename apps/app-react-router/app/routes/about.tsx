import { About, aboutDescription, aboutTitle } from 'personal-site'

import type { Route } from './+types/about'

export const meta: Route.MetaFunction = () => {
  return [{ title: aboutTitle }, { name: 'description', content: aboutDescription }]
}

const AboutPage = () => {
  return <About avatarImg={<img src="/images/shared/avatar.jpg" alt="" />} />
}

export default AboutPage
