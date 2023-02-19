export interface ApiTestProps {
  getNavTaxonomy: () => [{ slug: string }];
  getRecipeSlugs: () => string[];
  getTagSlugs: () => string[];
  getRecipeIndex: () => [{ slug: string }];
  getRecipeList: () => [{ slug: string }];
  getRecipePage: () => { slug: string; title: string };
}

// import api library to mock
const api: ApiTestProps = jest.createMockFromModule('lib/api');

api.getNavTaxonomy = jest.fn().mockResolvedValue([{ slug: 'slug-1' }]);

api.getRecipeSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getTagSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getRecipeIndex = jest.fn().mockResolvedValue([
  {
    slug: 'slug-1',
    title: 'Title 1',
  },
  {
    slug: 'slug-2',
    title: 'Title 2',
  },
]);

api.getRecipeList = jest.fn().mockResolvedValue([
  {
    title: 'Recipe List Title',
    linkedFrom: {
      recipeCollection: {
        items: [
          {
            slug: 'slug-1',
            title: 'Title 1',
          },
          {
            slug: 'slug-2',
            title: 'Title 2',
          },
        ],
      },
    },
  },
]);

api.getRecipePage = jest.fn().mockResolvedValue([
  {
    title: 'Recipe Title',
    slug: 'slug-1',
    abstract: 'abstract',
    image: {
      sys: {
        id: 'sysid-1',
        __typename: 'Sys',
      },
      __typename: 'Asset',
      title: 'Image Title',
      description: 'Image description.',
      contentType: 'image/jpeg',
      fileName: 'filename.jpg',
      size: 99999,
      url: 'https://recipes.pliddy.com/url',
      height: 300,
      width: 400,
    },
  },
]);

module.exports = api;
