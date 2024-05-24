'use client';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PageNotFound = () => {
  const pathname = usePathname();

  return (
    <div className='w-full h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='flex flex-col w-full max-w-prose justify-center items-center bg-gray-100 text-center p-6 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          404 - Page Not Found
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          The page you are looking for,{' '}
          <span className='text-red-500'>{pathname}</span>, does not exist.
        </p>

        <Link
          href='/'
          className='flex items-center text-blue-600 hover:text-blue-800'
        >
          <FontAwesomeIcon icon={faHome} className='mr-2' />
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
