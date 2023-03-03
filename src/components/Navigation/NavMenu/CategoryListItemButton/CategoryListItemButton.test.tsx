// import testing-library methods
import { fireEvent, render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryListItemButton from './CategoryListItemButton';

describe('CategoryListItemButton', () => {
  const callback = jest.fn();

  describe('when there is a correct payload', () => {
    it('it renders a list item for the menu', () => {
      const slug = 'slug';
      const title = 'Test Title';
      const numRecipes = 10;
      const root = 'category';

      const expectedHref = `/${root}/${slug}`;

      const { container, queryByRole } = render(
        <CategoryListItemButton
          slug={slug}
          title={title}
          onClick={callback}
          total={numRecipes}
          root={root}
        />
      );

      // assert that component has been rendered
      const link = queryByRole('link', { name: `${slug} category` });
      expect(link).toBeInTheDocument();

      // assert that component has correct href
      expect(link).toHaveAttribute('href', expectedHref);

      // assert that the callback is called on click
      link && fireEvent.click(link);
      expect(callback).toBeCalled();

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is not a correct payload', () => {
    it('it does not render', () => {
      const slug = null;
      const root = null;

      const { queryByRole } = render(
        <CategoryListItemButton
          root={root}
          slug={slug}
          title={null}
          onClick={callback}
        />
      );

      // assert that the component is not rendered
      const link = queryByRole('link', { name: `${slug} category` });
      expect(link).toBeNull();
    });
  });
});
