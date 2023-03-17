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
  tagIndex: PageProps;
}

export interface ConfigProps {
  microcopy?: MicrocopyProps;
}

const microcopy: MicrocopyProps = {
  index: {
    defaultTitle: 'All the Recipes',
    description: "Patrick's recipe collection"
  },
  notFound: {
    defaultTitle: "Sorry, that page isn't here.",
    description: 'The requested url was not found'
  },
  recipe: {
    defaultDescription: 'A recipe for',
    defaultTitle: 'Recipe'
  },
  site: {
    title: "Patrick's Recipes",
    domain: 'https://recipes.pliddy.com'
  },
  tag: {
    defaultDescription: 'A collection of recipies tagged as',
    defaultTitle: 'Collection'
  },
  tagIndex: {
    defaultTitle: 'Tag Collections',
    description: 'All tag collections that contain recipes.'
  }
};

const config: ConfigProps = {
  microcopy
};

export default config;
