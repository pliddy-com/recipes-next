# Patrick's Recipes

This is a tool for collecting and organizing my personal recipes. The UI is optimized for using on a mobile device propped on the kitchen counter where the screen is viewed at a greater distance than when the device is held in the hand.

Using Next.js Static Site Generation to pre-render the site and globally distributing files with AWS S3 and CloudFront as a global CDN.

The application is optimized for SEO and accessibility. Google Lightouse scores for [recipes.pliddy.com](https://recipes.pliddy.com) for Best Practices, SEO, and Accessibility are 100. Lighthouse Performance scores are regularly in the high 90's, occassionally achieving a perfect 100 if assets are cached on the CDN.

## Features

- NextJS Static Site Generation
- Typescript
- Material UI with custom theme with no external CSS resources
- GraphQL with codegen type generation
- Contentful as Headless CMS
- Serverless Deployment using AWS
  - S3
  - Cloudfront
  - lambda@edge for middleware functions
- CI/CD using GitHub Actions
  - Quality control scans
  - Build and deploy
  - Webhook trigger on scheduled publish

## Project Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the application.

## Repository

## Automation

### Quality Control Scans

#### On pre-commit (Husky)

- `npm run typegen`
- `npm run typecheck`
- `npx lint-staged`
- `npm test`

#### On push (GitHub Actions)

- Linting
- Type check
- Unit tests

#### Build & Deploy

- On PR merge
- As a webhook, called whenever the scheduled publishing of content is executed

## Package Scripts

## Performance

- Images
- Fonts
- Standardized templates (prefetch json)
- Material theme, no additional network requests for CSS resources

## Headless CMS

Content Definitions

- Recipe
- Tags
- Taxonomy

## GraphQL & Typescript

Queries & Fragments to define types for payloads passed as props to React components
