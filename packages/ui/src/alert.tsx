import clsx from 'clsx'

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: 'yellow' | 'red' | 'gray'
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Alert: React.FC<AlertProps> = ({ children, color, Icon, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded px-3 py-2 shadow',
        color === 'yellow' ? 'bg-yellow-100' : color === 'gray' ? 'bg-gray-100' : 'bg-red-100',
      )}
      {...props}
    >
      <div className="flex">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon
              aria-hidden="true"
              className={clsx(
                'mr-3 h-5 w-5',
                color === 'yellow'
                  ? 'text-yellow-400'
                  : color === 'gray'
                  ? 'text-gray-400'
                  : 'text-red-400',
              )}
            />
          </div>
        )}
        <p
          className={clsx(
            'text-sm',
            color === 'yellow'
              ? 'text-yellow-800'
              : color === 'gray'
              ? 'text-gray-800'
              : 'text-red-800',
          )}
        >
          {children}
        </p>
      </div>
    </div>
  )
}
