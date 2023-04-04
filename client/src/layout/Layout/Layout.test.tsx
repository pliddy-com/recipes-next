import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Layout from './Layout';

jest.mock('components/Navigation/NavBar/NavBar');

describe('Layout', () => {
  describe('when there is page content', () => {
    it('it renders the Layout', async () => {
      const children = <div key="1">test</div>;

      const { asFragment } = await waitFor(() =>
        render(<Layout>{children}</Layout>)
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
