// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Loading from 'components/Loading/Loading';

describe('in LogoIcon', () => {
  it('loads and displays greeting', () => {
    // Render a React element into the DOM
    render(<Loading />);

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const logo = screen.getByRole('graphics-symbol', { name: 'spinner' });

    expect(logo).toBeInTheDocument();
  });
});
