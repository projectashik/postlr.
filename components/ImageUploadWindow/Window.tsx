import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import styles from '@styles/ImageUpload.module.scss';
import { useAtom } from 'jotai';
import { displayImageUploadWindowAtom } from 'states';
import { PreviousUploads } from './PreviousUploads';
import { UsagePanel } from './UsagePanel';
import toast from 'react-hot-toast';
import { render } from '@headlessui/react/dist/utils/render';
import axios from 'axios';

export const Window = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [currentTab, setCurrentTab] = useState('upload');
  const [, setDisplayImageUploadWindow] = useAtom(displayImageUploadWindowAtom);

  const onUploadHandler = (file: File) => {
    setUploadingImage(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    const res = await axios.post('/api/POST/images', {
      data: base64EncodedImage,
    });
    if (res.data.success) {
      toast.success('Image Uploaded');
      setImageUrl(res.data.data.url);
      setUploadingImage(false);

      console.log(imageUrl);
    } else {
      toast.error(res.data.error);
      setUploadingImage(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => setDisplayImageUploadWindow(false)}
      ></div>
      <div className={styles.modalContent}>
        <div className={styles.uploadBody}>
          <div>
            <div className='closer flex justify-end'>
              <button
                onClick={() => setDisplayImageUploadWindow(false)}
                className='text-gray-600 dark:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full'
              >
                <FiX />
              </button>
            </div>
            <div className={'header ' + styles.uploadContainer}>
              <ul className='flex gap-4'>
                <li>
                  <button
                    onClick={() => setCurrentTab('upload')}
                    className={
                      'px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all ' +
                      (currentTab === 'upload'
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : '')
                    }
                  >
                    Upload
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentTab('previousUploads')}
                    className={
                      'px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all ' +
                      (currentTab === 'previousUploads'
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : '')
                    }
                  >
                    Previous Uploads
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {currentTab === 'upload' && (
              <div>
                <div className={styles.uploadContainer + ' body'}>
                  <div>
                    <p className='font-bold mb-2'>Upload a image</p>
                    <input
                      type='file'
                      id='image'
                      accept='image/*'
                      onChange={(e: any) => onUploadHandler(e.target.files[0])}
                    />
                  </div>
                </div>
                {imageUrl && !uploadingImage && <UsagePanel url={imageUrl} />}

                {uploadingImage && (
                  <div className='border border-gray-300 p-2 rounded shadow mt-3'>
                    Uploading..
                  </div>
                )}
              </div>
            )}

            {currentTab === 'previousUploads' && <PreviousUploads />}
          </div>
        </div>
      </div>
    </div>
  );
};
