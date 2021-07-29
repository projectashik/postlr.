import { currentEditorTabAtom, markdownContentAtom } from 'states';
import styles from '@styles/MdEditor.module.scss';
import { useAtom } from 'jotai';
export const EditorTextarea = () => {
  const [currentTab] = useAtom(currentEditorTabAtom);
  const [markdown, setMarkdown] = useAtom(markdownContentAtom);
  return (
    <>
      <textarea
        autoFocus={true}
        id='mdEditor'
        className={
          currentTab === 'editor' ? 'block ' + styles.editor : ' hidden'
        }
        placeholder='Your content here..'
        onChange={(e: any) => setMarkdown(e.target.value)}
        defaultValue={markdown}
      ></textarea>
    </>
  );
};
