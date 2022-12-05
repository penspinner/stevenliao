import clsx from 'clsx'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  type?: 'blue' | 'gray' | 'green' | 'red'
}

export const Badge = ({ className, type = 'gray', ...props }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
        type === 'blue'
          ? 'bg-blue-100 text-blue-800'
          : type === 'green'
          ? 'bg-green-100 text-green-800'
          : type === 'red'
          ? 'bg-red-100 text-red-800'
          : 'bg-gray-100 text-gray-800',
        className,
      )}
      {...props}
    />
  )
}
