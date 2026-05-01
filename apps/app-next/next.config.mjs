/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'stevenliao.vercel.app' },
      { protocol: 'https', hostname: 'adventofcode.com' },
    ],
  },
}

export default nextConfig
