/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Sales-manegment',
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
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
  },
};

module.exports = nextConfig; 