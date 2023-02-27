import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import TagGridPage from './TagGridPage';
import { ListPageItemFragment } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('TagGridPage', () => {
  describe('when there is page content', () => {
    it('it renders the page', async () => {
      const tags = await api.getTagIndex({});
      const { asFragment, queryByTestId } = render(<TagGridPage tags={tags} />);

      // assert that content is rendered
      expect(queryByTestId('page')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no pageContent', () => {
    it('it does not render the page', () => {
      const tags = undefined;

      const { queryByTestId } = render(
        <TagGridPage tags={tags as unknown as ListPageItemFragment[]} />
      );

      expect(queryByTestId('page')).toBeNull();
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
});
