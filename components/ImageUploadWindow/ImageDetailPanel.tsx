// import { useQuery } from '@apollo/client';
// import { GET_SINGLE_IMAGE_BY_PK } from 'graphql/base/images';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import { UsagePanel } from './UsagePanel';
import { useAtom } from 'jotai';
import { currentSelectedImageAtom } from 'states';
import { useClerkSWR } from 'libs/fetcher';
import Skeleton from 'react-loading-skeleton';

export const ImageDetailPanel = ({ id }: { id: string }) => {
  // const { data, loading, error } = useQuery(GET_SINGLE_IMAGE_BY_PK, {
  //   variables: { id },
  // });
  const { data: image } = useClerkSWR<any>(`/api/GET/image?id=${id}`);

  if (image) {
    console.log(image);
  }

  const [, setCurrentSelectedImage] = useAtom(currentSelectedImageAtom);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  return (
    <>
      <div className='border-l w-1/2'>
        <div className='header flex justify-between p-4 items-center'>
          <p>Preview Panel</p>
          <button
            onClick={() => setCurrentSelectedImage('')}
            className='p-2 hover:bg-gray-200 rounded-full'
          >
            <FiX />
          </button>
        </div>
        <div className='grid grid-cols-1 h-full'>
          {image && (
            <Image
              className='block'
              src={image.url}
              alt='Image - Postlr.'
              width='100%'
              height='100%'
              unoptimized={true}
            />
          )}
          {!image && <Skeleton height={300} />}
        </div>
        {image && <UsagePanel url={image.url} />}
        {!image && <Skeleton count={2} />}
      </div>
    </>
  );
};
