const config = {
  microcopy: {
    category: {
      defaultTitle: 'Category',
    },
    index: {
      defaultTitle: 'All Recipes',
    },
    recipe: {
      defaultTitle: 'Recipe',
    },
    tag: {
      defaultTitle: 'Tag',
    },
  },
  images: {
    aspectRatio: 0.75,
    responsiveIncrement: 400,
    widths: {
      recipe: [
        {
          viewMin: 1200,
          imgWidth: 600,
        },
        {
          viewMin: 900,
          imgWidth: 400,
        },
        {
          viewMin: 800,
          imgWidth: 800,
        },
        {
          viewMin: 500,
          imgWidth: 600,
        },
        {
          viewMin: 320,
          imgWidth: 400,
        },
      ],
      card: [
        {
          viewMin: 600,
          imgWidth: 400,
        },
        {
          viewMin: 400,
          imgWidth: 600,
        },
        {
          viewMin: 320,
          imgWidth: 400,
        },
      ],
    },
  },
};

export default config;
