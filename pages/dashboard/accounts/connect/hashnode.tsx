// Nextjs Imports
import Head from 'next/head';

// Custom components import
import { DashboardNavbar } from 'components';

// React imports
import { BaseSyntheticEvent, useState } from 'react';

// Third party library import
import toast from 'react-hot-toast';

// Graphql queries

import { useRouter } from 'next/router';
import { Button } from 'components/utils/Button';
// import axios from 'axios';
import { useAtom } from 'jotai';
import {
  encryptedHashnodeTokenAtom,
  hashnodeTokenAtom,
  hashnodeUsernameAtom,
  userHashnodePublicationIdAtom,
} from 'states';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import Tippy from '@tippyjs/react';

export default function ConnectHashnodeIndex() {
  // Router Import
  const router = useRouter();

  // States
  const [hashnodeToken, setHashnodeToken] = useAtom(hashnodeTokenAtom);
  const [hashnodeUsername, setHashnodeUsername] = useAtom(hashnodeUsernameAtom);
  const [hashnodeTokenProcessing, setHashnodeTokenProcessing] = useState(false);
  const [tokenError, setTokenError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Function that runs when the form is submitted
  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setTokenError('');
    setUsernameError('');
    setHashnodeTokenProcessing(true);
    const res = await axios.post('/api/POST/accounts/hashnode', {
      username: hashnodeUsername,
      token: hashnodeToken,
    });

    if (!res.data.success) {
      setHashnodeTokenProcessing(false);
      if (res.data.error && res.data.error.field) {
        if (res.data.error.field === 'token') {
          setTokenError(res.data.error.message);
        } else if (res.data.error.field === 'username') {
          setUsernameError(res.data.error.message);
        } else {
          toast.error('Unknown error occured');
        }
      } else {
        toast.error('Unknown error occured');
      }
      return false;
    }

    toast.success('Hashnode Connected');
    setHashnodeTokenProcessing(false);
  };
  return (
    <>
      <Head>
        <title>Postlr. - Connect Hashnode Account</title>
      </Head>
      <DashboardNavbar />

      <main className='mt-10'>
        <div className='container mx-auto px-2'>
          <h2 className='font-bold mb-5'>Connect hashnode</h2>
          <form
            onSubmit={onSubmit}
            className='border mb-5 p-5 rounded dark:border-gray-600'
          >
            <div className=''>
              <label htmlFor='hashnode_token'>Hashnode Token</label>
              <input
                required
                type='text'
                className={
                  'border rounded block p-2 w-full my-1 dark:bg-gray-800 dark:border-gray-600 outline-none ' +
                  (tokenError && 'border-red-400 dark:border-red-400')
                }
                id='hashnode_token'
                onChange={(e: BaseSyntheticEvent) =>
                  setHashnodeToken(e.target.value)
                }
                placeholder='Hashnode Token Here'
              />
              {tokenError && (
                <p className='text-red-500 text-xs'>{tokenError}</p>
              )}
              <p className='text-xs text-gray-500 flex items-center mt-2'>
                You can get the hashnode token from{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://hashnode.com/settings/developer'
                  className='text-primary px-2'
                >
                  here
                </a>{' '}
                or{' '}
                <code className='border ml-2 dark:bg-gray-700 bg-gray-100 dark:text-gray-300 p-2 rounded dark:border-gray-300 border-gray-400'>
                  Hashnode -&gt; Account Settings -&gt; Developer
                </code>
              </p>
            </div>
            <div className='mt-14'>
              <label
                htmlFor='hashnode_username'
                className='flex items-center gap-2'
              >
                Hashnode Username{' '}
                <Tippy content='To fetch publication detail'>
                  <button type='button'>
                    <FaInfoCircle />
                  </button>
                </Tippy>
              </label>
              <input
                type='text'
                required
                className={
                  'border rounded block p-2 w-full my-1 dark:bg-gray-800 dark:border-gray-600 outline-none ' +
                  (usernameError && 'border-red-400 dark:border-red-400')
                }
                id='hashnode_username'
                placeholder='Hashnode username Here'
                onChange={(e: BaseSyntheticEvent) => {
                  setHashnodeUsername(e.target.value);
                }}
              />
              {usernameError && (
                <p className='text-red-500 text-xs'>{usernameError}</p>
              )}
              <p className={'text-xs text-gray-500 flex items-center mt-2 '}>
                You can get the hashnode username from{' '}
                <code className='border ml-2 dark:bg-gray-700 bg-gray-100 dark:text-gray-300 p-2 rounded dark:border-gray-300 border-gray-400'>
                  Hashnode -&gt; Click on profile -&gt; On top of menu you will
                  see your username
                </code>
              </p>
            </div>

            <div className='mt-5'>
              <Button
                type='submit'
                className='bg-hashnode hover:bg-primary-700 p-2 px-4 text-sm mt-4 rounded text-white'
                loading={hashnodeTokenProcessing}
              >
                Continue
              </Button>
            </div>
          </form>
          <div className='border mb-5 p-5 rounded dark:border-gray-600'>
            <h4 className='font-bold'>How we validate your token?</h4>
            <p>
              We validate your token by creating an article in your hashnode
              blog. Later we remove that article once your token is validated.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
