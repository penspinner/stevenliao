import Head from 'next/head'
import { Uses, usesDescription, usesTitle } from 'personal-site'

const UsesPage = () => {
  return (
    <>
      <Head>
        <title>{usesTitle}</title>
        <meta name="description" content={usesDescription} />
      </Head>
      <Uses />
    </>
  )
}

export default UsesPage
