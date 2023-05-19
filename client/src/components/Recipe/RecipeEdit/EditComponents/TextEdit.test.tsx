import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import TextEdit from './TextEdit';

describe('TextEdit', () => {
  describe('when there is content', () => {
    it('renders the component', () => {
      const testValue = 'test value';

      const props = {
        className: 'bold',
        id: 'test-id',
        label: 'Test ID',
        onChange: jest.fn(),
        value: testValue
      };

      const targetValue = 'target value';

      const { asFragment, queryByLabelText } = render(<TextEdit {...props} />);
      expect(asFragment()).toMatchSnapshot();

      const testInput = queryByLabelText(props.label);

      testInput &&
        fireEvent.change(testInput, {
          target: { value: targetValue }
        });
    });
  });

  describe('with optional props', () => {
    it('renders the component', () => {
      const props = {
        disabled: false,
        endAdornment: 'Max',
        id: 'test-id',
        label: 'Test ID',
        value: 'test value'
      };
      const { asFragment } = render(<TextEdit {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
