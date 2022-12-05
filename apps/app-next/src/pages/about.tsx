import Image from 'next/image'
import Head from 'next/head'
import avatarImage from '~/images/avatar.jpg'
import { About } from 'personal-site'

const AboutPage = () => {
  const description = 'Hi. I’m Steven, a software engineer in New York City.'
  return (
    <>
      <Head>
        <title>About - Steven Liao</title>
        <meta name="description" content={description} />
      </Head>
      <About avatarImg={<Image src={avatarImage} alt="" />} />
    </>
  )
}

export default AboutPage
