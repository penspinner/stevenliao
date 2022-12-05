import { Slot } from '@radix-ui/react-slot'

import { Container } from '~/components/container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '~/components/social-icons'

const SocialLink = ({
  href,
  children,
  icon: Icon,
}: {
  href: string
  children: React.ReactNode
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}) => {
  return (
    <a
      className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
      <span className="ml-4">{children}</span>
    </a>
  )
}

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

const Img = ({
  asChild,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { asChild?: boolean }) => {
  const Component = asChild ? Slot : 'img'
  return (
    <Component
      {...props}
      sizes="(min-width: 1024px) 32rem, 20rem"
      className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
    />
  )
}

export const aboutTitle = 'About'
export const aboutDescription = 'Hi. I’m Steven, a software engineer in New York City.'

export const About = ({ avatarImg }: { avatarImg: React.ReactElement }) => {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Img asChild={!!avatarImg}>{avatarImg}</Img>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {aboutDescription}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I liked solving puzzles ever since I was a kid. I bought a bunch of Rubik&apos;s cubes
              and memorized a bunch of algorithms. I also learned a bit of HTML and CSS in high
              school.
            </p>
            <p>
              During university, I wasn&apos;t sure what I was gonna do. It was gonna be either
              computer science or business management. I went with computer science. There were
              times I felt like quitting because the work was so difficult, but switching majors
              would be even more work, so I stayed and persevered. It was the right decision.
            </p>
            <p>
              After I graduated, it took me a long time to find my first job. It took me about 7
              months. My first job was a fullstack position, and I&apos;m forever grateful to my
              former manager for taking a chance on me.
            </p>
            <p>
              Over time, my interests naturally gravitated towards the frontend space. I love
              creating pixel perfect UIs based on designs, and I&apos;ve recently spent some time
              learning how to make websites/apps more accessible.
            </p>
            <p>
              I also have a{' '}
              <a
                className="underline"
                href="https://www.youtube.com/@2ezpz2plzme"
                rel="noreferrer"
                target="_blank"
              >
                YouTube channel
              </a>
              .
            </p>
          </div>
        </div>
        <ul className="lg:pl-20">
          <li>
            <SocialLink
              aria-label="Twitter: 2ezpz2plzme"
              href="https://twitter.com/2ezpz2plzme"
              icon={TwitterIcon}
            >
              Twitter
            </SocialLink>
          </li>
          <li className="mt-4">
            <SocialLink
              aria-label="GitHub: penspinner"
              href="https://github.com/penspinner"
              icon={GitHubIcon}
            >
              GitHub
            </SocialLink>
          </li>
          <li className="mt-4">
            <SocialLink
              aria-label="LinkedIn: stliao"
              href="https://linkedin.com/in/stliao"
              icon={LinkedInIcon}
            >
              LinkedIn
            </SocialLink>
          </li>
          <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
            <SocialLink href="mailto:steven.liaouey@gmail.com" icon={MailIcon}>
              steven.liaouey@gmail.com
            </SocialLink>
          </li>
        </ul>
      </div>
    </Container>
  )
}
