import { useAtom } from 'jotai';
import { FiX } from 'react-icons/fi';
import {
  hashnodeCoverImageUrlAtom,
  hashnodeSearchedTagsAtom,
  hashnodeSelectedTagsAtom,
  hashnodeTagsAtom,
  hashnodeTagSearchInputAtom,
  hideFromHashnodeFeedAtom,
  onHashnodeAtom,
} from 'states';
import styles from 'styles/PublishBar.module.scss';

const HashnodeSection = () => {
  const [onHashnode, setOnHashnode] = useAtom(onHashnodeAtom);
  const [hashnodeTagSearchInput, setHashnodeTagSearchInput] = useAtom(
    hashnodeTagSearchInputAtom
  );
  const [hashnodeTags, setHashnodeTags]: any[] = useAtom(hashnodeTagsAtom);
  const [hashnodeSelectedTags, setHashnodeSelectedTags]: any[] = useAtom(
    hashnodeSelectedTagsAtom
  );
  const [hashnodeSearchedTags, setHashnodeSearchedTags]: any[] = useAtom(
    hashnodeSearchedTagsAtom
  );
  const [hideFromHashnodeFeed, setHideFromHashnodeFeed] = useAtom(
    hideFromHashnodeFeedAtom
  );
  const [hashnodeCoverImageUrl, setHashnodeCoverImageUrl] = useAtom(
    hashnodeCoverImageUrlAtom
  );

  const searchHashnodeTag = (value: string) => {
    setHashnodeSearchedTags(
      hashnodeTags.filter((tag: any) => {
        return tag.slug.includes(value);
      })
    );
  };

  const cancelHashnode = () => {
    setOnHashnode(false);
    setHashnodeTags(null);
    setHashnodeSelectedTags([]);
    setHashnodeSearchedTags([]);
  };

  const removeHashnodeTag = (tag: any) => {
    const filteredTags = hashnodeSelectedTags.filter((fTag: any) => {
      return fTag._id !== tag._id;
    });

    setHashnodeSelectedTags(filteredTags);
  };
  return (
    <div className={styles.card}>
      <div className='header  p-2  border-b dark:border-gray-600 flex justify-between items-center'>
        <p>Hashnode Settings ⚙️</p>
        <button
          className='bg-red-400 border-2 border-red-600 px-2 rounded text-white'
          onClick={cancelHashnode}
        >
          Cancel
        </button>
      </div>
      {hashnodeTags ? (
        <div className='body p-2 flex flex-col gap-2'>
          <div className={'flex items-center justify-between ' + styles.card}>
            <label htmlFor='hideFromHashnodeFeed'>
              Hide From Hashnode Feed
            </label>
            <input
              type='checkbox'
              className='w-4 h-4 dark:text-gray-700'
              id='hideFromHashnodeFeed'
              value={hideFromHashnodeFeed ? 'on' : 'off'}
              onChange={(e) =>
                setHideFromHashnodeFeed(e.target.value === 'on' ? true : false)
              }
            />
          </div>

          <div className={styles.card}>
            <label htmlFor='hashnode_cover_image_url'>
              Cover Image URL (Optional)
            </label>
            <input
              type='text'
              className={styles.cardInput}
              id='hashnode_cover_image_url'
              placeholder='Image URL'
              value={hashnodeCoverImageUrl}
              onChange={(e) => {
                setHashnodeCoverImageUrl(e.target.value);
              }}
            />
            <p className='text-xs text-gray-500'>
              You can upload image from upload image button below the site
            </p>
          </div>
          <div className={styles.card + ' relative'}>
            <label htmlFor='tagsInput'>Select Tags</label>
            <input
              type='text'
              className={styles.cardInput}
              id='tagsInput'
              placeholder='Search Tag'
              value={hashnodeTagSearchInput}
              onChange={(e) => {
                setHashnodeTagSearchInput(e.target.value);
                searchHashnodeTag(e.target.value);
              }}
            />
            <div className='absolute z-50 bg-white shadow w-full flex flex-col'>
              {hashnodeTagSearchInput.length > 0 &&
                hashnodeSearchedTags &&
                hashnodeSearchedTags.map((tag: any) => {
                  return (
                    <button
                      className='py-2 hover:bg-gray-200'
                      onClick={() => {
                        setHashnodeSelectedTags((prevTags: any) => {
                          return [...prevTags, tag];
                        });
                        setHashnodeTagSearchInput('');
                      }}
                      key={tag._id}
                    >
                      {tag.slug}
                    </button>
                  );
                })}
            </div>
            <div>
              <ul className='flex gap-2 flex-wrap mt-2'>
                {hashnodeSelectedTags &&
                  hashnodeSelectedTags.map((tag: any) => {
                    return (
                      <li
                        key={tag._id}
                        className='border bg-blue-100 border-blue-300 rounded p-1 flex items-center gap-1'
                      >
                        {tag.slug}
                        <button onClick={() => removeHashnodeTag(tag)}>
                          <FiX />
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default HashnodeSection;
