/* istanbul ignore file */

import React, { useState } from 'react';

import //   BaseEditor,
//   Descendant
// createEditor
'slate';
import // Slate,
// Editable,
//   ReactEditor
// withReact
'slate-react';

import {
  toSlatejsDocument,
  toContentfulDocument
} from '@contentful/contentful-slatejs-adapter';

// import PayloadRender from 'components/PayloadRender/PayloadRender';

import { RecipeDescription } from 'types/queries';

import RichTextEditor from 'components/Recipe/RecipeEdit/EditComponents/RichTextEditor';
import { SlateNode } from '@contentful/contentful-slatejs-adapter/dist/types/types';

// type CustomElement = { type: 'paragraph'; children: CustomText[] };
// type CustomText = { text: string };

// declare module 'slate' {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor;
//     Element: CustomElement;
//     Text: CustomText;
//   }
// }
interface IRichTextEdit {
  payload: RecipeDescription;
}

const RichTextEdit = ({ payload }: IRichTextEdit) => {
  //   const [editor] = useState(() => withReact(createEditor()));

  const document = toSlatejsDocument({ document: payload.json });

  const [value, setValue] = useState<SlateNode[]>(document);

  //   console.log({ document });

  const updateValue = (value: SlateNode[]) => {
    const contentfulDocument = toContentfulDocument({ document: value });
    setValue(value);
    console.log('updateValue', { slateDocument: value, contentfulDocument });
  };

  //   const initialValue: Descendant[] = [
  //     {
  //       type: 'paragraph',
  //       children: [{ text: 'A line of text in a paragraph.' }]
  //     }
  //   ];

  return (
    <>
      <RichTextEditor value={value} setValue={updateValue} />
      {/* <Slate editor={editor} value={document as Descendant[]}>
        <Editable />
      </Slate> */}

      {/* <p>
        <strong>Document</strong>
      </p>
      <PayloadRender payload={document} /> */}
    </>
  );

  //   return (
  //     <>
  //       <p>
  //         <strong>Payload</strong>
  //       </p>
  //       <PayloadRender payload={payload.json} />

  // <p>
  //   <strong>Document</strong>
  // </p>
  // <PayloadRender payload={document} />
  //     </>
  //   );
};

export default RichTextEdit;
