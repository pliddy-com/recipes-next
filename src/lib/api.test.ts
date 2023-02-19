import '@testing-library/jest-dom';

import {
  queryNavContent,
  queryPageSlugs,
  queryTagSlugs,
  queryListPageContent,
  queryRecipeCollectionContent,
  queryRecipeContent,
} from './api';

// TODO: create mock for queryGraphQLContent from 'lib/gqlClient'

// TODO: rename queries in API and GQL queries to be consistent
//       and clearly understandable
//       (queryNavTaxonomy, queryRecipeIndex, queryRecipeByTag, queryRecipe)

describe('api', () => {
  describe('when queryNavContent() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('queryNavContent', queryNavContent);
    });
  });

  describe('when queryPageSlugs() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('queryPageSlugs', queryPageSlugs);
    });
  });

  describe('when queryTagSlugs() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('queryTagSlugs', queryTagSlugs);
    });
  });

  describe('when queryListPageContent() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('queryListPageContent', queryListPageContent);
    });
  });

  describe('when queryRecipeCollectionContent() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log(
        ' queryRecipeCollectionContent',
        queryRecipeCollectionContent
      );
    });
  });

  describe('when queryRecipeContent() is called', () => {
    it('it returns a correctly formatted taxonomy', () => {
      console.log('queryRecipeContent', queryRecipeContent);
    });
  });
});
