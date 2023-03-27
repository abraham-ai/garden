/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
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
  env: {
    NEXT_PUBLIC_ALCHEMY_API_KEY: 'hNqWR45RXI-Ek16H1acYUqVbK1GJcV_6',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'edenartai',
    NEXT_PUBLIC_WALLET_CONNECT_ID: '044562379c6be56865c30c7ec19034b6',
    COOKIE_SECRET: '1URBSqpQvTa9hR0ClPwdt9DPSuSeMe55'
  },
};

module.exports = nextConfig;
