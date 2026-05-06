import {
  Calendar,
  DateField,
  DatePicker as HeroDatePicker,
  DateRangePicker as HeroDateRangePicker,
  Label,
  RangeCalendar,
} from '@heroui/react'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

export type DatePickerProps = ComponentProps<typeof HeroDatePicker>

export const DatePicker = ({ label, ...props }: DatePickerProps & { label?: React.ReactNode }) => (
  <HeroDatePicker {...props} className="relative inline-flex flex-col text-left">
    {label && <Label className="text-sm text-gray-800">{label}</Label>}
    <div className="group flex text-sm">
      <div className="relative flex rounded-l border border-gray-300 bg-white px-3 py-2 pr-10 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
        <DateField.Input>
          {(segment) => (
            <DateField.Segment
              segment={segment}
              className="group box-content rounded-sm px-0.5 text-right text-gray-800 tabular-nums outline-none focus:bg-sky-600 focus:text-white data-[placeholder]:text-gray-500 data-[placeholder]:italic data-[type=literal]:text-gray-500"
            />
          )}
        </DateField.Input>
      </div>
      <HeroDatePicker.Trigger className="-ml-px rounded-r border border-gray-300 bg-gray-50 px-2 outline-none hover:bg-gray-100 focus-visible:z-10 focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 active:border-gray-400 active:bg-gray-200">
        <HeroDatePicker.TriggerIndicator />
      </HeroDatePicker.Trigger>
    </div>
    <HeroDatePicker.Popover className="z-10 rounded bg-white p-8 shadow-lg">
      <Calendar aria-label="Event date" className="inline-block space-y-4 text-gray-800">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading className="ml-2 flex-1 text-lg font-bold" />
            <Calendar.YearPickerTriggerIndicator />
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton
            slot="previous"
            className="rounded-full p-2 outline-none hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 active:bg-sky-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          />
          <Calendar.NavButton
            slot="next"
            className="rounded-full p-2 outline-none hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 active:bg-sky-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => (
              <Calendar.HeaderCell className="text-center text-gray-600">{day}</Calendar.HeaderCell>
            )}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => (
              <Calendar.Cell
                date={date}
                className={({
                  isSelected,
                  isFocusVisible,
                  isOutsideMonth,
                  isDisabled,
                  isInvalid,
                  isSelectionStart,
                  isSelectionEnd,
                }) =>
                  clsx(
                    'group box-content flex h-10 w-10 cursor-default items-center justify-center rounded-full text-sm outline-none',
                    isOutsideMonth && 'invisible',
                    isDisabled && !isInvalid && 'text-gray-400',
                    isFocusVisible && 'ring-2 ring-sky-600 ring-offset-2',
                    isSelected &&
                      !isInvalid &&
                      !isSelectionStart &&
                      !isSelectionEnd &&
                      'bg-sky-300',
                    isSelected && isInvalid && !isSelectionStart && !isSelectionEnd && 'bg-red-300',
                    (isSelectionStart || isSelectionEnd) &&
                      !isInvalid &&
                      'bg-sky-600 text-white hover:bg-sky-700',
                    (isSelectionStart || isSelectionEnd) &&
                      isInvalid &&
                      'bg-red-600 text-white hover:bg-red-700',
                    !isSelected && !isDisabled && 'hover:bg-sky-100',
                  )
                }
              />
            )}
          </Calendar.GridBody>
        </Calendar.Grid>
        <Calendar.YearPickerGrid>
          <Calendar.YearPickerGridBody>
            {({ year }) => <Calendar.YearPickerCell year={year} />}
          </Calendar.YearPickerGridBody>
        </Calendar.YearPickerGrid>
      </Calendar>
    </HeroDatePicker.Popover>
  </HeroDatePicker>
)

export type DateRangePickerProps = ComponentProps<typeof HeroDateRangePicker>

export const DateRangePicker = ({
  label,
  ...props
}: DateRangePickerProps & { label?: React.ReactNode }) => (
  <HeroDateRangePicker {...props} className="relative inline-flex flex-col space-y-2 text-left">
    {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
    <div className="flex text-sm">
      <div className="relative flex rounded-l border border-gray-300 bg-white px-3 py-2 pr-10 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
        <DateField.Input slot="start">
          {(segment) => (
            <DateField.Segment
              segment={segment}
              className="group box-content rounded-sm px-0.5 text-right text-gray-800 tabular-nums outline-none focus:bg-sky-600 focus:text-white data-[placeholder]:text-gray-500 data-[placeholder]:italic data-[type=literal]:text-gray-500"
            />
          )}
        </DateField.Input>
        <span aria-hidden="true" className="px-2">
          –
        </span>
        <DateField.Input slot="end">
          {(segment) => (
            <DateField.Segment
              segment={segment}
              className="group box-content rounded-sm px-0.5 text-right text-gray-800 tabular-nums outline-none focus:bg-sky-600 focus:text-white data-[placeholder]:text-gray-500 data-[placeholder]:italic data-[type=literal]:text-gray-500"
            />
          )}
        </DateField.Input>
      </div>
      <HeroDateRangePicker.Trigger className="-ml-px rounded-r border border-gray-300 bg-gray-50 px-2 outline-none hover:bg-gray-100 focus-visible:z-10 focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 active:border-gray-400 active:bg-gray-200">
        <HeroDateRangePicker.TriggerIndicator />
      </HeroDateRangePicker.Trigger>
    </div>
    <HeroDateRangePicker.Popover className="z-10 rounded bg-white p-8 shadow-lg">
      <RangeCalendar aria-label="Trip dates" className="inline-block space-y-4 text-gray-800">
        <RangeCalendar.Header>
          <RangeCalendar.YearPickerTrigger>
            <RangeCalendar.YearPickerTriggerHeading className="ml-2 flex-1 text-lg font-bold" />
            <RangeCalendar.YearPickerTriggerIndicator />
          </RangeCalendar.YearPickerTrigger>
          <RangeCalendar.NavButton
            slot="previous"
            className="rounded-full p-2 outline-none hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 active:bg-sky-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          />
          <RangeCalendar.NavButton
            slot="next"
            className="rounded-full p-2 outline-none hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 active:bg-sky-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => (
              <RangeCalendar.HeaderCell className="text-center text-gray-600">
                {day}
              </RangeCalendar.HeaderCell>
            )}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>
            {(date) => (
              <RangeCalendar.Cell
                date={date}
                className={({
                  isSelected,
                  isFocusVisible,
                  isOutsideMonth,
                  isDisabled,
                  isInvalid,
                  isSelectionStart,
                  isSelectionEnd,
                }) =>
                  clsx(
                    'group box-content flex h-10 w-10 cursor-default items-center justify-center rounded-full text-sm outline-none',
                    isOutsideMonth && 'invisible',
                    isDisabled && !isInvalid && 'text-gray-400',
                    isFocusVisible && 'ring-2 ring-sky-600 ring-offset-2',
                    isSelected &&
                      !isInvalid &&
                      !isSelectionStart &&
                      !isSelectionEnd &&
                      'bg-sky-300',
                    isSelected && isInvalid && !isSelectionStart && !isSelectionEnd && 'bg-red-300',
                    (isSelectionStart || isSelectionEnd) &&
                      !isInvalid &&
                      'bg-sky-600 text-white hover:bg-sky-700',
                    (isSelectionStart || isSelectionEnd) &&
                      isInvalid &&
                      'bg-red-600 text-white hover:bg-red-700',
                    !isSelected && !isDisabled && 'hover:bg-sky-100',
                  )
                }
              />
            )}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
        <RangeCalendar.YearPickerGrid>
          <RangeCalendar.YearPickerGridBody>
            {({ year }) => <RangeCalendar.YearPickerCell year={year} />}
          </RangeCalendar.YearPickerGridBody>
        </RangeCalendar.YearPickerGrid>
      </RangeCalendar>
    </HeroDateRangePicker.Popover>
  </HeroDateRangePicker>
)

export type FieldDateRangePickerProps = DateRangePickerProps & {
  error?: string | string[]
}

export const FieldDateRangePicker = ({ error, ...props }: FieldDateRangePickerProps) => (
  <div className="space-y-2">
    <DateRangePicker {...props} />
  </div>
)
