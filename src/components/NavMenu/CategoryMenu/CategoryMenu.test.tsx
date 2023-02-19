// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import CategoryMenu from './CategoryMenu';

import { TaxonomyChildrenItem } from 'types/queries';

// TODO: test conditional (render item for category or menu for subcategory)

describe('CategoryMenu', () => {
  const callback = jest.fn();

  describe('when there is a properly structured category property', () => {
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

    it('it renders a menu defined by the category tag list', () => {
      const expectedCategoryTitle = `${category.title} (${category.childrenCollection.total})`;
      const expectedCategoryHref = `/category/${category.slug}`;

      const subcategory = category.childrenCollection.items[0];
      const expectedSubcategoryTitle = `${subcategory.title} (${subcategory.linkedFrom.recipeCollection.total})`;
      const expectedSubcategoryHref = `/category/${subcategory.slug}`;

      const { container, queryByText } = render(
        <CategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      // assert that the menu has been rendered
      expect(container).toBeInTheDocument();

      // assert that the category link is displayed
      const categoryLink = queryByText(expectedCategoryTitle)?.closest('a');
      expect(categoryLink).toBeInTheDocument();

      // assert that the category link has correct href
      expect(categoryLink).toHaveAttribute('href', expectedCategoryHref);

      // assert that the category link is displayed
      const subcategoryLink = queryByText(expectedSubcategoryTitle)?.closest(
        'a'
      );
      expect(subcategoryLink).toBeInTheDocument();

      // assert that the category link has correct href
      expect(subcategoryLink).toHaveAttribute('href', expectedSubcategoryHref);

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is an improperly structured category property', () => {
    it('it does not render', () => {
      const category = null;

      const { queryByRole } = render(
        <CategoryMenu category={category} onClick={callback} />
      );

      // assert that menu has not been rendered
      const categoryLink = queryByRole('link');
      expect(categoryLink).toBeNull();
    });
  });
});
