import { currentSelectedImageAtom } from 'states';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { ImageDetailPanel } from './ImageDetailPanel';
import { useClerkSWR } from 'libs/fetcher';
import Skeleton from 'react-loading-skeleton';

export const PreviousUploads = () => {
  const [currentSelectedImage, setCurrentSelectedImage] = useAtom(
    currentSelectedImageAtom
  );

  const { data: images } = useClerkSWR('/api/GET/images');
  if (images) {
    console.log(images);
  }
  return (
    <>
      <div className='flex flex-row'>
        <div
          className={
            'grid gap-4 mt-5 ' +
            (currentSelectedImage
              ? ' gird-cols-1 md:grid-cols-2 w-1/2 pr-2'
              : ' grid-cols-2 md:grid-cols-4 w-full')
          }
        >
          {images &&
            // @ts-ignore
            images.map((image: any) => (
              <Image
                onClick={() => setCurrentSelectedImage(image.id)}
                src={image.url}
                className='rounded'
                alt='Postlr. Uploads'
                width='100%'
                height='100%'
                key={image.id}
              />
            ))}
          {/* @ts-ignore */}
          {images && images.length < 1 && <p>No Data Found</p>}

          {!images && <Skeleton height={200} />}
        </div>
        {currentSelectedImage && <ImageDetailPanel id={currentSelectedImage} />}
      </div>
    </>
  );
};
