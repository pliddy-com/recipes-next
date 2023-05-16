/* istanbul ignore file */

/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

/**
 * Based on:
 * https://codesandbox.io/s/rich-text-editor-with-slate-and-material-ui-tuhll?file=/src/RichEditor.js
 *
 * Follow:
 * https://sushilkbansal.medium.com/customising-slate-js-part-1-adding-material-ui-c98568951258
 * to build out custom UI from scratch
 */

import React, { useCallback, useMemo } from 'react';
// import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { BaseEditor, createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
/* istanbul ignore file */

// import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import LooksOneIcon from '@mui/icons-material/LooksOne';
// import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SlateNode } from '@contentful/contentful-slatejs-adapter/dist/types/types';

// import Toolbar from '@mui/material/Toolbar';

// const HOTKEYS = {
//   'mod+b': 'bold',
//   'mod+i': 'italic',
//   'mod+u': 'underline',
//   'mod+`': 'code'
// };

const RichTextEditor = ({
  value,
  setValue
}: {
  value: SlateNode[];
  setValue: (value: SlateNode[]) => void;
}) => {
  // @ts-ignore
  const renderElement = useCallback((props) => <Element {...props} />, []);
  // @ts-ignore
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const control = {
    value: 'format',
    onChange: () => {
      console.log('button group change');
    },
    exclusive: true
  };

  return (
    <Box p={1} border={1} borderColor="rgba(0,0,0,0.23)" borderRadius={1}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value as SlateNode[]);
        }}
      >
        {/* @ts-ignore */}
        <Toolbar>
          <ToggleButtonGroup size="small" {...control} aria-label="format">
            <MarkButton format="bold">
              <FormatBoldIcon />
            </MarkButton>
            <MarkButton format="italic">
              <FormatItalicIcon />
            </MarkButton>
            <MarkButton format="underline">
              <FormatUnderlinedIcon />
            </MarkButton>
          </ToggleButtonGroup>
          {/* <MarkButton format="bold">
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton format="italic">
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton format="underline">
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton format="code">
            <CodeIcon />
          </MarkButton> */}

          {/* <BlockButton format="heading-one">
            <LooksOneIcon />
          </BlockButton>
          <BlockButton format="heading-two">
            <LooksTwoIcon />
          </BlockButton> */}

          {/* <BlockButton format="block-quote">
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton format="numbered-list">
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton format="bulleted-list">
            <FormatListBulletedIcon />
          </BlockButton> */}
        </Toolbar>
        <Box pl={1}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            // onKeyDown={(event) => {
            //   for (const hotkey in HOTKEYS) {
            //     if (isHotkey(hotkey, event)) {
            //       event.preventDefault();
            //       const mark = HOTKEYS[hotkey];
            //       toggleMark(editor, mark);
            //     }
            //   }
            // }}
          />
        </Box>
      </Slate>
    </Box>
  );
};

// @ts-ignore
export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// @ts-ignore
export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// @ts-ignore
const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        size="small"
        // style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

// @ts-ignore
const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <ToggleButton
        value={format}
        selected={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </ToggleButton>
    </Box>
  );
};

// @ts-ignore
// eslint-disable-next-line react/display-name
const Menu = React.forwardRef(({ children, ...props }, _ref) => {
  return (
    // @ts-ignore
    <Box
      display="flex"
      direction="row"
      justify="flex-start"
      alignItems="center"
      flexWrap="wrap"
    >
      {children}
    </Box>

    // <>
    //   <Box
    //     display="flex"
    //     direction="row"
    //     justify="flex-start"
    //     alignItems="center"
    //     flexWrap="wrap"
    //   >
    //     {children}
    //   </Box>
    //   <Box pt={2}>
    //     <Divider variant="middle" />
    //   </Box>
    // </>
  );
});

// @ts-ignore
const Toolbar = React.forwardRef(({ className, ...props }, ref) => {
  return <Menu {...props} ref={ref} />;
});

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

// @ts-ignore
const isBlockActive = (editor: BaseEditor, format) => {
  // @ts-ignore
  const [match] = Editor.nodes(editor, {
    // @ts-ignore
    match: (n) => n.type === format
  });
  return !!match;
};

// @ts-ignore
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
};

// @ts-ignore
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    // @ts-ignore
    match: (n) => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    // @ts-ignore
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// @ts-ignore
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export default RichTextEditor;
