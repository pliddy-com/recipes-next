// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import TagListSchema from './TagListSchema';

import * as api from 'lib/api';
import { TagDefaultFragment } from 'types/queries';

jest.mock('lib/api');

const env = process.env;

describe('TagListSchema', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env = {
      ...env,
      NEXT_PUBLIC_SITE_URL: 'https://test.recipes.pliddy.com'
    };
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when there is content', () => {
    it('it renders the component', async () => {
      const tags = await api.getTagIndex({});

      const { asFragment, queryByTestId } = render(
        <TagListSchema tags={tags as (TagDefaultFragment | null)[]} />
      );

      // assert that the component is rendered
      expect(queryByTestId('.tag-list-schema')).toBeDefined();

      // assert that the component matches the existing snapshot
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when there is no page content', () => {
    it('it does not render the component', () => {
      const tags = undefined;

      const { queryByTestId } = render(
        <TagListSchema tags={tags as unknown as TagDefaultFragment[]} />
      );

      expect(queryByTestId('.tag-list-schema')).toBeNull();
    });
  });
});
