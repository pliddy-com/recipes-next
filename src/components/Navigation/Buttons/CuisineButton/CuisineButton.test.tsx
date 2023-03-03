import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import CuisineButton from './CuisineButton';

describe('CuisineButton', () => {
  it('renders a cuisine button with a label', () => {
    const callback = jest.fn();

    const { queryByRole } = render(<CuisineButton onClick={callback} />);

    // assert that component has been rendered
    const component = queryByRole('button', { name: 'open cuisine menu' });

    // assert that callback is called on click
    component && fireEvent.click(component);
    expect(callback).toBeCalled();

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });

  describe('when the hideLabel flag is true', () => {
    it('renders an icon button', () => {
      const callback = jest.fn();

      const { queryByRole } = render(
        <CuisineButton onClick={callback} hideLabel={true} />
      );

      // assert that component has been rendered
      const component = queryByRole('button', { name: 'open cuisine menu' });

      // assert that callback is called on click
      component && fireEvent.click(component);
      expect(callback).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(component).toMatchSnapshot();
    });
  });
});
