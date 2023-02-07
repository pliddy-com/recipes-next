// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Equipment from 'components/Recipe/Equipment/Equipment';

describe('in Equipment', () => {
  it('renders the equipment section if there is content', () => {
    const equipment = ['Small saucepan', 'Whisk'];
    const expected = equipment[0];

    render(<Equipment equipment={equipment} />);

    const title = screen.queryByText('Equipment');
    const item = screen.queryByText(expected);

    expect(title).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });

  it('does not render the equipment section if there is no content', () => {
    const equipment = undefined;

    render(<Equipment equipment={equipment} />);

    const title = screen.queryByText('Equipment');

    expect(title).toBeNull();
  });
});
