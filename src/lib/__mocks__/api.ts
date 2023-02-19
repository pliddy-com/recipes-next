export interface ApiTestProps {
  getNavTaxonomy: () => string[];
  getRecipeSlugs: () => string[];
  getTagSlugs: () => string[];
  getRecipeList: () => { content: string };
  getRecipeIndex: () => { content: string };
  getRecipePage: () => { content: string };
}

// import api library to mock
const api: ApiTestProps = jest.createMockFromModule('lib/api');

api.getNavTaxonomy = jest.fn().mockResolvedValue(['slug-1']);

api.getRecipeSlugs = jest.fn().mockResolvedValue(['slug-1']);

api.getTagSlugs = jest.fn().mockResolvedValue(['slug-1']);

api.getRecipeList = jest
  .fn()
  .mockResolvedValue([{ content: 'list page content' }]);

api.getRecipeIndex = jest
  .fn()
  .mockResolvedValue({ content: 'recipe collection' });

api.getRecipePage = jest
  .fn()
  .mockResolvedValue([{ content: 'recipe content' }]);

module.exports = api;
