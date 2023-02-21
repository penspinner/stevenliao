import { aboutDescription, aboutTitle } from 'personal-site'

import { AboutPageComponent } from './page-component'

export const metadata = {
  title: aboutTitle,
  description: aboutDescription,
}

const AboutPage = () => {
  return <AboutPageComponent />
}

export default AboutPage
