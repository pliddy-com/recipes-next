interface PageProps {
  defaultDescription?: string;
  defaultTitle?: string;
  description?: string;
  domain?: string;
  title?: string;
}

interface MicrocopyProps {
  category?: PageProps;
  index?: PageProps;
  recipe?: PageProps;
  site?: PageProps;
  tag?: PageProps;
}

export interface ConfigProps {
  microcopy?: MicrocopyProps;
}

const microcopy: MicrocopyProps = {
  category: {
    defaultDescription: 'A collection of recipies categorized as',
    defaultTitle: 'Category',
  },
  index: {
    defaultTitle: 'All Recipes',
    description: "Patrick's recipe collection",
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
    defaultTitle: 'Tag',
  },
};

const config: ConfigProps = {
  microcopy,
};

export default config;
