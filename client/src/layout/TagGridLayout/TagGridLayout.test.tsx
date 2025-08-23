import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import TagGridLayout from './TagGridLayout';
import { ListPageItemFragment } from 'types/queries';

import tags from 'layout/TagGridLayout/testPayloads/tags.json';

jest.mock('lib/api');

describe('TagGridLayout', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const { asFragment, queryByTestId } = render(
        <TagGridLayout
          tags={tags as unknown as (ListPageItemFragment | null)[]}
        />
      );

      // assert that content is rendered
      waitFor(() => expect(queryByTestId('page')).toBeInTheDocument());

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when page number is > 0', () => {
    it('it renders the RecipeGridLayout', async () => {
      const page = 1;

      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <TagGridLayout
          tags={tags as unknown as (ListPageItemFragment | null)[]}
          title={title}
          page={page}
        />
      );

      // assert that content is rendered
      waitFor(() => expect(queryByTestId('page')).toBeInTheDocument());

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  // describe('when there is no pageContent', () => {
  //   it('it does not render the page', async () => {
  //     const tags = undefined;

  //     const { queryByTestId } = render(
  //       <TagGridLayout tags={tags as unknown as ListPageItemFragment[]} />
  //     );

  //     await act(async () =>
  //       waitFor(() => expect(queryByTestId('page')).toBeNull())
  //     );
  //   });
  // });

  describe('when there is no pageContent', () => {
    it('it does not render the RecipeGridLayout', async () => {
      const title = 'Title';
      const tags = [] as unknown as ListPageItemFragment[];

      render(<TagGridLayout tags={tags} title={title} />);

      // test if card compoent is not rendered
      waitFor(() => expect(document.querySelector('.MuiCard-root')).toBeNull());
    });
  });

  describe('when there is missing tag information', () => {
    it('it does not render the content', () => {
      const tags = [null];

      render(<TagGridLayout tags={tags} />);

      // test if card compoent is not rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeNull();
    });
  });

  // describe('when there is missing slug information', () => {
  //   it('it does not sort the content', async () => {
  //     const tags: ListPageItemFragment[] = [
  //       {
  //         __typename: 'Tag',
  //         title: 'Tag 1 Title',
  //         slug: 'tag-1',
  //         linkedFrom: {
  //           recipeCollection: {
  //             total: 2,
  //             items: [
  //               {
  //                 __typename: 'Recipe',
  //                 sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
  //                 slug: null,
  //                 title: 'Title 2'
  //               },
  //               {
  //                 __typename: 'Recipe',
  //                 sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
  //                 slug: 'title-1',
  //                 title: 'Title 1'
  //               }
  //             ]
  //           }
  //         }
  //       }
  //     ];

  //     const { asFragment } = render(<TagGridLayout tags={tags} />);

  //     await act(async () =>
  //       waitFor(() => expect(asFragment()).toMatchSnapshot())
  //     );
  //   });
  // });
});
