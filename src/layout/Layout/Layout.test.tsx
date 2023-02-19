import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Layout from './Layout';
import * as api from 'lib/api';
import { Taxonomy } from 'types/queries';

jest.mock('lib/api');
jest.mock('components/Navigation/NavBar/NavBar');

describe('Layout', () => {
  describe('when there is page content', () => {
    it('it renders the Layout', async () => {
      const setState = jest.fn();

      jest.mock('react', () => ({
        useEffect: () => {
          () => jest.fn();
        },
        useState: (nav: Taxonomy) => [nav, setState],
      }));

      const children = <div key="1">test</div>;

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
