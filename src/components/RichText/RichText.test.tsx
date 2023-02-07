// import testing-library methods
import { render } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// import the component to test
import RichText from 'components/RichText/RichText';

import { RecipeDescription } from 'types/generated/graphql';

describe('RichText', () => {
  const content = {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a normal paragraph of text.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
            {
              nodeType: 'hyperlink',
              data: {
                uri: 'https://recipes.pliddy.com',
              },
              content: [
                {
                  nodeType: 'text',
                  value: 'This is an external link.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-1',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 1 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-2',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 2 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-3',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 3 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-4',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 4 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-5',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 5 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'heading-6',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a level 6 heading.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
            {
              nodeType: 'embedded-entry-inline',
              data: {
                target: {
                  sys: {
                    id: '1Z5PsRKqUsxYrWy4tI9jqs',
                    type: 'Link',
                    linkType: 'Entry',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    links: {
      assets: {
        block: [],
        hyperlink: [],
        __typename: 'RecipeDescriptionAssets',
      },
      entries: {
        inline: [
          {
            __typename: 'Recipe',
            sys: {
              id: '1Z5PsRKqUsxYrWy4tI9jqs',
              environmentId: 'abab825b-f415-453b-afff-f68b7fa1d712',
              spaceId: 'fo9qwg6zarbt',
              __typename: 'Sys',
            },
            slug: 'red-beans-and-rice',
            title: 'Red Beans & Rice',
          },
        ],
        hyperlink: [],
        __typename: 'RecipeDescriptionEntries',
      },
      __typename: 'RecipeDescriptionLinks',
    },
    __typename: 'RecipeDescription',
  };

  it('renders the rich text section if there is content', async () => {
    const expectedText = content.json.content[0].content[0].value;

    const expectedExternalText =
      content.json.content[1].content[1].content?.[0].value;

    const { uri: expectedExternalHref } = content.json.content[1].content[1]
      .data as {
      uri: string;
    };
    const expectedRefText = content.links.entries.inline[0].title;
    const expectedRefHref = content.links.entries.inline[0].slug;

    const { getByRole, getByText } = render(
      <RichText content={content as unknown as RecipeDescription} />
    );

    const p = getByText(expectedText as string);
    const h1 = getByRole('heading', { level: 1 });
    const h2 = getByRole('heading', { level: 2 });
    const h3 = getByRole('heading', { level: 3 });
    const h4 = getByRole('heading', { level: 4 });
    const h5 = getByRole('heading', { level: 5 });
    const h6 = getByRole('heading', { level: 6 });
    const externalLink = getByRole('link', {
      name: expectedExternalText,
    });
    const refLink = getByRole('link', {
      name: expectedRefText,
    });

    expect(p).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
    expect(h4).toBeInTheDocument();
    expect(h5).toBeInTheDocument();
    expect(h6).toBeInTheDocument();
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute('href', expectedExternalHref);
    expect(refLink).toBeInTheDocument();
    expect(refLink).toHaveAttribute('href', expectedRefHref);
  });

  it('does not render the rich text section if there is no content', () => {
    const content = undefined;
    const { queryByTestId } = render(
      <RichText content={content as unknown as RecipeDescription} />
    );

    const richText = queryByTestId('richtext');
    expect(richText).toBeNull();
  });

  it('handles rendering if there are no entries in links', () => {
    const content = {
      json: {
        nodeType: 'document',
        data: {},
        content: [],
      },
      links: {},
    };

    const { queryByTestId } = render(
      <RichText content={content as unknown as RecipeDescription} />
    );

    const richText = queryByTestId('richtext');
    expect(richText).toBeInTheDocument();
  });

  it('handles rendering if there are no links', () => {
    const content = {
      json: {
        nodeType: 'document',
        data: {},
        content: [],
      },
    };

    const { queryByTestId } = render(
      <RichText content={content as unknown as RecipeDescription} />
    );

    const richText = queryByTestId('richtext');
    expect(richText).toBeInTheDocument();
  });
});
