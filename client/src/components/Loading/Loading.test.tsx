import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Loading from 'components/Loading/Loading';

describe('Loading', () => {
  it('loads and displays a spinner', () => {
    // Render a React element into the DOM
    const { asFragment, getByRole } = render(<Loading />);

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const component = getByRole('graphics-symbol', { name: 'spinner' });
    expect(component).toBeInTheDocument();

    // assert that the component matches the existing snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles custom class names', () => {
    // Render a React element into the DOM
    const { asFragment, getByRole } = render(
      <Loading className="test-class" />
    );

    // assert that an SVG with an aria role of 'graphics-symbol' exists
    const component = getByRole('graphics-symbol', { name: 'spinner' });
    expect(component).toBeInTheDocument();

    // assert that the component matches the existing snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
