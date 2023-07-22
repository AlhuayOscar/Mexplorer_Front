/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experiments: {
    topLevelAwait: true,
  },
  images: {
    domains: ['mexplorer.s3.amazonaws.com']
  }
};

module.exports = nextConfig
