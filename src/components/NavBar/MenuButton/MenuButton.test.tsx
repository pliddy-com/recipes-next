// import react-testing methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import MenuButton from './MenuButton';

describe('LogoButton', () => {
  it('renders a logo button', async () => {
    const callback = () => null;
    render(<MenuButton onClick={callback} />);

    // confirm that button has been rendered
    const button = screen.queryByRole('button', { name: 'open drawer' });
    expect(button).toBeInTheDocument();
  });
});
