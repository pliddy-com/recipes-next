import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RecipeGridPage from './RecipeGridPage';
import { RecipeDefaultFragment } from 'types/queries';

jest.mock('lib/api');

describe('RecipeGridPage', () => {
  describe('when there is page content', () => {
    it('it renders the RecipeGridPage if there is content', async () => {
      // const recipes = await api.getRecipeList({});

      const recipes: (RecipeDefaultFragment | null)[] = [
        {
          __typename: 'Recipe',
          title: 'Title 1',
          slug: 'slug-1',
          tagsCollection: {
            items: [
              {
                __typename: 'Tag',
                title: 'Title 2',
                slug: 'slug-2',
              },
            ],
            __typename: 'RecipeTagsCollection',
          },
        },
      ];

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <RecipeGridPage recipes={recipes} title={title} />
      );

      // assert that content is rendered
      expect(queryByTestId('page')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the RecipeGridPage', () => {
      const title = 'Title';
      const recipes = [] as RecipeDefaultFragment[];

      render(<RecipeGridPage title={title} recipes={recipes} />);

      // test if card compoent is not rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeNull();
    });
  });
});
