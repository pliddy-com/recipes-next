import { render } from '@testing-library/react';

import TextEdit from './TextEdit';
// import { ChangeEvent } from 'react';

describe('TextEdit', () => {
  describe('when there is content', () => {
    it('renders the component', () => {
      const props = {
        className: 'bold',
        disabled: true,
        endAdornment: 'Max',
        id: 'test-id',
        label: 'Test ID',
        onChange: jest.fn(),
        value: 'test value'
      };
      const { asFragment } = render(<TextEdit {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
