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
