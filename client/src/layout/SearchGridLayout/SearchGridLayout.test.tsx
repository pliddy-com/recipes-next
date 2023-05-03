import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import SearchGridLayout from './SearchGridLayout';

jest.mock('components/Search/SearchBox/SearchBox');
jest.mock('components/Search/SearchResults/SearchResults');

describe('SearchGridLayout', () => {
  // const env = process.env;
  describe('when there is page content', () => {
    it('it renders the SearchGridLayout', async () => {
      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <SearchGridLayout title={title} />
      );

      // assert that content is rendered
      expect(queryByTestId('page')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
