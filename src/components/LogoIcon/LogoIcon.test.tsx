// import react-testing methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import LogoIcon from './LogoIcon';

describe('in LogoIcon', () => {
  it('loads and displays greeting', () => {
    // Render a React element into the DOM
    render(<LogoIcon />);

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const logo = screen.getByRole('graphics-symbol', { name: 'logo' });

    expect(logo).toBeInTheDocument();
  });
});