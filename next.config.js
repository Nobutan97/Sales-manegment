/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Sales-manegment',
  assetPrefix: '/Sales-manegment',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_GAS_URL: process.env.GAS_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  },
};

module.exports = nextConfig; 