import { Badge, Card as HeroCard, Link } from '@heroui/react'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

export const Card = ({ children, className, ...props }: ComponentProps<typeof HeroCard>) => {
  return (
    <HeroCard className={clsx('group relative flex flex-col items-start', className)} {...props}>
      {children}
    </HeroCard>
  )
}

Card.Link = function CardLink({
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, 'children'> & { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link
        className={clsx(
          'outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200',
          className,
        )}
        {...props}
      >
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  )
}

Card.Title = function CardTitle({
  children,
  className,
  ...props
}: ComponentProps<typeof HeroCard.Title>) {
  return (
    <HeroCard.Title
      className={clsx(
        'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
        className,
      )}
      {...props}
    >
      {children}
    </HeroCard.Title>
  )
}

Card.Description = function CardDescription({
  children,
  className,
  ...props
}: ComponentProps<typeof HeroCard.Description>) {
  return (
    <HeroCard.Description
      className={clsx('relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400', className)}
      {...props}
    >
      {children}
    </HeroCard.Description>
  )
}

Card.Header = function CardHeader({
  children,
  className,
  ...props
}: ComponentProps<typeof HeroCard.Header>) {
  return (
    <HeroCard.Header className={className} {...props}>
      {children}
    </HeroCard.Header>
  )
}

Card.Content = HeroCard.Content
Card.Footer = HeroCard.Footer

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}

Card.Eyebrow = function CardEyebrow({
  className,
  children,
  decorate = false,
  ...props
}: ComponentProps<typeof Badge> & { decorate?: boolean }) {
  return (
    <Badge
      className={clsx(
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400',
        decorate && 'pl-3.5',
        className,
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Badge>
  )
}
