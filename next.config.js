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
    NEXT_PUBLIC_GAS_URL: 'https://script.google.com/macros/s/AKfycbwWiIWzH59AJ7QaRMy2WsVd0nUMIg-z8kkWZ_QWzlAGKpq_l-HSlTiz5pYaVSFumXzZwA/exec',
  },
};

module.exports = nextConfig; 