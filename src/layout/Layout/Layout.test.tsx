// import testing-library methods
import { render, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';
// import React from 'react';
// import the component to test
import Layout from './Layout';
import * as api from 'lib/api';
// import { getNavTaxonomy } from 'lib/api';

jest.mock('lib/api');

describe('Layout', () => {
  describe('when there is page content', () => {
    it('it renders the Layout', async () => {
      const setState = jest.fn();

      jest.mock('react', () => ({
        useEffect: () => {
          () => jest.fn();
        },
        useState: (initial: unknown) => [initial, setState],
      }));

      const children = (
        <div key="1">
          <span>test</span>
        </div>
      );

      const { asFragment } = await waitFor(() =>
        render(<Layout>{children}</Layout>)
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is a problem retrieving page content', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => null);
    });

    it('it handles the error', async () => {
      const setState = jest.fn();

      jest.mock('react', () => ({
        useEffect: () => {
          () => jest.fn();
        },
        useState: (initial: unknown) => [initial, setState],
      }));

      const spy = jest
        .spyOn(api, 'getNavTaxonomy')
        .mockRejectedValueOnce(new Error());

      try {
        render(<Layout />);
      } catch (e) {
        expect(e).toThrowError();
      }

      expect(spy).toHaveBeenCalled();
    });
  });
});
