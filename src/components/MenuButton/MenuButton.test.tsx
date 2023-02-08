// import testing-library methods
import { fireEvent, render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import MenuButton from './MenuButton';

describe('MenuButton', () => {
  it('renders a menu button', async () => {
    const callback = jest.fn();

    render(<MenuButton onClick={callback} />);

    // confirm that button has been rendered
    const button = screen.queryByRole('button', { name: 'open drawer' });
    expect(button).toBeInTheDocument();

    // confirm that callback is called on click
    button && fireEvent.click(button);
    expect(callback).toBeCalled();
  });
});
