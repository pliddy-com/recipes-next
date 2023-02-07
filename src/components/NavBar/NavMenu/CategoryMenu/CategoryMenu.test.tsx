// import testing-library methods
import { render, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryMenu from './CategoryMenu';

import { TaxonomyChildrenItem } from 'types/generated/graphql';

// TODO: test conditional (render item for category or menu for subcategory)

describe('CategoryMenu', () => {
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
        <CategoryMenu
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
  });

  describe('if there is an improperly structured category property', () => {
    it('it does not render a menu if the category is null', () => {
      const category = null;

      const callback = jest.fn();

      render(<CategoryMenu category={category} onClick={callback} />);

      // confirm that menu has not been rendered
      const categoryLink = screen.queryByRole('link');

      expect(categoryLink).toBeNull();
    });
  });
});
