/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*/`,
      },
      {
        source: '/media/:path*',
        destination: `${API_URL}/media/:path*`,
      },
      {
        source: '/documents/:path*',
        destination: `${API_URL}/media/documents/:path*`,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
  output: 'standalone'
};

export default nextConfig;
