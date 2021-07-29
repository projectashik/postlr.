import { useUser } from '@clerk/clerk-react';
import { useAtom } from 'jotai';
import { welcomeWindowAtom } from 'states/utils';

export const WelcomeWindow = ({ state }: any) => {
  const user = useUser();
  const [displayWelcomeWindow, setDisplayWelcomeWindow] =
    useAtom(welcomeWindowAtom);
  return (
    <>
      {displayWelcomeWindow && (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='md:w-2/4 md:h-2/3 bg-white rounded p-10 prose-sm md:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl flex flex-col justify-between'>
            <div>
              <h3>
                Welcome {state === 'login' && 'back'}, {user.fullName}
              </h3>

              <p>
                Postlr. is a cross platform blogging and scheduling platform.
                This will help you publish or schedule your article in{' '}
                <a href='https://medium.com'>Medium</a>,{' '}
                <a href='https://hashnode.com'>Hashnode</a> and{' '}
                <a href='https://dev.to'>dev.to</a>
              </p>
            </div>

            <div>
              <button
                onClick={() => setDisplayWelcomeWindow(false)}
                className='bg-gray-200 text-gray-600 rounded px-4 py-1 '
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
