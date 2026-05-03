import clsx from 'clsx'
import {
  FieldError as RACFieldError,
  Input as RACInput,
  Label,
  Text,
  TextField,
} from 'react-aria-components'
import type { InputProps as RACInputProps } from 'react-aria-components'

export type FieldInputProps = Omit<RACInputProps, 'children'> & {
  error?: string | string[]
  description?: string
  label: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const FieldInput = ({
  className,
  description,
  error,
  label,
  leading,
  trailing,
  ...props
}: FieldInputProps) => {
  return (
    <TextField className="space-y-2" isInvalid={!!error}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative rounded">
        {leading && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {leading}
          </div>
        )}
        <RACInput
          {...(props as RACInputProps)}
          className={clsx(
            'block w-full appearance-none rounded border px-3 py-2 text-sm shadow-sm focus:outline-none',
            error
              ? 'border-red-400 placeholder-red-400 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-500',
            'disabled:cursor-not-allowed disabled:bg-gray-100',
            className as string | undefined,
          )}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        )}
      </div>
      {description && (
        <Text slot="description" className="text-sm text-gray-600">
          {description}
        </Text>
      )}
      <RACFieldError className="text-sm text-red-600">
        {Array.isArray(error) ? error.join(' ') : error}
      </RACFieldError>
    </TextField>
  )
}
