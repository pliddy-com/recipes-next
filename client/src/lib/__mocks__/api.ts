export interface ApiTestProps {
  getNavTaxonomy: () => [{ slug: string }];
  getRecipeSlugs: () => string[];
  getTagSlugs: () => string[];
  getRecipeIndex: () => [{ slug: string }];
  getRecipeList: () => [{ slug: string }];
  getRecipePage: () => { slug: string; title: string };
  getTagIndex: () => [{ slug: string; title: string }];
}

jest.mock('urql');

// import api library to mock
const api: ApiTestProps = jest.createMockFromModule('lib/api');

api.getNavTaxonomy = jest.fn().mockResolvedValue({
  categories: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' }
  ],
  cuisine: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' }
  ],
  tags: [
    { slug: 'slug-1', title: 'Title 1' },
    { slug: 'slug-2', title: 'Title 2' }
  ]
});

api.getRecipeSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getTagSlugs = jest.fn().mockResolvedValue(['slug-1', 'slug-2']);

api.getRecipeIndex = jest.fn().mockResolvedValue([
  {
    slug: 'slug-1',
    title: 'Title 1'
  },
  {
    slug: 'slug-2',
    title: 'Title 2'
  }
]);

api.getRecipeList = jest.fn().mockResolvedValue([
  {
    __typename: 'Tag',
    slug: 'baking',
    title: 'Baking',
    linkedFrom: {
      recipeCollection: {
        total: 3,
        items: [
          {
            __typename: 'Recipe',
            sys: {
              firstPublishedAt: '2022-06-17T00:02:14.528Z',
              __typename: 'Sys'
            },
            title: 'Biscuits',
            slug: 'biscuits',
            abstract:
              'Traditional baking powder biscuits that use grated frozen butter and folded dough to give the biscuits a soft, flaky texture.',
            image: {
              __typename: 'Asset',
              title: 'Biscuits',
              description:
                'A batch of baking soda biscuits on a parchment-lined baking sheet.',
              contentType: 'image/jpeg',
              fileName: 'biscuits.jpg',
              size: 2583242,
              url: 'https://images.ctfassets.net/fo9qwg6zarbt/B6C4D23gXNDNfGVrxb1DK/9d8e62c1faf660f7e542eed14e044b57/biscuits.jpg',
              height: 3024,
              width: 4032
            },
            tagsCollection: {
              items: [
                {
                  __typename: 'Tag',
                  title: 'Baking',
                  slug: 'baking'
                },
                {
                  __typename: 'Tag',
                  title: 'Biscuits',
                  slug: 'biscuits'
                },
                {
                  __typename: 'Tag',
                  title: 'Breakfast',
                  slug: 'breakfast'
                },
                {
                  __typename: 'Tag',
                  title: 'Southern',
                  slug: 'southern'
                }
              ],
              __typename: 'RecipeTagsCollection'
            }
          },
          {
            __typename: 'Recipe',
            sys: {
              firstPublishedAt: '2022-11-15T21:50:41.051Z',
              __typename: 'Sys'
            },
            title: 'No-Knead Olive Bread',
            slug: 'no-knead-olive-bread',
            abstract:
              'A savory variation of no-knead bread with the addition of olives, garlic, and rosemary to give it a Mediterranean twist.',
            image: {
              __typename: 'Asset',
              title: 'Olive Bread',
              description: 'Loaf of no-knead olive bread',
              contentType: 'image/jpeg',
              fileName: 'olive-bread.JPG',
              size: 2849709,
              url: 'https://images.ctfassets.net/fo9qwg6zarbt/2rUa4IhfkLtRRBmHS6ihcD/e953337e00d1eba9551b15e7eee18229/olive-bread.JPG',
              height: 3024,
              width: 4032
            },
            tagsCollection: {
              items: [
                {
                  __typename: 'Tag',
                  title: 'Baking',
                  slug: 'baking'
                },
                {
                  __typename: 'Tag',
                  title: 'Bread',
                  slug: 'bread'
                },
                {
                  __typename: 'Tag',
                  title: 'Olives',
                  slug: 'olives'
                },
                {
                  __typename: 'Tag',
                  title: 'Mediterranean',
                  slug: 'mediterranean'
                }
              ],
              __typename: 'RecipeTagsCollection'
            }
          },
          {
            __typename: 'Recipe',
            sys: {
              firstPublishedAt: '2022-06-18T22:42:01.107Z',
              __typename: 'Sys'
            },
            title: 'No-Knead Bread',
            slug: 'no-knead-bread',
            abstract:
              'No-knead bread using instant yeast and a dutch oven or covered ceramic bread pan for a classic, crispy crust.',
            image: {
              __typename: 'Asset',
              title: 'No Knead Bread',
              description:
                'Loaf of no-knead bread cooling on a wire baking rack.',
              contentType: 'image/jpeg',
              fileName: 'no-knead-bread.JPG',
              size: 2943075,
              url: 'https://images.ctfassets.net/fo9qwg6zarbt/6HZDSm8AK4iQHr9v2UOGpq/17569d5be00441216338c7800e5ebc2c/no-knead-bread.JPG',
              height: 3024,
              width: 4032
            },
            tagsCollection: {
              items: [
                {
                  __typename: 'Tag',
                  title: 'Baking',
                  slug: 'baking'
                },
                {
                  __typename: 'Tag',
                  title: 'Bread',
                  slug: 'bread'
                }
              ],
              __typename: 'RecipeTagsCollection'
            }
          }
        ],
        __typename: 'RecipeCollection'
      },
      __typename: 'TagLinkingCollections'
    }
  }
]);

api.getRecipePage = jest.fn().mockResolvedValue({
  recipe: {
    title: 'Recipe Title',
    slug: 'slug-1',
    __typename: 'Recipe',
    sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
    abstract: 'abstract',
    recipeYield: 4,
    prepTime: 15,
    cookTime: 60,
    keywords: ['keyword1', 'keyword2'],
    image: {
      sys: {
        id: 'sysid-1',
        __typename: 'Sys'
      },
      __typename: 'Asset',
      title: 'Image Title',
      description: 'Image description.',
      contentType: 'image/jpeg',
      fileName: 'filename.jpg',
      size: 99999,
      url: 'https://recipes.pliddy.com/url',
      height: 300,
      width: 400
    },
    ingredientsList: [
      {
        sectionTitle: 'Section Label 1',
        sectionItems: ['ingredient 1', 'ingredient 2']
      }
    ],
    equipment: ['equipment 1', 'equipment 2'],
    instructionsList: [
      {
        sectionTitle: 'Section Label 1',
        sectionItems: ['Instructions item 1']
      },
      {
        sectionTitle: 'Section Label 2',
        sectionItems: ['Instructions item 2', 'Instructions item 3']
      }
    ],
    notes: ['note 1'],
    tagsCollection: {
      items: [
        {
          sys: {
            id: 'sysid-4',
            __typename: 'Sys'
          },
          __typename: 'Tag',
          title: 'Tag 1',
          slug: 'tag-1'
        }
      ],
      __typename: 'RecipeTagsCollection'
    }
  },
  cuisine: [
    {
      __typename: 'Tag',
      title: 'Tag 1 Title',
      slug: 'tag-1',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-1',
              title: 'Title 2'
            },
            {
              __typename: 'Recipe',
              slug: 'slug-2',
              title: 'Title 1'
            }
          ]
        }
      }
    },
    {
      __typename: 'Tag',
      title: 'Tag 2 Title',
      slug: 'tag-2',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-3',
              title: 'Title 3'
            },
            {
              __typename: 'Recipe',
              slug: 'slug-4',
              title: 'Title 5'
            }
          ]
        }
      }
    }
  ],
  categories: [
    {
      __typename: 'Tag',
      title: 'Tag 1 Title',
      slug: 'tag-1',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-1',
              title: 'Title 2'
            },
            {
              __typename: 'Recipe',
              slug: 'slug-2',
              title: 'Title 1'
            }
          ]
        }
      }
    },
    {
      __typename: 'Tag',
      title: 'Tag 2 Title',
      slug: 'tag-2',
      linkedFrom: {
        recipeCollection: {
          total: 2,
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-3',
              title: 'Title 3'
            },
            {
              __typename: 'Recipe',
              slug: 'slug-4',
              title: 'Title 5'
            }
          ]
        }
      }
    }
  ]
});

api.getTagIndex = jest.fn().mockResolvedValue([
  {
    __typename: 'Tag',
    title: 'Tag 1 Title',
    slug: 'tag-1',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        items: [
          {
            __typename: 'Recipe',
            slug: 'slug-1',
            title: 'Title 2'
          },
          {
            __typename: 'Recipe',
            slug: 'slug-2',
            title: 'Title 1'
          }
        ]
      }
    }
  },
  {
    __typename: 'Tag',
    title: 'Tag 2 Title',
    slug: 'tag-2',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        items: [
          {
            __typename: 'Recipe',
            slug: 'slug-3',
            title: 'Title 3'
          },
          {
            __typename: 'Recipe',
            slug: 'slug-4',
            title: 'Title 5'
          }
        ]
      }
    }
  }
]);

module.exports = api;
