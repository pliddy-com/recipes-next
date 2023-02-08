// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import EquipmentSection from 'components/EquipmentSection/EquipmentSection';

describe('in EquipmentSection', () => {
  it('renders the equipment section if there is content', () => {
    const equipment = ['Small saucepan', 'Whisk'];
    const expected = equipment[0];

    render(<EquipmentSection equipment={equipment} />);

    const title = screen.queryByText('EquipmentSection');
    const item = screen.queryByText(expected);

    expect(title).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });

  it('does not render the equipment section if there is no content', () => {
    const equipment = undefined;

    render(<EquipmentSection equipment={equipment} />);

    const title = screen.queryByText('EquipmentSection');

    expect(title).toBeNull();
  });
});
