import * as React from 'react'

type FieldContextValue = {
  id: string
  error?: string | string[]
  required?: boolean
}

const DEFAULT_FIELD_VALUE = {} as FieldContextValue

const FieldContext = React.createContext<FieldContextValue>(DEFAULT_FIELD_VALUE)

const useField = () => {
  const field = React.useContext(FieldContext)

  if (field === DEFAULT_FIELD_VALUE) {
    throw new Error('useField must be used within a Field component')
  }

  return field
}

const FieldLabel = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const field = useField()

  if (!props.children) {
    return null
  }

  return <label htmlFor={field.id} {...props} />
}

const FieldErrorText = () => {
  const field = useField()
  return <>{Array.isArray(field.error) ? field.error.join(' ') : field.error}</>
}

const FieldError = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const field = useField()

  if (!field.error || !field.error.length) {
    return null
  }

  return <p {...props} id={`${field.id}Error`} />
}

type FieldProps = React.PropsWithChildren<Omit<FieldContextValue, 'id'>>

export const Field = ({ children, ...props }: FieldProps) => {
  const id = React.useId()
  return <FieldContext.Provider value={{ id, ...props }}>{children}</FieldContext.Provider>
}

Field.Error = FieldError
Field.ErrorText = FieldErrorText
Field.Label = FieldLabel
Field.useField = useField
