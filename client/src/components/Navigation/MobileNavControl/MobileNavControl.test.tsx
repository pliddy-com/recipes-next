import { render, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import MobileNavControl, { NavDataProps } from './MobileNavControl';

import * as api from 'lib/api';

jest.mock('lib/api');

describe('NavMenuControl', () => {
  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu hidden by default', async () => {
      const nav = await api.getNavTaxonomy();

      const { asFragment, queryByRole, queryByTestId } = render(
        <MobileNavControl
          ariaLabel="open test menu"
          nav={nav as NavDataProps}
        />
      );

      const testButton = queryByRole('button', {
        name: 'open test menu'
      });

      // assert that callback is called on click & there was a change in the DOM
      testButton && fireEvent.click(testButton);

      const testMenu = queryByTestId('mobile-nav');

      waitFor(() => expect(testMenu).toBeVisible());

      testMenu &&
        fireEvent.keyDown(testMenu, {
          key: 'Escape',
          code: 'Escape',
          charCode: 27
        });

      waitFor(() => expect(testMenu).not.toBeVisible());

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
