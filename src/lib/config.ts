interface PageProps {
  defaultDescription?: string;
  defaultTitle?: string;
  description?: string;
  domain?: string;
  title?: string;
}

interface MicrocopyProps {
  notFound: PageProps;
  index: PageProps;
  recipe: PageProps;
  site: PageProps;
  tag: PageProps;
}

export interface ConfigProps {
  microcopy?: MicrocopyProps;
}

const microcopy: MicrocopyProps = {
  index: {
    defaultTitle: 'All My Recipes',
    description: "Patrick's recipe collection",
  },
  notFound: {
    defaultTitle: 'Page Not Found',
    description: 'The requested url was not found',
  },
  recipe: {
    defaultDescription: 'A recipe for',
    defaultTitle: 'Recipe',
  },
  site: {
    title: "Patrick's Recipes",
    domain: 'https://recipes.pliddy.com',
  },
  tag: {
    defaultDescription: 'A collection of recipies tagged as',
    defaultTitle: 'Recipes',
  },
};

const config: ConfigProps = {
  microcopy,
};

export default config;
