import styles from '@styles/MdEditor.module.scss';
import {
  FaEye,
  FaPen,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaListUl,
  FaListOl,
  FaCamera,
  FaGrin,
} from 'react-icons/fa';
import { HeadingMenu } from './menus/HeadingMenu';
import { useAtom } from 'jotai';
import { currentEditorTabAtom, markdownContentAtom } from 'states';
import Tippy from '@tippyjs/react';
import { editorActions, emoji } from 'utils/md';
import { Picker } from 'emoji-mart';
import { useState } from 'react';

export const EditorHeader = () => {
  const [currentTab, setCurrentTab] = useAtom(currentEditorTabAtom);
  const [, setMarkdown] = useAtom(markdownContentAtom);
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  const addEmoji = (v: any) => {
    setMarkdown(emoji(v.native));
  };

  return (
    <div>
      <div className={styles.header}>
        <div className='flex gap-1'>
          <button
            className={
              styles.menuButton +
              (currentTab === 'editor' ? ' bg-gray-100 dark:bg-gray-700' : '')
            }
            onClick={() => setCurrentTab('editor')}
          >
            <FaPen />
            <span className='ml-2'>Write</span>
          </button>
          <button
            className={
              styles.menuButton +
              (currentTab === 'preview' ? ' bg-gray-100 dark:bg-gray-700' : '')
            }
            onClick={() => setCurrentTab('preview')}
          >
            <FaEye />
            <span className='ml-2'>Preview</span>
          </button>
          <button
            className={
              styles.menuButton +
              (currentTab === 'guide' ? ' bg-gray-100 dark:bg-gray-700' : '')
            }
            onClick={() => setCurrentTab('guide')}
          >
            <FaEye />
            <span className='ml-2'>Guide</span>
          </button>
        </div>
        <div className={currentTab === 'editor' ? 'flex' : 'hidden'}>
          <HeadingMenu />
          {editorActions.map((a) => {
            return (
              <Tippy key={Math.random()} content={a.name}>
                <button
                  onClick={() => setMarkdown(a.action)}
                  className={styles.menuButton + a.class}
                >
                  {a.content}
                </button>
              </Tippy>
            );
          })}

          <div className='flex items-center justify-center mx-2 relative'>
            <button
              onClick={() => setDisplayEmojiPicker(!displayEmojiPicker)}
              className='text-yellow-400 text-xl'
            >
              <FaGrin />
            </button>
            {displayEmojiPicker && (
              <div className='absolute right-0 top-full'>
                <Picker onSelect={addEmoji} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
