import { Spinner as HeroSpinner } from '@heroui/react'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

type SpinnerProps = ComponentProps<typeof HeroSpinner>

export const Spinner = ({ className, size = 'sm', ...props }: SpinnerProps) => {
  return <HeroSpinner {...props} className={clsx('inline-flex', className)} size={size} />
}
