import clsx from 'clsx'

export const Container = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('py-8 first:pt-0 last:pb-0', className)} {...props} />
)
