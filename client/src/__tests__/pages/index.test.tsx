import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import IndexPage, { getStaticProps } from 'pages/index';
import { RecipeSummaryFragment } from 'types/queries';

import config from 'lib/config';
import * as api from 'lib/api';

jest.mock('lib/config');
jest.mock('lib/api');
jest.mock('components/PageHead/PageTags/PageTags');
jest.mock('layout/RecipeGridPage/RecipeGridPage');

const env = process.env;

describe('Index in index.tsx', () => {
  beforeAll(async () => {
    jest.resetModules();
    process.env = {
      ...env,
      NEXT_PUBLIC_SITE_URL: 'https://test.recipes.pliddy.com'
    };

    await preloadAll();
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when there is content', () => {
    it('it renders the index page', async () => {
      const apiSpy = jest.spyOn(api, 'getRecipeIndex');
      const recipeCollectionData = await api.getRecipeIndex();

      const expectedProps = {
        props: {
          pageContent: recipeCollectionData,
          preview: true
        },
        revalidate: 60
      };

      const expectedDefaultProps = {
        ...expectedProps,
        props: { ...expectedProps.props, preview: false }
      };

      const { asFragment, queryByTestId } = render(
        <IndexPage
          pageContent={recipeCollectionData as RecipeSummaryFragment[]}
          preview={false}
        />
      );

      // wait for dynamic component to load
      await act(async () => waitFor(() => queryByTestId('RecipeGrid')));

      // assert getStaticProps returns a value and manages preview default
      expect(await getStaticProps({ preview: true })).toEqual(expectedProps);
      expect(await getStaticProps({ preview: undefined })).toEqual(
        expectedDefaultProps
      );

      expect(apiSpy).toHaveBeenCalledTimes(3);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the page', async () => {
      const { queryByTestId } = render(
        <IndexPage pageContent={[]} preview={false} />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('RecipeGrid')).toBeNull())
      );
    });
  });

  describe('when there is no config object', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', async () => {
      const { queryByTestId } = render(
        <IndexPage pageContent={[]} preview={false} />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('RecipeGrid')).toBeNull())
      );
    });
  });
});
