import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import DynamicImage from '@/components/DynamicImage/DynamicImage';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';

import {
  Document,
  BLOCKS,
  // INLINES,
  MARKS,
} from '@contentful/rich-text-types';

// import { DescriptionDefaultFragment } from 'types/generated/graphql';

type BlockProps = {
  children: ReactNode | ReactNode[];
  //   variant?: TypographyProps['variant'];
};

// const P = ({ children, variant }: BlockProps) => (
//   <Typography variant={variant} paragraph>
//     {children}
//   </Typography>
// );

const P = ({ children }: BlockProps) => (
  <Typography paragraph>{children}</Typography>
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

// type RenderOptionProps = {
//   componentRef: RefObject<HTMLImageElement | HTMLElement>;
//   links?: ComponentRichTextFragment['links'];
//   variant?: TypographyProps['variant'];
// };

const renderOptions = (): Options => {
  //   const { entries } = links ?? {};
  //   const { inline: assets } = entries ?? {};

  // create an entry map
  //   const assetMap = new Map();

  //   if (assets) {
  //     for (const asset of assets) {
  //       assetMap.set(asset?.sys?.id, asset);
  //     }
  //   }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    },
    renderNode: {
      //   [BLOCKS.PARAGRAPH]: (_node, children) => (
      //     <P variant={variant}>{children}</P>
      //   ),
      [BLOCKS.PARAGRAPH]: (_node, children) => <P>{children}</P>,
      [BLOCKS.HEADING_1]: (_node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (_node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (_node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (_node, children) => <H4>{children}</H4>,
      [BLOCKS.HEADING_5]: (_node, children) => <H5>{children}</H5>,
      [BLOCKS.HEADING_6]: (_node, children) => <H6>{children}</H6>,
      //   [INLINES.EMBEDDED_ENTRY]: (node) => {
      //     const { dam, __typename } = assetMap.get(node.data.target.sys.id);
      //     const [damAsset] = dam;

      //     if (__typename && __typename === 'Image' && damAsset) {
      //       return (
      //         <OptimizedImage damAsset={damAsset} componentRef={componentRef} />
      //       );
      //     }
      //   },
    },
  };
};

type RichTextProps = {
  document: Document;
  //   variant?: TypographyProps['variant'];
};

export const RichText = ({ document }: RichTextProps) => {
  //   const { json, links } = document ?? {};

  return <Box>{documentToReactComponents(document, renderOptions())}</Box>;
};

export default RichText;
