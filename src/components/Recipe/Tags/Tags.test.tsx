// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Tags from 'components/Recipe/Tags/Tags';
import { TagDefaultFragment } from 'types/generated/graphql';

describe('in Tags', () => {
  it('renders the notes section if there is content', () => {
    const tags: (TagDefaultFragment | null)[] = [
      {
        sys: {
          id: '7scFqOlErkPvBxknBxX4Lw',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'Sauces',
        slug: 'sauces',
      },
      {
        sys: {
          id: '33CNYIbkW49vrRw5iSKnih',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'Mother Sauces',
        slug: 'mother-sauces',
      },
      {
        sys: {
          id: '2RDCNcjSZzLSEQgjf1Nw4R',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'French',
        slug: 'french',
      },
    ];

    const expected = tags[0]?.title;

    render(<Tags tags={tags} />);

    const title = screen.queryByText('Tags');
    expect(title).toBeInTheDocument();

    const tag = expected && screen.getByText(expected).closest('a');
    expect(tag).toBeInTheDocument();
  });

  it('does not render the tags section if there is no content', () => {
    const tags: (TagDefaultFragment | null)[] = [];

    render(<Tags tags={tags} />);

    const title = screen.queryByText('Tags');

    expect(title).toBeNull();
  });
});
