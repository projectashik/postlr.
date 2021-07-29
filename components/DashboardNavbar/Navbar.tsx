import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/clerk-react';
import MoreMenu from './menus/MoreMenu';
import menuStyles from '@styles/Menu.module.scss';
import { BsPlus } from 'react-icons/bs';
import Tippy from '@tippyjs/react';

export const Navbar = () => {
  return (
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
        <nav className='flex gap-2 items-center'>
          {/* <ThemeToggler /> */}
          <Link href='/dashboard/create/article' passHref>
            <a
              title='Create Article'
              className='rounded-full p-2 hover:bg-gray-100'
            >
              <BsPlus />
            </a>
          </Link>
          <MoreMenu />
          <UserButton />
        </nav>
      </div>
    </header>
  );
};
