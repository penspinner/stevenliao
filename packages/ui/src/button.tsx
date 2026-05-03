import clsx from 'clsx'
import { Button as RACButton } from 'react-aria-components'
import type { ButtonProps as RACButtonProps } from 'react-aria-components'

import { IndeterminateProgress } from './indeterminate-progress'

type ButtonProps = RACButtonProps & {
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  children,
  className,
  isDisabled,
  loading,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <RACButton
      {...props}
      className={clsx(
        'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none disabled:opacity-70',
        variantClassNames[variant],
        className,
      )}
      isDisabled={isDisabled || loading}
    >
      {typeof children === 'function' ? (
        (...args) => (
          <>
            {loading && <IndeterminateProgress className="text-white" />}
            {children(...args)}
          </>
        )
      ) : (
        <>
          {loading && <IndeterminateProgress className="text-white" />}
          {children}
        </>
      )}
    </RACButton>
  )
}

const variantClassNames = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
}
