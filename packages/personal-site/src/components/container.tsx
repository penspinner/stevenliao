import clsx from 'clsx'
import { forwardRef } from 'react'

export const OuterContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function OuterContainer({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    )
  },
)

export const InnerContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function InnerContainer({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx('relative px-4 sm:px-8 lg:px-12', className)} {...props}>
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    )
  },
)

export const Container = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Container({ children, ...props }, ref) {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    )
  },
)
