// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import SearchBox from './SearchBox';

jest.mock('react-instantsearch-hooks-web', () => ({
  useSearchBox: jest.fn().mockReturnValue({
    refine: jest.fn()
  }),
  useCurrentRefinements: jest.fn().mockReturnValue({
    items: [{ value: 1 }]
  })
}));

describe('SearchBox', () => {
  describe('when there is properly formatted content', () => {
    it('it renders the SearchBox', () => {
      const { asFragment, queryByRole } = render(<SearchBox />);

      const form = queryByRole('search');
      const textField = queryByRole('textbox') as HTMLInputElement;

      expect(form).toBeInTheDocument();
      expect(textField).toBeInTheDocument();

      form && fireEvent.submit(form);

      textField && fireEvent.change(textField, { target: { value: 'test' } });

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
