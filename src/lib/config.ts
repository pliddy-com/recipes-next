interface PageProps {
  defaultDescription?: string;
  defaultTitle?: string;
  description?: string;
  title?: string;
}

interface WidthProps {
  viewMin?: number;
  imgWidth: number;
}

interface MicrocopyProps {
  category?: PageProps;
  index?: PageProps;
  recipe?: PageProps;
  site?: PageProps;
  tag?: PageProps;
}

interface ImageProps {
  recipe: WidthProps[];
  card: WidthProps[];
}

export type ConfigProps = {
  microcopy?: {
    category?: PageProps;
    index?: PageProps;
    recipe?: PageProps;
    site?: PageProps;
    tag?: PageProps;
  };
  images?: {
    recipe: WidthProps[];
    card: WidthProps[];
  };
};

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
  },
  tag: {
    defaultDescription: 'A collection of recipies tagged as',
    defaultTitle: 'Tag',
  },
};

const images: ImageProps = {
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

export default config;
