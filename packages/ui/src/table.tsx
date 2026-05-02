import clsx from 'clsx'
import {
  Cell as AriaCell,
  Column as AriaColumn,
  composeRenderProps,
  Row as AriaRow,
  Table as AriaTable,
  TableBody,
  TableHeader as AriaTableHeader,
} from 'react-aria-components'
import type {
  CellProps,
  ColumnProps,
  RowProps,
  TableHeaderProps,
  TableProps,
} from 'react-aria-components'

export const Table = ({ className, ...props }: TableProps) => (
  <div className="overflow-x-auto">
    <AriaTable
      {...props}
      className={composeRenderProps(className, (cn) =>
        clsx('min-w-full divide-y divide-gray-200', cn),
      )}
    />
  </div>
)

export const TableHeader = <T extends object>({ className, ...props }: TableHeaderProps<T>) => (
  <AriaTableHeader className={clsx('bg-gray-100', className)} {...props} />
)

export const Column = ({ className, ...props }: ColumnProps) => (
  <AriaColumn
    {...props}
    className={composeRenderProps(className, (cn) =>
      clsx(
        'whitespace-nowrap px-4 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-sky-500',
        cn,
      ),
    )}
  />
)

export const Row = <T extends object>({ className, ...props }: RowProps<T>) => (
  <AriaRow
    {...props}
    className={composeRenderProps(className, (cn) =>
      clsx(
        'outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-sky-500',
        cn,
      ),
    )}
  />
)

export const Cell = ({ className, ...props }: CellProps) => (
  <AriaCell
    {...props}
    className={composeRenderProps(className, (cn) =>
      clsx(
        'whitespace-nowrap px-4 py-4 text-sm text-gray-800 outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-sky-500',
        cn,
      ),
    )}
  />
)

export { TableBody }
