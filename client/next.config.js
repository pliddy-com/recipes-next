/* eslint @typescript-eslint/no-var-requires: "off" */
// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const { NEXT_PUBLIC_CONTENTFUL_SPACE_ID } = process.env;

/** @type {import('next').NextConfig} */

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/page/:page',
  //       destination: '/' // The :path parameter isn't used here so will be automatically passed in the query
  //     }
  //   ];
  // },
  eslint: {
    dirs: ['./']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: `/${NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`
      }
    ],
    unoptimized: true
  },
  reactStrictMode: true
};

// module.exports = nextConfig;

module.exports = withBundleAnalyzer({
  ...nextConfig
});
