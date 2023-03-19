// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Ingredients from 'components/RecipeSections/IngredientsSection/IngredientsSection';

import { IngredientsDefaultFragment } from 'types/queries';

describe('IngredientsSection', () => {
  const expectedTitle = 'Ingredients';

  describe('when there is properly formatted content', () => {
    it('renders the ingredients section if there is content', () => {
      const sections: IngredientsDefaultFragment[] = [
        {
          title: 'Section 1 Title',
          slug: 'section-1-slug',
          label: 'Section 1 Label',
          ingredientList: ['section 1 item 1', 'section 1 item 2'],
          __typename: 'IngredientSection'
        }
      ];

      const expectedSubtitle = sections?.[0].label;
      const expectedItem = sections?.[0].ingredientList?.[0];

      const { container, queryByText } = render(
        <Ingredients sections={sections} />
      );

      const title = queryByText(expectedTitle);
      const subtitle = expectedSubtitle && queryByText(expectedSubtitle);
      const item = expectedItem && queryByText(expectedItem);

      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
      expect(item).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is no content', () => {
    it('it does not render', () => {
      const sections = undefined;

      const { queryByText } = render(<Ingredients sections={sections} />);

      const title = queryByText(expectedTitle);

      expect(title).toBeNull();
    });
  });

  describe('when there are missing properties', () => {
    it('it does not render', () => {
      const sections: IngredientsDefaultFragment[] = [
        {
          title: 'Section 1 Title',
          slug: 'section-1-slug',
          __typename: 'IngredientSection',
          label: null,
          ingredientList: null
        }
      ];

      const expectedSubtitle = sections?.[0].label;

      const { queryByText } = render(<Ingredients sections={sections} />);

      const subtitle = expectedSubtitle && queryByText(expectedSubtitle);
      expect(subtitle).toBeNull();
    });
  });

  describe('when there the sections property is empty', () => {
    it('it does not render', () => {
      const sections = [null];

      const { container } = render(<Ingredients sections={sections} />);

      const list = container.querySelector('.recipeList');
      expect(list).toBeNull();
    });
  });
});
