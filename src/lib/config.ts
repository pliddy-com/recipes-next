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
    props: {
      recipe: [
        {
          viewMin: 900,
          imgWidth: 568,
        },
        {
          viewMin: 616,
          imgWidth: 800,
        },
        {
          viewMin: 432,
          imgWidth: 568,
        },
        {
          imgWidth: 400,
        },
      ],
      card: [
        {
          viewMin: 600,
          imgWidth: 400,
        },
        {
          viewMin: 435,
          imgWidth: 568,
        },
        {
          imgWidth: 400,
        },
      ],
    },
  },
};

export default config;
