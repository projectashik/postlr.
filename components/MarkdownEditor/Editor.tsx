import { EditorTextarea } from './EditorArea';
import { EditorHeader } from './EditorHeader';
import contentStyle from '@styles/Content.module.scss';
import { currentEditorTabAtom, markdownContentAtom } from 'states';
import { useAtom } from 'jotai';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import React from 'react';
import { GuideSection } from 'components/GuideSection';
const gfm = require('remark-gfm');
export const Editor = () => {
  const [currentEditorTab] = useAtom<string>(currentEditorTabAtom);
  const [markdown, setMarkdown] = useAtom(markdownContentAtom);
  return (
    <>
      <EditorHeader />
      <EditorTextarea />

      <div
        id='preview-pane'
        className={
          currentEditorTab === 'preview'
            ? 'w-full p-4 tracking-tight prose break-words dark:prose-dark min-h-30 focus:outline-none sm:prose-sm lg:prose-lg xl:prose-xl ' +
              contentStyle['content-style']
            : 'hidden'
        }
      >
        <ReactMarkdown
          components={{
            code({ className, children }: any) {
              // Removing "language-" because React-Markdown already added "language-"
              const language = className?.replace('language-', '');
              return (
                <SyntaxHighlighter style={materialDark} language={language}>
                  {children[0]}
                </SyntaxHighlighter>
              );
            },
          }}
          plugins={[gfm]}
        >
          {markdown}
        </ReactMarkdown>
      </div>

      <div
        id='guidearea'
        className={currentEditorTab === 'guide' ? 'block px-3 my-3' : 'hidden'}
      >
        <GuideSection />
      </div>
    </>
  );
};
