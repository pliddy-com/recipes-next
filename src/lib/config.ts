const config = {
  microcopy: {
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
