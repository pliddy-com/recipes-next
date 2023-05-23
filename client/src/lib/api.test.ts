import '@testing-library/jest-dom';
import * as gqlClient from 'lib/gqlClient';

import {
  getLinkedEntries,
  getNavTaxonomy,
  getRecipeIndex,
  getRecipeList,
  getRecipePage,
  getRecipeSlugs,
  getTagIndex,
  getTagSlugs
} from './api';

jest.mock('lib/gqlClient');

import * as urql from 'urql';
import { Client } from 'urql';
import { never } from 'wonka';

jest.mock('urql');
const mockedUrql = urql as jest.Mocked<typeof urql>;

const client = {
  query: jest.fn(() => never)
};

mockedUrql.createClient.mockReturnValue(client as unknown as Client);

const expectedTags = [
  {
    __typename: 'Tag',
    slug: 'tag-b',
    title: 'Tag B',
    linkedFrom: {
      recipeCollection: {
        total: 3,
        __typename: 'RecipeCollection'
      },
      __typename: 'TagLinkingCollections'
    }
  },
  {
    __typename: 'Tag',
    slug: 'tag-c',
    title: 'Tag C',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        __typename: 'RecipeCollection'
      },
      __typename: 'TagLinkingCollections'
    }
  }
];

const expectedImages = [
  {
    __typename: 'Asset',
    sys: {
      id: 'img-id-1'
    },
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
  {
    __typename: 'Asset',
    sys: {
      id: 'img-id-2'
    },
    title: 'Olive Bread',
    description: 'Loaf of no-knead olive bread',
    contentType: 'image/jpeg',
    fileName: 'olive-bread.JPG',
    size: 2849709,
    url: 'https://images.ctfassets.net/fo9qwg6zarbt/2rUa4IhfkLtRRBmHS6ihcD/e953337e00d1eba9551b15e7eee18229/olive-bread.JPG',
    height: 3024,
    width: 4032
  },
  {
    __typename: 'Asset',
    sys: {
      id: 'img-id-3'
    },
    title: 'No Knead Bread',
    description: 'Loaf of no-knead bread cooling on a wire baking rack.',
    contentType: 'image/jpeg',
    fileName: 'no-knead-bread.JPG',
    size: 2943075,
    url: 'https://images.ctfassets.net/fo9qwg6zarbt/6HZDSm8AK4iQHr9v2UOGpq/17569d5be00441216338c7800e5ebc2c/no-knead-bread.JPG',
    height: 3024,
    width: 4032
  }
];

const linkedEntriesPayload = {
  images: { items: expectedImages },
  tags: { items: expectedTags }
};

const tagCollectionPayload = {
  __typename: 'TagCollection',
  total: 65,
  items: [
    {
      __typename: 'Tag',
      slug: 'tag-a',
      title: 'Tag A',
      linkedFrom: {
        recipeCollection: {
          total: 0,
          __typename: 'RecipeCollection'
        },
        __typename: 'TagLinkingCollections'
      }
    },
    ...expectedTags
  ]
};

const expectedTagCollectionChildren = [
  {
    __typename: 'Tag',
    title: 'Tag A',
    slug: 'tag-a',
    linkedFrom: {
      recipeCollection: {
        total: 3,
        __typename: 'RecipeCollection'
      },
      __typename: 'TagLinkingCollections'
    }
  },
  {
    __typename: 'Tag',
    title: 'Tag B',
    slug: 'tag-b',
    linkedFrom: {
      recipeCollection: {
        total: 2,
        __typename: 'RecipeCollection'
      },
      __typename: 'TagLinkingCollections'
    }
  }
];

const taxonomyCollectionPayload = {
  __typename: 'TaxonomyCollection',
  items: [
    {
      __typename: 'Taxonomy',
      title: 'Categories',
      slug: 'categories',
      tag: null,
      childrenCollection: {
        total: 3,
        items: [
          {
            __typename: 'Tag',
            title: 'Tag C',
            slug: 'tag-c',
            linkedFrom: {
              recipeCollection: {
                total: 0,
                __typename: 'RecipeCollection'
              },
              __typename: 'TagLinkingCollections'
            }
          },
          ...expectedTagCollectionChildren
        ],
        __typename: 'TaxonomyChildrenCollection'
      }
    }
  ]
};

describe('api', () => {
  describe('when getNavTaxonomy() is called', () => {
    it('it returns a taxonomyCollection', async () => {
      const payload = {
        categories: taxonomyCollectionPayload,
        cuisine: taxonomyCollectionPayload,
        tags: tagCollectionPayload
      };

      const expected = {
        categories: expectedTagCollectionChildren,
        cuisine: expectedTagCollectionChildren,
        tags: expectedTags
      };

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const res = await getNavTaxonomy();

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = {};
        const expected = {};

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const res = await getNavTaxonomy();

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getLinkedEntries() is called', () => {
    it('it returns collections of all tags and all images', async () => {
      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(linkedEntriesPayload);

      const { tags, images } = await getLinkedEntries();
      expect(gqlSpy).toHaveBeenCalled();
      expect(tags).toEqual(expectedTags);
      expect(images).toEqual(expectedImages);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { tags: null, images: null };
        const expected = {};

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const res = await getLinkedEntries();

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getRecipeSlugs() is called', () => {
    it('it returns a list of recipe slugs', async () => {
      const items = [{ slug: 'slug-1' }, { slug: 'slug-2' }];
      const payload = {
        __typename: 'RecipeCollection',
        recipeCollection: { items }
      };
      const expected = ['slug-1', 'slug-2'];

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const variables = {};
      const res = await getRecipeSlugs(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { recipeCollection: null };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getRecipeSlugs(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });

    describe('if invalid child data is returned', () => {
      it('it returns an empty array', async () => {
        const items = [null, null];
        const payload = { recipeCollection: { items } };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getRecipeSlugs(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getTagSlugs() is called', () => {
    it('it returns a list of tag slugs', async () => {
      const payload = {
        tagCollection: {
          items: [
            {
              slug: 'slug-1',
              linkedFrom: {
                recipeCollection: { total: 1 }
              }
            },
            {
              slug: 'slug-2',
              linkedFrom: {
                recipeCollection: { total: 2 }
              }
            },
            {
              slug: 'slug-3',
              linkedFrom: {
                recipeCollection: { total: 0 }
              }
            }
          ]
        }
      };

      const expected = ['slug-1', 'slug-2'];

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const variables = {};
      const res = await getTagSlugs(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { tagCollection: null };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getTagSlugs(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });

    describe('if invalid child data is returned', () => {
      it('it returns an empty array', async () => {
        const items = [
          {
            linkedFrom: { recipeCollection: { total: 1 } }
          }
        ];

        const payload = { tagCollection: { items } };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getTagSlugs(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getRecipeIndex() is called', () => {
    it('it returns a collection of all recipes for the home page', async () => {
      const recipeItems = [
        {
          slug: 'slug-1'
        },
        {
          slug: 'slug-2'
        }
      ];

      const payload = {
        recipeCollection: {
          total: 2,
          items: recipeItems
        }
      };

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const variables = {};
      const res = await getRecipeIndex(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(recipeItems);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { recipeCollection: null };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getRecipeIndex(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getRecipeList() is called', () => {
    it('it returns a collection of recipes matching the tag', async () => {
      const items = [
        {
          slug: 'slug-1'
        },
        {
          slug: 'slug-2'
        }
      ];

      const payload = {
        tagCollection: {
          items
        }
      };

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const variables = {};
      const res = await getRecipeList(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(items);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { tagCollection: null };
        const expected: unknown[] = [];

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getRecipeList(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });

  describe('when getRecipePage() is called', () => {
    it('it returns the content for a recipe', async () => {
      const categories = [
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
      ];

      const cuisine = [
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
                  title: 'Title 1'
                },
                {
                  __typename: 'Recipe',
                  slug: 'slug-2',
                  title: 'Title 2'
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
                  title: 'Title 4'
                }
              ]
            }
          }
        }
      ];

      const recipe = {
        title: 'Recipe Title',
        slug: 'slug-1',
        tagCollection: {
          items: [
            {
              __typename: 'Recipe',
              slug: 'slug-1',
              title: 'Title 1'
            },
            {
              __typename: 'Recipe',
              slug: 'slug-4',
              title: 'Title 4'
            }
          ]
        }
      };

      const expected = {
        recipe,
        categories,
        cuisine
      };

      const payload = {
        recipeCollection: {
          items: [recipe]
        },
        categoriesTaxonomy: {
          items: [
            {
              childrenCollection: {
                items: categories
              }
            }
          ]
        },
        cuisineTaxonomy: {
          items: [
            {
              childrenCollection: {
                items: cuisine
              }
            }
          ]
        }
      };

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const res = await getRecipePage({});

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });

    describe('if no valid data is returned', () => {
      it('it returns an empty array', async () => {
        const payload = { recipeCollection: null };
        const expected = {};

        const gqlSpy = jest
          .spyOn(gqlClient, 'queryGraphQLContent')
          .mockResolvedValueOnce(payload);

        const variables = {};
        const res = await getRecipePage(variables);

        expect(gqlSpy).toHaveBeenCalled();
        expect(res).toEqual(expected);
      });
    });
  });
});

describe('when getTagIndex() is called', () => {
  it('it returns a collection of tags with recipes', async () => {
    const items = [
      {
        title: 'Tag 1 Title',
        slug: 'tag-1',
        linkedFrom: {
          recipeCollection: {
            total: 2,
            items: [
              {
                slug: 'slug-1',
                title: 'Title 1'
              },
              {
                slug: 'slug-2',
                title: 'Title 2'
              }
            ]
          }
        }
      },
      {
        title: 'Tag 2 Title',
        slug: 'tag-2',
        linkedFrom: {
          recipeCollection: {
            total: 2,
            items: [
              {
                slug: 'slug-3',
                title: 'Title 3'
              },
              {
                slug: 'slug-4',
                title: 'Title 5'
              }
            ]
          }
        }
      }
    ];

    const payload = {
      tagCollection: {
        items
      }
    };

    const gqlSpy = jest
      .spyOn(gqlClient, 'queryGraphQLContent')
      .mockResolvedValueOnce(payload);

    const variables = {};
    const res = await getTagIndex(variables);

    expect(gqlSpy).toHaveBeenCalled();
    expect(res).toEqual(items);
  });

  describe('if no valid data is returned', () => {
    it('it returns an empty array', async () => {
      const payload = { tagCollection: null };
      const expected: unknown[] = [];

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValueOnce(payload);

      const variables = {};
      const res = await getTagIndex(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });
  });
});
