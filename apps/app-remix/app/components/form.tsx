import { Form as RemixForm, FormProps as RemixFormProps, useSearchParams } from '@remix-run/react'
import * as React from 'react'

type FormProps = RemixFormProps & {
  /**
   * This property tells the form whether or not to clear the existing search params. By default, this property is set
   * to `false`, which means that the form will keep existing search params. An array of strings can also be passed in
   * to clear specific search params.
   */
  clearSearchParams?: boolean | string[]
}

export const Form = React.forwardRef(
  (
    { action, clearSearchParams = false, ...props }: FormProps,
    ref: React.ForwardedRef<HTMLFormElement>,
  ) => {
    const newAction = useFormAction({ action, clearSearchParams })
    return <RemixForm action={newAction} ref={ref} {...props} />
  },
)

Form.displayName = 'Form'

export const useFormAction = ({ action, clearSearchParams = false }: FormProps = {}) => {
  let newAction = action
  const [searchParams] = useSearchParams()
  const search = searchParams.toString()

  if (clearSearchParams !== true && searchParams.toString()) {
    if (Array.isArray(clearSearchParams)) {
      clearSearchParams.forEach((searchParamToClear) => {
        searchParams.delete(searchParamToClear)
      })
    }

    const symbol = action?.includes('?') ? '&' : '?'
    newAction = action ?? '' + symbol + search
  }

  return newAction
}
