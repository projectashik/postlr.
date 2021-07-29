import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiMoreVertical, FiSettings, FiUserPlus } from 'react-icons/fi';
import styles from '@styles/Menu.module.scss';
import Link from 'next/link';

export default function MoreMenu() {
  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button
            className={styles.menuButton + ' dark:hover:bg-gray-700'}
          >
            <FiMoreVertical />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className={styles.menuItems}>
            <Menu.Item>
              <Link href='/dashboard/accounts'>
                <a className={styles.menuItem}>
                  <FiUserPlus />
                  <span className='ml-3'>Accounts</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a className={styles.menuItem}>
                <FiSettings />
                <span className='ml-3'>Settings</span>
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
