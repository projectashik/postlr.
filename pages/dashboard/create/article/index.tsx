import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Components Imports
import { DashboardNavbar, PublishBar } from 'components';
import { Button } from 'components/utils/Button';
import { MarkdownEditor } from 'components';
import { ImageUploadWindow } from 'components';

// States Imports
import { useAtom } from 'jotai';
import {
  articleTitleAtom,
  displayImageUploadWindowAtom,
  displayPublishBarAtom,
} from 'states';
import { FaUpload } from 'react-icons/fa';

export default function CreateArticle() {
  // Image upload window display state
  const [displayImageUplaod, setDisplayImageUpload] = useAtom(
    displayImageUploadWindowAtom
  );
  const [, setPublishBar] = useAtom(displayPublishBarAtom);
  const [title, setTitle] = useAtom(articleTitleAtom);
  return (
    <>
      <Head>
        <title>Postlr. - Create Article</title>
      </Head>

      <header className='border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900'>
        <div className='flex justify-between h-12 items-center py-2 px-2 container mx-auto'>
          <Link href='/dashboard' passHref={true}>
            <a className='flex items-center'>
              <Image
                src='/logos/dfl.svg'
                height='31px'
                width='62px'
                alt='Postlr. Logo'
              />
            </a>
          </Link>
          <nav className='flex gap-2'>
            <Button
              onClick={() => setPublishBar(true)}
              className='bg-primary px-5 py-2 text-white'
            >
              Publish
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <div className='py-4 container mx-auto px-2'>
          <div className='my-6'>
            <input
              placeholder='Title'
              type='text'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className='font-bold text-3xl block w-full py-3 outline-none'
            />
          </div>

          <div>
            <MarkdownEditor />
          </div>

          {/* Upload Image  */}
          {displayImageUplaod && <ImageUploadWindow />}

          <button
            className='fixed bottom-6 bg-gray-200 dark:bg-gray-800 right-6 shadow p-2 rounded flex items-center'
            onClick={() => setDisplayImageUpload(true)}
          >
            <FaUpload />
            <span className='ml-2'>Upload Image</span>
          </button>
        </div>
        <PublishBar />
      </main>
    </>
  );
}
