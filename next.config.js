/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: '/Sales-manegment',
  assetPrefix: '/Sales-manegment/',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
      http2: false,
      child_process: false,
      'node:events': false,
      'node:process': false,
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_GAS_URL: process.env.GAS_URL,
  },
};

module.exports = nextConfig; 