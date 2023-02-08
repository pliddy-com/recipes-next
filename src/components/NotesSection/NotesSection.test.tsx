// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Notes from 'components/NotesSection/NotesSection';

describe('in Notes', () => {
  it('renders the notes section if there is content', () => {
    const notes = ['Base for Chicken and Biscuits'];
    const expected = notes[0];

    render(<Notes notes={notes} />);

    const title = screen.queryByText('Notes');
    const note = screen.queryByText(expected);

    expect(title).toBeInTheDocument();
    expect(note).toBeInTheDocument();
  });

  it('does not render the notes section if there is no content', () => {
    const notes = undefined;

    render(<Notes notes={notes} />);

    const title = screen.queryByText('Notes');

    expect(title).toBeNull();
  });
});
