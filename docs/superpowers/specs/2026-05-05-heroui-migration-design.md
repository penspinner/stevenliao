# HeroUI Migration: packages/ui

## Goal

Convert all components in `packages/ui` from react-aria-components to HeroUI React v3, replacing the `react-aria-components` dependency entirely with `@heroui/react` + `@heroui/styles`.

## Approach

Direct API-preserving migration — map each RAC component to its closest HeroUI equivalent while keeping existing component APIs stable where possible. The Toast component is the exception: adopt HeroUI's simpler global `toast()` API since the `UNSTABLE_ToastQueue` pattern is a clear regression.

## Component Mapping

### 1. Button (`src/button.tsx`)

- **Current**: Wraps RAC `Button` with custom `loading` and `variant?: 'primary' | 'secondary'` props. Shows `IndeterminateProgress` when loading.
- **HeroUI target**: `(Button)` from `@heroui/react`.
- **Changes**:
  - HeroUI Button has built-in `isPending` (replaces `loading`) and `variant` (primary/secondary/outline/ghost).
  - Remove custom loading spinner — HeroUI Button handles `isPending` natively with a built-in spinner.
  - Map existing `variant?: 'primary' | 'secondary'` to HeroUI's `variant` prop.
  - `onPress` instead of `onClick` (same as RAC).
  - Keep export name `Button`. Don't re-export the RAC wrapper — export HeroUI Button directly (or a thin wrapper if custom styling needed).

### 2. IndeterminateProgress (`src/indeterminate-progress.tsx`)

- **Current**: Wraps RAC `ProgressBar` with `isIndeterminate` and an animated SVG spinner circle. Used internally by `Button`.
- **HeroUI target**: `Spinner` from `@heroui/react`.
- **Changes**:
  - HeroUI's `Spinner` is a pre-built indeterminate spinner (animated circle). Perfect replacement.
  - After Button migration, verify no external consumers of `IndeterminateProgress`. If none, remove the file and its export. If any consumers exist, export as alias: `export { Spinner as IndeterminateProgress } from '@heroui/react'`.

### 3. FieldInput (`src/input.tsx`)

- **Current**: Wraps RAC `TextField`, `Input`, `Label`, `Text` (as description), `FieldError`. Custom error styling (red borders), valid state (sky-500 focus ring). Props: `leading`, `trailing` slots, `description`, custom `className`.
- **HeroUI target**: `TextField`, `Input`, `Label`, `Description`, `FieldError` from `@heroui/react`.
- **Changes**:
  - Same composition pattern. HeroUI's `TextField` handles label/description/error layout natively.
  - HeroUI's `Input` supports `variant` (primary/secondary). Error state via `isInvalid` + `FieldError`.
  - Keep export name `FieldInput` and the same props interface.
  - Remove custom error/valid styling CSS — HeroUI handles validation states with built-in variants.
  - `leading`/`trailing` slots map to HeroUI's slot props or compound slot pattern (check docs for exact API).

### 4. Toast (`src/toast.tsx`)

- **Current**: Module-level `UNSTABLE_ToastQueue` singleton (`toastQueue`), `ToastViewport` component rendering `UNSTABLE_ToastRegion`. Consumer places `<ToastViewport />` and calls `toastQueue.add({ description, type })`.
- **HeroUI target**: `Toast.Provider` + `toast()` from `@heroui/react`.
- **Changes** (breaking API change):
  - Export `ToastProvider` (wraps `<Toast.Provider placement="bottom-end" />`).
  - Re-export `toast` from `@heroui/react`.
  - Remove `toastQueue` and `ToastViewport` exports.
  - New API: `toast.success('Saved!')`, `toast.danger('Error!')` instead of `toastQueue.add({ type: 'success', description: ... })`.
  - No icon imports needed — HeroUI Toast has built-in status icons.

### 5. DatePicker / DateRangePicker / FieldDateRangePicker (`src/date-picker.tsx`)

- **Current**: Heavy RAC usage — `DatePicker`, `DateRangePicker`, `Calendar`, `CalendarGrid`, `CalendarGridBody`, `CalendarGridHeader`, `CalendarHeaderCell`, `CalendarCell`, `RangeCalendar`, `Popover`, `Dialog`, `Group`, `DateInput`, `DateSegment`, `Heading`, `Label`, `Button`. Custom calendar cell styling, prev/next month fading.
- **HeroUI target**: `DatePicker`, `DateRangePicker` from `@heroui/react`.
- **Changes**:
  - HeroUI DatePicker/DateRangePicker are compound components handling the full calendar, popover, date input, navigation.
  - Simplify to thin wrappers or direct re-exports.
  - Export `DatePicker`, `DateRangePicker`, `FieldDateRangePicker` (or drop FieldDateRangePicker if it's just an alias).
  - HeroUI has built-in CalendarIcon navigation Chevrons, error states. Remove custom icon imports if HeroUI provides them.
  - Keep type exports for `DatePickerProps`, `DateRangePickerProps`, `FieldDateRangePickerProps` if they remain meaningful.

### 6. Card (`src/card.tsx`)

- **Current**: Pure React compound component — `Card`, `Card.Link`, `Card.Title`, `Card.Description`, `Card.Cta`, `Card.Eyebrow`. Uses inline ChevronRightIcon SVG, polymorphic `as` prop.
- **HeroUI target**: `Card` compound component from `@heroui/react`.
- **Changes**:
  - Map sub-components: `Card.Link` → HeroUI `Card` (clickable card), `Card.Title` → `Card.Heading`, `Card.Description` → `Card.Body`, `Card.Cta` → `Card.Footer`.
  - Replace `Card.Eyebrow` with HeroUI `Badge` — it's the closest semantic match (small label above the heading).
  - Drop inline ChevronRightIcon — HeroUI has built-in arrow or use `@heroicons/react` (already a dependency).
  - Remove polymorphic `as` prop implementation — HeroUI handles element type via `render` prop if needed.

### 7. Container / OuterContainer / InnerContainer (`src/container.tsx`)

- **No change**: Pure layout `<div>` components with Tailwind max-width classes. No HeroUI equivalent needed. Keep as-is.

### 8. Section (`src/section.tsx`)

- **No change**: Two-column grid layout with label + content using `useId()` for `aria-labelledby`. No direct HeroUI equivalent needed. Keep as-is.

### 9. SimpleLayout (`src/simple-layout.tsx`)

- **No change**: Page layout wrapper composing `Container`. No HeroUI equivalent needed.

### 10. SocialIcons (`src/social-icons.tsx`)

- **No change**: Four pure SVG icon components. No HeroUI equivalent needed.

### 11. InputWithButtonForm (`src/input-with-button-form.tsx`)

- **Current**: Plain `<form>` with native `<input>` + `<button>`, accepts an SVG `Icon` component.
- **HeroUI target**: Use `Input` + `Button` from `@heroui/react` internally.
- **Changes**:
  - Replace native `<input>` with HeroUI `Input`.
  - Replace native `<button>` with HeroUI `Button`.
  - Keep the same component API (`InputWithButtonFormProps` with `Icon` prop).

## Dependency Changes

**package.json**:
- Add: `@heroui/react`, `@heroui/styles`
- Remove: `react-aria-components`
- Keep: `@heroicons/react`, `clsx`, `react`

**CSS** (`.storybook/tailwind.css`):
```css
@import "tailwindcss";
@import "@heroui/styles";
@source "../src";
/* dark variant + other config stays */
```

## Build

- tsdown ESM build unchanged — HeroUI is a standard npm dependency
- TypeScript resolves `@heroui/react` types natively
- `tsc --noEmit` in CI should pass after migration

## What Stays the Same

- `@heroicons/react` — used for social icons, card chevron, etc.
- `clsx` — classname utility
- tsdown build config
- Storybook setup (just add HeroUI CSS import)
- All pure React components (Container, Section, SimpleLayout, SocialIcons)

## Files to Create

- None. All changes are edits to existing files.

## Files to Remove (if unused after migration)

- `src/indeterminate-progress.tsx` + stories — if Button uses HeroUI's built-in spinner and nothing else imports it
