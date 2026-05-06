import type { ComponentProps } from 'react'
import { Button as HeroButton } from '@heroui/react'

type ButtonProps = Omit<ComponentProps<typeof HeroButton>, 'variant'> & {
  variant?: 'primary' | 'secondary'
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <HeroButton variant={variant} {...props} />
}
