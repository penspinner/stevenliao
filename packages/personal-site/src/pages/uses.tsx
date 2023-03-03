import { Card } from '~/components/card'
import type { SectionProps } from '~/components/section'
import { Section } from '~/components/section'
import { SimpleLayout } from '~/components/simple-layout'

export const usesTitle = 'Uses - Steven Liao'
export const usesDescription = 'Software I use, gadgets I love, and other things I recommend.'

export const Uses = () => {
  return (
    <SimpleLayout title={usesDescription} intro="Here's a list of all the tools I use daily:">
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M1 Max, 64GB RAM (2021)">
            I was using a 2014 13” MacBook Pro prior to this and the difference is night and day.
          </Tool>
          <Tool
            href="https://www.dell.com/ae/business/p/dell-u3417w-monitor/pd"
            title="Dell UltraSharp 34 Curved Monitor: U3417W"
          >
            This ultra-wide monitor can comfortably split screen without windows feeling squished.
            It&apos;s almost like two monitors in one.
          </Tool>
          <Tool title="Random Ergonomic Mesh Chair"></Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool href="https://code.visualstudio.com/" title="Visual Studio Code"></Tool>
          <Tool title="Warp"></Tool>
          <Tool title="Git"></Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Raycast">
            It&apos;s not the newest kid on the block but it’s still the fastest. The Sublime Text
            of the application launcher world.
          </Tool>
          <Tool title="Google Docs">
            It&apos;s too easy to forget stuff. And with Google Docs, it’s easy for me to keep my
            notes discoverable on my devices.
          </Tool>
          <Tool title="Linear">
            Linear is an amazing issue tracking and product management tool with stellar design.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}

const ToolsSection = ({ children, ...props }: SectionProps) => {
  return (
    <Section {...props}>
      <ul className="space-y-16">{children}</ul>
    </Section>
  )
}

const Tool = ({
  title,
  href,
  children,
}: React.PropsWithChildren<{
  title: string
  href?: string
}>) => {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}
