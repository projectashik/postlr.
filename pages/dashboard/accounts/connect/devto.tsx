import { DashboardNavbar } from 'components';
import Head from 'next/head';
import React, { BaseSyntheticEvent, useState } from 'react';
import { Button } from 'components/utils/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function DevTo() {
  const [devToTokenProcessing, setDevToTokenProcessing] = useState(false);
  const [tokenError, setTokenError] = useState('');
  const [devToToken, setDevToToken] = useState('');

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setTokenError('');
    setDevToTokenProcessing(true);

    const res = await axios.post('/api/POST/accounts/devto', {
      token: devToToken,
    });

    console.log(res);

    if (!res.data.success) {
      setDevToTokenProcessing(false);
      if (res.data.error && res.data.error.field) {
        setTokenError(res.data.error.message);
      } else {
        toast.error('Unknown error occured');
      }

      return false;
    }

    toast.success('Dev.to account connected');
    setDevToTokenProcessing(false);
  };
  return (
    <>
      <Head>
        <title>Postlr. - Connect Dev.to Account</title>
      </Head>
      <DashboardNavbar />

      <main className='mt-10'>
        <div className='container mx-auto px-2'>
          <h2 className='font-bold mb-5'>Connect dev.to</h2>
          <form
            className='border mb-5 p-5 rounded dark:border-gray-600'
            onSubmit={onSubmit}
          >
            <div className=''>
              <label htmlFor='devto_token'>Dev.to Token</label>
              <input
                required
                type='text'
                className={
                  'border rounded block p-2 w-full my-1 dark:bg-gray-800 dark:border-gray-600 outline-none ' +
                  (tokenError && 'border-red-400 dark:border-red-400')
                }
                id='devto_token'
                onChange={(e: BaseSyntheticEvent) =>
                  setDevToToken(e.target.value)
                }
                placeholder='Dev.to Token Here'
              />
              {tokenError && (
                <p className='text-red-500 text-xs'>{tokenError}</p>
              )}
              <p className='text-xs text-gray-500 flex items-center mt-2'>
                You can get the dev.to token from{'  '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary px-2'
                  href='https://dev.to/settings/account'
                >
                  here
                </a>{' '}
                or{' '}
                <code className='border ml-2 dark:bg-gray-700 bg-gray-100 dark:text-gray-300 p-2 rounded dark:border-gray-300 border-gray-400'>
                  Dev.to -&gt; Settings -&gt; Account
                </code>
              </p>
            </div>
            <div className=''>
              <Button
                type='submit'
                className='bg-devto hover:bg-primary-700 p-2 px-4 text-sm mt-4 rounded text-white'
                loading={devToTokenProcessing}
              >
                Continue
              </Button>
            </div>
          </form>

          <div className='border mb-5 p-5 rounded dark:border-gray-600'>
            <h4 className='font-bold'>How we validate your token?</h4>
            <p>
              We validate your token by creating an unpublished article in your
              dev.to account. Later we do not delete that post because dev.to
              does not allow to delete the article from api
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
