import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mogazoa-smoky.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'chipper-hummingbird-0e6d64.netlify.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.justwatch.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    domains: ['mogazoa-api.vercel.app', 'example.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
