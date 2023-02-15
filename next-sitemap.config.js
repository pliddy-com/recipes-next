const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
];

const exclude = [];

// extend the configuration
/** @type {import('next-sitemap').IConfig} */
const config = {
  additionalPaths: async (config) => {
    console.log({ config });
  },
  exclude,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
  siteUrl,
};

module.exports = config;
