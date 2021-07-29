import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import styles from '@styles/MdEditor.module.scss';
import { h1, h2, h3, h4, h5 } from 'utils/md';
import { useAtom } from 'jotai';
import { markdownContentAtom } from 'states';
import Tippy from '@tippyjs/react';
import { heading } from 'types';

export const HeadingMenu = () => {
  const [, setMarkdown] = useAtom(markdownContentAtom);
  const headings: heading[] = [
    {
      name: 'H1',
      action: () => setMarkdown(h1),
    },
    {
      name: 'H2',
      action: () => setMarkdown(h2),
    },
    {
      name: 'H3',
      action: () => setMarkdown(h3),
    },
    {
      name: 'H4',
      action: () => setMarkdown(h4),
    },
    {
      name: 'H5',
      action: () => setMarkdown(h5),
    },
  ];
  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Tippy content='Heading'>
            <Menu.Button
              className={
                styles.menuButton + ' dark:hover:bg-gray-700 font-mono text'
              }
            >
              H
            </Menu.Button>
          </Tippy>
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
          <Menu.Items className={styles.menuItems + ' w-40'}>
            {headings.map((h) => {
              return (
                <Menu.Item key={Math.random()}>
                  <button onClick={h.action} className={styles.menuItem}>
                    {h.name}
                  </button>
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
