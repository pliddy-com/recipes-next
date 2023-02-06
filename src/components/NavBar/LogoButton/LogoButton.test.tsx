// import react-testing methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import LogoButton from './LogoButton';

import config from 'lib/config';

describe('LogoButton', () => {
  it('renders a logo button', () => {
    const expectedLabel = config.microcopy.site.title;
    const expectedUrl = '/';

    render(<LogoButton />);

    const component = screen.getByText(expectedLabel).closest('a');

    // console.log(component);

    // button has been rendered with correct label
    expect(component).toBeInTheDocument();

    // button has correct href
    expect(component).toHaveAttribute('href', expectedUrl);
  });
});
