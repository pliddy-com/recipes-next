import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import TagSlugPage, { getStaticPaths, getStaticProps } from 'pages/tag/[slug]';
import { ListPageItemFragment } from 'types/queries';

import * as api from 'lib/api';
import config from 'lib/config';

jest.mock('lib/api');
jest.mock('lib/config');
jest.mock('components/PageHead/PageHead');
jest.mock('layout/RecipeGridPage/RecipeGridPage');

describe('TagPage in tag/[slug].tsx', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const getTagSlugsSpy = jest.spyOn(api, 'getTagSlugs');
      const getRecipeListSpy = jest.spyOn(api, 'getRecipeList');

      const [pageContent] = await api.getRecipeList({});

      const tagSlugData = { slug: 'slug-1' };

      const propsContext = {
        preview: false,
        params: tagSlugData,
      };

      const expectedProps = {
        props: {
          pageContent,
          preview: false,
        },
        revalidate: 60,
      };

      const expectedPaths = {
        fallback: false,
        paths: [{ params: { slug: 'slug-1' } }, { params: { slug: 'slug-2' } }],
      };

      const { asFragment } = render(
        <TagSlugPage pageContent={pageContent} preview={false} />
      );

      expect(await getStaticProps(propsContext)).toEqual(expectedProps);
      expect(await getStaticPaths({})).toEqual(expectedPaths);

      expect(getTagSlugsSpy).toHaveBeenCalledTimes(1);
      expect(getRecipeListSpy).toHaveBeenCalledTimes(2);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });

    describe('when the slug is not a string', () => {
      it('it does not render the page', async () => {
        const propsContext = {
          preview: false,
          params: { slug: undefined },
        };

        try {
          await getStaticProps(propsContext);
        } catch (e) {
          expect(e).toEqual(
            new Error('Error in SSG. The slug property is not a string.')
          );
        }
      });
    });
  });

  describe('when there is no page content', () => {
    // before each test, delete microcopy node from config
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the category page', () => {
      const pageContent = undefined as unknown as ListPageItemFragment;

      const { queryByTestId } = render(
        <TagSlugPage pageContent={pageContent} preview={false} />
      );

      // assert that page container is not rendered
      expect(queryByTestId('RecipeGridPage')).toBeNull();
    });
  });
});
