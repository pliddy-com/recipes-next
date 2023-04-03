<!--  -->

---

<p align="center">
  <a href="../README.md">TL;DR</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="contentful.md">Contentful as Headless CMS</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <strong>Maximizing Performance</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="automation.md">Automation</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="manual-scans.md">Manual Scans</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="next-steps.md">Next Steps</a>
</p>

---

## Maximizing Performance

A high level of overall site performance was a primary objective for this project. This has been achieved through iteration of various features during the development process.

The largest impact to performance has been a result of the use of static site generation and minimizing the number and size of requests for external resources.

### Static Site Generation

This application uses the **Static Site Generation (SSG)** feature of Next.js. For each url in the application, the build process creates an html document (≈12.5 kB), a `json` file containing the content payload (≈10 kB), and an assortment of JavaScript bundles (≈500 kB).

This build generates a page for each recipe in the site, as well as a pre-rendered page for each recipe collection identified by a given tag. The result is a static site with efficient initial page loads, minimum JavaScript execution, and rapid in-site navigation once resources are loaded on the initial page view.

Additionally, Next.js uses **lazy pre-fetching** of `json` data files for linked pages. Navigating to a page type that has previously been viewed is almost instantaneous since all resources except for images are cached by the browser.

Pages also utilize the Next `revalidate` feature, which means when a current page renders, it uses the content API to check if its content has been updated in the CMS. If the content has changed, the page will fetch a new `json` payload with the latest content without requiring a full site rebuild.

If a new page is published, the site will require a full rebuild in order to know about the new page url. Building and deploying individual statically-generated pages would requrie some type of server to handle the request. If this feature is identified as a priority, it could potentially be handled through GitHub Actions or a standalone AWS Lambda function.

While a full deployment of new AWS resources can take up to 10 minutes, a static site build of the Next.js browser client only takes **90-120 seconds** to build and deploy across the AWS CloudFront CDN, the site can be re-generated **hundreds of times a month** within the free-tier limits of GitHub Actions and AWS.

### SEO-Compatible Infinite Scrolling

Pages that display lists of content components can generate DOM structures with an large number of node elements that can exceed acceptible Lighthouse scores. To minimize initial page loads, recipe list pages utilize **infinite scrolling** that populates the DOM with content as the user scrolls down the page. This approach results in a smaller DOM structure on initial page load but results in a page that is not bot-friendly because it requires a rendered window with **user-generated scroll events** to populate the page with additional content.

In cases where infinite scrolling is implemented to display a list of content items, individual pages with **paginated lists of content** are statically generated at build time with navigation links between the results pages that can be followed by site crawlers.

### Dynamic Imports

This application utilizes the `dyamic` import feature of Next.js to lazy load page-level components. Dynamic importing results in code bundles that split shared framework code from page-specific code. Loading of page-specific components is deferred and helps increase initial performance by reducing the amount of code required to initially render the page in the browser.

### Images

While static site generation can optimize html templates, content, and script bundles, images are, usually, the largest contributor to page loading. To eliminate issues with performance and accessibility, I created a [`DynamicImage`](src/components/Image/DynamicImage/) component to effectively handle responsive images.

Instead of relying on a 3rd-party higher order component to manage image loading behind the scenes, the `DynamicImage` component renders standard `html` tags for the body and head elements of the page. The use of `html` tags instead of runtime JavaScript means that the optimum image can be identified and loaded by the browser before any in-page scripts are executed.

`DynamicImage` creates a `<picture />` element with multiple `<source />` tags and `srcSet` properties to handle all desired responsive behaviors. It also utilizes Next.js's `<Head />` component to optionally inject `preload` tags into the header of any page that uses the Dynamic Image component. Any images that are not preloaded can be delegated to be lazy loaded by the browser when the user scrolls down the page.

The `DynamicImage` component can be used in place of an html `img` tag or in any Material UI component that accepts an image property. Since images can have a variety of sizes and responsive behaviors in the application, the `DynamicImage` is a generic solution. The specifications for proper image width at any given size are provided by a `[componentname].config.tsx` file stored in the same directory as the component that uses `DynamicImage`.

This example configuration file for the [`RecipeCard`](src/components/RecipeCard/) component provides a series of minimum viewport widths and corresponding image widths. The widths used have been standardized at 150px increments to minimize the number of cached, pre-rendered versions of the image stored on Contentful's image API CDN.

```javascript
breakpoints: [
  {
    viewMin: 987,
    imgWidth: 400
  },
  {
    viewMin: 768,
    imgWidth: 300
  },
  {
    viewMin: 668,
    imgWidth: 400
  },
  {
    viewMin: 480,
    imgWidth: 300
  },
  {
    viewMin: 434,
    imgWidth: 500
  },
  {
    viewMin: 335,
    imgWidth: 400
  },
  {
    imgWidth: 300
  }
];
```

### Fonts

Fonts are another resource that can have significant impact on page performance and metrics like Web Vitals. Having both serif and sans-serif font families with bold and italic options can provide an endless number of design options. The price for this flexibility is loading 4 separate typefaces for each font family. Since font files can be up to 500 kB each, just loading the mentioned can mean 8 requests with 2MB of payload.

To address the font performance issues in this application, several decisions were made:

- **Variable weight** TrueType fonts were selected. Instead of a traditional format with one font file for each weight, variable weight fonts have one file that can render multiple font weights, from thin to extra bold. This capability reduces both the number of requests and payload size for font loading. In this application, serif and sans-serif variable fonts were chosen, providing several weights for both font families with just 542 kB of font resources.

- **Italic font variants** were eliminated from the design system. Since there was no overwhelming use case for the use of italics, there is no need to request an additional font file with its additional performance impact.

- Fonts are **self-hosted** as part of the application deployment on the CDN. This enables font files to be delivered with the same performance level as the rest of the static site files instead of relying on the availability of a 3rd-party font hosting service.

- **Preload** tags for font files are injected into the `<html />` document's `<head />` section so typefaces are available when styles are applied during page rendering without having to wait for a blocked resource to load.

### Styling

Using **Material UI** as a component library provides a wide assortment of pre-configured UI components and reduces the need to develop basic display and interactive components from scratch. In order to create a unique look and feel, these components need to have some level of custom styling.

This application uses a Material UI **custom theme** to define styling. This approach allows the definition of all styles in TypeScript source files as part of the functional code base, as opposed to creating a set of separate `css` resources.

The benefit of using a Material UI theme is that the required styling for a statically generated page is embedded in the html markup, instead of requiring one or more network requests to external CSS resources.

---

<p align="center">
  <a href="../README.md">TL;DR</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="contentful.md">Contentful as Headless CMS</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <strong>Maximizing Performance</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="automation.md">Automation</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="manual-scans.md">Manual Scans</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="next-steps.md">Next Steps</a>
</p>

---
