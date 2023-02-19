// import testing-library methods
import { render, fireEvent, waitFor } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import SubcategoryMenu from './SubcategoryMenu';

import { TaxonomyChildrenItem } from 'types/queries';

describe('SubcategoryMenu', () => {
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
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      // confirm that menu has been rendered
      expect(container).toBeInTheDocument();

      // confirm that category link is displayed
      const categoryLink = queryByText(expectedCategoryTitle)?.closest('a');
      expect(categoryLink).toBeInTheDocument();

      // category link has correct href
      expect(categoryLink).toHaveAttribute('href', expectedCategoryHref);

      // confirm that category link is displayed
      const subcategoryLink = queryByText(expectedSubcategoryTitle)?.closest(
        'a'
      );
      expect(subcategoryLink).toBeInTheDocument();

      // category link has correct href
      expect(subcategoryLink).toHaveAttribute('href', expectedSubcategoryHref);

      // assert that the component matches the existing snapshot
      expect(container).toMatchSnapshot();
    });

    it('it handles clicks on the expand/collapse icon', () => {
      const { queryByRole, queryByTestId } = render(
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      const button = queryByRole('button', { name: 'expand' });
      const menu = queryByTestId(`${category.title} menu`);

      // confirm that menu is hidden
      expect(menu).not.toBeVisible();

      // simulate click on expand button
      button && fireEvent.click(button);

      // wait and confirm that menu is visible
      waitFor(() => expect(menu).toBeVisible());

      // simulate click on collapse button
      button && fireEvent.click(button);

      // wait and confirm that menu is hidden
      waitFor(() => expect(menu).not.toBeVisible());
    });
  });

  describe('when there is an improperly structured category property', () => {
    it('it does not render a menu if slug & title are missing the from category object', () => {
      const category = {
        sys: {
          id: 'sysId',
        },
        __typename: 'Taxonomy',
      };

      const { queryByRole } = render(
        <SubcategoryMenu
          category={category as TaxonomyChildrenItem}
          onClick={callback}
        />
      );

      // confirm that menu has not been rendered
      const categoryLink = queryByRole('link');
      expect(categoryLink).toBeNull();
    });

    it('it does not render a menu if the category is null', () => {
      const category = null;

      const callback = jest.fn();

      const { queryByRole } = render(
        <SubcategoryMenu category={category} onClick={callback} />
      );

      // confirm that menu has not been rendered
      const categoryLink = queryByRole('link');

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
