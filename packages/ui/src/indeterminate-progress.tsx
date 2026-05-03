import clsx from 'clsx'
import { ProgressBar } from 'react-aria-components'
import type { ProgressBarProps } from 'react-aria-components'

type IndeterminateProgressProps = ProgressBarProps

export const IndeterminateProgress = ({
  children,
  className,
  ...props
}: IndeterminateProgressProps) => {
  return (
    <ProgressBar
      {...props}
      isIndeterminate
      aria-label={props['aria-label'] ?? 'Loading...'}
      className={clsx('inline-flex', className)}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          className="h-5 w-5 animate-spin motion-reduce:hidden"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
    </ProgressBar>
  )
}
