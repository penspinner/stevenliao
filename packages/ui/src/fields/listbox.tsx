import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react'
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  type Key,
  type Selection,
} from 'react-aria-components'

import { Field } from './field'

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
  label,
  multiple,
  onChange,
  options,
  renderOptionLabel,
  value,
  valueDisplay,
}: FieldListboxProps<Multiple, TType>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedKeys = React.useMemo(() => {
    if (multiple) {
      return new Set<Key>((value as TType[])?.map(getOptionKey) ?? [])
    }
    const key = value ? getOptionKey(value as TType) : null
    return key ? new Set<Key>([key]) : new Set<Key>()
  }, [value, multiple, getOptionKey])

  React.useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelectionChange = React.useCallback(
    (selection: Selection) => {
      if (selection === 'all') {
        if (multiple) onChange(options as Multiple extends true ? TType[] : TType)
        return
      }
      const selected = options.filter((o) => selection.has(getOptionKey(o)))
      if (multiple) {
        onChange(selected as Multiple extends true ? TType[] : TType)
      } else {
        if (selected[0]) {
          onChange(selected[0] as Multiple extends true ? TType[] : TType)
          setIsOpen(false)
        }
      }
    },
    [multiple, onChange, options, getOptionKey],
  )

  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const listboxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      listboxRef.current?.focus()
    }
  }, [isOpen])

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  const handleDropdownBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="space-y-2">
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative">
        <Button
          ref={buttonRef}
          onPress={() => setIsOpen(!isOpen)}
          className="relative h-9 w-full cursor-default rounded border border-gray-300 bg-white py-2 pr-10 pl-3 text-left shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none sm:text-sm"
        >
          <span className="block truncate">{valueDisplay}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Button>
        {isOpen && (
          <div
            ref={listboxRef}
            role="presentation"
            tabIndex={-1}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black outline-none sm:text-sm"
            onBlur={handleDropdownBlur}
            onKeyDown={handleDropdownKeyDown}
          >
            <ListBox
              selectionMode={multiple ? 'multiple' : 'single'}
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
              items={options}
              className="outline-none"
              disallowEmptySelection={!multiple}
            >
              {(option) => (
                <ListBoxItem
                  id={getOptionKey(option)}
                  textValue={renderOptionLabel(option)}
                  className={({ isFocused }) =>
                    clsx(
                      isFocused && 'bg-sky-900 text-white',
                      !isFocused && 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9 outline-none',
                    )
                  }
                >
                  {({ isSelected }) => (
                    <>
                      <span
                        className={clsx(
                          isSelected ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        )}
                      >
                        {renderOptionLabel(option)}
                      </span>
                      {isSelected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-current">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListBoxItem>
              )}
            </ListBox>
          </div>
        )}
      </div>
    </div>
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
