import Head from 'next/head'

import { ThankYou, thankYouDescription, thankYouTitle } from 'personal-site'

const ThankYouPage = () => {
  return (
    <>
      <Head>
        <title>{thankYouTitle}</title>
        <meta name="description" content={thankYouDescription} />
      </Head>
      <ThankYou />
    </>
  )
}

export default ThankYouPage
