import { Button as HeroButton } from '@heroui/react'
import type { ComponentProps } from 'react'

import { Spinner } from './spinner'

type ButtonProps = ComponentProps<typeof HeroButton>

export const Button = ({ children, isPending, ...props }: ButtonProps) => {
  return (
    <HeroButton {...props} isPending={isPending}>
      {typeof children === 'function' ? (
        (...args) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {children(...args)}
          </>
        )
      ) : (
        <>
          {isPending && <Spinner color="current" size="sm" />}
          {children}
        </>
      )}
    </HeroButton>
  )
}
