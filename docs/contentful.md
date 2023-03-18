<!--  -->

---

<p align="center">
  <a href="../README.md">TL;DR</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <strong>Contentful as Headless CMS</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="performance.md">Maximizing Performance</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="automation.md">Automation</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="manual-scans.md">Manual Scans</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="next-steps.md">Next Steps</a>
</p>

---

## Contentful as Headless CMS

This application uses Contentful as its headless content management system. Contentful provides two APIs that are used in the prjoect:

- The **content API** provides a GraphQL endpoint for content queries. This api is also used to retrieve content models from the CMS for code generation of TypeScript types used in the client-side codebase.

- The **images API** provides a REST endpoint for retrieving image assets by the client application. This api can also apply transformations to the image assets through url parameters. Requests for images are cached for individual image sizes and formats, reducing calls to the origin server and improving overall client performance.

### Code Generation for GraphQL Types

In order to define the TypeScript types for content payloads returned by GraphQL queries to Contentful, the application uses <a href="https://the-guild.dev/graphql/codegen" target="_blank">GraphQL Code Generator</a>.

Defintions for entire payloads are defined by named GraphQL queries in the code, while sections of the payload that are passed as properties to individual React components are defined by GraphQL fragments referenced by the queries.

### Content Definitions

There are two key content types in the system:

- `Recipe` - This is the primary content type that defines the page-level content for the application. A Recipe entry contains all data and metadata that is required to render a full page of Recipe content, including tags in the page `head`. Client side queries can also retrieve summary versions of a Recipe entry for display in the card format.

<p align="center">
  <img src="assets/recipe.png" alt="recipe content defintion" width="720"/>
</p>

- `Tag` - Tags are simply labels applied to content that are used to organize and query for collections of content. All queries and grouping of content on the client are organized around tags.

<p align="center">
  <img src="assets/tag.png" alt="tag content definition" width="720" />
</p>

Additionally, there is one other content type in the system:

- `Taxonomy` - A Taxonomy is a collection of tags. The Taxonomy is used to generate custom grouped collections of Recipe content. A Taxonomy can also be used as the child of a parent taxonomy to define sub-groups within the parent taxonomy.

<p align="center">
  <img src="assets/taxonomy.png" alt="taxonomy content definition" width="720" />
</p>

In this application, for example, the primary navigation menu is built from a Taxonomy called `Categories`. Categories are a list of editorially selected tags that are shown in the navigation menu and also generate Category pages containing all Recipes that are assigned the category tag. Child taxonomies are used to create subcategories under category tags.

Since the only difference between a category and a tag page is that certain tags have been editorially selected to appear in the navigation, the application renders the page as a "tag" page.

### Page Head Tags

The Next.js client application uses custom components that generate tags for the html page head using the Next `<Head />` component and the content data returned by the GraphQL query for each page. As long as the correct metadata is entered in the CMS for each entry, each SSG page render will automatically include <a href="https://ogp.me/" target="_blank">OpenGraph</a> tags for social media and a recipe schema from <a href="https://schema.org/Recipe" target="_blank">Schema.org</a> in order to enable display of Google search results as rich snippets.

### AI-Generated Placeholder Content

At first, I did not prioritize the content for each recipe page, since I was creating the entries for my own use. Once I started scanning the pages for potential SEO performance, the thin content on pages that only had a list of ingredients and instructions resulted in a low SEO score. In order to quickly create content for SEO testing, I experimented with the <a href="https://openai.com/blog/chatgpt" target="\_blank"><strong>ChatGPT</strong></a> OpenAI API to generate approximately 100 words of copy and a 150 character abstract for each recipe.

---

<p align="center">
  <a href="../README.md">TL;DR</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <strong>Contentful as Headless CMS</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="performance.md">Maximizing Performance</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="automation.md">Automation</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="manual-scans.md">Manual Scans</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="next-steps.md">Next Steps</a>
</p>

---
