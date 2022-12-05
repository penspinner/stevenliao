import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react'

import { Field } from '~/design-system/fields/field'

type FieldListboxProps<Multiple extends boolean, TType extends Record<string, unknown>> = {
  getOptionKey: (option: TType) => string
  label: string
  multiple?: Multiple
  onChange: (value: Multiple extends true ? TType[] : TType) => void
  options: TType[]
  renderOptionLabel: (value: TType) => string
  valueDisplay: React.ReactNode
  value: Multiple extends true ? TType[] : TType | null | undefined
}

const FieldListbox = <Multiple extends boolean, TType extends Record<string, unknown>>({
  getOptionKey,
  options,
  label,
  renderOptionLabel,
  valueDisplay,
  ...props
}: FieldListboxProps<Multiple, TType>) => {
  return (
    <Listbox {...props}>
      {({ open }) => (
        <div className="space-y-2">
          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative h-9 w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
              <span className="block truncate">{valueDisplay}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={getOptionKey(option)}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-sky-900 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {renderOptionLabel(option)}
                        </span>
                        {selected && (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-sky-900',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}

export type FieldListboxConvenienceProps<
  Multiple extends boolean,
  TType extends Record<string, unknown>,
> = FieldListboxProps<Multiple, TType> & {
  error?: string | string[]
}

export const FieldListboxConvenience = <
  Multiple extends boolean,
  TType extends Record<string, unknown>,
>({
  error,
  ...props
}: FieldListboxConvenienceProps<Multiple, TType>) => {
  return (
    <Field error={error}>
      <FieldListbox {...props} />
      <Field.Error className="text-sm text-red-600">
        <Field.ErrorText />
      </Field.Error>
    </Field>
  )
}
