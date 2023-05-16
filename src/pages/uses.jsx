import Head from 'next/head'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  const technologies = [
    {
      title: 'Bun',
      href: 'https://bun.sh/',
      description:
        "A faster alternative to Node.js that's built upon JavaScriptCore 'the performance-minded JS engine built for Safari.'",
    },
    {
      title: 'Next.js',
      href: 'https://nextjs.org/',
      description:
        'A React framework that includes server-side rendering, static page generating, and so much more.',
    },
    {
      title: 'Node.js',
      href: 'https://nodejs.org/',
      description:
        "I've been working with Node.js since 2017 and I use it every single day in some capacity.",
    },
    {
      title: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      description:
        "For relational databases, I prefer Postgres. It's fast, reliable, and has a great community.",
    },
    {
      title: 'React',
      href: 'https://react.dev/',
      description:
        "I've been working with React since 2017 and it's my go-to for a library single page application.",
    },
    {
      title: 'Redis',
      href: 'https://redis.io/',
      description:
        "For caching, I prefer Redis. It's fast, reliable, and has a great community.",
    },
    {
      title: 'Ruby on Rails',
      href: 'https://rubyonrails.org/',
      description:
        "I've been working with Rails since 2023 and primarily use it for rapid API development.",
    },
    {
      title: 'Tailwind CSS',
      href: 'https://tailwindui.com/',
      description:
        "I'm been working with Tailwind since 2023 and it's really grown on me once I got over the verbosity.",
    },
    {
      title: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
      description:
        "It's a great way to catch bugs before they happen. Sometimes the type system can be a bit of a pain but it's worth it.",
    },
  ]

  const developmentTools = [
    {
      title: 'ChatGPT',
      href: 'https://chat.openai.com/',
      description:
        "I use ChatGPT as a Pair Programmer who can validate ideas, offer suggestions, and help me write the code I don't want to write.",
    },
    {
      title: 'Docker',
      href: 'https://www.docker.com/',
      description:
        "If it doesn't come with a Dockerfile then I will make one. I don't miss the world of 'it works on my machine' at all.",
    },
    {
      title: 'GitHub',
      href: 'https://github.com/',
      description: 'I host all of my open source projects on GitHub.',
    },
    {
      title: 'NVM (Node Version Manager)',
      href: 'https://github.com/nvm-sh/nvm',
      description: 'I use NVM to manage my Node.js versions.',
    },
    {
      title: 'Postman',
      href: 'https://www.postman.com/',
      description:
        "I don't feel too strongly about Postman but it gets the job done and I haven't found anything better. Open to recommendations.",
    },
    {
      title: 'RVM (Ruby Version Manager)',
      href: 'https://rvm.io/',
      description: 'I use RVM to manage my Ruby versions.',
    },
  ]

  const vscodeExtensions = [
    {
      name: 'Code Spell Checker',
      href: 'https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker',
      description:
        'I use this to catch typos in my code, comments, and Markdown files.',
    },
    {
      name: 'colorize',
      href: 'https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize',
      description:
        'This extension colorizes CSS colors in my code with a [] beside them.',
    },
    {
      name: 'ESLint',
      href: 'https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint',
      description: 'I use this to lint my JavaScript and TypeScript code.',
    },
    {
      name: 'ERB Formatter',
      href: 'https://marketplace.visualstudio.com/items?itemName=tomclose.format-erb',
      description:
        'This extension formats my ERB files for Ruby on Rails view development.',
    },
    {
      name: 'GitHub Copilot',
      href: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot',
      description: 'I use this to help me write code faster.',
    },
    {
      name: 'GitLens -- Git supercharged',
      href: 'https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens',
      description: 'GitLens tells me who wrote each line of code and when.',
    },
    {
      name: 'GraphQL: Syntax Highlighting',
      href: 'https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax',
      description:
        'This extension highlights GraphQL syntax in my .graphql files.',
    },
    {
      name: 'Import Cost',
      href: 'https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost',
      description:
        'This extension shows me the size of each import in my code.',
    },
    {
      name: 'MDX',
      href: 'https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx',
      description: 'This extension provides syntax highlighting for MDX files.',
    },
    {
      name: 'MDX Preview',
      href: 'https://marketplace.visualstudio.com/items?itemName=xyc.vscode-mdx-preview',
      description: 'This extension provides a preview of my MDX files.',
    },
    {
      name: 'Prettier - Code formatter',
      href: 'https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode',
      description:
        'I use this to format my code. It is extremely useful when a team is working on a project and the formatting is enforced.',
    },
    {
      name: 'Pretty TypeScript Errors',
      href: 'https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors',
      description: 'This extension makes TypeScript errors easier to read.',
    },
    {
      name: 'Ruby',
      href: 'https://marketplace.visualstudio.com/items?itemName=rebornix.ruby',
      description:
        'This extension provides syntax highlighting for Ruby files.',
    },
    {
      name: 'Rufo - Ruby formatter',
      href: 'https://marketplace.visualstudio.com/items?itemName=jnbt.vscode-rufo',
      description: 'This extension formats my Ruby code.',
    },
    {
      name: 'Sort lines',
      href: 'https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines',
      description:
        'This extension sorts lines of code. I like to keep json and imports alphabetized and this helps.',
    },
    {
      name: 'Svg Preview',
      href: 'https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview',
      description: 'This extension provides a preview of my SVG files.',
    },
    {
      name: 'Tailwind CSS IntelliSense',
      href: 'https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss',
      description:
        'This extension provides Tailwind CSS class name completion and hovering shows the equivalent CSS style.',
    },
    {
      name: 'Template String Converter',
      href: 'https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter',
      description:
        'If you type ${} in quotes, this extension will convert it to a template string.',
    },
    {
      name: 'VSCode Ruby',
      href: 'https://marketplace.visualstudio.com/items?itemName=wingrunr21.vscode-ruby',
      description:
        'This extension also helps provides syntax highlighting for Ruby files.',
    },
  ]

  return (
    <>
      <Head>
        <title>Uses - Matthew Groff</title>
        <meta
          name="description"
          content="Technologies, tools, and other things I use to build software and stay productive."
        />
      </Head>
      <SimpleLayout
        title="Technologies, tools, and other things I use to build software and stay productive."
        intro="I'm always looking for ways to improve my workflow and productivity."
      >
        <div className="space-y-20">
          <ToolsSection title="Technologies">
            {technologies.map((technology) => (
              <Tool
                key={technology.title}
                title={technology.title}
                href={technology.href}
              >
                {technology.description}
              </Tool>
            ))}
          </ToolsSection>

          <ToolsSection title="Development tools">
            {developmentTools.map((tool) => (
              <Tool key={tool.title} title={tool.title} href={tool.href}>
                {tool.description}
              </Tool>
            ))}
            <Tool title="VS Code">
              Here's a list of my extensions:
              <ul role="list" className="space-y-2">
                {vscodeExtensions.map((extension) => (
                  <li key={extension.name}>
                    <a
                      href={extension.href}
                      className="text-blue-500 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {extension.name}
                    </a>
                    <p className="text-gray-500">{extension.description}</p>
                  </li>
                ))}
              </ul>
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
