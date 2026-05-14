'use client'

import Image from 'next/image'
import { About } from 'personal-site'

export const AboutPageComponent = () => {
  return (
    <About
      avatarImg={<Image src="/images/shared/avatar.jpg" alt="" priority width="296" height="296" />}
    />
  )
}
