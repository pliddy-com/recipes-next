// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Ingredients from 'components/Recipe/RecipeSections/IngredientsSection/IngredientsSection';

import { IRecipeSection } from 'types/json';

describe('IngredientsSection', () => {
  const expectedTitle = 'Ingredients';

  describe('when there is properly formatted content', () => {
    it('renders the ingredients section if there is content', () => {
      const sections: IRecipeSection[] = [
        {
          sectionTitle: 'Section 1 Title',
          sectionItems: ['section 1 item 1', 'section 1 item 2']
        }
      ];

      const expectedSubtitle = sections?.[0].sectionTitle;
      const expectedItem = sections?.[0].sectionItems?.[0];

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
      const sections: IRecipeSection[] = [
        {
          sectionTitle: null,
          sectionItems: null
        }
      ];

      const expectedSubtitle = sections?.[0].sectionTitle;

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
