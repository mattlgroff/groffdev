import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/react-hook-click-outside',
        destination: '/blog/react-hook-click-outside',
        permanent: true,
      },
      {
        source: '/ask-openai-from-bash-terminal',
        destination: '/blog/ask-openai-from-bash-terminal',
        permanent: true,
      },
      {
        source: '/bun-apollo-server',
        destination: '/blog/bun-apollo-server',
        permanent: true,
      },
      {
        source: '/bun-express',
        destination: '/blog/bun-express',
        permanent: true,
      },
      {
        source: '/bun-graphql',
        destination: '/blog/bun-graphql',
        permanent: true,
      },
      {
        source: '/cypress-component-tests-with-chatgpt',
        destination: '/blog/cypress-component-tests-with-chatgpt',
        permanent: true,
      },
      {
        source: '/eliminate-unnecessary-rerenders-in-react',
        destination: '/blog/eliminate-unnecessary-rerenders-in-react',
        permanent: true,
      },
      {
        source: '/gpt-test-generator',
        destination: '/blog/gpt-test-generator',
        permanent: true,
      },
      {
        source: '/how-to-make-a-graphql-api-with-ruby-rails',
        destination: '/blog/how-to-make-a-graphql-api-with-ruby-rails',
        permanent: true,
      },
      {
        source: '/monorepo-git-hooks',
        destination: '/blog/monorepo-git-hooks',
        permanent: true,
      }
    ];
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
