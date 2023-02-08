// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Ingredients from 'components/IngredientsSection/IngredientsSection';

import { IngredientsDefaultFragment } from 'types/generated/graphql';

describe('in Ingredients', () => {
  const expectedTitle = 'Ingredients';

  it('renders the ingredients section if there is content', () => {
    const sections: IngredientsDefaultFragment[] = [
      {
        sys: {
          id: 'sys-id-1',
          __typename: 'Sys',
        },
        title: 'Section 1 Title',
        slug: 'section-1-slug',
        label: 'Section 1 Label',
        ingredientList: ['section 1 item 1', 'section 1 item 2'],
        __typename: 'IngredientSection',
      },
    ];

    const expectedSubtitle = sections?.[0].label;
    const expectedItem = sections?.[0].ingredientList?.[0];

    render(<Ingredients sections={sections} />);

    const title = screen.queryByText(expectedTitle);
    const subtitle = expectedSubtitle && screen.queryByText(expectedSubtitle);
    const item = expectedItem && screen.queryByText(expectedItem);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });

  it('does not render the ingredients section if there is no content', () => {
    const sections = undefined;

    render(<Ingredients sections={sections} />);

    const title = screen.queryByText(expectedTitle);

    expect(title).toBeNull();
  });

  it('does not render the ingredients section if there are missing properties content', () => {
    const sections: IngredientsDefaultFragment[] = [
      {
        sys: {
          id: 'sys-id-1',
          __typename: 'Sys',
        },
        title: 'Section 1 Title',
        slug: 'section-1-slug',
        __typename: 'IngredientSection',
        label: null,
        ingredientList: null,
      },
    ];

    const expectedSubtitle = sections?.[0].label;

    render(<Ingredients sections={sections} />);

    const subtitle = expectedSubtitle && screen.queryByText(expectedSubtitle);
    expect(subtitle).toBeNull();
  });

  it('does not render the ingredients section if there are missing properties content', () => {
    const sections = [null];

    const { container } = render(<Ingredients sections={sections} />);

    const list = container.querySelector('.recipeList');
    expect(list).toBeNull();
  });
});
