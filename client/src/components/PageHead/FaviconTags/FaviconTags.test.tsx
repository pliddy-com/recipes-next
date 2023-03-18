import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import FaviconTags from './FaviconTags';

describe('FaviconTags', () => {
  // reset mocks after each test
  afterEach(() => {
    jest.resetModules();
  });

  describe('when there is a config object', () => {
    it('it renders a Next Head tag with a title and description', () => {
      const { asFragment } = render(<FaviconTags />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
