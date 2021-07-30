// React Imports
import { useState } from 'react';

// Styles
import styles from '@styles/PublishBar.module.scss';

// States
import { useAtom } from 'jotai';
import {
  articleCoverImageUrlAtom,
  articleTitleAtom,
  devToCoverImageUrlAtom,
  devToSeriesAtom,
  devToTagsAtom,
  displayPublishBarAtom,
  hashnodeCoverImageUrlAtom,
  hashnodeSearchedTagsAtom,
  hashnodeSelectedTagsAtom,
  hashnodeTagsAtom,
  hashnodeTagSearchInputAtom,
  hideFromHashnodeFeedAtom,
  isScheduledAtom,
  markdownContentAtom,
  onDevToAtom,
  onHashnodeAtom,
  scheduledAtAtom,
} from 'states';

// Icons
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

// Components Import
import { Button } from 'components/utils/Button';
import axios from 'axios';
import HashnodeSection from './HashnodeSection';
import DevToSection from './DevToSection';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useClerkSWR } from 'libs/fetcher';
import { tokens } from '@prisma/client';

export const PublishBar = () => {
  const [displayPublishBar, setDisplayPublishBar] = useAtom(
    displayPublishBarAtom
  );

  const [hashnodeProcessing, setHashnodeProcessing] = useState(false);
  const [devToProcessing, setDevToProcessing] = useState(false);

  const [onHashnode, setOnHashnode] = useAtom(onHashnodeAtom);
  const [onDevTo, setOnDevTo] = useAtom(onDevToAtom);

  const [hashnodeTags, setHashnodeTags]: any[] = useAtom(hashnodeTagsAtom);
  const [hashnodeSearchedTags, setHashnodeSearchedTags]: any[] = useAtom(
    hashnodeSearchedTagsAtom
  );
  const [processing, setProcessing] = useState(false);

  // Requried Datas for request
  const [hashnodeSelectedTags, setHashnodeSelectedTags]: any[] = useAtom(
    hashnodeSelectedTagsAtom
  );
  const [hideFromHashnodeFeed, setHideFromHashnodeFeed] = useAtom(
    hideFromHashnodeFeedAtom
  );
  const [hashnodeCoverImageUrl, setHashnodeCoverImageUrl] = useAtom(
    hashnodeCoverImageUrlAtom
  );
  const [devToCoverImageUrl, setDevToCoverImageUrl] = useAtom(
    devToCoverImageUrlAtom
  );
  const [devToTags, setDevToTags] = useAtom(devToTagsAtom);
  const [devToSeries, setDevToSeries] = useAtom(devToSeriesAtom);
  const [title, setTitle] = useAtom(articleTitleAtom);
  const [content] = useAtom(markdownContentAtom);
  const [coverImageUrl, setCoverImageUrl] = useAtom(articleCoverImageUrlAtom);
  const [isScheduled, setIsScheduled] = useAtom(isScheduledAtom);
  const [scheduledAt, setScheduledAt] = useAtom(scheduledAtAtom);

  const { data: tokens } = useClerkSWR<tokens[]>('/api/GET/tokens');
  // Setup for hashnode
  const setupForHashnode = async () => {
    setHashnodeProcessing(true);
    const hashnodeToken = tokens?.filter((t) => {
      return t.platform === 'hashnode';
    });
    if (hashnodeToken && hashnodeToken?.length > 0) {
      setOnHashnode(true);
      const hashnodeTagsResponse = await axios.get('/api/GET/hashnodeTags');
      setHashnodeTags(hashnodeTagsResponse.data.tags);
      setHashnodeProcessing(false);
    } else {
      toast.error('Hashnode Token not added');
      setHashnodeProcessing(false);
      return false;
    }
  };

  // Setup for Dev TO
  const setupForDevTo = () => {
    setDevToProcessing(true);
    const devToToken = tokens?.filter((t) => {
      return t.platform === 'devto';
    });
    if (devToToken && devToToken?.length > 0) {
      setOnDevTo(true);
      setDevToProcessing(false);
    } else {
      toast.error('Dev.to account not added');
      setDevToProcessing(false);
      return false;
    }
  };

  const onPublish = async () => {
    setProcessing(true);
    if (!title) {
      toast.error('Title is required');
      setProcessing(false);
      return false;
    }
    if (!content) {
      toast.error('Content is required');
      setProcessing(false);
      return false;
    }
    const createResponse = await axios.post('/api/POST/articles', {
      title,
      content: content,
      coverImage: coverImageUrl,
      isScheduled,
      scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      isHashnode: onHashnode,
      isDevTo: onDevTo,
      hashnodeTags: hashnodeSelectedTags,
      hideFromHashnodeFeedAtom,
      hashnodeCoverImageUrl,
      devToCoverImageUrl,
      devToTags,
      devToSeries,
    });

    console.log(createResponse);
    toast(createResponse.data.message);
    setProcessing(false);
  };

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

          <Button
            onClick={onPublish}
            loading={processing}
            disabled={!onHashnode || !onDevTo}
            className=' flex items-center py-1 px-3 bg-primary text-white rounded'
          >
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
              value={coverImageUrl}
              onChange={(e) => {
                setCoverImageUrl(e.target.value);
              }}
            />
            <p className={styles.cardHelperText}>
              You can upload image from upload image button below the site
            </p>
          </div>
          <div className={styles.card}>
            <div className={'flex items-center justify-between ' + styles.card}>
              <label htmlFor='schedule'>Schedule</label>
              <input
                type='checkbox'
                className='w-4 h-4 dark:text-gray-700'
                id='schedule'
                value={isScheduled ? 'on' : 'off'}
                onChange={(e) =>
                  setIsScheduled(e.target.value === 'on' ? true : false)
                }
              />
            </div>
            <div className={' mt-2 ' + styles.card}>
              <label htmlFor='scheduleDateTime'>Schedule Date Time</label>
              <input
                type='datetime-local'
                className={styles.cardInput}
                id='scheduleDateTime'
                placeholder='Schedule Data Time'
                onChange={(e) => {
                  setScheduledAt(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {!onHashnode && (
              <Button
                onClick={setupForHashnode}
                className='py-2 rounded bg-hashnode text-white'
                loading={hashnodeProcessing}
              >
                Setup for hashnode
              </Button>
            )}
            {!onDevTo && (
              <Button
                onClick={setupForDevTo}
                className='py-2 rounded bg-devto text-white'
                loading={devToProcessing}
              >
                Setup for dev.to
              </Button>
            )}
          </div>

          {onHashnode && <HashnodeSection />}

          {onDevTo && <DevToSection />}
        </div>
      </div>
    </>
  );
};
