// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagButtons from './TagButtons';

// import type definitions for sample payloads
import { TagDefaultFragment } from 'types/queries';

describe('TagButtons', () => {
  describe('when there are properly structured tag props', () => {
    const tags = [
      {
        sys: {
          id: 'id1',
          __typename: 'Sys'
        },
        __typename: 'Tag',
        title: 'TagTitle1',
        slug: 'tagtitle1'
      },
      {
        sys: {
          id: 'id2',
          __typename: 'Sys'
        },
        __typename: 'Tag',
        title: 'TagTitle2',
        slug: 'tagtitle2'
      }
    ];

    it('it renders a row of tag buttons', () => {
      const testId = 'tag-buttons';
      const { slug: slug1, title: title1 } = tags[0];
      const { slug: slug2, title: title2 } = tags[1];

      const { queryByTestId, queryByText } = render(
        <TagButtons tags={tags as TagDefaultFragment[]} />
      );

      // assert that the component is rendered
      const component = queryByTestId(testId);

      // assert that href links are correct
      const tag1 = queryByText(title1)?.closest('a');
      expect(tag1).toHaveAttribute('href', `/tag/${slug1}`);

      const tag2 = queryByText(title2)?.closest('a');
      expect(tag2).toHaveAttribute('href', `/tag/${slug2}`);

      // assert that the component matches the existing snapshot
      expect(component).toMatchSnapshot();
    });
  });

  describe('when there are not properly structured tag props', () => {
    it('it does not render if there is no payload', () => {
      const { queryByRole } = render(<TagButtons />);

      const button = queryByRole('button');

      expect(button).toBeNull();
    });

    it('it does not render a button if object in array is null', () => {
      const tags = [null];

      const { queryByRole } = render(<TagButtons tags={tags} />);

      const button = queryByRole('button');

      expect(button).toBeNull();
    });

    it('it does not render a button if there are missing title or slug', () => {
      const tags = [
        {
          sys: {
            id: 'id1',
            __typename: 'Sys'
          },
          __typename: 'Tag'
        }
      ];

      const { queryByRole } = render(
        <TagButtons tags={tags as TagDefaultFragment[]} />
      );

      const button = queryByRole('button');

      expect(button).toBeNull();
    });
  });
});
