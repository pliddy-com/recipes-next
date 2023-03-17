// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import EquipmentSection from 'components/RecipeSections/EquipmentSection/EquipmentSection';

describe('EquipmentSection', () => {
  describe('when there is properly formatted content', () => {
    it('it renders the equipment section if there is content', () => {
      const equipment = ['equipment item 1', 'equipment item 2'];
      const expected = equipment[0];

      const { container, queryByText } = render(
        <EquipmentSection equipment={equipment} />
      );

      const title = queryByText('EquipmentSection');
      const item = queryByText(expected);

      expect(title).toBeDefined();
      expect(item).toBeDefined();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is not properly formatted content', () => {
    it('it does not render the equipment section if there is no content', () => {
      const equipment = undefined;

      const { queryByText } = render(
        <EquipmentSection equipment={equipment} />
      );

      const title = queryByText('EquipmentSection');

      expect(title).toBeNull();
    });
  });
});
