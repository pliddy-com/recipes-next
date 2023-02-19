// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RecipeGridPage from './RecipeGridPage';

import { RecipeDefaultFragment } from 'types/queries';

describe('RecipeGridPage', () => {
  describe('when there is page content', () => {
    it('it renders the RecipeGridPage if there is content', () => {
      const recipes: (RecipeDefaultFragment | null)[] = [
        {
          sys: {
            id: 'sysid-0',
            __typename: 'Sys',
          },
          __typename: 'Recipe',
          title: 'Title 1',
          slug: 'slug-1',
          tagsCollection: {
            items: [
              {
                sys: {
                  id: 'sysid-1',
                  __typename: 'Sys',
                },
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

      const { container } = render(
        <RecipeGridPage recipes={recipes} title={title} />
      );

      // assert that page container is present
      const page = document.querySelector('.page');
      expect(page).toBeInTheDocument();

      // assert that card component is rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
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
