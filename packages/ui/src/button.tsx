import clsx from 'clsx'

import { Link, LinkProps } from '~/design-system/link'
import { Spinner } from '~/design-system/spinner'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  variant?: 'contained' | 'text'
}

export const Button = ({
  children,
  className,
  disabled,
  loading,
  variant = 'contained',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(getButtonVariantClassName(variant), className)}
      disabled={disabled || loading}
    >
      {loading && <Spinner className="text-white motion-reduce:hidden" />}
      {children}
    </button>
  )
}

type ButtonLinkProps = LinkProps & Pick<ButtonProps, 'variant'>

export const ButtonLink = ({ className, variant = 'contained', ...props }: ButtonLinkProps) => {
  return <Link {...props} className={clsx(getButtonVariantClassName(variant), className)} />
}

const getButtonVariantClassName = (variant: ButtonProps['variant']) => {
  return variant === 'contained'
    ? 'inline-flex items-center text-sm gap-2 rounded border-transparent bg-sky-900 px-3 py-2 font-medium leading-4 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-60 disabled:hover:bg-sky-900'
    : 'text-sky-900 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-sky-900'
}
