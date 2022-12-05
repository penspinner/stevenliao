import clsx from 'clsx'

import { Field } from '~/design-system/fields/field'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      {...props}
      className={clsx(
        'block w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 disabled:opacity-60 sm:text-sm',
      )}
    />
  )
}

type FieldTextareaProps = TextareaProps

const FieldTextarea = (props: FieldTextareaProps) => {
  const field = Field.useField()
  return <Textarea {...props} id={field.id} />
}

type FieldTextareaConvenienceProps = FieldTextareaProps & {
  error?: string | string[]
  description?: string
  label: React.ReactNode
}

export const FieldTextareaConvenience = ({
  className,
  description,
  error,
  label,
  ...props
}: FieldTextareaConvenienceProps) => {
  return (
    <Field error={error}>
      <div className="space-y-2">
        <Field.Label className="text-sm font-medium text-gray-700">{label}</Field.Label>
        <FieldTextarea {...props} />
        {description && <p className="text-sm text-gray-600">{description}</p>}
        <Field.Error className="text-sm text-red-600">
          <Field.ErrorText />
        </Field.Error>
      </div>
    </Field>
  )
}
