import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

import { Card } from '~/components/card'
import { Container } from '~/components/container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '~/components/social-icons'
import { formatDate } from '~/lib/format-date'
import { Article } from '~/lib/get-articles'
;('use client')

export const indexTitle = 'Steven Liao — Software Engineer'
export const indexDescription =
  "I’m Steven, a software engineer based in New York City. I love learning about new technologies, especially frontend ones, and creating pixel perfect and accessible UIs. I've also been rounding out my knowledge with system design and LeetCode."

type Photo<TSrc> = { src: TSrc; alt?: string }

type Role<TLogo> = {
  company: string
  title: string
  logo: TLogo
  start: string
  end: string
}

export const Index = <TSrc, TLogo>({
  articles,
  photos,
  photoRender = (photo) => <img src={photo.src as string} alt={photo.alt ?? ''} />,
  roles,
  roleRender = (role) => <img src={role.logo as string} alt="" />,
}: {
  articles: Article[]
  photos: { src: TSrc; alt?: string }[]
  photoRender?: (photo: Photo<TSrc>) => React.ReactElement | undefined
  roles: { company: string; title: string; logo: TLogo; start: string; end: string }[]
  roleRender?: (role: Role<TLogo>) => React.ReactElement | undefined
}) => {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  return (
    <main>
      <Container className="mt-14">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software Engineer
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{indexDescription}</p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/2ezpz2plzme"
              aria-label="Twitter: 2ezpz2plzme"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/penspinner"
              aria-label="GitHub: penspinner"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/stliao"
              aria-label="LinkedIn: stliao"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {photos.map((photo, photoIndex) => (
            <div
              key={photoIndex}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                rotations[photoIndex % rotations.length],
              )}
            >
              <PhotoImg>{photoRender(photo)}</PhotoImg>
            </div>
          ))}
        </div>
      </div>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
            <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <BriefcaseIcon className="h-6 w-6 flex-none" />
                <span className="ml-3">Work</span>
              </h2>
              <ol className="mt-6 space-y-4">
                {roles.map((role, roleIndex) => (
                  <li key={roleIndex} className="flex gap-4">
                    <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                      <RoleImg>{roleRender(role)}</RoleImg>
                    </div>
                    <dl className="flex flex-auto flex-wrap items-center gap-x-2">
                      <dt className="sr-only">Company</dt>
                      <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {role.company}
                      </dd>
                      <dt className="sr-only">Role</dt>
                      <dd className="text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
                      <dt className="sr-only">Date</dt>
                      <dd
                        className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
                        aria-label={`${role.start} until ${role.end}`}
                      >
                        <time dateTime={role.start}>{role.start}</time>{' '}
                        <span aria-hidden="true">–</span>{' '}
                        <time dateTime={role.end}>{role.end}</time>
                      </dd>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

const PhotoImg = ({ children }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const Component = children ? Slot : 'img'
  return (
    <Component
      sizes="(min-width: 640px) 18rem, 11rem"
      className="absolute inset-0 h-full w-full object-cover"
    >
      {children}
    </Component>
  )
}

const RoleImg = ({ children }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const Component = children ? Slot : 'img'
  return (
    <Component className="h-7 w-7 rounded-full" width="28" height="28">
      {children}
    </Component>
  )
}

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

const Article = ({ article }: { article: Article }) => {
  return (
    <Card as="article">
      <Card.Title href={article.url}>{article.title}</Card.Title>
      <Card.Eyebrow decorate>
        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

const SocialLink = ({
  icon: Icon,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}) => {
  return (
    <a
      className="group -m-1 p-1 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  )
}

// const Newsletter = () => {
//   return (
//     <form
//       action="/thank-you"
//       className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
//     >
//       <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
//         <MailIcon className="h-6 w-6 flex-none" />
//         <span className="ml-3">Stay up to date</span>
//       </h2>
//       <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
//         Get notified when I publish something new, and unsubscribe at any time.
//       </p>
//       <div className="mt-6 flex">
//         <input
//           type="email"
//           placeholder="Email address"
//           aria-label="Email address"
//           required
//           className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
//         />
//         <Button type="submit" className="ml-4 flex-none">
//           Join
//         </Button>
//       </div>
//     </form>
//   )
// }
