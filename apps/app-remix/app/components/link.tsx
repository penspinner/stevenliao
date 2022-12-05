import { Link as RemixLink, LinkProps as RemixLinkProps, useSearchParams } from '@remix-run/react'
import clsx from 'clsx'
import { Optional } from 'types'

export type LinkProps = Optional<RemixLinkProps, 'to'> & {
  clearSearchParams?: boolean | string[]
}

export const Link = ({ className, clearSearchParams = false, to, ...props }: LinkProps) => {
  const [searchParams] = useSearchParams()
  const search = searchParams.toString()

  if (!clearSearchParams && search) {
    let newSearch = search

    if (Array.isArray(clearSearchParams) && clearSearchParams.length > 0) {
      clearSearchParams.forEach((searchParamToClear) => {
        searchParams.delete(searchParamToClear)
      })
      newSearch = searchParams.toString()
    }

    if (typeof to === 'string') {
      const symbol = to.includes('?') ? '&' : '?'
      to = to + symbol + newSearch
    } else if (typeof to === 'object') {
      to = {
        pathname: to.pathname,
        search: to.search ? to.search + '&' + newSearch : newSearch,
      }
    }
  }

  if (!to) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a className={clsx(className, 'pointer-events-none opacity-60')} {...props} />
  }

  return <RemixLink to={to} className={className} {...props} />
}
