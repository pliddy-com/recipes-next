import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RecipeSlugPage, {
  getStaticPaths,
  getStaticProps,
} from 'pages/recipe/[slug]';

import { RecipeDefaultFragment } from 'types/queries';

import config from 'lib/config';
import * as api from 'lib/api';

jest.mock('lib/config');
jest.mock('lib/api');
jest.mock('components/PageHead/PageHead');
jest.mock('layout/RecipePage/RecipePage');

describe('RecipePage in recipe/[slug].tsx', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const getRecipeSlugsSpy = jest.spyOn(api, 'getRecipeSlugs');
      const getRecipeSpy = jest.spyOn(api, 'getRecipePage');

      const [pageContent] = await api.getRecipePage();

      const propsContext = {
        preview: false,
        params: { slug: 'slug' },
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

      const { container } = render(
        <RecipeSlugPage
          pageContent={pageContent as unknown as RecipeDefaultFragment}
          preview={false}
        />
      );

      expect(await getStaticProps(propsContext)).toEqual(expectedProps);
      expect(await getStaticPaths({})).toEqual(expectedPaths);

      expect(getRecipeSlugsSpy).toHaveBeenCalledTimes(1);
      expect(getRecipeSpy).toHaveBeenCalledTimes(2);

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
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
    beforeEach(() => {
      delete config.microcopy;
    });

    it('it does not render the page', () => {
      const pageContent = undefined as unknown as RecipeDefaultFragment;

      const { queryByTestId } = render(
        <RecipeSlugPage pageContent={pageContent} preview={false} />
      );

      // assert that page container is not rendered
      expect(queryByTestId('RecipeGridPage')).toBeNull();
    });
  });
});
