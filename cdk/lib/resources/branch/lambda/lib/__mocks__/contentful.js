const fields = {
  abstract: { 'en-US': 'abstract' },
  cookTime: { 'en-US': 30 },
  id: { 'en-US': 'ID' },
  equipment: { 'en-US': ['equipment 1'] },
  ingredientsList: {
    'en-US': [
      {
        sectionTitle: 'Ingredients Section',
        sectionItems: ['ingredient 1', 'ingredient 2']
      }
    ]
  },
  instructionsList: {
    'en-US': [
      {
        sectionTitle: 'Instructions Section',
        sectionItems: ['Instruction 1', 'Instruction 2']
      }
    ]
  },
  keywords: { 'en-US': ['keyword 1', 'keyword 2'] },
  notes: { 'en-US': ['note 1'] },
  prepTime: { 'en-US': 15 },
  recipeYield: { 'en-US': 4 },
  slug: { 'en-US': 'slug' },
  tags: [
    {
      sys: { type: 'Link', linkType: 'Entry', id: 'id-1' }
    }
  ],
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
