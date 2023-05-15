// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

import SectionEdit from './SectionEdit';

jest.mock('./TextEdit');

describe('SectionEdit', () => {
  describe('when there is content', () => {
    it('renders the component', async () => {
      const props = {
        id: 'Test Section',
        label: 'Section Label',
        onChange: jest.fn(),
        sectionList: [
          {
            sectionTitle: 'Section Title',
            sectionItems: ['item 1', 'item2']
          }
        ]
      };

      const testTitle = 'Test Title';
      const testItem = 'item 3';

      const { asFragment, queryByLabelText } = render(
        <SectionEdit {...props} />
      );

      expect(asFragment()).toMatchSnapshot();

      // assert that onChange executes
      const titleInput = queryByLabelText('Section Title');
      titleInput &&
        fireEvent.change(titleInput, {
          target: { value: testTitle }
        });

      const firstInput = queryByLabelText('Section Title 1');
      firstInput &&
        fireEvent.change(firstInput, {
          target: { value: testItem }
        });
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
