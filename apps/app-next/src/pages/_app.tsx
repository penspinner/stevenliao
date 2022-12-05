import { useEffect, useRef } from 'react'

// import { Footer } from '~/components/footer'
// import { Header } from '~/components/header'
import { Layout } from 'personal-site'

import '~/styles/tailwind.css'
import 'focus-visible'
import { AppProps } from 'next/app'
import Image from 'next/image'
import avatar from '~/images/avatar.jpg'

const App = ({ Component, pageProps, router }: AppProps) => {
  const previousPathname = usePrevious(router.pathname)

  return (
    <Layout avatarImg={<Image priority src={avatar} alt="" />}>
      <main>
        <Component previousPathname={previousPathname} {...pageProps} />
      </main>
    </Layout>
  )
}

export default App

const usePrevious = <T,>(value: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
