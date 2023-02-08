// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import Loading from 'components/Loading/Loading';

describe('LogoIcon', () => {
  it('loads and displays greeting', () => {
    // Render a React element into the DOM
    const { getByRole } = render(<Loading />);

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const component = getByRole('graphics-symbol', { name: 'spinner' });

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
