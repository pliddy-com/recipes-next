// import react-testing methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import LogoButton from './LogoButton';

import config from 'lib/config';

describe('LogoButton', () => {
  it('renders a logo button', async () => {
    render(<LogoButton />);

    // confirm that button has been rendered with correct label
    const hasLabel = await screen.getByText(config.microcopy.site.title);
    expect(hasLabel);
  });
});
