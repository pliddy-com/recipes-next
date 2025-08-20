/* eslint @typescript-eslint/no-var-requires: "off" */
// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const { NEXT_PUBLIC_CONTENTFUL_SPACE_ID } = process.env;

/** @type {import('next').NextConfig} */

const nextConfig = {
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
  output: 'export',
  reactStrictMode: true
};

module.exports = withBundleAnalyzer({
  ...nextConfig
});
