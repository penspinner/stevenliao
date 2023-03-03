import clsx from 'clsx'

import { Field } from './field'

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <div className="flex h-5 items-center">
      <input
        className={clsx(
          'h-4 w-4 rounded border-gray-300 text-sky-900 focus:ring-sky-500 disabled:opacity-60',
          className,
        )}
        type="checkbox"
        {...props}
      />
    </div>
  )
}

type FieldCheckboxProps = CheckboxProps

const FieldCheckbox = (props: FieldCheckboxProps) => {
  const field = Field.useField()
  return (
    <Checkbox
      {...props}
      aria-describedby={field.error && field.error.length > 0 ? `${field.id}Error` : undefined}
      id={field.id}
    />
  )
}

type FieldCheckboxConvenienceProps = FieldCheckboxProps & {
  containerClassName?: string
  error?: string | string[]
  label: React.ReactNode
}

export const FieldCheckboxConvenience = ({
  className,
  error,
  label,
  ...props
}: FieldCheckboxConvenienceProps) => {
  return (
    <Field error={error}>
      <div className="relative flex items-start gap-3">
        <FieldCheckbox {...props} />
        <Field.Label className="text-sm font-medium text-gray-600">{label}</Field.Label>
        <Field.Error className="text-sm text-red-600">
          <Field.ErrorText />
        </Field.Error>
      </div>
    </Field>
  )
}
