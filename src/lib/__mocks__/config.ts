import { ConfigProps } from 'lib/config';

const microcopy = {
  category: {
    defaultDescription: 'Category default description',
    defaultTitle: 'Category Default Title',
  },
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
