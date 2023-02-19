// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import InstructionsSection from 'components/RecipeSections/InstructionsSection/InstructionsSection';

import { InstructionsDefaultFragment } from 'types/queries';

describe('InstructionsSection', () => {
  const expectedTitle = 'Instructions';

  describe('when there is properly formatted content', () => {
    it('it renders the instructions section if there is content', () => {
      const sections: InstructionsDefaultFragment[] = [
        {
          sys: {
            id: '2xmjf2j2BopShF9fUli4BV',
            __typename: 'Sys',
          },
          title: 'Sole Meunière, Setup',
          slug: 'sole-meuniere-setup',
          label: 'Setup',
          instructionList: ['Heat saute pan over medium-high heat.'],
          __typename: 'InstructionSection',
        },
      ];

      const expectedSubtitle = sections?.[0].label;
      const expectedItem = sections?.[0].instructionList?.[0];

      const { container, queryByText } = render(
        <InstructionsSection sections={sections} />
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
      const sections: InstructionsDefaultFragment[] = [
        {
          sys: {
            id: '2xmjf2j2BopShF9fUli4BV',
            __typename: 'Sys',
          },
          title: 'Sole Meunière, Setup',
          slug: 'sole-meuniere-setup',
          label: null,
          instructionList: null,
          __typename: 'InstructionSection',
        },
      ];

      const expectedSubtitle = sections?.[0].label;

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
