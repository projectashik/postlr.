import { DashboardNavbar } from 'components';
import Head from 'next/head';
import React, { BaseSyntheticEvent } from 'react';

export default function DevTo() {
  return (
    <>
      <Head>
        <title>Postlr. - Connect Dev.to Account</title>
      </Head>
      <DashboardNavbar />

      <main className='mt-10'>
        <div className='container mx-auto px-2'>
          <h2 className='font-bold mb-5'>Connect dev.to</h2>
          <form className='border mb-5 p-5 rounded dark:border-gray-600'>
            <div className=''>
              <label htmlFor='devto_token'>Dev.to Token</label>
              <input
                required
                type='text'
                className={
                  'border rounded block p-2 w-full my-1 dark:bg-gray-800 dark:border-gray-600 outline-none ' +
                  'border-red-400 dark:border-red-400'
                }
                id='devto_token'
                onChange={(e: BaseSyntheticEvent) => e.target.value}
                placeholder='Dev.to Token Here'
              />
              <p className='text-red-500 text-xs'>
                Maybe your token is not correct
              </p>
              <p className='text-xs text-gray-500 flex items-center mt-2'>
                You can get the dev.to token from{'  '}
                <a href='https://dev.to/settings/account'>here</a> or{' '}
                <code className='border ml-2 dark:bg-gray-700 bg-gray-100 dark:text-gray-300 p-2 rounded dark:border-gray-300 border-gray-400'>
                  Dev.to -&gt; Settings -&gt; Account
                </code>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
