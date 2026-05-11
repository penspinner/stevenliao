import { Description, FieldError, Input, Label, TextField } from '@heroui/react'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

export type FieldInputProps = Omit<ComponentProps<typeof Input>, 'className'> & {
  className?: string
  error?: string | string[]
  description?: string
  label: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const FieldInput = ({
  description,
  error,
  label,
  leading,
  trailing,
  className,
  ...props
}: FieldInputProps) => {
  return (
    <TextField className={clsx('space-y-2', className)} isInvalid={error !== undefined}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative rounded">
        {leading != null && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            {leading}
          </div>
        )}
        <Input
          {...props}
          className={clsx(
            'block w-full appearance-none rounded border px-3 py-2 text-sm shadow-sm focus:outline-none',
            error !== undefined
              ? 'border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500',
            'disabled:cursor-not-allowed disabled:bg-gray-100',
            leading != null && 'pl-10',
          )}
        />
        {trailing != null && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        )}
      </div>
      {description && <Description className="text-sm text-gray-600">{description}</Description>}
      <FieldError className="text-sm text-red-600">
        {Array.isArray(error) ? error.join(' ') : error}
      </FieldError>
    </TextField>
  )
}
