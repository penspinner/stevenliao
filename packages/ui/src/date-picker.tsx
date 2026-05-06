import {
  Calendar,
  DateField,
  DatePicker as HeroDatePicker,
  DateRangePicker as HeroDateRangePicker,
  Label,
  RangeCalendar,
} from '@heroui/react'
import type { ComponentProps } from 'react'

export type DatePickerProps = ComponentProps<typeof HeroDatePicker>

export const DatePicker = ({
  label,
  ...props
}: DatePickerProps & { label?: React.ReactNode }) => (
  <HeroDatePicker {...props}>
    {label && <Label>{label}</Label>}
    <DateField.Group fullWidth>
      <DateField.Input>
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <HeroDatePicker.Trigger>
          <HeroDatePicker.TriggerIndicator />
        </HeroDatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <HeroDatePicker.Popover>
      <Calendar aria-label="Event date">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading />
            <Calendar.YearPickerTriggerIndicator />
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
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
  <HeroDateRangePicker {...props}>
    {label && <Label>{label}</Label>}
    <DateField.Group fullWidth>
      <DateField.Input slot="start">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <HeroDateRangePicker.RangeSeparator />
      <DateField.Input slot="end">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <HeroDateRangePicker.Trigger>
          <HeroDateRangePicker.TriggerIndicator />
        </HeroDateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <HeroDateRangePicker.Popover>
      <RangeCalendar aria-label="Trip dates">
        <RangeCalendar.Header>
          <RangeCalendar.YearPickerTrigger>
            <RangeCalendar.YearPickerTriggerHeading />
            <RangeCalendar.YearPickerTriggerIndicator />
          </RangeCalendar.YearPickerTrigger>
          <RangeCalendar.NavButton slot="previous" />
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>{(date) => <RangeCalendar.Cell date={date} />}</RangeCalendar.GridBody>
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

export const FieldDateRangePicker = ({
  error,
  ...props
}: FieldDateRangePickerProps) => (
  <div className="space-y-2">
    <DateRangePicker {...props} />
  </div>
)
