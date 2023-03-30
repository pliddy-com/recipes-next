import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import preloadAll from 'jest-next-dynamic';

import TagGridPage from './TagGridPage';
import { ListPageItemFragment } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('TagGridPage', () => {
  afterEach(() => {
    jest.resetModules();
  });

  beforeAll(async () => {
    await preloadAll();
  });

  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const tags = await api.getTagIndex({});
      const { asFragment, queryByTestId } = render(
        <TagGridPage tags={tags as (ListPageItemFragment | null)[]} />
      );

      // assert that content is rendered
      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeInTheDocument())
      );

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the page', async () => {
      const tags = undefined;

      const { queryByTestId } = render(
        <TagGridPage tags={tags as unknown as ListPageItemFragment[]} />
      );

      await act(async () =>
        waitFor(() => expect(queryByTestId('page')).toBeNull())
      );
    });
  });

  describe('when there is missing tag information', () => {
    it('it does not render the content', () => {
      const tags = [null];

      render(<TagGridPage tags={tags} />);

      // test if card compoent is not rendered
      const card = document.querySelector('.MuiCard-root');
      expect(card).toBeNull();
    });
  });

  describe('when there is missing slug information', () => {
    it('it does not sort the content', async () => {
      const tags: ListPageItemFragment[] = [
        {
          __typename: 'Tag',
          title: 'Tag 1 Title',
          slug: 'tag-1',
          linkedFrom: {
            recipeCollection: {
              total: 2,
              items: [
                {
                  __typename: 'Recipe',
                  sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
                  slug: null,
                  title: 'Title 2'
                },
                {
                  __typename: 'Recipe',
                  sys: { firstPublishedAt: '2022-06-26T07:24:30.384Z' },
                  slug: 'title-1',
                  title: 'Title 1'
                }
              ]
            }
          }
        }
      ];

      const { asFragment } = render(<TagGridPage tags={tags} />);

      await act(async () =>
        waitFor(() => expect(asFragment()).toMatchSnapshot())
      );
    });
  });
});
