import '@testing-library/jest-dom';

// import testing-library methods
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TagsEdit, {
  ITagsEdit
} from 'components/Recipe/RecipeEdit/EditComponents/TagsEdit';

import * as api from 'lib/api';
import { TagDefaultFragment } from 'types/queries';

jest.mock('lib/api');

jest.mock('components/Recipe/RecipeEdit/EditComponents/ListEdit');

describe('TagsEdit', () => {
  describe('when there is content', () => {
    it('renders the component', async () => {
      const { recipe } = await api.getRecipePage();
      const { tags: tagList } = await api.getLinkedEntries();

      const tags = recipe?.tagsCollection?.items;

      if (tags && tagList) {
        const props: ITagsEdit = {
          tags,
          tagList,
          onChange: jest.fn()
        };

        const { asFragment, getByTestId, queryByLabelText } = render(
          <TagsEdit {...props} />
        );

        await waitFor(async () => {
          const tagSelect = queryByLabelText('tag select input');
          expect(tagSelect).toBeInTheDocument();
          tagSelect && fireEvent.mouseDown(tagSelect);
        });

        await waitFor(async () => {
          const tagItem = screen.getByText('Tag 3');
          fireEvent.click(tagItem);
        });

        const tagInput = getByTestId('tags-edit').querySelector('input');
        expect(tagInput).toHaveValue('Tag 1,Tag 2,Tag 3');

        expect(asFragment()).toMatchSnapshot();
      }
    });

    describe('when tags are undefined', () => {
      it('it does not render the component', async () => {
        // const tags = undefined as unknown as TagDefaultFragment[];
        const { tags: tagList } = await api.getLinkedEntries();

        const props: ITagsEdit = {
          tags: undefined as unknown as TagDefaultFragment[],
          tagList,
          onChange: jest.fn()
        };

        const { asFragment } = render(<TagsEdit {...props} />);

        await waitFor(async () => {
          expect(asFragment()).toMatchSnapshot();
        });
      });
    });

    describe('when tags array is empty', () => {
      it('it does not render the component', async () => {
        // const tagListSpy = jest
        //   .spyOn(api, 'getLinkedEntries')
        //   .mockResolvedValueOnce([
        //     {
        //       sys: {
        //         id: 'id-3'
        //       },
        //       slug: undefined,
        //       title: undefined
        //     }
        //   ] as unknown as TagDefaultFragment[]);

        const { tags: tagList } = await api.getLinkedEntries();
        if (tagList && tagList[0]) {
          tagList[0].slug = undefined;
          tagList[0].title = undefined;
        }

        const { recipe } = await api.getRecipePage();

        const tags = recipe?.tagsCollection?.items;

        const props: ITagsEdit = {
          tags: tags as unknown as TagDefaultFragment[],
          tagList,
          onChange: jest.fn()
        };

        const { asFragment } = render(<TagsEdit {...props} />);

        await waitFor(async () => {
          // expect(tagListSpy).toBeCalled();
          expect(asFragment()).toMatchSnapshot();
        });
      });
    });
  });
});
