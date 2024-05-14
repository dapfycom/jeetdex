import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Login from '../Login/Login';

export const Header = () => {
  return (
    <header className='flex flex-row items-center  justify-between pl-6 pr-6 pt-6'>
      <div className='flex gap-5 items-center'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Image
            src={'/assets/img/logo.png'}
            alt='logo'
            className='w-10 h-10 rounded-full'
            width={30}
            height={30}
          />

          <span className='text-green-800 font-bold text-2xl'>JEETDEX</span>
        </MxLink>

        <div className='text-gray-400 ml-7'>
          <Link href='/create' className='hover:text-gray-100'>
            <span className='flex items-center'>
              <FontAwesomeIcon icon={faCoins} className='mr-3 w-5 h-5' />

              <span className='whitespace-nowrap'>List token</span>
            </span>
          </Link>
        </div>
      </div>

      <nav className='h-full w-full text-sm sm:relative  sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent items-center'>
        <SiteMode />

        <div className='flex items-center gap-2'>
          <Login />
        </div>
      </nav>
    </header>
  );
};
