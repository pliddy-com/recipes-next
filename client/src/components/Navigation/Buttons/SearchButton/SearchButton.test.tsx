import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import SearchButton from './SearchButton';

describe('LogoButton', () => {
  const expectedHref = '/search';

  it('renders a logo button with a label', () => {
    const expectedLabel = 'Search';

    const { getByRole } = render(<SearchButton />);

    // assert that the component has been rendered
    const component = getByRole('button', { name: 'search' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component has correct href
    expect(component).toHaveAttribute('href', expectedHref);

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });

  describe('when the hideLabel flag is true', () => {
    it('renders an icon button', () => {
      const { getByRole } = render(<SearchButton hideLabel={true} />);

      // assert that component has been rendered
      const component = getByRole('button', { name: 'search' });

      // assert that the component has correct href
      expect(component).toHaveAttribute('href', expectedHref);

      // assert that the component matches the existing snapshot
      expect(component).toMatchSnapshot();
    });
  });
});
