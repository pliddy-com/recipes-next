import {
  TagCollection,
  NavMenuDataQuery,
  RecipeDefaultFragment,
  TagDefaultFragment
} from 'types/queries';

import { hasValue } from 'lib/utils';

export const filterSlugs = (
  items: (RecipeDefaultFragment | TagDefaultFragment)[]
) =>
  items &&
  items
    ?.map((child) => (child && child.slug ? child.slug : null))
    .filter(hasValue);

export const filterTagsWithRecipes = ({
  tagCollection
}: {
  tagCollection: TagCollection;
}) =>
  tagCollection &&
  tagCollection?.items
    .filter(hasValue)
    .filter(
      (item) =>
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0
    );

export const filterTaxonomyItemsWithRecipes = (
  taxonomyCollection: NavMenuDataQuery['categories']
) => {
  return taxonomyCollection?.items?.[0]?.childrenCollection?.items?.filter(
    (item) =>
      item &&
      (('linkedFrom' in item && // is a tag
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0) ||
        ('childrenCollection' in item && // is a taxonomy
          item?.childrenCollection?.total &&
          item?.childrenCollection?.total > 0))
  );
};

// TODO: update to filter out childrenCollection.items.linkedFrom.recipeCollection.total <== 0
