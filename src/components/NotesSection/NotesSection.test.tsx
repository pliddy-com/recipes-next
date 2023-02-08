// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Notes from 'components/NotesSection/NotesSection';

describe('in Notes', () => {
  describe('when there is properly formatted content', () => {
    it('it renders the notes section if there is content', () => {
      const notes = ['Base for Chicken and Biscuits'];
      const expected = notes[0];

      const { container, queryByText } = render(<Notes notes={notes} />);

      const title = queryByText('Notes');
      const note = queryByText(expected);

      expect(title).toBeInTheDocument();
      expect(note).toBeInTheDocument();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is not properly formatted content', () => {
    it('it does not render', () => {
      const notes = undefined;

      const { queryByText } = render(<Notes notes={notes} />);

      const title = queryByText('Notes');

      expect(title).toBeNull();
    });
  });
});
