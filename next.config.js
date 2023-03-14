/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [
    '@web3modal/ethereum',
    '@web3modal/react',
    '@web3modal/ui',
    '@web3modal/core',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio.aws.abraham.fun',
      },
    ],
  },
};

module.exports = nextConfig;
