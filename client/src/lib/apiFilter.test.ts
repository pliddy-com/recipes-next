import '@testing-library/jest-dom';
import {
  NavTaxonomyFragment,
  // TagDefaultFragment,
  TagTaxonomyFragment,
  TagWithLinksFragment
} from 'types/queries';

import {
  filterSlugs,
  filterTagsWithRecipes,
  filterTaxonomyItemsWithRecipes
} from './apiFilters';

describe('apiFilter', () => {
  describe('when filterSlugs() is called', () => {
    it('it returns a filtered list of slugs', () => {
      const payload: TagWithLinksFragment[] = [
        {
          __typename: 'Tag',
          sys: {
            id: 'tag-id-1'
          },
          slug: 'tag-a',
          title: 'Tag A',
          linkedFrom: {
            recipeCollection: {
              total: 1,
              __typename: 'RecipeCollection'
            },
            __typename: 'TagLinkingCollections'
          }
        },
        {
          __typename: 'Tag',
          sys: {
            id: 'tag-id-2'
          },
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
          sys: {
            id: 'tag-id-3'
          },
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

      const expected = ['tag-a', 'tag-b', 'tag-c'];

      const res = filterSlugs(payload);
      expect(res).toEqual(expected);
    });
  });

  describe('when filterTagsWithRecipes() is called', () => {
    it('it returns a filtered list of slugs', () => {
      const expectedTags = [
        {
          __typename: 'Tag',
          sys: {
            id: 'tag-id-2'
          },
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
          sys: {
            id: 'tag-id-3'
          },
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

      const tagCollectionPayload: TagTaxonomyFragment = {
        __typename: 'TagCollection',
        total: 3,
        items: [
          {
            __typename: 'Tag',
            sys: {
              id: 'tag-id-1'
            },
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
          {
            __typename: 'Tag',
            sys: {
              id: 'tag-id-2'
            },
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
            sys: {
              id: 'tag-id-3'
            },
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
        ]
      };

      const res = filterTagsWithRecipes({
        tagCollection: tagCollectionPayload
      });
      expect(res).toEqual(expectedTags);
    });
  });

  describe('when filterTaxonomyItemsWithRecipes() is called', () => {
    it('it returns a filtered list of slugs', () => {
      const expected = [
        {
          __typename: 'Tag',
          sys: {
            id: 'tag-id-1'
          },
          title: 'Baking',
          slug: 'baking',
          linkedFrom: {
            recipeCollection: {
              total: 3,
              __typename: 'RecipeCollection'
            },
            __typename: 'TagLinkingCollections'
          }
        },
        {
          __typename: 'Taxonomy',
          title: 'Meat',
          slug: 'meat',
          tag: {
            __typename: 'Tag',
            sys: {
              id: 'tag-id-3'
            },
            title: 'Meat',
            slug: 'meat',
            linkedFrom: {
              recipeCollection: {
                total: 3,
                __typename: 'RecipeCollection'
              },
              __typename: 'TagLinkingCollections'
            }
          },
          childrenCollection: {
            total: 3,
            items: [
              {
                __typename: 'Tag',
                sys: {
                  id: 'tag-id-4'
                },
                title: 'Beef',
                slug: 'beef',
                linkedFrom: {
                  recipeCollection: {
                    total: 1,
                    __typename: 'RecipeCollection'
                  },
                  __typename: 'TagLinkingCollections'
                }
              },
              {
                __typename: 'Tag',
                sys: {
                  id: 'tag-id-5'
                },
                title: 'Chicken',
                slug: 'chicken',
                linkedFrom: {
                  recipeCollection: {
                    total: 0,
                    __typename: 'RecipeCollection'
                  },
                  __typename: 'TagLinkingCollections'
                }
              },
              {
                __typename: 'Tag',
                sys: {
                  id: 'tag-id-6'
                },
                title: 'Pork',
                slug: 'pork',
                linkedFrom: {
                  recipeCollection: {
                    total: 2,
                    __typename: 'RecipeCollection'
                  },
                  __typename: 'TagLinkingCollections'
                }
              }
            ],
            __typename: 'TaxonomyChildrenCollection'
          }
        }
      ];
      const payload: NavTaxonomyFragment = {
        items: [
          {
            __typename: 'Taxonomy',
            title: 'Categories',
            slug: 'categories',
            tag: null,
            childrenCollection: {
              total: 16,
              items: [
                {
                  __typename: 'Tag',
                  sys: {
                    id: 'tag-id-1'
                  },
                  title: 'Baking',
                  slug: 'baking',
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
                  sys: {
                    id: 'tag-id-2'
                  },
                  title: 'Dessert',
                  slug: 'dessert',
                  linkedFrom: {
                    recipeCollection: {
                      total: 0,
                      __typename: 'RecipeCollection'
                    },
                    __typename: 'TagLinkingCollections'
                  }
                },
                {
                  __typename: 'Taxonomy',
                  title: 'Meat',
                  slug: 'meat',
                  tag: {
                    __typename: 'Tag',
                    sys: {
                      id: 'tag-id-3'
                    },
                    title: 'Meat',
                    slug: 'meat',
                    linkedFrom: {
                      recipeCollection: {
                        total: 3,
                        __typename: 'RecipeCollection'
                      },
                      __typename: 'TagLinkingCollections'
                    }
                  },
                  childrenCollection: {
                    total: 3,
                    items: [
                      {
                        __typename: 'Tag',
                        sys: {
                          id: 'tag-id-4'
                        },
                        title: 'Beef',
                        slug: 'beef',
                        linkedFrom: {
                          recipeCollection: {
                            total: 1,
                            __typename: 'RecipeCollection'
                          },
                          __typename: 'TagLinkingCollections'
                        }
                      },
                      {
                        __typename: 'Tag',
                        sys: {
                          id: 'tag-id-5'
                        },
                        title: 'Chicken',
                        slug: 'chicken',
                        linkedFrom: {
                          recipeCollection: {
                            total: 0,
                            __typename: 'RecipeCollection'
                          },
                          __typename: 'TagLinkingCollections'
                        }
                      },
                      {
                        __typename: 'Tag',
                        sys: {
                          id: 'tag-id-6'
                        },
                        title: 'Pork',
                        slug: 'pork',
                        linkedFrom: {
                          recipeCollection: {
                            total: 2,
                            __typename: 'RecipeCollection'
                          },
                          __typename: 'TagLinkingCollections'
                        }
                      }
                    ],
                    __typename: 'TaxonomyChildrenCollection'
                  }
                }
              ],
              __typename: 'TaxonomyChildrenCollection'
            }
          }
        ],
        __typename: 'TaxonomyCollection',
        total: 1
      };

      const res = filterTaxonomyItemsWithRecipes({
        taxonomyCollection: payload
      });

      expect(res).toEqual(expected);
    });
  });
});
