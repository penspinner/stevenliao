import clsx from 'clsx'
import * as React from 'react'

import { Field } from '~/design-system/fields/field'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leading, trailing, ...props }, ref) => {
    return (
      <div className="relative rounded">
        {leading && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {leading}
          </div>
        )}
        <input
          {...props}
          className={clsx(
            'block w-full appearance-none rounded px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100',
            className,
          )}
          ref={ref}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

type FieldInputProps = InputProps

export const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  ({ 'aria-describedby': ariaDescribedby, className, ...props }, ref) => {
    const field = Field.useField()
    return (
      <Input
        {...props}
        aria-describedby={clsx(
          (field.error && field.error.length > 0 && `${field.id}Error`) || undefined,
          ariaDescribedby,
        )}
        className={clsx(
          'border text-sm shadow-sm focus:outline-none',
          field.error
            ? 'border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500',
          className,
        )}
        id={field.id}
        ref={ref}
      />
    )
  },
)

FieldInput.displayName = 'FieldInput'

type FieldInputConvenienceProps = FieldInputProps & {
  error?: string | string[]
  description?: string
  label: React.ReactNode
}

export const FieldInputConvenience = ({
  description,
  error,
  label,
  ...props
}: FieldInputConvenienceProps) => {
  return (
    <Field error={error}>
      <div className="space-y-2">
        <Field.Label className="text-sm font-medium text-gray-700">{label}</Field.Label>
        <FieldInput {...props} />
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {error && (
          <Field.Error className="text-sm text-red-600">
            <Field.ErrorText />
          </Field.Error>
        )}
      </div>
    </Field>
  )
}
