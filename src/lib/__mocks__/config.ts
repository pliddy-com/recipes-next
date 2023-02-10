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

const images = {
  recipe: [
    {
      viewMin: 704,
      imgWidth: 832,
    },
    {
      viewMin: 448,
      imgWidth: 624,
    },
    {
      imgWidth: 416,
    },
  ],
  card: [
    {
      viewMin: 740,
      imgWidth: 446,
    },
    {
      viewMin: 600,
      imgWidth: 336,
    },
    {
      viewMin: 435,
      imgWidth: 568,
    },
    {
      imgWidth: 336,
    },
  ],
};

const config: ConfigProps = {
  microcopy,
  images,
};

module.exports = config;
