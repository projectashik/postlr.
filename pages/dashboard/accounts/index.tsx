import { DashboardNavbar } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import platforms from 'utils/platforms';
import { useClerkSWR } from 'libs/fetcher';
import { tokens } from '@prisma/client';
import { useState } from 'react';
import AccountDetailModal from 'components/AccountDetailModal';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAtom } from 'jotai';
import { showAccountDetailModelAtom } from 'states';
import { Button } from 'components/utils/Button';

export default function AccountsIndex() {
  const [selectedAccount, setSelectedAccount] = useState<tokens>();
  const [showAccountDetailModal, setShowAccountDetailModal] = useAtom(
    showAccountDetailModelAtom
  );
  const { data: connectedAccounts, error } =
    useClerkSWR<tokens[]>('/api/GET/tokens');

  let availablePlatforms: any[] = [];
  let notAvailablePlatforms: any[] = [];

  if (connectedAccounts) {
    connectedAccounts.map((acc) => {
      notAvailablePlatforms.push(acc.platform);
    });

    availablePlatforms = platforms.filter((p) => {
      return !notAvailablePlatforms.includes(p.slug);
    });
  }

  console.log(availablePlatforms);
  return (
    <>
      <Head>
        <title>Postlr. - Connect Accouts</title>
      </Head>

      <DashboardNavbar />
      <main className='container mx-auto px-4 mt-4'>
        {availablePlatforms && availablePlatforms.length > 0 && (
          <section id='connect' className='border rounded p-5 mb-5'>
            <h4 className='text-lg font-bold'>Connect Accounts</h4>
            <div className='flex flex-wrap gap-4 mt-3'>
              {availablePlatforms.map((platform) => {
                return (
                  <Link
                    key={platform.slug}
                    href={'/dashboard/accounts/connect/' + platform.slug}
                  >
                    <a className='flex flex-col items-center w-24 border rounded p-4 hover:shadow-lg'>
                      <Image
                        src={platform.image}
                        width={60}
                        height={60}
                        alt={platform.name}
                      />
                      <span className='mt-2'>{platform.name}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {connectedAccounts && connectedAccounts?.length > 0 && (
          <section id='connect' className='border rounded p-5'>
            <h4 className='text-lg font-bold'>Connected Accounts</h4>
            <div className='flex flex-wrap gap-4 mt-3'>
              {connectedAccounts &&
                connectedAccounts.map((account) => {
                  const platform = platforms.filter((p) => {
                    return account.platform === p.slug;
                  });
                  return (
                    <button
                      onClick={() => {
                        setSelectedAccount(account);
                        setShowAccountDetailModal(true);
                      }}
                      key={platform[0].slug}
                      className='flex flex-col items-center w-24 border rounded p-4 hover:shadow-lg'
                    >
                      <Image
                        src={platform[0].image}
                        width={60}
                        height={60}
                        alt={platform[0].name}
                      />
                      <span className='mt-2'>{platform[0].name}</span>
                    </button>
                  );
                })}
            </div>

            {selectedAccount && showAccountDetailModal && (
              <AccountDetailModal account={selectedAccount} />
            )}
          </section>
        )}

        {!connectedAccounts && (
          <section id='connect' className='border rounded p-5'>
            <h4 className='text-lg font-bold'>
              <Skeleton />
            </h4>
            <div className='flex flex-wrap gap-4 mt-3'>
              <Button className='flex flex-col items-center w-24 border rounded p-4 hover:shadow-lg'>
                <Skeleton height={60} width={60} />
                <span className='mt-2'>
                  <Skeleton height={15} width={60} />
                </span>
              </Button>
              <Button className='flex flex-col items-center w-24 border rounded p-4 hover:shadow-lg'>
                <Skeleton height={60} width={60} />
                <span className='mt-2'>
                  <Skeleton height={15} width={60} />
                </span>
              </Button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
