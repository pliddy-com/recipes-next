import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import InstructionsSection from 'components/RecipeSections/InstructionsSection/InstructionsSection';

import { IRecipeSection } from 'types/json';

describe('InstructionsSection', () => {
  const expectedTitle = 'Instructions';

  describe('when there is properly formatted content', () => {
    it('it renders the instructions section if there is content', () => {
      const sections: IRecipeSection[] = [
        {
          sectionTitle: 'Sole Meunière, Setup',
          sectionItems: ['Heat saute pan over medium-high heat.']
        }
      ];

      const expectedItem = sections?.[0].sectionItems?.[0];

      const { container, queryByText } = render(
        <InstructionsSection sections={sections} />
      );

      const title = queryByText(expectedTitle);
      const item = expectedItem && queryByText(expectedItem);

      expect(title).toBeInTheDocument();
      expect(item).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is there is no content', () => {
    it('it does not render', () => {
      const sections = undefined;

      const { queryByText } = render(
        <InstructionsSection sections={sections} />
      );

      const title = queryByText(expectedTitle);

      expect(title).toBeNull();
    });
  });

  describe('when there are missing content properties', () => {
    it('it does not render', () => {
      const sections: IRecipeSection[] = [
        {
          sectionTitle: 'Sole Meunière, Setup',
          sectionItems: ['Heat saute pan over medium-high heat.']
        }
      ];

      const expectedSubtitle = sections?.[0].sectionTitle;

      const { queryByText } = render(
        <InstructionsSection sections={sections} />
      );

      const subtitle = expectedSubtitle && queryByText(expectedSubtitle);
      expect(subtitle).toBeNull();
    });
  });

  describe('when there is null content', () => {
    it('it does not render', () => {
      const sections = [null];

      const { container } = render(<InstructionsSection sections={sections} />);

      const list = container.querySelector('.recipeList');
      expect(list).toBeNull();
    });
  });
});
