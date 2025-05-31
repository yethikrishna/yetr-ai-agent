/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
    NEXT_PUBLIC_APP_NAME: 'YETR AI Agent',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  
  // Image optimization configuration
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'images.unsplash.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configurations
    
    // Add support for importing .md files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    
    // Add support for SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // Experimental features
  experimental: {
    // Server components
    serverComponentsExternalPackages: [],
    
    // Optimize for better performance
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: false,
      },
    ];
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,
  
  // Development configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Development-specific settings
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
    },
  }),
  
  // Production configuration
  ...(process.env.NODE_ENV === 'production' && {
    // Production-specific settings
    output: 'standalone',
    
    // Bundle analyzer (uncomment to analyze bundle size)
    // bundleAnalyzer: {
    //   enabled: process.env.ANALYZE === 'true',
    // },
  }),
};

module.exports = nextConfig;
