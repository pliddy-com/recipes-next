import { ConfigProps } from 'lib/config';

const microcopy = {
  index: {
    defaultTitle: 'Index Default Title',
    description: 'Index default description.',
  },
  recipe: {
    defaultDescription: 'Recipe default description',
    defaultTitle: 'Recipe Default Title',
  },
  site: {
    title: 'Site Title',
    domain: 'https://recipes.pliddy.com',
  },
  tag: {
    defaultDescription: 'Tag default description',
    defaultTitle: 'Tag Default Title',
  },
};

const config: ConfigProps = {
  microcopy,
};

module.exports = config;