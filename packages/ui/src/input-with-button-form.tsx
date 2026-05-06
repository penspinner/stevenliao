import { Button, InputGroup } from '@heroui/react'
import type React from 'react'

export type InputWithButtonFormProps = React.InputHTMLAttributes<HTMLInputElement> & {
  buttonLabel: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  onFormSubmit?: React.SubmitEventHandler<HTMLFormElement>
}

export const InputWithButtonForm = ({
  buttonLabel,
  Icon,
  onFormSubmit,
  ...props
}: InputWithButtonFormProps) => {
  return (
    <form className="flex w-full rounded shadow-sm sm:max-w-xs" onSubmit={onFormSubmit}>
      <InputGroup className="rounded-r-none">
        <InputGroup.Prefix>
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </InputGroup.Prefix>
        <InputGroup.Input {...props} />
      </InputGroup>
      <Button
        className="relative -ml-px inline-flex items-center rounded-l-none rounded-r border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
        type="submit"
      >
        <span>{buttonLabel}</span>
      </Button>
    </form>
  )
}
