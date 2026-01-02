/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['vercel.com', 'localhost'],
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://api.scriptshield.com/v1',
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'production',
    REACT_APP_VERSION: process.env.REACT_APP_VERSION || '2.0.1',
  },
}

module.exports = nextConfig