import { ConfigProps } from 'lib/config';

const microcopy = {
  index: {
    defaultTitle: 'Index Default Title',
    description: 'Index default description.'
  },
  notFound: {
    defaultTitle: 'Page Not Found',
    description: 'The requested url was not found'
  },
  recipe: {
    defaultDescription: 'Recipe default description for',
    defaultTitle: 'Recipe Default Title'
  },
  search: {
    defaultTitle: 'Results for',
    description: 'Search results'
  },
  site: {
    title: 'Site Title',
    domain: 'https://recipes.pliddy.com'
  },
  tag: {
    defaultDescription: 'Tag default description for',
    defaultTitle: 'Tag Default Title'
  },
  tagIndex: {
    defaultTitle: 'Tag Index Default Title',
    description: 'Tag index default description.'
  }
};

const config: ConfigProps = {
  microcopy
};

module.exports = config;
