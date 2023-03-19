import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import PayloadRender from './PayloadRender';

describe('PayloadRender', () => {
  describe('when there is a payload object', () => {
    it('it renders the formatted payload', () => {
      const payload = { property: 'value' };

      const { asFragment } = render(<PayloadRender payload={payload} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
