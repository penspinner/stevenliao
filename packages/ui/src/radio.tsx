import clsx from 'clsx'

type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

export const Radio = ({ className, label, ...props }: RadioProps) => {
  return (
    <div className="relative flex items-start gap-3">
      <div className="flex h-5 items-center">
        <input
          {...props}
          type="radio"
          className={clsx('h-4 w-4 border-gray-300 text-sky-900 focus:ring-sky-500', className)}
        />
      </div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 disabled:opacity-60"
      >
        {label}
      </label>
    </div>
  )
}
