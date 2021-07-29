import { DashboardNavbar } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import platforms from 'utils/platforms';
// import { useQuery } from '@apollo/client';
// import { GET_TOKENS } from 'graphql/base/tokens';

export default function AccountsIndex() {
  // const {
  //   data: tokens,
  //   loading: loadingTokens,
  //   error: errorFetchingTokens,
  // } = useQuery(GET_TOKENS);

  // tokens && console.log(tokens);
  return (
    <>
      <Head>
        <title>Postlr. - Connect Accouts</title>
      </Head>

      <DashboardNavbar />
      <main className='container mx-auto px-4 mt-4'>
        <section id='connect' className='border rounded p-5'>
          <h4 className='text-lg font-bold'>Connect Accounts</h4>
          <div className='flex flex-wrap gap-4 mt-3'>
            {platforms.map((platform) => {
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
      </main>
    </>
  );
}
