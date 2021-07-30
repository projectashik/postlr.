// next imports
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Icons Imports
import { FaExternalLinkAlt, FaEye, FaTrash } from 'react-icons/fa';
import { BsArrowRight, BsPlus } from 'react-icons/bs';

// Clerk Import
import { useUser } from '@clerk/clerk-react';

// Custom components imports
import { DashboardNavbar } from 'components';
import { WelcomeWindow } from 'components';

export default function DashboardIndex() {
  const router = useRouter();
  const { register } = router.query;
  const { login } = router.query;

  const scheduledArticles: any[] = [];

  return (
    <>
      <Head>
        <title>Postlr. - Dashboard</title>
      </Head>
      {register && <WelcomeWindow />}
      {login && <WelcomeWindow state='login' />}
      <DashboardNavbar />
      <main className='container mx-auto px-4 mt-4 overflow-x-hidden'>
        {scheduledArticles.length > 0 && (
          <section id='scheduled'>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold '>Scheduled Articles</h2>
              <Link href='/'>
                <a className='flex items-center gap-2 text-primary'>
                  <span>See all</span> <BsArrowRight />
                </a>
              </Link>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-4'>
              {scheduledArticles.length > 0 &&
                scheduledArticles.map((article) => (
                  <div key={article} className='bg-gray-100 p-4 rounded'>
                    <p className='font-medium text-lg'>No Title</p>
                    <p className='text-gray-600'>
                      Time to publish: 2 mins remaining
                    </p>
                    <p className='text-gray-600'>
                      Platforms: Hashnode, Dev.to, Medium
                    </p>
                    <div className='mt-3 grid grid-cols-3 gap-4'>
                      <button className='flex justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-2'>
                        <FaEye />
                      </button>
                      <button className='flex justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-2'>
                        <FaTrash />
                      </button>

                      <button className='flex justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-2'>
                        <FaExternalLinkAlt />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {scheduledArticles.length < 1 && (
          <section id='new'>
            <Link href=''>
              <a className='block bg-gray-100 p-4 rounded w-48'>
                <button className='flex flex-col items-center w-full border-4 border-gray-400 p-4 border-dashed rounded'>
                  <span className='text-5xl text-gray-400'>
                    <BsPlus />
                  </span>
                  <span className='text-gray-500'>New Article</span>
                </button>
              </a>
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
