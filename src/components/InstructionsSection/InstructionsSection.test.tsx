// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Instructions from 'components/InstructionsSection/InstructionsSection';

import { InstructionsDefaultFragment } from 'types/generated/graphql';

describe('in Instructions', () => {
  const expectedTitle = 'Instructions';

  it('renders the instructions section if there is content', () => {
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

    render(<Instructions sections={sections} />);

    const title = screen.queryByText(expectedTitle);
    const subtitle = expectedSubtitle && screen.queryByText(expectedSubtitle);
    const item = expectedItem && screen.queryByText(expectedItem);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });

  it('does not render the ingredients section if there is no content', () => {
    const sections = undefined;

    render(<Instructions sections={sections} />);

    const title = screen.queryByText(expectedTitle);

    expect(title).toBeNull();
  });

  it('does not render the instructions section if there are missing properties content', () => {
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

    render(<Instructions sections={sections} />);

    const subtitle = expectedSubtitle && screen.queryByText(expectedSubtitle);
    expect(subtitle).toBeNull();
  });

  it('does not render the instructions section if there are missing properties content', () => {
    const sections = [null];

    const { container } = render(<Instructions sections={sections} />);

    const list = container.querySelector('.recipeList');
    expect(list).toBeNull();
  });
});

/*
{
    const sections =  [
        {
            "sys": {
                "id": "2xmjf2j2BopShF9fUli4BV",
                "__typename": "Sys"
            },
            "title": "Sole Meunière, Setup",
            "slug": "sole-meuniere-setup",
            "label": "Setup",
            "instructionList": [
                "Heat saute pan over medium-high heat."
            ],
            "__typename": "InstructionSection"
        },
        {
            "sys": {
                "id": "7MvCMbZIzxJb7j9t9TYor",
                "__typename": "Sys"
            },
            "title": "Sole Meunière, Prep",
            "slug": "sole-meuniere-prep",
            "label": "Prep",
            "instructionList": [
                "Sprinkle salt and pepper over both sides of the filets.",
                "Dredge each filet in flour and shake off any excess flour."
            ],
            "__typename": "InstructionSection"
        },
        {
            "sys": {
                "id": "6ErpZlcHdJi7xt1iZtiRrs",
                "__typename": "Sys"
            },
            "title": "Sole Meunière, Sauté",
            "slug": "sole-meuniere-saute",
            "label": "Sauté",
            "instructionList": [
                "Heat oil in the pan and add butter until it is melted and stops foaming. ",
                "Saute filets until brown (3-5 minutes), then flip and brown the other side (3-4 min)",
                "Transfer filets to the serving plate."
            ],
            "__typename": "InstructionSection"
        },
        {
            "sys": {
                "id": "3gNHPOVv2fmA12Pz0XQXER",
                "__typename": "Sys"
            },
            "title": "Sole Meunière, Sauce",
            "slug": "sole-meuniere-sauce",
            "label": "Sauce",
            "instructionList": [
                "Sprinkle filets with fresh chopped parsley.",
                "In a light-colored sauce pan, melt 2 Tbsp of butter, stirring until brown.",
                "Remove browned butter from the heat and toss in lemon and capers.",
                "Pour beurre noisette over filets to sizzle the parsley."
            ],
            "__typename": "InstructionSection"
        }
    ]
}
*/
