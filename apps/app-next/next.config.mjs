/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['stevenliao.vercel.app', 'adventofcode.com'],
  },
}

export default nextConfig
