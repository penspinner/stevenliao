import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import * as React from 'react'

import { Container } from '~/components/container'
import { InnerContainer, OuterContainer } from '~/components/container'
import { Details } from '~/components/details'
import type { ColorScheme } from '~/types'

export const Layout = ({
  children,
  linkRender,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Header>>) => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <Header linkRender={linkRender} {...props} />
      {children}
      <Footer linkRender={linkRender} />
    </>
  )
}

type LinkRender = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.ReactElement

const Header = ({
  avatarImg,
  colorScheme,
  colorSchemeToggleRender,
  currentPathname,
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  linkRender = (props) => <a {...props} />,
}: {
  avatarImg?: React.ReactElement
  colorScheme: ColorScheme
  colorSchemeToggleRender?: (props: React.PropsWithChildren) => React.ReactNode
  currentPathname: string
  linkRender?: LinkRender
}) => {
  return (
    <header className="pointer-events-none relative z-50 flex flex-col">
      <div className="top-0 z-10 h-16 pt-6">
        <Container className=" w-full">
          <div className="relative flex gap-4">
            <div className="flex flex-1">
              <AvatarContainer>
                <Avatar img={avatarImg} linkRender={linkRender} />
              </AvatarContainer>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation currentPathname={currentPathname} linkRender={linkRender} />
              <DesktopNavigation currentPathname={currentPathname} linkRender={linkRender} />
            </div>
            <div className="flex justify-end md:flex-1">
              {colorSchemeToggleRender && (
                <div className="pointer-events-auto">
                  {colorSchemeToggleRender({
                    children: <ColorSchemeToggle colorScheme={colorScheme} />,
                  })}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

const MobileNavItem = ({
  href,
  children,
  currentPathname,
  linkRender = ({ children: linkChildren, className, href }) => (
    <a className={className} href={href}>
      {children}
      {linkChildren}
    </a>
  ),
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  currentPathname: string
  linkRender?: LinkRender
}) => {
  const isActive = currentPathname === href
  return (
    <li>
      {linkRender({
        href,
        className: clsx('block py-1', isActive && 'text-teal-500 dark:text-teal-400'),
        children,
      })}
    </li>
  )
}

const MobileNavigation = ({
  currentPathname,
  linkRender,
}: {
  currentPathname: string
  linkRender: LinkRender
}) => {
  return (
    <Details className="pointer-events-auto relative md:hidden">
      <summary className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </summary>
      <DetailsPopup>
        <div className="px-4">
          <nav>
            <ul className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <MobileNavItem
                currentPathname={currentPathname}
                href="/about"
                linkRender={linkRender}
              >
                About
              </MobileNavItem>
              <MobileNavItem
                currentPathname={currentPathname}
                href="/articles"
                linkRender={linkRender}
              >
                Articles
              </MobileNavItem>
              <MobileNavItem
                currentPathname={currentPathname}
                href="/projects"
                linkRender={linkRender}
              >
                Projects
              </MobileNavItem>
              <MobileNavItem currentPathname={currentPathname} href="/uses" linkRender={linkRender}>
                Uses
              </MobileNavItem>
            </ul>
          </nav>
        </div>
      </DetailsPopup>
    </Details>
  )
}

const NavItem = ({
  href,
  currentPathname,
  children,
  linkRender = ({ children: linkChildren, className, href }) => (
    <a className={className} href={href}>
      {children}
      {linkChildren}
    </a>
  ),
}: React.PropsWithChildren<{
  currentPathname: string
  href: string
  linkRender?: LinkRender
}>) => {
  const isActive = currentPathname === href
  return (
    <li>
      {linkRender({
        href,
        className: clsx(
          'relative block px-3 py-2 transition outline-none rounded-full focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400',
        ),
        children: (
          <>
            {children}
            {isActive && (
              <motion.span
                className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
                layoutId="active-link"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </>
        ),
      })}
    </li>
  )
}

const DesktopNavigation = ({
  currentPathname,
  linkRender,
}: {
  currentPathname: string
  linkRender: LinkRender
}) => {
  return (
    <nav className="pointer-events-auto hidden md:block">
      <ul className="flex rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem currentPathname={currentPathname} href="/about" linkRender={linkRender}>
          About
        </NavItem>
        <NavItem currentPathname={currentPathname} href="/articles" linkRender={linkRender}>
          Articles
        </NavItem>
        <NavItem currentPathname={currentPathname} href="/projects" linkRender={linkRender}>
          Projects
        </NavItem>
        <NavItem currentPathname={currentPathname} href="/uses" linkRender={linkRender}>
          Uses
        </NavItem>
      </ul>
    </nav>
  )
}

const AvatarContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur focus-within:ring-2 focus-within:ring-zinc-900 dark:bg-zinc-800/90 dark:ring-white/10 dark:focus-within:ring-zinc-200 dark:focus-within:ring-offset-1 dark:focus-within:ring-offset-zinc-900/5',
      )}
      {...props}
    />
  )
}

const Avatar = ({
  className,
  img,
  linkRender,
  ...props
}: {
  className?: string
  img?: React.ReactElement
  large?: boolean
  linkRender: LinkRender
  style?: React.CSSProperties
}) => {
  return linkRender({
    href: '/',
    'aria-label': 'Home',
    className: 'pointer-events-auto rounded-full outline-none',
    children: <Img asChild={!!img}>{img}</Img>,
    ...props,
  })
}

const Img = ({
  asChild,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { asChild?: boolean; large?: boolean }) => {
  const Component = asChild ? Slot : 'img'
  return (
    <Component
      {...props}
      alt=""
      className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
    />
  )
}

const ColorSchemeToggle = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  return (
    <Details className="relative cursor-pointer">
      <summary
        aria-label="Color scheme"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 outline-none ring-1 ring-zinc-900/5 backdrop-blur transition focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-white/10"
      >
        {colorScheme === 'dark' ? (
          <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
        ) : colorScheme === 'light' ? (
          <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
        ) : (
          <Cog8ToothIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 text-zinc-700 dark:text-zinc-200" />
        )}
      </summary>
      <DetailsPopup>
        <ColorSchemeButton colorScheme={colorScheme} label="Light" value="light">
          <SunIcon className="h-6 w-6" />
          Light
        </ColorSchemeButton>
        <ColorSchemeButton colorScheme={colorScheme} label="Dark" value="dark">
          <MoonIcon className="h-6 w-6" />
          Dark
        </ColorSchemeButton>
        <ColorSchemeButton colorScheme={colorScheme} label="System" value="system">
          <Cog8ToothIcon className="h-6 w-6" />
          System
        </ColorSchemeButton>
      </DetailsPopup>
    </Details>
  )
}

const DetailsPopup = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="absolute right-0 z-20 md:left-0">
      <div className="relative top-1 w-40 rounded-lg border border-zinc-100 bg-white py-2 shadow-lg dark:border-zinc-400 dark:bg-zinc-800 ">
        {children}
      </div>
    </div>
  )
}

const ColorSchemeButton = ({
  colorScheme,
  label,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  colorScheme?: string
}) => {
  return (
    <button
      {...props}
      disabled={colorScheme === props.value}
      name="colorScheme"
      className={clsx(
        'flex w-full items-center gap-4 px-4 py-1 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-teal-500',
        colorScheme === props.value
          ? 'group-hover:stroke-teal-600" fill-teal-50 stroke-teal-500 text-teal-500 group-hover:fill-teal-50 dark:text-teal-400 '
          : 'fill-zinc-100 stroke-zinc-500 text-zinc-700 transition hover:bg-zinc-50 active:text-zinc-200 group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:text-zinc-200',
      )}
    />
  )
}

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Link = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Slot
      className="outline-none transition hover:text-teal-500 focus-visible:ring-2 focus-visible:ring-zinc-900 dark:hover:text-teal-400 dark:focus-visible:ring-zinc-200"
      {...props}
    />
  )
}

const Footer = ({
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  linkRender = (props) => <a {...props} />,
}: {
  linkRender?: LinkRender
}) => {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <Link>{linkRender({ children: 'About', href: '/about' })}</Link>
                <Link>{linkRender({ children: 'Articles', href: '/articles' })}</Link>
                <Link>{linkRender({ children: 'Projects', href: '/projects' })}</Link>
                <Link>{linkRender({ children: 'Uses', href: '/uses' })}</Link>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Steven Liao. All rights reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  )
}
