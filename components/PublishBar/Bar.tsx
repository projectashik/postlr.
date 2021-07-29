// React Imports
import { useState } from 'react';

// Styles
import styles from '@styles/PublishBar.module.scss';

// States
import { useAtom } from 'jotai';
import { displayPublishBarAtom } from 'states';

// Icons
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

// Components Import
import { Button } from 'components/utils/Button';
import { useEffect } from 'react';

export const PublishBar = () => {
  const [displayPublishBar, setDisplayPublishBar] = useAtom(
    displayPublishBarAtom
  );
  return (
    <>
      <div
        className={
          styles.PublishBar + (displayPublishBar ? ' right-0' : ' -right-96')
        }
      >
        <div className={styles.header}>
          <button
            className={styles.close}
            onClick={() => setDisplayPublishBar(false)}
          >
            <FaTimes />
          </button>

          <Button className=' flex items-center py-1 px-3 bg-primary text-white rounded'>
            <FaPaperPlane />
            <span className='ml-2'>Publish</span>
          </Button>
        </div>

        <div className={styles.body} style={{ height: 'calc(100vh - 48px)' }}>
          <div className={styles.card}>
            <label htmlFor='main_cover_image_url'>Cover Image URL</label>
            <input
              type='text'
              className={styles.cardInput}
              id='main_cover_image_url'
              placeholder='Image URL'
            />
            <p className={styles.cardHelperText}>
              You can upload image from upload image button below the site
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <Button className='py-2 rounded bg-hashnode text-white'>
              Setup for hashnode
            </Button>
            <Button className='py-2 rounded bg-medium text-white'>
              Setup for medium
            </Button>
            <Button className='py-2 rounded bg-devto text-white'>
              Setup for dev.to
            </Button>
          </div>
          {/* <div className={styles.card}>
            <div className='header  p-2  border-b dark:border-gray-600'>
              <p>Hashnode Settings ⚙️</p>
            </div>
            <div className='body p-2 flex flex-col gap-2'>
              <div
                className={'flex items-center justify-between ' + styles.card}
              >
                <label htmlFor='hideFromHashnodeFeed'>
                  Hide From Hashnode Feed
                </label>
                <input
                  type='checkbox'
                  className='w-4 h-4 dark:text-gray-700'
                  id='hideFromHashnodeFeed'
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
                  onChange={(e) => {}}
                />
                <div className='absolute z-50 bg-white shadow w-full'></div>
                <div>
                  <ul className='flex gap-2 flex-wrap mt-2'></ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
