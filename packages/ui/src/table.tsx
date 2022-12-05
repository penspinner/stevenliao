import { useFocusRing } from '@react-aria/focus'
import { GridRowProps } from '@react-aria/grid'
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
} from '@react-aria/table'
import { mergeProps } from '@react-aria/utils'
import { TableState, TableStateProps, useTableState } from '@react-stately/table'
import clsx from 'clsx'
import * as React from 'react'

type TableRowGroupProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  as: 'thead' | 'tbody' | 'tfoot'
}

export const TableRowGroup = ({ as: Component, ...props }: TableRowGroupProps) => {
  const tableRowGroupAria = useTableRowGroup()
  return <Component {...tableRowGroupAria.rowGroupProps} {...props} />
}

type TableRowProps<T> = React.HTMLAttributes<HTMLTableRowElement> & {
  gridRowProps: GridRowProps<T>
  state: TableState<T>
}

export const TableRow = <T extends object>({
  className,
  gridRowProps,
  state,
  ...props
}: TableRowProps<T>) => {
  const ref = React.useRef<HTMLTableRowElement>(null)
  const tableRowAria = useTableRow(gridRowProps, state, ref)
  const focusRing = useFocusRing()
  return (
    <tr
      {...mergeProps(tableRowAria.rowProps, focusRing.focusProps)}
      {...props}
      className={clsx(
        'outline-none',
        focusRing.isFocusVisible && 'ring-2 ring-inset ring-sky-500',
        className,
      )}
      ref={ref}
    />
  )
}

export const TableHeaderRow = <T extends object>({
  gridRowProps,
  state,
  ...props
}: TableRowProps<T>) => {
  const ref = React.useRef<HTMLTableRowElement>(null)
  const tableHeaderRowAria = useTableHeaderRow(gridRowProps, state, ref)
  return <tr {...tableHeaderRowAria.rowProps} {...props} />
}

type TableColumnHeaderProps<T> = React.ThHTMLAttributes<HTMLTableCellElement> & {
  columnHeaderProps: Parameters<typeof useTableColumnHeader>[0]
  state: TableState<T>
}

export const TableColumnHeader = <T extends object>({
  className,
  columnHeaderProps,
  state,
  ...props
}: TableColumnHeaderProps<T>) => {
  const ref = React.useRef<HTMLTableCellElement>(null)
  const tableColumnHeaderAria = useTableColumnHeader(columnHeaderProps, state, ref)
  const focusRing = useFocusRing()
  return (
    <th
      {...mergeProps(tableColumnHeaderAria.columnHeaderProps, focusRing.focusProps)}
      colSpan={columnHeaderProps.node.colspan}
      className={clsx(
        'outline-none',
        focusRing.isFocusVisible && 'ring-2 ring-inset ring-sky-500',
        className,
      )}
      ref={ref}
      {...props}
    >
      {columnHeaderProps.node.rendered}
    </th>
  )
}

type TableCellProps<T> = React.TdHTMLAttributes<HTMLTableCellElement> & {
  useTableCellProps: Parameters<typeof useTableCell>[0]
  state: TableState<T>
}

export const TableCell = <T extends object>({
  className,
  useTableCellProps,
  state,
  ...props
}: TableCellProps<T>) => {
  const ref = React.useRef<HTMLTableCellElement>(null)
  const tableCellAria = useTableCell(useTableCellProps, state, ref)
  const focusRing = useFocusRing()
  return (
    <td
      {...mergeProps(tableCellAria.gridCellProps, focusRing.focusProps)}
      {...props}
      className={clsx(
        'outline-none',
        focusRing.isFocusVisible && 'ring-2 ring-inset ring-sky-500',
        className,
      )}
      ref={ref}
    >
      {useTableCellProps.node.rendered}
    </td>
  )
}

export type TableProps<T> = TableStateProps<T> &
  React.TableHTMLAttributes<HTMLTableElement> & {
    useTableProps?: Parameters<typeof useTable>[0]
  }

export const Table = <T extends object>({ className, useTableProps, ...props }: TableProps<T>) => {
  const tableRef = React.useRef<HTMLTableElement>(null)
  const tableState = useTableState(props)
  const table = useTable({ ...useTableProps, ...props }, tableState, tableRef)
  return (
    <div className="overflow-x-auto">
      <table
        {...table.gridProps}
        className={(clsx('min-w-full divide-y divide-gray-200'), className)}
        ref={tableRef}
      >
        <TableRowGroup as="thead" className="bg-gray-100">
          {tableState.collection.headerRows.map((headerRow) => (
            <TableHeaderRow
              className="whitespace-nowrap"
              gridRowProps={{ node: headerRow }}
              key={headerRow.key}
              state={tableState}
            >
              {[...headerRow.childNodes].map((column) => (
                <TableColumnHeader
                  className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                  columnHeaderProps={{ node: column }}
                  key={column.key}
                  state={tableState}
                />
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup as="tbody" className="divide-y divide-gray-200 bg-white">
          {[...tableState.collection.body.childNodes].map((row) => (
            <TableRow
              className={clsx(useTableProps?.onRowAction && 'cursor-pointer hover:bg-gray-200')}
              key={row.key}
              gridRowProps={{ node: row }}
              state={tableState}
            >
              {[...row.childNodes].map(({ props, ...cell }) => (
                <TableCell
                  className={clsx(
                    'whitespace-nowrap px-4 py-4 text-sm text-gray-800',
                    (props.type === 'number' || props.type === 'date') && 'tabular-nums',
                  )}
                  key={cell.key}
                  useTableCellProps={{ node: cell }}
                  state={tableState}
                />
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </table>
    </div>
  )
}
