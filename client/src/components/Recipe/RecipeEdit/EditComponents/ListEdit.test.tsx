// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

import ListEdit from './ListEdit';

describe('ListEdit', () => {
  describe('when there is content', () => {
    it('renders the component', () => {
      const label = 'List Label';
      const list = ['item 1', 'item 2', 'item 3'];
      const onChange = jest.fn();

      const testValue = 'test value';

      const { asFragment, queryByLabelText, queryAllByRole } = render(
        <ListEdit label={label} list={list} onChange={onChange} />
      );

      // assert that onChange executes
      const firstInput = queryByLabelText('List Label 1');
      firstInput &&
        fireEvent.change(firstInput, {
          target: { value: testValue }
        });
      expect(firstInput).toHaveValue(testValue);

      // assert that moveUp executes
      const moveUpButtons = queryAllByRole('button', { name: 'move item up' });
      const moveUpButton = moveUpButtons.slice(-1)[0];
      expect(moveUpButton).toBeDefined();
      moveUpButton && fireEvent.click(moveUpButton as unknown as Element);

      // assert that moveDown executes
      const moveDownButtons = queryAllByRole('button', {
        name: 'move item down'
      });
      const moveDownButton = moveDownButtons[0];
      expect(moveDownButton).toBeDefined();
      moveDownButton && fireEvent.click(moveDownButton as unknown as Element);

      // assert that removeItem executes
      const removeItemButons = queryAllByRole('button', {
        name: 'remove item'
      });
      const removeItemButon = removeItemButons[0];
      expect(removeItemButon).toBeDefined();
      removeItemButon && fireEvent.click(removeItemButon as unknown as Element);

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
