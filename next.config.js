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
      }
    ]
  },
  distDir: 'build',
  transpilePackages: ['@multiversx/sdk-dapp'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding', {
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate'
    });

    return config;
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
