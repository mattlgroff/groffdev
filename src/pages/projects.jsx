import Head from 'next/head'
import Image from 'next/image'
import { Card } from 'src/components/Card'
import { SimpleLayout } from 'src/components/SimpleLayout'
import logoHome from 'src/images/logos/home.svg'
import logoBun from 'src/images/logos/bun.svg'
import logoRuby from 'src/images/logos/ruby.svg'
import logoParty from 'src/images/logos/party.png'
import logoPython from 'src/images/logos/python.svg'
import logoNpm from 'src/images/logos/npm.svg'

const projects = [
  {
    name: 'Estimation Party',
    description: "A simple solution to Planning Poker. Create a room, invite your team, and start estimating. I built this full-stack realtime application using Next.js and Supabase.",
    link: {
      href: 'https://estimationparty.com',
      label: 'estimationparty.com',
    },
    logo: logoParty,
  },
  {
    name: 'NPM Package: next-rails',
    description: "A CLI for generating a Next.js app with Rails CLI-like features. Utilizes Create Next App and Knex and custom code generation to quickly scaffold a full-stack Next.js project the Rails way.",
    link: {
      href: 'https://www.npmjs.com/package/next-rails',
      label: 'npmjs.com/package/next-rails',
    },
    logo: logoNpm,
  },
  {
    name: 'Repo Inspector',
    description: "ChatGPT Plugin written in Python: Inspect Git Repositories. Submit a GitHub, Gitlab, etc., HTTPS link. The repo gets cloned and reviewed using by Repo Inspector.",
    link: {
      href: 'https://github.com/mattlgroff/repo-inspector',
      label: 'github.com/mattlgroff/repo-inspector',
    },
    logo: logoPython,
  },
  {
    name: 'Ask CLI',
    description:
      "A ruby program that let's you query OpenAI from the command line using their API",
    link: {
      href: 'https://github.com/mattlgroff/ask-cli',
      label: 'github.com/mattlgroff/ask-cli',
    },
    logo: logoRuby,
  },
  {
    name: 'Bun Apollo GraphQL Server',
    description:
      'An Apollo GraphQL server running on Bun, an alternative to Node.js.',
    link: {
      href: 'https://github.com/mattlgroff/bun-apollo',
      label: 'github.com/mattlgroff/bun-apollo',
    },
    logo: logoBun,
  },
  {
    name: 'Mortgage Calculator',
    description:
      "Inspired by Ramsey's Mortgage Calculator but the focus is keeping the total monthly payment under 30% of your monthly after-tax take-home pay.",
    link: {
      href: 'https://github.com/mattlgroff/mortgage-calc',
      label: 'github.com/mattlgroff/mortgage-calc',
    },
    logo: logoHome,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Matthew Groff</title>
        <meta name="description" content="Things I’ve made." />
      </Head>
      <SimpleLayout
        title="Things I’ve made."
        intro="I’ve worked on tons of little projects over the years. These are just a few that are open source that I can share with you."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={32}
                  height={32}
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
