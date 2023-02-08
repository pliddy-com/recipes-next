// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import LogoButton from './LogoButton';

import config from 'lib/config';

describe('LogoButton', () => {
  it('renders a logo button', () => {
    const expectedLabel = config.microcopy.site.title;
    const expectedHref = '/';

    const { getByRole } = render(<LogoButton />);

    // assert that the component has been rendered
    const component = getByRole('button', { name: 'home' });

    // assert that the component has correct label
    expect(component.textContent).toContain(expectedLabel);

    // assert that the component has correct href
    expect(component).toHaveAttribute('href', expectedHref);

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
