// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

import NavMenu, { NavMenuProps } from './NavMenu';

import { TaxonomyChildrenItem } from 'types/queries';

import * as api from 'lib/api';

jest.mock('lib/api');

const callback = jest.fn();

describe('NavMenu', () => {
  describe('when there is a properly structured nav property', () => {
    it('it renders a nav menu', async () => {
      const { categories } = await api.getNavTaxonomy();

      const props: NavMenuProps = {
        anchorEl: null,
        featuredLabel: 'Categories',
        featuredUrl: '/tags',
        id: 'categories-menu',
        isOpen: false,
        label: 'Categories',
        onClick: callback,
        onClose: callback,
        nav: categories as TaxonomyChildrenItem[],
        root: 'tags'
      };

      const { asFragment } = render(<NavMenu {...props} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
