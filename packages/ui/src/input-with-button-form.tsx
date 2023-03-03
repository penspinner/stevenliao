export type InputWithButtonFormProps = React.InputHTMLAttributes<HTMLInputElement> & {
  buttonLabel: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  onFormSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const InputWithButtonForm = ({
  buttonLabel,
  Icon,
  onFormSubmit,
  ...props
}: InputWithButtonFormProps) => {
  return (
    <form
      className="flex w-full rounded shadow-sm sm:max-w-xs"
      method="get"
      onSubmit={onFormSubmit}
    >
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          className="block w-full rounded-none rounded-l border-gray-300 pl-10 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          {...props}
        />
      </div>
      <button className="relative -ml-px inline-flex items-center rounded-r border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
        <span>{buttonLabel}</span>
      </button>
    </form>
  )
}
