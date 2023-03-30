import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import SearchGridPage from './SearchGridPage';

jest.mock('components/Search/SearchBox/SearchBox');
jest.mock('components/Search/SearchResults/SearchResults');

describe('SearchGridPage', () => {
  // const env = process.env;

  describe('when there is page content', () => {
    it('it renders the SearchGridPage', async () => {
      const title = 'Title';

      const { asFragment, queryByTestId } = render(
        <SearchGridPage title={title} />
      );

      // assert that content is rendered
      expect(queryByTestId('page')).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
