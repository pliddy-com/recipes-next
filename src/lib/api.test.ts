import '@testing-library/jest-dom';
// import { queryGraphQLContent } from 'lib/gqlClient';
import * as gqlClient from 'lib/gqlClient';

import {
  getNavTaxonomy,
  getRecipeSlugs,
  getTagSlugs,
  getRecipeList,
  getRecipeIndex,
  getRecipePage,
} from './api';

jest.mock('lib/gqlClient');

// TODO: create mock for queryGraphQLContent from 'lib/gqlClient'

// TODO: rename queries in API and GQL queries to be consistent
//       and clearly understandable
//       (queryNavTaxonomy, queryRecipeIndex, queryRecipeByTag, queryRecipe)

describe('api', () => {
  describe('when getNavTaxonomy() is called', () => {
    it('it returns a correctly formatted taxonomyCollection', async () => {
      const items = [{ slug: 'test' }];
      const payload = { taxonomyCollection: { items } };

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValue(payload);

      const variables = {};
      const res = await getNavTaxonomy(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(items);
    });
  });

  describe('when getRecipeSlugs() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('getRecipeSlugs', getRecipeSlugs);
    });

    it('it returns a correctly formatted taxonomyCollection', async () => {
      const items = [{ slug: 'slug1' }, { slug: 'slug2' }];
      const payload = { recipeCollection: { items } };
      const expected = ['slug1', 'slug2'];

      const gqlSpy = jest
        .spyOn(gqlClient, 'queryGraphQLContent')
        .mockResolvedValue(payload);

      const variables = {};
      const res = await getRecipeSlugs(variables);

      expect(gqlSpy).toHaveBeenCalled();
      expect(res).toEqual(expected);
    });
  });

  describe('when getTagSlugs() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('getTagSlugs', getTagSlugs);
    });
  });

  describe('when getRecipeList() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('getRecipeList', getRecipeList);
    });
  });

  describe('when getRecipeIndex() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log(' getRecipeIndex', getRecipeIndex);
    });
  });

  describe('when getRecipePage() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('getRecipePage', getRecipePage);
    });
  });
});
