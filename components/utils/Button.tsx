import Image from 'next/image';
export const Button = ({
  type = 'button',
  onClick,
  children,
  className,
  loading,
}: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className + '  relative disabled:cursor-not-allowed'}
      disabled={loading}
    >
      {loading && (
        <span className='absolute top-0 left-0 flex items-center bg-gray-900 bg-opacity-50 justify-center rounded w-full h-full '>
          <Image
            src='/loading.gif'
            width={20}
            height={20}
            alt='Loading Image'
          />
        </span>
      )}
      {children}
    </button>
  );
};
