import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-api.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.nasa.gov',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000'
      ],
      bodySizeLimit: '2mb'
    },
  },
};

export default nextConfig;

