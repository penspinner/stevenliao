import { Description, FieldError, Input, Label, TextField } from '@heroui/react'
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
    <TextField className={className} isInvalid={!!error}>
      <Label>{label}</Label>
      <div className="relative">
        {leading && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            {leading}
          </div>
        )}
        <Input
          {...props}
          className={leading ? 'pl-10' : undefined}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        )}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{Array.isArray(error) ? error.join(' ') : error}</FieldError>
    </TextField>
  )
}
