# HeroUI Migration: packages/ui — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all `packages/ui` components from react-aria-components to HeroUI React v3, replacing the `react-aria-components` dependency entirely.

**Architecture:** Direct API-preserving migration — map each RAC component to its HeroUI equivalent while keeping existing component public APIs stable. Pure React layout components (Container, Section, SimpleLayout, SocialIcons) stay unchanged since HeroUI has no equivalents.

**Tech Stack:** HeroUI React v3 (`@heroui/react`, `@heroui/styles`), Tailwind CSS v4, React 19, tsdown for ESM build, Storybook 10 for development/testing.

---

## File Structure

| File | Action |
|------|--------|
| `packages/ui/package.json` | Modify — swap react-aria-components for @heroui/react + @heroui/styles |
| `packages/ui/.storybook/tailwind.css` | Modify — add `@import "@heroui/styles"` |
| `packages/ui/src/button.tsx` | Modify — replace RAC Button with HeroUI Button |
| `packages/ui/src/indeterminate-progress.tsx` | Delete — replaced by HeroUI Button's built-in `isPending` |
| `packages/ui/src/input.tsx` | Modify — replace RAC TextField/Input/Label/FieldError with HeroUI |
| `packages/ui/src/toast.tsx` | Modify — replace RAC Toast with HeroUI Toast.Provider + toast() |
| `packages/ui/src/date-picker.tsx` | Modify — replace RAC DatePicker/DateRangePicker with HeroUI compounds |
| `packages/ui/src/card.tsx` | Modify — replace custom Card with HeroUI Card compound |
| `packages/ui/src/input-with-button-form.tsx` | Modify — replace native input/button with HeroUI Input + Button |
| `packages/ui/src/index.ts` | Modify — remove indeterminate-progress export |
| `packages/ui/src/indeterminate-progress.stories.tsx` | Delete |
| `packages/ui/src/toast.stories.tsx` | Modify — update for new Toast API |
| `packages/ui/src/button.stories.tsx` | Modify — update for HeroUI Button props |
| `packages/ui/src/input.stories.tsx` | Modify — update for HeroUI TextField API |
| `packages/ui/src/date-picker.stories.tsx` | Modify — update for HeroUI DatePicker |
| `packages/ui/src/card.stories.tsx` | Modify — update for HeroUI Card compound |
| `packages/ui/src/input-with-button-form.stories.tsx` | Modify — update for HeroUI internals |

---

### Task 1: Install HeroUI dependencies and update CSS

**Files:**
- Modify: `packages/ui/package.json`
- Modify: `packages/ui/.storybook/tailwind.css`

- [ ] **Step 1: Add HeroUI deps, remove RAC**

```bash
bun --filter ui add @heroui/react @heroui/styles
```

- [ ] **Step 2: Remove react-aria-components**

```bash
bun --filter ui remove react-aria-components
```

- [ ] **Step 3: Verify package.json looks correct**

Run: `cat packages/ui/package.json | grep -E '"(@heroui|react-aria|@heroicons)"'`

Expected: Shows `@heroui/react`, `@heroui/styles`, `@heroicons/react`. Does NOT show `react-aria-components`.

- [ ] **Step 4: Add HeroUI CSS import**

Edit `packages/ui/.storybook/tailwind.css` — replace the entire file:

```css
@import 'tailwindcss';
@import '@heroui/styles';
@source './**/*.tsx';

@custom-variant dark (&:where(.dark, .dark *));
```

- [ ] **Step 5: Commit**

```bash
git add packages/ui/package.json packages/ui/.storybook/tailwind.css
git commit -m "deps: replace react-aria-components with @heroui/react + @heroui/styles"
```

---

### Task 2: Convert Button to HeroUI

**Files:**
- Modify: `packages/ui/src/button.tsx`

- [ ] **Step 1: Replace button.tsx**

Write `packages/ui/src/button.tsx`:

```tsx
import type { ComponentProps } from 'react'
import { Button as HeroButton } from '@heroui/react'

type ButtonProps = Omit<ComponentProps<typeof HeroButton>, 'variant'> & {
  variant?: 'primary' | 'secondary'
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <HeroButton variant={variant} {...props} />
}
```

- [ ] **Step 2: Verify typecheck passes on button**

```bash
bun --filter ui run check:ts 2>&1 | head -30
```

Expected: No errors in button.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/button.tsx
git commit -m "refactor(ui): convert Button to HeroUI"
```

---

### Task 3: Remove IndeterminateProgress

**Files:**
- Delete: `packages/ui/src/indeterminate-progress.tsx`
- Delete: `packages/ui/src/indeterminate-progress.stories.tsx`
- Modify: `packages/ui/src/index.ts`

- [ ] **Step 1: Delete files**

```bash
rm packages/ui/src/indeterminate-progress.tsx
rm packages/ui/src/indeterminate-progress.stories.tsx
```

- [ ] **Step 2: Remove from barrel export**

Edit `packages/ui/src/index.ts` — remove the line:
```
export * from './indeterminate-progress'
```

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/indeterminate-progress.tsx packages/ui/src/indeterminate-progress.stories.tsx packages/ui/src/index.ts
git commit -m "refactor(ui): remove IndeterminateProgress, replaced by HeroUI Button isPending"
```

---

### Task 4: Convert FieldInput to HeroUI TextField

**Files:**
- Modify: `packages/ui/src/input.tsx`

- [ ] **Step 1: Replace input.tsx**

Write `packages/ui/src/input.tsx`:

```tsx
import { Description, FieldError, Input, Label, TextField } from '@heroui/react'
import type { ComponentProps } from 'react'

export type FieldInputProps = ComponentProps<typeof Input> & {
  error?: string | string[]
  description?: string
  label: React.ReactNode
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const FieldInput = ({
  description,
  error,
  label,
  leading,
  trailing,
  className,
  ...props
}: FieldInputProps) => {
  return (
    <TextField className={className} isInvalid={!!error}>
      <Label>{label}</Label>
      <div className="relative">
        {leading && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            {leading}
          </div>
        )}
        <Input
          {...props}
          className={leading ? 'pl-10' : undefined}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div>
        )}
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{Array.isArray(error) ? error.join(' ') : error}</FieldError>
    </TextField>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
bun --filter ui run check:ts 2>&1 | head -30
```

Expected: No errors in input.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/input.tsx
git commit -m "refactor(ui): convert FieldInput to HeroUI TextField"
```

---

### Task 5: Convert Toast to HeroUI Toast.Provider + toast()

**Files:**
- Modify: `packages/ui/src/toast.tsx`

- [ ] **Step 1: Replace toast.tsx**

Write `packages/ui/src/toast.tsx`:

```tsx
import { Toast, toast } from '@heroui/react'

export { toast }

export const ToastProvider = () => {
  return <Toast.Provider placement="bottom-end" />
}
```

- [ ] **Step 2: Verify typecheck**

```bash
bun --filter ui run check:ts 2>&1 | head -30
```

Expected: No errors in toast.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/toast.tsx
git commit -m "refactor(ui): convert Toast to HeroUI Toast.Provider + toast()"
```

---

### Task 6: Convert DatePicker and DateRangePicker to HeroUI

**Files:**
- Modify: `packages/ui/src/date-picker.tsx`

- [ ] **Step 1: Replace date-picker.tsx**

Write `packages/ui/src/date-picker.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify typecheck**

```bash
bun --filter ui run check:ts 2>&1 | head -50
```

Expected: No errors in date-picker.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/date-picker.tsx
git commit -m "refactor(ui): convert DatePicker/DateRangePicker to HeroUI"
```

---

### Task 7: Convert Card to HeroUI Card compound

**Files:**
- Modify: `packages/ui/src/card.tsx`

- [ ] **Step 1: Replace card.tsx**

Write `packages/ui/src/card.tsx`:

```tsx
import { Badge, Card as HeroCard, Link } from '@heroui/react'
import type { ComponentProps } from 'react'

export const Card = ({
  children,
  className,
  ...props
}: ComponentProps<typeof HeroCard>) => {
  return (
    <HeroCard className={className} {...props}>
      {children}
    </HeroCard>
  )
}

Card.Header = HeroCard.Header
Card.Title = HeroCard.Title
Card.Description = HeroCard.Description
Card.Content = HeroCard.Content
Card.Footer = HeroCard.Footer

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <Card.Footer>
      <span className="flex items-center text-sm font-medium text-teal-500">
        {children}
        <svg
          className="ml-1 h-4 w-4 stroke-current"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M6.75 5.75 9.25 8l-2.5 2.25"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Card.Footer>
  )
}

Card.Link = function CardLink({
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return <Link {...props}>{children}</Link>
}

Card.Eyebrow = function CardEyebrow({
  className,
  children,
  ...props
}: ComponentProps<typeof Badge>) {
  return (
    <Badge className={className} {...props}>
      {children}
    </Badge>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
bun --filter ui run check:ts 2>&1 | head -30
```

Expected: No errors in card.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/card.tsx
git commit -m "refactor(ui): convert Card to HeroUI Card compound"
```

---

### Task 8: Convert InputWithButtonForm to use HeroUI Input + Button

**Files:**
- Modify: `packages/ui/src/input-with-button-form.tsx`

- [ ] **Step 1: Replace input-with-button-form.tsx**

Write `packages/ui/src/input-with-button-form.tsx`:

```tsx
import { Button, Input } from '@heroui/react'
import type React from 'react'

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
    <form className="flex w-full sm:max-w-xs" onSubmit={onFormSubmit}>
      <Input
        {...props}
        className="rounded-r-none"
        startContent={<Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
      />
      <Button className="rounded-l-none" type="submit">
        {buttonLabel}
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
bun --filter ui run check:ts 2>&1 | head -30
```

Expected: No errors in input-with-button-form.tsx.

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/input-with-button-form.tsx
git commit -m "refactor(ui): convert InputWithButtonForm to use HeroUI Input + Button"
```

---

### Task 9: Update Storybook stories

**Files:**
- Modify: `packages/ui/src/button.stories.tsx`
- Modify: `packages/ui/src/toast.stories.tsx`
- Modify: `packages/ui/src/input.stories.tsx`
- Modify: `packages/ui/src/date-picker.stories.tsx`
- Modify: `packages/ui/src/card.stories.tsx`
- Modify: `packages/ui/src/input-with-button-form.stories.tsx`

- [ ] **Step 1: Update button.stories.tsx**

Write `packages/ui/src/button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { Button } from './button'

const meta = {
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
    await expect(button).not.toBeDisabled()
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
  },
}

export const Pending: Story = {
  args: {
    isPending: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeDisabled()
  },
}
```

- [ ] **Step 2: Update toast.stories.tsx**

Write `packages/ui/src/toast.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { Button } from './button'
import { ToastProvider, toast } from './toast'

const meta = {
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-2">
        <Button onPress={() => toast.success('Operation completed successfully.')}>
          Show Success Toast
        </Button>
        <Button onPress={() => toast.danger('Something went wrong.')}>
          Show Error Toast
        </Button>
      </div>
    </>
  ),
  play: async ({ canvas }) => {
    const successBtn = canvas.getByText('Show Success Toast')
    const errorBtn = canvas.getByText('Show Error Toast')

    await userEvent.click(successBtn)
    await expect(canvas.getByText('Operation completed successfully.')).toBeVisible()

    await userEvent.click(errorBtn)
    await expect(canvas.getByText('Something went wrong.')).toBeVisible()
  },
}
```

- [ ] **Step 3: Update input.stories.tsx**

Write `packages/ui/src/input.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { FieldInput, type FieldInputProps } from './input'

const meta = {
  component: FieldInput,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  } satisfies Partial<FieldInputProps>,
} satisfies Meta<typeof FieldInput>

export default meta

export const Default: StoryObj = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email')
    await expect(input).toBeVisible()
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
  },
}

export const WithDescription: StoryObj = {
  args: {
    description: 'We will never share your email.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('We will never share your email.')).toBeVisible()
  },
}

export const WithError: StoryObj = {
  args: {
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Please enter a valid email address.')).toBeVisible()
  },
}

export const Disabled: StoryObj = {
  args: {
    isDisabled: true,
    defaultValue: 'user@example.com',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeDisabled()
  },
}
```

Note: HeroUI TextField uses `isDisabled` not `disabled`.

- [ ] **Step 4: Update date-picker.stories.tsx**

Write `packages/ui/src/date-picker.stories.tsx`:

```tsx
import { getLocalTimeZone, today } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { DatePicker } from './date-picker'

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Pick a date',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pick a date')).toBeVisible()
  },
}

export const WithValue: Story = {
  args: {
    label: 'Event date',
    defaultValue: today(getLocalTimeZone()),
  },
}
```

- [ ] **Step 5: Update card.stories.tsx**

Write `packages/ui/src/card.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Card } from './card'

const meta = {
  component: Card,
} satisfies Meta<typeof Card>

export default meta

export const Default: StoryObj = {
  render: () => (
    <Card className="max-w-[400px]">
      <Card.Header>
        <Card.Title>Building an accessible component library</Card.Title>
        <Card.Description>
          Learn how to create reusable, accessible UI components using HeroUI React v3 and Tailwind CSS.
        </Card.Description>
      </Card.Header>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Building an accessible component library')).toBeVisible()
    await expect(canvas.getByText(/reusable, accessible/)).toBeVisible()
    await expect(canvas.getByText('Read article')).toBeVisible()
  },
}

export const WithEyebrow: StoryObj = {
  render: () => (
    <Card className="max-w-[400px]">
      <Card.Eyebrow>Engineering</Card.Eyebrow>
      <Card.Header>
        <Card.Title>Understanding state machines</Card.Title>
        <Card.Description>
          State machines are a powerful pattern for managing complex UI state in React applications.
        </Card.Description>
      </Card.Header>
      <Card.Cta>Read more</Card.Cta>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Engineering')).toBeVisible()
    await expect(canvas.getByText('Understanding state machines')).toBeVisible()
  },
}

export const WithoutLink: StoryObj = {
  render: () => (
    <Card className="max-w-[400px]">
      <Card.Header>
        <Card.Title>Static card</Card.Title>
        <Card.Description>
          This card has no link — the title renders as a plain heading.
        </Card.Description>
      </Card.Header>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Static card')).toBeVisible()
  },
}
```

- [ ] **Step 6: Update input-with-button-form.stories.tsx**

Write `packages/ui/src/input-with-button-form.stories.tsx`:

```tsx
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'

import { InputWithButtonForm } from './input-with-button-form'

const meta = {
  component: InputWithButtonForm,
  args: {
    placeholder: 'Email address',
    type: 'email',
    buttonLabel: 'Subscribe',
    Icon: EnvelopeIcon,
    onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    },
  },
} satisfies Meta<typeof InputWithButtonForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Email address')
    await expect(input).toBeVisible()
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
    await expect(canvas.getByText('Subscribe')).toBeVisible()
  },
}
```

- [ ] **Step 7: Verify typecheck after all story updates**

```bash
bun --filter ui run check:ts 2>&1 | head -50
```

Expected: No errors.

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/button.stories.tsx packages/ui/src/toast.stories.tsx packages/ui/src/input.stories.tsx packages/ui/src/date-picker.stories.tsx packages/ui/src/card.stories.tsx packages/ui/src/input-with-button-form.stories.tsx
git commit -m "test(ui): update Storybook stories for HeroUI migration"
```

---

### Task 10: Build and full typecheck

**Files:** None (verification only)

- [ ] **Step 1: Full TypeScript check**

```bash
bun --filter ui run check:ts
```

Expected: No errors across the entire package.

- [ ] **Step 2: Build the package**

```bash
bun --filter ui run build
```

Expected: Build succeeds, `dist/index.mjs` and `dist/index.d.mts` are produced without RAC references.

- [ ] **Step 3: Verify dist has no RAC imports**

```bash
rg 'react-aria-components' packages/ui/dist/index.mjs
```

Expected: No matches (exit code 1).

- [ ] **Step 4: Verify dist has HeroUI imports**

```bash
rg '@heroui' packages/ui/dist/index.mjs
```

Expected: Has matches for `@heroui/react`.

- [ ] **Step 5: Commit**

```bash
git add packages/ui/dist/
git commit -m "build(ui): rebuild with HeroUI"
```
