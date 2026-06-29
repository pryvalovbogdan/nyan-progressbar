import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    formats: ['image/webp'],
    qualities: [75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    localPatterns: [
      { pathname: '/how-to-use/**' },
      { pathname: '/cats/**' },
      { pathname: '/trending/**' },
      { pathname: '/*.png' },
      { pathname: '/*.svg' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
