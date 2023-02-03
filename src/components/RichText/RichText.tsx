import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';

import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import {
  RecipeDescription,
  RecipeDescriptionLinks,
} from 'types/generated/graphql';

type BlockProps = {
  children: ReactNode | ReactNode[];
};

const P = ({ children }: BlockProps) => (
  <Typography variant="body1" paragraph>
    {children}
  </Typography>
);

const H1 = ({ children }: BlockProps) => (
  <Typography variant="h1">{children}</Typography>
);

const H2 = ({ children }: BlockProps) => (
  <Typography variant="h2">{children}</Typography>
);

const H3 = ({ children }: BlockProps) => (
  <Typography variant="h3">{children}</Typography>
);

const H4 = ({ children }: BlockProps) => (
  <Typography variant="h4">{children}</Typography>
);

const H5 = ({ children }: BlockProps) => (
  <Typography variant="h5">{children}</Typography>
);

const H6 = ({ children }: BlockProps) => (
  <Typography variant="h6">{children}</Typography>
);

type RenderOptionProps = {
  links?: RecipeDescriptionLinks;
};

const renderOptions = ({ links }: RenderOptionProps): Options => {
  const { entries } = links ?? {};
  const { inline } = entries ?? {};

  // create an entry map
  const entryMap = new Map();

  if (inline) {
    for (const entry of inline) {
      entryMap.set(entry?.sys?.id, entry);
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => <P>{children}</P>,
      [BLOCKS.HEADING_1]: (_node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (_node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (_node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (_node, children) => <H4>{children}</H4>,
      [BLOCKS.HEADING_5]: (_node, children) => <H5>{children}</H5>,
      [BLOCKS.HEADING_6]: (_node, children) => <H6>{children}</H6>,
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { title, slug } = entryMap.get(node.data.target.sys.id);
        return <a href={slug}>{`${title} `}</a>;
      },
    },
  };
};

// NOTE: is being passed json object; needs to know type/structure of full rich text payload
//       and parse json and links children

type RichTextProps = {
  content: RecipeDescription;
};

export const RichText = ({ content }: RichTextProps) => {
  const { json, links } = content ?? {};

  return <Box>{documentToReactComponents(json, renderOptions({ links }))}</Box>;
};

export default RichText;
