/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'pump.mypinata.cloud',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'cf-ipfs.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'gateway.irys.xyz',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'app.ashswap.io',
        port: '',
        pathname: '**'
      }
    ]
  },
  distDir: 'build',
  transpilePackages: ["@multiversx/sdk-dapp"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  }
};

module.exports = nextConfig;


