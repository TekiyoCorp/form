/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.site.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
