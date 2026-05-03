import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import * as React from 'react'
import {
  Button,
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar as AriaRangeCalendar,
} from 'react-aria-components'
import type {
  DatePickerProps as AriaDatePickerProps,
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
} from 'react-aria-components'

export type DatePickerProps<T extends DateValue> = AriaDatePickerProps<T> & {
  label?: React.ReactNode
}

export const DatePicker = <T extends DateValue>({ label, ...props }: DatePickerProps<T>) => (
  <AriaDatePicker {...props} className="relative inline-flex flex-col text-left">
    {label && <Label className="text-sm text-gray-800">{label}</Label>}
    <Group className="group flex text-sm">
      <DateFieldContainer>
        <DateInput className="flex">
          {(segment) => <StyledDateSegment segment={segment} />}
        </DateInput>
        <ValidationIcon />
      </DateFieldContainer>
      <CalendarTrigger />
    </Group>
    <Popover className="z-10 rounded bg-white p-8 shadow-lg">
      <Dialog>
        <Calendar />
      </Dialog>
    </Popover>
  </AriaDatePicker>
)

export type DateRangePickerProps<T extends DateValue> = AriaDateRangePickerProps<T> & {
  label?: React.ReactNode
}

export const DateRangePicker = <T extends DateValue>({
  label,
  ...props
}: DateRangePickerProps<T>) => (
  <AriaDateRangePicker {...props} className="relative inline-flex flex-col space-y-2 text-left">
    {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
    <Group className="flex text-sm">
      <DateFieldContainer>
        <DateInput slot="start" className="flex">
          {(segment) => <StyledDateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true" className="px-2">
          –
        </span>
        <DateInput slot="end" className="flex">
          {(segment) => <StyledDateSegment segment={segment} />}
        </DateInput>
        <ValidationIcon />
      </DateFieldContainer>
      <CalendarTrigger />
    </Group>
    <Popover className="z-10 rounded bg-white p-8 shadow-lg">
      <Dialog>
        <RangeCalendar />
      </Dialog>
    </Popover>
  </AriaDateRangePicker>
)

export type FieldDateRangePickerProps<T extends DateValue> = DateRangePickerProps<T> & {
  error?: string | string[]
}

export const FieldDateRangePicker = <T extends DateValue>({
  error,
  ...props
}: FieldDateRangePickerProps<T>) => (
  <div className="space-y-2">
    <DateRangePicker {...props} />
  </div>
)

const DateFieldContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex rounded-l border border-gray-300 bg-white px-3 py-2 pr-10 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
    {children}
  </div>
)

const ValidationIcon = () => (
  <ExclamationCircleIcon
    aria-hidden="true"
    className="invisible absolute right-1 h-6 w-6 text-red-500 group-data-[invalid]:visible"
  />
)

const CalendarTrigger = () => (
  <Button className="-ml-px rounded-r border border-gray-300 bg-gray-50 px-2 outline-none hover:bg-gray-100 focus-visible:z-10 focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 active:border-gray-400 active:bg-gray-200">
    <CalendarIcon className="h-5 w-5 text-gray-700" />
  </Button>
)

const StyledDateSegment = ({
  segment,
}: {
  segment: Parameters<NonNullable<React.ComponentProps<typeof DateInput>['children']>>[0]
}) => (
  <DateSegment
    segment={segment}
    className="group box-content rounded-sm px-0.5 text-right text-gray-800 tabular-nums outline-none focus:bg-sky-600 focus:text-white data-[placeholder]:text-gray-500 data-[placeholder]:italic data-[type=literal]:text-gray-500"
  />
)

const Calendar = () => (
  <AriaCalendar className="inline-block space-y-4 text-gray-800">
    <CalendarHeader />
    <CalendarGrid>
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className="text-center text-gray-600">{day}</CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>{(date) => <CalendarCell date={date} />}</CalendarGridBody>
    </CalendarGrid>
  </AriaCalendar>
)

const RangeCalendar = () => (
  <AriaRangeCalendar className="inline-block space-y-4 text-gray-800">
    <CalendarHeader />
    <CalendarGrid>
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className="text-center text-gray-600">{day}</CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>{(date) => <CalendarCell date={date} />}</CalendarGridBody>
    </CalendarGrid>
  </AriaRangeCalendar>
)

const CalendarHeader = () => (
  <header className="flex items-center">
    <Heading className="ml-2 flex-1 text-lg font-bold" />
    <CalendarNavButton slot="previous">
      <ChevronLeftIcon className="h-6 w-6" />
    </CalendarNavButton>
    <CalendarNavButton slot="next">
      <ChevronRightIcon className="h-6 w-6" />
    </CalendarNavButton>
  </header>
)

const CalendarNavButton = ({
  slot,
  children,
}: {
  slot: 'previous' | 'next'
  children: React.ReactNode
}) => (
  <Button
    slot={slot}
    className="rounded-full p-2 outline-none hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 active:bg-sky-200 disabled:text-gray-400 disabled:hover:bg-transparent"
  >
    {children}
  </Button>
)

type CalendarCellProps = React.ComponentProps<typeof AriaCalendarCell>

const CalendarCell = (props: CalendarCellProps) => (
  <AriaCalendarCell
    {...props}
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
        isSelected && !isInvalid && !isSelectionStart && !isSelectionEnd && 'bg-sky-300',
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
)
