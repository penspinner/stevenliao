import { NavLink, NavLinkProps, useNavigation, useResolvedPath } from '@remix-run/react'
import * as React from 'react'

const useIsPendingPathname = (to: NavLinkProps['to']) => {
  const { location } = useNavigation()
  const { pathname } = useResolvedPath(to)
  return location?.pathname === pathname
}

const useIsSlowTransition = (ms = 300) => {
  const transition = useNavigation()
  const [isSlowTransition, setIsSlowTransition] = React.useState(false)
  React.useEffect(() => {
    if (transition.state === 'loading') {
      const timeoutId = setTimeout(() => setIsSlowTransition(true), ms)
      return () => clearTimeout(timeoutId)
    } else {
      setIsSlowTransition(false)
    }
  }, [transition, ms])
  return isSlowTransition
}

type PendingNavLinkProps = Omit<NavLinkProps, 'children' | 'className' | 'style'> & {
  /**
   * The `children` prop is similar to the `children` prop of a Remix NavLink with the addition of
   * invoking the function variant with the `isPendingPathname` and `isSlowTransition` props.
   */
  children:
    | React.ReactNode
    | ((props: {
        isActive: boolean
        isPendingPathname: boolean
        isSlowTransition: boolean
      }) => React.ReactNode)
  /**
   * The `className` prop is similar to the `className` prop of a Remix NavLink with the addition of
   * invoking the function variant with the `isPendingPathname` and `isSlowTransition` props.
   */
  className?:
    | string
    | ((props: {
        isActive: boolean
        isPendingPathname: boolean
        isSlowTransition: boolean
      }) => string)
  /**
   * The `slowTransitionMS` prop is the amount of time in milliseconds that the browser waits
   * before toggling the `isSlowTransition` prop to `true`.
   * @default 300
   */
  slowTransitionMS?: number
  /**
   * The `style` prop is similar to the `style` prop of a Remix NavLink with the addition of
   * invoking the function variant with the `isPendingPathname` and `isSlowTransition` props.
   */
  style?:
    | React.CSSProperties
    | ((props: {
        isActive: boolean
        isPendingPathname: boolean
        isSlowTransition: boolean
      }) => React.CSSProperties)
}

/**
 * PendingNavLink renders a Remix NavLink with the ability to customize its appearance when it is
 * pending and/or slow. If you don't need to customize the appearance of the NavLink that is
 * pending and/or slow, you can use Remix's NavLink component directly.
 */
export const PendingNavLink = ({
  children,
  className,
  slowTransitionMS = 300,
  style,
  to,
  ...props
}: PendingNavLinkProps) => {
  const isPendingPathname = useIsPendingPathname(to)
  const isSlowTransition = useIsSlowTransition(slowTransitionMS)
  return (
    <NavLink
      className={
        typeof className === 'function'
          ? (props) => className({ ...props, isPendingPathname, isSlowTransition })
          : className
      }
      style={
        typeof style === 'function'
          ? (props) => style({ ...props, isPendingPathname, isSlowTransition })
          : style
      }
      to={to}
      {...props}
    >
      {typeof children === 'function'
        ? children({ isActive: isPendingPathname, isPendingPathname, isSlowTransition })
        : children}
    </NavLink>
  )
}
