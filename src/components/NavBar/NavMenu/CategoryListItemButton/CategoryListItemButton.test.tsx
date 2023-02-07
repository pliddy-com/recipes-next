// import testing-library methods
import { fireEvent, render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryListItemButton from './CategoryListItemButton';

describe('CategoryListItemButton', () => {
  describe('if there is a correct payload', () => {
    it('it renders a list item for the menu', async () => {
      const callback = jest.fn();
      const slug = 'slug';
      const title = 'Test Title';
      const numRecipes = 10;

      const expectedHref = `/category/${slug}`;

      render(
        <CategoryListItemButton
          slug={slug}
          title={title}
          onClick={callback}
          total={numRecipes}
        />
      );

      // confirm that button has been rendered
      const link = screen.queryByRole('link', { name: `${slug} category` });
      expect(link).toBeInTheDocument();

      // button has correct href
      expect(link).toHaveAttribute('href', expectedHref);

      // confirm that callback is called on click
      link && fireEvent.click(link);
      expect(callback).toBeCalled();
    });
  });
});
