// import testing-library methods
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import SubcategoryMenu from './SubcategoryMenu';

import { TaxonomyChildrenItem } from 'types/generated/graphql';

// TODO: check interaction (expand/collapse)

describe('SubcategoryMenu', () => {
  const callback = jest.fn();

  describe('if there is a properly structured category property', () => {
    const category = {
      title: 'Category Title',
      slug: 'category-slug',
      tag: {
        title: 'Category Tag Title',
        slug: 'category-tag-slug',
        linkedFrom: {
          recipeCollection: {
            total: 2,
          },
        },
      },
      childrenCollection: {
        total: 2,
        items: [
          {
            title: 'Tag 1',
            slug: 'tag-1',
            linkedFrom: {
              recipeCollection: {
                total: 1,
              },
            },
          },
          {
            title: 'Tag 2',
            slug: 'tag-2',
            linkedFrom: {
              recipeCollection: {
                total: 0,
              },
            },
          },
        ],
      },
    };

    it('renders a menu defined by the category tag list', async () => {
      const expectedCategoryTitle = `${category.title} (${category.childrenCollection.total})`;
      const expectedCategoryHref = `/category/${category.slug}`;

      const subcategory = category.childrenCollection.items[0];
      const expectedSubcategoryTitle = `${subcategory.title} (${subcategory.linkedFrom.recipeCollection.total})`;
      const expectedSubcategoryHref = `/category/${subcategory.slug}`;

      // renders category list item

      const { container } = render(
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      // confirm that menu has been rendered
      expect(container).toBeInTheDocument();

      // confirm that category link is displayed
      const categoryLink = screen.getByText(expectedCategoryTitle).closest('a');
      expect(categoryLink).toBeInTheDocument();

      // category link has correct href
      expect(categoryLink).toHaveAttribute('href', expectedCategoryHref);

      // confirm that category link is displayed
      const subcategoryLink = screen
        .getByText(expectedSubcategoryTitle)
        .closest('a');
      expect(subcategoryLink).toBeInTheDocument();

      // category link has correct href
      expect(subcategoryLink).toHaveAttribute('href', expectedSubcategoryHref);
    });

    it('it handles clicks on the expand/collapse icon', async () => {
      render(
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      const button = await screen.getByRole('button', { name: 'expand' });
      const menu = await screen.getByTestId(`${category.title} menu`);

      // confirm that menu is hidden
      await expect(menu).not.toBeVisible();

      // simulate click on expand button
      fireEvent.click(button);

      // wait and confirm that menu is visible
      waitFor(() => expect(menu).toBeVisible());

      // simulate click on collapse button
      fireEvent.click(button);

      // wait and confirm that menu is hidden
      waitFor(() => expect(menu).not.toBeVisible());
    });
  });

  describe('if there is an improperly structured category property', () => {
    it('it does not render a menu if slug & title are missing the from category object', () => {
      const category = {
        sys: {
          id: 'sysId',
        },
        __typename: 'Taxonomy',
      };

      render(
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      // confirm that menu has not been rendered
      const categoryLink = screen.queryByRole('link');
      expect(categoryLink).toBeNull();
    });

    it('it does not render a menu if the category is null', () => {
      const category = null;

      const callback = jest.fn();

      render(<SubcategoryMenu category={category} onClick={callback} />);

      // confirm that menu has not been rendered
      const categoryLink = screen.queryByRole('link');

      expect(categoryLink).toBeNull();
    });

    it('it does not render a menu if the child values are null', () => {
      const category = {
        title: 'Category Title',
        slug: 'category-slug',
        tag: {
          title: 'Category Tag Title',
          slug: 'category-tag-slug',
          linkedFrom: {
            recipeCollection: {
              total: 2,
            },
          },
        },
        childrenCollection: {
          items: [null],
        },
      };

      const callback = jest.fn();

      const { queryByTestId } = render(
        <SubcategoryMenu
          category={category as unknown as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      const menuItems = queryByTestId('subcategory item');

      expect(menuItems).toBeNull();
    });
  });
});
