// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import MenuButton from './MenuButton';

describe('MenuButton', () => {
  it('renders a menu button', () => {
    const callback = jest.fn();

    const { queryByRole } = render(<MenuButton onClick={callback} />);

    // assert that component has been rendered
    const component = queryByRole('button', { name: 'open drawer' });

    // assert that callback is called on click
    component && fireEvent.click(component);
    expect(callback).toBeCalled();

    // assert that the component matches the existing snapshot
    expect(component).toMatchSnapshot();
  });
});
