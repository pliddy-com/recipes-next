const fields = {
  abstract: { 'en-US': 'abstract' },
  cookTime: { 'en-US': 30 },
  id: { 'en-US': 'ID' },
  prepTime: { 'en-US': 15 },
  recipeYield: { 'en-US': 4 },
  slug: { 'en-US': 'slug' },
  title: { 'en-US': 'title' }
};

const getSpace = jest.fn().mockImplementation(() => ({
  getEnvironment: jest.fn().mockImplementation(() => ({
    getEntry: jest.fn().mockImplementation(() => ({
      fields,
      update: jest.fn().mockImplementation(() => ({
        fields,
        publish: jest.fn().mockImplementation(() => ({
          fields
        }))
      }))
    }))
  }))
}));

const client = { getSpace };

module.exports = client;
