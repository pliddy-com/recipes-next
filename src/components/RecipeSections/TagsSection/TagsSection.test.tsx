// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Tags from 'components/RecipeSections/TagsSection/TagsSection';
import { TagDefaultFragment } from 'types/queries';

describe('Tags', () => {
  describe('when there is a properly formatted tags property', () => {
    const tags = [
      {
        sys: {
          id: 'sysid-1',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'Tag 1',
        slug: 'tag-1',
      },
      {
        sys: {
          id: 'sysid-2',
          __typename: 'Sys',
        },
        __typename: 'Tag',
        title: 'Tag 2',
        slug: 'tag-2',
      },
    ];

    it('it renders the notes section', () => {
      const tagButtonsId = 'tag-buttons';
      const expectedTitle = tags[0]?.title;
      const expectedSlug = tags[0]?.slug;

      const { queryByText, queryByTestId, asFragment } = render(
        <Tags tags={tags as (TagDefaultFragment | null)[]} />
      );

      // assert that a TagButtons component is rendered
      // const tagButtons = queryByTestId(tagButtonsId);
      expect(queryByTestId(tagButtonsId)).toBeInTheDocument();

      // assert that tag href links are correct
      const tag = queryByText(expectedTitle)?.closest('a');
      expect(tag).toHaveAttribute('href', `/tag/${expectedSlug}`);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is not a properly formatted tags property', () => {
    it('it does not render the tags section if there is no content', () => {
      const tags: (TagDefaultFragment | null)[] = [];
      const expectedLabel = 'Tags';

      const { queryByText } = render(<Tags tags={tags} />);

      const title = queryByText(expectedLabel);

      expect(title).toBeNull();
    });
  });
});
