// import react-testing methods
import { render, screen, cleanup } from '@testing-library/react';
// import { render } from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// import the component to test
import TagButtons from 'components/TagButtons/TagButtons';

import { TagDefaultFragment } from 'types/generated/graphql';

describe('in TagButtons', () => {
  afterEach(() => {
    cleanup();
  }); // Default on import: runs it after each test.

  test('renders a row of tag buttons', async () => {
    const tags: TagDefaultFragment[] = [
      {
        sys: {
          id: 'id1',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'TagTitle1',
        slug: 'tagtitle1',
      },
      {
        sys: {
          id: 'id2',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'TagTitle2',
        slug: 'tagtitle2',
      },
    ];

    render(<TagButtons tags={tags} />);

    const { slug: slug1, title: title1 } = tags[0];
    const { slug: slug2, title: title2 } = tags[1];

    const tag1 = await screen
      .getByText(title1 || 'nullOrUndefined')
      .closest('a');
    const tag2 = await screen
      .getByText(title2 || 'nullOrUndefined')
      .closest('a');

    expect(tag1).toBeInTheDocument();
    expect(tag1).toHaveAttribute('href', `/tag/${slug1}`);

    expect(tag2).toBeInTheDocument();
    expect(tag2).toHaveAttribute('href', `/tag/${slug2}`);
  });

  test('does not render a button if there is no tag properties', async () => {
    const tags: TagDefaultFragment[] = [
      {
        sys: {
          id: 'id1',
          __typename: 'Sys',
        },
        __typename: 'Tag',
      },
    ];

    // no props on second tag, so should return null
    render(<TagButtons tags={tags} />);

    const { title: title1 } = tags[0] ?? {};

    const tag1 = title1 && screen.getByText(title1).closest('a');

    expect(tag1).toBeUndefined();
  });

  test('does not render a button if object in array is null', async () => {
    const tags = [null];
    render(<TagButtons tags={tags} />);

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });

  test('does not render if there is no payload', async () => {
    // no tags props, so should return null
    render(<TagButtons />);

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });
});
