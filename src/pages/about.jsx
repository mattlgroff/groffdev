import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Matthew Groff</title>
        <meta
          name="description"
          content="I’m Matthew Groff. I live in Orlando, where I engineer innovative web software solutions remotely."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Matthew Groff. I live in Orlando, where I engineer innovative
              web software solutions remotely.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I&apos;ve had a passion for creating things from a young age.
                Growing up in San Diego, CA, I started tinkering with web
                technology when I was just 10 years old. I remember spending
                hours writing HTML and CSS for Neopets and Myspace on our family
                PC, connecting to the internet through good old dial-up.
              </p>

              <p>
                As I entered middle school and high school, programming became
                more than just a hobby for me. I worked on an online game
                project with friends and even found myself incorporating web
                development into my computer graphic design assignments. It was
                during this time that my passion for coding truly took off.
              </p>

              <p>
                When I enrolled in college at UC Santa Cruz, I decided to pursue
                my interest in computer science, specializing in game design. I
                spent countless hours that year developing command line
                utilities for rooting, unrooting, and modifying the DROID RAZR
                smartphone, which had just hit the market in 2011. Additionally,
                I created an Android app called Universal Unroot, which achieved
                over 100,000 sales. However, after a year, I made the decision
                to leave college and return to San Diego.
              </p>

              <p>
                In 2014, I obtained certification in Unix Systems Administration
                at UC San Diego Extension. I continued working in retail while
                also exploring my passion for web development. I enrolled in a
                web development bootcamp at UC San Diego Extension, and in
                January 2018, I proudly graduated from the program.
              </p>

              <p>
                Shortly after completing the bootcamp, I joined Intrepid
                Pursuits (later acquired by Accenture) as a Web Developer. I
                received valuable training in Boston and even had the
                opportunity to meet my future wife there. However, my journey
                led me to Houston, Texas, where I worked for several years.
              </p>

              <p>
                In December 2019, seeking new challenges, I made a leap of faith
                and joined Umbrage, a budding startup at the time. As a Director
                of Engineering, I&apos;ve been able to contribute to its growth
                and success. I&apos;m proud to say that Umbrage was recently
                acquired, and being part of a successful startup acquisition has
                been an incredible experience.
              </p>

              <p>
                In the present day, I reside in Orlando, Florida, working
                remotely for Umbrage. When I&apos;m not immersed in software
                engineering, you can find me enjoying quality time with my wife
                and our dog. I also write about software engineering and make
                sure to explore the local theme parks, making the most of my
                time in Orlando.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://github.com/mattlgroff"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/mattgroff/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:mattlgroff@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                mattlgroff@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
