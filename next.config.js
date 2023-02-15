/* eslint @typescript-eslint/no-var-requires: "off" */
// @ts-check

const { NEXT_PUBLIC_CONTENTFUL_SPACE_ID } = process.env;

/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['./'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: `/${NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`,
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/category/:slug',
        destination: '/tag/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
