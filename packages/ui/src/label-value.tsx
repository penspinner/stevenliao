import clsx from 'clsx'

type LabelValueProps = {
  label: React.ReactNode
  value: React.ReactNode
}

export const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <div className="sm:grid sm:grid-cols-12 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500 sm:col-span-5">{label}</dt>
      <dd
        className={clsx(
          'mt-1 text-sm sm:col-span-7 sm:mt-0',
          value ? 'text-gray-900' : 'text-gray-800',
        )}
      >
        {value ?? 'n/a'}
      </dd>
    </div>
  )
}
