interface apiProps {
  queryPageSlugs: () => string[];
  queryCategorySlugs: () => string[];
  queryTagSlugs: () => string[];
  queryListPageContent: () => { content: string };
  queryRecipeCollectionContent: () => { content: string };
  queryRecipeContent: () => { content: string };
}

// import api library to mock
const api: apiProps = jest.createMockFromModule('lib/api');

api.queryPageSlugs = jest.fn().mockResolvedValue(['slug-1']);

api.queryCategorySlugs = jest.fn().mockResolvedValue(['slug-1']);

api.queryTagSlugs = jest.fn().mockResolvedValue(['slug-1']);

api.queryListPageContent = jest
  .fn()
  .mockResolvedValue([{ content: 'list page content' }]);

api.queryRecipeCollectionContent = jest
  .fn()
  .mockResolvedValue({ content: 'recipe collection' });
api.queryRecipeContent = jest
  .fn()
  .mockResolvedValue([{ content: 'recipe content' }]);

module.exports = api;
