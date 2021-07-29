import { markdownContentAtom } from 'states';
import { useAtom } from 'jotai';
import {
  FaCode,
  FaEmber,
  FaImage,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaTable,
} from 'react-icons/fa';

const thingsToEdit = (startValue: string, endValue = '') => {
  const editor = document.getElementById('mdEditor') as HTMLTextAreaElement;
  var start = editor.selectionStart;
  var end = editor.selectionEnd;
  var sel = editor.value.substring(start, end);
  let finText =
    editor.value.substring(0, start) +
    startValue +
    sel +
    endValue +
    editor.value.substring(end);
  editor.value = finText;
  if (sel.length > 0) {
    editor.selectionEnd = end + startValue.length + endValue.length;
  } else if (sel.length == 0) {
    editor.selectionEnd = end + startValue.length;
  }

  editor.focus();
  return finText;
};

export const editorActions = [
  {
    name: 'Bold',
    content: 'B',
    class: ' font-mono',
    action: () => thingsToEdit('**', '**'),
  },
  {
    name: 'Itatlic',
    content: 'I',
    class: ' font-mono italic',
    action: () => thingsToEdit('*', '*'),
  },
  {
    name: 'Link',
    content: <FaLink />,
    class: '',
    action: () => thingsToEdit('[', 'TEXT](LINK)'),
  },
  {
    name: 'Blockquote',
    content: <FaQuoteLeft />,
    class: '',
    action: () => thingsToEdit('> '),
  },
  {
    name: 'Code',
    content: <FaCode />,
    class: '',
    action: () => thingsToEdit('```', '\n```'),
  },
  {
    name: 'Embed',
    content: 'E',
    class: '',
    action: () => thingsToEdit('%[', 'LINK]%'),
  },
  {
    name: 'Unordered List',
    content: <FaListUl />,
    class: '',
    action: () => thingsToEdit('- '),
  },
  {
    name: 'Ordered List',
    content: <FaListOl />,
    class: '',
    action: () => thingsToEdit('1. '),
  },
  {
    name: 'Image',
    content: <FaImage />,
    class: '',
    action: () => thingsToEdit('![', 'ALT_TEXT](IMG_LINK)'),
  },
  {
    name: 'Table',
    content: <FaTable />,
    class: '',
    action: () =>
      thingsToEdit(
        `| I |HI |Hey|
|---|---|---|
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |`
      ),
  },
];

export const h1 = () => {
  return thingsToEdit('# ');
};
export const h2 = () => {
  return thingsToEdit('## ');
};
export const h3 = () => {
  return thingsToEdit('### ');
};
export const h4 = () => {
  return thingsToEdit('#### ');
};
export const h5 = () => {
  return thingsToEdit('##### ');
};

export const emoji = (e: any) => {
  return thingsToEdit(e);
};
