import { useAtom } from 'jotai';
import {
  devToCoverImageUrlAtom,
  devToSeriesAtom,
  devToTagsAtom,
  onDevToAtom,
} from 'states';
import styles from 'styles/PublishBar.module.scss';
const DevToSection = () => {
  const [devToCoverImageUrl, setDevToCoverImageUrl] = useAtom(
    devToCoverImageUrlAtom
  );
  const [devToTags, setDevToTags] = useAtom(devToTagsAtom);
  const [devToSeries, setDevToSeries] = useAtom(devToSeriesAtom);
  const [onDevTo, setOnDevTo] = useAtom(onDevToAtom);

  const cancelDevTo = (e: any) => {
    e.preventDefault();
    setOnDevTo(false);
  };
  return (
    <>
      <div className={styles.card}>
        <div className='header  p-2  border-b dark:border-gray-600  flex justify-between items-center'>
          <p>DevTo Settings ⚙️</p>
          <button
            className='bg-red-400 border-2 border-red-600 px-2 rounded text-white'
            onClick={cancelDevTo}
          >
            Cancel
          </button>
        </div>
        <div className='body p-2 flex flex-col gap-2'>
          <div className={styles.card}>
            <label htmlFor='dev_to_cover_image_url'>
              Cover Image URL (Optional)
            </label>
            <input
              type='text'
              className={styles.cardInput}
              id='dev_to_cover_image_url'
              placeholder='Main Image URL'
              value={devToCoverImageUrl}
              onChange={(e) => {
                setDevToCoverImageUrl(e.target.value);
              }}
            />
            <p className='text-xs text-gray-500'>
              You can upload image from upload image button below the site
            </p>
          </div>
          <div className={styles.card + ' relative'}>
            <label htmlFor='devToTagsInput'> Tags (Optional)</label>
            <input
              type='text'
              className={styles.cardInput}
              id='devToTagsInput'
              placeholder='Tags seperated with commas'
              value={devToTags}
              onChange={(e) => {
                setDevToTags(e.target.value);
              }}
            />
          </div>
          <div className={styles.card + ' relative'}>
            <label htmlFor='devToSeriesInput'> Series (Optional)</label>
            <input
              type='text'
              className={styles.cardInput}
              id='devToSeriesInput'
              placeholder='Series name here'
              value={devToSeries}
              onChange={(e) => {
                setDevToSeries(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DevToSection;
