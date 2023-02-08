// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import LogoIcon from './LogoIcon';

describe('LogoIcon', () => {
  it('loads and displays greeting', () => {
    // Render a React element into the DOM
    const { getByRole } = render(<LogoIcon />);

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const component = getByRole('graphics-symbol', { name: 'logo' });

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
