import styles from '@styles/ImageUpload.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

export const UsagePanel = ({ url }: { url: string }) => {
  const onCopy = (type: string) => {
    toast(`🎉 ${type} copied`);
  };
  return (
    <>
      <div className={styles.uploadContainer + ' usage'}>
        <div className='flex items-center relative border border-gray-300 dark:border-gray-600 rounded mb-2 h-12'>
          <div className='flex-1 px-2 overflow-auto'>{url}</div>
          <CopyToClipboard text={url} onCopy={() => onCopy('URL')}>
            <button className='bg-gray-300 absolute right-2 rounded p-1 dark:bg-gray-600 text-sm'>
              Copy
            </button>
          </CopyToClipboard>
        </div>
        <div className='flex items-center relative border border-gray-300 dark:border-gray-600 rounded h-12'>
          <div className='flex-1 px-2 overflow-auto whitespace-nowrap'>
            ![ALT_TEXT]({url})
          </div>
          <CopyToClipboard
            text={'![ALT_TEXT](' + url + ')'}
            onCopy={() => onCopy('Markdown')}
          >
            <button className='bg-gray-300 absolute right-2 rounded text-sm p-1 dark:bg-gray-600'>
              Copy Md
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
};
