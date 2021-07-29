import '../styles/globals.scss';

import 'tippy.js/dist/tippy.css'; // optional
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import 'emoji-mart/css/emoji-mart.css';
// Retrieve Clerk settings from the environment
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = [
  '/',
  '/auth/sign-in/[[...index]]',
  '/auth/sign-up/[[...index]]',
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <div className='overflow-x-hidden'>
      <NextNprogress
        color='#2563eb'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <ClerkProvider
        frontendApi={clerkFrontendApi}
        navigate={(to: any) => router.push(to)}
      >
        {publicPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <div>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </div>
          </>
        )}
        <Toaster />
      </ClerkProvider>
    </div>
  );
}

export default MyApp;
