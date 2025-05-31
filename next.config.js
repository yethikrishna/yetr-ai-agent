/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Exclude frontend directory from compilation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config, { isServer }) => {
    // Ignore files in frontend directory during compilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/frontend/**', '**/node_modules/**']
    };
    
    return config;
  }
}

module.exports = nextConfig