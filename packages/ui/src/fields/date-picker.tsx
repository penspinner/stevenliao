import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  getDayOfWeek,
  getWeeksInMonth,
  GregorianCalendar,
  isSameDay,
} from '@internationalized/date'
import * as Popover from '@radix-ui/react-popover'
import { useButton } from '@react-aria/button'
import type {
  AriaCalendarCellProps,
  AriaCalendarGridProps,
  CalendarProps,
  RangeCalendarProps,
} from '@react-aria/calendar'
import {
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useRangeCalendar,
} from '@react-aria/calendar'
import type { AriaDateFieldProps } from '@react-aria/datepicker'
import {
  useDateField,
  useDatePicker,
  useDateRangePicker,
  useDateSegment,
} from '@react-aria/datepicker'
import { useFocusRing } from '@react-aria/focus'
import { useLocale } from '@react-aria/i18n'
import { mergeProps } from '@react-aria/utils'
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { useCalendarState, useRangeCalendarState } from '@react-stately/calendar'
import type {
  DateFieldState,
  DatePickerStateOptions,
  DateRangePickerStateOptions,
  DateSegment,
} from '@react-stately/datepicker'
import {
  useDateFieldState,
  useDatePickerState,
  useDateRangePickerState,
} from '@react-stately/datepicker'
import type { AriaButtonProps } from '@react-types/button'
import type {
  AriaDatePickerProps,
  AriaDateRangePickerProps,
  DatePickerBase,
  DateValue,
} from '@react-types/datepicker'
import clsx from 'clsx'
import * as React from 'react'

import { Field } from './field'

type DateRangePickerProps = DateRangePickerStateOptions & AriaDateRangePickerProps<DateValue>

export const DateRangePicker = (props: DateRangePickerProps) => {
  const state = useDateRangePickerState(props)
  const ref = React.useRef<HTMLDivElement>(null)
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref)
  return (
    <Popover.Root open={state.isOpen} onOpenChange={state.setOpen}>
      <div className="relative inline-flex flex-col space-y-2 text-left">
        {props.label && (
          <div {...labelProps} className="text-sm font-medium text-gray-700">
            {props.label}
          </div>
        )}
        <div {...groupProps} ref={ref} className="flex text-sm">
          <DateFieldContainer>
            <DateField {...startFieldProps} />
            <span aria-hidden="true" className="px-2">
              –
            </span>
            <DateField {...endFieldProps} />
            {state.validationState === 'invalid' && (
              <ExclamationCircleIcon className="absolute right-1 h-6 w-6 text-red-500" />
            )}
          </DateFieldContainer>
          <CalendarPopoverTrigger {...buttonProps} />
        </div>
        <Popover.Portal className="z-10">
          <Popover.Content {...dialogProps} className="rounded bg-white p-8 shadow-lg">
            <Popover.Arrow className="fill-white" />
            <RangeCalendar {...calendarProps} />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  )
}

export type FieldDateRangePickerProps = DateRangePickerProps & {
  error?: string | string[]
  label?: React.ReactNode
}

export const FieldDateRangePicker = ({ error, label, ...props }: FieldDateRangePickerProps) => {
  return (
    <Field error={error}>
      <div className="space-y-2">
        <DateRangePicker {...props} />
        <Field.Error className="text-sm text-red-600">
          <Field.ErrorText />
        </Field.Error>
      </div>
    </Field>
  )
}

type DatePickerProps = DatePickerStateOptions<DateValue> & AriaDatePickerProps<DateValue>

export const DatePicker = (props: DatePickerProps) => {
  const state = useDatePickerState(props)
  const ref = React.useRef<HTMLDivElement>(null)
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } =
    useDatePicker(props, state, ref)
  const { onPress, ...calendarButtonProps } = buttonProps
  return (
    <Popover.Root open={state.isOpen} onOpenChange={state.setOpen}>
      <div className="relative inline-flex flex-col text-left">
        {props.label && (
          <div {...labelProps} className="text-sm text-gray-800">
            {props.label}
          </div>
        )}
        <div {...groupProps} ref={ref} className="group flex text-sm">
          <DateFieldContainer>
            <DateField {...fieldProps} />
            {state.validationState === 'invalid' && (
              <ExclamationCircleIcon className="absolute right-1 h-6 w-6 text-red-500" />
            )}
          </DateFieldContainer>
          <CalendarPopoverTrigger {...calendarButtonProps} />
        </div>
        <Popover.Portal>
          <Popover.Content {...dialogProps} className="rounded bg-white p-8 shadow-lg">
            <Popover.Arrow className="fill-white" />
            <Calendar {...calendarProps} />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  )
}

export type FieldDatePickerProps = DatePickerProps & {
  error?: string | string[]
  label?: React.ReactNode
}

export const FieldDatePicker = ({ error, label, ...props }: FieldDatePickerProps) => {
  return (
    <Field error={error}>
      <div className="space-y-2">
        <DatePicker {...props} />
        <Field.Error className="text-sm text-red-600">
          <Field.ErrorText />
        </Field.Error>
      </div>
    </Field>
  )
}

const DateFieldContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'relative flex rounded-l border border-gray-300 bg-white px-3 py-2 pr-10 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500',
        className,
      )}
      {...props}
    />
  )
}

const CalendarPopoverTrigger = (props: AriaButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  return (
    <Popover.Trigger
      className={clsx(
        '-ml-px rounded-r border border-gray-300 bg-gray-50 px-2 outline-none hover:bg-gray-100 focus-visible:z-10 focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 active:border-gray-400 active:bg-gray-200',
      )}
      ref={ref}
      {...buttonProps}
    >
      <CalendarIcon className="h-5 w-5 text-gray-700" />
    </Popover.Trigger>
  )
}

const DateField = <T extends DateValue>(props: AriaDateFieldProps<T>) => {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })
  const ref = React.useRef<HTMLDivElement>(null)
  const { fieldProps } = useDateField(props, state, ref)
  return (
    <div {...fieldProps} ref={ref} className="flex">
      {state.segments.map((segment, i) => (
        <DateFieldSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

type DateFieldSegmentProps = DatePickerBase<DateValue> & {
  segment: DateSegment
  state: DateFieldState
}

const DateFieldSegment = ({ segment, state }: DateFieldSegmentProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)
  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth: segment.maxValue != null ? String(segment.maxValue).length + 'ch' : undefined,
      }}
      className={clsx(
        'group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-sky-600 focus:text-white',
        !segment.isEditable ? 'text-gray-500' : 'text-gray-800',
      )}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="pointer-events-none block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : 'hidden',
          height: segment.isPlaceholder ? undefined : 0,
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  )
}

const Calendar = (props: CalendarProps<DateValue>) => {
  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state)
  return (
    <div {...calendarProps} className="inline-block space-y-4 text-gray-800">
      <div className="flex items-center">
        <h2 className="ml-2 flex-1 text-lg font-bold">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

const RangeCalendar = <T extends DateValue>(props: RangeCalendarProps<T>) => {
  const { locale } = useLocale()
  // @ts-expect-error TODO
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  })
  const ref = React.useRef<HTMLDivElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(
    props,
    state,
    ref,
  )
  return (
    <div {...calendarProps} ref={ref} className="inline-block space-y-4 text-gray-800">
      <div className="flex items-center">
        <h2 className="ml-2 flex-1 text-xl font-bold">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

const createCalendar = (name: string) => {
  switch (name) {
    case 'gregory':
      return new GregorianCalendar()
    default:
      throw new Error(`Unsupported calendar ${name}`)
  }
}

type CalendarGridProps = AriaCalendarGridProps & {
  state: CalendarState | RangeCalendarState
}

const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)
  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)
  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center" key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? <CalendarCell key={i} state={state} date={date} /> : <td key={i} />,
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type CalendarCellProps = AriaCalendarCellProps & {
  state: CalendarState | RangeCalendarState
}

const CalendarCell = ({ state, ...props }: CalendarCellProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell(props, state, ref)

  const highlightedRange = 'highlightedRange' in state && state.highlightedRange
  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart = highlightedRange
    ? isSameDay(props.date, highlightedRange.start)
    : isSelected
  const isSelectionEnd = highlightedRange ? isSameDay(props.date, highlightedRange.end) : isSelected

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale()
  const dayOfWeek = getDayOfWeek(props.date, locale)
  const isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || props.date.day === 1)
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      props.date.day === props.date.calendar.getDaysInMonth(props.date))

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <td {...cellProps} className={clsx('relative py-0.5', isFocusVisible ? 'z-10' : 'z-0')}>
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clsx(
          'group h-10 w-10 outline-none',
          isRoundedLeft && 'rounded-l-full',
          isRoundedRight && 'rounded-r-full',
          isSelected && (isInvalid ? 'bg-red-300' : 'bg-sky-300'),
          isDisabled && 'disabled',
        )}
      >
        <div
          className={clsx(
            'flex h-full w-full cursor-default items-center justify-center rounded-full',
            isDisabled && !isInvalid && 'text-gray-400',
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible && 'group-focus:z-2 ring-2 ring-sky-600 ring-offset-2',
            // Darker selection background for the start and end.
            (isSelectionStart || isSelectionEnd) &&
              (isInvalid
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-sky-600 text-white hover:bg-sky-700'),
            // Hover state for cells in the middle of the range.
            isSelected &&
              !isDisabled &&
              !(isSelectionStart || isSelectionEnd) &&
              (isInvalid ? 'hover:bg-red-400' : 'hover:bg-sky-400'),
            // Hover state for non-selected cells.
            !isSelected && !isDisabled && 'hover:bg-sky-100',
          )}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  )
}

const CalendarButton = (props: AriaButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  const { focusProps, isFocusVisible } = useFocusRing()
  return (
    <button
      className={clsx(
        'rounded-full p-2 outline-none',
        props.isDisabled ? 'text-gray-400' : 'hover:bg-sky-100 active:bg-sky-200',
        isFocusVisible && 'ring-2 ring-sky-600 ring-offset-2',
        'focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2',
      )}
      ref={ref}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </button>
  )
}
