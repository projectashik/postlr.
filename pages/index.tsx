import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Icons Import
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { BsArrowRight } from 'react-icons/bs';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Postlr. - Cross platform blogging and blog scheduling</title>
      </Head>

      <header className=''>
        <div className='container mx-auto px-4 flex justify-between items-center h-24'>
          <Link href='/'>
            <a>
              <Image src='/logos/dfl.svg' alt='Logo' width='100' height='50' />
            </a>
          </Link>
          <nav className='absolute md:static top-24 left-1/2 -translate-x-1/2 md:translate-x-0'>
            <ul className='flex items-center gap-4'>
              <li>
                <Link href='/'>
                  <a className='hover:bg-gray-200 py-1 px-2 rounded text-gray-700'>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a className='hover:bg-gray-200 py-1 px-2 rounded  text-gray-700'>
                    Features
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a className='flex items-center text-gray-700 hover:bg-gray-200 py-1 px-2 rounded gap-1'>
                    <FaGithub />
                    Github
                  </a>
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <ul className='flex items-center'>
              <SignedOut>
                <li>
                  <Link href='/auth/sign-in'>
                    <a className='bg-blue-100 border-blue-200 hover:bg-blue-200 text-primary border rounded py-3 px-4'>
                      Sign In
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href='/auth/sign-up'>
                    <a className='ml-4 bg-primary border-primary hover:bg-blue-700  text-white border rounded py-3 px-4'>
                      Sign Up
                    </a>
                  </Link>
                </li>
              </SignedOut>
              <SignedIn>
                <li>
                  <Link href='/dashboard'>
                    <a className='ml-4 flex items-center bg-primary border-primary hover:bg-blue-700  text-white border rounded py-3 px-4'>
                      <span className='mr-2'>Dashboard</span> <BsArrowRight />
                    </a>
                  </Link>
                </li>
              </SignedIn>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id='hero'
          className='md:my-20 my-20 md:w-2/3 mx-auto flex flex-col items-center px-4'
        >
          <h1 className='text-center text-5xl font-black leading-snug md:leading-normal'>
            <span className='text-primary'>Multi platform</span> blogging and
            post <span className='text-primary'>scheduling</span>
          </h1>
          <p className='text-center md:mt-8 mt-5'>
            Publish or schedule your posts to{' '}
            <a href='https://hashnode.com'>Hashnode</a>, and{' '}
            <a href='https://dev.to'>Dev.to</a>
          </p>
          <Link href='/auth/sign-in'>
            <a className='flex items-center mt-8 bg-primary border-primary hover:bg-blue-700  text-white border rounded py-3 px-10'>
              <span className='mr-2'>Get Started</span> <BsArrowRight />
            </a>
          </Link>
        </section>

        {/* Platforms */}
        <section id='platforms'>
          <div className='container mx-auto bg-gray-100 rounded p-10 flex flex-col items-center'>
            <h2 className='section-heading text-center font-bold text-2xl'>
              Platforms
            </h2>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-10 md:gap-44 mt-10'>
              <div className='flex flex-col items-center gap-4'>
                <Image
                  src='/platforms/hashnode.png'
                  width='100'
                  height='100'
                  alt='Hashnode Logo'
                />
                <a
                  href='https://hashnode.com'
                  className='flex items-center gap-1 text-gray-800'
                >
                  Hashnode{' '}
                  <span className='text-sm'>
                    <FaExternalLinkAlt />
                  </span>
                </a>
              </div>
              <div className='flex flex-col items-center gap-4'>
                <Image
                  src='/platforms/devto.png'
                  width='100'
                  height='100'
                  alt='Dev.tp Logo'
                />
                <a
                  href='https://dev.to'
                  className='flex items-center gap-1 text-gray-800'
                >
                  Dev.to{' '}
                  <span className='text-sm'>
                    <FaExternalLinkAlt />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Patterns */}
        <div className='hidden md:block '>
          <div className='absolute top-48 left-40'>
            <Image
              src='/images/patterns.png'
              className='opacity-20'
              width='150'
              height='100'
              alt='pattern'
            />
          </div>
          <div className='absolute top-48 -right-40'>
            <Image
              src='/images/patterns.png'
              className='opacity-20'
              width='300'
              height='200'
              alt='pattern'
            />
          </div>
        </div>
      </main>
    </>
  );
}
