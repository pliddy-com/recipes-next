import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import TagListPage, {
  getStaticPaths,
  getStaticProps
} from 'pages/tags/page/[page]';

import { ListPageItemFragment } from 'types/queries';

import config from 'lib/config';
import * as api from 'lib/api';

jest.mock('lib/config');
jest.mock('lib/api');
jest.mock('components/PageHead/PageTags/PageTags');
jest.mock('layout/TagGridPage/TagGridPage');

const env = process.env;

describe('RecipeListPage in [page].tsx', () => {
  beforeEach(async () => {
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
    it('it renders the page', async () => {
      const getTagIndexSpy = jest.spyOn(api, 'getTagIndex');
      const tagData = await api.getTagIndex();
      const page = 1;

      const expectedProps = {
        props: {
          pageContent: tagData,
          preview: true,
          page
        },
        revalidate: 60
      };

      const context = {
        params: { page: '1' },
        preview: true
      };

      const expectedPaths = {
        fallback: false,
        paths: [{ params: { page: '1' } }]
      };

      const { asFragment, queryByTestId } = render(
        <TagListPage
          pageContent={tagData as ListPageItemFragment[]}
          page={page}
          preview={false}
        />
      );

      // wait for dynamic component to load
      await act(async () => waitFor(() => queryByTestId('RecipeGrid')));

      // assert getStaticProps returns a value and manages preview default
      expect(await getStaticProps(context)).toEqual(expectedProps);
      expect(await getStaticPaths({})).toEqual(expectedPaths);

      expect(getTagIndexSpy).toHaveBeenCalledTimes(3);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page parameter', () => {
    it('it renders the page', async () => {
      // const getRecipeIndexSpy = jest.spyOn(api, 'getRecipeIndex');
      const tagData = await api.getTagIndex();

      const expectedProps = {
        props: {
          pageContent: tagData,
          preview: true,
          page: undefined
        },
        revalidate: 60
      };

      const context = {
        params: { page: undefined },
        preview: true
      };

      const { asFragment, queryByTestId } = render(
        <TagListPage
          pageContent={tagData as ListPageItemFragment[]}
          page={undefined}
          preview={false}
        />
      );

      // wait for dynamic component to load
      await act(async () => waitFor(() => queryByTestId('RecipeGrid')));

      // assert getStaticProps returns a value and manages preview default
      expect(await getStaticProps(context)).toEqual(expectedProps);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the page', async () => {
      const { queryByTestId } = render(
        <TagListPage pageContent={[]} preview={false} page={undefined} />
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
        <TagListPage pageContent={[]} preview={false} page={undefined} />
      );

      // wait for dynamic component to load
      await act(async () =>
        waitFor(() => expect(queryByTestId('RecipeGrid')).toBeNull())
      );
    });
  });
});
