import { clsx } from 'clsx'
import * as React from 'react'
import {
  Button,
  Menu as RACMenu,
  MenuTrigger,
  MenuItem as RACMenuItem,
  Popover,
} from 'react-aria-components'
import type { PopoverProps } from 'react-aria-components'

type MenuProps = {
  className?: string
  trigger: React.ReactNode
  children: React.ReactNode
  placement?: PopoverProps['placement']
}

export const Menu = ({ trigger, children, placement = 'bottom end' }: MenuProps) => {
  return (
    <MenuTrigger>
      {trigger}
      <Popover placement={placement} offset={4}>
        <RACMenu className="rounded-lg border border-zinc-100 bg-white py-2 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-zinc-400 dark:bg-zinc-800">
          {children}
        </RACMenu>
      </Popover>
    </MenuTrigger>
  )
}

export const MenuButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      {...props}
      className={clsx(
        'group pointer-events-auto relative flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none md:hidden dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-zinc-200',
        className,
      )}
    />
  )
}

export const MenuItem = ({
  className,
  isActive,
  ...props
}: React.ComponentProps<typeof RACMenuItem> & { isActive?: boolean }) => {
  return (
    <RACMenuItem
      {...props}
      className={clsx(
        'flex w-full items-center gap-4 px-4 py-1 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500',
        isActive
          ? 'fill-teal-50 stroke-teal-500 text-teal-500 dark:text-teal-400'
          : 'fill-zinc-100 stroke-zinc-500 text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-700',
        className,
      )}
    />
  )
}
