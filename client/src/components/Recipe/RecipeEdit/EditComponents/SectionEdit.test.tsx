// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

import SectionEdit from './SectionEdit';

// jest.mock('./TextEdit');
jest.mock('./ListEdit');

describe('SectionEdit', () => {
  describe('when there is content', () => {
    it('renders the component', async () => {
      const props = {
        id: 'test-section',
        label: 'Section Label',
        onChange: jest.fn(),
        sectionList: [
          {
            sectionTitle: 'Section 1 Title',
            sectionItems: ['item 1-1', 'item 1-2']
          },
          {
            sectionTitle: 'Section 2 Title',
            sectionItems: ['item 2-1', 'item 2-2']
          }
        ]
      };

      const testTitle = 'Test Title';
      const testItem = 'item 3';

      const {
        asFragment,
        queryAllByRole,
        queryByLabelText,
        queryByRole,
        queryByDisplayValue
      } = render(<SectionEdit {...props} />);

      expect(asFragment()).toMatchSnapshot();

      // assert that onChange executes
      const titleInput = queryByLabelText('Section 1 Title');
      titleInput &&
        fireEvent.change(titleInput, {
          target: { value: testTitle }
        });

      const firstInput = queryByDisplayValue('item 1-1');
      firstInput &&
        fireEvent.change(firstInput, {
          target: { value: testItem }
        });

      // assert that moveUp executes
      const moveUpButtons = queryAllByRole('button', {
        name: 'move section up'
      });

      const moveUpButton = moveUpButtons.slice(-1)[0];
      expect(moveUpButton).toBeDefined();
      moveUpButton && fireEvent.click(moveUpButton as unknown as Element);

      // assert that moveDown executes
      const moveDownButtons = queryAllByRole('button', {
        name: 'move section down'
      });
      const moveDownButton = moveDownButtons[0];
      expect(moveDownButton).toBeDefined();
      moveDownButton && fireEvent.click(moveDownButton as unknown as Element);

      // assert that removeItem executes
      const removeItemButons = queryAllByRole('button', {
        name: 'remove section'
      });
      const removeItemButon = removeItemButons[0];
      expect(removeItemButon).toBeDefined();
      removeItemButon && fireEvent.click(removeItemButon as unknown as Element);

      const addItemButton = queryByRole('button', { name: 'add section' });
      expect(addItemButton).toBeDefined();
      addItemButton && fireEvent.click(addItemButton as unknown as Element);
    });
  });

  describe('when there are missing section props', () => {
    it('does not render the component', () => {
      const props = {
        id: 'Test Section',
        label: 'Section Label',
        onChange: jest.fn(),
        sectionList: [
          {
            sectionTitle: null,
            sectionItems: ['item 1', 'item2']
          }
        ]
      };
      const { asFragment } = render(<SectionEdit {...props} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
