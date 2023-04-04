import {
  TagDefaultFragment,
  NavTaxonomyFragment,
  TagTaxonomyFragment,
  RecipeSlugFragment
} from '../types/queries';

import { hasValue } from './utils';

export const filterSlugs = (
  items: (RecipeSlugFragment | TagDefaultFragment | null)[]
) =>
  items &&
  items
    ?.map((child) => (child && child.slug ? child.slug : null))
    .filter(hasValue);

export const filterTagsWithRecipes = ({
  tagCollection
}: {
  tagCollection: TagTaxonomyFragment;
}) =>
  tagCollection &&
  tagCollection?.items
    .filter(hasValue)
    .filter(
      (item) =>
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0
    );

export const filterTaxonomyItemsWithRecipes = ({
  taxonomyCollection
}: {
  taxonomyCollection: NavTaxonomyFragment;
}) => {
  return taxonomyCollection?.items?.[0]?.childrenCollection?.items?.filter(
    (item) =>
      item &&
      (('linkedFrom' in item &&
        item.linkedFrom &&
        'recipeCollection' in item.linkedFrom && // is a tag
        item?.linkedFrom?.recipeCollection?.total &&
        item?.linkedFrom?.recipeCollection?.total > 0) ||
        ('childrenCollection' in item && // is a taxonomy
          item?.childrenCollection?.total &&
          item?.childrenCollection?.total > 0))
  );
};

// TODO: update to filter out childrenCollection.items.linkedFrom.recipeCollection.total <== 0
