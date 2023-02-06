// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagButtons from './TagButtons';

// import type definitions for sample payloads
import { TagDefaultFragment } from 'types/generated/graphql';

describe('TagButtons', () => {
  it('renders a row of tag buttons', async () => {
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

    const tag1 = title1 && (await screen.getByText(title1).closest('a'));
    const tag2 = title2 && (await screen.getByText(title2).closest('a'));

    // check for correct href links
    expect(tag1).toBeInTheDocument();
    expect(tag1).toHaveAttribute('href', `/tag/${slug1}`);

    expect(tag2).toBeInTheDocument();
    expect(tag2).toHaveAttribute('href', `/tag/${slug2}`);
  });

  it('does not render if there is no payload', async () => {
    // no tags props, so should return null
    render(<TagButtons />);

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });

  it('does not render a button if object in array is null', async () => {
    const tags = [null];
    render(<TagButtons tags={tags} />);

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });

  it('does not render a button if there are missing title or slug', async () => {
    // not title or slug property in tag
    const tags: TagDefaultFragment[] = [
      {
        sys: {
          id: 'id1',
          __typename: 'Sys',
        },
        __typename: 'Tag',
      },
    ];

    // no title or slug property on tag, so should return null
    render(<TagButtons tags={tags} />);

    const button = screen.queryByRole('button');

    expect(button).toBeNull();
  });
});
